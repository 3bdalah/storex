import { ProductsService } from 'src/app/servics/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID:any;
  srcIMG:any;
  productData:any;
  constructor(private _activeRoute:ActivatedRoute,private _productsServ:ProductsService){};
  ngOnInit():void{
    this._activeRoute.paramMap.subscribe((param)=>{
      this.productID = param.get('id');
      console.log(param.get('id'));
    });

    this._productsServ.getProductDetails(this.productID).subscribe( {
      next:(r)=>{
        console.log("data product",r)
        this.productData = r;
        this.srcIMG = this.productData?.images[0];
        console.log(this.productData);
      }
    })
  }


  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
