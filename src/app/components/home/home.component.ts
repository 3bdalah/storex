import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/servics/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:any[]=[];
  categories:any[]=[];
  searchLetters:string="";
  constructor(private _productsServies:ProductsService){}
  ngOnInit(): void {
    this._productsServies.getProducts().subscribe({
      next:(response)=>{this.products = response.data;console.log('products',this.products)},
      error:()=>{},
    });

    this._productsServies.getCategories().subscribe({
      next:(cat)=>{this.categories = cat.data;console.log(cat.data);
      },
      error:(error)=>console.log(error),
    })
    
  }

  getProductImageUrl(product: any): string {
    
    const imageUrl = product.slice(2, -2);
    return JSON.parse(imageUrl)[0];
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
