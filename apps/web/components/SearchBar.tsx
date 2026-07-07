type Props = {
  placeholder: string;
};

export function SearchBar({ placeholder }: Props) {
  return (
    <div className="mt-12 max-w-2xl">
      <input
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          px-6
          py-5
          text-lg
          text-white
          outline-none
          transition
          placeholder:text-gray-500
          focus:border-zinc-600
        "
      />
    </div>
  );
}