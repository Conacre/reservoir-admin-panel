export interface Reservoir {
  id: number;
  name: string;
  product?: { name: string };
  capacity: number;
  volume: number;
  isLocked: boolean;
}