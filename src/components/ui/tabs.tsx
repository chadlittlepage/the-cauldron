import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultValue, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? '');

  function handleChange(value: string) {
    setActive(value);
    onChange?.(value);
  }

  return (
    <div className={className}>
      <div className="flex rounded-lg bg-hex-surface/60 p-1" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => handleChange(tab.value)}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
              active === tab.value
                ? 'bg-accent-purple text-white shadow-md shadow-accent-purple/20'
                : 'text-hex-muted hover:text-hex-text',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {tabs.find((t) => t.value === active)?.content}
      </div>
    </div>
  );
}
