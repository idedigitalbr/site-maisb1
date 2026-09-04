export type DaySchedule = {
  label: string;
  open: string;
  close: string;
  text: string;
};

export type StoreUnit = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  category: string;
  services: string[];
  subbrands: string[];
  rating: string;
  reviewsCount: string;
  image: string;
  thumbOnline: string;
  mapsUrl: string;
  latitude: number;
  longitude: number;
  schedule: Record<number, DaySchedule>;
};

export const storeUnits: readonly StoreUnit[] = [
  {
    id: 'alcindo',
    name: '+B SUPERMERCADOS (ALCINDO CACELA)',
    shortName: '+B Supermercados (Alcindo Cacela)',
    address: 'Av. Alcindo Cacela, 1848',
    category: '+B Supermercados',
    services: ['SUPERMERCADOS +B', 'THE WINE EXPERIENCE', '+B FARMA'],
    subbrands: ['SUPERMERCADOS +B', 'THE WINE EXPERIENCE', '+B FARMA'],
    rating: '4,8',
    reviewsCount: '1.240',
    image: 'Fotografias/Supermercado +B/00_CardHome/1-foto-supermercado.webp',
    thumbOnline: 'https://grupomaisb.suporteide.digital/assets/Fotografias/Supermercado%20+B/00_CardHome/1-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/BUbRXApXKgTSYXKG8',
    latitude: -1.4516,
    longitude: -48.4779,
    schedule: {
      0: { label: 'domingo', open: '07:00', close: '20:00', text: '07:00–20:00' },
      1: { label: 'segunda-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      2: { label: 'terça-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      3: { label: 'quarta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      4: { label: 'quinta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      5: { label: 'sexta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      6: { label: 'sábado', open: '07:00', close: '22:00', text: '07:00–22:00' },
    },
  },
  {
    id: 'tapana',
    name: '+B SUPERMERCADOS (TAPANÃ)',
    shortName: '+B Supermercados (Tapanã)',
    address: 'Rod. Tapanã, 597',
    category: '+B Supermercados',
    services: ['SUPERMERCADOS +B', '+B FARMA'],
    subbrands: ['SUPERMERCADOS +B', '+B FARMA'],
    rating: '4,5',
    reviewsCount: '850',
    image: 'Fotografias/Supermercado +B/00_CardHome/2-foto-supermercado.webp',
    thumbOnline: 'https://grupomaisb.suporteide.digital/assets/Fotografias/Supermercado%20+B/00_CardHome/2-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/aKm2MGrDTNMum9nk7',
    latitude: -1.353381,
    longitude: -48.468711,
    schedule: {
      0: { label: 'domingo', open: '08:00', close: '14:00', text: '08:00–14:00' },
      1: { label: 'segunda-feira', open: '07:00', close: '21:00', text: '07:00–21:00' },
      2: { label: 'terça-feira', open: '07:00', close: '21:00', text: '07:00–21:00' },
      3: { label: 'quarta-feira', open: '07:00', close: '21:00', text: '07:00–21:00' },
      4: { label: 'quinta-feira', open: '07:00', close: '21:00', text: '07:00–21:00' },
      5: { label: 'sexta-feira', open: '07:00', close: '21:00', text: '07:00–21:00' },
      6: { label: 'sábado', open: '07:00', close: '21:00', text: '07:00–21:00' },
    },
  },
  {
    id: 'plaza',
    name: '+B SUPERMERCADOS (PLAZA)',
    shortName: '+B Supermercados (Plaza)',
    address: 'Av. Gov. José Malcher, 2388',
    category: '+B Supermercados',
    services: ['SUPERMERCADOS +B', 'VILLA PLAZA', 'VILLA PLAZA PARK', '+B FARMA'],
    subbrands: ['SUPERMERCADOS +B', 'VILLA PLAZA', 'VILLA PLAZA PARK', '+B FARMA'],
    rating: '4,2',
    reviewsCount: '6.740',
    image: 'Fotografias/Supermercado +B/00_CardHome/3-foto-supermercado.webp',
    thumbOnline: 'https://grupomaisb.suporteide.digital/assets/Fotografias/Supermercado%20+B/00_CardHome/3-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/wHYfn9JPun4pZ28Z8',
    latitude: -1.448574,
    longitude: -48.473539,
    schedule: {
      0: { label: 'domingo', open: '07:30', close: '21:00', text: '07:30–21:00' },
      1: { label: 'segunda-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      2: { label: 'terça-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      3: { label: 'quarta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      4: { label: 'quinta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      5: { label: 'sexta-feira', open: '07:00', close: '22:00', text: '07:00–22:00' },
      6: { label: 'sábado', open: '07:00', close: '22:00', text: '07:00–22:00' },
    },
  },
];

export function getStoreUnit(id: string): StoreUnit | undefined {
  return storeUnits.find((unit) => unit.id === id);
}
