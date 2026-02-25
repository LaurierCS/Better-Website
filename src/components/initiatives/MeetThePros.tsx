import ScrapbookText from "../universal/ScrapbookText";
import ImageGallery from "../universal/ImageGallery";
import meetTheProsF25 from "../../assets/events/Meet_the_pros_F25.jpg";
import meetTheProsW25 from "../../assets/events/Meet_The_pros_W25.JPG";

export default function MeetThePros() {
    // Image gallery data for Meet the Pros events
    const galleryImages = [meetTheProsF25, meetTheProsW25];
    const galleryCaptions = [
        "Meet the Pros - Fall 2025: Industry professionals sharing their expertise",
        "Meet the Pros - Winter 2025: Networking and Q&A with tech leaders"
    ];

    return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-hidden" style={{ fontFamily: 'Dosis, sans-serif' }}>
        {/* Flex layout: Text on left, Gallery on right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Text Content */}
            <div className="w-full lg:flex-1 lg:max-w-2xl">
                <ScrapbookText text="MEET THE" letterSize={112} mobileLetterSize={48} className="justify-start -ml-5" />

                <h2 className="font-black text-white text-left leading-tight mt-0 md:mt-1 fadeSlideUpFromBottom text-3xl md:text-5xl" style={{ fontFamily: 'Dosis, sans-serif', fontSize: 'clamp(1.875rem, 5vw, 4.7rem)' }}>
                    PROFESSIONALS
                </h2>

                <div className="mt-6 text-left font-light text-white text-sm md:text-lg lg:text-2xl leading-relaxed" style={{ fontFamily: 'Dosis, sans-serif' }}>
                    <p className="mb-4">
                        Our flagship event bringing together professionals from different fields to give students a first hand retelling of the field and provide them with advice.
                    </p>
                    <p>
                        We bring out the coolest guest speakers from the tech industry and giving you a chance to ask questions, hear their experience, and even make meaningful connections.
                    </p>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="w-full lg:flex-1 lg:mt-15">
                <ImageGallery 
                    images={galleryImages} 
                    captions={galleryCaptions}
                    showCounter={false}
                    width="100%"
                    aspectRatio="4/3"
                />
            </div>
        </div>
    </div>
    );
}