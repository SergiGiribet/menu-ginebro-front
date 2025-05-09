import { Routes } from '@angular/router';
import { WelcomeScreenComponent } from './views/welcome-screen/welcome-screen.component';
import { OrdersDashboardComponent } from './views/orders-dashboard/orders-dashboard.component';
import { OrderHistoryComponent } from './views/order-history/order-history.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import MenuSelectionComponent from './views/menu-selection/menu-selection.component';


export const routes: Routes = [
  { path: '', component: WelcomeScreenComponent }, // Ruta raíz
  { path: 'menu-selection', component: MenuSelectionComponent }, // Ruta para el menú
  { path: 'food', component:  WelcomeScreenComponent}, // Ruta para la sección de comida
  { path: 'admin', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'history', component: OrderHistoryComponent }, // Ruta para la sección de historial
  { path: 'profile', component: UserCardComponent }, // Ruta para la sección de perfil

  {path: '**', redirectTo: ''}, // Redirigir cualquier ruta no reconocida a la raíz

  // Subrutas para el admin
  { path: 'admin/daily', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/monthly', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/anual', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)
  { path: 'admin/image', component:  OrdersDashboardComponent}, // Ruta para la sección de historial de pedidos (admin)

];
