import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit {
  public orders!: Array<any>;
  public productName: any = '';

  constructor(private orderServ: OrderService) {}

  ngOnInit(): void {
    this.orderServ.getAll().subscribe((order) => {
      this.orders = order;
    });
  }
  remove(id: any) {
    this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter((product) => product.id !== id);
    });
  }
}
