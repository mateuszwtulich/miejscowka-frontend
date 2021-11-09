import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OccupancyTo } from '../model/OccupancyTo';
import { OpeningHoursTo } from '../model/OpeningHoursTo';
import { PlaceCto } from '../model/PlaceCto';
import { PlaceTo } from '../model/PlaceTo';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private readonly openingHoursTo: OpeningHoursTo = {
    mondayOpeningHour: new Date().toString(),
    mondayClosingHour: new Date().toString(),
    tuesdayOpeningHour: new Date().toString(),
    tuesdayClosingHour: new Date().toString(),
    wednesdayClosingHour: new Date().toString(),
    wednesdayOpeningHour: new Date().toString(),
    thursdayClosingHour: new Date().toString(),
    thursdayOpeningHour: new Date().toString(),
    fridayClosingHour: new Date().toString(),
    fridayOpeningHour: new Date().toString(),
    saturdayClosingHour: new Date().toString(),
    saturdayOpeningHour: new Date().toString(),
    sundayOpeningHour: new Date().toString(),
    sundayClosingHour: new Date().toString(),
  }

  private readonly lastOccupancyTo: OccupancyTo = {
    placeId: 0,
    numberOfPeople: 13,
    percentageOccupancy: 50
  }

  private readonly lowOccupancyTo: OccupancyTo = {
    placeId: 0,
    numberOfPeople: 4,
    percentageOccupancy: 20
  }

  private readonly highOccupancyTo: OccupancyTo = {
    placeId: 0,
    numberOfPeople: 20,
    percentageOccupancy: 90
  }

  private readonly PLACES: PlaceCto[] = [
    {id: 1, name: "Cybermachina", description: "Cybermachina - pub inny niż wszystkie! Gry planszowe i na konsole bez dodatkowych opłat, wyśmienite piwo i smaczne drinki, a nad dobrą zabawą czuwa zespół pomocnych barmanów. Wstęp tylko dla pełnoletnich!", buildingNumber: "52", apartmentNumber: "", capacity: 23,
     street: "Szczytnicka", openingHoursTo: this.openingHoursTo, lastOccupancyTo: this.lastOccupancyTo, categoryName: "Bar", imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/0d/0b/25/33/getlstd-property-photo.jpg", isFavourite: true},
    {id: 2, name: "Remont", description: "Pyszne dania i przekąski w stałym menu oraz codziennie inna zupa, danie dnia. Do tego dobre piwo, luźna atmosfera, stylowe wnętrze i studencki klimat.", buildingNumber: "18-20", apartmentNumber: "", capacity: 26,
     street: "plac Grunwaldzki", openingHoursTo: this.openingHoursTo, lastOccupancyTo: this.lowOccupancyTo, categoryName: "Bar/restauracja", imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/11/aa/29/05/remont-bar-w-nowej-odslonie.jpg", isFavourite: false},
    {id: 3, name: "Pizzeria Bravo", description: "Pizzeria BRAVO - przestronny lokal z klimatem, skierowany między innymi do studentów. Słyniemy z wyśmienitej i zawsze gorącej pizzy, na którą nie czeka się długo i nie płaci dużo. Znajdujemy się w samym sercu Placu Grunwaldzkiego.", buildingNumber: "18", apartmentNumber: "", capacity: 26,
     street: "plac Grunwaldzki", openingHoursTo: this.openingHoursTo, lastOccupancyTo: this.highOccupancyTo, categoryName: "Restauracja", imageUrl: "https://www.restu.pl/ir/restaurant/b79/b7977eaed6507a318c907a59a6839f26.jpg", isFavourite: false},
    {id: 4, name: "Fuga Mundi", description: "Klub składa się z 5 sal: sali głównej, gdzie usytuowany jest bar i 7 stołów pool-bilardowych, salę poolową z 8 stołami do gry, salę snookerową z 3 stołami do gry snookera, salkę VIP ze stołem firmy RASSON oraz salę muzyczną (obecnie znajdują się tu dodatkowe 2 stoły do gry w pool-bilarda).", buildingNumber: "12-14", apartmentNumber: "", capacity: 26,
     street: "plac Grunwaldzki", openingHoursTo: this.openingHoursTo, lastOccupancyTo: this.lastOccupancyTo, categoryName: "Billard Club", imageUrl: "https://lh3.googleusercontent.com/proxy/_FmI-Z1ERzHBeXhfnUEi7wl9CKTEK7GwumSlDxTgy3arElWnYk_NTsCM7O5bq_XtB0s64YBQDB2EYixvcFF45QXSL3S3Ow", isFavourite: true},
    {id: 5, name: "Basen GEM", description: "Zapraszamy do korzystania z obiektów sportowych na terenie Hotelu Gem: basen kryty, korty tenisowe, hala wielofunkcyjna, sala fitness, boiska piłkarskie, siatkówka plażowa.", buildingNumber: "2B", apartmentNumber: "", capacity: 26,
     street: "Józefa Mianowskiego", openingHoursTo: this.openingHoursTo, lastOccupancyTo: this.highOccupancyTo, categoryName: "Basen", imageUrl: "http://www.gemhotel.pl/sites/default/files/20141208/DSC05252.jpg", isFavourite: true}];

  private placesData = new BehaviorSubject<PlaceCto[]>([]);
  public places$ = this.placesData.asObservable();
  
  constructor() { }

  public findAllPlaces() {
    this.placesData.next(this.PLACES);
  }

  public addPlace(placeTo: PlaceTo) {
    const placeCto = {
      id: 0,
      name: placeTo.name,
      capacity: placeTo.capacity,
      description: placeTo.description,
      street: placeTo.street,
      buildingNumber: placeTo.buildingNumber,
      apartmentNumber: placeTo.apartmentNumber,
      categoryName: "Test",
      openingHoursTo: placeTo.openingHoursTo,
      lastOccupancyTo: this.lastOccupancyTo
    } as PlaceCto
    const places = this.placesData.value.concat(placeCto);
    this.placesData.next(places);
  }

  public updatePlace(placeTo: PlaceTo, placeId: number) {

  }

  public deletePlace(placeId: number) {
    const places = this.placesData.value.filter(place => place.id !== placeId);
    this.placesData.next(places);
  }
}
