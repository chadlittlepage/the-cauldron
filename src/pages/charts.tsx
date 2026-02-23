import { useState } from 'react';
import { useCharts, useChartPeriods } from '@/hooks/use-charts';
import { ChartTable } from '@/components/chart/chart-table';
import { PeriodSelector } from '@/components/chart/period-selector';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Tabs } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import type { ChartType } from '@/types/database';

function now() {
  const d = new Date();
  return {
    month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    year: String(d.getFullYear()),
  };
}

export function ChartsPage() {
  const current = now();
  const [chartType, setChartType] = useState<ChartType>('monthly');
  const [period, setPeriod] = useState(chartType === 'monthly' ? current.month : current.year);
  const { data: periods } = useChartPeriods();
  const { data: entries, isLoading } = useCharts(chartType, period);

  const availablePeriods =
    chartType === 'monthly' ? periods?.monthly ?? [current.month] : periods?.yearly ?? [current.year];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Charts</h1>
      <p className="mt-2 text-hex-muted">Top tracks ranked by community votes</p>

      <div className="mt-6 flex items-center gap-4">
        <Tabs
          tabs={[
            {
              value: 'monthly',
              label: 'Monthly',
              content: null,
            },
            {
              value: 'yearly',
              label: 'Yearly',
              content: null,
            },
          ]}
          defaultValue={chartType}
        />
        <div className="flex gap-2">
          <button
            onClick={() => { setChartType('monthly'); setPeriod(current.month); }}
            className={`rounded-md px-3 py-1.5 text-sm ${chartType === 'monthly' ? 'bg-accent-purple text-white' : 'text-hex-muted hover:text-hex-text'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => { setChartType('yearly'); setPeriod(current.year); }}
            className={`rounded-md px-3 py-1.5 text-sm ${chartType === 'yearly' ? 'bg-accent-purple text-white' : 'text-hex-muted hover:text-hex-text'}`}
          >
            Yearly
          </button>
        </div>
        <PeriodSelector
          periods={availablePeriods}
          selected={period}
          onChange={setPeriod}
          className="w-40"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : !entries?.length ? (
        <EmptyState
          icon={<BarChart3 className="h-12 w-12" />}
          title="No chart data"
          description="Charts are generated at the end of each month."
        />
      ) : (
        <ChartTable entries={entries as never} className="mt-8" />
      )}
    </div>
  );
}
