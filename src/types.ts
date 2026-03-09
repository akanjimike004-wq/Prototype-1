export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: "Sale" | "Rent";
  image: string;
  images: string[];
  description: string;
  features: string[];
}
