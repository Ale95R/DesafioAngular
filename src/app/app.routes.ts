import { Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { Catalogo } from './catalogo/catalogo.component';

export const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'carrito', component: CarritoComponent }
];
