import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './security/auth.guard';
import { VentaComponent } from './venta/venta.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component:HomeComponent, canActivate: [AuthGuard] },
  { path: '*', component:HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component:HomeComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component:ClienteComponent, canActivate: [AuthGuard] },
  { path: 'venta', component:VentaComponent, canActivate: [AuthGuard] },
  { path: 'producto', component:ProductosComponent, canActivate: [AuthGuard] },  
  { path: 'login', component:LoginComponent},
  //{ path: '/', component:HomeComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
