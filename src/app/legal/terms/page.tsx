import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage title="Terms & Conditions">
      <h2>1. Sale of Alcohol</h2>
      <p>
        Prestige Malts Ltd sells alcoholic beverages only to persons aged 18 or
        over. By placing an order you confirm you are of legal drinking age.
      </p>
      <h2>2. Orders & Pricing</h2>
      <p>
        All prices are in GBP and include VAT where applicable. Single-cask
        stock is finite; orders are accepted subject to availability.
      </p>
      <h2>3. Delivery</h2>
      <p>
        A signature from an adult (Challenge 25) is required on delivery. Please
        see our Delivery &amp; Returns and Shipping Restrictions pages.
      </p>
      <h2>4. Company</h2>
      <p>
        Prestige Malts Ltd, Company No. 13573512 (England &amp; Wales). AWRS
        XQAW00000120450.
      </p>
    </LegalPage>
  );
}
