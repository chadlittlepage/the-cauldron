import { Select } from '@/components/ui/select';

interface PeriodSelectorProps {
  periods: string[];
  selected: string;
  onChange: (period: string) => void;
  className?: string;
}

export function PeriodSelector({ periods, selected, onChange, className }: PeriodSelectorProps) {
  return (
    <Select value={selected} onChange={(e) => onChange(e.target.value)} className={className}>
      {periods.map((period) => (
        <option key={period} value={period}>
          {period}
        </option>
      ))}
    </Select>
  );
}
