import { useState } from 'react';
import { Mascots } from '../universal/Mascots';
import SignUpForm from './SignUpForm';

export default function SpeakerSignup() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="relative bg-gray-950 rounded-3xl border border-yellow-400 p-4 sm:p-6 md:p-8" style={{ borderColor: 'var(--color-accent-yellow)' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Doug Mascot positioned to pop out of top and clip at bottom - trying */}
            <div className="hidden md:block absolute bottom-3 -left-6 sm:-left-2 md:left-2 translate-y-8 pointer-events-none">
              <Mascots mascotSize={300} mobileMascotSize={240} mascotNames={['Doug']} className="" showOverlap={true} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0 w-full md:ml-64 lg:ml-80">
              <h2 className="text-white font-bold text-sm md:text-2xl mb-3 md:mb-4 text-center md:text-left wrap-break-word" style={{ fontFamily: 'Dosis, sans-serif' }}>
                WANT TO BE A SPEAKER AT OUR NEXT MTP SESSION?
              </h2>
              <p className="text-gray-300 text-xs md:text-base mb-4 md:mb-6 text-center md:text-left wrap-break-word" style={{ fontFamily: 'Dosis, sans-serif' }}>
                We'd love to hear from anyone eager to inform the youth of today about the dangers of the outside world [employement]. Click the button below and sign up to attend our next session!
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="font-semibold px-3 sm:px-6 py-2 rounded-md transition-all border hover:bg-yellow-400/10 text-xs md:text-base"
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

      {/* Popup Form Modal */}
      <SignUpForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
