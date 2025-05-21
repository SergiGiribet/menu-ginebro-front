import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- import FormsModule here
import { Student } from '../../interfaces/student';
import { Order, MenuItem } from '../../interfaces/order-history';
import { UsersService } from '../../Services/Admin/users/users.service';
import { OrdersService } from '../../Services/Orders/orders.service';
import { MenusService } from '../../Services/Menus/menu.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- add FormsModule here
})
export class OrdersDashboardComponent implements OnInit {
  activeTab = 'ordres';
  selectedDate = new Date().toISOString().split('T')[0];

  students: Student[] = [];
  orders: Order[] = [];
  menus: MenuItem[] = [];

  loadingOrders = true;

  // Status options for the select dropdown
  statusOptions = [
    { value: 1, label: 'Pendent' },
    { value: 2, label: 'En preparació' },
    { value: 3, label: 'Entregat' }
  ];

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private menusService: MenusService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  setActiveTab(tab: 'ordres' | 'menus' | 'usuaris' | 'json' | 'export'): void {
    this.activeTab = tab;
    this.loadAllData();
  }

  loadAllData(): void {
    if (this.activeTab === 'menus') {
      this.loadMenus(this.selectedDate);
    } else if (this.activeTab === 'ordres') {
      this.loadOrders(this.selectedDate);
    } else if (this.activeTab === 'usuaris') {
      this.loadUsers();
    }
  }

  loadMenus(selectedDate: string): void {
    this.menusService.getByDate(selectedDate).subscribe({
      next: (response) => {
        const dishes = response.data?.dishes || [];
        this.menus = dishes.map((dish: any) => ({
          type: this.getDishType(dish.dish_type_id),
          name: JSON.parse(dish.options)[0] || 'N/A',
        }));
      },
      error: (err) => {
        console.error('Error loading menus:', err);
      },
    });
  }

  getDishType(id: number): string {
    switch (id) {
      case 1:
        return 'Primer Plat';
      case 2:
        return 'Segundo Plat';
      case 3:
        return 'Postre';
      default:
        return 'Altre';
    }
  }

  loadOrders(date: string): void {
    this.loadingOrders = true;
    this.ordersService.getByDate(date).subscribe({
      next: (response: any) => {
        let orders = response.data || [];
        if (Array.isArray(orders) && Array.isArray(orders[0])) {
          orders = orders.flat();
        }
        this.orders = orders;
        console.log('Orders:', this.orders);
        this.loadingOrders = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.loadingOrders = false;
      },
    });
  }

  loadUsers(): void {
    this.usersService.getAll().subscribe({
      next: (users: any) => {
        this.students = users.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          lastName: user.last_name,
          email: user.email,
        }));
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  exportData(): void {
    console.log('Exporting data...');
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.selectedDate = input.value;
      this.loadAllData();
    }
  }

  onStatusChange(order: Order): void {
    // Optional: implement backend update logic here
    console.log('Order status changed:', order);
  }
}
