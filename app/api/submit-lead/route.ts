import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY ?? "");
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const concerns = formData.get("concerns") as string;
    const concernDetail = formData.get("concernDetail") as string;
    const realEstate = formData.get("realEstate") as string;
    const heightOk = formData.get("heightOk") as string;
    const additionalInfo = formData.get("additionalInfo") as string;
    const photoFiles = formData.getAll("photos") as File[];

    if (!name || !phone || !email || !address) {
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

    const realEstateLabel: Record<string, string> = {
      no: "No",
      buyer: "Yes — Buyer",
      seller: "Yes — Seller",
    };

    const heightLabel: Record<string, string> = {
      yes: "Yes",
      no: "No",
      unsure: "Unsure",
    };

    const toEmails = ["chrisj@crawlspaceninja.com", "ben@stagmkt.com"];
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "quotes@crawlspaceninja.com";

    await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      replyTo: email,
      subject: `New Lead — ${name} · ${address}`,
      html: `
        <h2>New Crawl Space Assessment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Address:</strong> ${address}</p>
        <hr/>
        <p><strong>Main Concerns:</strong> ${concerns || "—"}</p>
        ${concernDetail ? `<p><strong>Details:</strong> ${concernDetail}</p>` : ""}
        <p><strong>Real Estate Transaction:</strong> ${realEstateLabel[realEstate] ?? realEstate}</p>
        <p><strong>Crawl Space ≥ 2ft Tall:</strong> ${heightLabel[heightOk] ?? heightOk}</p>
        ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ""}
        <hr/>
        <p><strong>Photos:</strong> ${attachments.length > 0 ? `${attachments.length} attached` : "None submitted"}</p>
        <p style="color:#888;font-size:12px;">Submitted via the Triangle landing page lead form.</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json(
      { error: "Failed to submit lead." },
      { status: 500 }
    );
  }
}
