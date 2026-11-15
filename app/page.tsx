import { href } from '@/lib/base';
import { LOFTS } from '@/lib/data';
import { Img, Sun, Tag, XBrace } from '@/components/ui';
import HeroBook from '@/components/HeroBook';
import Corridor from '@/components/Corridor';
import Radio from '@/components/Radio';

const MARQ = ['Self check-in z brelokiem', 'Meble z lat 50. i 60.', 'Gramofon w każdym lofcie', 'Bar Radiowa 58 na parterze', '10 min od Rynku', 'Psy mile widziane'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="esu">
            <div className="panel p-cream h-main">
              <span className="lb o">Zakład 58 · lofty w dawnej fabryce radia</span>
              <h1>Sześć loftów,<br />każdy z innej<br /><em>szuflady.</em></h1>
              <p className="lead">Fabryka radioodbiorników z 1958, urządzona jak regał Eamesa. Każdy loft ma swój kolor, swój mebel z epoki i swój brelok do klucza.</p>
            </div>
            <div className="panel p-or h-no"><div className="no"><em>No</em><b>6</b></div><span className="lb" style={{ alignSelf: 'end' }}>loftów</span></div>
            <Img n="z01" alt="Loft 03: regał w stylu Eamesa, gramofon i płyty" front="var(--teal)" className="h-photo" eager />
            <div className="p-mu h-sun"><Sun /></div>
            <HeroBook />
            <div className="h-price"><div className="teal"><XBrace /><p>od 380 zł<br /><span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>za noc, dwie osoby</span></p></div><Img n="z02" alt="Wanna na lwich łapach w lofcie 02" front="var(--mustard)" eager /></div>
          </div>
          <div className="legs" aria-hidden><i /><i /></div>
        </div>
      </section>

      <div className="marq" aria-hidden><div>{[...MARQ, ...MARQ].map((m, i) => <span key={i}>{m}  ✺</span>)}</div></div>

      <section className="sec dark" id="drzwi">
        <div className="wrap">
          <Corridor><div><span className="lb o">Korytarz, piętro 2</span><h2>Wybierz drzwi.</h2><p className="muted" style={{ marginTop: 8 }}>Najedź na drzwi, żeby zajrzeć do środka.</p></div></Corridor>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head"><div><span className="lb o">Klucze</span><h2>Każdy loft ma swój brelok.</h2></div><p className="muted" style={{ maxWidth: 440 }}>Zamiast pokoju „standard” i „deluxe” masz sześć mieszkań, każde z innym charakterem i innym meblem z epoki.</p></div>
          <div className="keys">{LOFTS.map(l => (
            <a className="key" key={l.id} href={href(`/lofty/${l.id}/`)}>
              <div className="tx">
                <div className="top"><Tag n={l.id} c={l.hex} dark={l.ink === '#151311'} /><div><span className="lb" style={{ fontSize: 10, color: 'var(--grey)' }}>{l.color}</span><h3>{l.title}</h3></div></div>
                <p className="muted" style={{ fontSize: 14 }}>{l.m2} m² · {l.guests} os.</p>
                <div className="kfoot"><b>od {l.price} zł / noc</b><span className="lb" style={{ fontSize: 10 }}>Zobacz →</span></div>
              </div>
              <Img n={l.img} alt={l.title} front={l.hex} />
            </a>
          ))}</div>
        </div>
      </section>

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
        <div className="wrap">
          <div className="head"><div><span className="lb o">Goście</span><h2>Kto spał w której szufladzie.</h2></div></div>
          <div className="revs">{LOFTS.filter(l => l.review).map(l => (
            <figure className="rev" key={l.id}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Tag n={l.id} c={l.hex} /><span className="stars">★★★★★</span></div><q>{l.review![0]}</q><figcaption style={{ fontWeight: 500, fontSize: 14, marginTop: 'auto' }}>{l.review![1]}</figcaption></figure>
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
