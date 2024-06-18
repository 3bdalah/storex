import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarize'
})
export class SummarizePipe implements PipeTransform {
  transform(value: string, limit: number = 30): string {
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + '...';
  }

}
