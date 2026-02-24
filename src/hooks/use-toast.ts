import { useSyncExternalStore } from 'react';

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

type Listener = () => void;

let nextId = 0;
let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

function getSnapshot() {
  return toasts;
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addToast(message: string, variant: ToastVariant = 'default', duration = 4000) {
  const id = String(++nextId);
  toasts = [...toasts, { id, message, variant }];
  emit();
  if (duration > 0) {
    setTimeout(() => dismissToast(id), duration);
  }
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function useToasts() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// Convenience helpers
export const toast = {
  success: (message: string) => addToast(message, 'success'),
  error: (message: string) => addToast(message, 'error'),
  warning: (message: string) => addToast(message, 'warning'),
  info: (message: string) => addToast(message, 'default'),
};
