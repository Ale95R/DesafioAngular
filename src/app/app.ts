import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from './navbar/navbar';
import { Catalogo } from './catalogo/catalogo';
import { Carrito } from './servicios/carrito';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    FormsModule,  
    Navbar,
    Catalogo       
  ]
})
export class App {
  mostrarCarrito = false;
  constructor(public carrito: Carrito) {}

  @HostListener('document:toggleCart') toggleCart() { this.mostrarCarrito = !this.mostrarCarrito; }

  pagar() {
    alert('Pago realizado con éxito. ¡Gracias por tu compra!');
    this.carrito.limpiar();
    this.toggleCart();
  }
}
