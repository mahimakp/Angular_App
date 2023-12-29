import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, direction: number): any[] {
    if (!array || !field) {
      return array;
    }

    return array.sort((a, b) => {
      const aValue = a[field].toLowerCase();
      const bValue = b[field].toLowerCase();

      if (aValue < bValue) {
        return -direction;
      } else if (aValue > bValue) {
        return direction;
      } else {
        return 0;
      }
    });
  }
}
