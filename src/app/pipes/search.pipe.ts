import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, searchTerm: string): any {
    return products.filter((product :any)=> product.title.toLocaleLowerCase().includes(searchTerm));
  }

}
