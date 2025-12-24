export interface Location {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Los Angeles55',
    region: 'California, USA',
    latitude: 45.05,
    longitude: -50.24,
  },
  {
    id: '2',
    name: 'Phoenix',
    region: 'Arizona, USA',
    latitude: 33.45,
    longitude: -112.07,
  },
  {
    id: '3',
    name: 'Miami',
    region: 'Florida, USA',
    latitude: 25.76,
    longitude: -80.19,
  },
  {
    id: '4',
    name: 'Seattle',
    region: 'Washington, USA',
    latitude: 47.61,
    longitude: -122.33,
  },
];
