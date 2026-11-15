import type { Metadata } from 'next';
import Booking from '@/components/Booking';

export const metadata: Metadata = { title: 'Rezerwacja' };

export default function Book() {
  return (
    <>
      <section className="sec" style={{ paddingBottom: 'clamp(14px,3vh,28px)' }}>
        <div className="wrap head" style={{ marginBottom: 0 }}><div><span className="lb o">Rezerwacja · bezpośrednio taniej o 12%</span><h1 className="h2">Wybierz szufladę <em>i daty.</em></h1></div></div>
      </section>
      <section style={{ paddingBottom: 'var(--secpad)' }}><div className="wrap"><Booking /></div></section>
    </>
  );
}
