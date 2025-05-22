import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentService } from "../../Services/User/user.service";
import { Student } from "../../interfaces/student";
import { Router } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from "../../Services/Auth/auth.service";
@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.css"],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class UserCardComponent implements OnInit {
  student!: Student;

  avatarSvg: string = `<svg id="33:1977" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="avatar-icon" style="width: 32px; height: 32px">
    <path d="M25.3332 28V25.3333C25.3332 23.9188 24.7713 22.5623 23.7711 21.5621C22.7709 20.5619 21.4143 20 19.9998 20H11.9998C10.5853 20 9.22879 20.5619 8.2286 21.5621C7.22841 22.5623 6.6665 23.9188 6.6665 25.3333V28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.9998 14.6667C18.9454 14.6667 21.3332 12.2789 21.3332 9.33333C21.3332 6.38781 18.9454 4 15.9998 4C13.0543 4 10.6665 6.38781 10.6665 9.33333C10.6665 12.2789 13.0543 14.6667 15.9998 14.6667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  constructor(private studentService: StudentService,
    private router : Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      console.error("No user in localStorage.");
      return;
    }

    const parsedUser = JSON.parse(rawUser);
    const userId = parsedUser.id;

    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error("Failed to fetch student:", err);
      }
    });
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  forgotPassword() {
    this.authService.logout();
    this.router.navigate(['/forgotpassword']);
  }
}
