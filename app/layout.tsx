import type { Metadata, Viewport } from 'next';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource-variable/league-spartan/index.css';
import '@fontsource-variable/outfit/index.css';
import './globals.css';
import { Footer, Header, Reveal } from '@/components/chrome';
import { BASE } from '@/lib/base';

export const metadata: Metadata = {
  metadataBase: new URL('https://thepeerscollective.com'),
  title: { default: 'Zakład 58 · lofty w dawnej fabryce radia, Kraków', template: '%s · Zakład 58' },
  description: 'Sześć loftów w fabryce radioodbiorników z 1958, urządzonej jak regał Eamesa. Każdy loft ma swój kolor, swój mebel z epoki i swój brelok do klucza.',
  icons: { icon: `${BASE}/favicon.svg` },
  openGraph: { title: 'Zakład 58 · lofty w dawnej fabryce radia', description: 'Sześć loftów, każdy z innej szuflady.', images: [`${BASE}/img/z01.webp`] },
};
export const viewport: Viewport = { themeColor: '#EFE6D2', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <a className="skip" href="#main">Przejdź do treści</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
