// lib/sendgrid.ts - SendGrid API integration for email automation

import sgMail from "@sendgrid/mail";

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (sendGridApiKey) {
  sgMail.setApiKey(sendGridApiKey);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!sendGridApiKey) {
    console.error("SendGrid API key not configured");
    return null;
  }

  try {
    const msg = {
      to: options.to,
      from: options.from || "noreply@therapistadmin.app",
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    };

    const response = await sgMail.send(msg);
    return response[0];
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Send appointment reminder
export async function sendAppointmentReminder(input: {
  patientEmail: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  therapistName: string;
  therapistPhone?: string;
}) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Appointment Reminder</h2>
        <p>Hi ${input.patientName},</p>
        <p>This is a reminder of your upcoming therapy appointment:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${input.appointmentDate}</p>
          <p><strong>Time:</strong> ${input.appointmentTime}</p>
          <p><strong>Therapist:</strong> ${input.therapistName}</p>
          ${input.therapistPhone ? `<p><strong>Phone:</strong> ${input.therapistPhone}</p>` : ""}
        </div>
        <p>If you need to reschedule or cancel, please contact our office as soon as possible.</p>
        <p>Looking forward to seeing you soon!</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Appointment Reminder - ${input.appointmentDate}`,
    html,
  });
}

// Send invoice notification
export async function sendInvoiceNotification(input: {
  patientEmail: string;
  patientName: string;
  invoiceId: string;
  amount: number;
  dueDate: string;
  invoiceUrl: string;
}) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Invoice Notification</h2>
        <p>Hi ${input.patientName},</p>
        <p>Your invoice is ready for payment.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Invoice #:</strong> ${input.invoiceId}</p>
          <p><strong>Amount Due:</strong> $${input.amount.toFixed(2)}</p>
          <p><strong>Due Date:</strong> ${input.dueDate}</p>
        </div>
        <p>
          <a href="${input.invoiceUrl}" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View & Pay Invoice
          </a>
        </p>
        <p>Thank you for your prompt payment.</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Invoice #${input.invoiceId} - Payment Due ${input.dueDate}`,
    html,
  });
}

// Send session follow-up email
export async function sendSessionFollowUp(input: {
  patientEmail: string;
  patientName: string;
  sessionDate: string;
  nextAppointment?: string;
  actionItems?: string[];
  message?: string;
}) {
  const actionItemsHtml = input.actionItems
    ? `
    <h3>Action Items:</h3>
    <ul>
      ${input.actionItems.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `
    : "";

  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thank You for Your Session</h2>
        <p>Hi ${input.patientName},</p>
        <p>Thank you for attending your therapy session on ${input.sessionDate}. It was valuable working with you.</p>

        ${input.message ? `<p>${input.message}</p>` : ""}

        ${actionItemsHtml}

        ${
          input.nextAppointment
            ? `
        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Your Next Appointment:</strong> ${input.nextAppointment}</p>
        </div>
        `
            : ""
        }

        <p>If you have any questions or concerns before our next session, please don't hesitate to reach out.</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Follow-up from Your Session`,
    html,
  });
}

// Send intake form
export async function sendIntakeForm(input: {
  patientEmail: string;
  patientName: string;
  formUrl: string;
}) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Therapy</h2>
        <p>Hi ${input.patientName},</p>
        <p>Thank you for scheduling your first appointment. To help us serve you better, please complete the intake form below:</p>
        <p>
          <a href="${input.formUrl}" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Complete Intake Form
          </a>
        </p>
        <p>Please complete this form at least 24 hours before your appointment. If you have any questions, feel free to reach out.</p>
        <p>We look forward to meeting you!</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: "Welcome - Please Complete Your Intake Form",
    html,
  });
}

// Send payment reminder for overdue invoices
export async function sendPaymentReminder(input: {
  patientEmail: string;
  patientName: string;
  invoiceId: string;
  amount: number;
  originalDueDate: string;
  invoiceUrl: string;
}) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Payment Reminder</h2>
        <p>Hi ${input.patientName},</p>
        <p>We notice that your invoice remains unpaid. Please take a moment to settle the balance.</p>
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p><strong>Invoice #:</strong> ${input.invoiceId}</p>
          <p><strong>Amount Due:</strong> $${input.amount.toFixed(2)}</p>
          <p><strong>Original Due Date:</strong> ${input.originalDueDate}</p>
        </div>
        <p>
          <a href="${input.invoiceUrl}" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Pay Now
          </a>
        </p>
        <p>If you have any questions about this invoice, please reach out to us.</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Payment Reminder - Invoice #${input.invoiceId}`,
    html,
  });
}

// Send insurance pre-auth status update
export async function sendPreauthStatusUpdate(input: {
  patientEmail: string;
  patientName: string;
  insuranceCompany: string;
  status: "approved" | "pending" | "denied";
  authNumber?: string;
  message?: string;
}) {
  const statusColor =
    input.status === "approved"
      ? "#10B981"
      : input.status === "denied"
        ? "#EF4444"
        : "#F59E0B";

  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Insurance Pre-Authorization Update</h2>
        <p>Hi ${input.patientName},</p>
        <p>We have an update regarding your insurance pre-authorization:</p>
        <div style="background-color: ${statusColor}20; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColor};">
          <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold; text-transform: uppercase;">${input.status}</span></p>
          <p><strong>Insurance Company:</strong> ${input.insuranceCompany}</p>
          ${input.authNumber ? `<p><strong>Authorization #:</strong> ${input.authNumber}</p>` : ""}
        </div>
        ${input.message ? `<p>${input.message}</p>` : ""}
        <p>If you have any questions, please don't hesitate to contact us.</p>
      </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Insurance Pre-Authorization ${input.status.charAt(0).toUpperCase() + input.status.slice(1)}`,
    html,
  });
}
