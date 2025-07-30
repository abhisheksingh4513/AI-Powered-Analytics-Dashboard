"use client";

import { useEffect } from "react";

// Utility to clean up browser storage and prevent quota issues
export function useStorageCleanup() {
  useEffect(() => {
    try {
      // Clear any old data that might be causing quota issues
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('tmp_') || 
          key.startsWith('cache_') ||
          key.includes('old') ||
          key.includes('temp')
        )) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Also clear session storage if needed
      if (sessionStorage.length > 50) {
        sessionStorage.clear();
      }
      
    } catch (error) {
      console.warn('Storage cleanup failed:', error);
    }
  }, []);
}

// Simple storage check to prevent quota issues
export function checkStorageQuota() {
  try {
    const testKey = '__storage_test__';
    const testValue = 'test';
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('Storage quota exceeded, clearing storage:', error);
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (clearError) {
      console.error('Failed to clear storage:', clearError);
    }
    return false;
  }
}
