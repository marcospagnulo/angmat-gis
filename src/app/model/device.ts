// Represents a Device entity
export interface Device {
  id: number;
  label: string;
  price: number;
  ram: number;
  os: string;
  rate: number;
}
// Represents the state
export interface Devices {
  list?: Device[];          // array of Device entities
  active: Device;           // active Device (currently selected)
}
