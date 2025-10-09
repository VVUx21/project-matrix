import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formdata = await req.formData();
    const file = formdata.get("idCard") as File | null;
    const paymentfile = formdata.get("paymentss") as File | null;
    const transaction_id = formdata.get("transaction_id")?.toString() || "";

    if (!file || !paymentfile) {
      return NextResponse.json(
        { error: "Files are required" },
        { status: 400 }
      );
    }

    const uploadFile = async (
      buffer: Buffer,
      folder: string,
      filename: string
    ) => {
      return new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "image", public_id: filename },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      });
    };

    const [idCardBuffer, paymentBuffer] = await Promise.all([
      file.arrayBuffer().then((data) => Buffer.from(data)),
      paymentfile.arrayBuffer().then((data) => Buffer.from(data)),
    ]);

    const [idCardResult, paymentResult] = await Promise.all([
      uploadFile(idCardBuffer, "vriddhhi", `id card_${transaction_id}`), //change the foldername accordingly..
      uploadFile(paymentBuffer, "vriddhhi", `payment ss_${transaction_id}`),
    ]);

    if (!idCardResult || !paymentResult) {
      throw new Error("Cloudinary upload failed");
    }

    const transactionData = {
      transaction_id: formdata.get("transaction_id")?.toString() || "",
      paymentscreenshoturl: paymentResult.secure_url || "",
      hasPaid: true,
    };

    const userData = {
      firstName: formdata.get("firstName")?.toString() || "",
      lastName: formdata.get("lastName")?.toString() || "",
      college: formdata.get("college")?.toString() || "",
      rollNumber: formdata.get("rollNumber")?.toString() || "",
      phoneNumber: formdata.get("phoneNumber")?.toString() || "",
      whatsappNumber: formdata.get("whatsappNumber")?.toString() || "",
      gender: formdata.get("gender")?.toString() || "",
      idcardurl: idCardResult.secure_url || "",
      foodPreference: formdata.get("foodPreference")?.toString() || "",
      email: formdata.get("email")?.toString() || "",
    };

    return NextResponse.json(
      { userdata: userData, transaction: transactionData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
