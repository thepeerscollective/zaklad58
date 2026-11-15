import type { Metadata } from 'next';
import { Img } from '@/components/ui';

export const metadata: Metadata = { title: 'Okolica' };
const A: [string, string, string, string][] = [
  ['A1', 'Bar Radiowa 58', 'koktajle i winyle', '0 min · parter'], ['A2', 'Palarnia Fabryczna', 'kawa, którą masz w lofcie', '2 min'], ['A3', 'Hala Targowa', 'sobotnie antyki i kiełbaski z budki', '6 min'],
  ['A4', 'Bulwary Wisły', 'spacer, rower, zachód słońca', '8 min'], ['A5', 'Teatr Pod Zegarem', 'wieczór, na który warto się ubrać', '9 min'], ['A6', 'Bunkier Sztuki', 'plus Planty i Rynek', '10 min tramwajem'],
];
const B: [string, string, string, string][] = [
  ['B1 · 15 min · tramwaj 1', 'Kazimierz', 'zapiekanki na Nowym, synagogi, bary', 'o1'], ['B2 · 20 min · tramwaj 4', 'Nowa Huta', 'socrealizm, Plac Centralny, mleczne bary', 'o2'],
  ['B3 · 12 min pieszo przez kładkę', 'Zabłocie', 'MOCAK, fabryka Schindlera, kawiarnie', 'o3'], ['B4 · 25 min', 'Kopiec Krakusa', 'widok na całe miasto, idealny o świcie', 'o4'],
];

export default function Area() {
  return (
    <>
      <section style={{ minHeight: 'calc(100svh - var(--nav))', display: 'flex', alignItems: 'center', padding: 'clamp(20px,4vh,48px) 0' }}>
        <div className="wrap sides" style={{ width: '100%' }}>
          <div>
            <span className="lb o">Okolica · Grzegórzki</span>
            <h1 className="h2" style={{ margin: '8px 0 12px' }}>Strona A: <em>Grzegórzki.</em></h1>
            <p className="muted" style={{ maxWidth: 520, marginBottom: 'clamp(12px,2.4vh,24px)' }}>Okolica podana jak płyta: strona A to to, co w zasięgu spaceru, strona B to wycieczki tramwajem. Każde miejsce sprawdzone przez nas osobiście.</p>
            <ol className="tracks">{A.map(([n, t, d, m]) => <li key={n}><span className="lb o">{n}</span><span><b>{t}</b><span className="muted" style={{ display: 'block', fontSize: 14 }}>{d}</span></span><span className="lb" style={{ fontSize: 10 }}>{m}</span></li>)}</ol>
          </div>
          <div className="vinyl" aria-hidden title="Najedź, żeby zakręcić"><div className="lab"><b>ZAKŁAD 58<br /><span style={{ fontWeight: 500, fontSize: '.8em' }}>strona A · spacerem</span></b></div></div>
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="head"><div><span className="lb o">Strona B · tramwajem</span><h2>Dalej, ale warto.</h2></div></div>
          <div className="bside">{B.map(([m, t, d, n], i) => <div className="bcard" key={t}><Img n={n} alt={t} front={['var(--teal)', 'var(--brick)', 'var(--mustard)', 'var(--olive)'][i]} /><div className="t"><span className="lb o" style={{ fontSize: 10 }}>{m}</span><h3>{t}</h3><p className="muted" style={{ fontSize: 15 }}>{d}</p></div></div>)}</div>
        </div>
      </section>
    </>
  );
}
