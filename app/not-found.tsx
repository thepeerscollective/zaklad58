import { href } from '@/lib/base';
import { Sun } from '@/components/ui';
export default function NotFound() {
  return (
    <section style={{ minHeight: 'calc(100svh - var(--nav))', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
      <div><Sun color="var(--orange)" style={{ width: 120, margin: '0 auto 20px' }} /><h1>Tej szuflady <em>nie ma.</em></h1><p className="lead" style={{ margin: '14px auto 24px' }}>Może ktoś ją wysunął i nie domknął. Wróć na korytarz.</p><a className="btn b-or" href={href('/')}>Na korytarz</a></div>
    </section>
  );
}
