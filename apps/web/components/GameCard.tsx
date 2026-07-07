type Props = {
  title: string;
  genre: string;
  platform: string;
};

export function GameCard({
  title,
  genre,
  platform,
}: Props) {

  return (
    <div className="rounded-3xl bg-zinc-900 p-8">

      <div className="mb-6 h-48 rounded-xl bg-zinc-800" />

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-gray-400">
        {genre}
      </p>

      <p className="text-gray-500">
        {platform}
      </p>

    </div>
  );
}