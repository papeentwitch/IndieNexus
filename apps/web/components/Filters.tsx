type Props = {
    platform: string;
    setPlatform: (value: string) => void;

    status: string;
    setStatus: (value: string) => void;

    coop: boolean;
    setCoop: (value: boolean) => void;

    controller: boolean;
    setController: (value: boolean) => void;

    text: {
        allPlatforms: string;
        allStatus: string;
        released: string;
        upcoming: string;
        development: string;
        coop: string;
        controller: string;
    };
};

export function Filters({
    platform,
    setPlatform,
    status,
    setStatus,
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
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded-xl bg-zinc-900 px-4 py-3"
            >
                <option value="">{text.allPlatforms}</option>
                <option>PC</option>
                <option>Switch</option>
                <option>Xbox</option>
                <option>PlayStation</option>
            </select>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl bg-zinc-900 px-4 py-3"
            >
                <option value="">{text.allStatus}</option>
                <option value="released">{text.released}</option>
                <option value="upcoming">{text.upcoming}</option>
                <option value="development">
                    {text.development}
                </option>
            </select>

            <button
                onClick={() => setCoop(!coop)}
                className="rounded-xl bg-zinc-900 px-4 py-3"
            >
                {text.coop} {coop && "✓"}
            </button>

            <button
                onClick={() => setController(!controller)}
                className="rounded-xl bg-zinc-900 px-4 py-3"
            >
                {text.controller} {controller && "✓"}
            </button>
        </div>
    );
}