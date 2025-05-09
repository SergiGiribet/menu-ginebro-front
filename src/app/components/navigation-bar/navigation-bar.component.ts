import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // This component can be extended with inputs to control which icon is active
  // For example:
  // @Input() activeIcon: 'food' | 'history' | 'settings' | 'profile' = 'food';
}
