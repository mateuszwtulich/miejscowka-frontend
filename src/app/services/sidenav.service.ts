import { EventEmitter, Injectable } from '@angular/core';
import { PlaceCto } from '../model/PlaceCto';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  sortBy$: EventEmitter<boolean> = new EventEmitter();
  refresh$: EventEmitter<any> = new EventEmitter();
  favourite$: EventEmitter<any> = new EventEmitter();
  logout$: EventEmitter<any> = new EventEmitter();
  constructor() { }

  sortByOccupancy(placesToSort: any, desc: boolean): PlaceCto[]{
    return placesToSort.sort((placeA: any, placeB: any) => desc ? 
      placeA?.lastOccupancyTo?.percentageOccupancy - placeB?.lastOccupancyTo?.percentageOccupancy
      : placeB?.lastOccupancyTo?.percentageOccupancy - placeA?.lastOccupancyTo?.percentageOccupancy);
  }
}
