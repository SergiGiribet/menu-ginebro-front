import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Student } from "../../interfaces/student";
import { IconComponent } from "../../components/icon/icon.component";

@Component({
  selector: "app-student-registration",
  templateUrl: "./student-registration.component.html",
  styleUrls: ["./student-registration.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
})
export class StudentRegistrationComponent {
  student: Student = {
    name: "",
    lastName: "",
    course: "",
    email: "",
    password: "",
  };

  courses: string[] = [
    "Primero de Primaria",
    "Segundo de Primaria",
    "Tercero de Primaria",
    "Cuarto de Primaria",
    "Quinto de Primaria",
    "Sexto de Primaria",
    "Primero de Secundaria",
    "Segundo de Secundaria",
    "Tercero de Secundaria",
    "Cuarto de Secundaria",
  ];

  onSubmit(): void {
    console.log("Form submitted:", this.student);
    // Here you would typically call a service to register the student
  }

  navigateToLogin(): void {
    // Navigate to login page
    console.log("Navigate to login page");
  }
}
