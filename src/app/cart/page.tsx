import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = { title: "Cart" };

export default function Page() {
  return (
    <ComingSoon
      eyebrow="Your Selection"
      title="Cart & Checkout"
      body="A clean Stripe-powered checkout with delivery options and an age/ID confirmation step is being built. Your cart is currently empty."
    />
  );
}
