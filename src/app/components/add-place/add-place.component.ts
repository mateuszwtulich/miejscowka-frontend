import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpeningHoursTo } from 'src/app/model/OpeningHoursTo';
import { PlaceTo } from 'src/app/model/PlaceTo';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private placeService: PlaceService,
    public dialogRef: MatDialogRef<AddPlaceComponent>){
      this.placeForm = this._formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        category: ['', Validators.required],
        capacity: ['', Validators.required],
        street: ['', Validators.required],
        buildingNumber: ['', Validators.required],
        apartmentNumber: [''],
        imageUrl: ['test', Validators.required],
        mondayFrom: [new Date(), Validators.required],
        mondayTo: [new Date(), Validators.required],
        tuesdayFrom: [new Date(), Validators.required],
        tuesdayTo: [new Date(), Validators.required],
        wednesdayFrom: [new Date(), Validators.required],
        wednesdayTo: [new Date(), Validators.required],
        thursdayFrom: [new Date(), Validators.required],
        thursdayTo: [new Date(), Validators.required],
        fridayFrom: [new Date(), Validators.required],
        fridayTo: [new Date(), Validators.required],
        saturdayFrom: [new Date(), Validators.required],
        saturdayTo: [new Date(), Validators.required],
        sundayFrom: [new Date(), Validators.required],
        sundayTo: [new Date(), Validators.required],
      });
     }
  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.findAllCategories();
  }

  addPlace() {
    if (this.placeForm.valid) {
      const placeTo = {
        name: this.placeForm.controls["name"].value,
        capacity: this.placeForm.controls["capacity"].value,
        description: this.placeForm.controls["description"].value,
        street: this.placeForm.controls["street"].value,
        buildingNumber: this.placeForm.controls["buildingNumber"].value,
        apartmentNumber: this.placeForm.controls["apartmentNumber"].value,
        categoryId: this.placeForm.controls["category"].value.id,
        imageUrl: this.placeForm.controls["imageUrl"].value,
        openingHoursTo: {
          mondayOpeningHour: this.placeForm.controls["mondayFrom"].value.getTime().toString(),
          mondayClosingHour: this.placeForm.controls["mondayTo"].value.getTime().toString(),
          tuesdayOpeningHour: this.placeForm.controls["tuesdayFrom"].value.getTime().toString(),
          tuesdayClosingHour: this.placeForm.controls["tuesdayTo"].value.getTime().toString(),
          wednesdayOpeningHour: this.placeForm.controls["wednesdayFrom"].value.getTime().toString(),
          wednesdayClosingHour: this.placeForm.controls["wednesdayTo"].value.getTime().toString(),
          thursdayOpeningHour: this.placeForm.controls["thursdayFrom"].value.getTime().toString(),
          thursdayClosingHour: this.placeForm.controls["thursdayTo"].value.getTime().toString(),
          fridayOpeningHour: this.placeForm.controls["fridayFrom"].value.getTime().toString(),
          fridayClosingHour: this.placeForm.controls["fridayTo"].value.getTime().toString(),
          saturdayOpeningHour: this.placeForm.controls["saturdayFrom"].value.getTime().toString(),
          saturdayClosingHour: this.placeForm.controls["saturdayTo"].value.getTime().toString(),
          sundayOpeningHour: this.placeForm.controls["sundayFrom"].value.getTime().toString(),
          sundayClosingHour: this.placeForm.controls["sundayTo"].value.getTime().toString(),
        } as OpeningHoursTo
      } as PlaceTo

      this.placeService.addPlace(placeTo);
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
