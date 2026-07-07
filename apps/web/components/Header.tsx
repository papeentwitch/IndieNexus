import { Language } from "../data/translations";

type Props = {
  language: Language;
  setLanguage: (value: Language) => void;
  text: {
    games: string;
    news: string;
    calendar: string;
  };
};

export function Header({ language, setLanguage, text }: Props) {
  return (
    <header className="flex items-center justify-between px-12 py-8">
      <h1 className="text-3xl font-bold">IndieNexus</h1>

      <div className="flex items-center gap-8">
        <nav className="flex gap-6 text-gray-400">
          <span>{text.games}</span>
          <span>{text.news}</span>
          <span>{text.calendar}</span>
        </nav>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-300 outline-none transition hover:border-zinc-600 hover:text-white"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
    </header>
  );
}