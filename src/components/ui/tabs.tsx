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
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? '');

  return (
    <div className={className}>
      <div className="flex border-b border-hex-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors -mb-px',
              active === tab.value
                ? 'border-b-2 border-accent-purple text-hex-text'
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
