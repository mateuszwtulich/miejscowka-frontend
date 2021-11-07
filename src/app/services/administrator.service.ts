import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaceComponent } from '../components/add-place/add-place.component';
import { DeletePlaceComponent } from '../delete-place/delete-place.component';
import { PlaceEto } from '../model/PlaceEto';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(
    public dialog: MatDialog,
  ) { }

  addPlace() {
    const dialogRef = this.dialog.open(AddPlaceComponent, { 
      minHeight: '75%', 
      minWidth: '45%',
      maxHeight: '100vh',
      height: 'fit-content'
    });
  }

  modifyPlace(place: PlaceEto) {
    const dialogRef = this.dialog.open(AddPlaceComponent, { 
      minHeight: '75%', 
      minWidth: '45%',
      maxHeight: '100vh',
      height: 'fit-content'
    });
    // const dialogRef = this.dialog.open(ModifyServiceComponent, { data: service, height: '55%', width: '45%' });
  }

  deletePlace(place: PlaceEto) {
    const dialogRef = this.dialog.open(DeletePlaceComponent, { 
      minHeight: '20%', 
      minWidth: '35%',
      maxHeight: '100vh',
      height: 'fit-content'
    });

    dialogRef.afterClosed().subscribe((isDecisionPositive: boolean) => {
      if (isDecisionPositive) {
        // this.serviceService.deleteService(service.id);
      }
    });
  }
}
