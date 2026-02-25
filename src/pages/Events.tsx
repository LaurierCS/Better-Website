/**
 * Events Page
 * Displays upcoming events with interactive gallery and synchronized details
 */

import { useState } from 'react';
import EventDetails from '../components/events/EventDetails';
import EventGallery from '../components/events/EventGallery';
import ScrapbookText from '../components/universal/ScrapbookText';
import { eventsData } from '../data/eventsData';
import '../components/styles/fadeSlideUpAnimation.css';

export default function Events() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = eventsData[currentEventIndex];

  return (
    <section
      id="events"
      className="w-full flex flex-col items-center justify-center overflow-hidden px-4 pt-48"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 fadeSlideUpFromBottom">
          <ScrapbookText
            text="UPCOMING EVENTS"
            letterSize={112}
            mobileLetterSize={56}
            className="text-left"
          />
        </div>

        {/* Main Content: Two-column layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Left: Event Details */}
          <div className="w-full lg:w-[48%] lg:pr-4 min-h-[600px] lg:min-h-[500px] flex flex-col">
            <EventDetails event={currentEvent} eventIndex={currentEventIndex} />
          </div>

          {/* Right: Event Gallery */}
          <div className="w-full lg:w-[52%] sticky top-24 lg:top-32">
            <EventGallery
              events={eventsData}
              currentIndex={currentEventIndex}
              onIndexChange={setCurrentEventIndex}
              autoScrollInterval={6000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
