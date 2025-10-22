"use client";
import { DataTable } from "@/components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Link from "next/link";

// Types matching Prisma schema
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  college: string;
  rollNumber: string;
  phoneNumber: string;
  whatsappNumber: string;
  gender: string;
  email: string;
  referralCode: string;
  idcardurl: string;
  transaction_id?: string;
  paymentscreenshoturl?: string;
  hasPaid?: boolean;
}

export default function Page() {
  // const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper<UserData>();
  const [userWithPayment, setUserWithPayment] = useState<UserData[]>([]);
  const [userWithoutPayment, setUserWithoutPayment] = useState<UserData[]>([]);
  const [showUnpaidUsers, setShowUnpaidUsers] = useState(false);

  useEffect(() => {
    // Fetch data on first render
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("college", {
      header: "College",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rollNumber", {
      header: "Roll Number",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("whatsappNumber", {
      header: "WhatsApp",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("referralCode", {
      header: "Referral Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transaction_id", {
      header: "Transaction ID",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("idcardurl", {
      header: "ID Card",
      cell: (info) => {
        const url = info.getValue();
        return url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7DF9FF] hover:text-white underline transition-colors duration-200"
          >
            View
          </Link>
        ) : (
          "N/A"
        );
      },
    }),
    columnHelper.accessor("paymentscreenshoturl", {
      header: "Payment Screenshot",
      cell: (info) => {
        const url = info.getValue();
        return url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7DF9FF] hover:text-white underline transition-colors duration-200"
          >
            View
          </Link>
        ) : (
          "N/A"
        );
      },
    }),
  ];

  // Fetch data from MongoDB via Prisma
  async function getData() {
    try {
      console.log("Fetching data from API...");
      // setLoading(true);
      const response = await fetch("/api/adminJBk5kMfkhHzwGb8L/users");
      console.log("API Response status:", response.status);
      const result = await response.json();
      console.log("API Response data:", result);

      if (result.status === "error") {
        console.error("Error fetching users:", result.message);
        return;
      }

      const { usersWithPayment, usersWithoutPayment } = result.data;

      // Transform data to match UserData interface
      const paidUsers: UserData[] = usersWithPayment.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        college: user.college,
        rollNumber: user.rollNumber,
        phoneNumber: user.phoneNumber,
        whatsappNumber: user.whatsappNumber,
        gender: user.gender,
        email: user.email,
        referralCode: user.referralCode,
        idcardurl: user.idcardurl,
        transaction_id: user.transaction?.transaction_id || "",
        paymentscreenshoturl: user.transaction?.paymentscreenshoturl || "",
        hasPaid: user.transaction?.hasPaid || false,
      }));

      const unpaidUsers: UserData[] = usersWithoutPayment.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        college: user.college,
        rollNumber: user.rollNumber,
        phoneNumber: user.phoneNumber,
        whatsappNumber: user.whatsappNumber,
        gender: user.gender,
        email: user.email,
        referralCode: user.referralCode,
        idcardurl: user.idcardurl,
      }));

      setUserWithPayment(paidUsers);
      setUserWithoutPayment(unpaidUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  }

  const downloadExcel = () => {
    const currentData = showUnpaidUsers ? userWithoutPayment : userWithPayment;
    if (!currentData || currentData.length === 0) return;

    const headers = Object.keys(currentData[0]).filter(
      (key) =>
        key !== "id" && key !== "idcardurl" && key !== "paymentscreenshoturl"
    );

    let csvContent = headers.join(",") + "\n";

    currentData.forEach((row) => {
      const values = headers.map((header) => {
        const value = (row as any)[header];
        return value !== undefined && value !== null ? value : "";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5000FF] to-[#000002] p-4 md:p-6 font-inter!">
      <div className="max-w-[1400px] mx-auto mt-24 md:mt-28 rounded-3xl shadow-xl/30 bg-[#b5a1e02f] backdrop-blur-sm border border-[#5000FF]/20 ring-1 ring-[#ffffff75]">
        <div className="p-4 md:p-8 flex smd:flex-row flex-col justify-between items-start gap-4 smd:items-center border-b border-[#ffffff]/10">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffffff] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Registration Data
          </h2>
          <button
            onClick={downloadExcel}
            className="px-6 py-3 rounded-full bg-[#b5a1e02f] backdrop-blur-sm border border-[#ffffff]/40 text-[#ffffff] font-light text-base md:text-lg shadow-lg ring-1 ring-[#ffffff75] hover:bg-[#b5a1e04d] hover:text-purple-300 hover:scale-110 transition-all duration-300 focus:outline-none hoverable"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Download Excel
          </button>
        </div>
        <div className="p-2.5 md:p-8">
          <DataTable data={userWithPayment} columns={columns as any} />
        </div>
      </div>
    </div>
  );
}
