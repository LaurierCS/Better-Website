import { useState } from "react";

type EventImageProps = {
  src: string;
  alt?: string;
};

function EventImage({ src, alt }: EventImageProps) {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-slate-700 text-center">
      {alt || "Event"}
    </div>
  ) : (
    <img
      src={src}
      alt={alt || "Event"}
      className="object-cover w-full h-full"
      style={{ minHeight: '100%', minWidth: '100%' }}
      onError={() => setImgError(true)}
    />
  );
}

export default EventImage;