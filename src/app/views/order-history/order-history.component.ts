import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderCardComponent } from "../../components/order-card/order-card.component";
import { Order, MenuItem } from "../../interfaces/order-history";

@Component({
  selector: "app-order-history",
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.css"],
})
export class OrderHistoryComponent {
  clockIcon = `<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[24px]">
    <path d="M10.2084 22C14.9066 22 18.7153 17.5228 18.7153 12C18.7153 6.47715 14.9066 2 10.2084 2C5.5101 2 1.70142 6.47715 1.70142 12C1.70142 17.5228 5.5101 22 10.2084 22Z" stroke="#009CA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.2083 6V12L13.611 14" stroke="#009CA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>`;

  orders: Order[] = [
    {
      date: "lunes, 15 de enero de 2024",
      tupper: "Táper",
      menuItems: [
        { type: "Primer Plato", name: "Sopa de Verduras" },
        { type: "Segundo Plato", name: "Pollo al Horno" },
        { type: "Postre", name: "Fruta del Tiempo" },
      ],
    },
    {
      date: "domingo, 14 de enero de 2024",
      menuItems: [
        { type: "Primer Plato", name: "Ensalada Mixta" },
        { type: "Segundo Plato", name: "Pescado a la Plancha" },
        { type: "Postre", name: "Yogur Natural" },
      ],
    },
  ];
}
