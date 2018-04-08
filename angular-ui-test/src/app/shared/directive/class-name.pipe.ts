import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'className'
})
export class ClassNamePipe implements PipeTransform {
  transform(value: string): any {
    return value.trim().toLowerCase().replace(/\s/ig, '-');
  }

}
