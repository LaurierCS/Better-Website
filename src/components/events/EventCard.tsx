import Info from './Info';
import Bar from './Bar';

type EventCardProps = {
  title: string;
  description: string;
  date: string;
  progress?: number;
  accentColor: string;
  isActive?: boolean;
};


const EventCard: React.FC<EventCardProps> = ({ title, description, date, progress, accentColor, isActive }) => {
  return (
    <div
      className="relative rounded-2xl transition-all duration-300 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl m-0 p-0"
      style={{
        boxShadow: isActive
          ? `0 1px 16px 4px ${accentColor}` // Stronger glow for active
          : `0 1px 10px 1px ${accentColor}`  // Subtle glow for inactive
      }}
    >
      <div className="relative bg-transparent text-white rounded-2xl shadow-lg z-10 w-full h-full flex flex-col gap-0 m-0 p-0">
        <Info title={title} description={description} date={date} />
        {/* Use key to force Bar re-mount on event switch for clean animation */}
        <Bar progress={progress} key={title + date + progress} />
      </div>
    </div>
  );
};


export default EventCard;