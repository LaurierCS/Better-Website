/**
 * EventsList Component
 * Fetches events from Supabase and renders them as a responsive grid of EventCards.
 * Handles loading, error, and empty states gracefully.
 */

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../services/supabase';
import { EventCard, type Event } from './EventCard';
import RevealOnScroll from '../universal/RevealOnScroll';
import ScrapbookText from '../universal/ScrapbookText';
import '../../components/styles/fadeSlideUpAnimation.css';

type SortOrder = 'upcoming' | 'past';

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<SortOrder>('upcoming');

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: sbError } = await supabase
        .from('events')
        .select('id, title, description, date, time, location, picture_url')
        .order('date', { ascending: true });

      if (sbError) throw sbError;
      setEvents((data as Event[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const today = new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter((e) =>
    filter === 'upcoming' ? e.date >= today : e.date < today
  );

  const upcomingCount = events.filter((e) => e.date >= today).length;
  const pastCount     = events.filter((e) => e.date < today).length;

  return (
    <section id="events" className="w-full flex flex-col items-center justify-center px-4 pt-48 pb-16">
      <div className="w-full max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <RevealOnScroll
          visibleClassName="fadeSlideUpFromBottom"
          className="mb-10"
          rootMargin="50px"
          once={true}
        >
          <ScrapbookText
            text="UPCOMING EVENTS"
            letterSize={112}
            mobileLetterSize={56}
            className="text-left"
          />
        </RevealOnScroll>

        {/* ── Filter Tabs ── */}
        <RevealOnScroll
          visibleClassName="fadeSlideUpFast"
          rootMargin="30px"
          once={true}
          className="mb-8"
        >
          <div className="flex gap-3 flex-wrap">
            {(['upcoming', 'past'] as SortOrder[]).map((tab) => {
              const count = tab === 'upcoming' ? upcomingCount : pastCount;
              const isActive = filter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background:   isActive ? '#FFD670' : 'rgba(255,255,255,0.06)',
                    color:        isActive ? '#2C3844'  : '#9ca3af',
                    border:       isActive ? '1.5px solid #FFD670' : '1.5px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(44,56,68,0.3)' : 'rgba(255,255,255,0.08)',
                      color:      isActive ? '#2C3844' : '#6b7280',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFD670]" />
              <p className="mt-4 text-gray-400 font-montserrat text-sm">Loading events…</p>
            </div>
          </div>
        )}

        {/* ── Error State ── */}
        {error && !loading && (
          <div className="rounded-xl p-5 font-montserrat text-sm text-red-300 text-center"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
            Failed to load events. Please try again later.
          </div>
        )}

        {/* ── Events Grid ── */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {filteredEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && filteredEvents.length === 0 && (
          <RevealOnScroll visibleClassName="fadeSlideUpFast" rootMargin="20px" once={true}>
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📅</p>
              <p className="font-dosis font-bold text-white text-xl mb-2">
                No {filter} events right now
              </p>
              <p className="font-montserrat text-gray-400 text-sm">
                {filter === 'upcoming'
                  ? "Check back soon — we've got exciting things planned!"
                  : "Past events will appear here once they've wrapped up."}
              </p>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}

export default EventsList;
