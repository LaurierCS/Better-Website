type BarProps = {
  progress?: number; // 0 to 1
};

function Bar({ progress = 0 }: BarProps) {
  const percent = Math.max(0, Math.min(1, progress)) * 100;
  // If progress is 0, disable transition for instant reset; otherwise, use a smooth transition
  const transition = progress === 0 ? 'none' : 'width 0.2s linear';
  return (
    <div className="w-full h-2 bg-gray-700 m-0 p-0 rounded-b-2xl overflow-hidden">
      <div
        className="h-full bg-white m-0 p-0"
        style={{ width: `${percent}%`, transition }}
      />
    </div>
  );
}

export default Bar;