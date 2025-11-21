import emailjs from "@emailjs/browser";

// Your EmailJS credentials
const SERVICE_ID = "service_0ayo19h";
const TEMPLATE_ID = "n3s5d4e";
const PUBLIC_KEY = "YG5OTMHMqPXhtbobk";

// This sends an email alert
export const sendEmailAlert = async (type: string, data: any) => {
  try {
    let subject = "";
    let htmlContent = "";

    if (type === "New Registration") {
      subject = "🏆 New Athlete Registration Alert";
      htmlContent = `
        <h2>New Athlete Registration</h2>
        <p><strong>Name:</strong> ${data.athleteName}</p>
        <p><strong>Age:</strong> ${data.age}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Program:</strong> ${data.program || "N/A"}</p>
        <p><strong>Coach:</strong> ${data.preferredCoach || "N/A"}</p>
        <p><strong>Rank:</strong> ${data.currentRank || "Beginner"}</p>
      `;
    } else if (type === "New Message") {
      subject = "💬 New Message from Website";
      htmlContent = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
      `;
    }

    const templateParams = {
      to_email: "telo18429@gmail.com",
      subject,
      message: htmlContent,
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log(`✅ Email sent successfully: ${type}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
