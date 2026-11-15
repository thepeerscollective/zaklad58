'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { href } from '@/lib/base';
import { LOFTS } from '@/lib/data';

const MIN = 87.5, MAX = 106.5;
const ST = LOFTS.map(l => ({ l, f: parseFloat(l.freq) }));
const CHORDS = [[196, 247, 294], [220, 277, 330], [175, 220, 262], [247, 311, 370], [165, 208, 247], [131, 165, 196]];

/** Radio Taraban 58: tune the dial, catch a loft. Static between stations, music on them. Sound only after you switch it on. */
export default function Radio() {
  const [f, setF] = useState(95.0);
  const [vol, setVol] = useState(0.6);
  const [on, setOn] = useState(false);
  const dial = useRef<HTMLDivElement>(null);
  const ac = useRef<{ ctx: AudioContext; noise: GainNode; tone: GainNode; oscs: OscillatorNode[] } | null>(null);

  const near = ST.reduce((b, s) => Math.abs(s.f - f) < Math.abs(b.f - f) ? s : b, ST[0]);
  const sig = Math.max(0, 1 - Math.abs(near.f - f) / 0.9);
  const lock = sig > 0.55;
  const idx = ST.indexOf(near);

  // audio graph
  const start = useCallback(() => {
    if (ac.current) { ac.current.ctx.resume(); return; }
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = .6;
    const noise = ctx.createGain(); noise.gain.value = 0; src.connect(bp).connect(noise).connect(ctx.destination); src.start();
    const tone = ctx.createGain(); tone.gain.value = 0; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; tone.connect(lp).connect(ctx.destination);
    const lfo = ctx.createOscillator(); lfo.frequency.value = .25; const lg = ctx.createGain(); lg.gain.value = .25; lfo.connect(lg).connect(tone.gain); lfo.start();
    const oscs = [0, 1, 2].map(() => { const o = ctx.createOscillator(); o.type = 'triangle'; const g = ctx.createGain(); g.gain.value = .33; o.connect(g).connect(tone); o.start(); return o; });
    ac.current = { ctx, noise, tone, oscs };
  }, []);
  useEffect(() => {
    const a = ac.current; if (!a) return;
    const t = a.ctx.currentTime;
    a.noise.gain.setTargetAtTime(on ? (1 - sig) * vol * .09 : 0, t, .05);
    a.tone.gain.setTargetAtTime(on ? sig * vol * .1 : 0, t, .08);
    CHORDS[idx].forEach((hz, i) => a.oscs[i].frequency.setTargetAtTime(hz * (1 + (f - near.f) * .02), t, .05));
  }, [f, vol, on, sig, idx, near.f]);
  useEffect(() => () => { ac.current?.ctx.close(); }, []);

  // dial interaction
  const fromX = (x: number) => { const r = dial.current!.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (x - r.left - 18) / (r.width - 36))); return MIN + p * (MAX - MIN); };
  const drag = (e: React.PointerEvent) => { if (e.buttons !== 1 && e.type !== 'pointerdown') return; setF(+fromX(e.clientX).toFixed(1)); };
  const knobDrag = (setter: (fn: (v: number) => number) => void, k: number) => (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement; el.setPointerCapture(e.pointerId); let last = e.clientX - e.clientY;
    const mv = (ev: PointerEvent) => { const v = ev.clientX - ev.clientY; setter(x => x + (v - last) * k); last = v; };
    const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up);
  };
  const clampF = (v: number) => +Math.min(MAX, Math.max(MIN, v)).toFixed(1);
  const pos = (v: number) => `calc(18px + (100% - 36px) * ${(v - MIN) / (MAX - MIN)})`;
  const ang = ((f - MIN) / (MAX - MIN)) * 300 - 150;

  return (
    <div className="radio">
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
          <div><div className="knob2" style={{ transform: `rotate(${vol * 270 - 135}deg)` }} onPointerDown={knobDrag(fn => setVol(v => Math.min(1, Math.max(0, fn(v)))), .006)} role="slider" tabIndex={0} aria-label="Głośność" aria-valuenow={Math.round(vol * 100)}
            onKeyDown={e => { if (e.key === 'ArrowUp' || e.key === 'ArrowRight') setVol(v => Math.min(1, v + .1)); if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') setVol(v => Math.max(0, v - .1)); }} /><p className="lb">Głośność</p></div>
          <button className="btn" style={{ background: on ? 'var(--orange)' : 'var(--paper)', color: on ? 'var(--paper)' : 'var(--black)' }} onClick={() => { start(); setOn(!on); }} aria-pressed={on}>{on ? '● Dźwięk włączony' : '▶ Włącz dźwięk'}</button>
          <div className="lcd" aria-hidden>{lock ? near.l.id : '--'}</div>
          <div><div className="knob2 mu" style={{ transform: `rotate(${ang}deg)` }} onPointerDown={knobDrag(fn => setF(v => clampF(fn(v))), .03)} role="slider" tabIndex={0} aria-label="Strojenie, pokrętło" aria-valuenow={f}
            onKeyDown={e => { if (e.key === 'ArrowUp' || e.key === 'ArrowRight') setF(v => clampF(v + .2)); if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') setF(v => clampF(v - .2)); }} /><p className="lb">Strojenie</p></div>
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
