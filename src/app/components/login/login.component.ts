import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { ApplicationPermission } from 'src/app/model/ApplicationPermission';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Credentials } from 'src/app/security/Authorization';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public hide: boolean;
  private credentials: Credentials | undefined;
  private subscription = new Subscription();
  public isSpinnerDisplayed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private permissionsService: NgxPermissionsService,
    private router: Router,
  ) {
    this.hide = true;
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription.add(this.authService.spinnerData.subscribe((isDisplayed) => {
      this.isSpinnerDisplayed = isDisplayed;
    }));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  authenticate(): void {
    if (this.f.password.valid && this.f.username.valid) {
      this.isSpinnerDisplayed = true;
      this.credentials = {
        username: this.f.username.value,
        password: this.f.password.value,
      }
      this.authService.authenticate(this.credentials).then(() => {
        const s = this.permissionsService.getPermissions();
        this.permissionsService.hasPermission(ApplicationPermission.A_CRUD_SUPER).then((result) => {
          if (result) {
            this.router.navigate(['administrator']);
          } else {
              this.router.navigate(['home']);
          }
        })
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}