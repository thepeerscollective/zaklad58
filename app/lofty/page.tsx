import type { Metadata } from 'next';
import { LOFTS } from '@/lib/data';
import LoftGrid from '@/components/LoftGrid';
import { Tag } from '@/components/ui';

export const metadata: Metadata = { title: 'Lofty' };

const ROWS: [string, (l: (typeof LOFTS)[number]) => React.ReactNode][] = [
  ['Metraż', l => `${l.m2} m²`], ['Goście', l => l.guests], ['Mebel z epoki', l => l.piece], ['Kuchnia', l => l.kitchen], ['Pies', l => l.dog ? 'tak' : 'nie'], ['Cena od', l => `${l.price} zł`],
];

export default function Lofts() {
  return (
    <>
      <section className="sec" style={{ paddingBottom: 'clamp(16px,3vh,32px)' }}>
        <div className="wrap head"><div><span className="lb o">Lofty · 6 szuflad</span><h1 className="h2">Wszystkie szuflady <em>naraz.</em></h1></div><p className="muted" style={{ maxWidth: 440 }}>Porównaj lofty jak moduły regału: ile metrów, ile osób, jaki mebel z epoki. Filtruj po tym, co dla Ciebie ważne.</p></div>
      </section>
      <section style={{ paddingBottom: 'var(--secpad)' }}><div className="wrap"><LoftGrid /></div></section>
      <section className="sec" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="head"><div><span className="lb o">Porównaj</span><h2>Szuflady obok siebie.</h2></div></div>
          <div style={{ overflowX: 'auto' }}>
            <table className="cmp">
              <thead><tr><th scope="col"><span className="sr">Cecha</span></th>{LOFTS.map(l => <th key={l.id} scope="col"><Tag n={l.id} c={l.hex} dark={l.ink === '#151311'} /></th>)}</tr></thead>
              <tbody>{ROWS.map(([k, fn]) => <tr key={k}><td>{k}</td>{LOFTS.map(l => <td key={l.id} className={k === 'Mebel z epoki' || k === 'Kuchnia' || k === 'Pies' ? '' : 'v'}>{fn(l)}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
