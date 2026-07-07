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
    <Link href={`/game/${slug}`}>
      <article className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-600">
        <div className="relative h-48">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="p-6">
          <div className="mb-3 flex justify-between">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
              {genre}
            </span>
            <span className="text-xs text-gray-500">{releaseDate}</span>
          </div>

          <h3 className="text-xl font-bold">{title}</h3>

          <p className="mt-2 text-sm text-gray-500">
            {developer} • {country}
          </p>

          <p className="mt-3 text-sm text-gray-400">{description}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full bg-zinc-800 px-3 py-1"
              >
                {platform}
              </span>
            ))}

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