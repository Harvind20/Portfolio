import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'lucide-react';

export default function GraphView({ activeNoteId, onSelectNote, theme, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Define graph nodes matching notes
  const nodesRef = useRef([
    { id: 'welcome', label: 'Welcome.md', x: 150, y: 150, vx: 0, vy: 0, radius: 8 },
    { id: 'about', label: 'About Me.md', x: 80, y: 90, vx: 0, vy: 0, radius: 6 },
    { id: 'skills', label: 'Skills.md', x: 220, y: 90, vx: 0, vy: 0, radius: 6 },
    { id: 'projects', label: 'Projects.md', x: 70, y: 210, vx: 0, vy: 0, radius: 6 },
    { id: 'experience', label: 'Experience.md', x: 230, y: 210, vx: 0, vy: 0, radius: 6 },
    { id: 'certifications', label: 'Certifications.md', x: 150, y: 60, vx: 0, vy: 0, radius: 6 },
    { id: 'contact', label: 'Contact.md', x: 150, y: 240, vx: 0, vy: 0, radius: 6 }
  ]);

  const links = [
    { source: 'welcome', target: 'about' },
    { source: 'welcome', target: 'skills' },
    { source: 'welcome', target: 'projects' },
    { source: 'welcome', target: 'experience' },
    { source: 'welcome', target: 'certifications' },
    { source: 'welcome', target: 'contact' },
    { source: 'projects', target: 'about' }
  ];

  // Dragging states
  const dragNodeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Center nodes on initial resize if they're close to origin
      if (nodesRef.current[0].x === 150 && nodesRef.current[0].y === 150) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        nodesRef.current.forEach((node, i) => {
          // Scatter slightly around center
          const angle = (i / nodesRef.current.length) * Math.PI * 2;
          const radius = i === 0 ? 0 : 90;
          node.x = cx + Math.cos(angle) * radius;
          node.y = cy + Math.sin(angle) * radius;
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Physics parameters
    const kSpring = 0.04;
    const restLength = 100;
    const chargeStrength = 800;
    const chargeDistance = 160;
    const kGravity = 0.015;
    const friction = 0.85;

    // Main animation loop
    const tick = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const nodes = nodesRef.current;

      // Spring forces (attraction between connected nodes)
      links.forEach(link => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (distance - restLength) * kSpring;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          source.vx += fx;
          source.vy += fy;
          target.vx -= fx;
          target.vy -= fy;
        }
      });

      // Charge forces (repulsion between all nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          if (distance < chargeDistance) {
            const force = -chargeStrength / (distance * distance || 1);
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            nodeA.vx += fx;
            nodeA.vy += fy;
            nodeB.vx -= fx;
            nodeB.vy -= fy;
          }
        }
      }

      // Gravity force to center & velocity updates
      nodes.forEach(node => {
        const dx = cx - node.x;
        const dy = cy - node.y;
        node.vx += dx * kGravity;
        node.vy += dy * kGravity;

        // Apply friction
        node.vx *= friction;
        node.vy *= friction;

        // Position updates
        if (node !== dragNodeRef.current) {
          node.x += node.vx;
          node.y += node.vy;
        }

        // Boundary constraint
        const margin = 20;
        node.x = Math.max(margin, Math.min(canvas.width - margin, node.x));
        node.y = Math.max(margin, Math.min(canvas.height - margin, node.y));
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme colors
      const isDark = theme === 'dark';
      const colorLineNormal = isDark ? '#2e2e2e' : '#e2e8f0';
      const colorLineHighlight = isDark ? '#8b5cf6' : '#7c3aed';
      const colorNodeNormal = isDark ? '#a3a3a3' : '#64748b';
      const colorNodeHighlight = isDark ? '#8b5cf6' : '#7c3aed';
      const colorText = isDark ? '#e3e3e3' : '#1e293b';

      // 1. Draw Links
      links.forEach(link => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);
        if (source && target) {
          const isHighlighted = 
            (hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id)) ||
            (activeNoteId === source.id || activeNoteId === target.id);
          
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = isHighlighted ? colorLineHighlight : colorLineNormal;
          ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
          ctx.stroke();
        }
      });

      // 2. Draw Nodes
      nodes.forEach(node => {
        const isActive = activeNoteId === node.id;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const isConnected = hoveredNode && links.some(l => 
          (l.source === node.id && l.target === hoveredNode.id) ||
          (l.target === node.id && l.source === hoveredNode.id)
        );

        ctx.beginPath();
        const rad = isActive ? node.radius * 1.5 : (isHovered ? node.radius * 1.3 : node.radius);
        ctx.arc(node.x, node.y, rad, 0, Math.PI * 2);

        // Styling fill and borders
        if (isActive) {
          ctx.fillStyle = colorNodeHighlight;
          ctx.strokeStyle = isDark ? '#c084fc' : '#a78bfa';
          ctx.lineWidth = 3;
        } else if (isHovered || isConnected) {
          ctx.fillStyle = isDark ? '#a78bfa' : '#8b5cf6';
          ctx.strokeStyle = colorNodeHighlight;
          ctx.lineWidth = 1.5;
        } else {
          ctx.fillStyle = colorNodeNormal;
          ctx.strokeStyle = isDark ? '#181818' : '#ffffff';
          ctx.lineWidth = 1.5;
        }
        
        ctx.fill();
        ctx.stroke();

        // Node Label (always show for active, hovered, or show all if space allows)
        const showLabel = isActive || isHovered || isConnected || nodes.length < 15;
        if (showLabel) {
          ctx.font = isActive 
            ? '600 11px Inter, sans-serif' 
            : (isHovered ? '500 11px Inter, sans-serif' : '400 10px Inter, sans-serif');
          ctx.fillStyle = isActive ? colorNodeHighlight : colorText;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - rad - 6);
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeNoteId, hoveredNode, theme]);

  // Event handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked a node
    const clickedNode = nodesRef.current.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist <= node.radius * 2;
    });

    if (clickedNode) {
      dragNodeRef.current = clickedNode;
      // Anchor it
      clickedNode.vx = 0;
      clickedNode.vy = 0;
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragNodeRef.current) {
      // Update position
      dragNodeRef.current.x = x;
      dragNodeRef.current.y = y;
    } else {
      // Check for hover
      const node = nodesRef.current.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist <= node.radius * 2.5;
      });
      setHoveredNode(node || null);
    }
  };

  const handleMouseUp = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragNodeRef.current) {
      // If we dragged and released, was it a click?
      const dx = dragNodeRef.current.x - x;
      const dy = dragNodeRef.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // If movement is very small, treat as click
      if (dist < 5) {
        onSelectNote(dragNodeRef.current.id);
      }
      dragNodeRef.current = null;
    }
  };

  return (
    <div ref={containerRef} className={`graph-container ${className || ''}`}>
      <div className="graph-header">
        <Network size={16} />
        <span>Graph View</span>
      </div>
      <div className="graph-canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="graph-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            dragNodeRef.current = null;
            setHoveredNode(null);
          }}
        />
        <div className="graph-instructions">Drag to explore • Click node to open</div>
      </div>
    </div>
  );
}
