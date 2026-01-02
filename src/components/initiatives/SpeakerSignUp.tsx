export default function SpeakerSignup() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative bg-gray-950 rounded-3xl border border-yellow-400 p-4 sm:p-6 md:p-8 overflow-hidden" style={{ borderColor: 'var(--color-accent-yellow)' }}>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Placeholder for graphic */}
          <div className="shrink-0 w-32 h-28 sm:w-40 sm:h-32 md:w-48 md:h-40 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-xs sm:text-sm">Graphic Placeholder</p>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0 w-full">
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 text-center md:text-left wrap-break-word" style={{ fontFamily: 'Dosis, sans-serif' }}>
              WANT TO BE A SPEAKER AT OUR NEXT MTP SESSION?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-4 md:mb-6 text-center md:text-left wrap-break-word" style={{ fontFamily: 'Dosis, sans-serif' }}>
              We'd love to hear from anyone eager to inform the youth of today about the dangers of the outside world [employement]. Click the button below and sign up to attend our next session!
            </p>
            <div className="flex justify-center">
              <button 
                className="font-semibold px-4 sm:px-6 py-2 rounded-md transition-all border hover:bg-yellow-400/10 text-sm sm:text-base"
                style={{ 
                  fontFamily: 'Dosis, sans-serif',
                  color: 'var(--color-accent-yellow)',
                  borderColor: 'var(--color-accent-yellow)'
                }}
              >
                SPEAKER SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
