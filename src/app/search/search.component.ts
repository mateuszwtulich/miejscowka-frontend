import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceDetailsComponent } from '../place-details/place-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isFavorite = false;
  columnNumber = 3;
  ratio='2:3';
  constructor(
    protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.setApropriateSize();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onResize(event: any) {
    this.setApropriateSize();
  }

  openPlaceDetailsDialog() {
    this.dialog.open(PlaceDetailsComponent, {
      width: '130vw',
      maxHeight: '100vh'
    });
  }

  private setApropriateSize() {
    let temporaryColumnNumber = 1;
    temporaryColumnNumber = (window.innerWidth <= 1200) ? 2 : 3;

    if (window.innerWidth <= 1200) {
      temporaryColumnNumber = (window.innerWidth <= 800) ? 1 : 2;
      this.ratio = (window.innerWidth <= 500) ? '5:9' : '3:4';
    }
    this.columnNumber = temporaryColumnNumber;
  }
}
