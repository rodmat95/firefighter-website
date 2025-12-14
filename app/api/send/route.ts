import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    //console.log("--- Email Sending Attempt ---");
    //console.log("Input data:", { firstName, lastName, email, subject });

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "utamaproduccionesof@gmail.com",
      subject: `Nuevo Mensaje Web: ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>De:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p>${message}</p>
      `,
      replyTo: email, // Permite responder directamente al usuario
    });

    //console.log("Email sent successfully. Response data:", data);
    return NextResponse.json(data);
  } catch (error) {
    //console.error("Error sending email:", error);
    return NextResponse.json({ error });
  }
}