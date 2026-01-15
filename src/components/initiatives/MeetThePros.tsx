import ScrapbookText from "../universal/ScrapbookText";

export default function MeetThePros() {
    return (
    <div className="w-full max-w-4xl mx-auto px-4 overflow-hidden" style={{ fontFamily: 'Dosis, sans-serif' }}>
        <ScrapbookText text="MEET THE" letterSize={112} mobileLetterSize={48} className="justify-start" />

        <h2 className="font-black text-white text-left leading-tight mt-4" style={{ fontFamily: 'Dosis, sans-serif', fontSize: '4.7rem' }}>
            PROFESSIONALS
        </h2>

        <div className="mt-6 text-left font-light text-white text-base md:text-lg leading-relaxed max-w-xl" style={{ fontFamily: 'Dosis, sans-serif' }}>
            <p className="mb-4">
                Our flagship event bringing together professionals from different fields to give students a first hand retelling of the field and provide them with advice.
            </p>
            <p>
                We bring out the coolest guest speakers from the tech industry and giving you a chance to ask questions, hear their experience, and even make meaningful connections.
            </p>
        </div>
    </div>
    );
}