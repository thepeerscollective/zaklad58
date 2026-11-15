'use client';
import { useState } from 'react';

/** Six drawers of a loft. Pull one to see what is inside. */
export default function Drawers({ items, hex, ink }: { items: [string, string][]; hex: string; ink: string }) {
  const [o, setO] = useState<number | null>(0);
  const shades = [hex, `color-mix(in srgb, ${hex} 82%, #fff)`, `color-mix(in srgb, ${hex} 70%, #000)`];
  return (
    <div className="drawers">{items.map(([t, d], i) => (
      <button key={t} className="drawer" aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} onMouseEnter={() => setO(i)}
        style={{ ['--c' as string]: shades[i % 3], ['--ink2' as string]: ink === '#151311' || i % 3 === 1 ? '#151311' : '#F7F1E3' } as React.CSSProperties}>
        <span className="lb" style={{ fontSize: 10, opacity: .8 }}>Szuflada {i + 1}</span>
        <span><h3>{t}</h3><p>{d}</p></span>
      </button>
    ))}</div>
  );
}
