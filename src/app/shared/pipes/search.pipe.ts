import { IProduct } from './../interfaces/auth.interfaces';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], productName: ''): any {
    if (!productName.trim()) {
      return products;
    }
    return products.filter((product) => {
      return product.title?.toLowerCase().includes(productName.toLowerCase());
    });
  }
}
