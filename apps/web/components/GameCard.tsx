import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  description: string;
  genre: string;
  platforms: string[];
  releaseDate: string;
  image: string;
  developer: string;
  country: string;
  coop: boolean;
  controller: boolean;
};

function shortDescription(description: string) {
  if (description.length <= 140) {
    return description;
  }

  return `${description.slice(0, 140).trim()}...`;
}

export function GameCard({
  slug,
  title,
  description,
  genre,
  platforms,
  releaseDate,
  image,
  developer,
  country,
  coop,
  controller,
}: Props) {
  return (
    <Link href={`/game/${slug}`} className="block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-600">
        <div className="relative h-48 shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex justify-between gap-4">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
              {genre}
            </span>
            <span className="shrink-0 text-xs text-gray-500">{releaseDate}</span>
          </div>

          <h3 className="text-xl font-bold">{title}</h3>

          <p className="mt-2 text-sm text-gray-500">
            {developer} • {country}
          </p>

          <p className="mt-3 min-h-16 text-sm text-gray-400">
            {shortDescription(description)}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-5 text-xs">
            {platforms.slice(0, 3).map((platform) => (
              <span
                key={platform}
                className="rounded-full bg-zinc-800 px-3 py-1"
              >
                {platform}
              </span>
            ))}

            {platforms.length > 3 && (
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                +{platforms.length - 3}
              </span>
            )}

            {coop && (
              <span className="rounded-full bg-zinc-800 px-3 py-1">Coop</span>
            )}

            {controller && (
              <span className="rounded-full bg-zinc-800 px-3 py-1">
                Controller
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}