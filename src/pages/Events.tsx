/**
 * Events Page
 * Displays upcoming events with interactive gallery and synchronized details
 */

import { useState } from 'react';
import EventDetails from '../components/events/EventDetails';
import EventGallery from '../components/events/EventGallery';
import { eventsData } from '../data/eventsData';
import '../components/styles/fadeSlideUpAnimation.css';

export default function Events() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = eventsData[currentEventIndex];

  return (
    <section
      id="events"
      className="w-full flex flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 fadeSlideUpFromBottom">
          <h2
            className="font-black text-white text-left leading-tight text-4xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Dosis, sans-serif' }}
          >
            UPCOMING EVENTS
          </h2>
        </div>

        {/* Main Content: Two-column layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 items-center">
          {/* Left: Event Details */}
          <div className="w-full lg:w-[42%] lg:pr-4">
            <EventDetails event={currentEvent} eventIndex={currentEventIndex} />
          </div>

          {/* Right: Event Gallery */}
          <div className="w-full lg:w-[60%]">
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
