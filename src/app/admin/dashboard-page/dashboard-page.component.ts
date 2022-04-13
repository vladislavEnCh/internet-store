import { ProductService } from '../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  public products!: Array<any>;
  public productName: any = '';

  constructor(private productServ: ProductService) {}

  ngOnInit(): void {
    this.productServ.getAll().subscribe((products) => {
      this.products = products;
    });
  }
  remove(id: any) {
    this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
