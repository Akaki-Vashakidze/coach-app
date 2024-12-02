import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dots',
  standalone: true,
})
export class DotsPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== 'string') return '';
    return value.replace(/./g, '*');
  }
}
