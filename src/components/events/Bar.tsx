type BarProps = {
  progress?: number; // 0 to 1
};

function Bar({ progress = 0 }: BarProps) {
  // Prevent flash at 100%: only animate when progress > 0
  const percent = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <div className="w-full h-2 bg-gray-700 m-0 p-0 rounded-b-2xl overflow-hidden">
      <div
        className="h-full bg-white m-0 p-0 transition-all"
        style={{
          width: progress > 0 ? `${percent}%` : '0%',
          transition: progress === 0 ? 'none' : 'width 4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </div>
  );
}

export default Bar;