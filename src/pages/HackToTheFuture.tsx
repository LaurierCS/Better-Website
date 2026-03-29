import { useEffect, useMemo, useState } from 'react';
import {
  HACKATHON_CATEGORY_AWARDS,
  HACKATHON_COUNTDOWN_TARGET,
  HACKATHON_DEVPOST_CHECKLIST,
  HACKATHON_EVENT,
  HACKATHON_FAQS,
  HACKATHON_LINKS,
  HACKATHON_PRESENTATIONS,
  HACKATHON_PRIZES,
  HACKATHON_SUBMISSIONS,
  HACKATHON_TECHNICAL_DETAILS,
  HACKATHON_TIMELINE,
  HACKATHON_TOTAL_PRIZE_POOL,
} from '../components/hackathon/hackathonData';
import { FinalCtaSection } from '../components/hackathon/FinalCtaSection';
import { HeroSection } from '../components/hackathon/HeroSection';
import { PresentationsSection } from '../components/hackathon/PresentationsSection';
import { PrizesIdeasSection } from '../components/hackathon/PrizesIdeasSection';
import { ScheduleSection } from '../components/hackathon/ScheduleSection';
import { SubmissionsFaqSection } from '../components/hackathon/SubmissionsFaqSection';
import '../components/styles/fadeSlideUpAnimation.css';
import '../components/styles/hackathonLanding.css';
import RevealOnScroll from '../components/universal/RevealOnScroll';
import { PatternBackground } from '../components/universal/PatternBackground';

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

      <main className="relative z-10 px-3 sm:px-4 md:px-8 pb-14 md:pb-16">
        <RevealOnScroll visibleClassName="fadeSlideUpFromBottom" rootMargin="30px" once={true}>
          <HeroSection
            title={HACKATHON_EVENT.title}
            host={HACKATHON_EVENT.host}
            dateRange={HACKATHON_EVENT.dateRange}
            duration={HACKATHON_EVENT.duration}
            subtitle={HACKATHON_EVENT.subtitle}
            countdown={countdown}
            links={HACKATHON_LINKS}
          />
        </RevealOnScroll>

        <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
          <PresentationsSection
            presentations={HACKATHON_PRESENTATIONS}
            accentPalette={accentPalette}
          />
        </RevealOnScroll>

        <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
          <ScheduleSection timeline={HACKATHON_TIMELINE} totalScheduleItems={totalScheduleItems} />
        </RevealOnScroll>

        <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
          <PrizesIdeasSection
            totalPrizePool={HACKATHON_TOTAL_PRIZE_POOL}
            prizes={HACKATHON_PRIZES}
            categoryAwards={HACKATHON_CATEGORY_AWARDS}
            accentPalette={accentPalette}
          />
        </RevealOnScroll>

        <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
          <SubmissionsFaqSection
            submissions={HACKATHON_SUBMISSIONS}
            technicalDetails={HACKATHON_TECHNICAL_DETAILS}
            devpostChecklist={HACKATHON_DEVPOST_CHECKLIST}
            faqs={HACKATHON_FAQS}
          />
        </RevealOnScroll>

        <RevealOnScroll visibleClassName="fadeSlideUpFromBottom" rootMargin="20px" once={true}>
          <FinalCtaSection links={HACKATHON_LINKS} />
        </RevealOnScroll>
      </main>
    </div>
  );
}
