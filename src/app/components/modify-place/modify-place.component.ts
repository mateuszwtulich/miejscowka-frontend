import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryEto } from 'src/app/model/CategoryEto';
import { OpeningHoursTo } from 'src/app/model/OpeningHoursTo';
import { PlaceTo } from 'src/app/model/PlaceTo';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-modify-place',
  templateUrl: './modify-place.component.html',
  styleUrls: ['./modify-place.component.scss']
})
export class ModifyPlaceComponent implements OnInit {

  placeForm: FormGroup;
  private readonly unsubscribe = new Subject();
  categories: CategoryEto[] | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private placeService: PlaceService,
    public dialogRef: MatDialogRef<ModifyPlaceComponent>){
      this.placeForm = this._formBuilder.group({
        name: [this.data.placeCto.name, Validators.required],
        description: [this.data.placeCto.description],
        category: [this.data.placeCto.category, Validators.required],
        capacity: [this.data.placeCto.capacity, Validators.required],
        street: [this.data.placeCto.street, Validators.required],
        buildingNumber: [this.data.placeCto.buildingNumber, Validators.required],
        apartmentNumber: [this.data.placeCto.apartmentNumber],
        imageUrl: [this.data.placeCto.imageUrl, Validators.required],
        mondayFrom: [this.getMondayOpeningHour(), Validators.required],
        mondayTo: [this.getMondayClosingHour(), Validators.required],
        tuesdayFrom: [this.getTuesdayOpeningHour(), Validators.required],
        tuesdayTo: [this.getTuesdayClosingHour(), Validators.required],
        wednesdayFrom: [this.getWednesdayOpeningHour(), Validators.required],
        wednesdayTo: [this.getWednesdayClosingHour(), Validators.required],
        thursdayFrom: [this.getThursdayOpeningHour(), Validators.required],
        thursdayTo: [this.getThursdayClosingHour(), Validators.required],
        fridayFrom: [this.getFridayOpeningHour(), Validators.required],
        fridayTo: [this.getFridayClosingHour(), Validators.required],
        saturdayFrom: [this.getSaturdayOpeningHour(), Validators.required],
        saturdayTo: [this.getSaturdayClosingHour(), Validators.required],
        sundayFrom: [this.getSundayOpeningHour(), Validators.required],
        sundayTo: [this.getSundayClosingHour(), Validators.required],
      });
    }
  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.findAllCategories();

    this.categoryService.categories$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((categories: CategoryEto[]) => {
        this.categories = categories;
        this.uploadCategory();
      });
  }

  private uploadCategory() {
    this.placeForm.controls['category']
      .patchValue((this.categories as CategoryEto[]).find(category => category.name === this.data.placeCto.categoryName));
  }

  updatePlace() {
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
          mondayOpeningHour: ('0' + this.placeForm.controls["mondayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["mondayFrom"].value.getMinutes().toString()).slice(-2),
          mondayClosingHour: ('0' + this.placeForm.controls["mondayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["mondayTo"].value.getMinutes().toString()).slice(-2),
          tuesdayOpeningHour: ('0' + this.placeForm.controls["tuesdayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["tuesdayFrom"].value.getMinutes().toString()).slice(-2),
          tuesdayClosingHour: ('0' + this.placeForm.controls["tuesdayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["tuesdayTo"].value.getMinutes().toString()).slice(-2),
          wednesdayOpeningHour: ('0' + this.placeForm.controls["wednesdayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["wednesdayFrom"].value.getMinutes().toString()).slice(-2),
          wednesdayClosingHour: ('0' + this.placeForm.controls["wednesdayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["wednesdayTo"].value.getMinutes().toString()).slice(-2),
          thursdayOpeningHour: ('0' + this.placeForm.controls["thursdayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["thursdayFrom"].value.getMinutes().toString()).slice(-2),
          thursdayClosingHour: ('0' + this.placeForm.controls["thursdayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["thursdayTo"].value.getMinutes().toString()).slice(-2),
          fridayOpeningHour: ('0' + this.placeForm.controls["fridayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["fridayFrom"].value.getMinutes().toString()).slice(-2),
          fridayClosingHour: ('0' + this.placeForm.controls["fridayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["fridayTo"].value.getMinutes().toString()).slice(-2),
          saturdayOpeningHour: ('0' + this.placeForm.controls["saturdayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["saturdayFrom"].value.getMinutes().toString()).slice(-2),
          saturdayClosingHour: ('0' + this.placeForm.controls["saturdayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["saturdayTo"].value.getMinutes().toString()).slice(-2),
          sundayOpeningHour: ('0' + this.placeForm.controls["sundayFrom"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["sundayFrom"].value.getMinutes().toString()).slice(-2),
          sundayClosingHour: ('0' + this.placeForm.controls["sundayTo"].value.getHours().toString()).slice(-2) + ':' + ('0' + this.placeForm.controls["sundayTo"].value.getMinutes().toString()).slice(-2),
        } as OpeningHoursTo
      } as PlaceTo

      this.placeService.updatePlace(placeTo, this.data.placeCto.id);
      this.dialogRef.close();
    }
  }

  getMondayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.mondayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.mondayOpeningHour.split(':')[1]);
    return date;
  }

  getMondayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.mondayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.mondayClosingHour.split(':')[1]);
    return date;
  }

  getTuesdayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.tuesdayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.tuesdayOpeningHour.split(':')[1]);
    return date;
  }

  getTuesdayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.tuesdayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.tuesdayClosingHour.split(':')[1]);
    return date;
  }

  getWednesdayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.wednesdayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.wednesdayOpeningHour.split(':')[1]);
    return date;
  }

  getWednesdayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.wednesdayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.wednesdayClosingHour.split(':')[1]);
    return date;
  }

  getThursdayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.thursdayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.thursdayOpeningHour.split(':')[1]);
    return date;
  }

  getThursdayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.thursdayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.thursdayClosingHour.split(':')[1]);
    return date;
  }

  getFridayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.fridayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.fridayOpeningHour.split(':')[1]);
    return date;
  }

  getFridayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.fridayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.fridayClosingHour.split(':')[1]);
    return date;
  }

  getSaturdayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.saturdayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.saturdayOpeningHour.split(':')[1]);
    return date;
  }

  getSaturdayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.saturdayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.saturdayClosingHour.split(':')[1]);
    return date;
  }

  getSundayOpeningHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.sundayOpeningHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.sundayOpeningHour.split(':')[1]);
    return date;
  }

  getSundayClosingHour() {
    const date = new Date();
    date.setHours(this.data.placeCto.openingHoursTo.sundayClosingHour.split(':')[0]);
    date.setMinutes(this.data.placeCto.openingHoursTo.sundayClosingHour.split(':')[1]);
    return date;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();    
  }
}
