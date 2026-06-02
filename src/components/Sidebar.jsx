import React from 'react';
import { Folder, FileText, Search, FolderOpen } from 'lucide-react';

export default function Sidebar({ notes, activeNoteId, onSelectNote, searchQuery, setSearchQuery, className }) {
  // Group notes by folder
  const folders = {};
  
  Object.values(notes).forEach(note => {
    const folderName = note.folder || 'Unsorted';
    if (!folders[folderName]) {
      folders[folderName] = [];
    }
    folders[folderName].push(note);
  });

  // Filter notes if search query is active
  const hasSearch = searchQuery.trim().length > 0;
  const filteredNotes = Object.values(notes).filter(note => {
    const query = searchQuery.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(query);
    const contentMatch = note.content.toLowerCase().includes(query);
    return titleMatch || contentMatch;
  });

  return (
    <aside className={`sidebar ${className || ''}`}>
      <div className="sidebar-header">
        <span className="vault-logo">
          <FolderOpen size={20} fill="currentColor" fillOpacity={0.2} />
        </span>
        <span className="vault-name">Harvind's Vault</span>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={14} />
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="file-tree">
        {hasSearch ? (
          <div className="search-results">
            <div className="folder-title">Search Results ({filteredNotes.length})</div>
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`file-item ${activeNoteId === note.id ? 'active' : ''}`}
                  onClick={() => onSelectNote(note.id)}
                >
                  <FileText size={15} />
                  <span>{note.title}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: '8px 10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No matches found
              </div>
            )}
          </div>
        ) : (
          Object.keys(folders).map(folderName => (
            <div key={folderName} className="tree-folder">
              <div className="folder-title">
                <Folder size={12} fill="currentColor" fillOpacity={0.1} />
                <span>{folderName}</span>
              </div>
              <div className="folder-contents">
                {folders[folderName].map(note => (
                  <div
                    key={note.id}
                    className={`file-item ${activeNoteId === note.id ? 'active' : ''}`}
                    onClick={() => onSelectNote(note.id)}
                  >
                    <FileText size={14} />
                    <span>{note.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
