import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { Order, MenuItem } from '../../interfaces/order-history';
import { API_CONFIG } from '../../environments/api.config';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  clockIcon = `<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[24px]">
    <path d="M10.2084 22C14.9066 22 18.7153 17.5228 18.7153 12C18.7153 6.47715 14.9066 2 10.2084 2C5.5101 2 1.70142 6.47715 1.70142 12C1.70142 17.5228 5.5101 22 10.2084 22Z" stroke="#009CA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.2083 6V12L13.611 14" stroke="#009CA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>`;

  orders: Order[] = [];
  userId = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const url = `${API_CONFIG.baseUrl}/orders_by_user/${this.userId}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.orders = (response.data || []).map((order: any) => {
          const formattedDate = new Date(order.order_date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const menuItems: MenuItem[] = [];
          const type = order.orderType?.name?.toLowerCase() || '';

          order.orderDetails.forEach((detail: any) => {
            if (type.includes('primer')) {
              menuItems.push({ type: 'Primer Plato', name: detail.option1 });
            }
            if (type.includes('segon') || type.includes('segundo')) {
              menuItems.push({ type: 'Segundo Plato', name: detail.option2 });
            }
            if (type.includes('postre')) {
              menuItems.push({ type: 'Postre', name: detail.option3 });
            }
          });

          return {
            date: formattedDate,
            tupper: order.order_type_id === 1 ? 'Táper' : undefined,
            menuItems,
          };
        });
      },
      error: (err) => {
        console.error('Error loading order history:', err);
      },
    });
  }
}
