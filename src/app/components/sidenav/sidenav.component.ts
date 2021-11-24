import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { ApplicationPermission } from 'src/app/model/ApplicationPermission';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AdministratorService } from '../../services/administrator.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  /**
   * Shows additional information
   */
  isHomePage = true;
  isAdminPage = false;
  isLogged = false;
  showFiller = false;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private administratorService: AdministratorService,
    private sidenavService: SidenavService,
    private permissionsService: NgxPermissionsService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.onNavigationChange();
  }

  private onNavigationChange(){
    this.subscription.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.isHomePage = event?.url === "/home" || event?.url === "/";
       this.isAdminPage = event?.url === "/administrator";
      }
    }));
  }

  sortPlacesDesc() {
    this.sidenavService.sortBy$.next(true);
  }

  sortPlacesAsc() {
    this.sidenavService.sortBy$.next(false);
  }

  refresh() {
    this.sidenavService.refresh$.next();
  }
  
  /**
   * Handles toggling of side menu
   */
  onToggle() {
    this.showFiller = !this.showFiller;
    this.dispatchGlobalResizeEvent();
  }

  loadFavouritePlaces() {
    this.permissionsService.hasPermission([ApplicationPermission.GET_FAVOURITE])
      .then(hasPermission => {
        if (hasPermission) {
          this.sidenavService.favourite$.next();
        } else {
          this.router.navigateByUrl("/login");
        }
      })
  }

  navigateToAdminPage() {
      this.router.navigateByUrl("/administrator");
  }

  private dispatchGlobalResizeEvent() {
    setTimeout(() =>
        window.dispatchEvent(new Event('resize')),
      700);
  }

  logout() {
    this.authService.logout();
    this.sidenavService.logout$.next();
    this.router.navigateByUrl("/login");
  }

  addNewPlace() {
    this.administratorService.addPlace();
  }
}
