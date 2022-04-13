import { ProductService } from './../../shared/services/product.service';
import { switchMap } from 'rxjs';
import { IProduct } from './../../shared/interfaces/auth.interfaces';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  public editForm!: FormGroup;
  public product!: IProduct;
  public submitted: boolean = false;

  constructor(
    private activRoute: ActivatedRoute,
    private productServ: ProductService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activRoute.params
      .pipe(
        switchMap((params) => {
          return this.productServ.getById(params['id']);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.editForm = new FormGroup({
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          photo: new FormControl(this.product.photo, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
          priceDiscont: new FormControl(
            this.product.price,
            Validators.required
          ),
        });
      });
  }
  public submit() {
    if (this.editForm.invalid) {
      return;
    }
    this.submitted = true;
    const product = {};
    this.productServ
      .update({
        ...this.product,
        type: this.editForm.value.type,
        title: this.editForm.value.title,
        photo: this.editForm.value.photo,
        info: this.editForm.value.info,
        price: this.editForm.value.price,
        priceDiscont: this.editForm.value.priceDiscont,
        date: new Date(),
      })
      .subscribe((res) => {
        this.submitted = false;
        this.route.navigate(['/admin', 'dashboard']);
      });
  }
}
