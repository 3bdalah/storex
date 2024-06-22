import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { ProductsService } from 'src/app/servics/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/servics/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/servics/wishlist.service';
// import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:any[]=[];
  categories:any[]=[];
  currentPage :number=1;
  searchLetters:string="";
  pageSize = 10; 
  totalPages: number =0 ; 
 loading :boolean =false;
  constructor(private _productsServies:ProductsService,private _cartService: CartService,private toastr: ToastrService,private _wishlist:WishlistService){}
  ngOnInit(): void {
   
    this.getProducts(this.currentPage);
    this._productsServies.getCategories().subscribe({
      next:(cat)=>{this.categories = cat.data;console.log(cat.data);
        
      },
      error:(error)=>console.log(error),
    });

    this._productsServies.getBrands().subscribe({
      next: (brands)=> {console.log('brands',brands.data)}
      }
    )
    
  }

  @ViewChild('productImageRef') productImageRef: ElementRef<HTMLImageElement> | undefined;


  getProducts(pageNumber:number){
    this.loading=true;
    this._productsServies.getProducts(pageNumber).subscribe({
      next:(response)=>{this.products = response.data;console.log('products',response)
        
        this.currentPage = response.metadata.currentPage;
        this.totalPages = response.metadata.numberOfPages;  
        console.log("meta data",response.metadata)   
        this.generatePages(this.totalPages);
        this.loading=false;
      },
      error:()=>{},
    });
  }
  getProductImageUrl(product: any): string {
    
    const imageUrl = product.slice(2, -2);
    return JSON.parse(imageUrl)[0];
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
  changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getProducts(pageNumber);
    }
  }

  generatePages(totalPages: number): number[] {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeImage(images: string[], imageElement: any) {    
    imageElement.src = images[1];
    imageElement.addEventListener('mouseout', () => {
      imageElement.src = images[0];
    });
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
