import { Component } from "@angular/core";
import { IconComponent } from "../../components/icon/icon.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
  imports: [IconComponent, CommonModule, FormsModule],
})
export class LoginFormComponent {
  email: string = "";
  password: string = "";

  login(event: Event): void {
    event.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", {
      email: this.email,
      password: this.password,
    });
  }
}
