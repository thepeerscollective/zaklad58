import type { Metadata } from 'next';
import { href, PHONE, WA, MAIL } from '@/lib/base';
import { Img } from '@/components/ui';

export const metadata: Metadata = { title: 'Kontakt i FAQ' };
const STEPS: [string, string][] = [['Dzień przed przyjazdem', 'dostajesz SMS z kodem do bramy i numerem skrytki'], ['Brama od Fabrycznej', 'kod z SMS, potem w prawo, czerwone drzwi z numerem 58'], ['Skrytka z brelokiem', 'Twój brelok czeka w skrytce w kolorze loftu'], ['Drzwi loftu', 'brelok otwiera drzwi, kod z breloka otwiera skrzynkę z płytami']];
const FAQ: [string, string][] = [
  ['Czy mogę przyjechać z psem?', 'Tak, do loftów 01, 03, 04 i 06. Pies nie dopłaca, dostaje miskę i smaczki.'], ['Czy płyty można słuchać głośno?', 'Do 22:00 tak. Po 22:00 są słuchawki, a w barze na dole muzyka gra do 1:00.'],
  ['Czy jest parking?', 'Tak, 6 miejsc w podwórzu fabryki, 40 zł za dobę. Rezerwuj razem z loftem.'], ['Co jeśli się spóźnię?', 'Nic, check-in jest bezobsługowy. Kod działa do 3:00 w nocy.'],
  ['Czy meble są prawdziwe vintage?', 'Tak, każdy ma metryczkę: rok, kraj, historia. Prosimy, nie siadaj na stole Ład.'],
];

export default function Contact() {
  return (
    <>
      <section style={{ minHeight: 'calc(100svh - var(--nav))', display: 'flex', alignItems: 'center', padding: 'clamp(20px,4vh,48px) 0' }}>
        <div className="wrap" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(20px,3vw,48px)', alignItems: 'center' }}>
          <div>
            <span className="lb o">Kontakt</span>
            <h1 className="h2" style={{ margin: '8px 0 14px' }}>Recepcji nie ma.<br /><em>Jest Ola.</em></h1>
            <p className="lead">Odbiera telefon od 8 do 22, odpisuje na WhatsAppie w kwadrans i wie, gdzie jest najlepsza zapiekanka na Kazimierzu.</p>
            <div className="contacts" style={{ marginTop: 'clamp(16px,3vh,32px)', gridTemplateColumns: '1fr 1fr' }}>
              <div><span className="lb" style={{ fontSize: 10 }}>Telefon</span><b><a href="tel:+48123333333">{PHONE}</a></b><span className="muted" style={{ fontSize: 13 }}>8:00–22:00</span></div>
              <div><span className="lb" style={{ fontSize: 10 }}>WhatsApp</span><b><a href="https://wa.me/48600058058">{WA}</a></b><span className="muted" style={{ fontSize: 13 }}>odpowiedź w 15 min</span></div>
              <div><span className="lb" style={{ fontSize: 10 }}>E-mail</span><b><a href={`mailto:${MAIL}`}>{MAIL}</a></b><span className="muted" style={{ fontSize: 13 }}>do 24 h</span></div>
              <div><span className="lb" style={{ fontSize: 10 }}>Adres</span><b>ul. Fabryczna 58</b><span className="muted" style={{ fontSize: 13 }}>Kraków Grzegórzki</span></div>
            </div>
          </div>
          <Img n="z30" alt="Gospodyni Ola w drzwiach loftu, z brelokiem w dłoni" front="var(--orange)" eager style={{ height: 'clamp(260px,64vh,620px)' }} />
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="head"><div><span className="lb o">Self check-in</span><h2>Jak wejść do szuflady.</h2></div></div>
          <div className="steps4">{STEPS.map(([t, d], i) => <div key={t}><span className="n">{i + 1}</span><h3>{t}</h3><p className="muted" style={{ fontSize: 15 }}>{d}</p></div>)}</div>
        </div>
      </section>
      <section className="sec" id="faq">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.6fr)', gap: 'clamp(20px,3vw,48px)' }}>
          <div><span className="lb o">Pytania</span><h2 style={{ marginTop: 8 }}>Najczęściej otwierane szuflady.</h2><a className="btn b-or" style={{ marginTop: 22 }} href={href('/rezerwacja/')}>Zarezerwuj</a></div>
          <div>{FAQ.map(([q, a], i) => <details className="q" key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>
    </>
  );
}
