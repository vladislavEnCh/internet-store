import { AuthPageModule } from './auth-page/auth-page.module';
import { reducer, metaReducers } from './store/reducers/index';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AuthInterseptor } from './shared/auth.interseptor';

import { SortingPipe } from './shared/pipes/sorting.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgImageSliderModule } from 'ng-image-slider';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { AboutComponent } from './help-pages/about/about.component';
import { DiliveryComponent } from './help-pages/dilivery/dilivery.component';
import { BlogComponent } from './help-pages/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductComponent,
    SortingPipe,
    FooterComponent,
    CatalogPageComponent,
    AboutComponent,
    DiliveryComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    AuthPageModule,

    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducer, {
      metaReducers,
    }),
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
