export interface StatCard {
  label: string;
  value: string | number;
  hint?: string;
  accent?: boolean;
}
export const StatCards = ({ stats }: { stats: StatCard[] }) => (
  <dl
    className={`grid grid-cols-2 gap-3 ${
      stats.length === 3 ? "md:grid-cols-3" : "lg:grid-cols-4"
    }`}
  >
    {stats.map((stat) => (
      <div className="panel min-w-0 px-4 py-3.5" key={stat.label}>
        <dt className="text-[11px] text-muted">{stat.label}</dt>
        <dd
          className={`mt-1.5 break-words font-mono text-xl leading-snug sm:text-2xl ${
            stat.accent ? "text-[#987922] dark:text-accent" : ""
          }`}
        >
          {stat.value}
        </dd>
        {stat.hint && (
          <p className="mt-1.5 text-[10px] leading-relaxed text-muted">
            {stat.hint}
          </p>
        )}
      </div>
    ))}
  </dl>
);
export const displayTime = (seconds: number) =>
  Number.isFinite(seconds)
    ? `${Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0")}`
    : "—";
