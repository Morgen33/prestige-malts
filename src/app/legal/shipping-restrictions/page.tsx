import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Shipping Restrictions" };

export default function Page() {
  return (
    <LegalPage title="Shipping Restrictions">
      <h2>Where we can ship</h2>
      <p>
        The import of alcohol is regulated and varies by country and, in some
        cases, by region or state. We are unable to ship to destinations where
        the import of alcohol by private individuals is prohibited.
      </p>
      <h2>Duties & taxes</h2>
      <p>
        International orders may be subject to import duties and taxes levied by
        the destination country, payable by the recipient.
      </p>
      <p>
        If you are unsure whether we can ship to your address, please contact
        info@prestigemalts.com before ordering.
      </p>
    </LegalPage>
  );
}
