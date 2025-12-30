export default function SpeakerSignup() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative bg-gray-950 rounded-3xl border border-yellow-400 p-8" style={{ borderColor: 'var(--color-accent-yellow)' }}>
        <div className="flex items-center gap-8">
          {/* Placeholder for graphic */}
          <div className="shrink-0 w-48 h-40 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">Graphic Placeholder</p>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-white font-bold text-2xl mb-4 whitespace-nowrap" style={{ fontFamily: 'Dosis, sans-serif' }}>
              WANT TO BE A SPEAKER AT OUR NEXT MTP SESSION?
            </h2>
            <p className="text-gray-300 text-base mb-6" style={{ fontFamily: 'Dosis, sans-serif' }}>
              We'd love to hear from anyone eager to inform the youth of today about the dangers of the outside world [employement]. Click the button below and sign up to attend our next session!
            </p>
            <div className="flex justify-center">
              <button 
                className="font-semibold px-6 py-2 rounded-md transition-all border hover:bg-yellow-400/10"
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
