"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface NavItem {
  name: string
  id: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string;
  activeTabId?: string;
  onSelect?: (id: string) => void;
}

export function NavBar({ items, className, activeTabId, onSelect }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeTabId || items[0].id)

  useEffect(() => {
    if (activeTabId) {
      setActiveTab(activeTabId);
    }
  }, [activeTabId]);

  return (
    <div className={`tubelight-navbar ${className || ''}`}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (onSelect) onSelect(item.id);
            }}
            className={`tubelight-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-label-desktop">{item.name}</span>
            <span className="nav-label-mobile">
              <Icon size={16} strokeWidth={2.5} />
            </span>
            {isActive && (
              <motion.div
                layoutId="lamp"
                className="tubelight-lamp"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="tubelight-lamp-line" />
                <div className="tubelight-lamp-glow-1" />
                <div className="tubelight-lamp-glow-2" />
              </motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}
