import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  mondayFrom: moment.Moment | undefined;
  placeForm: FormGroup;
  public subscription = new Subscription();
  public isSpinnerDisplayed: boolean = false;
  categories = [{name: "Bar"}, {name:"Obiekt sportowy"}];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPlaceComponent>){
      this.placeForm = this._formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        category: ['', Validators.required],
        capacity: ['', Validators.required],
        street: ['', Validators.required],
        buildingNumber: ['', Validators.required],
        apartmentNumber: ['', Validators.required],
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
    this.loadsAllData();
    this.onSpinnerDisplayed();
  }

  private loadsAllData() {
    // Promise.all([
    //   this.userService.getAllUsers(),
    //   this.serviceService.getAllServices()
    // ]).then(() => {
    //   this.subscription.add(combineLatest([
    //     this.userService.usersData,
    //     this.serviceService.servicesData,
    //   ]).subscribe(([users, services]) => {
    //     this.users = users;
    //     this.services = services;
    //   }))
    // })
  }

  private onSpinnerDisplayed() {
    // this.subscription.add(this.userService.spinnerData.subscribe((isSpinnerDisplayed: boolean) => {
    //   this.isSpinnerDisplayed = isSpinnerDisplayed;
    // }));
  }

  addPlace() {
    // if (this.nameControl.valid && this.descriptionControl.valid && this.cityControl.valid && this.streetControl.valid &&
    //   this.buildingNumberControl.valid && this.postalCodeControl.valid && this.userControl.valid &&
    //   this.servicesControl.valid && this.startDateControl.valid && this.endDateControl.valid) {

    //   this.priceIndicatorToList = this.servicesControl.value.indicatorEtoList.map((indicator: IndicatorEto) => {
    //     return {
    //       bookingId: null,
    //       indicatorId: indicator.id,
    //       amount: indicator.baseAmount,
    //       price: 0
    //     }
    //   });

    //   let bookingTo: BookingTo = {
    //     name: this.nameControl.value,
    //     description: this.descriptionControl.value,
    //     addressTo: {
    //       city: this.cityControl.value,
    //       street: this.streetControl.value,
    //       buildingNumber: this.buildingNumberControl.value,
    //       apartmentNumber: this.apartmentNumberControl.value,
    //       postalCode: this.postalCodeControl.value
    //     },
    //     serviceId: this.servicesControl.value.id,
    //     userId: this.userControl.value.id,
    //     start: formatDate(new Date(this.startDateControl.value), "yyyy-MM-dd", 'en-GB'),
    //     end: formatDate(new Date(this.endDateControl.value), "yyyy-MM-dd", 'en-GB'),
    //     priceIndicatorToList: this.priceIndicatorToList
    //   }

    //   this.bookingService.createBooking(bookingTo).then(() => {
    //     this.dialogRef.close();
    //   });
    // }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
