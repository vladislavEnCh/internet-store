import { map } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  public createOrder(order: any) {
    return this.http.post(`${environment.fireBaseUrl}/orders.json`, order).pipe(
      map((res: any) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date),
        };
      })
    );
  }

  public getAll() {
    return this.http.get(`${environment.fireBaseUrl}/orders.json`).pipe(
      map((res: any) => {
        return Object.keys(res).map((key: any) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }

  public remove(id: any) {
    return this.http.delete(`${environment.fireBaseUrl}/orders/${id}.json`);
  }
}
