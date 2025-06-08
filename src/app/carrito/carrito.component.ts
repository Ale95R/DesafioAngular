import { Component, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrito } from '../servicios/carrito';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class CarritoComponent implements DoCheck {
  carrito = inject(Carrito);
  items = this.carrito.getItems();
  total = this.carrito.totalPrecio();

  ngDoCheck(): void {
    this.items = this.carrito.getItems();
    this.total = this.carrito.totalPrecio();
  }

  actualizar(): void {
    this.carrito.actualizar();
  }

  eliminar(id: number): void {
    this.carrito.eliminar(id);
    this.actualizar();
  }

  pagar(): void {
    alert('Pago realizado con éxito');
    this.carrito.limpiar();
    this.items = [];
    this.total = 0;
  }
}
