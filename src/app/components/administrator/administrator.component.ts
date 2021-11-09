import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryEto } from 'src/app/model/CategoryEto';
import { PlaceCto } from 'src/app/model/PlaceCto';
import { AdministratorService } from 'src/app/services/administrator.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceEto } from '../../model/PlaceEto';
import { SortUtil } from '../../utils/SortUtil';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  searchForm: FormGroup;
  public displayedColumns: string[] = ['name', 'street', 'buildingNumber', 'capacity', 'category', 'actions'];
  public dataSource: MatTableDataSource<PlaceCto> = new MatTableDataSource();
  public isSpinnerDisplayed = false;
  searchIn$: EventEmitter<number> = new EventEmitter();
  private readonly unsubscribe = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private placeService: PlaceService,
    private administratorService: AdministratorService,
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
  ) { 
    this.searchForm = this._formBuilder.group({
      placeName: [''],
      placeCategory: ['']
    });
  }

  ngOnInit(): void {
    this.onSpinnerDisplayed();
    this.loadsAllPlaces();
    this.loadCategories();
  }

  showAllPlaces() {
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByCategory(category: CategoryEto) {
    this.dataSource.filter = (category.name as string).trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadCategories() {
    this.categoryService.findAllCategories();
  }

  private loadsAllPlaces() {
    this.placeService.findAllPlaces();

    this.placeService.places$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((places: PlaceCto[]) => {
        this.dataSource = new MatTableDataSource(places);
        this.observeOnFilterPredicateChange();
      });
  }

  private onSpinnerDisplayed() {
    // this.subscription.add(this.serviceService.spinnerData.subscribe((isSpinnerDisplayed: boolean) => {
    //   this.isSpinnerDisplayed = isSpinnerDisplayed;
    // }));
  }

  private observeOnFilterPredicateChange() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.searchIn$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        console.log(value)
        this.dataSource.filterPredicate = value == 1 ? this.prepareFilterPredicateForName() : this.prepareFilterPredicateForCategory()
      })
  }

  applyFilter(event: Event) {
    this.searchIn$.next(1);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  searchFilter(placeName: string | undefined) {
    this.searchIn$.next(0);
    this.dataSource.filter = (placeName as string).trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private prepareFilterPredicateForName(): (data: PlaceCto, filter: string) => boolean {
    this.searchForm.controls['placeCategory'].setValue('');
    return (data: PlaceCto, filter: string) => {
      return (data.name as string).toLocaleLowerCase().includes(filter);
    };
  }

  private prepareFilterPredicateForCategory(): (data: PlaceCto, filter: string) => boolean {
    this.searchForm.controls['placeName'].setValue('');
    return (data: PlaceCto, filter: string) => {
      return (data.categoryName as string).toLocaleLowerCase().includes(filter);
    };
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") {
      this.dataSource.data = data;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "name":
          return SortUtil.compare(a.name, b.name, isAsc);
        case "categoryName":
          return SortUtil.compare(a.categoryName, b.categoryName, isAsc);
        // case "locale":
        //   return SortUtil.compare(this.translate.instant("services." + a.locale), this.translate.instant("services." + b.locale), isAsc);
        // case "basePrice":
        //   return SortUtil.compare(a.basePrice, b.basePrice, isAsc);
        // case "indicators":
        //   return SortUtil.compare(a.indicatorEtoList[0].name, b.indicatorEtoList[1].name, isAsc);
        default:
          return 0;
      }
    });
  }

  addPlace() {
    this.administratorService.addPlace();
  }

  modifyPlace(place: PlaceEto) {
    this.administratorService.modifyPlace(place);
  }

  deletePlace(place: PlaceEto) {
    this.administratorService.deletePlace(place);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();    
  }
}
