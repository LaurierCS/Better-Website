interface EventCarouselItemProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

export const EventCarouselItem = ({
  image,
  title,
  date,
  description,
}: EventCarouselItemProps) => {
  return (
    <div
      className="flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Text overlay content - positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Title and Date */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-1 font-dosis">
            {title}
          </h3>
          <p className="text-sm text-gray-200 italic font-montserrat">{date}</p>
        </div>

        {/* Description */}
        <p className="text-gray-100 text-sm leading-relaxed font-montserrat line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};
