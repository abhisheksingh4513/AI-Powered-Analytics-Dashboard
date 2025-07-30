"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

let toastId = 0;
const MAX_TOASTS = 3; // Limit number of toasts to prevent memory issues

const toasts: Toast[] = [];
const listeners: ((toasts: Toast[]) => void)[] = [];

export const showToast = (type: "success" | "error", message: string) => {
  const id = (++toastId).toString();
  const toast: Toast = { id, type, message };
  
  // Remove oldest toast if we exceed max
  if (toasts.length >= MAX_TOASTS) {
    toasts.shift();
  }
  
  toasts.push(toast);
  listeners.forEach(listener => listener([...toasts]));
  
  // Auto remove after 4 seconds (reduced from 5)
  setTimeout(() => {
    removeToast(id);
  }, 4000);
};

const removeToast = (id: string) => {
  const index = toasts.findIndex(toast => toast.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    listeners.forEach(listener => listener([...toasts]));
  }
};

export function ToastContainer() {
  const [toastList, setToastList] = useState<Toast[]>([]);

  const handleToastUpdate = useCallback((newToasts: Toast[]) => {
    setToastList(newToasts);
  }, []);

  useEffect(() => {
    listeners.push(handleToastUpdate);
    
    return () => {
      const index = listeners.indexOf(handleToastUpdate);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [handleToastUpdate]);

  if (toastList.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 bg-background animate-in slide-in-from-right-full duration-300 ${
            toast.type === "success" 
              ? "border-green-500 text-green-700 dark:text-green-400" 
              : "border-red-500 text-red-700 dark:text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          )}
          
          <div className="flex-1 text-sm font-medium break-words">
            {toast.message}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeToast(toast.id)}
            className="h-6 w-6 p-0 hover:bg-transparent flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
