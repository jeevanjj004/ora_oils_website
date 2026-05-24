// src/components/products.ts
export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number | null;
  saving: string | null;
  image: string;
  badge: string;
  featured: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: "classic",
    name: "ORA Classic",
    size: "500 ml",
    price: 199,
    originalPrice: null,
    saving: null,
    image: "/images/products/product_virgin_500ml.png",  // Fixed path
    badge: "Classic",
    featured: false,
    description: "500 ml · Cold-pressed purity",
  },
  {
    id: "imperial",
    name: "ORA Imperial",
    size: "1 KG",
    price: 349,
    originalPrice: 398,
    saving: "₹49",
    image: "/images/products/product_extravirgin_1l.png",  // Fixed path
    badge: "Best Value",
    featured: true,
    description: "1 KG · Premium quality",
  },
  {
    id: "family",
    name: "ORA Family Pack",
    size: "2 x 1 KG",
    price: 649,
    originalPrice: 796,
    saving: "₹147",
    image: "/images/products/product_extravirgin_1l.png",  // Fixed path
    badge: "New",
    featured: false,
    description: "2 x 1 KG · Best value",
  },
];