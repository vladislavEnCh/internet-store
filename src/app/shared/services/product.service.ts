import { environment } from './../../../environments/environment';
import { IProduct } from './../interfaces/auth.interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public type: any = '';
  public cartProduct: IProduct[] = [];
  constructor(private http: HttpClient) {}

  public createProduct(product: any) {
    return this.http
      .post(`${environment.fireBaseUrl}/products.json`, product)
      .pipe(
        map((res: any) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }

  public getAll() {
    return this.http.get(`${environment.fireBaseUrl}/products.json`).pipe(
      map((res: any) => {
        return Object.keys(res).map((key: any) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }
  public getById(id: any) {
    return this.http.get(`${environment.fireBaseUrl}/products/${id}.json`).pipe(
      map((res: IProduct) => {
        return {
          ...res,
          id,
          date: new Date(res.date),
        };
      })
    );
  }
  public remove(id: any) {
    return this.http.delete(`${environment.fireBaseUrl}/products/${id}.json`);
  }
  public update(product: IProduct) {
    return this.http.patch(
      `${environment.fireBaseUrl}/products/${product.id}.json`,
      product
    );
  }
  setType(type: any) {
    this.type = type;
  }
  addToCart(product: IProduct) {
    this.cartProduct.push(product);
  }
}
