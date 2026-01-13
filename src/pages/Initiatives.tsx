import SpeakerSignup from '../components/initiatives/SpeakerSignUp';
import MeetThePros from '../components/initiatives/MeetThePros';

export default function Initiatives() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4">
      <MeetThePros />
      <SpeakerSignup />
    </div>
  );
}
