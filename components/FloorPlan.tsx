/** Architectural floor plans, drawn in centimetres. Thick outer walls, door swings, windows on the street side,
 *  furniture symbols, the loft's signature piece in its colour, dimensions, scale bar and north arrow. */

type K = 'bed' | 'sofa' | 'arm' | 'tbl' | 'kit' | 'tub' | 'shw' | 'wc' | 'bas' | 'shelf' | 'tt' | 'stairs' | 'bar' | 'desk' | 'spk' | 'plant';
type Item = { k: K; x: number; y: number; w: number; h: number; side?: 't' | 'b' | 'l' | 'r'; n?: number; sig?: boolean; dash?: boolean };
type Door = { x: number; y: number; ax: 'h' | 'v'; s: 1 | -1; len?: number; entry?: boolean };
type Room = { name: string; x: number; y: number; w: number; h: number; lx: number; ly: number; noArea?: boolean };
type Layout = {
  W: number; H: number; walls: [number, number, number, number][]; doors: Door[]; win: [number, number][];
  rooms: Room[]; items: Item[]; sigLabel: [string, number, number]; terrace?: { h: number; items: Item[] }; mezz?: { y0: number; y1: number; items: Item[] }; beams?: number[];
};

const P: Record<string, Layout> = {
  '01': {
    W: 700, H: 600, walls: [[450, 0, 450, 600], [450, 360, 700, 360]], win: [[60, 190], [260, 400], [520, 650]],
    doors: [{ x: 450, y: 250, ax: 'v', s: 1 }, { x: 450, y: 500, ax: 'v', s: 1 }, { x: 300, y: 600, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'salon', x: 0, y: 0, w: 450, h: 600, lx: 225, ly: 300 }, { name: 'sypialnia', x: 450, y: 0, w: 250, h: 360, lx: 575, ly: 300 }, { name: 'łazienka', x: 450, y: 360, w: 250, h: 240, lx: 600, ly: 470 }],
    items: [
      { k: 'shelf', x: 12, y: 40, w: 40, h: 440 }, { k: 'arm', x: 90, y: 80, w: 90, h: 90, side: 't', sig: true }, { k: 'sofa', x: 200, y: 360, w: 210, h: 90, side: 'b' },
      { k: 'tbl', x: 300, y: 130, w: 80, h: 80, n: 2 }, { k: 'kit', x: 12, y: 528, w: 240, h: 60 }, { k: 'tt', x: 250, y: 30, w: 60, h: 45 },
      { k: 'bed', x: 495, y: 40, w: 160, h: 200, side: 't' }, { k: 'wc', x: 500, y: 375, w: 45, h: 60 }, { k: 'bas', x: 580, y: 375, w: 60, h: 45 }, { k: 'shw', x: 600, y: 500, w: 90, h: 90 },
    ], sigLabel: ['Eames Lounge', 190, 120],
  },
  '02': {
    W: 650, H: 580, walls: [[430, 400, 650, 400], [430, 400, 430, 580]], win: [[40, 260], [380, 600]],
    doors: [{ x: 460, y: 400, ax: 'h', s: 1 }, { x: 330, y: 580, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'pokój z wanną', x: 0, y: 0, w: 650, h: 400, lx: 250, ly: 300, noArea: true }, { name: 'aneks', x: 0, y: 400, w: 430, h: 180, lx: 120, ly: 440, noArea: true }, { name: 'łazienka', x: 430, y: 400, w: 220, h: 180, lx: 600, ly: 560 }],
    items: [
      { k: 'tub', x: 70, y: 50, w: 170, h: 80, sig: true }, { k: 'bed', x: 410, y: 40, w: 160, h: 200, side: 't' }, { k: 'arm', x: 280, y: 60, w: 75, h: 75, side: 't' },
      { k: 'tbl', x: 170, y: 220, w: 80, h: 80, n: 2 }, { k: 'kit', x: 12, y: 508, w: 260, h: 60 }, { k: 'desk', x: 30, y: 230, w: 50, h: 110 },
      { k: 'wc', x: 580, y: 410, w: 45, h: 60 }, { k: 'shw', x: 548, y: 478, w: 90, h: 90 }, { k: 'bas', x: 445, y: 525, w: 55, h: 42 }, { k: 'plant', x: 330, y: 330, w: 40, h: 40 },
    ], sigLabel: ['wanna 1910 przy oknie', 70, 160],
  },
  '03': {
    W: 800, H: 600, walls: [[500, 0, 500, 600], [500, 370, 800, 370]], win: [[60, 200], [280, 440], [560, 740]],
    doors: [{ x: 500, y: 260, ax: 'v', s: 1 }, { x: 500, y: 500, ax: 'v', s: 1 }, { x: 380, y: 600, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'salon', x: 0, y: 0, w: 500, h: 600, lx: 230, ly: 470 }, { name: 'sypialnia', x: 500, y: 0, w: 300, h: 370, lx: 650, ly: 320 }, { name: 'łazienka', x: 500, y: 370, w: 300, h: 230, lx: 650, ly: 475 }],
    items: [
      { k: 'shelf', x: 12, y: 60, w: 40, h: 420 }, { k: 'tt', x: 70, y: 220, w: 90, h: 60, sig: true }, { k: 'spk', x: 70, y: 150, w: 40, h: 40 }, { k: 'spk', x: 70, y: 310, w: 40, h: 40 },
      { k: 'sofa', x: 330, y: 150, w: 95, h: 230, side: 'r' }, { k: 'arm', x: 200, y: 60, w: 75, h: 75, side: 't' }, { k: 'kit', x: 12, y: 528, w: 300, h: 60 },
      { k: 'bed', x: 590, y: 40, w: 160, h: 200, side: 't' }, { k: 'bas', x: 590, y: 385, w: 60, h: 45 }, { k: 'wc', x: 680, y: 385, w: 45, h: 60 }, { k: 'shw', x: 700, y: 500, w: 90, h: 90 },
    ], sigLabel: ['Thorens + 200 płyt', 170, 250],
  },
  '04': {
    W: 900, H: 600, walls: [[520, 0, 520, 600], [520, 300, 900, 300], [520, 480, 900, 480]], win: [[160, 320], [600, 780]],
    doors: [{ x: 520, y: 200, ax: 'v', s: 1 }, { x: 520, y: 390, ax: 'v', s: 1 }, { x: 520, y: 500, ax: 'v', s: 1, len: 70 }, { x: 300, y: 600, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'salon z kuchnią', x: 0, y: 0, w: 520, h: 600, lx: 260, ly: 440 }, { name: 'sypialnia 1', x: 520, y: 0, w: 380, h: 300, lx: 640, ly: 270 }, { name: 'sypialnia 2', x: 520, y: 300, w: 380, h: 180, lx: 620, ly: 460 }, { name: 'łazienka', x: 520, y: 480, w: 380, h: 120, lx: 690, ly: 590 }],
    items: [
      { k: 'tbl', x: 120, y: 230, w: 200, h: 100, n: 6, sig: true }, { k: 'kit', x: 12, y: 528, w: 260, h: 60 }, { k: 'kit', x: 12, y: 330, w: 60, h: 198 },
      { k: 'sofa', x: 410, y: 50, w: 90, h: 220, side: 'r' }, { k: 'arm', x: 300, y: 70, w: 75, h: 75, side: 't' },
      { k: 'bed', x: 700, y: 40, w: 160, h: 200, side: 't' }, { k: 'bed', x: 680, y: 316, w: 200, h: 140, side: 'r' },
      { k: 'wc', x: 630, y: 492, w: 45, h: 60 }, { k: 'bas', x: 700, y: 492, w: 60, h: 42 }, { k: 'shw', x: 795, y: 492, w: 95, h: 95 },
    ], sigLabel: ['stół Ład na 6', 120, 360],
    terrace: { h: 260, items: [{ k: 'tbl', x: 140, y: -190, w: 90, h: 90, n: 4 }, { k: 'arm', x: 380, y: -200, w: 75, h: 75, side: 't' }, { k: 'arm', x: 480, y: -200, w: 75, h: 75, side: 't' }, { k: 'plant', x: 30, y: -240, w: 50, h: 50 }, { k: 'plant', x: 820, y: -240, w: 50, h: 50 }] },
  },
  '05': {
    W: 650, H: 585, walls: [[430, 400, 650, 400], [430, 400, 430, 585]], win: [[60, 200], [260, 400]],
    doors: [{ x: 450, y: 400, ax: 'h', s: 1 }, { x: 300, y: 585, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'salon', x: 0, y: 0, w: 650, h: 400, lx: 260, ly: 360, noArea: true }, { name: 'aneks', x: 0, y: 400, w: 430, h: 185, lx: 120, ly: 450, noArea: true }, { name: 'łazienka', x: 430, y: 400, w: 220, h: 185, lx: 600, ly: 570 }],
    items: [
      { k: 'sofa', x: 120, y: 270, w: 210, h: 85, side: 'b' }, { k: 'tbl', x: 360, y: 280, w: 70, h: 70, n: 2 }, { k: 'kit', x: 12, y: 513, w: 250, h: 60 },
      { k: 'stairs', x: 560, y: 120, w: 80, h: 270 }, { k: 'wc', x: 445, y: 515, w: 45, h: 60 }, { k: 'bas', x: 500, y: 535, w: 55, h: 40 }, { k: 'shw', x: 552, y: 488, w: 90, h: 90 },
    ], sigLabel: ['dźwigary z 1938', 20, 245], beams: [150, 330, 510],
    mezz: { y0: 0, y1: 240, items: [{ k: 'bed', x: 200, y: 25, w: 160, h: 200, side: 't', dash: true }] },
  },
  '06': {
    W: 1200, H: 800,
    walls: [[700, 0, 700, 500], [700, 580, 700, 800], [700, 280, 1200, 280], [700, 500, 1200, 500], [700, 580, 1200, 580], [900, 580, 900, 800]],
    win: [[60, 220], [300, 460], [520, 660], [780, 960], [1020, 1160]],
    doors: [{ x: 700, y: 170, ax: 'v', s: 1 }, { x: 760, y: 500, ax: 'h', s: -1 }, { x: 740, y: 580, ax: 'h', s: 1 }, { x: 940, y: 580, ax: 'h', s: 1 }, { x: 520, y: 800, ax: 'h', s: -1, len: 90, entry: true }],
    rooms: [{ name: 'salon i jadalnia', x: 0, y: 0, w: 700, h: 800, lx: 350, ly: 520 }, { name: 'sypialnia 1', x: 700, y: 0, w: 500, h: 280, lx: 790, ly: 250 }, { name: 'sypialnia 2', x: 700, y: 280, w: 500, h: 220, lx: 800, ly: 470 }, { name: 'łazienka', x: 700, y: 580, w: 200, h: 220, lx: 800, ly: 790 }, { name: 'sypialnia 3', x: 900, y: 580, w: 300, h: 220, lx: 1050, ly: 790 }],
    items: [
      { k: 'bar', x: 80, y: 600, w: 380, h: 70, n: 6, sig: true }, { k: 'kit', x: 12, y: 728, w: 420, h: 60 }, { k: 'tbl', x: 200, y: 320, w: 280, h: 110, n: 10 },
      { k: 'sofa', x: 60, y: 60, w: 260, h: 95, side: 't' }, { k: 'arm', x: 360, y: 70, w: 80, h: 80, side: 't' }, { k: 'tt', x: 520, y: 40, w: 90, h: 55 }, { k: 'shelf', x: 640, y: 40, w: 40, h: 220 },
      { k: 'bed', x: 880, y: 40, w: 180, h: 200, side: 't' }, { k: 'bed', x: 950, y: 300, w: 200, h: 160, side: 'r' },
      { k: 'bed', x: 960, y: 595, w: 90, h: 190, side: 't' }, { k: 'bed', x: 1090, y: 595, w: 90, h: 190, side: 't' },
      { k: 'tub', x: 715, y: 705, w: 170, h: 78 }, { k: 'wc', x: 840, y: 598, w: 45, h: 60 }, { k: 'bas', x: 830, y: 664, w: 55, h: 36 },
    ], sigLabel: ['bar na 10 osób', 80, 700],
  },
};

const INK = '#151311', PAPER = '#F7F1E3', T = 24, TI = 10;

function Thing({ it, hex, ink }: { it: Item; hex: string; ink: string }) {
  const { k, x, y, w, h } = it;
  const f = it.sig ? hex : PAPER, s = INK, sw = 2.2, da = it.dash ? '8 6' : undefined, li = it.sig ? ink : INK;
  const base = { fill: f, stroke: s, strokeWidth: sw, strokeDasharray: da };
  switch (k) {
    case 'bed': {
      const head = it.side ?? 't'; const vert = head === 't' || head === 'b';
      const pl = vert ? Math.min(w * .42, 70) : 0;
      return <g {...base}><rect x={x} y={y} width={w} height={h} rx={4} />
        {vert ? <>{[0, 1].map(i => <rect key={i} x={x + 8 + i * (w - 16) / 2} y={head === 't' ? y + 8 : y + h - 38} width={(w - 24) / 2} height={30} rx={6} fill={PAPER} />)}<line x1={x} x2={x + w} y1={head === 't' ? y + h * .38 : y + h * .62} y2={head === 't' ? y + h * .38 : y + h * .62} /><line x1={x} x2={x + w * .7} y1={head === 't' ? y + h * .38 : y + h * .62} y2={head === 't' ? y + h * .5 : y + h * .5} /></>
          : <>{[0, 1].map(i => <rect key={i} x={head === 'r' ? x + w - 38 : x + 8} y={y + 8 + i * (h - 16) / 2} width={30} height={(h - 24) / 2} rx={6} fill={PAPER} />)}<line y1={y} y2={y + h} x1={head === 'r' ? x + w * .62 : x + w * .38} x2={head === 'r' ? x + w * .62 : x + w * .38} /></>}
        {pl < 0 && null}</g>;
    }
    case 'sofa': case 'arm': {
      const b = k === 'sofa' ? 22 : 18, a = 16, side = it.side ?? 't';
      const back = side === 't' ? [x, y, w, b] : side === 'b' ? [x, y + h - b, w, b] : side === 'l' ? [x, y, b, h] : [x + w - b, y, b, h];
      const arms = side === 't' || side === 'b' ? [[x, y, a, h], [x + w - a, y, a, h]] : [[x, y, w, a], [x, y + h - a, w, a]];
      return <g {...base}><rect x={x} y={y} width={w} height={h} rx={8} /><rect x={back[0]} y={back[1]} width={back[2]} height={back[3]} rx={6} />{arms.map((r, i) => <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} rx={6} />)}</g>;
    }
    case 'tbl': {
      const n = it.n ?? 4, c = 38, ch: [number, number][] = [];
      const along = w >= h ? 'x' : 'y'; const perSide = n >= 6 ? Math.floor((n - (n >= 10 ? 2 : 0)) / 2) : n === 4 ? 1 : 1;
      if (n === 2) { ch.push([x + w / 2 - c / 2, y - c - 6], [x + w / 2 - c / 2, y + h + 6]); }
      else if (n === 4 && w === h) { ch.push([x + w / 2 - c / 2, y - c - 6], [x + w / 2 - c / 2, y + h + 6], [x - c - 6, y + h / 2 - c / 2], [x + w + 6, y + h / 2 - c / 2]); }
      else {
        for (let i = 0; i < perSide; i++) { const t = (i + .5) / perSide; if (along === 'x') ch.push([x + t * w - c / 2, y - c - 6], [x + t * w - c / 2, y + h + 6]); else ch.push([x - c - 6, y + t * h - c / 2], [x + w + 6, y + t * h - c / 2]); }
        if (n >= 10) ch.push([x - c - 6, y + h / 2 - c / 2], [x + w + 6, y + h / 2 - c / 2]);
      }
      return <g {...base}>{ch.map(([cx, cy], i) => <rect key={i} x={cx} y={cy} width={c} height={c} rx={6} fill={PAPER} />)}<rect x={x} y={y} width={w} height={h} rx={w === h ? w / 2 * (n === 2 ? 1 : 0) : 4} /></g>;
    }
    case 'kit': {
      const vert = h > w; const L = vert ? h : w;
      const sx = vert ? x + 10 : x + L * .3, sy = vert ? y + L * .3 : y + 10;
      const hx = vert ? x + w / 2 : x + L * .7, hy = vert ? y + L * .72 : y + h / 2;
      return <g {...base}><rect x={x} y={y} width={w} height={h} />{!vert && <><rect x={sx} y={sy} width={60} height={h - 20} rx={6} /><circle cx={sx + 30} cy={sy + (h - 20) / 2} r={4} /></>}{vert && <rect x={sx} y={sy} width={w - 20} height={60} rx={6} />}
        {[[-12, -12], [12, -12], [-12, 12], [12, 12]].map(([dx, dy], i) => <circle key={i} cx={hx + dx} cy={hy + dy} r={8} fill="none" />)}</g>;
    }
    case 'tub': return <g {...base}><rect x={x} y={y} width={w} height={h} rx={h / 2} /><rect x={x + 12} y={y + 10} width={w - 24} height={h - 20} rx={(h - 20) / 2} fill="none" />{[[x + 14, y + h + 2], [x + w - 22, y + h + 2], [x + 14, y - 10], [x + w - 22, y - 10]].map(([a, b], i) => <circle key={i} cx={a + 4} cy={b + 4} r={5} fill={INK} stroke="none" />)}</g>;
    case 'shw': return <g {...base}><rect x={x} y={y} width={w} height={h} /><line x1={x} y1={y} x2={x + w} y2={y + h} /><line x1={x + w} y1={y} x2={x} y2={y + h} /><circle cx={x + w / 2} cy={y + h / 2} r={6} fill={PAPER} /></g>;
    case 'wc': return <g {...base}><rect x={x} y={y} width={w} height={h * .3} rx={3} /><ellipse cx={x + w / 2} cy={y + h * .3 + h * .35} rx={w / 2 - 2} ry={h * .35} /></g>;
    case 'bas': return <g {...base}><rect x={x} y={y} width={w} height={h} rx={4} /><ellipse cx={x + w / 2} cy={y + h / 2 + 2} rx={w / 2 - 9} ry={h / 2 - 8} fill="none" /></g>;
    case 'shelf': { const vert = h > w; const L = vert ? h : w; return <g {...base}><rect x={x} y={y} width={w} height={h} />{Array.from({ length: Math.floor(L / 30) }, (_, i) => vert ? <line key={i} x1={x} x2={x + w} y1={y + 15 + i * 30} y2={y + 15 + i * 30} strokeWidth={1} /> : <line key={i} y1={y} y2={y + h} x1={x + 15 + i * 30} x2={x + 15 + i * 30} strokeWidth={1} />)}</g>; }
    case 'tt': return <g {...base}><rect x={x} y={y} width={w} height={h} rx={3} /><circle cx={x + Math.min(w, h) / 2 + 4} cy={y + h / 2} r={Math.min(w, h) / 2 - 6} fill="none" /><circle cx={x + Math.min(w, h) / 2 + 4} cy={y + h / 2} r={2.5} fill={li} stroke="none" /><line x1={x + w - 12} y1={y + 8} x2={x + w - 22} y2={y + h - 14} stroke={li} /></g>;
    case 'spk': return <g {...base}><rect x={x} y={y} width={w} height={h} rx={3} /><circle cx={x + w / 2} cy={y + h / 2} r={w / 2 - 7} fill="none" /></g>;
    case 'desk': return <g {...base}><rect x={x} y={y} width={w} height={h} /><rect x={x + w + 6} y={y + h / 2 - 19} width={38} height={38} rx={6} /></g>;
    case 'plant': return <g {...base}><circle cx={x + w / 2} cy={y + h / 2} r={w / 2} />{[0, 60, 120].map(a => <line key={a} x1={x + w / 2 + Math.cos(a * Math.PI / 180) * w / 2} y1={y + h / 2 + Math.sin(a * Math.PI / 180) * w / 2} x2={x + w / 2 - Math.cos(a * Math.PI / 180) * w / 2} y2={y + h / 2 - Math.sin(a * Math.PI / 180) * w / 2} strokeWidth={1} />)}</g>;
    case 'stairs': { const n = Math.floor(h / 25); return <g {...base}><rect x={x} y={y} width={w} height={h} />{Array.from({ length: n - 1 }, (_, i) => <line key={i} x1={x} x2={x + w} y1={y + (i + 1) * 25} y2={y + (i + 1) * 25} strokeWidth={1.2} />)}<line x1={x + w / 2} x2={x + w / 2} y1={y + h - 12} y2={y + 18} /><path d={`M${x + w / 2 - 10} ${y + 32} L${x + w / 2} ${y + 14} L${x + w / 2 + 10} ${y + 32}`} fill="none" /></g>; }
    case 'bar': { const n = it.n ?? 6; return <g {...base}>{Array.from({ length: n }, (_, i) => <circle key={i} cx={x + (i + .5) * w / n} cy={y - 26} r={17} fill={PAPER} />)}<rect x={x} y={y} width={w} height={h} rx={4} /><line x1={x + 10} x2={x + w - 10} y1={y + h - 14} y2={y + h - 14} stroke={li} strokeWidth={1.2} /></g>; }
  }
}

function DoorG({ d }: { d: Door }) {
  const L = d.len ?? 80, s = d.s;
  if (d.ax === 'h') {
    return <g><rect x={d.x} y={d.y - T / 2 - 1} width={L} height={T + 2} fill={PAPER} /><line x1={d.x} y1={d.y} x2={d.x} y2={d.y + s * L} stroke={INK} strokeWidth={3} /><path d={`M${d.x + L} ${d.y} A${L} ${L} 0 0 ${s > 0 ? 1 : 0} ${d.x} ${d.y + s * L}`} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="4 4" /></g>;
  }
  return <g><rect x={d.x - T / 2 - 1} y={d.y} width={T + 2} height={L} fill={PAPER} /><line x1={d.x} y1={d.y} x2={d.x + s * L} y2={d.y} stroke={INK} strokeWidth={3} /><path d={`M${d.x} ${d.y + L} A${L} ${L} 0 0 ${s > 0 ? 0 : 1} ${d.x + s * L} ${d.y}`} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="4 4" /></g>;
}

const lab = { fontFamily: 'League Spartan Variable, system-ui, sans-serif', fontWeight: 700, letterSpacing: 1.2 } as const;

export default function FloorPlan({ id, hex, ink }: { id: string; hex: string; ink: string }) {
  const p = P[id]; if (!p) return null;
  const top = p.terrace ? p.terrace.h : 0, pad = 70;
  const vb = `${-pad} ${-top - pad} ${p.W + pad * 2} ${p.H + top + pad * 2 + 30}`;
  const total = p.rooms.reduce((a, r) => a + r.w * r.h, 0) / 1e4;
  const sigTxt = hex === INK ? INK : hex;
  return (
    <svg viewBox={vb} role="img" aria-label={`Rzut loftu ${id}, ${Math.round(total)} m², skala 1:100`} className="fplan">
      <defs>
        <pattern id={`hatch${id}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="16" stroke={INK} strokeWidth="1" opacity=".35" /></pattern>
      </defs>
      {p.terrace && <g>
        <rect x={0} y={-p.terrace.h} width={p.W} height={p.terrace.h} fill={`url(#hatch${id})`} stroke={INK} strokeWidth={3} />
        <rect x={p.W / 2 - 110} y={-p.terrace.h / 2 - 26} width={220} height={52} fill={PAPER} />
        <text x={p.W / 2} y={-p.terrace.h / 2 + 8} textAnchor="middle" fontSize={22} {...lab}>TARAS · {Math.round(p.W * p.terrace.h / 1e4)} M²</text>
        {p.terrace.items.map((it, i) => <Thing key={i} it={it} hex={hex} ink={ink} />)}
      </g>}
      <rect x={0} y={0} width={p.W} height={p.H} fill={PAPER} />
      {p.beams?.map(bx => <line key={bx} x1={bx} x2={bx} y1={0} y2={p.H} stroke={hex} strokeWidth={14} strokeDasharray="40 10 6 10" opacity={.85} />)}
      {p.items.map((it, i) => <Thing key={i} it={it} hex={hex} ink={ink} />)}
      {p.mezz && <g>
        <rect x={0} y={p.mezz.y0} width={p.W} height={p.mezz.y1 - p.mezz.y0} fill="none" stroke={INK} strokeWidth={2.5} strokeDasharray="14 8" />
        <text x={p.W - 20} y={p.mezz.y1 - 14} textAnchor="end" fontSize={17} {...lab} fill={INK}>ANTRESOLA · 2,1 M NAD PODŁOGĄ</text>
        {p.mezz.items.map((it, i) => <Thing key={i} it={it} hex={hex} ink={ink} />)}
      </g>}
      {p.walls.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={INK} strokeWidth={TI} strokeLinecap="square" />)}
      <rect x={0} y={0} width={p.W} height={p.H} fill="none" stroke={INK} strokeWidth={T} />
      {p.win.map(([a, b], i) => <g key={i}><rect x={a} y={-T / 2} width={b - a} height={T} fill={PAPER} /><line x1={a} x2={b} y1={-4} y2={-4} stroke={INK} strokeWidth={1.5} /><line x1={a} x2={b} y1={4} y2={4} stroke={INK} strokeWidth={1.5} /><line x1={a} x2={a} y1={-T / 2} y2={T / 2} stroke={INK} strokeWidth={2} /><line x1={b} x2={b} y1={-T / 2} y2={T / 2} stroke={INK} strokeWidth={2} /></g>)}
      {p.doors.map((d, i) => <DoorG key={i} d={d} />)}
      {p.doors.filter(d => d.entry).map((d, i) => <g key={i}><path d={`M${d.x + (d.len ?? 80) / 2} ${p.H + 60} l0 -34 m-9 12 l9 -12 l9 12`} fill="none" stroke={INK} strokeWidth={2.5} /><text x={d.x + (d.len ?? 80) / 2 + 16} y={p.H + 56} fontSize={15} {...lab}>WEJŚCIE Z KORYTARZA</text></g>)}
      {p.rooms.map(r => <g key={r.name}><text x={r.lx} y={r.ly} textAnchor="middle" fontSize={19} {...lab} fill={INK}>{r.name.toUpperCase()}</text>{!r.noArea && <text x={r.lx} y={r.ly + 22} textAnchor="middle" fontSize={16} fontFamily="Outfit Variable, system-ui, sans-serif" fill={INK} opacity={.7}>{(r.w * r.h / 1e4).toFixed(1).replace('.', ',')} m²</text>}</g>)}
      <text x={p.sigLabel[1]} y={p.sigLabel[2]} fontSize={17} {...lab} fill={sigTxt} style={{ fontStyle: 'italic' }}>● {p.sigLabel[0].toUpperCase()}</text>
      {/* street side */}
      <text x={p.W / 2} y={-T / 2 - (p.terrace ? p.terrace.h + 14 : 14)} textAnchor="middle" fontSize={14} {...lab} fill={INK} opacity={.6}>{p.terrace ? 'WIDOK NA KOMINY' : 'OKNA'}</text>
      {/* dimensions */}
      <g stroke={INK} strokeWidth={1.2} fill="none"><line x1={0} x2={p.W} y1={p.H + 34} y2={p.H + 34} opacity={.0} /></g>
      <g stroke={INK} strokeWidth={1.2}>
        <line x1={p.W + 36} x2={p.W + 36} y1={0} y2={p.H} /><line x1={p.W + 28} x2={p.W + 44} y1={0} y2={0} /><line x1={p.W + 28} x2={p.W + 44} y1={p.H} y2={p.H} />
      </g>
      <text x={p.W + 54} y={p.H / 2} fontSize={16} {...lab} transform={`rotate(90 ${p.W + 54} ${p.H / 2})`} textAnchor="middle">{(p.H / 100).toFixed(2).replace('.', ',')} M</text>
      <g stroke={INK} strokeWidth={1.2}>
        <line x1={0} x2={p.W} y1={-T / 2 - (p.terrace ? p.terrace.h : 0) - 34} y2={-T / 2 - (p.terrace ? p.terrace.h : 0) - 34} />
      </g>
      <text x={p.W - 4} y={-T / 2 - (p.terrace ? p.terrace.h : 0) - 42} fontSize={16} {...lab} textAnchor="end">{(p.W / 100).toFixed(2).replace('.', ',')} M</text>
      {/* scale bar + north */}
      <g transform={`translate(0 ${p.H + 90})`}>
        {[0, 1, 2].map(i => <rect key={i} x={i * 100} y={0} width={100} height={10} fill={i % 2 ? PAPER : INK} stroke={INK} strokeWidth={1.2} />)}
        {[0, 1, 2, 3].map(i => <text key={i} x={i * 100} y={-6} fontSize={13} {...lab} textAnchor="middle">{i}</text>)}
        <text x={330} y={10} fontSize={13} {...lab}>M · SKALA 1:100 · RAZEM {total.toFixed(0)} M²</text>
      </g>
      <g transform={`translate(${p.W - 20} ${p.H + 88})`}><circle r={16} fill="none" stroke={INK} strokeWidth={1.5} /><path d="M0 -14 L7 8 L0 3 L-7 8 Z" fill={INK} /><text y={-22} textAnchor="middle" fontSize={13} {...lab}>N</text></g>
    </svg>
  );
}
