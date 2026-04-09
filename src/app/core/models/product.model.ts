export type ProductCategory = 'Gifting' | 'Printing' | 'Packaging' | 'Merchandise';

export interface Product {
  id:          string;
  name:        string;
  description: string;
  category:    ProductCategory;
  price:       number;          // base price per unit
  minQty:      number;          // minimum order quantity
  images:      string[];        // image URLs
  tags:        string[];
  inStock:     boolean;
  featured:    boolean;
  variants:    ProductVariant[];
  createdAt:   Date;
  updatedAt:   Date;
}

export interface ProductVariant {
  id:     string;
  label:  string;   // e.g. 'Small', 'Premium', 'Eco'
  price:  number;
  inStock: boolean;
}
