import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos } from '../servicios/productos';
import { Carrito } from '../servicios/carrito';
import { Producto } from '../modelos/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
  imports: [CommonModule, FormsModule]
})
export class Catalogo implements OnInit {
  categorias = ['electronics', 'jewelry', 'mens clothing', 'women clothing'];
  categoriaSel = 'all';
  texto = '';

  productos: Producto[] = [];
  filtrados: Producto[] = [];

  mostrarDetalle = false;
  prodSel?: Producto;

  private prodSrv = inject(Productos);
  private carrito = inject(Carrito);

  ngOnInit() {
    this.prodSrv.getProductos().subscribe(d => { this.productos = d; this.filtrar(); });
  }

  filtrar() {
    let tmp = this.productos;
    if (this.categoriaSel !== 'all') tmp = tmp.filter(p => p.categoria === this.categoriaSel);
    if (this.texto.trim()) tmp = tmp.filter(p => p.nombre.toLowerCase().includes(this.texto.toLowerCase()));
    this.filtrados = tmp;
  }

  verDetalles(p: Producto) { this.prodSel = p; this.mostrarDetalle = true; }
  cerrarDetalle()        { this.mostrarDetalle = false; }
  agregarCarrito() {
    if (this.prodSel) { this.carrito.agregar(this.prodSel); this.cerrarDetalle(); }
  }
}
