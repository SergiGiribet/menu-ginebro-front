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

  calendarIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[17px] h-[20px]">
    <path d="M5.77783 1.66667V5.00001" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M11.5557 1.66667V5.00001" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M13.7223 3.33333H3.61119C2.81345 3.33333 2.16675 4.07952 2.16675 4.99999V16.6667C2.16675 17.5871 2.81345 18.3333 3.61119 18.3333H13.7223C14.52 18.3333 15.1667 17.5871 15.1667 16.6667V4.99999C15.1667 4.07952 14.52 3.33333 13.7223 3.33333Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M2.16675 8.33333H15.1667" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>`;
}
