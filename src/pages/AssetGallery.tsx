import React from "react";

// Use Vite's import.meta.glob to import all images from asset folders
const assetImages = {
  letters: import.meta.glob("../assets/letters/*", { eager: true, as: "url" }),
  logos: import.meta.glob("../assets/logos/*", { eager: true, as: "url" }),
  mascots: import.meta.glob("../assets/mascots/*", { eager: true, as: "url" }),
  patterns: import.meta.glob("../assets/patterns/*", { eager: true, as: "url" }),
  doodles: import.meta.glob("../assets/doodles/*", { eager: true, as: "url" }),
};

const AssetGallery: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-t from-slate-800 to-slate-900 px-8 py-16">
      <h1 className="text-white text-4xl font-bold mb-8">All Assets (75x75px)</h1>
      <div className="flex flex-col gap-16 w-full max-w-5xl">
        {Object.entries(assetImages).map(([folder, files]) => (
          <div key={folder}>
            <h2 className="text-white text-2xl font-semibold mb-4 capitalize">{folder}</h2>
            <div className="flex flex-wrap gap-6">
              {Object.entries(files).map(([path, url]) => {
                const file = path.split("/").pop();
                return (
                  <div key={file} className="w-[75px] h-[75px] border border-gray-300 flex items-center justify-center bg-slate-700 rounded-lg">
                    <img
                      src={url as string}
                      alt={file}
                      className="w-[75px] h-[75px] object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AssetGallery;
