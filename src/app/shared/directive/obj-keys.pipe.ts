import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objKeys'
})
export class ObjKeysPipe implements PipeTransform {

  transform(value: any): any {
    return Object.keys(value);
  }

}
