import axios from "axios";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { handleUserPayment } from "@/utils/appwrite";

const MERCHANT_KEY = process.env.MERCHANT_KEY;
const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_STATUS_URL = process.env.MERCHANT_STATUS_URL;
const CLIENT_URL = process.env.CLIENT_URL;

// Validate required environment variables (skip in development if not set)
if (!MERCHANT_KEY || !MERCHANT_ID || !MERCHANT_STATUS_URL || !CLIENT_URL) {
    console.warn('⚠️ Payment environment variables not configured. Payment functionality will not work.');
    // Only throw error in production
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Missing required payment environment variables. Please check your .env.local file.');
    }
}

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get("id");
    const userId = searchParams.get("userId");

    const keyIndex = 1;
    const string =
        `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
        method: "GET",
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": MERCHANT_ID,
        },
    };

    try {
        const response = await axios.request(option);
        const paymentDetails = response.data;
        
        // Store ALL payment attempts (success or failure)
        const dbUpdate = await handleUserPayment({
            userId: userId!,
            amount: paymentDetails.data?.amount || "0",
            transactionId: paymentDetails.data?.transactionId || merchantTransactionId!,
            merchantTransactionId: paymentDetails.data?.merchantTransactionId || merchantTransactionId!,
            merchantId: paymentDetails.data?.merchantId || MERCHANT_ID!,
            state: paymentDetails.data?.state || "FAILED",
        });

        if (dbUpdate?.status == "error") {
            // added this condition, not chcked yet
            console.error("Error saving payment details to APPWRITE ", dbUpdate);
            const failedUrl = new URL("/payment/failed", CLIENT_URL);
            failedUrl.searchParams.set("details", "unableToSave");
            failedUrl.searchParams.set("error", "true");
            return NextResponse.redirect(failedUrl.toString(), { status: 303 });
        }

        // Handle success case
        if (response?.data?.code === "PAYMENT_SUCCESS") {
            const successUrl = new URL("/payment/success", CLIENT_URL);
            return NextResponse.redirect(successUrl.toString(), {
                status: 303,
            });
        }
        
        // Handle failure case
        const failedUrl = new URL("/payment/failed", CLIENT_URL);
        failedUrl.searchParams.set("details", "paymentFailed");
        failedUrl.searchParams.set("error", "true");
        return NextResponse.redirect(failedUrl.toString(), { status: 303 });
    } catch (error) {
        console.error("error in payment status", error);
        return NextResponse.json(
            {
                error: "Failed to fetch payment status",
                details: (error as Error)?.message,
            },
            { status: 500 }
        );
    }
}
