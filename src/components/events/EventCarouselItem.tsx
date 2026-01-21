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
      className="flex-shrink-0 w-56 h-64 md:w-80 md:h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow relative group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Text overlay content - positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
        {/* Title and Date */}
        <div className="mb-2 md:mb-4">
          <h3 className="text-base md:text-2xl font-bold text-white mb-1 font-dosis">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-200 italic font-montserrat">{date}</p>
        </div>

        {/* Description */}
        <p className="text-gray-100 text-xs md:text-sm leading-relaxed font-montserrat line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};
