import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'dateTransform',
  standalone: true,
})
export class DateTransform implements PipeTransform {
  transform(value: Timestamp, ...args: unknown[]): Date {
    return value.toDate();
  }
}
