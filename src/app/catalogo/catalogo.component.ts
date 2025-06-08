import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../servicios/ApiService';
import { CommonModule } from '@angular/common';
import { Carrito } from '../servicios/carrito';
import { Producto } from '../modelos/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class Catalogo implements OnInit {
  productos: any[] = [];
  paginaActual: number = 1;
  productosPorPagina: number = 6;
  productoSeleccionado: any = null;

  private apiService = inject(ApiService);
  private carrito = inject(Carrito);

  get productosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return this.productos.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  ngOnInit() {
    this.apiService.getProducts().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error cargando productos:', err),
    });
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  verDetalles(id: number): void {
    this.apiService.getProduct(id).subscribe({
      next: (data) => {
        this.productoSeleccionado = data;
        const modalElement = document.getElementById('modalProducto');
        if (modalElement && (window as any).bootstrap?.Modal) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => console.error('Error al obtener producto:', err),
    });
  }

  agregarAlCarrito(producto: any): void {
    const prodFormateado: Producto = {
      id: producto.id,
      nombre: producto.title, // usa title porque es como viene de la API
      precio: producto.price,
      descripcion: producto.description,
      categoria: producto.category,
      imagen: producto.image,
    };

    this.carrito.agregar(prodFormateado);
  }
}
