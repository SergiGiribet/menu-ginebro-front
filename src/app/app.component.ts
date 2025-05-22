import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AlertContainerComponent } from './components/alert-container/alert-container.component';
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [NavigationBarComponent, RouterOutlet, AlertContainerComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  showNav = true;

  constructor(private router: Router) {

    this.router.events.subscribe(() => {
      this.showNav = this.router.url != '/login' && this.router.url != '/forgotpassword' && this.router.url != '/register';
    });
  }
  title = 'testMenu1';
}
