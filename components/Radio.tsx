'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { href } from '@/lib/base';
import { LOFTS } from '@/lib/data';

const MIN = 87.5, MAX = 106.5;
const ST = LOFTS.map(l => ({ l, f: parseFloat(l.freq) }));
const CHORDS = [[196, 247, 294], [220, 277, 330], [175, 220, 262], [247, 311, 370], [165, 208, 247], [131, 165, 196]];

/** Radio Taraban 58: tune the dial, catch a loft. Static between stations, music on them. Sound only after you switch it on. */
export default function Radio() {
  const [f, setF] = useState(93.3);
  const [vol, setVol] = useState(0.6);
  const [on, setOn] = useState(false);
  const dial = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = root.current; if (!el) return; const h = (e: WheelEvent) => { if ((e.target as HTMLElement).closest('.knob2,.dial')) e.preventDefault(); }; el.addEventListener('wheel', h, { passive: false }); return () => el.removeEventListener('wheel', h); }, []);
  const ac = useRef<{ ctx: AudioContext; master: GainNode; noise: GainNode; tone: GainNode; oscs: OscillatorNode[] } | null>(null);
  const offT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const near = ST.reduce((b, s) => Math.abs(s.f - f) < Math.abs(b.f - f) ? s : b, ST[0]);
  const sig = Math.max(0, 1 - Math.abs(near.f - f) / 0.9);
  const lock = sig > 0.55;
  const idx = ST.indexOf(near);

  // audio graph: oscs -> trem (lfo wobble around 1) -> tone -> lp -> master; noise -> master; master -> out
  const start = useCallback(() => {
    if (offT.current) { clearTimeout(offT.current); offT.current = null; }
    if (ac.current) { ac.current.ctx.resume(); return; }
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = .6;
    const noise = ctx.createGain(); noise.gain.value = 0; src.connect(bp).connect(noise).connect(master); src.start();
    const tone = ctx.createGain(); tone.gain.value = 0; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; tone.connect(lp).connect(master);
    const trem = ctx.createGain(); trem.gain.value = 1; trem.connect(tone);
    const lfo = ctx.createOscillator(); lfo.frequency.value = .25; const lg = ctx.createGain(); lg.gain.value = .2; lfo.connect(lg).connect(trem.gain); lfo.start();
    const oscs = [0, 1, 2].map(() => { const o = ctx.createOscillator(); o.type = 'triangle'; const g = ctx.createGain(); g.gain.value = .33; o.connect(g).connect(trem); o.start(); return o; });
    ac.current = { ctx, master, noise, tone, oscs };
  }, []);
  useEffect(() => {
    const a = ac.current; if (!a) return;
    const t = a.ctx.currentTime;
    a.master.gain.cancelScheduledValues(t);
    a.master.gain.setTargetAtTime(on ? 1 : 0, t, .03);
    a.noise.gain.setTargetAtTime((1 - sig) * vol * .09, t, .05);
    a.tone.gain.setTargetAtTime(sig * vol * .1, t, .08);
    CHORDS[idx].forEach((hz, i) => a.oscs[i].frequency.setTargetAtTime(hz * (1 + (f - near.f) * .02), t, .05));
    if (!on) { if (offT.current) clearTimeout(offT.current); offT.current = setTimeout(() => { a.master.gain.value = 0; a.ctx.suspend(); }, 200); }
  }, [f, vol, on, sig, idx, near.f]);
  useEffect(() => () => { if (offT.current) clearTimeout(offT.current); ac.current?.ctx.close(); }, []);
  // stop when the tab is hidden or the radio scrolls far away
  useEffect(() => { const h = () => { if (document.hidden) setOn(false); }; document.addEventListener('visibilitychange', h); return () => document.removeEventListener('visibilitychange', h); }, []);

  // dial interaction
  const fromX = (x: number) => { const r = dial.current!.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (x - r.left - 18) / (r.width - 36))); return MIN + p * (MAX - MIN); };
  const drag = (e: React.PointerEvent) => { if (e.buttons !== 1 && e.type !== 'pointerdown') return; setF(+fromX(e.clientX).toFixed(1)); };
  // knobs: drag up/down (or left/right), wheel, arrows, or the - / + buttons
  const knobDrag = (apply: (dPx: number) => void) => (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement; el.setPointerCapture(e.pointerId);
    let lx = e.clientX, ly = e.clientY;
    const mv = (ev: PointerEvent) => { const dx = ev.clientX - lx, dy = ly - ev.clientY; lx = ev.clientX; ly = ev.clientY; apply(Math.abs(dy) >= Math.abs(dx) ? dy : dx); };
    const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  };
  const setV = (fn: (v: number) => number) => setVol(v => Math.round(Math.min(1, Math.max(0, fn(v))) * 100) / 100);
  const acc = useRef(0);
  const tunePx = (d: number) => { acc.current += d * .04; const step = Math.trunc(acc.current * 10) / 10; if (step) { acc.current -= step; setF(v => clampF(v + step)); } };
  const jump = (dir: 1 | -1) => setF(v => { const list = dir > 0 ? ST.filter(s => s.f > v + .05) : ST.filter(s => s.f < v - .05).reverse(); return list[0] ? list[0].f : v; });
  const keyStep = (inc: () => void, dec: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { inc(); e.preventDefault(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { dec(); e.preventDefault(); }
  };
  const wheel = (inc: () => void, dec: () => void) => (e: React.WheelEvent) => { if (e.deltaY < 0) inc(); else dec(); };
  const clampF = (v: number) => +Math.min(MAX, Math.max(MIN, v)).toFixed(1);
  const pos = (v: number) => `calc(18px + (100% - 36px) * ${(v - MIN) / (MAX - MIN)})`;
  const ang = ((f - MIN) / (MAX - MIN)) * 300 - 150;

  return (
    <div className="radio" ref={root}>
      <div className="grille" aria-hidden />
      <div className="face">
        <div className="dial" ref={dial} role="slider" tabIndex={0} aria-label="Strojenie" aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={f} aria-valuetext={`${f.toFixed(1)} MHz${lock ? `, loft ${near.l.id}` : ', szum'}`}
          onPointerDown={e => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}
          onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setF(v => clampF(v + .2)); e.preventDefault(); } if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setF(v => clampF(v - .2)); e.preventDefault(); } }}
          onWheel={e => setF(v => clampF(v + (e.deltaY > 0 ? .2 : -.2)))}>
          <div className="sts">{ST.map(s => (
            <button key={s.l.id} onPointerDown={e => e.stopPropagation()} onClick={() => setF(s.f)} style={{ color: s === near && lock ? s.l.hex === '#151311' ? '#151311' : s.l.hex : undefined, opacity: s === near && lock ? 1 : .55 }}>
              <b>{s.l.id}</b><span>{s.l.name.toUpperCase()}</span><small>{s.l.freq} MHz</small>
            </button>))}</div>
          <div className="scale" aria-hidden />
          <div className="needle" style={{ left: pos(f) }} aria-hidden />
        </div>
        <div className="knobs">
          <div className="kn">
            <div className="kctl">
              <button className="kb" onClick={() => setV(v => v - .1)} aria-label="Ciszej">−</button>
              <div className="knob2" style={{ transform: `rotate(${vol * 270 - 135}deg)` }} onPointerDown={knobDrag(d => setV(v => v + d * .005))} onWheel={wheel(() => setV(v => v + .05), () => setV(v => v - .05))}
                role="slider" tabIndex={0} aria-label="Głośność" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(vol * 100)} onKeyDown={keyStep(() => setV(v => v + .1), () => setV(v => v - .1))} />
              <button className="kb" onClick={() => setV(v => v + .1)} aria-label="Głośniej">+</button>
            </div>
            <p className="lb">Głośność {Math.round(vol * 100)}%</p>
          </div>
          <div className="mid">
            <button className={`pwr${on ? ' on' : ''}`} onClick={() => { if (!on) start(); setOn(!on); }} aria-pressed={on}>{on ? '■ Wyłącz dźwięk' : '▶ Włącz dźwięk'}</button>
            <div className="lcd" aria-hidden>{lock ? near.l.id : '--'}<small>{f.toFixed(1)}</small></div>
          </div>
          <div className="kn">
            <div className="kctl">
              <button className="kb" onClick={() => jump(-1)} aria-label="Poprzednia stacja">‹</button>
              <div className="knob2 mu" style={{ transform: `rotate(${ang}deg)` }} onPointerDown={knobDrag(tunePx)} onWheel={wheel(() => setF(v => clampF(v + .1)), () => setF(v => clampF(v - .1)))}
                role="slider" tabIndex={0} aria-label="Strojenie" aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={f} onKeyDown={keyStep(() => setF(v => clampF(v + .1)), () => setF(v => clampF(v - .1)))} />
              <button className="kb" onClick={() => jump(1)} aria-label="Następna stacja">›</button>
            </div>
            <p className="lb">Strojenie · ‹ › skok do loftu</p>
          </div>
        </div>
      </div>
      <div className="onair" style={{ gridColumn: '1 / -1', background: lock ? near.l.hex : '#3B2414', color: lock && near.l.ink === '#151311' ? '#151311' : 'var(--paper)', transition: 'background .3s' }} aria-live="polite">
        {lock ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div><p className="lb"><i />Na antenie · loft {near.l.id} · {near.l.color}</p><h3>{near.l.artist} · {near.l.album}</h3><p style={{ fontSize: 14, opacity: .85 }}>gra teraz na gramofonie w lofcie {near.l.id} · {near.l.title.toLowerCase()} · od {near.l.price} zł</p></div>
            <a className="btn b-bk" href={href(`/lofty/${near.l.id}/`)}>Zajrzyj do loftu {near.l.id}</a>
          </div>
        ) : <p className="lb" style={{ padding: '10px 0' }}>{f.toFixed(1)} MHz · szum · kręć dalej, w eterze jest sześć loftów</p>}
      </div>
    </div>
  );
}
