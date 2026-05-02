import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY ?? "");
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const services = formData.get("services") as string;
    const sqft = formData.get("sqft") as string;
    const condition = formData.get("condition") as string;
    const priceRange = formData.get("priceRange") as string;
    const photoFiles = formData.getAll("photos") as File[];

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const attachments = await Promise.all(
      photoFiles
        .filter((f) => f.size > 0)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return { filename: file.name, content: buffer };
        })
    );

    const toEmail = process.env.RALEIGH_TEAM_EMAIL ?? "raleigh@crawlspaceninja.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "quotes@crawlspaceninja.com";

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Quote Request — ${name} (Raleigh, NC)`,
      html: `
        <h2>New Crawl Space Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <hr/>
        <p><strong>Services Requested:</strong> ${services}</p>
        <p><strong>Square Footage:</strong> ${sqft} sq ft</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Estimated Range Shown:</strong> ${priceRange}</p>
        <hr/>
        <p><strong>Photos:</strong> ${attachments.length > 0 ? `${attachments.length} attached` : "None submitted"}</p>
        <p style="color:#888;font-size:12px;">Submitted via the Raleigh Facebook Ad landing page.</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-quote error:", err);
    return NextResponse.json(
      { error: "Failed to send quote request." },
      { status: 500 }
    );
  }
}
