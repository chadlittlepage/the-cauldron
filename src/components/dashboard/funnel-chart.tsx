interface FunnelItem {
  label: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelItem[];
  className?: string;
}

export function FunnelChart({ data, className }: FunnelChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={className}>
      <div className="space-y-3">
        {data.map((d) => {
          const pct = Math.round((d.value / max) * 100);
          return (
            <div key={d.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-hex-text">{d.label}</span>
                <span className="text-sm font-semibold text-hex-text">
                  {d.value} ({pct}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-hex-surface/80 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: d.color ?? '#4a556c',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
