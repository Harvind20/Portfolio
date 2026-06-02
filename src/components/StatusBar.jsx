import React from 'react';
import { Sun, Moon, Info, ShieldCheck } from 'lucide-react';

export default function StatusBar({ activeNote, theme, onToggleTheme }) {
  // Count words and characters
  const wordCount = activeNote 
    ? activeNote.content.trim().split(/\s+/).filter(word => word.length > 0).length 
    : 0;
  const charCount = activeNote ? activeNote.content.length : 0;

  return (
    <footer className="status-bar">
      <div className="status-left">
        <div className="status-item">
          <span className="sync-dot"></span>
          <span>Sync complete</span>
        </div>
        {activeNote && (
          <>
            <div className="status-item">
              <span>{wordCount} words</span>
            </div>
            <div className="status-item">
              <span>{charCount} characters</span>
            </div>
          </>
        )}
      </div>

      <div className="status-right">
        <div className="status-item">
          <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
          <span>AES-256</span>
        </div>
        <div className="status-item">
          <span>LN: Markdown</span>
        </div>
        <div className="status-item">
          <span>UTF-8</span>
        </div>
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </footer>
  );
}
