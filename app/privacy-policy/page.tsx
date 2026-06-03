import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Crawl Space Ninja',
  description: 'Privacy Policy for Crawl Space Ninja of Raleigh',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl prose prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: June 3, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          When you submit our assessment form or Facebook lead form, we collect your name,
          email address, phone number, and any crawl space details you choose to provide.
          We also collect standard web analytics data including page views and form submissions
          through Meta Pixel.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information solely to contact you regarding our crawl space
          encapsulation, waterproofing, and mold remediation services. We do not sell,
          rent, or share your personal information with third parties for their
          marketing purposes.
        </p>

        <h2>3. Data Sharing</h2>
        <p>
          We use Meta&apos;s Conversions API and Meta Pixel to track form submissions
          and optimize our advertising. Data shared with Meta is governed by Meta&apos;s
          privacy policy. We also use GoHighLevel for customer relationship management.
        </p>

        <h2>4. Data Retention</h2>
        <p>
          We retain your contact information and project details for as long as needed
          to provide our services and comply with legal obligations. You may request
          deletion of your data at any time.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information.
          You may opt out of marketing communications at any time by contacting us.
        </p>

        <h2>6. Contact</h2>
        <p>
          Crawl Space Ninja of Raleigh<br />
          508 Hollymont Dr<br />
          Holly Springs, NC 27540<br />
          Phone: (919) 533-5666<br />
          Email: info@hiremyninja.com
        </p>
      </div>
    </main>
  )
}
