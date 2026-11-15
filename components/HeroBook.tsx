'use client';
import { useEffect, useState } from 'react';
import { href } from '@/lib/base';
import { LOFTS } from '@/lib/data';

const DOW = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
const MON = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const nice = (s: string) => { const d = new Date(s + 'T12:00'); return `${DOW[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`; };

/** Pick a drawer: dates, guests and the colour of your key tag. */
export default function HeroBook() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [g, setG] = useState(2);
  const [l, setL] = useState('03');
  useEffect(() => {
    const t = new Date(); const fri = new Date(t); fri.setDate(t.getDate() + ((5 - t.getDay() + 7) % 7 || 7));
    const sun = new Date(fri); sun.setDate(fri.getDate() + 2); setA(iso(fri)); setB(iso(sun));
  }, []);
  const lf = LOFTS.find(x => x.id === l)!;
  const D = ({ v, set, label, min }: { v: string; set: (s: string) => void; label: string; min?: string }) => (
    <label style={{ position: 'relative' }}><span className="lb">{label}</span>
      <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px,2.7vh,22px)', borderBottom: '1px solid rgba(247,241,227,.4)', display: 'block', paddingBottom: 3 }}>{v ? nice(v) : '…'}</span>
      <input type="date" value={v} min={min} onChange={e => set(e.target.value)} onClick={e => (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.()} aria-label={label} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
    </label>
  );
  return (
    <div className="panel p-wal h-book book">
      <span className="lb" style={{ color: 'var(--mustard)' }}>Zarezerwuj szufladę</span>
      <div className="dates">
        <D v={a} set={v => { setA(v); if (b <= v) { const d = new Date(v + 'T12:00'); d.setDate(d.getDate() + 2); setB(iso(d)); } }} label="Przyjazd" />
        <D v={b} set={setB} label="Wyjazd" min={a} />
        <label><span className="lb">Goście</span><select value={g} onChange={e => setG(+e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n} {n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób'}</option>)}</select></label>
      </div>
      <div className="tags" role="group" aria-label="Loft">
        {LOFTS.map(x => <button key={x.id} aria-pressed={l === x.id} aria-label={`Loft ${x.id}, ${x.title}`} onClick={() => setL(x.id)} disabled={x.guests < g} style={{ background: x.hex, color: x.ink, opacity: x.guests < g ? .3 : 1 }}>{x.id}</button>)}
        <span>loft {lf.id} · {lf.color} · {lf.name.toLowerCase()}</span>
      </div>
      <a className="btn b-mu" style={{ alignSelf: 'flex-start' }} href={href(`/rezerwacja/?loft=${l}&od=${a}&do=${b}&os=${g}`)}>Sprawdź dostępność</a>
    </div>
  );
}
