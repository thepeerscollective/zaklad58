'use client';
import { useState } from 'react';
import { href } from '@/lib/base';
import { FILTERS, LOFTS } from '@/lib/data';
import { Img, Tag } from './ui';

/** Compare the drawers like modules of a shelf, filtered by what matters to you. */
export default function LoftGrid() {
  const [f, setF] = useState('all');
  const ok = (t: string[], g: number) => f === 'all' || (f === '2' ? g === 2 : t.includes(f));
  const n = LOFTS.filter(l => ok(l.tags, l.guests)).length;
  return (
    <>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 'clamp(14px,3vh,28px)' }}>
        <div className="chips" role="group" aria-label="Filtr">{FILTERS.map(([k, l]) => <button key={k} className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}</div>
        <span className="lb" aria-live="polite">{n} z 6 szuflad</span>
      </div>
      <div className="lofts">{LOFTS.map(l => (
        <a key={l.id} href={href(`/lofty/${l.id}/`)} className={`lcard${ok(l.tags, l.guests) ? '' : ' off'}`} aria-hidden={!ok(l.tags, l.guests)} tabIndex={ok(l.tags, l.guests) ? 0 : -1}>
          <Img n={l.wide} alt={`${l.title}, ujęcie szerokie`} front={l.hex} />
          <div className="body">
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><Tag n={l.id} c={l.hex} dark={l.ink === '#151311'} /><div><span className="lb" style={{ fontSize: 10, color: 'var(--grey)' }}>No {l.id} · {l.color}</span><h3>{l.title}</h3></div></div>
            <p className="muted" style={{ fontSize: 15 }}>{l.desc}</p>
            <div className="facts"><span><b>{l.m2} m²</b><small>metraż</small></span><span><b>{l.guests} os.</b><small>gości</small></span><span><b>od {l.price} zł</b><small>za noc</small></span><span className="lb" style={{ marginLeft: 'auto', fontSize: 11 }}>Otwórz →</span></div>
          </div>
        </a>
      ))}</div>
    </>
  );
}
