import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = [];

  getItems(): any[] {
    return this.items;
  }

  addToCart(producto: any): void {
    const existente = this.items.find((i) => i.producto.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ producto, cantidad: 1 });
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, i) => total + i.producto.price * i.cantidad, 0);
  }

  removeItem(id: number): void {
    this.items = this.items.filter((i) => i.producto.id !== id);
  }

  clearCart(): void {
    this.items = [];
  }

  actualizar(): void {
    this.items = [...this.items]; // fuerza actualización con Angular
  }

  getTotalCantidad(): number {
    return this.items.reduce((suma, i) => suma + i.cantidad, 0);
  }
}
