type Props = {
  platform: string;
  setPlatform: (value: string) => void;

  coop: boolean;
  setCoop: (value: boolean) => void;

  controller: boolean;
  setController: (value: boolean) => void;

  text: {
    allPlatforms: string;
    coop: string;
    controller: string;
  };
};

export function Filters({
  platform,
  setPlatform,
  coop,
  setCoop,
  controller,
  setController,
  text,
}: Props) {
  return (
    <div className="mb-10 flex flex-wrap gap-4">
      <select
        value={platform}
        onChange={(event) => setPlatform(event.target.value)}
        className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-gray-300 outline-none transition hover:border-zinc-600 hover:text-white"
      >
        <option value="">{text.allPlatforms}</option>
        <option value="PC">PC</option>
        <option value="Switch">Switch</option>
        <option value="Xbox">Xbox</option>
        <option value="PlayStation">PlayStation</option>
      </select>

      <button
        onClick={() => setCoop(!coop)}
        className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-gray-300 transition hover:border-zinc-600 hover:text-white"
      >
        {text.coop} {coop ? "✓" : ""}
      </button>

      <button
        onClick={() => setController(!controller)}
        className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-gray-300 transition hover:border-zinc-600 hover:text-white"
      >
        {text.controller} {controller ? "✓" : ""}
      </button>
    </div>
  );
}