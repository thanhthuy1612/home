export interface IListRoom {
  index: number;
  size: number;
  address: string;
  priceFrom: number | null;
  priceTo: number | null;
  maxPeople: number | null;
  roomType: number | null;
  priceDescending: boolean;
}
