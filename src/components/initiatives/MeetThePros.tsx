import ScrapbookText from "../universal/ScrapbookText";

export default function MeetThePros() {
    return (
    <div className="max-w-4xl w-full px-4 overflow-hidden">
        <ScrapbookText text="MEET THE" letterSize={112} mobileLetterSize={48} />
        <div className="font-bold text-white text-center pl-10 font-dosis text-[3.2rem] sm:text-[5.2rem] leading-tight">
            Professionals
        </div>
    </div>
    );
}