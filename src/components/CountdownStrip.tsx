import React from 'react';
import { COUNTDOWN_TARGETS } from '../data/academic';

interface CountdownStripProps {
  currentDateStr: string;
}

export const CountdownStrip: React.FC<CountdownStripProps> = ({ currentDateStr }) => {
  const calculateDaysRemaining = (targetDateStr: string) => {
    const today = new Date(currentDateStr + "T00:00:00");
    const target = new Date(targetDateStr + "T00:00:00");
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Cycling colors: lime -> blue -> white
  const colorThemes = [
    { bg: 'var(--lime)', text: 'var(--black)', labelColor: 'rgba(10, 10, 10, 0.75)' },
    { bg: 'var(--blue)', text: 'var(--white)', labelColor: 'rgba(240, 240, 238, 0.85)' },
    { bg: 'var(--white)', text: 'var(--black)', labelColor: 'rgba(10, 10, 10, 0.75)' },
  ];

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'var(--black)',
      paddingTop: '16px',
      paddingBottom: '12px',
      borderBottom: 'var(--border-subtle)'
    }}>
      <div style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: 'var(--lime)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          /// ODD SEM 2026-27 COUNTDOWN
        </div>
        <div style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          textTransform: 'uppercase'
        }}>
          JKLU ACADEMIC
        </div>
      </div>

      <div className="no-scrollbar" style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingLeft: '20px',
        paddingRight: '20px',
        scrollSnapType: 'x mandatory'
      }}>
        {COUNTDOWN_TARGETS.map((target, idx) => {
          const daysLeft = calculateDaysRemaining(target.date);
          const theme = colorThemes[idx % colorThemes.length];
          const blobRadius = [
            '44% 56% 62% 38% / 54% 42% 58% 46%',
            '62% 38% 44% 56% / 42% 58% 42% 58%',
            '52% 48% 36% 64% / 58% 38% 62% 42%',
            '58% 42% 56% 44% / 46% 54% 44% 56%',
            '46% 54% 48% 52% / 52% 46% 54% 48%',
            '60% 40% 42% 58% / 44% 56% 58% 42%'
          ][idx % 6];

          return (
            <div
              key={target.name}
              style={{
                flexShrink: 0,
                width: '124px',
                height: '84px',
                backgroundColor: theme.bg,
                color: theme.text,
                borderRadius: blobRadius,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                scrollSnapAlign: 'start',
                transition: 'transform 0.15s ease',
                userSelect: 'none'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '26px',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.03em'
              }}>
                {daysLeft > 0 ? `${daysLeft}D` : daysLeft === 0 ? 'TODAY' : 'PASSED'}
              </div>
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                color: theme.labelColor,
                marginTop: '4px',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {target.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
