import { img } from '@/lib/base';

/** Photo behind a coloured drawer front that slides away when it scrolls in. */
export function Img({ n, alt, front, className = '', style, eager }: { n: string; alt: string; front?: string; className?: string; style?: React.CSSProperties; eager?: boolean }) {
  return <div className={`ph rv${eager ? ' in' : ''} ${className}`} style={{ ...(front ? { ['--front' as string]: front } : {}), ...style } as React.CSSProperties}><img src={img(n)} alt={alt} loading={eager ? 'eager' : 'lazy'} /></div>;
}

export function Sun({ color = 'var(--black)', rays = 24, className = '', style }: { color?: string; rays?: number; className?: string; style?: React.CSSProperties }) {
  const r = Array.from({ length: rays }, (_, i) => (i * 360) / rays);
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden>
      <circle r="16" fill={color} />
      {r.map(a => <line key={a} x1="0" y1={i(a) ? -26 : -30} x2="0" y2={i(a) ? -96 : -78} stroke={color} strokeWidth={i(a) ? 3 : 2} strokeLinecap="round" transform={`rotate(${a})`} />)}
      {r.filter((_, k) => k % 2 === 0).map(a => <circle key={'d' + a} cx="0" cy="-88" r="5" fill={color} transform={`rotate(${a + 7.5})`} />)}
    </svg>
  );
  function i(a: number) { return Math.round(a / (360 / rays)) % 2 === 0; }
}

export function XBrace() {
  return <svg className="xbrace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" /><line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" /></svg>;
}

export function Tag({ n, c, dark }: { n: string; c: string; dark?: boolean }) {
  return <span className="tag" style={{ ['--c' as string]: c, ['--ink2' as string]: dark ? 'var(--black)' : 'var(--paper)' } as React.CSSProperties}>{n}</span>;
}
