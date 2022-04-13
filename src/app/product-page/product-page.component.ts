import { ProductService } from './../shared/services/product.service';
import { IProduct } from './../shared/interfaces/auth.interfaces';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  public product$!: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productService.getById(params['id']);
        })
      )
      .subscribe((res) => (this.product$ = res));
  }
  addToCart(product: IProduct) {
    this.productService.addToCart(product);
  }
}
