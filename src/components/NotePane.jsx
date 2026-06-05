import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, ArrowRight, Send, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function NotePane({
  notes,
  activeNoteId,
  openNotesList,
  onSelectNote,
  onCloseNote,
  onUpdateNoteContent
}) {
  const [terminalStep, setTerminalStep] = useState(0); // 0: Idle, 1: Name, 2: Email, 3: Msg, 4: Submitting, 5: Done
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');

  const activeNote = notes[activeNoteId];

  // Reset terminal state if note changes
  useEffect(() => {
    if (activeNoteId === 'contact') {
      resetTerminal();
    }
  }, [activeNoteId]);

  if (!activeNote) {
    return (
      <div className="workspace" style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
        <div style={{ textAlign: 'center' }}>
          <FileText size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <p>No note open. Select a note from the file explorer or click on the graph.</p>
        </div>
      </div>
    );
  }

  // Calculate backlinks
  const backlinks = Object.values(notes).filter(note => {
    if (note.id === activeNote.id) return false;
    // Check if other notes contain a reference to this note's title or base title
    const searchTitle = activeNote.title.replace('.md', '');
    return note.content.includes(`[[${activeNote.title}]]`) || note.content.includes(`[[${searchTitle}]]`);
  });

  // Reset terminal
  const resetTerminal = () => {
    setTerminalStep(1);
    setSenderName('');
    setSenderEmail('');
    setSenderMsg('');
    setTerminalInput('');
    setTerminalOutput([
      'HarvindOS Security Terminal [Version 2.0.26]',
      '(c) 2026 Harvind Sethu Pathy. All rights reserved.',
      '',
      'Establishing secure shell link...',
      'Link status: ENCRYPTED (AES-256)',
      '',
      'Please enter your name to initiate transmission:'
    ]);
  };

  // Handle terminal submit
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input && terminalStep < 4) return;

    const newOutput = [...terminalOutput, `visitor@harvind-os:~$ ${input}`];
    setTerminalInput('');

    if (terminalStep === 1) {
      setSenderName(input);
      newOutput.push(`Name accepted: ${input}`);
      newOutput.push('');
      newOutput.push('Please enter your contact email address:');
      setTerminalStep(2);
      setTerminalOutput(newOutput);
    } else if (terminalStep === 2) {
      // Basic email check
      if (!input.includes('@') || !input.includes('.')) {
        newOutput.push('Invalid email format. Please try again:');
        setTerminalOutput(newOutput);
        return;
      }
      setSenderEmail(input);
      newOutput.push(`Email verified: ${input}`);
      newOutput.push('');
      newOutput.push('Type your message details:');
      setTerminalStep(3);
      setTerminalOutput(newOutput);
    } else if (terminalStep === 3) {
      setSenderMsg(input);
      newOutput.push('Message buffered.');
      newOutput.push('');
      newOutput.push('Type "y" to confirm sending, or "r" to reset:');
      setTerminalStep(4);
      setTerminalOutput(newOutput);
    } else if (terminalStep === 4) {
      if (input.toLowerCase() === 'y') {
        newOutput.push('Initializing dispatch sequence...');
        newOutput.push('[████████████████████] 100%');
        newOutput.push('Data packet serialized and transmitted.');
        newOutput.push('Secure channel terminated.');
        newOutput.push('');
        newOutput.push('SUCCESS: Message sent! Confetti loaded.');
        setTerminalOutput(newOutput);
        setTerminalStep(5);
        
        // Trigger confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#a78bfa', '#10b981', '#3b82f6']
        });
      } else {
        newOutput.push('Transmission aborted.');
        setTerminalOutput(newOutput);
        setTerminalStep(1);
        setTimeout(resetTerminal, 1000);
      }
    }
  };

  // Frontmatter fields
  const getFrontmatter = (id) => {
    switch (id) {
      case 'welcome':
        return { type: 'Vault Hub', status: 'Ready to work', tags: ['home', 'interactive'] };
      case 'about':
        return { type: 'Personal Profile', status: 'Internship Seeker', tags: ['about', 'education', 'mmu'] };
      case 'skills':
        return { type: 'Knowledge Base', status: 'Verified', tags: ['tech', 'languages', 'devops'] };
      case 'projects':
        return { type: 'Works Gallery', status: 'Active Development', tags: ['portfolio', 'github', 'systems'] };
      case 'experience':
        return { type: 'Employment Log', status: 'Complete', tags: ['career', 'sports', 'it-support'] };
      case 'certifications':
        return { type: 'Credentials Archive', status: 'Up-to-date', tags: ['training', 'google-cloud', 'machine-learning'] };
      case 'contact':
        return { type: 'Signal Node', status: 'Listening', tags: ['contact', 'email', 'form'] };
      default:
        return { type: 'Document', status: 'Draft', tags: ['note'] };
    }
  };

  const frontmatter = getFrontmatter(activeNote.id);

  // Parse Obsidian internal link format [[Note Name.md]] or [[Note Name]]
  const parseMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Header Level 1
      if (line.startsWith('# ')) {
        return <h1 key={i}>{parseInlineMarkdown(line.slice(2))}</h1>;
      }
      // Header Level 2
      if (line.startsWith('## ')) {
        return <h2 key={i}>{parseInlineMarkdown(line.slice(3))}</h2>;
      }
      // Header Level 3
      if (line.startsWith('### ')) {
        return <h3 key={i}>{parseInlineMarkdown(line.slice(4))}</h3>;
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return <blockquote key={i}>{parseInlineMarkdown(line.slice(2))}</blockquote>;
      }
      // Ordered/Unordered Lists
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={i}>{parseInlineMarkdown(line.slice(2))}</li>;
      }
      // Divider
      if (line.trim() === '---') {
        return <hr key={i} style={{ margin: '24px 0', borderColor: 'var(--border)' }} />;
      }
      // Empty lines
      if (line.trim() === '') {
        return <br key={i} />;
      }

      // Normal paragraph
      return <p key={i}>{parseInlineMarkdown(line)}</p>;
    });
  };

  // Helper to parse links, bold, and codes in a line
  const parseInlineMarkdown = (text) => {
    let parts = [];
    let currentIndex = 0;
    
    // Pattern matches: 
    // 1. Double brackets [[Page.md]] or [[Page|Label]]
    // 2. Bold text **Bold**
    // 3. Monospace code `Code`
    // 4. Standard Markdown link [Label](Url)
    const regex = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      const matchText = match[0];

      // Add text before match
      if (matchIndex > currentIndex) {
        parts.push(text.slice(currentIndex, matchIndex));
      }

      // Process match
      if (matchText.startsWith('[[')) {
        // Wiki Link
        const content = matchText.slice(2, -2);
        const [target, label] = content.split('|');
        const targetClean = target.trim();
        const displayLabel = label ? label.trim() : targetClean;

        // Map note name back to ID
        let noteId = targetClean.toLowerCase().replace('.md', '').replace(/\s+/g, '-');
        // Handle variations
        if (noteId === 'about-me') noteId = 'about';

        parts.push(
          <span 
            key={matchIndex} 
            className="internal-link" 
            onClick={() => onSelectNote(noteId)}
          >
            {displayLabel}
          </span>
        );
      } else if (matchText.startsWith('**')) {
        // Bold
        parts.push(<strong key={matchIndex}>{matchText.slice(2, -2)}</strong>);
      } else if (matchText.startsWith('`')) {
        // Inline code
        parts.push(<code key={matchIndex}>{matchText.slice(1, -1)}</code>);
      } else if (matchText.startsWith('[')) {
        // MD Link
        const labelEnd = matchText.indexOf(']');
        const label = matchText.slice(1, labelEnd);
        const url = matchText.slice(labelEnd + 2, -1);
        parts.push(
          <a key={matchIndex} href={url} target="_blank" rel="noopener noreferrer" className="external-link">
            {label} <ExternalLink size={12} />
          </a>
        );
      }

      currentIndex = regex.lastIndex;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Custom Portfolio Components Inside Notes
  const renderCustomComponent = (id) => {
    if (id === 'projects') {
      const projects = [
        {
          title: "Academic Publication & Research Tracker",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/The-silver-ghost/academicPublication.git",
          desc: "Full-stack academic research ledger built with Flask and SQLite. Features faculty-level analytics dashboards, a responsive vanilla frontend, role-based controls, and secure session management.",
          tags: ["Flask", "SQLite", "JavaScript", "Database Design"]
        },
        {
          title: "Multi-Process C Snakes & Ladders",
          icon: <Terminal className="project-icon" size={20} />,
          desc: "Networked multiplayer game built in C using POSIX socket programming. Engineered client-server packet handshakes, state synchronization, and process failure recovery protocols.",
          tags: ["C Programming", "POSIX Sockets", "Concurrency", "UML Modeling"]
        },
        {
          title: "Java Parking Management System",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/ParkingManagementSystem.git",
          desc: "Desktop automations application employing JDBC and SQLite. Designed architecture separating UI and logic using structural patterns: Facade, Bridge, Builder, and Strategy.",
          tags: ["Java", "Java Swing", "JDBC", "Design Patterns"]
        },
        {
          title: "Java Seminar Management System",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/SeminarManagementSystem.git",
          desc: "Scheduling and grading manager designed for university faculty. Decoupled controller layers using sequence modeling to ensure code modularity and robust file storage.",
          tags: ["Java", "Java Swing", "System Scoping", "Sequence Diagrams"]
        },
        {
          title: "Touch 'n Go Digital Wallet Simulator",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/TouchNGo-Simulator-LDCW6123-.git",
          desc: "Fintech payment simulation in C++ mirroring local ecosystems. Models bank transfers, QR deductions, and P2P transfers utilizing real-time latency threads.",
          tags: ["C++", "Logic Development", "Terminal Simulation"]
        },
        {
          title: "C++ Robot Battlefield Simulator",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/The-silver-ghost/robot-war-simulator.git",
          desc: "OOP-driven autonomous grid simulation. Implemented virtual and multiple inheritance hierarchies to resolve diamond dependency conflicts and dynamic upgrade engines.",
          tags: ["C++", "OOP Design", "Multiple Inheritance", "File-Driven Config"]
        },
        {
          title: "BudgetBadger: Social Finance WebApp",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/Mini-IT-TC4L-Group-7.git",
          desc: "Gamified budgeting tracker for students built in Flask. Supports social metrics (following, leaderboard standings), transaction logging, and automated achievement badge allocations.",
          tags: ["Python", "Flask", "SQLite", "PythonAnywhere"]
        }
      ];

      return (
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card">
              <div className="project-card-header">
                {proj.icon}
                <div className="project-links">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="View Source">
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="project-card-title">{proj.title}</h3>
              <p className="project-card-desc">{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (id === 'certifications') {
      const certifications = [
        {
          date: "May 2026",
          name: "Bash & Linux Workshop",
          issuer: "IT Society Cyberjaya",
          desc: "Hands-on workshop covering advanced command-line navigation, POSIX permission systems, and automated shell scripting.",
          skills: ["Bash", "Linux", "Shell Scripting"]
        },
        {
          date: "Apr 2026",
          name: "Project 2030: Google Stitch Hackathon",
          issuer: "GDG on Campus UTM",
          desc: "Built high-fidelity cloud interfaces bridging UI designs to live web apps using Google Stitch. Configured GCP front-end deployment at scale.",
          skills: ["Google Stitch", "GCP", "UI/UX Handoff", "Generative AI"]
        },
        {
          date: "Apr 2026",
          name: "Morpheus Openclaw Workshop",
          issuer: "IT Society Cyberjaya",
          desc: "Configured agentic automation pipelines powered by Morpheus inference engines.",
          skills: ["Openclaw", "Agentic Automation", "LLM Pipelines"]
        },
        {
          date: "May 2026",
          name: "Mind Of Machines: Introduction to Neural Networks",
          issuer: "GDG on Campus MMU",
          desc: "Trained Deep Learning models in TensorFlow/Keras. Explored Convolutional Neural Network (CNN) architectures and Recurrent Neural Networks (RNN).",
          skills: ["TensorFlow", "Keras", "CNN", "RNN", "Google Colab"]
        },
        {
          date: "Apr 2026",
          name: "Mind of Machines: Foundations of Machine Learning",
          issuer: "GDG on Campus MMU",
          desc: "Fundamentals of model validation, regression algorithms, hyperparameter tuning, and data preprocessing workflows.",
          skills: ["Machine Learning", "Model Training", "Evaluation Metrics"]
        },
        {
          date: "Apr 2026",
          name: "Reactive: React Native Workshop",
          issuer: "GDGoC IIUM (Cert ID: GDGI00200012)",
          desc: "Completed full-stack mobile prototypes integrating Appwrite as a Backend-as-a-Service (BaaS) and custom navigation routers.",
          skills: ["React Native", "Appwrite", "Rapid Prototyping", "JavaScript"]
        },
        {
          date: "May 2026",
          name: "C++ Intermediate & Introduction to C++",
          issuer: "Sololearn (Cert ID: CC-XSFJYEWK)",
          desc: "Comprehensive testing on pointers, dynamic allocations, namespace declarations, and standard template libraries.",
          skills: ["C++", "OOP Design", "Memory Management"]
        },
        {
          date: "Apr 2026",
          name: "HackPrep: Digital Forensics 101 Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Competed in packet analysis CTFs. Deciphered system logs, disk images using FTK Imager, and hidden metadata signatures.",
          skills: ["Kali Linux", "Wireshark", "Digital Forensics", "CTF"]
        },
        {
          date: "Jan 2026",
          name: "HackPrep: Web101 Security Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Hands-on training exploiting and defending Cross-Site Scripting (XSS), SQL Injections, and Broken Object-Level Authorization (IDOR).",
          skills: ["Burp Suite", "SQL Injection Prevention", "Web Security", "XSS"]
        },
        {
          date: "Dec 2025",
          name: "Blockchain Fundamentals Bootcamp",
          issuer: "APU Blockchain Club",
          desc: "Ideated decentralized solutions judged by industry representatives. Created Solidity smart contracts using Remix, deploying on Scroll Sepolia testnets.",
          skills: ["Solidity", "Scroll Sepolia", "DApps", "Remix IDE"]
        },
        {
          date: "Mar 2026",
          name: "Google Cloud Run Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Built dockerized containers and configured secure CI/CD pipelines targeting Google Cloud Run instances.",
          skills: ["Docker", "Google Cloud Run", "CI/CD"]
        }
      ];

      return (
        <div className="cert-timeline">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-item">
              <div className="cert-date">{cert.date}</div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
              <p className="cert-desc">{cert.desc}</p>
              <div className="project-tags" style={{ marginTop: '8px' }}>
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="project-tag" style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'transparent' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (id === 'contact') {
      return (
        <div className="terminal-card">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="term-btn red"></span>
              <span className="term-btn yellow"></span>
              <span className="term-btn green"></span>
            </div>
            <div className="terminal-title">bash - visitor@harvind-os: ~</div>
            <div></div>
          </div>
          <div className="terminal-body" onClick={() => document.getElementById('terminal-prompt-input')?.focus()}>
            {terminalOutput.map((line, idx) => (
              <div key={idx} className="terminal-line">{line}</div>
            ))}
            
            {terminalStep <= 4 && (
              <form onSubmit={handleTerminalSubmit} className="terminal-input-wrapper">
                <span className="terminal-prompt">visitor@harvind-os:~$</span>
                <input
                  id="terminal-prompt-input"
                  type={terminalStep === 2 ? "email" : "text"}
                  className="terminal-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
              </form>
            )}

            {terminalStep === 5 && (
              <button 
                onClick={resetTerminal}
                className="mobile-toggle-btn"
                style={{ alignSelf: 'flex-start', border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}
              >
                Send Another Transmission <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="workspace">
      {/* Dynamic Tab Bar */}
      <div className="tab-bar">
        {openNotesList.map(tabId => {
          const tabNote = notes[tabId];
          if (!tabNote) return null;
          return (
            <div
              key={tabId}
              className={`tab ${activeNoteId === tabId ? 'active' : ''}`}
              onClick={() => onSelectNote(tabId)}
            >
              <span>{tabNote.title}</span>
              <span
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseNote(tabId);
                }}
              >
                ×
              </span>
            </div>
          );
        })}
      </div>

      {/* Note Frame */}
      <div className="note-container">
        {/* Path breadcrumb */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          vault &gt; {activeNote.folder} &gt; <span style={{ color: 'var(--text-primary)' }}>{activeNote.title}</span>
        </div>

        {/* Document Header */}
        <h1 className="note-title-header">{activeNote.title}</h1>

        {/* Note Content Render */}
        <div className="markdown-body">
          {parseMarkdown(activeNote.content)}
          {renderCustomComponent(activeNote.id)}
        </div>
      </div>
    </div>
  );
}
