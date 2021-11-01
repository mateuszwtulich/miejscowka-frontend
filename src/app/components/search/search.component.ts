import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceDetailsComponent } from '../place-details/place-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  isFavorite = false;
  columnNumber = 3;
  ratio='2:3';
  constructor(
    private _formBuilder: FormBuilder,
    protected dialog: MatDialog) {
      this.searchForm = this._formBuilder.group({
        placeName: [''],
        placeCategory: ['']
      });
     }

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
      width: '100vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: 'fit-content'
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
