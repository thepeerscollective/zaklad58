import { href } from '@/lib/base';
import { LOFTS } from '@/lib/data';
import { Img, Sun } from '@/components/ui';
import HeroBook from '@/components/HeroBook';
import Radio from '@/components/Radio';

const MARQ = ['Self check-in z brelokiem', 'Meble z lat 50. i 60.', 'Gramofon w każdym lofcie', 'Bar Radiowa 58 na parterze', '10 min od Rynku', 'Psy mile widziane'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="esu cab">
            <div className="panel p-cream h-main">
              <span className="lb o">Zakład 58 · lofty w dawnej fabryce radia</span>
              <h1>Sześć loftów,<br />każdy z innej<br /><em>szuflady.</em></h1>
              <p className="lead">Regał to budynek, szuflada to mieszkanie. Każda ma swój kolor i mebel z epoki. Otwórz którąś.</p>
            </div>
            {LOFTS.map(l => (
              <a key={l.id} className="hdr" href={href(`/lofty/${l.id}/`)} style={{ ['--c' as string]: l.hex, ['--k' as string]: l.ink } as React.CSSProperties} aria-label={`Loft ${l.id}, ${l.title}, od ${l.price} zł za noc`}>
                <Img n={l.img} alt="" eager />
                <span className="front">
                  <span className="dn">{l.id}</span>
                  <span className="handle" aria-hidden />
                  <span className="dm"><b>{l.name}</b><small>{l.m2} m² · {l.guests} os. · od {l.price} zł</small></span>
                </span>
                <span className="peek" aria-hidden>{l.title} →</span>
              </a>
            ))}
            <HeroBook />
          </div>
          <div className="legs" aria-hidden><i /><i /></div>
        </div>
      </section>

      <div className="marq" aria-hidden><div>{[...MARQ, ...MARQ].map((m, i) => <span key={i}>{m}  ✺</span>)}</div></div>

      <section className="sec fact">
        <div className="wrap grid">
          <div><p className="big58">1958</p><Img n="z04" alt="Archiwalne zdjęcie hali fabryki radia, lata 60." front="var(--mustard)" style={{ height: 'clamp(140px,28vh,300px)', marginTop: 'clamp(12px,2.4vh,24px)', filter: 'grayscale(1)' }} /></div>
          <div>
            <span className="lb" style={{ color: 'var(--mustard)' }}>Fabryka</span>
            <h2 style={{ margin: '8px 0 14px' }}>Tu produkowano radia.</h2>
            <p className="lead">Przez 40 lat z hali przy Fabrycznej wyjeżdżały odbiorniki „Taraban”. Dziś słuchasz radia w każdym lofcie. Zostawiliśmy cegłę, stal i oryginalne płytki w klatce schodowej.</p>
            <ul className="dots">{[['Oryginalna cegła i stalowe okna', 'var(--orange)'], ['Meble vintage, każdy z metryczką', 'var(--mustard)'], ['Kuchnia, ekspres, lokalna kawa', 'var(--teal)'], ['Self check-in kodem z breloka', 'var(--sand)']].map(([t, c]) => <li key={t} style={{ ['--c' as string]: c } as React.CSSProperties}><i />{t}</li>)}</ul>
            <a className="btn b-mu" href={href('/fabryka/')}>Historia fabryki</a>
          </div>
        </div>
      </section>

      <section className="sec" id="radio">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,2fr)', gap: 'clamp(20px,3vw,48px)', alignItems: 'center' }}>
          <div>
            <span className="lb o">Radio Taraban 58 · stroisz radio, zmieniasz loft</span>
            <h2 style={{ margin: '8px 0 14px' }}>Złap stację <em>swojego loftu.</em></h2>
            <p className="lead">Fabryka robiła radia, więc lofty wybierasz pokrętłem. Każda stacja to inne mieszkanie i płyta, która właśnie leci na jego gramofonie.</p>
            <p className="lb" style={{ fontSize: 10, marginTop: 16, color: 'var(--grey)', lineHeight: 1.6 }}>Kręć pokrętłem, przeciągnij wskazówkę albo użyj strzałek. Dźwięk włącza się dopiero, gdy go włączysz.</p>
          </div>
          <Radio />
        </div>
      </section>

      <section className="sec dark bar" id="bar">
        <div className="wrap grid">
          <div>
            <span className="lb" style={{ color: 'var(--mustard)' }}>Na parterze</span>
            <h2 style={{ margin: '8px 0 14px' }}>Bar Radiowa 58.</h2>
            <p className="lead">Listening bar w dawnej hali montażowej. Koktajle jak płyty na półce, wieczorem jazz z winyli. Goście loftów mają stolik bez rezerwacji i 10% na wszystko.</p>
            <a className="btn b-mu" style={{ marginTop: 22 }} href={href("/rezerwacja/")}>Stolik w pakiecie z loftem</a>
          </div>
          <Img n="z05" alt="Wnętrze listening baru: półki z winylami, ciepłe światło" front="var(--orange)" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap gbook-wrap">
          <div><span className="lb o">Księga gości</span><h2>Kto spał w której <em>szufladzie.</em></h2><p className="muted" style={{ marginTop: 12, maxWidth: 360 }}>W każdym lofcie leży zeszyt. Przepisujemy z niego po jednym wpisie, z pisownią gości.</p></div>
          <div className="gbook">{LOFTS.filter(l => l.review).map((l, i) => (
            <figure key={l.id} className="gpage" style={{ ['--c' as string]: l.hex } as React.CSSProperties}>
              <span className="gtab">loft {l.id} · {l.name.toLowerCase()}</span>
              <blockquote>{l.review![0]}</blockquote>
              <figcaption>{l.review![1]}<span>{['marzec', 'wrzesień', 'październik'][i % 3]} 2026</span></figcaption>
            </figure>
          ))}</div>
        </div>
      </section>

      <section className="sec cta">
        <Sun color="var(--mustard)" className="sun" rays={28} />
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(44px,min(6.4vw,11vh),96px)' }}>Wybierz szufladę<br /><em>na weekend.</em></h2>
          <p className="lead" style={{ margin: '16px 0 26px' }}>Rezerwując bezpośrednio, płacisz o 12% mniej niż przez portale i dostajesz playlistę dobraną do loftu.</p>
          <a className="btn b-bk" href={href('/rezerwacja/')}>Zarezerwuj</a>
        </div>
      </section>
    </>
  );
}
