import { ProductsService } from 'src/app/servics/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/servics/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/servics/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID:any;
  srcIMG:any;
  productData:any;
  constructor(private _activeRoute:ActivatedRoute,private _productsServ:ProductsService,private _cartService:CartService,private toastr: ToastrService,private _wishlist:WishlistService){};
  ngOnInit():void{
    this._activeRoute.paramMap.subscribe((param)=>{
      this.productID = param.get('id');
      console.log(param.get('id'));
    });

    this._productsServ.getProductDetails(this.productID).subscribe( {
      next:(r)=>{
        console.log("data product",r)
        this.productData = r.data;
        this.srcIMG = this.productData?.imageCover;
        console.log(this.productData);
      }
    })
  }


  addToCart(productId:string){
    this._cartService.addToCart(productId).subscribe({
      next:(res)=>{console.log("response add to cart",res);
       if(res.status === "success")this.toastr.success("Added To Cart");
       this._cartService.numberOfCartItems.next(res.numOfCartItems)
      },
      error: (err)=>{console.log(err);
      }
    })      
 }

 
 addToWish(productId:string){
   this._wishlist.addToWish(productId).subscribe({
     next:(res)=>{console.log("response add to wish",res);
      if(res.status === "success")this.toastr.success("Added To wish list");
      this._wishlist.numberOfWishListItems.next(res.data.length)
     },
     error: (err)=>{console.log(err);
     }
   })      
}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Next', 'Prev'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
