/**
 * Stats Component
 * Displays key club statistics with animated count-up effects
 */

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

/**
 * Individual stat item configuration
 */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string; // Accent color for glow effect
}

/**
 * Stats data configuration
 */
const statsData: StatItem[] = [
  {
    value: 20,
    suffix: '+',
    label: 'Events in a Year',
    color: '#FF9770', // Orange
  },
  {
    value: 44,
    suffix: '+',
    label: 'Executive Members',
    color: '#FFD670', // Yellow
  },
  {
    value: 4000,
    suffix: '+',
    label: 'Students',
    color: '#FF9FC4', // Pink
  },
];

/**
 * Stats Component
 * Renders animated statistics in a responsive grid layout
 */
export const Stats = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    // Small delay for smoother visual experience
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Stats Grid - 1 column mobile, 3 columns desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center"
          >

            {/* Number Container - Animated count-up with very small glow effect */}
            <div className="mb-2">
              <span
                className="text-6xl md:text-7xl font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-dosis)',
                  color: '#ffffff',
                  textShadow: startAnimation
                    ? `0 0 8px ${stat.color}40`
                    : 'none',
                  transition: 'text-shadow 0.5s ease',
                }}
              >
                {/* CountUp Animation Component */}
                {startAnimation ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    useEasing={true}
                    easingFn={(t, b, c, d) => {
                      // Custom easing function (easeOutExpo)
                      return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
                    }}
                  />
                ) : (
                  '0'
                )}
                {/* + sign */}
                <span className="ml-1">
                  {stat.suffix}
                </span>
              </span>
            </div>

            {/* Label Text - Regular weight Dosis font */}
            <p
              className="text-xl md:text-2xl text-gray-300 tracking-wide"
              style={{
                fontFamily: 'var(--font-dosis)',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
