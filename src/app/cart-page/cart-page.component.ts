import { OrderService } from './../shared/services/order.service';
import { IProduct } from './../shared/interfaces/auth.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Store } from '@ngrx/store';
import { totalPrice } from '../store/reducers/cartReducer';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  public cartProducts: any[] = [];
  public totalPrice: number = 0;
  public paymentsForm!: FormGroup;
  public submitted: boolean = false;
  public added: string = '';

  constructor(
    private productService: ProductService,
    private orderServ: OrderService,
    public store: Store
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProduct;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
      this.store.dispatch(totalPrice({ totalPrice: this.totalPrice }));
    }
    this.paymentsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });
  }
  public submit() {
    if (this.paymentsForm.invalid) {
      return;
    }
    this.submitted = true;
    const order = {
      name: this.paymentsForm.value.name,
      phone: this.paymentsForm.value.phone,
      adress: this.paymentsForm.value.adress,
      ordersProduct: this.cartProducts,
      payment: this.paymentsForm.value.payment,
      price: this.totalPrice,

      date: new Date(),
    };
    this.orderServ.createOrder(order).subscribe((res) => {
      this.paymentsForm.reset();
      this.submitted = false;
      this.added = 'your order is done, wait for our call';
      // this.route.navigate(['/']);
    });
  }
  public deleteProduct(product: any) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
