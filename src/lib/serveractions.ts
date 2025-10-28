"use server";
import prisma from "../../prisma";

export async function checktransactionid(transaction_id: string) {
  const transaction = await prisma.transactions.findUnique({
    where: {
      transaction_id: transaction_id,
    },
  });
  if (transaction) {
    return true;
  } else {
    return false;
  }
}

export async function checkemail({
  email,phoneNumber,whatsappNumber
}:{
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
}) {
  //console.log("checkemail", email);
  const transaction = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: email,
        },
        {
          phoneNumber: phoneNumber,
        },
        {
          whatsappNumber: whatsappNumber,
        },
      ],
    },
  });
  if (transaction) {
    return true;
  } else {
    return false;
  }
}

export async function createUserAndTransaction(data: {
  userdata: {
    firstName: string;
    lastName: string;
    college: string;
    rollNumber: string;
    phoneNumber: string;
    whatsappNumber: string;
    gender: string;
    idcardurl: string;
    email: string;
    referralCode: string;
  };
  transaction: {
    transaction_id: string;
    paymentscreenshoturl: string;
    hasPaid: boolean;
  };
}) {
  try {
    if (!data) {
      throw new Error("Data cannot be null");
    }
    const { userdata, transaction } = data;
    if (!userdata || !transaction) {
      throw new Error("userdata and transaction is null");
    }
    validateUserAndTransactionData(userdata, transaction);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newUser = await prisma.user.create({
      data: {
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        college: userdata.college,
        rollNumber: userdata.rollNumber,
        phoneNumber: userdata.phoneNumber,
        whatsappNumber: userdata.whatsappNumber,
        gender: userdata.gender,
        idcardurl: userdata.idcardurl,
        email: userdata.email,
        referralCode: userdata.referralCode,
        transaction: {
          create: {
            transaction_id: transaction.transaction_id ?? "",
            paymentscreenshoturl: transaction.paymentscreenshoturl ?? "",
            hasPaid: transaction.hasPaid ?? "",
          },
        },
      },
    });

    return {
      status: "success",
      message: "User and transaction created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to create user and transaction",
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateUserAndTransactionData(userdata: any, transaction: any) {
  // User validations
  const requiredUserFields = {
    firstName: "First Name",
    lastName: "Last Name",
    college: "College",
    rollNumber: "Roll Number",
    phoneNumber: "Phone Number",
    whatsappNumber: "WhatsApp Number",
    gender: "Gender",
    idcardurl: "ID Card URL",
    email: "Email",
  };

  for (const [field, label] of Object.entries(requiredUserFields)) {
    if (!userdata?.[field]) {
      throw new Error(`${label} is required but was null or undefined`);
    }
  }

  // Transaction validations
  const requiredTransactionFields = {
    transaction_id: "Transaction ID",
    paymentscreenshoturl: "Payment Screenshot URL",
    hasPaid: "Payment Status",
  };

  for (const [field, label] of Object.entries(requiredTransactionFields)) {
    if (!transaction?.[field]) {
      throw new Error(`${label} is required but was null or undefined`);
    }
  }
}