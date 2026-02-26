import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hexwave-notification-settings';

interface NotificationSettings {
  submissionUpdates: boolean;
  milestoneAlerts: boolean;
  submissionConfirmations: boolean;
  announcements: boolean;
}

const defaults: NotificationSettings = {
  submissionUpdates: true,
  milestoneAlerts: true,
  submissionConfirmations: true,
  announcements: true,
};

function loadSettings(): NotificationSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return defaults;
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-hex-text">{label}</p>
        <p className="text-xs text-hex-muted">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
          checked ? 'bg-accent-purple' : 'bg-hex-surface'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsTab() {
  const [settings, setSettings] = useState<NotificationSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function update(key: keyof NotificationSettings, value: boolean) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function unsubscribeAll() {
    setSettings({
      submissionUpdates: false,
      milestoneAlerts: false,
      submissionConfirmations: false,
      announcements: false,
    });
  }

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1">Email Notifications</h3>
        <p className="text-sm text-hex-muted mb-4">Choose which emails you'd like to receive.</p>
        <div className="divide-y divide-hex-border">
          <Toggle
            checked={settings.submissionUpdates}
            onChange={(v) => update('submissionUpdates', v)}
            label="Submission Updates"
            description="Get notified when your submission status changes."
          />
          <Toggle
            checked={settings.milestoneAlerts}
            onChange={(v) => update('milestoneAlerts', v)}
            label="Milestone Alerts"
            description="Celebrate when your tracks hit vote milestones."
          />
          <Toggle
            checked={settings.submissionConfirmations}
            onChange={(v) => update('submissionConfirmations', v)}
            label="Submission Confirmations"
            description="Receive a confirmation when you submit a new track."
          />
          <Toggle
            checked={settings.announcements}
            onChange={(v) => update('announcements', v)}
            label="Announcements"
            description="Platform updates, new features, and news."
          />
        </div>
        <div className="mt-4 pt-4 border-t border-hex-border">
          <button
            onClick={unsubscribeAll}
            className="text-sm text-hex-muted hover:text-red-400 transition-colors"
          >
            Unsubscribe from all
          </button>
        </div>
      </div>
    </div>
  );
}
