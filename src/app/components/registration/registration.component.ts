import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Validation from '../../utils/Validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public hide = true;
  private readonly unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
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

  register() {
    if (this.registerForm.valid) {

      let userTo = {
        name: this.registerForm.controls['name'].value,
        surname: this.registerForm.controls['surname'].value,
        password: this.registerForm.controls['password'].value,
        email: this.registerForm.controls['email'].value,
      }
      this.userService.createUser(userTo);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();     
  }
}