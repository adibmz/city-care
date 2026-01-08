import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider';

/**
 * @returns {{ push: (toast: { type?: 'success' | 'error' | 'info', message: string }) => void }}
 */
export function useToast() {
  return useContext(ToastContext);
}
