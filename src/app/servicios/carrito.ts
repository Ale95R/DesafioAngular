import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Producto } from '../modelos/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class Carrito {
  private readonly key = 'carrito';
  private items: ItemCarrito[] = [];

  /** true sólo cuando el código corre en el navegador */
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if (this.isBrowser) {
      this.cargar();
    }
  }

  /* ======== getters ======== */
  getItems(): ItemCarrito[]     { return this.items; }
  totalCantidad(): number       { return this.items.reduce((s,i)=>s+i.cantidad,0); }
  totalPrecio(): number         { return this.items.reduce((s,i)=>s+i.cantidad*i.producto.precio,0); }

  /* ======== API ======== */
  agregar(prod: Producto) {
    const found = this.items.find(i => i.producto.id === prod.id);
    found ? found.cantidad++ : this.items.push({ producto: prod, cantidad: 1 });
    this.guardar();
  }

  actualizar() {
    this.items = this.items.filter(i => i.cantidad > 0);
    this.guardar();
  }

  eliminar(id: number) {
    this.items = this.items.filter(i => i.producto.id !== id);
    this.guardar();
  }

  limpiar() {
    this.items = [];
    this.guardar();
  }

  /* ======== persistencia ======== */
  private guardar() {
    if (this.isBrowser) {
      try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch { }
    }
  }
  private cargar() {
    if (this.isBrowser) {
      try {
        const data = localStorage.getItem(this.key);
        if (data) this.items = JSON.parse(data);
      } catch { }
    }
  }
}
