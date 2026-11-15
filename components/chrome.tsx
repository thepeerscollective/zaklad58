'use client';
import Lang from '@/components/Lang';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { href, ADDRESS, PHONE, MAIL } from '@/lib/base';
import { Sun } from './ui';

const NAV: [string, string][] = [['Lofty', '/lofty/'], ['Fabryka', '/fabryka/'], ['Okolica', '/okolica/'], ['Bar Radiowa', '/#bar'], ['Kontakt', '/kontakt/']];

function usePath() {
  const p = usePathname() || '/';
  const base = process.env.NEXT_PUBLIC_BASE ?? '';
  const s = p.startsWith(base) ? p.slice(base.length) || '/' : p;
  return s.endsWith('/') ? s : s + '/';
}

export function Header() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <header className={`nav${open ? ' open' : ''}`}>
      <div className="wrap">
        <a className="logo" href={href('/')} aria-label="Zakład 58, strona główna"><Sun color="var(--orange)" rays={16} /><b>ZAKŁAD 58</b></a>
        <nav aria-label="Główna"><ul>{NAV.map(([l, h]) => <li key={h}><a href={href(h)} aria-current={h !== '/#bar' && path.startsWith(h) ? 'page' : undefined}>{l}</a></li>)}</ul></nav>
        <Lang />
        <a className="btn b-or" href={href('/rezerwacja/')}>Zarezerwuj</a>
        <button className="burger" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Zamknij' : 'Menu'}</button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo"><Sun color="var(--mustard)" rays={16} /><b style={{ fontSize: 30 }}>ZAKŁAD 58</b></div>
            <p style={{ marginTop: 12 }}><em>Sześć loftów, każdy z innej szuflady.</em></p>
            <p style={{ marginTop: 20, lineHeight: 1.8 }}>{ADDRESS}<br />self check-in 15:00 · check-out 11:00<br />{PHONE} · {MAIL}</p>
          </div>
          <ul><li><a href={href('/lofty/')}>Lofty</a></li><li><a href={href('/fabryka/')}>Fabryka</a></li><li><a href={href('/okolica/')}>Okolica</a></li></ul>
          <ul><li><a href={href('/#bar')}>Bar Radiowa 58</a></li><li><a href={href('/kontakt/')}>Kontakt</a></li><li><a href={href('/kontakt/#faq')}>FAQ</a></li></ul>
          <ul><li><a href={href('/rezerwacja/')}>Rezerwacja</a></li><li><a href="https://www.instagram.com/" rel="noopener">Instagram</a></li><li><a href={href('/#radio')}>Radio Taraban</a></li></ul>
        </div>
        <small>Projekt koncepcyjny · wnętrza: pracownia Moduł · meble z lat 50. i 60. zebrane z całej Europy</small>
      </div>
    </footer>
  );
}

export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .25 });
    document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
