import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class NavigationBarComponent {
  isAdmin = false;

  activeTab: 'food' | 'history' | 'admin' | 'profile' = 'food';

  constructor(private router: Router) { }

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('food')) {
      this.activeTab = 'food';
    } else if (currentUrl.includes('history')) {
      this.activeTab = 'history';
    } else if (currentUrl.includes('admin')) {
      this.activeTab = 'admin';
    } else if (currentUrl.includes('profile')) {
      this.activeTab = 'profile';
    }

    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  navigate(tab: typeof this.activeTab) {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);
  }

  getNavClasses(tab: string): string {
    return `
      flex w-9 h-9 p-2 justify-center items-center rounded-lg cursor-pointer hover:bg-black/5
      ${this.activeTab === tab ? 'bg-black/5 text-[#009CA6]' : 'text-gray-600'}
    `;
  }
}