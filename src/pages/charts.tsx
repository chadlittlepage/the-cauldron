import { useState } from 'react';
import { useCharts, useChartPeriods } from '@/hooks/use-charts';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { ChartTable } from '@/components/chart/chart-table';
import { PeriodSelector } from '@/components/chart/period-selector';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { BarChart3, Trophy } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { ChartType } from '@/types/database';

function now() {
  const d = new Date();
  return {
    month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    year: String(d.getFullYear()),
  };
}

export function ChartsPage() {
  useDocumentTitle('Charts');
  const current = now();
  const [chartType, setChartType] = useState<ChartType>('monthly');
  const [period, setPeriod] = useState(chartType === 'monthly' ? current.month : current.year);
  const { data: periods } = useChartPeriods();
  const { data: entries, isLoading, isError, error } = useCharts(chartType, period);

  const availablePeriods =
    chartType === 'monthly'
      ? (periods?.monthly ?? [current.month])
      : (periods?.yearly ?? [current.year]);

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full bg-accent-orange/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-orange/10">
              <Trophy className="h-5 w-5 text-accent-orange" />
            </div>
            <h1 className="text-3xl font-bold">Charts</h1>
          </div>
          <p className="text-hex-muted max-w-xl">
            Top tracks ranked by community votes. Updated monthly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Chart type toggle */}
          <div className="flex rounded-lg bg-hex-surface/60 p-1">
            {(['monthly', 'yearly'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setChartType(type);
                  setPeriod(type === 'monthly' ? current.month : current.year);
                }}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                  chartType === type
                    ? 'bg-accent-purple text-white shadow-md shadow-accent-purple/20'
                    : 'text-hex-muted hover:text-hex-text',
                )}
              >
                {type === 'monthly' ? 'Monthly' : 'Yearly'}
              </button>
            ))}
          </div>

          <PeriodSelector
            periods={availablePeriods}
            selected={period}
            onChange={setPeriod}
            className="w-48"
          />
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Alert variant="error" className="max-w-md">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to load charts'}
              </AlertDescription>
            </Alert>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-hex-muted">Loading charts...</p>
          </div>
        ) : !entries?.length ? (
          <EmptyState
            icon={<BarChart3 className="h-10 w-10" />}
            title="No chart data"
            description="Charts are generated at the end of each month based on community votes."
          />
        ) : (
          <ChartTable entries={entries} className="mt-2" />
        )}
      </div>
    </div>
  );
}
