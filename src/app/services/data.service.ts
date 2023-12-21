import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRoot } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts() {

    return this.http.get<ProductRoot>('https://dummyjson.com/products')
      .pipe(
        map(response => response.products)
      );

  }
}
