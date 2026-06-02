import React, { useState, useEffect } from 'react';
import { FolderOpen, Network, FileText } from 'lucide-react';
import Sidebar from './components/Sidebar';
import NotePane from './components/NotePane';
import GraphView from './components/GraphView';
import StatusBar from './components/StatusBar';
import { notesData } from './data/notes';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('obsidian-portfolio-theme');
    return saved || 'dark';
  });

  // Notes state (to allow live edits)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('obsidian-portfolio-notes');
    return saved ? JSON.parse(saved) : notesData;
  });

  // Active note and tabs
  const [activeNoteId, setActiveNoteId] = useState('welcome');
  const [openNotesList, setOpenNotesList] = useState(['welcome']);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile navigation drawers
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showGraphMobile, setShowGraphMobile] = useState(false);

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('obsidian-portfolio-theme', theme);
  }, [theme]);

  // Sync notes to local storage on modification
  useEffect(() => {
    localStorage.setItem('obsidian-portfolio-notes', JSON.stringify(notes));
  }, [notes]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSelectNote = (id) => {
    // Add to open tabs if not present
    if (!openNotesList.includes(id)) {
      setOpenNotesList(prev => [...prev, id]);
    }
    setActiveNoteId(id);
    
    // Auto-close mobile drawers on selection
    setShowSidebarMobile(false);
    setShowGraphMobile(false);
  };

  const handleCloseNote = (id) => {
    const updatedTabs = openNotesList.filter(tabId => tabId !== id);
    setOpenNotesList(updatedTabs);

    // If we closed the active note, switch to another
    if (activeNoteId === id) {
      if (updatedTabs.length > 0) {
        setActiveNoteId(updatedTabs[updatedTabs.length - 1]);
      } else {
        setActiveNoteId(null);
      }
    }
  };

  const handleUpdateNoteContent = (id, newContent) => {
    setNotes(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        content: newContent
      }
    }));
  };

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      
      {/* Mobile Controls Header */}
      <header className="mobile-controls">
        <button 
          onClick={() => {
            setShowSidebarMobile(!showSidebarMobile);
            setShowGraphMobile(false);
          }} 
          className="mobile-toggle-btn"
        >
          <FolderOpen size={16} />
          <span>Explorer</span>
        </button>
        <span className="vault-name">Harvind's Vault</span>
        <button 
          onClick={() => {
            setShowGraphMobile(!showGraphMobile);
            setShowSidebarMobile(false);
          }} 
          className="mobile-toggle-btn"
        >
          <Network size={16} />
          <span>Graph</span>
        </button>
      </header>

      <div className="app-container">
        
        {/* Sidebar with mobile show toggle */}
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className={showSidebarMobile ? 'show' : ''}
        />

        {/* Note Editor and Preview Workspace */}
        <NotePane
          notes={notes}
          activeNoteId={activeNoteId}
          openNotesList={openNotesList}
          onSelectNote={handleSelectNote}
          onCloseNote={handleCloseNote}
          onUpdateNoteContent={handleUpdateNoteContent}
        />

        {/* Graph View with mobile show toggle */}
        <GraphView
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          theme={theme}
          className={showGraphMobile ? 'show' : ''}
        />

      </div>

      {/* Bottom Status Indicator */}
      <StatusBar
        activeNote={notes[activeNoteId]}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
}
