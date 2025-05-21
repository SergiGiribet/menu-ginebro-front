import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- import FormsModule here
import { Student } from '../../interfaces/student';
import { Order, MenuItem } from '../../interfaces/order-history';
import { UsersService } from '../../Services/Admin/users/users.service';
import { OrdersService } from '../../Services/Orders/orders.service';
import { MenusService } from '../../Services/Menus/menu.service';
import { AlertService } from '../../Services/Alert/alert.service';

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
  weeklyMenus: { date: string; menus: MenuItem[] }[] = [];



  students: Student[] = [];
  orders: Order[] = [];
  menus: MenuItem[] = [];

  loadingOrders = true;

  // Status options for the select dropdown
  statusOptions = [
    { value: 1, label: 'Pendent' },
    { value: 2, label: 'En preparació' },
    { value: 3, label: 'Entregat' },
    { value: 4, label: 'No recollit' }
  ];

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private menusService: MenusService,
    private alertService: AlertService
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
      this.loadMenusWeek();
    } else if (this.activeTab === 'ordres') {
      this.loadOrders(this.selectedDate);
    } else if (this.activeTab === 'usuaris') {
      this.loadUsers();
    }
  }

  loadMenusWeek(): void {
    const today = new Date(this.selectedDate);
    const startOfWeek = new Date(today);
    const day = today.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(today.getDate() + diffToMonday);

    const datesOfWeek = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    const menuPromises = datesOfWeek.map((date) =>
      this.menusService.getByDate(date).toPromise()
        .then((res: any) => {
          const dishes = res.data?.dishes || [];
          const parsedMenus: MenuItem[] = dishes.map((dish: any) => ({
            type: this.getDishType(dish.dish_type_id),
            name: JSON.parse(dish.options)[0] || 'N/A',
            date
          }));
          return { date, menus: parsedMenus };
        })
        .catch(() => ({ date, menus: [] }))
    );

    Promise.all(menuPromises)
      .then((results) => {
        this.weeklyMenus = results;
      })
      .catch((err) => {
        console.error('Error loading weekly menus:', err);
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
    this.ordersService.updateStatus(order.id, order.orderStatus.id).subscribe({
      next: () => {
        this.alertService.show('success', 'Estat de la comanda modificada correctament.', '');
        this.loadOrders(this.selectedDate);
      },
      error: (err) => {
        this.alertService.show('error', 'Error en actualitzar l\'estat de la comanda.', '');
      }
    });
  }

  changeWeek(offset: number): void {
    const current = new Date(this.selectedDate);
    current.setDate(current.getDate() + offset * 7);
    this.selectedDate = current.toISOString().split('T')[0];
    this.loadMenusWeek();
  }

  changeDay(offset: number): void {
    const current = new Date(this.selectedDate);
    current.setDate(current.getDate() + offset);

    const today = new Date();
    const next = new Date(current);

    if (offset > 0 && next > today) return;

    this.selectedDate = current.toISOString().split('T')[0];
    this.loadOrders(this.selectedDate);
  }

  isNextDayDisabled(): boolean {
    const selected = new Date(this.selectedDate);
    const tomorrow = new Date(selected);
    tomorrow.setDate(selected.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tomorrow > today;
  }


}
