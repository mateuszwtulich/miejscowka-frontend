import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import Validation from '../../utils/Validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  // public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // public nameFormControl = new FormControl('', Validators.required);
  // public surnameFormControl = new FormControl('', Validators.required);
  // public password = new FormControl('', Validators.required);
  // public confirmPassword = new FormControl('', Validators.required);
  // public passwordForm = this._formBuilder.group({
  //   password: ['', [Validators.required]],
  //   confirmPassword: ['']
  // }, { validator: this.checkPasswords })

  public registerForm: FormGroup;
  public isSpinnerDisplayed = false;

  public hide = true;
  subscritpion: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    // private userService: UsersService,
    // private snackbar: MatSnackBar
  ) {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    })
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.f.email.hasError('required')) {
      return 'Wyamgane';
    }

    return this.f.email.hasError('email') ? 'Nieodpowiedni adres e-mail' : '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  checkPasswords(group: FormGroup) {
    // let pass = group.get('password').value;
    // let confirmPass = group.get('confirmPassword').value;

    // return pass === confirmPass ? null : { notSame: true }
  }

  register() {
    if (this.f.name.valid && this.f.surname.valid && this.f.email.valid) {
      this.isSpinnerDisplayed = true;

      // let userTo = {
      //   name: this.nameFormControl.value,
      //   surname: this.surnameFormControl.value,
      //   accountTo: {
      //     password: this.passwordForm.get('password').value,
      //     email: this.emailFormControl.value,
      //   },
      //   roleId: BasicRole.getClientRoleId()
      // }

      // this.subscritpion.add(this.userService.createUser(userTo).subscribe((userEto) => {
      //   this.snackbar.open(this.translate.instant('registration.check-mailbox'));
      //   this.isSpinnerDisplayed = false;
      // },
      //   (e) => {
      //     this.snackbar.open(this.translate.instant('registration.error' + " " + e.error.message));
      //     this.isSpinnerDisplayed = false;
      //   }))
    }
  }

  ngOnDestroy() {
    this.subscritpion.unsubscribe();
  }
}