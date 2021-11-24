import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ApplicationPermission } from 'src/app/model/ApplicationPermission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {

  constructor(
    private permissionService: NgxPermissionsService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let hasPermission = true;
    switch (route?.routeConfig?.path) {
      case 'administrator': {
        this.permissionService.hasPermission([
          ApplicationPermission.A_CRUD_SUPER,
        ]).then((perm: boolean) => {
          hasPermission = this.hasPermission(perm);
        });
        break;
      }
    }
    return hasPermission;
  }

  private hasPermission(hasPermission: boolean): boolean {
    if (!hasPermission) {
      this.router.navigateByUrl('home');
    }
    return hasPermission;
  }

}