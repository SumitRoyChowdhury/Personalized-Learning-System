// src/components/F1CarIcon.jsx
import React from 'react';

const F1CarIcon = () => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0px 0px 8px var(--lime-green))" }}
    >
        {/* Body */}
        <path d="M10 50 Q 50 35 90 50 L 90 60 L 10 60 Z" fill="var(--electric-pink)" />
        {/* Cockpit */}
        <rect x="40" y="30" width="20" height="20" rx="5" fill="#111" />
        <path d="M45 35 Q 50 25 55 35 Z" fill="var(--neon-blue)" />
        {/* Wheels */}
        <circle cx="20" cy="60" r="10" fill="#222" stroke="var(--lime-green)" strokeWidth="2" />
        <circle cx="80" cy="60" r="10" fill="#222" stroke="var(--lime-green)" strokeWidth="2" />
        <circle cx="20" cy="60" r="4" fill="#666" />
        <circle cx="80" cy="60" r="4" fill="#666" />
        {/* Spoiler */}
        <rect x="5" y="40" width="10" height="5" fill="var(--neon-purple)" />
        <rect x="85" y="45" width="15" height="5" fill="var(--neon-blue)" />
    </svg>
);

export default F1CarIcon;
