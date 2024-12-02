import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shorten',
    standalone:true
})
export class ShortenPipe implements PipeTransform {
    transform(value: any,shortNum:number) {
        if(value && value.length > shortNum) {
            return value.substr(0,shortNum) + '...'
        } else {
            return value;
        }
    }
}