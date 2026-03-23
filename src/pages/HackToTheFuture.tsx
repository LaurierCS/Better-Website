import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PatternBackground } from '../components/universal/PatternBackground';
import RevealOnScroll from '../components/universal/RevealOnScroll';
import {
  HACKATHON_CATEGORY_AWARDS,
  HACKATHON_COUNTDOWN_TARGET,
  HACKATHON_EVENT,
  HACKATHON_FAQS,
  HACKATHON_HIGHLIGHTS,
  HACKATHON_LINKS,
  HACKATHON_PRIZES,
  HACKATHON_TIMELINE,
  HACKATHON_TOTAL_PRIZE_POOL,
  type FAQItem,
} from '../components/hackathon/hackathonData';
import '../components/styles/fadeSlideUpAnimation.css';
import '../components/styles/hackathonLanding.css';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

const accentPalette = ['#FF9FC4', '#FF9770', '#FFD670', '#268AF9', '#B1E0FF'];

function getCountdownTime(targetDateString: string): CountdownTime {
  const now = new Date().getTime();
  const targetTime = new Date(targetDateString).getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isStarted: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isStarted: false,
  };
}

function CountdownStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md px-4 py-3 text-center min-w-21">
      <p className="text-2xl md:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-dosis)' }}>
        {String(value).padStart(2, '0')}
      </p>
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">{label}</p>
    </div>
  );
}

function CTAButton({
  href,
  label,
  isPrimary,
}: {
  href: string;
  label: string;
  isPrimary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`hack-cta inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base md:text-lg font-bold border transition-all duration-300 ${
        isPrimary
          ? 'bg-(--color-accent-yellow) text-slate-900 border-(--color-accent-yellow)'
          : 'bg-white/10 text-white border-white/35 backdrop-blur-md'
      }`}
      style={{ fontFamily: 'var(--font-dosis)' }}
    >
      {label}
    </a>
  );
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/6 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
      >
        <span className="text-lg text-white font-semibold" style={{ fontFamily: 'var(--font-dosis)' }}>
          {item.question}
        </span>
        <span className="text-xl text-white/80" aria-hidden="true">
          {open ? '-' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)' }}>
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function HackToTheFuturePage() {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    getCountdownTime(HACKATHON_COUNTDOWN_TARGET),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownTime(HACKATHON_COUNTDOWN_TARGET));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const totalScheduleItems = useMemo(
    () => HACKATHON_TIMELINE.reduce((total, day) => total + day.items.length, 0),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PatternBackground />

      <div className="hack-glow-orb hack-glow-orb-one" />
      <div className="hack-glow-orb hack-glow-orb-two" />

      <main className="relative z-10 px-4 md:px-8 pb-16">
        <section className="max-w-6xl mx-auto pt-8 md:pt-12">
          <div className="rounded-3xl border border-white/20 bg-black/20 backdrop-blur-xl px-5 md:px-8 py-5 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/logos/LCS_Icon_White_SVG.svg"
                alt="LCS"
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <div>
                <p className="text-white text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
                  {HACKATHON_EVENT.title}
                </p>
                <p className="text-white/75 text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  Hosted by {HACKATHON_EVENT.host}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm uppercase tracking-[0.17em] text-white/75">{HACKATHON_EVENT.dateRange}</p>
              <Link
                to="/"
                className="rounded-xl border border-white/30 text-white px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-dosis)' }}
              >
                Back to LCS Site
              </Link>
            </div>
          </div>

          <RevealOnScroll visibleClassName="fadeSlideUpFromBottom" rootMargin="30px" once={true}>
            <div className="rounded-4xl border border-white/15 bg-linear-to-br from-[#133151]/90 via-[#0E2A46]/80 to-[#0b1f37]/80 px-6 md:px-10 py-10 md:py-14 shadow-[0_30px_120px_rgba(3,8,18,0.55)] relative overflow-hidden">
              <div className="absolute inset-0 hack-hero-grid" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <p className="inline-block rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs md:text-sm uppercase tracking-[0.2em] text-white/85 mb-5">
                    {HACKATHON_EVENT.duration}
                  </p>
                  <h1
                    className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95]"
                    style={{ fontFamily: 'var(--font-dosis)' }}
                  >
                    Welcome to {HACKATHON_EVENT.title}
                  </h1>
                  <p
                    className="mt-5 text-white/85 text-base md:text-lg leading-relaxed max-w-xl"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    {HACKATHON_EVENT.subtitle}. Build something that helps students bridge the gap between school and their first internship.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <CTAButton href={HACKATHON_LINKS.signup} label="Sign Up Now" isPrimary={true} />
                    <CTAButton href={HACKATHON_LINKS.devpost} label="View Devpost" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/20 bg-black/25 backdrop-blur-md p-6 md:p-7">
                  <p className="text-white uppercase tracking-[0.2em] text-xs md:text-sm">Countdown to Kickoff</p>

                  {countdown.isStarted ? (
                    <p className="text-(--color-accent-yellow) text-3xl md:text-4xl font-extrabold mt-4 leading-tight" style={{ fontFamily: 'var(--font-dosis)' }}>
                      The Hackathon Is Live
                    </p>
                  ) : (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <CountdownStat label="Days" value={countdown.days} />
                      <CountdownStat label="Hours" value={countdown.hours} />
                      <CountdownStat label="Minutes" value={countdown.minutes} />
                      <CountdownStat label="Seconds" value={countdown.seconds} />
                    </div>
                  )}

                  <p className="text-white/80 text-sm mt-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    Friday, March 27 at 7:30 PM (ET)
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="max-w-6xl mx-auto mt-16">
          <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="lg:col-span-6 rounded-3xl border border-white/15 bg-white/6 backdrop-blur-md p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-white/75 mb-4">{HACKATHON_EVENT.challengeTitle}</p>
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-dosis)' }}>
                  Build a mentorship system that actually helps students win their first internship.
                </h2>
                <p className="text-white/85 mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  {HACKATHON_EVENT.challengeDescription}
                </p>
              </div>

              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
                {HACKATHON_HIGHLIGHTS.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md"
                    style={{
                      boxShadow: `0 18px 40px color-mix(in srgb, ${accentPalette[index % accentPalette.length]} 18%, transparent)`,
                    }}
                  >
                    <h3 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-dosis)' }}>
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="max-w-6xl mx-auto mt-16">
          <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
            <div className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-md p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
                  Full Schedule
                </h2>
                <p className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  {totalScheduleItems} key moments across 3 days
                </p>
              </div>

              <div className="mt-7 space-y-6">
                {HACKATHON_TIMELINE.map((day, dayIndex) => (
                  <div key={day.day} className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <h3 className="text-2xl text-white font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
                        {day.day}
                      </h3>
                      <span
                        className="rounded-full px-3 py-1 text-xs border border-white/25 text-white/75 w-fit"
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                      >
                        {day.dateLabel}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {day.items.map((item, itemIndex) => (
                        <div
                          key={`${day.day}-${item.time}-${item.title}`}
                          className="hack-timeline-item rounded-xl border border-white/10 bg-white/5 p-4"
                          style={{
                            animationDelay: `${(dayIndex * 0.12 + itemIndex * 0.08).toFixed(2)}s`,
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                            <p className="text-(--color-accent-light-blue) font-semibold text-sm uppercase tracking-[0.08em]">
                              {item.time}
                            </p>
                            <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-dosis)' }}>
                              {item.title}
                            </p>
                          </div>
                          {item.details && (
                            <p className="mt-2 text-white/75 text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
                              {item.details}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="max-w-6xl mx-auto mt-16 grid lg:grid-cols-12 gap-6 md:gap-8">
          <RevealOnScroll className="lg:col-span-7" visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
            <div className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-md p-6 md:p-7 h-full">
              <h2 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
                Prizes and Awards
              </h2>
              <p className="mt-2 text-white/75" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Total prize pool: {HACKATHON_TOTAL_PRIZE_POOL}
              </p>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {HACKATHON_PRIZES.map((prize, index) => (
                  <div
                    key={prize.placement}
                    className="rounded-2xl border border-white/15 bg-black/25 p-4"
                    style={{
                      boxShadow: `0 10px 30px color-mix(in srgb, ${accentPalette[index]} 20%, transparent)`,
                    }}
                  >
                    <p className="text-sm uppercase tracking-[0.16em] text-white/65">{prize.placement}</p>
                    <p className="text-3xl text-white font-extrabold mt-1" style={{ fontFamily: 'var(--font-dosis)' }}>
                      {prize.amount}
                    </p>
                    <p className="text-white/75 text-sm mt-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                      {prize.description}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-white text-xl font-bold mt-7" style={{ fontFamily: 'var(--font-dosis)' }}>
                Category Awards
              </h3>
              <div className="mt-3 space-y-3">
                {HACKATHON_CATEGORY_AWARDS.map((award) => (
                  <div key={award.placement} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-dosis)' }}>
                        {award.placement}
                      </p>
                      <p className="text-(--color-accent-yellow) font-bold">{award.amount}</p>
                    </div>
                    <p className="text-white/70 text-sm mt-1" style={{ fontFamily: 'var(--font-montserrat)' }}>
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-5" visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
            <div className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-md p-6 md:p-7 h-full">
              <h2 className="text-white text-3xl font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
                FAQ
              </h2>
              <p className="text-white/70 text-sm mt-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Quick answers before you start building.
              </p>

              <div className="mt-5 space-y-3">
                {HACKATHON_FAQS.map((faq, index) => (
                  <FAQRow key={faq.question} item={faq} index={index} />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="max-w-6xl mx-auto mt-16">
          <RevealOnScroll visibleClassName="fadeSlideUpFromBottom" rootMargin="20px" once={true}>
            <div className="rounded-3xl border border-(--color-accent-yellow)/45 bg-[linear-gradient(120deg,rgba(255,214,112,0.2),rgba(17,43,70,0.6))] px-6 md:px-10 py-8 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-white/80 uppercase tracking-[0.17em] text-xs">Ready to ship?</p>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mt-2" style={{ fontFamily: 'var(--font-dosis)' }}>
                  Build your team. Build your project. Build your future.
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <CTAButton href={HACKATHON_LINKS.signup} label="Join the Hackathon" isPrimary={true} />
                <CTAButton href={HACKATHON_LINKS.devpost} label="Open Devpost" />
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>
    </div>
  );
}