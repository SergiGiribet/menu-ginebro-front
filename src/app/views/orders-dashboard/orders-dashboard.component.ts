import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../interfaces/student';
import { Order, MenuItem } from '../../interfaces/order-history';
import { API_CONFIG } from '../../environments/api.config';
import { UsersService } from '../../Services/Admin/users/users.service';
@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OrdersDashboardComponent implements OnInit {
  activeTab = 'orders';
  selectedDate = '2025-05-27';

  students: Student[] = [];
  orders: Order[] = [];
  menus: MenuItem[] = [];

  orderHistory: {
    student: Student;
    order: Order;
    firstCourse?: MenuItem;
    secondCourse?: MenuItem;
    dessert?: MenuItem;
  }[] = [];

  loadingOrders = true;

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }

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
    const url = `${API_CONFIG.baseUrl}/menus/${selectedDate}`;
    this.http.get<any>(url).subscribe({
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
    const url = `${API_CONFIG.baseUrl}/orders_by_date/${date}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.orders = response.data || [];
        console.log('Orders:', this.orders);
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
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
}
