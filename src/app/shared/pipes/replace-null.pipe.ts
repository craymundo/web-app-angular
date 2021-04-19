import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNull'
})
export class ReplaceNullPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'undefined' || value === null) {
      return '-';
    }

    return value;
  }

}
