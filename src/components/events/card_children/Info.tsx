type InfoProps = {
  title: string;
  description: string;
  date: string;
};

function Info({ title, description, date }: InfoProps) {
  return (
    <div className="bg-[#05081a] text-white font-[Dosis] w-full m-0 p-0 rounded-t-2xl">
      <div className="flex items-center justify-between px-8 pt-4 pb-1">
        <h2 className="text-2xl font-bold uppercase tracking-wide m-0 p-0">{title}</h2>
        {date && <span className="italic text-base m-0 pr-[10px] p-0">{date}</span>}
      </div>
      <div className="px-8 pb-4 mt-2">{/* mt-2 for moderate space between title/date and description */}
        <p className="text-base opacity-90 m-0 p-0">{description}</p>
      </div>
    </div>
  );
}

export default Info;