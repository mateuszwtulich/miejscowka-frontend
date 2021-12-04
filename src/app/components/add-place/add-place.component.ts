import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OpeningHoursTo } from 'src/app/model/OpeningHoursTo';
import { PlaceTo } from 'src/app/model/PlaceTo';
import { CategoryService } from 'src/app/services/category.service';
import { ImgurService } from 'src/app/services/imgur.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;
  files: File[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private imgurService: ImgurService,
    private placeService: PlaceService,
    private sanitizer: DomSanitizer,
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

  uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files as FileList;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.files.push(element)
    }
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1);
  }

  addPlace() {
    if (this.placeForm.valid && this.files[0]) {
      this.imgurService.addImage(this.files[0]).subscribe(
        (data: any) => {
      const placeTo = {
        name: this.placeForm.controls["name"].value,
        capacity: this.placeForm.controls["capacity"].value,
        description: this.placeForm.controls["description"].value,
        street: this.placeForm.controls["street"].value,
        buildingNumber: this.placeForm.controls["buildingNumber"].value,
        apartmentNumber: this.placeForm.controls["apartmentNumber"].value,
        categoryId: this.placeForm.controls["category"].value.id,
        imageUrl: data.link,
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

      this.placeService.addPlace(placeTo);
      this.dialogRef.close();
    });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
