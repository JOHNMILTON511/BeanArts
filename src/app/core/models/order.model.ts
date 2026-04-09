import { CartItem } from './cart.model';
import { Address } from './user.model';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_production'
  | 'quality_check'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id:            string;
  userId:        string;
  userEmail:     string;
  userName:      string;
  companyName:   string;
  items:         CartItem[];
  shippingAddress: Address;
  subtotal:      number;
  tax:           number;
  total:         number;
  status:        OrderStatus;
  notes:         string;
  trackingId:    string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt:     Date;
  updatedAt:     Date;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending:       'Order Placed',
  confirmed:     'Confirmed',
  in_production: 'In Production',
  quality_check: 'Quality Check',
  dispatched:    'Dispatched',
  delivered:     'Delivered',
  cancelled:     'Cancelled',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending:       '#f59e0b',
  confirmed:     '#3b82f6',
  in_production: '#8b5cf6',
  quality_check: '#06b6d4',
  dispatched:    '#10b981',
  delivered:     '#22c55e',
  cancelled:     '#ef4444',
};
