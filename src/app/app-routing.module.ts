import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [{
  path:"",redirectTo:'home',pathMatch:"full"
},{
  path:"home",component:HomeComponent,title:"Home"
},
{
  path:"about",canActivate:[authGuard],component:AboutComponent,title:"about"
},
{
  path:"categorsies",canActivate:[authGuard],component:CategoriesComponent,title:"Categorsies"
},
{
  path:"productdetails/:id",component:ProductDetailsComponent,title:"product info"
},
{
  path:"cart",canActivate:[authGuard],component:CartComponent,title:"Home"
},
{
  path:"login",component:LoginComponent,title:"login"
},
{
  path:"checkout",component:CheckoutComponent,title:"checkout"
},
{
  path:"register",component:RegisterComponent,title:"register"
},{
  path:"setting",loadChildren:()=> import('./settings/settings.module').then((model)=> model.SettingsModule)
},
{
  path:"**",component:NotfoundComponent,title:"Not Found"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
