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
    <article
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        transition
        hover:-translate-y-1
        hover:border-zinc-600
      "
    >
      <div
        className="
          flex
          h-48
          items-center
          justify-center
          bg-zinc-800
          text-sm
          text-gray-500
        "
      >
        Game image
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="
              rounded-full
              bg-zinc-800
              px-3
              py-1
              text-xs
              text-gray-300
            "
          >
            {genre}
          </span>

          <span className="text-xs text-gray-500">
            {releaseDate}
          </span>
        </div>

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <p className="mt-3 text-sm text-gray-400">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="
                rounded-full
                bg-zinc-800
                px-3
                py-1
              "
            >
              {platform}
            </span>
          ))}

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
    </article>
  );
}