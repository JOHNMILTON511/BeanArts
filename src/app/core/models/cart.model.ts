export interface CartItem {
  productId:   string;
  name:        string;
  variantId:   string | null;
  variantName: string | null;
  imageUrl:    string;
  price:       number;
  quantity:    number;
}

export interface Cart {
  uid:      string;
  items:    CartItem[];
  updatedAt: Date;
}
