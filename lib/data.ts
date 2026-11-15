export type Loft = {
  id: string; n: number; color: string; hex: string; ink: string; name: string; title: string; m2: number; guests: number; price: number;
  short: string; desc: string; piece: string; kitchen: string; dog: boolean; bedrooms: number; freq: string; album: string; artist: string;
  img: string; wide: string; gallery: string[]; drawers: [string, string][]; tags: string[]; floor: string; windows: string; review?: [string, string];
};

export const LOFTS: Loft[] = [
  { id: '01', n: 1, color: 'Walnut', hex: '#5A3A22', ink: '#F7F1E3', name: 'Biblioteka', title: 'Biblioteka i fotel Eames', m2: 42, guests: 2, price: 380, bedrooms: 1, freq: '88.2',
    short: 'Ściana książek, fotel Eames Lounge i lampa Arco.', desc: 'Ściana książek od podłogi do sufitu, fotel Eames Lounge i lampa Arco. Na noc: herbata i powieść.',
    piece: 'Eames Lounge', kitchen: 'aneks', dog: true, album: 'Night Train', artist: 'Oscar Peterson Trio', img: 'l01', wide: 'l01b', gallery: ['l01', 'l01b'], tags: ['2', 'pies'], floor: '2 (winda)', windows: 'ulica, cegła naprzeciwko',
    drawers: [['Do spania', 'łóżko 160×200, wełniany koc, lampka do czytania'], ['Do kawy', 'kawiarka, kawa z Palarni Fabrycznej, porcelana Ćmielów'], ['Do czytania', '600 książek, z czego 40 o Krakowie, fotel Eames, lampa Arco'], ['Do pracy', 'sekretarzyk z 1961, Wi-Fi 600 Mb/s'], ['Do kąpieli', 'prysznic, kosmetyki z Krakowa, szlafroki'], ['Dla psa', 'miska, legowisko, smaczki z baru']] },
  { id: '02', n: 2, color: 'Mustard', hex: '#D9A23A', ink: '#151311', name: 'Wanna', title: 'Wanna na lwich łapach', m2: 38, guests: 2, price: 420, bedrooms: 1, freq: '91.6',
    short: 'Żeliwna wanna na środku pokoju, przy oknie.', desc: 'Żeliwna wanna na środku pokoju, przy oknie. Sól do kąpieli z Wieliczki i radio Taraban z 1962.',
    piece: 'wanna 1910', kitchen: 'aneks', dog: false, album: 'Lady Sings the Blues', artist: 'Billie Holiday', img: 'l02', wide: 'l02b', gallery: ['l02', 'l02b', 'z02'], tags: ['2', 'wanna'], floor: '2 (winda)', windows: 'podwórze, rano słońce',
    drawers: [['Do spania', 'łóżko 160×200, pościel z lnu w kolorze musztardy'], ['Do kawy', 'ekspres przelewowy, kawa z Palarni Fabrycznej'], ['Do kąpieli', 'żeliwna wanna z 1910, sól z Wieliczki, świece'], ['Do słuchania', 'radio Taraban z 1962, gra naprawdę'], ['Do pracy', 'stolik przy oknie, Wi-Fi 600 Mb/s'], ['Na prezent', 'mydło z palarni, do zabrania']] },
  { id: '03', n: 3, color: 'Teal', hex: '#2F6B6B', ink: '#F7F1E3', name: 'Gramofon', title: 'Gramofon i 200 płyt', m2: 48, guests: 2, price: 420, bedrooms: 1, freq: '95.0',
    short: 'Gramofon Thorens, kolumny z lat 70. i 200 płyt.', desc: 'Gramofon Thorens, kolumny z lat 70. i 200 płyt: jazz, polski big beat, soul. Lista albumów w szufladzie.',
    piece: 'Thorens TD', kitchen: 'aneks', dog: true, album: 'Astigmatic', artist: 'Komeda Quintet', img: 'l03', wide: 'l03b', gallery: ['l03', 'l03a', 'l03c', 'l03d', 'l03e'], tags: ['2', 'gramofon', 'pies'], floor: '2 (winda)', windows: 'podwórze, cicho',
    review: ['Przez dwa dni nie włączyliśmy telewizora. Tylko płyty. Wzięliśmy do domu listę wszystkich albumów.', 'Marta i Kuba, Warszawa'],
    drawers: [['Do spania', 'łóżko 160×200, pościel z lnu, zasłony zaciemniające'], ['Do kawy', 'ekspres kolbowy, kawa z palarni Fabryczna, młynek'], ['Do słuchania', 'Thorens TD 160, wzmacniacz Unitra, słuchawki'], ['Do pracy', 'biurko przy oknie, Wi-Fi 600 Mb/s, lampa Kaiser'], ['Do kąpieli', 'prysznic walk-in, kosmetyki z Krakowa, szlafroki'], ['Dla psa', 'miska, legowisko, smaczki z baru (tak, mają)']] },
  { id: '04', n: 4, color: 'Olive', hex: '#6E6B3A', ink: '#F7F1E3', name: 'Taras', title: 'Taras z widokiem na kominy', m2: 54, guests: 4, price: 560, bedrooms: 2, freq: '98.4',
    short: 'Taras 20 m² z widokiem na ceglane kominy.', desc: 'Taras 20 m² z widokiem na ceglane kominy fabryki. Dwie sypialnie, rodzinny stół z Ładu.',
    piece: 'stół Ład', kitchen: 'pełna', dog: true, album: 'Niemen Enigmatic', artist: 'Czesław Niemen', img: 'l04', wide: 'l04b', gallery: ['l04', 'l04b'], tags: ['4', 'rodzina', 'taras', 'pies'], floor: '3 (winda)', windows: 'kominy, zachód słońca',
    review: ['Kawa na tarasie, widok na kominy elektrociepłowni. Brzmi dziwnie, wygląda pięknie.', 'Lena, Berlin'],
    drawers: [['Do spania', 'dwie sypialnie, łóżko 160 i dwa 90'], ['Do kawy', 'ekspres kolbowy, mleko z targu na Hali'], ['Na taras', 'leżaki, koce, lampiony, grill elektryczny'], ['Dla dzieci', 'gry planszowe z PRL, łóżeczko na życzenie'], ['Do gotowania', 'pełna kuchnia, stół Ład na 6 osób'], ['Dla psa', 'miska, legowisko, smycz na spacer bulwarami']] },
  { id: '05', n: 5, color: 'Brick', hex: '#A4472D', ink: '#F7F1E3', name: 'Antresola', title: 'Antresola pod dachem', m2: 38, guests: 3, price: 490, bedrooms: 1, freq: '101.8',
    short: 'Spanie na antresoli pod oryginalnymi dźwigarami.', desc: 'Spanie na antresoli pod oryginalnymi dźwigarami, schody jak w starej hali. Dla tych, którzy lubią wspinaczkę.',
    piece: 'dźwigary', kitchen: 'aneks', dog: false, album: 'Kind of Blue', artist: 'Miles Davis', img: 'l05', wide: 'l05b', gallery: ['l05', 'l05b'], tags: ['3'], floor: '4 (schody)', windows: 'dach, gwiazdy',
    drawers: [['Do spania', 'łóżko 160 na antresoli, sofa rozkładana na dole'], ['Do kawy', 'kawiarka, kawa z Palarni Fabrycznej'], ['Do patrzenia', 'okno w dachu, lornetka do gwiazd'], ['Do słuchania', 'radio Taraban, playlista loftu'], ['Do pracy', 'blat pod dźwigarem, Wi-Fi 600 Mb/s'], ['Na zimno', 'koce, termofor, kapcie z filcu']] },
  { id: '06', n: 6, color: 'Noir', hex: '#151311', ink: '#F7F1E3', name: 'Penthouse', title: 'Penthouse, cały ostatni poziom', m2: 96, guests: 6, price: 980, bedrooms: 3, freq: '105.2',
    short: 'Cały ostatni poziom: trzy sypialnie, stół na 10.', desc: 'Cały ostatni poziom: trzy sypialnie, stół na 10 osób, bar z Radiowej 58 na zamówienie.',
    piece: 'bar na 10', kitchen: 'pełna', dog: true, album: 'Komeda: Muzyka do filmów', artist: 'Krzysztof Komeda', img: 'l06', wide: 'l06b', gallery: ['l06', 'l06b'], tags: ['6', 'rodzina', 'gramofon', 'pies'], floor: '5 (winda)', windows: 'trzy strony, całe miasto',
    review: ['Przyjechaliśmy na 40. urodziny. Penthouse pomieścił sześć osób i jedną bardzo długą kolację.', 'Piotr, Gdańsk'],
    drawers: [['Do spania', 'trzy sypialnie, sześć łóżek, pościel z lnu'], ['Do kolacji', 'stół na 10, zastawa z Ćmielowa, świece'], ['Do baru', 'bar z Radiowej 58 na zamówienie, z barmanem'], ['Do słuchania', 'gramofon, 300 płyt, kolumny Tonsil'], ['Do gotowania', 'pełna kuchnia, piekarnik parowy'], ['Dla psa', 'miska, legowisko, smaczki z baru']] },
];

export const loft = (id: string) => LOFTS.find(l => l.id === id)!;

export const FILTERS: [string, string][] = [['all', 'Wszystkie'], ['2', 'Dla 2 osób'], ['rodzina', 'Dla rodziny'], ['wanna', 'Z wanną'], ['taras', 'Z tarasem'], ['gramofon', 'Z gramofonem'], ['pies', 'Dla psa']];
