'use client';
import { useEffect, useMemo, useState } from 'react';
import { LOFTS } from '@/lib/data';
import { Tag } from './ui';

const MON = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
const MONG = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const DOW = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND'];
const key = (d: Date) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
const day = (k: number) => new Date(Math.floor(k / 10000), Math.floor(k / 100) % 100 - 1, k % 100);
const fromIso = (s: string | null) => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return y && m && d ? y * 10000 + m * 100 + d : null; };
/** deterministic “booked” nights per loft, so the calendar always looks lived-in */
const booked = (li: number, k: number) => { const h = (k * 2654435761 + li * 40503) >>> 0; return h % 7 === 0 || (li === 4 && h % 5 === 0) || (li === 1 && h % 6 === 1); };
const zl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł';

export default function Booking() {
  const [today, setToday] = useState<number | null>(null);
  const [a, setA] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);
  const [li, setLi] = useState(2);
  const [ad, setAd] = useState(2);
  const [ki, setKi] = useState(0);
  const [dog, setDog] = useState(0);
  const [br, setBr] = useState(true);
  const [bar, setBar] = useState(true);
  const [late, setLate] = useState(false);
  const [step, setStep] = useState<'pick' | 'form' | 'done'>('pick');
  useEffect(() => {
    const t = new Date(); setToday(key(t));
    const p = new URLSearchParams(location.search);
    const l = LOFTS.findIndex(x => x.id === p.get('loft')); if (l >= 0) setLi(l);
    const os = Number(p.get('os')); if (os) setAd(Math.min(6, os));
    const od = fromIso(p.get('od')), dd = fromIso(p.get('do'));
    if (od && dd && dd > od) { setA(od); setB(dd); }
    else { const f = new Date(t); f.setDate(t.getDate() + ((5 - t.getDay() + 7) % 7 || 7)); const s = new Date(f); s.setDate(f.getDate() + 2); setA(key(f)); setB(key(s)); }
  }, []);
  const nightsList = useMemo(() => { const out: number[] = []; if (!a || !b) return out; const d = day(a); while (key(d) < b) { out.push(key(d)); d.setDate(d.getDate() + 1); } return out; }, [a, b]);
  const n = nightsList.length;
  const free = (i: number) => nightsList.every(k => !booked(i, k));
  const L = LOFTS[li];
  const fits = (i: number) => ad + ki <= LOFTS[i].guests;
  useEffect(() => { if (today && (!free(li) || !fits(li))) { const alt = LOFTS.findIndex((_, i) => free(i) && fits(i)); if (alt >= 0) setLi(alt); } }, [a, b, ad, ki, today]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickDay = (k: number) => {
    if (!a || (a && b) || k <= a) { setA(k); setB(null); return; }
    let ok = true; const d = day(a); while (key(d) < k) { if (booked(li, key(d))) ok = false; d.setDate(d.getDate() + 1); }
    if (ok) setB(k); else { setA(k); setB(null); }
  };
  const months = useMemo(() => { if (!today) return []; const t = day(today); return [0, 1].map(o => new Date(t.getFullYear(), t.getMonth() + o, 1)); }, [today]);
  const nightsCost = n * L.price;
  const brk = br ? (ad + ki) * n * 45 : 0;
  const disc = Math.round(nightsCost * .12);
  const total = nightsCost + brk + (late ? 80 : 0) - disc;
  const fmt = (k: number | null) => k ? `${day(k).getDate()} ${MONG[day(k).getMonth()]}` : '…';
  const Cnt = ({ label, v, set, min = 0, max = 6 }: { label: string; v: number; set: (n: number) => void; min?: number; max?: number }) => (
    <div><span style={{ minWidth: 60 }}>{label}</span><button onClick={() => set(Math.max(min, v - 1))} aria-label={`${label}: mniej`}>−</button><output aria-live="polite">{v}</output><button onClick={() => set(Math.min(max, v + 1))} aria-label={`${label}: więcej`}>+</button></div>
  );

  if (step === 'done') return (
    <div className="step" style={{ textAlign: 'center', padding: 'clamp(24px,6vh,64px)' }}>
      <div style={{ transform: 'scale(1.8)', display: 'inline-block', margin: '20px 0 28px' }}><Tag n={L.id} c={L.hex} dark={L.ink === '#151311'} /></div>
      <h2>Szuflada {L.id} jest Twoja.</h2>
      <p className="lead" style={{ margin: '12px auto 0' }}>{fmt(a)}–{fmt(b)}, {n} {n === 1 ? 'noc' : 'noce'}. Dzień przed przyjazdem dostaniesz SMS z kodem do bramy i numerem skrytki, w której czeka brelok w kolorze {L.color.toLowerCase()}. Playlista loftu przyjdzie mailem.</p>
      <p className="lb" style={{ marginTop: 20, color: 'var(--grey)' }}>Rezerwacja pokazowa · nic nie zostało pobrane</p>
    </div>
  );

  return (
    <div className="bk">
      <div>
        {step === 'pick' ? (
          <>
            <div className="step">
              <span className="lb o">1 · Daty</span>
              <div className="cals">{months.map(m => {
                const first = (m.getDay() + 6) % 7; const dim = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
                return (
                  <div className="cal" key={m.getMonth()}>
                    <h4>{MON[m.getMonth()]} {m.getFullYear()}</h4>
                    <div className="g">{DOW.map(d => <span key={d}>{d}</span>)}{Array.from({ length: first }, (_, i) => <i key={'e' + i} />)}
                      {Array.from({ length: dim }, (_, i) => { const k = key(new Date(m.getFullYear(), m.getMonth(), i + 1)); const past = today !== null && k < today; const bk = booked(li, k);
                        const edge = k === a || k === b; const inr = a && b && k > a && k < b;
                        return <button key={k} disabled={past || (bk && !edge)} className={edge ? 'edge' : inr ? 'in' : ''} onClick={() => pickDay(k)} aria-label={`${i + 1} ${MON[m.getMonth()]}${bk ? ', zajęte' : ''}`} aria-pressed={edge}>{i + 1}</button>; })}
                    </div>
                  </div>
                );
              })}</div>
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>Przekreślone noce są zajęte w lofcie {L.id}. Kliknij przyjazd, potem wyjazd.</p>
            </div>
            <div className="step">
              <span className="lb o">2 · Szuflada</span>
              <div className="pick">{LOFTS.map((l, i) => { const ok = free(i) && fits(i); return (
                <button key={l.id} aria-pressed={li === i} disabled={!ok} onClick={() => setLi(i)} style={{ ['--c' as string]: l.hex, ['--ink2' as string]: l.ink } as React.CSSProperties}>
                  <b>{l.id}</b><small>{l.price} zł</small><small className="lb" style={{ fontSize: 9 }}>{!fits(i) ? `max ${l.guests} os.` : free(i) ? 'wolne' : 'zajęte'}</small>
                </button>); })}</div>
            </div>
            <div className="step">
              <span className="lb o">3 · Goście i dodatki</span>
              <div className="cnt"><Cnt label="Dorośli" v={ad} set={setAd} min={1} /><Cnt label="Dzieci" v={ki} set={setKi} /><Cnt label="Pies" v={dog} set={setDog} max={2} /></div>
              {dog > 0 && !L.dog && <p style={{ color: 'var(--brick)', fontSize: 14, marginTop: 8 }}>Loft {L.id} jest bez psa. Psy mile widziane w 01, 03, 04 i 06.</p>}
              <div className="ext">
                <label><span><input type="checkbox" checked={br} onChange={e => setBr(e.target.checked)} /> Śniadanie z Palarni Fabrycznej</span><span className="muted">+ 45 zł / os. / dzień</span></label>
                <label><span><input type="checkbox" checked={bar} onChange={e => setBar(e.target.checked)} /> Stolik w barze Radiowa 58 w sobotę 21:00</span><span className="muted">gratis dla gości</span></label>
                <label><span><input type="checkbox" checked={late} onChange={e => setLate(e.target.checked)} /> Późny check-out 14:00</span><span className="muted">+ 80 zł</span></label>
              </div>
            </div>
          </>
        ) : (
          <form className="step" onSubmit={e => { e.preventDefault(); setStep('done'); }} style={{ display: 'grid', gap: 14 }}>
            <span className="lb o">4 · Dane gościa</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field"><label htmlFor="bn">Imię i nazwisko</label><input id="bn" className="input" required autoComplete="name" /></div>
              <div className="field"><label htmlFor="bp">Telefon (na SMS z kodem)</label><input id="bp" className="input" type="tel" required autoComplete="tel" /></div>
            </div>
            <div className="field"><label htmlFor="be">E-mail</label><input id="be" className="input" type="email" required autoComplete="email" /></div>
            <div className="field"><label htmlFor="bm">Coś, o czym powinniśmy wiedzieć?</label><textarea id="bm" className="input" rows={3} placeholder="np. przyjeżdżamy po 23, urodziny, alergia na pierze" /></div>
            <div className="row"><button type="button" className="btn b-ln" onClick={() => setStep('pick')}>← Wróć</button><button className="btn b-or" type="submit">Potwierdź rezerwację</button></div>
          </form>
        )}
      </div>
      <aside className="sum" aria-live="polite">
        <span className="lb" style={{ color: 'var(--mustard)' }}>Twój brelok</span>
        <div className="keyrow"><Tag n={L.id} c={L.hex} dark={L.ink === '#151311'} /><span style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.1 }}>{L.title}</span></div>
        <dl>
          <dt>Daty</dt><dd>{fmt(a)}–{fmt(b)} · {n} {n === 1 ? 'noc' : 'noce'}</dd>
          <dt>Goście</dt><dd>{ad} dor.{ki ? ` + ${ki} dz.` : ''}{dog ? ` + ${dog === 1 ? 'pies' : '2 psy'}` : ''}</dd>
          <dt>Noclegi</dt><dd>{zl(nightsCost)}</dd>
          {br && <><dt>Śniadania</dt><dd>{zl(brk)}</dd></>}
          {late && <><dt>Późny check-out</dt><dd>80 zł</dd></>}
          {dog > 0 && <><dt>Pies</dt><dd>gratis</dd></>}
          <dt>Rabat za rezerwację tutaj</dt><dd style={{ color: 'var(--mustard)' }}>− {zl(disc)}</dd>
        </dl>
        <p className="tot">{zl(total)}</p>
        {step === 'pick' && <button className="btn b-or" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} disabled={!n || (dog > 0 && !L.dog)} onClick={() => setStep('form')}>Dalej: dane gościa</button>}
      </aside>
    </div>
  );
}
