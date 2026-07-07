type Props = {
  title: string;
  description: string;
  genre: string;
  platforms: string[];
  releaseDate: string;
  coop: boolean;
  controller: boolean;
};

export function GameCard({
  title,
  description,
  genre,
  platforms,
  releaseDate,
  coop,
  controller,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600">

      <div className="mb-6 h-48 rounded-2xl bg-zinc-800" />

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs">

        <span className="rounded-full bg-zinc-800 px-3 py-1">
          {genre}
        </span>

        <span className="rounded-full bg-zinc-800 px-3 py-1">
          {platforms.join(" • ")}
        </span>

        <span className="rounded-full bg-zinc-800 px-3 py-1">
          {releaseDate}
        </span>

        {coop && (
          <span className="rounded-full bg-zinc-800 px-3 py-1">
            Coop
          </span>
        )}

        {controller && (
          <span className="rounded-full bg-zinc-800 px-3 py-1">
            Controller
          </span>
        )}

      </div>

    </div>
  );
}