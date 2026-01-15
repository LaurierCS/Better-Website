import SpeakerSignup from '../components/initiatives/SpeakerSignUp';
import MeetThePros from '../components/initiatives/MeetThePros';

export default function Initiatives() {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden px-4 py-28 sm:py-40">
      <MeetThePros />
      <SpeakerSignup />
    </div>
  );
}
