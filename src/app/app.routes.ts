import { Routes } from '@angular/router';
import { WelcomeScreenComponent } from './views/welcome-screen/welcome-screen.component';
import { OrdersDashboardComponent } from './views/orders-dashboard/orders-dashboard.component';
import { OrderHistoryComponent } from './views/order-history/order-history.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import MenuSelectionComponent from './views/menu-selection/menu-selection.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/Auth/logout/logout.component';
import { StudentRegistrationComponent } from './views/student-registration/student-registration.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para la pantalla de inicio de sesión
  { path: 'forgotpassword', component: ForgotPasswordComponent }, // Ruta para la pantalla de recuperación de contraseña
  { path: 'register', component: StudentRegistrationComponent }, // Ruta para la pantalla de registro
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]  }, // Ruta para la pantalla de bienvenida
  { path: '', component: WelcomeScreenComponent, canActivate: [AuthGuard] }, // Ruta raíz
  { path: 'menu-selection', component: MenuSelectionComponent, canActivate: [AuthGuard] }, // Ruta para el menú
  { path: 'food', component:  WelcomeScreenComponent, canActivate: [AuthGuard]}, // Ruta para la sección de comida
  { path: 'admin', component:  OrdersDashboardComponent, canActivate: [AuthGuard]}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'history', component: OrderHistoryComponent, canActivate: [AuthGuard] }, // Ruta para la sección de historial
  { path: 'profile', component: UserCardComponent, canActivate: [AuthGuard] }, // Ruta para la sección de perfil

  // Subrutas para el admin
  { path: 'admin/daily', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/monthly', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/anual', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/image', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  
  {path: '**', redirectTo: ''}, // Redirigir cualquier ruta no reconocida a la raíz
];
