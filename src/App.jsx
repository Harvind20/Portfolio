import React, { useState } from 'react';
import { Home, User, Code, Briefcase, History, Award, Mail } from 'lucide-react';
import NotePane from './components/NotePane';
import StatusBar from './components/StatusBar';
import { notesData } from './data/notes';
import { NavBar } from './components/ui/tubelight-navbar';

export default function App() {
  // Notes state
  const [notes, setNotes] = useState(notesData);

  // Active note
  const [activeNoteId, setActiveNoteId] = useState('welcome');

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
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

  const navItems = [
    { name: 'Home', id: 'welcome', icon: Home },
    { name: 'About', id: 'about', icon: User },
    { name: 'Skills', id: 'skills', icon: Code },
    { name: 'Projects', id: 'projects', icon: Briefcase },
    { name: 'Experience', id: 'experience', icon: History },
    { name: 'Certs', id: 'certifications', icon: Award },
    { name: 'Contact', id: 'contact', icon: Mail }
  ];

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      
      {/* Top Tubelight Navigation Bar */}
      <NavBar
        items={navItems}
        activeTabId={activeNoteId}
        onSelect={handleSelectNote}
      />

      <div className="app-container" style={{ height: '100%', width: '100%' }}>
        {/* Note Editor and Preview Workspace */}
        <NotePane
          notes={notes}
          activeNoteId={activeNoteId}
          openNotesList={[activeNoteId]}
          onSelectNote={handleSelectNote}
          onCloseNote={() => {}}
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
