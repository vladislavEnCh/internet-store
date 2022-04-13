import { Observable } from 'rxjs';
import { ProductService } from './../services/product.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { totalPriceSelector } from 'src/app/store/reducers/cartReducer';
// import { blackIconCart } from '../../../assets/images/main-page/shopping-cart white.png';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public totalPrice: Observable<number> = this.store.select(totalPriceSelector);
  public burgerFlag: boolean = false;

  constructor(
    private router: Router,
    private productServ: ProductService,
    public store: Store
  ) {}

  ngOnInit(): void {}
  setType(type: any) {
    if (type !== 'Cart') {
      // this.router.navigate(['/'], {
      //   queryParams: {
      //     type: this.type,
      //   },
      // });
      this.productServ.setType(type);
    }
  }
  burger() {
    this.burgerFlag = !this.burgerFlag;
  }
}
