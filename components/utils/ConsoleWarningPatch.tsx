'use client';

// Execute immediately when evaluated in the browser
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = function (...args: unknown[]) {
    const first = args[0];
    if (
      typeof first === 'string' &&
      (first.includes('THREE.Clock: This module has been deprecated') ||
       first.includes('Download the React DevTools'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export function ConsoleWarningPatch() {
  return null;
}
