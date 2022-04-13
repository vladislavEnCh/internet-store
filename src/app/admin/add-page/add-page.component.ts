import { ProductService } from '../../shared/services/product.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  public addProductForm!: FormGroup;
  public submitted: boolean = false;

  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      priceDiscont: new FormControl(null, Validators.required),
    });
  }

  public submit() {
    if (this.addProductForm.invalid) {
      return;
    }
    this.submitted = true;
    const product = {
      type: this.addProductForm.value.type,
      title: this.addProductForm.value.title,
      photo: this.addProductForm.value.photo,
      info: this.addProductForm.value.info,
      price: this.addProductForm.value.price,
      priceDiscont: this.addProductForm.value.priceDiscont,
      date: new Date(),
    };
    this.productService.createProduct(product).subscribe((res) => {
      this.addProductForm.reset();
      this.submitted = false;
      // this.route.navigate(['/']);
    });
  }
}
