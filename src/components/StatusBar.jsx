import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function StatusBar({ activeNote }) {
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
        {activeNote && activeNote.content.trim().length > 0 && (
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
          <span>LN: Web</span>
        </div>
        <div className="status-item">
          <span>UTF-8</span>
        </div>
      </div>
    </footer>
  );
}
