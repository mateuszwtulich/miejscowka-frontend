import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CategoryEto } from 'src/app/model/CategoryEto';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceDetailsComponent } from '../place-details/place-details.component';
import { takeUntil } from 'rxjs/operators';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceCto } from 'src/app/model/PlaceCto';
import { SidenavService } from 'src/app/services/sidenav.service';

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
  private allPlaces: PlaceCto[] = [];
  filteredPlaces: PlaceCto[] = [];
  private filteredString: string = '';
  private beforeKeydownPlaces: PlaceCto[] = [];

  private readonly unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public placeService: PlaceService,
    public sidnavService: SidenavService,
    protected dialog: MatDialog) {
      this.searchForm = this._formBuilder.group({
        placeName: [''],
        placeCategory: ['']
      });
     }

  ngOnInit(): void {
    this.setApropriateSize();
    this.loadCategories();
    this.loadAllPlaces();
    this.observeOnPlaces();
    this.observeOnSorting();
    this.observeOnRefresh();
  }

  loadCategories() {
    this.categoryService.findAllCategories();
  }

  observeOnRefresh() {
    this.sidnavService.refresh$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => {
      this.loadAllPlaces();
      this.searchForm.get('placeName')?.setValue('');
      this.searchForm.get('placeCategory')?.setValue('');
    });
  }

  observeOnSorting() {
    this.sidnavService.sortBy$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((desc: boolean) => {
      this.filteredPlaces = this.sidnavService.sortByOccupancy(this.filteredPlaces, desc);
    })
  }

  onKeyDown($event: KeyboardEvent) {

    if ($event.key == 'Backspace') {
      this.filteredString = this.filteredString.substring(0, this.filteredString.length - 1);
      this.filteredPlaces = this.beforeKeydownPlaces;
    } else {
      this.filteredString = this.searchForm.get('placeName')?.value + $event.key;
    }

    if (this.filteredString.length === 1 && $event.key !== 'Backspace') {
      this.beforeKeydownPlaces = this.filteredPlaces;
    }
    this.filteredPlaces = this.filteredPlaces.filter(place => place.name?.toLocaleLowerCase().includes(this.filteredString.toLocaleLowerCase()));
  }

  loadAllPlaces() {
    this.placeService.findAllPlaces();
  }

  observeOnPlaces() {
    this.placeService.places$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((places) => {
        this.allPlaces = places as PlaceCto[];
        this.filteredPlaces = places;
      });
  }

  showAllPlaces() {
    this.filteredPlaces = this.allPlaces;
    this.searchForm.get('placeName')?.setValue('');
  }

  filterByCategory(category: CategoryEto) {
    this.filteredPlaces = this.allPlaces.filter(place => place.categoryName === category.name);
    this.searchForm.get('placeName')?.setValue('');
  }

  toggleFavorite(place: PlaceCto) {
    place.favourite = !place.favourite;

    //TODO post to backend
  }

  onResize(event: any) {
    this.setApropriateSize();
  }

  openPlaceDetailsDialog(placeCto: PlaceCto) {
    this.dialog.open(PlaceDetailsComponent, {
      width: '100vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: 'fit-content',
      data: {
        place: placeCto
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();  
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