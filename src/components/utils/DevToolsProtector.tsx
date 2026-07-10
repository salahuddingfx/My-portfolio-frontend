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

    // 3. Keep Console Restricted and Print Styled Banner
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      clear: console.clear,
    };

    // Print beautiful custom ASCII art banner
    try {
      originalConsole.clear();
      
      const banner = `%c=========================================================
%c      _____  ____  _      ____  _    _ _    _ _    _ 
     / ____|/ __ \\| |    / __ \\| |  | | |  | | |  | |
    | (___ | |  | | |   | |  | | |__| | |__| | |  | |
     \\___ \\| |  | | |   | |  | |  __  |  __  | |  | |
     ____) | |__| | |___| |__| | |  | | |  | | |__| |
    |_____/ \\____/|______\\____/|_|  |_|_|  |_|\\____/ 
                                                     
%c    >> SALAH UDDIN KADER (SAKA CHOWDHURY)
%c    >> Full Stack AI Engineer & Creative Developer
%c=========================================================
%c[!] WARNING: Developer console execution is restricted.
%cUnauthorized inspection or script execution is disabled.
=========================================================`;

      originalConsole.log(
        banner,
        'color: #00ffcc; font-weight: bold; font-family: monospace;', // border
        'color: #00ffff; font-weight: bold; font-family: monospace; text-shadow: 0 0 8px rgba(0,255,255,0.6);', // logo
        'color: #ffffff; font-weight: bold; font-family: monospace; font-size: 13px;', // name
        'color: #888888; font-family: monospace; font-size: 11px;', // title
        'color: #00ffcc; font-weight: bold; font-family: monospace;', // border
        'color: #ff3366; font-weight: bold; font-family: monospace; font-size: 13px;', // warning label
        'color: #aaaaaa; font-family: monospace; font-size: 11px;' // warning text
      );
    } catch (e) {}

    // Override console output to prevent any new command execution visibility
    const warnRestricted = () => {
      try {
        originalConsole.log(
          '%c[!] Restricted: Command line execution is disabled on this site.',
          'color: #ff3366; font-weight: bold; font-family: monospace; font-size: 12px;'
        );
      } catch (err) {}
    };

    try {
      console.log = warnRestricted;
      console.info = warnRestricted;
      console.warn = warnRestricted;
      console.error = warnRestricted;
      console.debug = warnRestricted;
    } catch (err) {}

    // 4. Debugger Loop (Anti-Debugging Trap)
    // Runs an obfuscated debugger statement recursively. When DevTools is opened, this halts execution immediately.
    let trapTimeoutId: NodeJS.Timeout;
    
    const startDebuggerTrap = () => {
      const runTrap = (index: number) => {
        try {
          (function () {
            return false;
          }
            .constructor('de' + 'bu' + 'gg' + 'er')
            .call());
        } catch (err) {}
        trapTimeoutId = setTimeout(() => runTrap(index + 1), 50);
      };
      
      runTrap(0);
    };

    startDebuggerTrap();

    // Clean up all listeners and intervals when component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(trapTimeoutId);
    };
  }, []);

  return null;
}
