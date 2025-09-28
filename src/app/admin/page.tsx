"use client";
import { DataTable } from "@/components/DataTable/DataTable";
import { useAuth } from "@/contexts/auth-context";
import { RegistrationData } from "@/types/registration";
import { getAllUsersAndPayments } from "@/utils/appwrite";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Page() {
    const { user, loading } = useAuth();
    const columnHelper = createColumnHelper<RegistrationData>();
    const [userWithPayment, setUserWithPayment] = useState<RegistrationData[]>(
        []
    );
    const [userWithoutPayment, setUserWithoutPayment] = useState<
        Partial<RegistrationData>[]
    >([]);
    const [showUnpaidUsers, setShowUnpaidUsers] = useState(false);

    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("institute", {
            header: "Institute",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("city", {
            header: "City",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("phone", {
            header: "Phone",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("referralCode", {
            header: "Referral Code",
            cell: (info) => info.getValue(),
        }),
        ...(!showUnpaidUsers
            ? [
                  columnHelper.accessor("transactionId", {
                      header: "Transaction ID",
                      cell: (info) => info.getValue(),
                  }),
                  columnHelper.accessor("merchantTransactionId", {
                      header: "Merchant Transaction ID",
                      cell: (info) => info.getValue(),
                  }),
                  columnHelper.accessor("state", {
                      header: "State",
                      cell: (info) => (
                          <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  info.getValue() === "completed"
                                      ? "bg-[#acffff] text-[#003955]"
                                      : info.getValue() === "pending"
                                      ? "bg-[#003955] text-[#acffff]"
                                      : "bg-[#06111d] text-[#acffff]"
                              }`}
                          >
                              {info.getValue()}
                          </span>
                      ),
                  }),
                  columnHelper.accessor("date", {
                      header: "Date",
                      cell: (info) =>
                          format(new Date(info.getValue()), "MMM d, yyyy"),
                  }),
              ]
            : []),
    ];

    async function getData() {
        const users = await getAllUsersAndPayments();
        if (users?.status === "error") return;
        const { userWithPayment, userWithoutPayment } = processUsersData(
            users?.data
        );

        setUserWithPayment(userWithPayment);
        setUserWithoutPayment(userWithoutPayment);
    }

    useEffect(() => {
        getData();
    }, []);

    function processUsersData(data) {
        const { users, payments } = data;

        const userWithPayment: RegistrationData[] = [];
        const userWithoutPayment: Partial<RegistrationData>[] = [];

        const paymentsMap = payments.reduce((map, payment) => {
            map[payment.userId] = payment;
            return map;
        }, {});

        users.forEach((user, index) => {
            const payment = paymentsMap[user.userId];

            if (payment) {
                userWithPayment.push({
                    id: (index + 1).toString(),
                    name: user.name,
                    institute: user.institute,
                    city: user.city,
                    email: user.email,
                    phone: user.phoneNumber,
                    referralCode: user.referralCode,
                    transactionId: payment.transactionId,
                    merchantTransactionId: payment.merchantTransactionId,
                    state: payment.state.toLowerCase(),
                    date: new Date(payment.$createdAt)
                        .toISOString()
                        .split("T")[0],
                });
            } else {
                userWithoutPayment.push({
                    id: (index + 1).toString(),
                    name: user.name,
                    institute: user.institute,
                    city: user.city,
                    email: user.email,
                    phone: user.phoneNumber,
                    referralCode: user.referralCode,
                });
            }
        });

        return { userWithPayment, userWithoutPayment };
    }

    const downloadExcel = () => {
        const currentData = showUnpaidUsers
            ? userWithoutPayment
            : userWithPayment;
        const headers = Object.keys(currentData[0] || {}).filter(
            (key) => key !== "id"
        );

        let csvContent = headers.join(",") + "\n";

        currentData.forEach((row) => {
            const values = headers.map((header) => {
                const value = row[header];
                if (header === "date" && value) {
                    return format(new Date(value), "MMM d, yyyy");
                }
                return value || "";
            });
            csvContent += values.join(",") + "\n";
        });

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `registration_data_${showUnpaidUsers ? "unpaid" : "paid"}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.isAdmin) {
        window.location.href = "/";
        return null;
    }

    return (
        <div className="min-h-screen bg-[#040d17] p-2 !font-inter">
            <div className="rounded-lg shadow-lg">
                <div className="p-2 md:p-6 flex smd:flex-row flex-col justify-between items-start gap-5 smd:items-center">
                    <h2 className="text-xl font-semibold text-[#fff]">
                        Registration Data
                    </h2>
                    <div className="flex  gap-2">
                        <button
                            onClick={() => setShowUnpaidUsers(!showUnpaidUsers)}
                            className="px-4 py-2 rounded bg-[#003955] text-[#acffff] hover:bg-[#004d6d] transition-colors"
                        >
                            Show {showUnpaidUsers ? "Paid" : "Unpaid"} Users
                        </button>
                        <button
                            onClick={downloadExcel}
                            className="px-4 py-2 rounded bg-[#003955] text-[#acffff] hover:bg-[#004d6d] transition-colors"
                        >
                            Download Excel
                        </button>
                    </div>
                </div>
                <div className="p-1 md:p-6">
                    <DataTable
                        // @ts-expect-error pata nahi
                        data={
                            showUnpaidUsers
                                ? userWithoutPayment
                                : userWithPayment
                        }
                        // @ts-expect-error pata nahi
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}
