import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from './navbar/navbar';
import { Catalogo } from './catalogo/catalogo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { Carrito } from './servicios/carrito';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Catalogo,
    CarritoComponent,
    RouterModule,
  ],
})
export class App {
  mostrarCarrito = false;

  constructor(public carrito: Carrito) {}

  @HostListener('document:toggleCart')
  toggleCart() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  pagar() {
    alert('Pago realizado con éxito. ¡Gracias por tu compra!');
    this.carrito.limpiar();
    this.toggleCart();
  }
}
