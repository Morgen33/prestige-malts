import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Delivery & Returns" };

export default function Page() {
  return (
    <LegalPage title="Delivery & Returns">
      <h2>Delivery</h2>
      <p>
        Orders are dispatched in secure, purpose-built packaging. An adult
        signature is required on delivery under Challenge 25; ID may be
        requested by the courier.
      </p>
      <h2>Returns</h2>
      <p>
        Given the nature of the goods, returns are accepted only where a bottle
        arrives damaged or faulty. Please contact us within 48 hours of receipt.
      </p>
    </LegalPage>
  );
}
