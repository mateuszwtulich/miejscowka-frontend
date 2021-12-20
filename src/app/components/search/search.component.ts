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
import { LocalStorageService } from '../cache/localStorage.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { ApplicationPermission } from 'src/app/model/ApplicationPermission';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  columnNumber = 3;
  ratio='2:3';
  private allPlaces: PlaceCto[] = [];
  filteredPlaces: PlaceCto[] = [];
  favouritePlaces: PlaceCto[] = [];
  private filteredString: string = '';
  private beforeKeydownPlaces: PlaceCto[] = [];

  private readonly unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public placeService: PlaceService,
    public sidnavService: SidenavService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private permissionService: NgxPermissionsService,
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
    this.observeOnFavourite();
    this.observeOnLogout();
    this.observeOnRefresh();
  }

  loadCategories() {
    this.categoryService.findAllCategories();
  }

  loadAllPlaces() {
    this.permissionService.hasPermission([ApplicationPermission.GET_FAVOURITE])
    .then(hasPermission => {
      if (hasPermission) {
        this.placeService.findAllPlacesWithUserInfo(this.localStorageService.getUserId());
      } else {
        this.placeService.findAllPlaces();
      }
    })
  }

  observeOnLogout() {
    this.sidnavService.logout$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => {
      this.updatePlacesAndClearFilters();
    });
  }

  observeOnRefresh() {
    this.sidnavService.refresh$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => {
      this.updatePlacesAndClearFilters();
    });
  }

  private updatePlacesAndClearFilters() {
    this.loadAllPlaces();
    this.favouritePlaces = [];
    this.searchForm.get('placeName')?.setValue('');
    this.searchForm.get('placeCategory')?.setValue('');
  }

  observeOnFavourite() {
    this.sidnavService.favourite$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => {
      this.filteredPlaces = this.allPlaces.filter(place => place.favourite);
      this.favouritePlaces = this.filteredPlaces;
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

  observeOnPlaces() {
    this.placeService.places$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((places) => {
        this.allPlaces = places as PlaceCto[];
        this.allPlaces.forEach(place => {
          place.imageUrl = "data:image/jpeg;base64," + place.imageBase64;
        })
        this.filteredPlaces = places;
      });
  }

  showAllPlaces() {
    if (this.favouritePlaces.length > 0) {
      this.filteredPlaces = this.favouritePlaces;
    } else {
      this.filteredPlaces = this.allPlaces;
    }
    this.searchForm.get('placeName')?.setValue('');
  }

  filterByCategory(category: CategoryEto) {
    if (this.favouritePlaces.length > 0) {
      this.filteredPlaces = this.favouritePlaces.filter(place => place.categoryName === category.name);
    } else {
      this.filteredPlaces = this.allPlaces.filter(place => place.categoryName === category.name);
    }
    this.searchForm.get('placeName')?.setValue('');
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

  removeFromFavourites(place: PlaceCto) {
    this.permissionService.hasPermission([ApplicationPermission.GET_FAVOURITE])
      .then(hasPermission => {
        if (hasPermission) {
          this.placeService.deleteFromFavourites(this.localStorageService.getUserId(), place.id);
        } else {
          this.router.navigateByUrl("/login");
        }
      })
  }

  addToFavourites(place: PlaceCto) {
    this.permissionService.hasPermission([ApplicationPermission.GET_FAVOURITE])
    .then(hasPermission => {
      if (hasPermission) {
        this.placeService.addToFavourites(this.localStorageService.getUserId(), place.id);
      } else {
        this.router.navigateByUrl("/login");
      }
    })
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