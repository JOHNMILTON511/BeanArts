export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  uid:         string;
  email:       string;
  displayName: string;
  phone:       string;
  companyName: string;
  gstNumber:   string;
  role:        UserRole;
  addresses:   Address[];
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Address {
  id?:      string;
  label?:   string;   // 'Home' | 'Office' | custom
  name:     string;   // contact name for this address
  phone:    string;
  line1:    string;
  line2?:   string;
  city:     string;
  state:    string;
  pincode:  string;
  country:  string;
  isDefault?: boolean;
}
