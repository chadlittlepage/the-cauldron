import { useToasts, dismissToast } from '@/hooks/use-toast';
import { ToastContainer } from './toast';

export function Toaster() {
  const toasts = useToasts();
  return <ToastContainer toasts={toasts} onDismiss={dismissToast} />;
}
