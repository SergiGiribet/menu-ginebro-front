import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Student } from "../../interfaces/student";
import { Order, MenuItem } from "../../interfaces/order-history";

@Component({
  selector: "app-orders-dashboard",
  templateUrl: "./orders-dashboard.component.html",
  styleUrls: ["./orders-dashboard.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class OrdersDashboardComponent {
  activeTab = "daily";
  selectedDate = "10/04/2025";

  // Sample data that would typically come from a service
  students: Student[] = [];
  orders: Order[] = [];

  // Combined data for display
  orderHistory: {
    student: Student;
    order: Order;
    firstCourse?: MenuItem;
    secondCourse?: MenuItem;
    dessert?: MenuItem;
  }[] = [];

  constructor() {
    // This would typically be fetched from a service
    this.loadOrderData();
  }

  setActiveTab(tab: "daily" | "monthly" | "annual" | "images"): void {
    this.activeTab = tab;
    // In a real application, this would trigger data reload based on the selected tab
    this.loadOrderData();
  }

  private loadOrderData(): void {
    // This method would typically call a service to fetch data
    // For now, it's just setting up empty data
    this.orderHistory = [];
  }

  getFirstCourse(order: Order): MenuItem | undefined {
    return order.menuItems.find((item) => item.type === "first");
  }

  getSecondCourse(order: Order): MenuItem | undefined {
    return order.menuItems.find((item) => item.type === "second");
  }

  getDessert(order: Order): MenuItem | undefined {
    return order.menuItems.find((item) => item.type === "dessert");
  }

  exportData(): void {
    // Implementation for exporting data would go here
    console.log("Exporting data...");
  }
}
