export type MachineStatus = "available" | "offline";

export interface Machine {
  id: string;
  name?: string;
  address: string;
  lat: number;
  lng: number;
  status: MachineStatus;
}

export const machines: Machine[] = [
  {
    id: "3344",
    name: "BiYé Center",
    address: "12 Herzl St, Tel Aviv",
    lat: 32.0853,
    lng: 34.7818,
    status: "available",
  },
  {
    id: "2219",
    name: "City Mall",
    address: "45 Dizengoff St, Tel Aviv",
    lat: 32.0797,
    lng: 34.7683,
    status: "offline",
  },
  {
    id: "7782",
    name: "Central Station",
    address: "1 Levinsky St, Tel Aviv",
    lat: 32.0544,
    lng: 34.7794,
    status: "available",
  },
  {
    id: "9901",
    name: "Beach Promenade",
    address: "89 Hayarkon St, Tel Aviv",
    lat: 32.0917,
    lng: 34.7699,
    status: "available",
  },
  {
    id: "1107",
    name: "North Park",
    address: "2 Namir Rd, Tel Aviv",
    lat: 32.1137,
    lng: 34.8051,
    status: "offline",
  },
];
