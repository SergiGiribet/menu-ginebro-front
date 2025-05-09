import { Student } from './student';

export interface MenuItem {
    type: string;
    name: string;
  }
  
  export interface Order {
    date: string;
    tupper?: string;
    menuItems: MenuItem[];
  }
