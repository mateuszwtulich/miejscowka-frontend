import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScaleType } from '@swimlane/ngx-charts';
import { PlaceCto } from 'src/app/model/PlaceCto';
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
  ratio='6:7';
  public isSpinnerDisplayed = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlaceDetailsComponent>,
  ) {
    Object.assign(this, { single });
    this.place = data.place;
   }

   onSelect(event: any) {
    console.log(event);
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

  toggleFavorite() {
    this.place.favourite = !this.place.favourite;
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
