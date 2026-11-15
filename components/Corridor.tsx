'use client';
import { useState } from 'react';
import { href, img } from '@/lib/base';
import { LOFTS } from '@/lib/data';

/** Corridor, floor 2: six coloured doors. Hover or tap one to look inside. */
export default function Corridor({ children }: { children: React.ReactNode }) {
  const [o, setO] = useState(2);
  const l = LOFTS[o];
  return (
    <>
      <div className="head">{children}
      <div className="corr-card" style={{ ['--c' as string]: l.hex } as React.CSSProperties} aria-live="polite">
        <div><span className="lb">No {l.id} · {l.color}</span><h3>{l.title}</h3><p className="muted" style={{ fontSize: 14 }}>{l.m2} m² · {l.guests} os. · od {l.price} zł / noc</p></div>
        <a className="btn b-bk" href={href(`/lofty/${l.id}/`)}>Otwórz</a>
      </div>
      </div>
      <div className="corr" role="list">
        {LOFTS.map((x, i) => (
          <a key={x.id} role="listitem" href={href(`/lofty/${x.id}/`)} className={`door${o === i ? ' open' : ''}`} style={{ ['--c' as string]: x.hex } as React.CSSProperties}
            onMouseEnter={() => setO(i)} onFocus={() => setO(i)} aria-label={`Loft ${x.id}: ${x.title}`}>
            <span className="num">{x.id}</span>
            <span className="room"><img src={img(x.img)} alt="" loading="lazy" /></span>
            <span className="leaf" aria-hidden /><span className="knob" aria-hidden />
            <span className="nm">{x.name.toUpperCase()}</span>
          </a>
        ))}
      </div>
    </>
  );
}
