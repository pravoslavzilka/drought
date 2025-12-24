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
    name: 'Plankov bok',
    region: 'Zaježová',
    latitude:  48.456620,
    longitude: 19.233270,
  },

  {
    id: '2',
    name: 'Medzi jarky',
    region: 'Zaježová',
    latitude: 48.455275,
    longitude: 19.231596,
  },

  {
    id: '3',
    name: 'Na križovatke',
    region: 'Zaježová',
    latitude: 48.453234,
    longitude: 19.236399,
  },
  {
    id: '4',
    name: 'Lesík',
    region: 'Zaježová',
    latitude: 48.453939,
    longitude: 19.232653,
  },
];
