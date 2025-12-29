import React from "react";

interface BarProps {
  progress?: number; // 0 to 1
}

const Bar: React.FC<BarProps> = ({ progress = 0 }) => {
  const percent = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <div className="w-full h-2 bg-gray-700 m-0 p-0 rounded-b-2xl overflow-hidden">
      <div
        className="h-full bg-white m-0 p-0 transition-all duration-100"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default Bar;