export interface MenuItem {
  type: string;
  name: string;
}

export interface Order {
  id: number;
  user: userData;
  user_id: number;
  order_date: string;
  allergies: string;
  order_type_id: number;
  order_status_id: number;
  tupper?: string;
  menuItems: MenuItem[];
}

export interface userData {
  id: number;
  name: string;
  last_name: string;
  email: string;
}
