import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { NgxPermissionsService } from 'ngx-permissions';
import { ApplicationPermission } from 'src/app/model/ApplicationPermission';
import { PlaceCto } from 'src/app/model/PlaceCto';
import { PlaceService } from 'src/app/services/place.service';
import { LocalStorageService } from '../cache/localStorage.service';
import { single } from './data';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  single: any[] = [];
  view: number[] = [700, 400];
  place: PlaceCto;
  trendingUp = false;
  trendingDown = false;
  trendingFlat = false;

  // options
  schemeType = ScaleType.Ordinal;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Godzina';
  showYAxisLabel = true;
  yAxisLabel = 'Zatłoczenie';

  columnNumber = 2;
  ratio='1:2';
  public isSpinnerDisplayed = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public placeService: PlaceService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private permissionService: NgxPermissionsService,
    public dialogRef: MatDialogRef<PlaceDetailsComponent>,
  ) {
    Object.assign(this, { single });
    this.place = data.place;
    this.findTrend();
   }

  findTrend() {
    this.placeService.findTrend().then(() => {
      this.trendingUp = true;
    })
  }

  onSelect(event: any) {
  }

  ngOnInit(): void {
    this.setApropriateSize();
  }
  
  onResize(event: any) {
    this.setApropriateSize();
  }

  private setApropriateSize() {
    this.columnNumber = (window.innerWidth <= 1400) ? 1 : 2;
    this.ratio = (window.innerWidth <= 500) ? '2:3' : '6:7';
  }

  removeFromFavourites(place: PlaceCto) {
    this.permissionService.hasPermission([ApplicationPermission.GET_FAVOURITE])
      .then(hasPermission => {
        if (hasPermission) {
          this.placeService.deleteFromFavourites(this.localStorageService.getUserId(), place.id);
          place.favourite = false;
        } else {
          this.closeDialog();
          this.router.navigateByUrl("/login");
        }
      })
  }

  addToFavourites(place: PlaceCto) {
    this.permissionService.hasPermission([ApplicationPermission.GET_FAVOURITE])
    .then(hasPermission => {
      if (hasPermission) {
        this.placeService.addToFavourites(this.localStorageService.getUserId(), place.id);
        place.favourite = true;
      } else {
        this.closeDialog();
        this.router.navigateByUrl("/login");
      }
    })
  }

  isOpen(): boolean {
    return this.isGreaterThanOpen() && this.isLowerThanClosed();
  }

  isClosed(): boolean {
    return !this.isOpen();
  }

  isGreaterThanOpen() {
    const openHour = (this.getOpeningHourOfToday() as string).split(':')[0];
    const openMinutes = (this.getOpeningHourOfToday() as string).split(':')[1];
    return (openHour < new Date().getHours().toString() || (openHour == new Date().getHours().toString() && openMinutes < new Date().getMinutes().toString()));
  }

  isLowerThanClosed() {
    const closeHour = (this.getClosingHourOfToday() as string).split(':')[0];
    const closeMinutes = (this.getClosingHourOfToday() as string).split(':')[1]; 
    return (closeHour > new Date().getHours().toString() || (closeHour == new Date().getHours().toString() && closeMinutes > new Date().getMinutes().toString()));
  }

  private getOpeningHourOfToday(): any {
    const dayOfWeek = new Date().getDay();

    if (dayOfWeek == 1) {
      return this.place.openingHoursTo?.mondayOpeningHour;
    }
    else if (dayOfWeek == 2) {
      return this.place.openingHoursTo?.tuesdayOpeningHour;
    }
    else if (dayOfWeek == 3) {
      return this.place.openingHoursTo?.wednesdayOpeningHour;
    }
    else if (dayOfWeek == 4) {
      return this.place.openingHoursTo?.thursdayOpeningHour;
    }
    else if (dayOfWeek == 5) {
      return this.place.openingHoursTo?.fridayOpeningHour;
    }
    else if (dayOfWeek == 6) {
      return this.place.openingHoursTo?.saturdayOpeningHour;
    }
    else if (dayOfWeek == 0) {
      return this.place.openingHoursTo?.sundayOpeningHour;
    }
  }

  private getClosingHourOfToday(): any {
    const dayOfWeek = new Date().getDay();

    if (dayOfWeek == 1) {
      return this.place.openingHoursTo?.mondayClosingHour;
    }
    else if (dayOfWeek == 2) {
      return this.place.openingHoursTo?.tuesdayClosingHour;
    }
    else if (dayOfWeek == 3) {
      return this.place.openingHoursTo?.wednesdayClosingHour;
    }
    else if (dayOfWeek == 4) {
      return this.place.openingHoursTo?.thursdayClosingHour;
    }
    else if (dayOfWeek == 5) {
      return this.place.openingHoursTo?.fridayClosingHour;
    }
    else if (dayOfWeek == 6) {
      return this.place.openingHoursTo?.saturdayClosingHour;
    }
    else if (dayOfWeek == 0) {
      return this.place.openingHoursTo?.sundayClosingHour;
    }
  } 

  private onSpinnerDisplayed() {
    // this.subscription.add(this.userService.spinnerData.subscribe((isSpinnerDisplayed: boolean) => {
    //   this.isSpinnerDisplayed = isSpinnerDisplayed;
    // }));
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
