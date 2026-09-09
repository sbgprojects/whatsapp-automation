import Faq from "./components/Faq";
import PhoneDemo from "./components/PhoneDemo";
import Reveal from "./components/Reveal";
import RtoCalculator from "./components/RtoCalculator";
import StickyCta from "./components/StickyCta";
import Timeline from "./components/Timeline";
import WhatsAppCta from "./components/WhatsAppCta";
import { WHATSAPP_NUMBER } from "./lib/site";

const STEPS = [
  {
    n: "01",
    title: "Order comes in",
    body: "A COD order lands on your Shopify or WooCommerce store. We pick it up straight away.",
  },
  {
    n: "02",
    title: "Customer gets a WhatsApp",
    body: "Their name, the product, the amount, two buttons. Nothing to type. Most people answer inside the hour.",
  },
  {
    n: "03",
    title: "You ship the confirmed ones",
    body: "Yes goes to your dispatch list like any other order. No cancels it in your store automatically. You don't touch anything.",
  },
];

const TERMS = [
  "We do the setup. Your side takes about 10 minutes.",
  "Free for 30 days. No card, no contract.",
  "All we want back is your RTO number, before and after.",
  "If it doesn't move, you walk, and you tell us why.",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <StickyCta />

      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-ink">
          Unamed!
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          India · COD
        </span>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-5 pb-14 pt-2 sm:px-8 sm:pb-24 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pt-10">
          <div className="lg:pb-8">
            <Reveal>
              <Eyebrow>Shopify and WooCommerce · India</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-4 max-w-[15ch] font-display text-[2.55rem] font-extrabold leading-[0.96] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.2rem]">
                You paid twice to ship an order nobody wanted.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.6] text-ink-2 sm:text-lg">
                Every COD order gets one WhatsApp message before it leaves your
                warehouse. Customer taps yes, it ships. Taps no, it cancels
                itself. That&apos;s the whole product.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8">
                <WhatsAppCta />
                <p className="mt-4 text-[13.5px] text-ink-3">
                  Free for 30 days. No card. Setup takes 10 minutes of your
                  time.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={280} className="mt-11 lg:mt-0">
            <PhoneDemo />
          </Reveal>
        </section>

        {/* The math */}
        <section className="px-3 sm:px-5">
          <div className="mx-auto max-w-[1100px] rounded-[2rem] bg-ink px-5 py-16 text-paper sm:px-10 sm:py-24">
            <div className="mx-auto max-w-[860px] lg:grid lg:grid-cols-2 lg:gap-16">
              <div>
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    The math
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-5 max-w-[16ch] font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl">
                    Nobody puts this number on a slide.
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 max-w-[46ch] text-[16.5px] leading-[1.65] text-white/60">
                    A COD order that comes back costs you more than the sale.
                    Shipping out, shipping back, the packing material, and a
                    product that comes home creased and needs QC again.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <p className="mt-6 max-w-[44ch] border-l-2 border-wa pl-4 text-[16.5px] leading-[1.6] text-white/85">
                    We don&apos;t know yet how much of that we can stop.
                    That&apos;s what the 30 days are for.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={200} className="mt-10 lg:mt-0">
                <RtoCalculator />
              </Reveal>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-[14ch] font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              One message. Before the parcel moves.
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={120 + i * 110}
                className="bg-paper p-7"
              >
                <span className="font-mono text-[12px] tracking-[0.18em] text-wa-deep">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.62] text-ink-2">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* The 24 hour rule */}
        <section className="border-y border-line bg-paper-2/50">
          <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-28 lg:grid lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The rule that does the work</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 max-w-[13ch] font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
                  No answer in 24 hours is an answer.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-[48ch] text-[16.5px] leading-[1.65] text-ink-2">
                  Someone who ordered at 2am on impulse won&apos;t reply.
                  Someone who typed a fake number can&apos;t. And the person who
                  ordered the same shoes from three stores to compare prices
                  will only answer one of you.
                </p>
              </Reveal>
            </div>

            <div className="mt-4 lg:mt-0">
              <Timeline />
              <Reveal delay={200}>
                <p className="mt-10 max-w-[44ch] text-[13.5px] leading-[1.6] text-ink-3">
                  You can set the window to whatever suits your dispatch. Most
                  stores leave it at 24 hours.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What this isn't */}
        <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-[52ch]">
            <Reveal>
              <h2 className="font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
                We&apos;re not another WhatsApp marketing app.
              </h2>
            </Reveal>
            <div className="mt-7 space-y-5 text-[16.5px] leading-[1.65] text-ink-2">
              <Reveal as="p" delay={90}>
                No campaigns, no festive offers, no broadcast list. You
                won&apos;t get a dashboard with fourteen tabs that you open once
                and never again.
              </Reveal>
              <Reveal as="p" delay={150}>
                Your customer gets one message about their order and nothing
                else, ever. That keeps it in Meta&apos;s utility category, which
                costs about 11 paise to send and needs no marketing opt-in.
              </Reveal>
              <Reveal as="p" delay={210}>
                The platforms that do everything add their own markup on every
                message and bury this feature on page four. We only do this one
                thing.
              </Reveal>
            </div>
          </div>
        </section>

        {/* The honest ask */}
        <section className="px-3 sm:px-5">
          <div className="mx-auto max-w-[1100px] rounded-[2rem] border border-ink bg-paper px-5 py-16 sm:px-10 sm:py-20">
            <div className="mx-auto max-w-[620px]">
              <Reveal>
                <Eyebrow>Where we&apos;re at</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
                  We&apos;re new. Here&apos;s the deal.
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-6 text-[16.5px] leading-[1.65] text-ink-2">
                  No case studies on this page. No logos. Nobody is running this
                  yet, and putting a fake 40 percent up there would be
                  insulting.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-8 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                  What we&apos;re offering the first 10 stores
                </p>
              </Reveal>

              <ul className="mt-4 space-y-0">
                {TERMS.map((term, i) => (
                  <Reveal
                    as="li"
                    key={term}
                    delay={240 + i * 90}
                    className="flex gap-3.5 border-b border-line py-3.5 text-[15.5px] leading-[1.55] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-wa"
                    />
                    {term}
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={620}>
                <p className="mt-7 text-[16.5px] leading-[1.6] text-ink-2">
                  We need the data more than we need your money right now.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <h2 className="mb-10 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
                Questions you&apos;re about to ask
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="final-cta"
          className="border-t border-line bg-ink px-5 py-20 text-paper sm:py-28"
        >
          <div className="mx-auto max-w-[620px] text-center">
            <Reveal>
              <h2 className="font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
                Ask before you ship.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-[42ch] text-[16.5px] leading-[1.65] text-white/60">
                Ten minutes to set up. Free for 30 days. If your RTO
                doesn&apos;t move, you&apos;ve lost nothing except the ten
                minutes.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-10">
                <WhatsAppCta label="Message us on WhatsApp" />
                <p className="mt-4 text-[13.5px] text-white/40">
                  Goes to my phone. Not a bot.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1100px] px-5 pb-28 pt-10 sm:px-8 lg:pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-y-3">
          <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-ink">
            Unamed!
          </span>
          <span className="font-mono text-[11.5px] text-ink-3">
            +91 {WHATSAPP_NUMBER.slice(2, 7)} {WHATSAPP_NUMBER.slice(7)}
          </span>
        </div>
        <p className="mt-3 max-w-[40ch] text-[13px] leading-[1.6] text-ink-3">
          COD order confirmation for Indian D2C stores. Built by one person who
          answers the phone.
        </p>
      </footer>
    </>
  );
}
