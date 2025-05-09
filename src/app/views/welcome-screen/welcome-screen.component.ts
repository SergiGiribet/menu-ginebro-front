import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAvatarComponent } from "../../components/user-avatar/user-avatar.component";
import { SchoolMealInfoComponent } from "../../components/school-meal-info/school-meal-info.component";
import { CourseInfoComponent } from "../../components/course-info/course-info.component";
import { ActionButtonComponent } from "../../components/action-button/action-button.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome-screen",
  standalone: true,
  imports: [
    CommonModule,
    UserAvatarComponent,
    SchoolMealInfoComponent,
    CourseInfoComponent,
    ActionButtonComponent,
  ],
  templateUrl: "./welcome-screen.component.html",
  styleUrls: ["./welcome-screen.component.css"],
})
export class WelcomeScreenComponent {
  constructor(private router: Router) {}

  onSelectMenu(): void {
    this.router.navigate(['/menu-selection']);
  }
}
