const HTMLBox = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* macOS Window Container */}
      <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-[#2C3844]">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e2429] border-b border-slate-700">
          {/* Control Buttons */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF9FC4] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#FFD670] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#268AF9] hover:brightness-110 transition-all" />
          </div>
          
          {/* Filename */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-slate-300 text-base md:text-lg font-montserrat">
            lcs.html
          </div>
          
          {/* Spacer for layout balance */}
          <div className="w-13" />
        </div>

        {/* Code Content */}
        <div className="p-4 md:p-6 overflow-x-auto">
          <div className="font-montserrat font-thin text-base sm:text-lg md:text-xl leading-relaxed">
            {/* Line 1: Opening div tag */}
            <div className="flex">
              <span className="text-[#6B98C4]">&lt;div&nbsp;</span>
              <span className="text-[#FF9770]">id</span>
              <span className="text-white">=</span>
              <span className="text-[#FFD670]">"about-us"</span>
              <span className="text-[#6B98C4]">&gt;</span>
            </div>
            
            {/* Line 2: Opening p tag with indent guide */}
            <div className="flex">
              <span className="inline-block w-8 border-l-2 border-slate-600/30 ml-2" />
              <span className="text-[#6B98C4]">&lt;p&gt;</span>
            </div>
            
            {/* Line 3-6: Text content with deeper indent guide */}
            <div className="flex">
              <span className="inline-block w-8 border-l-2 border-slate-600/30 ml-2" />
              <span className="inline-block w-8 border-l-2 border-slate-600/30 ml-0" />
              <span className="text-slate-200 flex-1">The Laurier Computing Society (LCS) is the official student-run society of Wilfrid Laurier University's Computer Science department. We support students through academic help, career-building events, and a strong tech-focused community.</span>
            </div>
            
            {/* Line 7: Closing p tag with indent guide */}
            <div className="flex">
              <span className="inline-block w-8 border-l-2 border-slate-600/30 ml-2" />
              <span className="text-[#6B98C4]">&lt;/p&gt;</span>
            </div>
            
            {/* Line 8: Closing div tag */}
            <div className="flex">
              <span className="text-[#6B98C4]">&lt;/div&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLBox;
