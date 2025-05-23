import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ANSI',
  pure: true,
  standalone: false
})
export class ANSIPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(9, value.length - 5);
  }

}
