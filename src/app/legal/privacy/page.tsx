import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Who we are</h2>
      <p>
        Prestige Malts Ltd, 86–90 Paul Street, London EC2A 4NE. We are the data
        controller for personal data collected through this site.
      </p>
      <h2>Cookies</h2>
      <p>
        We use essential cookies to operate the site (including age
        verification) and optional cookies for analytics, only with your
        consent. See the cookie banner to manage your preferences.
      </p>
      <h2>Your rights</h2>
      <p>
        Under UK GDPR you may request access to, correction of, or deletion of
        your personal data. Contact info@prestigemalts.com.
      </p>
    </LegalPage>
  );
}
