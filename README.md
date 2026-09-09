# Unamed!

Landing page for a COD order confirmation service for Indian D2C stores. Before
a cash-on-delivery order ships, the customer gets one WhatsApp message with two
buttons. Yes ships it, no cancels it in the store, and 24 hours of silence
cancels it too.

Mobile first, single scroll, one call to action that opens WhatsApp.

## Running it

```bash
npm install
npm run dev
```

## Structure

- `app/page.tsx` sections and copy
- `app/components/PhoneDemo.tsx` the WhatsApp thread in the hero, three paths
  (confirm, cancel, no reply)
- `app/components/RtoCalculator.tsx` the orders-per-day slider
- `app/components/Timeline.tsx` the 0 / 3h / 24h sequence
- `app/lib/site.ts` WhatsApp number, prefilled message, and the RTO assumptions
  used in the calculator

## Editing the important bits

The WhatsApp number and the message that gets prefilled live in
`app/lib/site.ts`. The calculator's assumptions (30% RTO, ₹250 per round trip)
are constants in the same file, and the page shows them to the reader in a
footnote, so change both together.

## Numbers on the page

The RTO benchmark is the industry figure for India: 28 to 35% on COD, higher in
fashion and footwear, against 8 to 12% globally. Round trip logistics run ₹150
to ₹300 an order.

There is deliberately no claim about how much this service reduces RTO. Nobody
is running it yet. Vendors in this category all quote a 40% reduction sourced
from their own marketing, and the page says so instead of repeating it.

## Deploying

Built for Vercel. `npm run build` produces a fully static page.
