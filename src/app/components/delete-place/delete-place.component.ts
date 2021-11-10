import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-delete-place',
  templateUrl: './delete-place.component.html',
  styleUrls: ['./delete-place.component.scss']
})
export class DeletePlaceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeletePlaceComponent>,
    private placeService: PlaceService
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.placeService.deletePlace(this.data.id);
    this.dialogRef.close();
  }
}