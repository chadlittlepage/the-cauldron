interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  className?: string;
}

const TICK_COUNT = 5;

function getAxisTicks(max: number): number[] {
  if (max <= 0) return [0, 1, 2, 3, 4];
  const ceilMax = Math.ceil(max / (TICK_COUNT - 1)) * (TICK_COUNT - 1);
  const step = ceilMax / (TICK_COUNT - 1);
  return Array.from({ length: TICK_COUNT }, (_, i) => Math.round(i * step));
}

export function BarChart({ data, color = '#4a556c', height = 160, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const ticks = getAxisTicks(max);
  const axisMax = ticks[ticks.length - 1] || 1;

  return (
    <div className={className}>
      <div className="flex" style={{ height }}>
        {/* Y-axis */}
        <div className="flex flex-col justify-between pr-2 py-0" style={{ height }}>
          {[...ticks].reverse().map((tick) => (
            <span
              key={tick}
              className="text-[11px] text-hex-muted leading-none text-right min-w-[20px]"
            >
              {tick}
            </span>
          ))}
        </div>
        {/* Bars */}
        <div className="flex-1 flex items-end gap-2 border-l border-b border-hex-border pl-2 pb-1">
          {data.map((d) => {
            const barHeight = (d.value / axisMax) * 100;
            return (
              <div key={d.label} className="flex flex-1 flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${barHeight}%`,
                    minHeight: d.value > 0 ? 4 : 0,
                    backgroundColor: color,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* X-axis labels */}
      <div className="flex gap-2 ml-[28px] pl-2 mt-1">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center">
            <span className="text-[11px] text-hex-muted truncate block">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StackedBarSegment {
  value: number;
  color: string;
}

interface StackedBarChartProps {
  data: { label: string; segments: StackedBarSegment[] }[];
  height?: number;
  className?: string;
}

export function StackedBarChart({ data, height = 180, className }: StackedBarChartProps) {
  const max = Math.max(...data.map((d) => d.segments.reduce((s, seg) => s + seg.value, 0)), 1);
  const ticks = getAxisTicks(max);
  const axisMax = ticks[ticks.length - 1] || 1;

  return (
    <div className={className}>
      <div className="flex" style={{ height }}>
        {/* Y-axis */}
        <div className="flex flex-col justify-between pr-2 py-0" style={{ height }}>
          {[...ticks].reverse().map((tick) => (
            <span
              key={tick}
              className="text-[11px] text-hex-muted leading-none text-right min-w-[20px]"
            >
              {tick}
            </span>
          ))}
        </div>
        {/* Bars */}
        <div className="flex-1 flex items-end gap-2 border-l border-b border-hex-border pl-2 pb-1">
          {data.map((d) => {
            const total = d.segments.reduce((s, seg) => s + seg.value, 0);
            const barHeight = (total / axisMax) * 100;
            return (
              <div key={d.label} className="flex flex-1 flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-md overflow-hidden flex flex-col-reverse"
                  style={{ height: `${barHeight}%`, minHeight: total > 0 ? 4 : 0 }}
                >
                  {d.segments.map(
                    (seg) =>
                      seg.value > 0 && (
                        <div
                          key={seg.color}
                          className="w-full"
                          style={{
                            height: `${(seg.value / total) * 100}%`,
                            backgroundColor: seg.color,
                          }}
                        />
                      ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* X-axis labels */}
      <div className="flex gap-2 ml-[28px] pl-2 mt-1">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center">
            <span className="text-[11px] text-hex-muted truncate block">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface HorizontalBarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  className?: string;
}

export function HorizontalBarChart({
  data,
  color = '#4a556c',
  className,
}: HorizontalBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const ticks = getAxisTicks(max);
  const axisMax = ticks[ticks.length - 1] || 1;

  return (
    <div className={className}>
      <div className="space-y-4">
        {data.map((d) => {
          const barWidth = (d.value / axisMax) * 100;
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="text-sm text-hex-muted w-8 text-right shrink-0">{d.label}</span>
              <div className="flex-1 h-8 bg-hex-surface/60 rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    minWidth: d.value > 0 ? 4 : 0,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* X-axis ticks */}
      <div className="flex justify-between ml-11 mt-2 border-t border-hex-border pt-1">
        {ticks.map((tick) => (
          <span key={tick} className="text-[11px] text-hex-muted">
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
