import React from 'react';

interface OrdoLogoProps {
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
}

export const OrdoLogo: React.FC<OrdoLogoProps> = ({
  size = 36,
  showText = true,
  showTagline = false,
  theme = 'dark',
  className = ''
}) => {
  return (
    <div className={`ordo-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: showTagline ? '14px' : '10px' }}>
      {/* Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, borderRadius: `${size * 0.26}px` }}
      >
        {/* Dark Squircle Background */}
        <rect width="100" height="100" rx="26" fill="#0D0D0E" />

        {/* 4 Colored Corner Quadrants forming the ORDO loop */}
        {/* Top-Left Quadrant - Mint */}
        <path
          d="M 47 18 H 36 A 18 18 0 0 0 18 36 V 47 H 32 V 36 A 4 4 0 0 1 36 32 H 47 Z"
          fill="#C0ECE4"
        />

        {/* Top-Right Quadrant - Lavender */}
        <path
          d="M 53 18 H 64 A 18 18 0 0 1 82 36 V 47 H 68 V 36 A 4 4 0 0 0 64 32 H 53 Z"
          fill="#E6DBF8"
        />

        {/* Bottom-Right Quadrant - Amber */}
        <path
          d="M 82 53 V 64 A 18 18 0 0 1 64 82 H 53 V 68 H 64 A 4 4 0 0 0 68 64 V 53 Z"
          fill="#FDE6BA"
        />

        {/* Bottom-Left Quadrant - Coral */}
        <path
          d="M 18 53 V 64 A 18 18 0 0 0 36 82 H 47 V 68 H 36 A 4 4 0 0 1 32 64 V 53 Z"
          fill="#FFC0B8"
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: `${size * 0.52}px`,
            letterSpacing: '0.22em',
            color: theme === 'dark' ? 'var(--text-dark)' : 'var(--text-light)',
            lineHeight: 1,
            textTransform: 'uppercase'
          }}>
            ORDO
          </div>
          {showTagline && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: `${Math.max(9, size * 0.22)}px`,
              fontWeight: 700,
              letterSpacing: '0.26em',
              color: theme === 'dark' ? 'var(--text-muted)' : 'var(--text-muted-dark)',
              marginTop: '4px',
              textTransform: 'uppercase'
            }}>
              TIME, IN ORDER.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
