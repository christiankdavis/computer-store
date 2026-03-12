export interface Product {
  id: string;
  name: string;
  group: string;
  msrp: number;
  price: number;
  status: "Available" | "Unavailable";
}
