'use client';
import { useState } from 'react';
import { href } from '@/lib/base';

const DOW = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
const MON = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const nice = (s: string) => { const d = new Date(s + 'T12:00'); return `${DOW[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`; };

/** The bottom rail of the cabinet: dates and guests, nothing chosen for you. */
export default function HeroBook() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [g, setG] = useState('');
  const today = iso(new Date());
  const D = ({ v, set, label, min }: { v: string; set: (s: string) => void; label: string; min?: string }) => (
    <label className="bf"><span className="lb">{label}</span>
      <span className={`bv${v ? '' : ' ph0'}`}>{v ? nice(v) : 'wybierz datę'}</span>
      <input type="date" value={v} min={min} onChange={e => set(e.target.value)} onClick={e => (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.()} aria-label={label} />
    </label>
  );
  const ok = a && b && g;
  return (
    <div className="panel p-wal h-book book">
      <span className="lb bt">Zarezerwuj szufladę</span>
      <D v={a} set={v => { setA(v); if (b && b <= v) setB(''); }} label="Przyjazd" min={today} />
      <D v={b} set={setB} label="Wyjazd" min={a || today} />
      <label className="bf"><span className="lb">Goście</span>
        <select value={g} onChange={e => setG(e.target.value)} className={g ? '' : 'ph0'}><option value="" disabled>ile osób?</option>{[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n} {n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób'}</option>)}</select>
      </label>
      <a className={`btn b-mu${ok ? '' : ' off'}`} aria-disabled={!ok} href={ok ? href(`/rezerwacja/?od=${a}&do=${b}&os=${g}`) : undefined}>{ok ? 'Pokaż wolne szuflady' : 'Wybierz daty i gości'}</a>
    </div>
  );
}
