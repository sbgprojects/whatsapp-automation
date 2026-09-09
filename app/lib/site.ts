export const WHATSAPP_NUMBER = "918485885241";

export const WHATSAPP_MESSAGE =
  "Hi, I saw the Unamed! page. I want to set up COD confirmation on my store.";

export const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

/**
 * Assumptions shown to the reader in the calculator footnote. India COD RTO
 * runs 28-35%; round-trip logistics cost 150-300 per order.
 */
export const RTO_RATE = 0.3;
export const COST_PER_RTO = 250;

export const inr = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
