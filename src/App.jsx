import React, { useState, useEffect } from 'react';
import { FolderOpen } from 'lucide-react';
import Sidebar from './components/Sidebar';
import NotePane from './components/NotePane';
import StatusBar from './components/StatusBar';
import { notesData } from './data/notes';

export default function App() {
  // Notes state
  const [notes, setNotes] = useState(notesData);

  // Active note and tabs
  const [activeNoteId, setActiveNoteId] = useState('welcome');
  const [openNotesList, setOpenNotesList] = useState(['welcome']);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile navigation drawer
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const handleSelectNote = (id) => {
    // Add to open tabs if not present
    if (!openNotesList.includes(id)) {
      setOpenNotesList(prev => [...prev, id]);
    }
    setActiveNoteId(id);
    
    // Auto-close mobile drawer on selection
    setShowSidebarMobile(false);
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
          }} 
          className="mobile-toggle-btn"
        >
          <FolderOpen size={16} />
          <span>Explorer</span>
        </button>
        <span className="vault-name">Harvind's Vault</span>
        <div style={{ width: 80 }}></div> {/* spacer to center title */}
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

      </div>

      {/* Bottom Status Indicator */}
      <StatusBar
        activeNote={notes[activeNoteId]}
      />
    </div>
  );
}
