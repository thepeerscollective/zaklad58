import type { Metadata } from 'next';
import { href } from '@/lib/base';
import { LOFTS, loft } from '@/lib/data';
import { Img, Tag } from '@/components/ui';
import Drawers from '@/components/Drawers';
import FloorPlan from '@/components/FloorPlan';

export function generateStaticParams() { return LOFTS.map(l => ({ id: l.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const l = loft(id); return { title: `Loft ${l.id} · ${l.title}`, description: l.desc };
}

export default async function Loft({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const l = loft(id);
  const others = LOFTS.filter(o => o.id !== l.id);
  const g = [...l.gallery, ...others.map(o => o.img)].slice(0, 5);
  return (
    <>
      <section className="lhero">
        <div className="wrap">
          <div className="esu">
            <div className="panel info" style={{ background: l.hex, color: l.ink }}>
              <p className="lb" style={{ opacity: .85 }}><a href={href('/lofty/')}>Lofty</a>  /  No {l.id} · {l.color}</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}><span style={{ fontFamily: 'var(--label)', fontWeight: 800, fontSize: 'clamp(30px,6vh,52px)', lineHeight: 1 }}>{l.id}</span><h1>{l.title.split(' i ')[0]}{l.title.includes(' i ') ? <><br /><em style={{ color: 'inherit' }}>i {l.title.split(' i ').slice(1).join(' i ')}.</em></> : '.'}</h1></div>
              <p className="lead" style={{ opacity: .92 }}>{l.desc}</p>
              <div className="fx"><span><b>{l.m2} m²</b><small>metraż</small></span><span><b>{l.guests} os.</b><small>gości</small></span><span><b>{l.bedrooms}</b><small>{l.bedrooms === 1 ? 'sypialnia' : 'sypialnie'}</small></span><span><b>{l.dog ? 'tak' : 'nie'}</b><small>pies</small></span></div>
              <div className="mini"><span><span className="lb" style={{ fontSize: 10, display: 'block', opacity: .8 }}>Od</span><b>{l.price} zł / noc</b></span><a className="btn b-mu" href={href(`/rezerwacja/?loft=${l.id}`)} style={{ marginLeft: 'auto' }}>Rezerwuj</a></div>
            </div>
            <Img n={l.img} alt={l.title} front={l.hex} eager />
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 'clamp(20px,4vh,48px)' }}>
        <div className="wrap">
          <div className="head"><div><span className="lb o">Zdjęcia</span><h2>Zajrzyj do środka.</h2></div><p className="muted">Piętro {l.floor} · okna: {l.windows}</p></div>
          <div className="gal">{g.map((n, i) => <Img key={n + i} n={n} alt={i < l.gallery.length ? `${l.title}, zdjęcie ${i + 1}` : 'Inny loft w Zakładzie 58'} front={i % 2 ? 'var(--mustard)' : l.hex} />)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head"><div><span className="lb o">Co jest w szufladach</span><h2>Otwórz każdą.</h2></div><p className="muted" style={{ maxWidth: 380 }}>Najedź albo kliknij, żeby wysunąć szufladę.</p></div>
          <Drawers items={l.drawers} hex={l.hex} ink={l.ink} />
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--paper)' }}>
        <div className="wrap plan">
          <div><span className="lb o">Plan</span><h2 style={{ margin: '8px 0 14px' }}>Jak to jest ułożone.</h2><FloorPlan id={l.id} hex={l.hex} ink={l.ink} /></div>
          <dl><dt>Piętro</dt><dd>{l.floor}</dd><dt>Okna</dt><dd>{l.windows}</dd><dt>Check-in</dt><dd>15:00, kod z breloka</dd><dt>Check-out</dt><dd>11:00</dd><dt>Parking</dt><dd>w podwórzu, 40 zł / doba</dd><dt>Płyta</dt><dd>{l.artist} · {l.album}</dd></dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head"><div><span className="lb o">Inne szuflady</span><h2>Może ta?</h2></div></div>
          <div className="others">{others.map(o => (
            <a key={o.id} href={href(`/lofty/${o.id}/`)}><Img n={o.img} alt={o.title} front={o.hex} /><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Tag n={o.id} c={o.hex} dark={o.ink === '#151311'} /><span><b style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 18, display: 'block', lineHeight: 1.15 }}>{o.title}</b><span className="muted" style={{ fontSize: 13 }}>od {o.price} zł</span></span></div></a>
          ))}</div>
        </div>
      </section>
    </>
  );
}
