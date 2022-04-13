import { IProduct } from './../interfaces/auth.interfaces';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: IProduct[], type = ''): any {
    if (!type.trim()) {
      return products;
    }
    return products.filter((product) => {
      return product.type == type;
    });
  }
}
