export type StoreUnit = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  category: string;
  services: string[];
  subbrands: string[];
  rating: string;
  image: string;
  mapsUrl: string;
  latitude: number;
  longitude: number;
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
    image: 'Fotografias/Supermercado +B/00_CardHome/1-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/BUbRXApXKgTSYXKG8',
    latitude: -1.4516,
    longitude: -48.4779,
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
    image: 'Fotografias/Supermercado +B/00_CardHome/2-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/aKm2MGrDTNMum9nk7',
    latitude: -1.353381,
    longitude: -48.468711,
  },
  {
    id: 'plaza',
    name: '+B SUPERMERCADOS (PLAZA)',
    shortName: '+B Supermercados (Plaza)',
    address: 'Av. Gov. José Malcher, 2388',
    category: '+B Supermercados',
    services: ['SUPERMERCADOS +B', 'VILLA PLAZA', 'VILLA PLAZA PARK', '+B FARMA'],
    subbrands: ['SUPERMERCADOS +B', 'VILLA PLAZA', 'VILLA PLAZA PARK', '+B FARMA'],
    rating: '4,7',
    image: 'Fotografias/Supermercado +B/00_CardHome/3-foto-supermercado.webp',
    mapsUrl: 'https://maps.app.goo.gl/wHYfn9JPun4pZ28Z8',
    latitude: -1.448574,
    longitude: -48.473539,
  },
];

export function getStoreUnit(id: string): StoreUnit | undefined {
  return storeUnits.find((unit) => unit.id === id);
}

