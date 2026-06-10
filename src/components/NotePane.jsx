import React, { useState, useEffect } from 'react';
import { 
  FileText, ExternalLink, ArrowRight, Send, Terminal, 
  Cpu, Globe, Award, Database, Briefcase, History, Mail, 
  User, ChevronRight, CheckCircle, Clock, Star, TrendingUp, 
  Video, Calendar, MapPin, Cloud, Link, Activity, Settings,
  GraduationCap, Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { HeroGeometric } from './ui/shape-landing-hero';

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

const LinkedinIcon = ({ size = 16, className = "" }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

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
          <p>No note open. Select a page from the navigation bar.</p>
        </div>
      </div>
    );
  }

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

        // Actually dispatch email via mailto redirect
        const mailtoSubject = `Portfolio Message from ${senderName}`;
        const mailtoBody = `Sender Name: ${senderName}\nSender Email: ${senderEmail}\n\nMessage:\n${senderMsg}`;
        window.location.href = `mailto:harvindddddd@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
      } else {
        newOutput.push('Transmission aborted.');
        setTerminalOutput(newOutput);
        setTerminalStep(1);
        setTimeout(resetTerminal, 1000);
      }
    }
  };

  const renderListTree = (listItems, key) => {
    if (listItems.length === 0) return null;

    const root = { children: [], indent: -1 };
    const stack = [root];

    listItems.forEach(item => {
      const node = {
        content: item.content,
        children: [],
        indent: item.indent,
        key: item.lineIndex
      };

      while (stack.length > 1 && stack[stack.length - 1].indent >= item.indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1];
      parent.children.push(node);
      stack.push(node);
    });

    const renderNodes = (nodes, isRoot = false) => {
      if (nodes.length === 0) return null;
      return (
        <ul key={`ul-${nodes[0].key}`} className={isRoot ? "list-outer" : "list-nested"}>
          {nodes.map(node => (
            <li key={`li-${node.key}`}>
              {parseInlineMarkdown(node.content)}
              {renderNodes(node.children, false)}
            </li>
          ))}
        </ul>
      );
    };

    return renderNodes(root.children, true);
  };

  // Parse Obsidian internal link format [[Note Name.md]] or [[Note Name]]
  const parseMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];
    let currentListLines = [];

    const flushList = (key) => {
      if (currentListLines.length > 0) {
        elements.push(renderListTree(currentListLines, key));
        currentListLines = [];
      }
    };

    lines.forEach((line, i) => {
      const listMatch = line.match(/^(\s*)([*+-])\s+(.*)$/);
      if (listMatch) {
        const indent = listMatch[1].length;
        const content = listMatch[3];
        currentListLines.push({ indent, content, lineIndex: i });
      } else {
        flushList(i);
        
        // Header Level 1
        if (line.startsWith('# ')) {
          elements.push(<h1 key={i} style={{ textAlign: 'center' }}>{parseInlineMarkdown(line.slice(2))}</h1>);
        }
        // Header Level 2
        else if (line.startsWith('## ')) {
          elements.push(<h2 key={i} style={{ textAlign: 'center' }}>{parseInlineMarkdown(line.slice(3))}</h2>);
        }
        // Header Level 3
        else if (line.startsWith('### ')) {
          elements.push(<h3 key={i} style={{ textAlign: 'center' }}>{parseInlineMarkdown(line.slice(4))}</h3>);
        }
        // Blockquote
        else if (line.startsWith('> ')) {
          elements.push(<blockquote key={i}>{parseInlineMarkdown(line.slice(2))}</blockquote>);
        }
        // Divider
        else if (line.trim() === '---') {
          elements.push(<hr key={i} style={{ margin: '24px 0', borderColor: 'var(--border)' }} />);
        }
        // Empty lines
        else if (line.trim() === '') {
          elements.push(<br key={i} />);
        }
        // Normal paragraph
        else {
          elements.push(<p key={i} style={{ textAlign: 'center' }}>{parseInlineMarkdown(line)}</p>);
        }
      }
    });

    flushList(lines.length);
    return elements;
  };

  // Helper to parse links, bold, and codes in a line
  const parseInlineMarkdown = (text) => {
    let parts = [];
    let currentIndex = 0;
    
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

        let noteId = targetClean.toLowerCase().replace('.md', '').replace(/\s+/g, '-');
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
    if (id === 'welcome') {
      const exploreLinks = [
        { id: 'about', title: "About Me", desc: "My biography, academic background, and interests.", icon: <User size={20} /> },
        { id: 'skills', title: "Skills & Stack", desc: "Core languages, web/mobile frameworks, and DevOps tools.", icon: <Cpu size={20} /> },
        { id: 'projects', title: "Projects", desc: "View my software projects with active source repositories.", icon: <Briefcase size={20} /> },
        { id: 'experience', title: "Experience", desc: "My professional athlete history and IT support roles.", icon: <History size={20} /> },
        { id: 'certifications', title: "Certifications", desc: "Browse technical training workshops and credentials.", icon: <Award size={20} /> },
        { id: 'contact', title: "Contact Info", desc: "Get in touch for software engineering internships.", icon: <Mail size={20} /> }
      ];
      
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '-30px', alignItems: 'center' }}>
          <HeroGeometric 
            badge="Multimedia University Student"
            title1="Harvind"
            title2="Sethu Pathy"
          />
          
          <div style={{ marginTop: '20px', width: '100%' }}>
            <ScrollReveal>
              <h2 className="welcome-grid-heading" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px', textAlign: 'center', background: 'linear-gradient(135deg, #fff, var(--accent-hover))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explore My Vault</h2>
            </ScrollReveal>
            
            <div className="welcome-explore-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', width: '100%' }}>
              {exploreLinks.map((link) => (
                <ScrollReveal key={link.id}>
                  <div 
                    className="liquid-glass-card welcome-card" 
                    style={{ padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', height: '100%', position: 'relative' }}
                    onClick={() => onSelectNote(link.id)}
                  >
                    <div className="welcome-card-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent-hover)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {link.icon}
                    </div>
                    <div className="welcome-card-info" style={{ flexGrow: 1, textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, marginBottom: '4px', color: 'var(--text-primary)' }}>{link.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{link.desc}</p>
                    </div>
                    <ChevronRight size={16} className="welcome-card-arrow" style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (id === 'about') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px', alignItems: 'center', textAlign: 'center' }}>
          <ScrollReveal>
            <div className="liquid-glass-card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: '700' }}>Biography</h2>
              <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.98rem', marginBottom: '16px' }}>
                I am a dedicated Software Engineering student at Multimedia University (MMU) with hands-on experience in building scalable backend systems and mastering object-oriented design. I thrive in frontend engineering, developing mobile apps using React Native as well as web development using Javascript & Flask. I am also highly experienced in architecting Java desktop systems, as well as concurrent C/C++ applications.
              </p>
              <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.98rem' }}>
                As an engineer, I am driven by curiosity and an eagerness to learn new languages, frameworks, and coding concepts. I am known for my strong communication skills, leadership in team projects, and ability to coordinate project execution from design to delivery.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="liquid-glass-card" style={{ padding: '30px', width: '100%' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '18px', color: 'var(--text-primary)', fontWeight: '700' }}>Internship Search</h2>
              <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={15} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>Availability</strong>: July 27th to October 18th</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={15} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>Objective</strong>: Collaborate with experienced engineers and contribute to production systems</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.6rem', marginTop: '10px', color: 'var(--text-primary)', fontWeight: '800' }}>Education</h2>
              
              <div className="liquid-glass-card" style={{ padding: '30px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <GraduationCap size={24} style={{ color: 'var(--accent)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Multimedia University (MMU)</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--accent-hover)', fontWeight: '500' }}>Bachelor of Computer Science (Honours) Software Engineering</p>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Oct 2024 to Sep 2027</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.92rem', width: '100%' }}>
                  <p style={{ marginBottom: '12px', fontWeight: '600' }}>Activities & Clubs</p>
                  <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>Google Developer Group (GDG) on Campus Member</span>
                    </li>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>MMU IT Society Member</span>
                    </li>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>MMU Career Club Member</span>
                    </li>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Activity size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>MMU Varsity Basketball Team</span>
                    </li>
                    <li style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={14} style={{ color: 'var(--accent)' }} />
                      <span>2-Time Dean's List Candidate</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="liquid-glass-card" style={{ padding: '30px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <GraduationCap size={24} style={{ color: 'var(--accent)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Multimedia University (MMU)</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--accent-hover)', fontWeight: '500' }}>Foundation Degree in Information Technology</p>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Oct 2023 to Feb 2024</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.92rem', width: '100%' }}>
                  <p style={{ marginBottom: '6px', fontWeight: '600' }}>Academic Performance: <span style={{ color: 'var(--text-primary)', fontWeight: '750' }}>CGPA 3.94</span></p>
                  <p style={{ marginBottom: '12px', fontWeight: '600', marginTop: '12px' }}>Activities & Clubs</p>
                  <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>MMU IT Society Member</span>
                    </li>
                    <li style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={14} style={{ color: 'var(--accent)' }} />
                      <span>3-Time Dean's List Candidate</span>
                    </li>
                    <li style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Activity size={14} style={{ color: 'var(--accent-hover)' }} />
                      <span>MMU Varsity Basketball and State Basketball representation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="liquid-glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Activity size={24} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '700', margin: 0 }}>Extra-Curriculars & Character</h2>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.98rem' }}>
                Beyond coding, I have been deeply involved in high-level sports. Representing my state and varsity teams in <strong>Basketball</strong> has taught me discipline, rapid decision-making under stress, and what it truly means to lead and collaborate within a team. I bring this same drive and athletic discipline to my software engineering projects.
              </p>
            </div>
          </ScrollReveal>
        </div>
      );
    }

    if (id === 'skills') {
      const skillGroups = [
        {
          title: "Programming Languages",
          icon: <Code size={20} style={{ color: 'var(--accent)' }} />,
          skills: [
            { name: "Backend & Systems", items: ["Java", "C++", "C", "C#", "Python"] },
            { name: "Web & Scripting", items: ["JavaScript", "HTML5", "CSS3", "Bash / Linux Shell"] },
            { name: "Typesetting", items: ["LaTeX"] }
          ]
        },
        {
          title: "Web & Mobile Development",
          icon: <Globe size={20} style={{ color: 'var(--accent)' }} />,
          items: ["React Native", "Appwrite Integration", "BaaS", "Flask", "POSIX Socket Programming", "SQLite", "JDBC", "Google Stitch", "UI/UX Prototyping"]
        },
        {
          title: "Cloud & DevOps",
          icon: <Cloud size={20} style={{ color: 'var(--accent)' }} />,
          items: ["Google Cloud Run", "PythonAnywhere", "Vercel", "Docker", "CI/CD Pipelines", "Git", "GitHub"]
        },
        {
          title: "AI / Machine Learning & Security",
          icon: <Cpu size={20} style={{ color: 'var(--accent)' }} />,
          items: ["Neural Networks", "CNN", "RNN", "TensorFlow", "Keras", "NumPy", "Google Colab", "Wireshark", "Kali Linux", "Digital Forensics", "FTK Imager", "Burp Suite", "SQL Injection Prevention", "XSS", "IDOR", "FoxyProxy"]
        },
        {
          title: "Web3 & Blockchain",
          icon: <Link size={20} style={{ color: 'var(--accent)' }} />,
          items: ["Ethereum", "Solidity", "Remix IDE", "Scroll Sepolia", "DApps"]
        }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px', alignItems: 'center', textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--text-muted)' }}>Here is a breakdown of my engineering skills, categorized by domain. I enjoy experimenting with low-level details as well as high-level web frameworks.</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', width: '100%' }}>
            {skillGroups.map((group, idx) => (
              <ScrollReveal key={idx}>
                <div className="liquid-glass-card" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    {group.icon}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{group.title}</h3>
                  </div>
                  {group.skills ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                      {group.skills.map((sub, sIdx) => (
                        <div key={sIdx}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--accent-hover)', fontWeight: '600', marginBottom: '6px' }}>{sub.name}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                            {sub.items.map((item, iIdx) => (
                              <code key={iIdx} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>{item}</code>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', width: '100%' }}>
                      {group.items.map((item, iIdx) => (
                        <code key={iIdx} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>{item}</code>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'projects') {
      const projects = [
        {
          title: "Personal Portfolio Website",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/Portfolio.git",
          desc: "A digital garden portfolio website modeled after an Obsidian vault. Engineered with custom hierarchical markdown parsing, sticky tab routing, custom interactive terminal dispatch (integrated with mailto client serialization), and a sleek dark-blue glassmorphic theme.",
          tags: ["React", "Vite", "Vanilla CSS", "Glassmorphism", "Markdown Parser"],
          status: "Live",
          meta: "v2.0",
          colSpan: 2
        },
        {
          title: "Academic Publication & Research Tracker",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/The-silver-ghost/academicPublication.git",
          desc: "Full-stack academic research ledger built with Flask and SQLite. Features faculty-level analytics dashboards, a responsive vanilla frontend, role-based controls, and secure session management.",
          tags: ["Flask", "SQLite", "JavaScript", "Database Design"],
          status: "Production",
          meta: "v1.2",
          colSpan: 1
        },
        {
          title: "Multi-Process C Snakes & Ladders",
          icon: <Terminal className="project-icon" size={20} />,
          desc: "Networked multiplayer game built in C using POSIX socket programming. Engineered client-server packet handshakes, state synchronization, and process failure recovery protocols.",
          tags: ["C Programming", "POSIX Sockets", "Concurrency", "UML Modeling"],
          status: "Complete",
          meta: "Networked",
          colSpan: 1
        },
        {
          title: "Java Parking Management System",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/ParkingManagementSystem.git",
          desc: "Desktop automations application employing JDBC and SQLite. Designed architecture separating UI and logic using structural patterns: Facade, Bridge, Builder, and Strategy.",
          tags: ["Java", "Java Swing", "JDBC", "Design Patterns"],
          status: "Verified",
          meta: "Desktop",
          colSpan: 2
        },
        {
          title: "Java Seminar Management System",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/SeminarManagementSystem.git",
          desc: "Scheduling and grading manager designed for university faculty. Decoupled controller layers using sequence modeling to ensure code modularity and robust file storage.",
          tags: ["Java", "Java Swing", "System Scoping", "Sequence Diagrams"],
          status: "Verified",
          meta: "Desktop",
          colSpan: 2
        },
        {
          title: "Touch 'n Go Digital Wallet Simulator",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/TouchNGo-Simulator-LDCW6123-.git",
          desc: "Fintech payment simulation in C++ mirroring local ecosystems. Models bank transfers, QR deductions, and P2P transfers utilizing real-time latency threads.",
          tags: ["C++", "Logic Development", "Terminal Simulation"],
          status: "Complete",
          meta: "C++",
          colSpan: 1
        },
        {
          title: "C++ Robot Battlefield Simulator",
          icon: <Terminal className="project-icon" size={20} />,
          github: "https://github.com/The-silver-ghost/robot-war-simulator.git",
          desc: "OOP-driven autonomous grid simulation. Implemented virtual and multiple inheritance hierarchies to resolve diamond dependency conflicts and dynamic upgrade engines.",
          tags: ["C++", "OOP Design", "Multiple Inheritance", "File-Driven Config"],
          status: "Complete",
          meta: "OOP",
          colSpan: 1
        },
        {
          title: "BudgetBadger: Social Finance WebApp",
          icon: <FileText className="project-icon" size={20} />,
          github: "https://github.com/Harvind20/Mini-IT-TC4L-Group-7.git",
          desc: "Gamified budgeting tracker for students built in Flask. Supports social metrics (following, leaderboard standings), transaction logging, and automated achievement badge allocations.",
          tags: ["Python", "Flask", "SQLite", "PythonAnywhere"],
          status: "Production",
          meta: "Flask",
          colSpan: 2
        }
      ];

      return (
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <ScrollReveal key={idx}>
              <div className={`project-card liquid-glass-card ${proj.colSpan === 2 ? 'span-2' : ''}`}>
                <div className="project-card-header">
                  <div className="project-icon-wrapper">
                    {proj.icon}
                  </div>
                  <span className="project-status-badge">{proj.status || "Active"}</span>
                </div>
                <div className="project-card-body" style={{ textAlign: 'center' }}>
                  <h3 className="project-card-title" style={{ justifyContent: 'center' }}>
                    {proj.title}
                    {proj.meta && <span className="project-card-meta">{proj.meta}</span>}
                  </h3>
                  <p className="project-card-desc">{proj.desc}</p>
                </div>
                <div className="project-card-footer">
                  <div className="project-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag">#{tag}</span>
                    ))}
                  </div>
                  {proj.github ? (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-cta-link">
                      Explore →
                    </a>
                  ) : (
                    <span className="project-cta-link disabled">Internal</span>
                  )}
                </div>
                
                <div className="project-card-mesh-bg" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      );
    }

    if (id === 'experience') {
      const experiences = [
        {
          title: "Professional Athlete",
          company: "ParkCity Heat Basketball Club & Putrajaya Basketball Association",
          timeline: "Oct 2021 to Dec 2023 (2 years 3 months)",
          location: "Kuala Lumpur, Malaysia (Hybrid)",
          icon: <Activity size={22} style={{ color: 'var(--accent)' }} />,
          bullets: [
            "Signed dual contracts competing at State and National levels (U18, U20, and Men's Open).",
            "Committed to 4 intensive weekly training sessions while simultaneously holding down a full-time position.",
            "Acted as a brand ambassador on and off the court."
          ]
        },
        {
          title: "Production Operator & IT Support",
          company: "SuperSports Marketing",
          timeline: "Jul 2023 to Nov 2023 (5 months)",
          location: "Kuala Lumpur, Malaysia (On-site)",
          icon: <Settings size={22} style={{ color: 'var(--accent)' }} />,
          bullets: [
            "Executed complex sublimation and heat-press fabrication on performance sportswear.",
            "Handled high-resolution vector and graphic design files.",
            "Served as on-site IT support, resolving technical, network, and system issues for colleagues and managers.",
            "Supervised logs, tracking client orders, delivery dates, and material inventory."
          ]
        }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px', alignItems: 'center', textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--text-muted)' }}>A summary of my professional history, showcasing my teamwork, sportsmanship, adaptability, and technical capability.</p>
          </ScrollReveal>

          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx}>
              <div className="liquid-glass-card" style={{ padding: '30px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                  {exp.icon}
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{exp.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--accent-hover)', fontWeight: '500', margin: 0 }}>{exp.company}</p>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>{exp.timeline}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.92rem' }}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent-hover)', flexShrink: 0 }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      );
    }

    if (id === 'certifications') {
      const certifications = [
        {
          date: "2 June 2026",
          name: "Build Your Digital Presence",
          issuer: "GDGoC UTM",
          desc: "A hands-on workshop focused on LinkedIn profile optimization, personal branding strategies, and portfolio website development utilizing Google Antigravity.",
          skills: ["Personal Branding", "LinkedIn", "Portfolio Development", "Google Antigravity"]
        },
        {
          date: "19 May 2026",
          name: "C++ Intermediate",
          issuer: "Sololearn (Cert ID: CC-XSFJYEWK)",
          desc: "Comprehensive testing on pointers, dynamic allocations, namespace declarations, and standard template libraries.",
          skills: ["C++", "OOP Design", "Memory Management"]
        },
        {
          date: "16 May 2026",
          name: "Mind Of Machines: Introduction to Neural Networks",
          issuer: "GDG on Campus MMU",
          desc: "Trained Deep Learning models in TensorFlow/Keras. Explored Convolutional Neural Network (CNN) architectures and Recurrent Neural Networks (RNN).",
          skills: ["TensorFlow", "Keras", "CNN", "RNN", "Google Colab"]
        },
        {
          date: "4 May 2026",
          name: "Introduction to C++",
          issuer: "Sololearn (Cert ID: CC-4J41SZV1)",
          desc: "Basic concepts, data types, arrays, pointers, loops, functions, and object-oriented structures.",
          skills: ["C++", "Programming Fundamentals"]
        },
        {
          date: "29 April 2026",
          name: "Bash & Linux Workshop",
          issuer: "IT Society Cyberjaya",
          desc: "Hands-on workshop covering advanced command-line navigation, POSIX permission systems, and automated shell scripting.",
          skills: ["Bash", "Linux", "Shell Scripting"]
        },
        {
          date: "27 April 2026",
          name: "Morpheus Openclaw Workshop",
          issuer: "IT Society Cyberjaya",
          desc: "Configured agentic automation pipelines powered by Morpheus inference engines.",
          skills: ["Openclaw", "Agentic Automation", "LLM Pipelines"]
        },
        {
          date: "25 April 2026",
          name: "Mind of Machines: Foundations of Machine Learning",
          issuer: "GDG on Campus MMU",
          desc: "Fundamentals of model validation, regression algorithms, hyperparameter tuning, and data preprocessing workflows.",
          skills: ["Machine Learning", "Model Training", "Evaluation Metrics"]
        },
        {
          date: "13 April 2026",
          name: "Project 2030: Google Stitch Hackathon: Design to Deployment with Google Stitch",
          issuer: "GDG on Campus UTM",
          desc: "Built high-fidelity cloud interfaces bridging UI designs to live web apps using Google Stitch. Configured GCP front-end deployment at scale.",
          skills: ["Google Stitch", "GCP", "UI/UX Handoff", "Generative AI"]
        },
        {
          date: "11 April 2026",
          name: "Reactive: React Native Workshop",
          issuer: "GDGoC IIUM (Cert ID: GDGI00200012)",
          desc: "Completed full-stack mobile prototypes integrating Appwrite as a Backend-as-a-Service (BaaS) and custom navigation routers.",
          skills: ["React Native", "Appwrite", "Rapid Prototyping", "JavaScript"]
        },
        {
          date: "11 April 2026",
          name: "HackPrep: Digital Forensics 101 Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Competed in packet analysis CTFs. Deciphered system logs, disk images using FTK Imager, and hidden metadata signatures.",
          skills: ["Kali Linux", "Wireshark", "Digital Forensics", "CTF"]
        },
        {
          date: "12 March 2026",
          name: "Google Cloud Run Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Built dockerized containers and configured secure CI/CD pipelines targeting Google Cloud Run instances.",
          skills: ["Docker", "Google Cloud Run", "CI/CD"]
        },
        {
          date: "January 2026",
          name: "HackPrep: Web101 Security Workshop",
          issuer: "GDG on Campus MMU",
          desc: "Hands-on training exploiting and defending Cross-Site Scripting (XSS), SQL Injections, and Broken Object-Level Authorization (IDOR).",
          skills: ["Burp Suite", "SQL Injection Prevention", "Web Security", "XSS"]
        },
        {
          date: "December 2025",
          name: "Blockchain Fundamentals Bootcamp",
          issuer: "APU Blockchain Club",
          desc: "Ideated decentralized solutions judged by industry representatives. Created Solidity smart contracts using Remix, deploying on Scroll Sepolia testnets.",
          skills: ["Solidity", "Scroll Sepolia", "DApps", "Remix IDE"]
        }
      ];

      return (
        <div className="cert-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', width: '100%', textAlign: 'center' }}>
          {certifications.map((cert, index) => (
            <ScrollReveal key={index}>
              <div className="liquid-glass-card cert-item" style={{ padding: '24px', borderLeft: '4px solid var(--accent)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px', width: '100%' }}>
                  <span className="cert-date" style={{ color: 'var(--accent-hover)', fontSize: '0.8rem', fontWeight: '600' }}>{cert.date}</span>
                  <span className="cert-issuer" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{cert.issuer}</span>
                </div>
                <h3 className="cert-name" style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)', textAlign: 'center' }}>{cert.name}</h3>
                <p className="cert-desc" style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '12px' }}>{cert.desc}</p>
                <div className="project-tags" style={{ justifyContent: 'center' }}>
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="project-tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-hover)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      );
    }

    if (id === 'contact') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <ScrollReveal>
            <div className="liquid-glass-card" style={{ padding: '30px', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Mail size={24} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '700', margin: 0 }}>Communication Channels</h2>
              </div>
              <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: '#cbd5e1', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>Email</strong>: <a href="mailto:harvindddddd@gmail.com" style={{ color: 'var(--accent-hover)', textDecoration: 'none' }}>harvindddddd@gmail.com</a></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GithubIcon size={16} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>GitHub</strong>: <a href="https://github.com/Harvind20" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hover)', textDecoration: 'none' }}>github.com/Harvind20</a></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LinkedinIcon size={16} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/harvind-s-397871319" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hover)', textDecoration: 'none' }}>linkedin.com/in/harvind-s-397871319</a></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-hover)' }} />
                  <span><strong>Physical Location</strong>: Puchong, Selangor, 47100, Malaysia</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="terminal-card liquid-glass-card" style={{ border: '2px solid rgba(255, 255, 255, 0.15)', width: '100%' }}>
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="term-btn red"></span>
                  <span className="term-btn yellow"></span>
                  <span className="term-btn green"></span>
                </div>
                <div className="terminal-title">bash - visitor@harvind-os: ~</div>
                <div></div>
              </div>
              <div className="terminal-body" style={{ textAlign: 'left' }} onClick={() => document.getElementById('terminal-prompt-input')?.focus()}>
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
          </ScrollReveal>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="workspace">
      {/* Note Viewport (Full width scrolling) */}
      <div className="note-viewport">
        {/* Note Frame */}
        <div className="note-container">
          {/* Note Content Render */}
          <div className="markdown-body">
            {['projects', 'certifications', 'welcome', 'about', 'skills', 'experience', 'contact'].includes(activeNote.id) ? null : parseMarkdown(activeNote.content)}
            {renderCustomComponent(activeNote.id)}
          </div>
        </div>
      </div>
    </div>
  );
}
