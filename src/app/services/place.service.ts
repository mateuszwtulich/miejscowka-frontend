import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OccupancyTo } from '../model/OccupancyTo';
import { PlaceCto } from '../model/PlaceCto';
import { PlaceTo } from '../model/PlaceTo';
import { RestServiceUrl } from '../utils/RestServiceUrl';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private readonly lastOccupancyTo: OccupancyTo = {
    placeId: 0,
    numberOfPeople: 13,
    percentageOccupancy: 50
  }

  private readonly unsubscribe = new Subject();
  private placesData = new BehaviorSubject<PlaceCto[]>([]);
  public places$ = this.placesData.asObservable();
  private spinnerDataSource = new BehaviorSubject(false);
  public spinner$ = this.spinnerDataSource.asObservable();
  
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) { }

  public findAllPlaces() {
    this.spinnerDataSource.next(true);
    this.http.get<PlaceCto[]>(`${RestServiceUrl.PLACE_ENDPOINT}`)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (places: PlaceCto[]) => {
        this.spinnerDataSource.next(false);
        this.placesData.next(places);
      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      }
    )
  }

  public addPlace(placeTo: PlaceTo) {
    this.spinnerDataSource.next(true);
    this.http.post<PlaceCto>(`${RestServiceUrl.PLACE_ENDPOINT}`, placeTo)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (place: PlaceCto) => {
        this.spinnerDataSource.next(false);
        const places = this.placesData.value.concat(place);
        this.placesData.next(places);
      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      }
    )
  }

  public updatePlace(placeTo: PlaceTo, placeId: number) {
    this.spinnerDataSource.next(true);
    this.http.put<PlaceCto>(`${RestServiceUrl.PLACE_ENDPOINT}/` + placeId, placeTo)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (placeCto: PlaceCto) => {
        this.spinnerDataSource.next(false);
        this.placesData.next(this.placesData.value.map(place => {
          if (place.id === placeId) {
            return placeCto;
          }
          return place;
        }))
      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      })
  }

  public deletePlace(placeId: number) {
    this.spinnerDataSource.next(true);
    this.http.delete(`${RestServiceUrl.PLACE_ENDPOINT}/` + placeId)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      () => {
        this.spinnerDataSource.next(false);
        const places = this.placesData.value.filter(place => place.id !== placeId);
        this.placesData.next(places);      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      }
    )
  }
}
