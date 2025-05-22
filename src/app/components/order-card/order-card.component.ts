import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { MenuItem } from "../../interfaces/order-history";

@Component({
  selector: "app-order-card",
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.css"],
})
export class OrderCardComponent {
  @Input() date: string = "";
  @Input() tupper?: string;
  @Input() menuItems: MenuItem[] = [];


  get formattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(this.date).toLocaleDateString('es-ES', options);
  }
}
