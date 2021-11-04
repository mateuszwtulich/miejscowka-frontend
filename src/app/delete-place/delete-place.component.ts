import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-place',
  templateUrl: './delete-place.component.html',
  styleUrls: ['./delete-place.component.scss']
})
export class DeletePlaceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletePlaceComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}