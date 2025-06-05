import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule]
})
export class Navbar {
  carrito = inject(Carrito);
  abrirCarrito() {
    document.dispatchEvent(new CustomEvent('toggleCart'));
  }
}
