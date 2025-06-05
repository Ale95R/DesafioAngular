import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({ providedIn: 'root' })
export class Productos {
  private url = 'assets/productos.json';
  constructor(private http: HttpClient) {}
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
}