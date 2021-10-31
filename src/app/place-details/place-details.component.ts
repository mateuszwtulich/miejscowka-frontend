import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScaleType } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  single: any[] = [];
  multi: any[] = [];
  view: number[] = [700, 400];

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

  isFavorite = false;
  columnNumber = 2;
  ratio='6:7';
  public isSpinnerDisplayed = false;

  constructor(
    public dialogRef: MatDialogRef<PlaceDetailsComponent>,
  ) {
    Object.assign(this, { single })
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
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
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
