import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/ApiService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class Catalogo implements OnInit {
  productos: any[] = []; // Todos los productos
  paginaActual: number = 1; // Página actual
  productosPorPagina: number = 6; // Cantidad por página
  productoSeleccionado: any = null;

  constructor(private apiService: ApiService) {}

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

        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const modalElement = document.getElementById('modalProducto');
          if (modalElement && (window as any).bootstrap?.Modal) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
          }
        }
      },
      error: (err) => console.error('Error al obtener producto:', err),
    });
  }
}
