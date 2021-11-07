import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DeletePlaceComponent } from 'src/app/delete-place/delete-place.component';
import { AdministratorService } from 'src/app/services/administrator.service';
import { PlaceEto } from '../../model/PlaceEto';
import { SortUtil } from '../../utils/SortUtil';
import { AddPlaceComponent } from '../add-place/add-place.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  searchForm: FormGroup;
  public displayedColumns: string[] = ['name', 'street', 'buildingNumber', 'capacity', 'category', 'actions'];
  public dataSource: MatTableDataSource<PlaceEto> = new MatTableDataSource([new PlaceEto("Cybermachina", "2312312312222", "23", 30, "Bar/Restauracja", "sdasdasd")]);
  public isSpinnerDisplayed = false;
  public subscription = new Subscription();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    // private serviceService: ServiceService,
    private administratorService: AdministratorService,
    private _formBuilder: FormBuilder,
  ) { 
    this.searchForm = this._formBuilder.group({
      placeName: [''],
      placeCategory: ['']
    });
    this.setDataSourceSettings();
  }

  ngOnInit(): void {
    this.onSpinnerDisplayed();
    this.loadsAllPlaces();
  }

  private loadsAllPlaces() {
    // this.serviceService.getAllServices();

    // this.subscription.add(this.serviceService.servicesData.subscribe(
    //   (services) => {
    //     this.dataSource = new MatTableDataSource(services);
    //     this.setDataSourceSettings();
    //   }))
  }

  private onSpinnerDisplayed() {
    // this.subscription.add(this.serviceService.spinnerData.subscribe((isSpinnerDisplayed: boolean) => {
    //   this.isSpinnerDisplayed = isSpinnerDisplayed;
    // }));
  }

  private setDataSourceSettings() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.prepareFilterPredicate();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private prepareFilterPredicate(): (data: PlaceEto, filter: string) => boolean {
    return (data: PlaceEto, filter: string) => {
      // let inIndicators: boolean = !!data.indicatorEtoList.find(indicator => indicator.name.toLocaleLowerCase().includes(filter));

      // return data.name.toLocaleLowerCase().includes(filter) || inIndicators ||
      //   this.translate.instant("table." + data.locale).toLocaleLowerCase().includes(filter) || data.basePrice.toFixed().includes(filter);
      return false;
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
    // const dialogRef = this.dialog.open(ModifyServiceComponent, { data: service, height: '55%', width: '45%' });
  }

  deletePlace(place: PlaceEto) {
    this.administratorService.deletePlace(place);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
