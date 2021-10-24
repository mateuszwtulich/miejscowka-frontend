import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isFavorite = false;
  columnNumber = 3;
  ratio='2:3';
  constructor() { }

  ngOnInit(): void {
    this.setApropriateSize();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onResize(event: any) {
    this.setApropriateSize();
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
