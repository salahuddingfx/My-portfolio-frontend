'use client';

import { useEffect } from 'react';

export default function DevToolsProtector() {
  useEffect(() => {
    // Only run in production OR if testing query parameter is present: ?test_protection=true
    const isProduction = process.env.NODE_ENV === 'production';
    const isTestMode = typeof window !== 'undefined' && window.location.search.includes('test_protection=true');

    if (!isProduction && !isTestMode) {
      return;
    }

    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // 2. Disable DevTools and Inspect Hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Disable Ctrl+Shift+I, J, C, K (Windows/Linux) and Cmd+Opt+I, J, C, K (macOS)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k'].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }

      // Disable Ctrl+U (View Source) and Ctrl+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && ['U', 'u', 'S', 's'].includes(e.key)) {
        e.preventDefault();
        return;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // 3. Keep Console Clear and Print Warning
    try {
      console.log(
        '%cRestricted Access %c\nUnauthorized inspect or console execution is disabled.',
        'color: #ff3333; font-size: 24px; font-weight: bold; font-family: sans-serif;',
        'color: #ffffff; font-size: 14px; font-family: sans-serif;'
      );
    } catch (e) {}

    // Continuously clear console (if supported/not overridden yet)
    const consoleClearInterval = setInterval(() => {
      try {
        console.clear();
      } catch (err) {}
    }, 250);

    // Override console output to prevent any new command response visibility or console logs
    const noop = () => {};
    try {
      console.log = noop;
      console.info = noop;
      console.warn = noop;
      console.error = noop;
      console.debug = noop;
    } catch (err) {}

    // 4. Debugger Loop (Anti-Debugging Trap)
    // Runs an obfuscated debugger statement. When DevTools is opened, this halts execution immediately.
    const startDebuggerTrap = () => {
      const runTrap = () => {
        try {
          (function () {
            return false;
          }
            .constructor('de' + 'bu' + 'gg' + 'er')
            .call());
        } catch (err) {}
      };
      
      const trapInterval = setInterval(runTrap, 100);
      return () => clearInterval(trapInterval);
    };

    const stopDebuggerTrap = startDebuggerTrap();

    // Clean up all listeners and intervals when component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleClearInterval);
      stopDebuggerTrap();
    };
  }, []);

  return null;
}
