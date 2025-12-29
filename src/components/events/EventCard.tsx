import Info from './card_children/Info';
import Bar from './card_children/Bar';

type EventCardProps = {
  title: string;
  description: string;
  date: string;
  progress?: number;
  accentColor: string;
};


const EventCard: React.FC<EventCardProps> = ({ title, description, date, progress, accentColor }) => {
  return (
    <div
      className="relative rounded-2xl transition-all duration-300 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl m-0 p-0"
      style={{
        boxShadow: `0 0 12px 2px ${accentColor}`
      }}
    >
      <div className="relative bg-transparent text-white rounded-2xl shadow-lg z-10 w-full h-full flex flex-col gap-0 m-0 p-0">
        <Info title={title} description={description} date={date} />
        <Bar progress={progress} />
      </div>
    </div>
  );
};


export default EventCard;