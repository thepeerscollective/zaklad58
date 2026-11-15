import type { Metadata } from 'next';
import { href } from '@/lib/base';
import { Img } from '@/components/ui';

export const metadata: Metadata = { title: 'Fabryka' };
const TL: [string, string, string, string][] = [
  ['1958', 'Otwarcie zakładu', 'pierwszy odbiornik Taraban 58 zjeżdża z taśmy', 'z10'], ['1962', 'Rekord', '42 000 radioodbiorników w jednym roku', 'z11'],
  ['1976', 'Kolumny Tonsil', 'hala B produkuje kolumny głośnikowe', 'z12'], ['1998', 'Ostatnia zmiana', 'zakład zamknięty, hala stoi pusta', 'z13'],
  ['2022', 'Remont', 'odzyskujemy cegłę, okna i suwnicę', 'z14'], ['2025', 'Zakład 58', 'sześć loftów i bar Radiowa 58', 'z15'],
];
const KEPT: [string, string, string][] = [
  ['Cegła', '68 000 cegieł oczyszczonych ręcznie. W loftach widać numery partii wybite w 1957.', 'z20'], ['Stalowe okna', '34 okna z oryginalnymi ramami, nowe szyby zespolone, stare klamki.', 'z21'],
  ['Suwnica', '8-tonowa suwnica pod sufitem korytarza. Nie działa, ale świeci.', 'z22'], ['Płytki', 'Lastryko w klatce schodowej z 1958, sklejane kawałek po kawałku.', 'z23'],
];

export default function Factory() {
  return (
    <>
      <section className="fact" style={{ minHeight: 'calc(100svh - var(--nav))', display: 'flex', alignItems: 'center', padding: 'clamp(20px,4vh,48px) 0' }}>
        <div className="wrap grid" style={{ width: '100%' }}>
          <div>
            <p className="big58">1958</p>
            <h1 className="h2" style={{ margin: 'clamp(10px,2vh,20px) 0 14px' }}>Tu produkowano radia.</h1>
            <p className="lead">Zakłady Radiowe „Taraban”, hala B. 40 lat produkcji, 1,2 miliona odbiorników, potem 20 lat ciszy. W 2022 zaczęliśmy remont.</p>
            <a className="btn b-mu" style={{ marginTop: 22 }} href={href('/lofty/')}>Zobacz, co z tego wyszło</a>
          </div>
          <Img n="z06" alt="Hala fabryki radia w 1962, robotnice przy taśmie" front="var(--mustard)" eager style={{ height: 'clamp(240px,62vh,620px)' }} />
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="head"><div><span className="lb o">Oś czasu</span><h2>Od lampy do loftu.</h2></div><p className="muted">Najedź na zdjęcie, żeby wróciły kolory.</p></div>
          <div className="tl">{TL.map(([y, t, d, n]) => <div key={y}><p className="yr">{y}</p><h3 style={{ margin: '6px 0 2px' }}>{t}</h3><p className="muted" style={{ fontSize: 14, minHeight: 44 }}>{d}</p><Img n={n} alt={`Archiwum ${y}: ${t}`} front="var(--walnut)" style={{ marginTop: 10 }} /></div>)}</div>
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="head"><div><span className="lb o">Co zostawiliśmy</span><h2>Nic nie wyrzucaliśmy bez powodu.</h2></div></div>
          <div className="four">{KEPT.map(([t, d, n], i) => <div key={t}><Img n={n} alt={`${t} z bliska`} front={['var(--brick)', 'var(--teal)', 'var(--mustard)', 'var(--olive)'][i]} /><h3 style={{ margin: '12px 0 4px' }}>{t}</h3><p className="muted" style={{ fontSize: 15 }}>{d}</p></div>)}</div>
        </div>
      </section>
    </>
  );
}
