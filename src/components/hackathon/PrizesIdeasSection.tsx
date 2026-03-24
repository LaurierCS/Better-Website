import type { PrizeItem } from './hackathonData';

interface PrizesIdeasSectionProps {
  totalPrizePool: string;
  prizes: PrizeItem[];
  categoryAwards: PrizeItem[];
  accentPalette: string[];
}

export function PrizesIdeasSection({
  totalPrizePool,
  prizes,
  categoryAwards,
  accentPalette,
}: PrizesIdeasSectionProps) {
  return (
    <section id="prizes" className="max-w-6xl mx-auto mt-10 md:mt-14">
      <div className="rounded-3xl border border-white/15 bg-white/6 backdrop-blur-md p-4 sm:p-6 md:p-7 h-full">
        <h2 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-dosis)' }}>
          Prizes and Awards
        </h2>
        <p className="mt-2 text-white/75" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Total prize pool: {totalPrizePool}
        </p>

        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {prizes.map((prize, index) => (
            <div
              key={prize.placement}
              className="rounded-2xl border border-white/15 bg-black/25 p-4 hack-hover-card"
              style={{
                boxShadow: `0 12px 32px color-mix(in srgb, ${accentPalette[index % 3]} 20%, transparent)`,
              }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-white/65">{prize.placement}</p>
              <p className="text-3xl text-white font-extrabold mt-1" style={{ fontFamily: 'var(--font-dosis)' }}>
                {prize.amount}
              </p>
              <p className="text-white/75 text-sm mt-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {prize.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-white text-xl font-bold mt-6" style={{ fontFamily: 'var(--font-dosis)' }}>
          Category Awards
        </h3>
        <div className="mt-3 space-y-3">
          {categoryAwards.map((award) => (
            <div key={award.placement} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hack-hover-card">
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
    </section>
  );
}
