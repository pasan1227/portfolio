"use server";

import React from "react";
import { Resend } from "resend";

import { getErrorMessage, validateString } from "@/lib/utils";
import ContactFormEmail from "@/email/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  const { data, error } = await resend.emails.send({
    from: `${senderEmail} <onboarding@resend.dev>`,
    to: "pasanratnayake@gmail.com",
    subject: "Message from contact form",
    replyTo: senderEmail as string,
    react: React.createElement(ContactFormEmail, {
      message: message as string,
      senderEmail: senderEmail as string,
    }),
  });

  if (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
