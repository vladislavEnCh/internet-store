import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public products$!: any;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((res) => (this.products$ = res));
  }
  setType(type: any) {
    if (type !== 'Cart') {
      // this.router.navigate(['/'], {
      //   queryParams: {
      //     type: this.type,
      //   },
      // });
      this.productService.setType(type);
    }
  }
  public imageObject = [
    {
      image: '../../assets/images/main-page/slider-img.jpg',
      thumbImage: '../../assets/images/main-page/slider-img.jpg',
    },
    {
      image: '../../assets/images/main-page/slide-2.jpg',
      thumbImage: '../../assets/images/main-page/slide-2.jpg',
    },
  ];
  public photo: any = '../../assets/images/main-page/iMac.png';
  public popularProducts: any = [
    {
      photo: '../../assets/images/main-page/iMac.png',
      title: 'PC',
    },
    {
      photo: '../../assets/images/main-page/Macbook Pro 13 Space.png',
      title: 'Laptop',
    },
    {
      photo: '../../assets/images/main-page/appleWatch.png',
      title: 'Watch',
    },
    {
      photo: '../../assets/images/main-page/iPhone 13.png',
      title: 'Phone',
    },
    {
      photo: '../../assets/images/main-page/airPods.png',
      title: 'Accessories',
    },
  ];
  public sugestionProducts: any = [
    {
      photo: '../../assets/images/main-page/monitorLg.png',
      title: 'Monitors',
    },
    {
      photo: '../../assets/images/main-page/teleisionSamsung.png',
      title: 'Televisions',
    },
    {
      photo: '../../assets/images/main-page/playStation.png',
      title: 'Game Station',
    },
    {
      photo: '../../assets/images/main-page/fridgeBeko.png',
      title: 'Fridge',
    },
    {
      photo: '../../assets/images/main-page/microwave.png',
      title: 'Microwave',
    },
  ];
}
