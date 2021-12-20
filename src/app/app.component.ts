import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miejscowka-frontend';
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer){
      this.matIconRegistry.addSvgIcon(
        `add_circle`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/add_circle_white_24dp.svg")
      ).addSvgIcon(
        `admin_panel_settings`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/admin_panel_settings_white_24dp.svg")
      ).addSvgIcon(
        `all_inclusive`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/all_inclusive_white_24dp.svg")
      ).addSvgIcon(
        `close`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/close_black_24dp.svg")
      ).addSvgIcon(
        `delete`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/delete_black_24dp.svg")
      ).addSvgIcon(
        `edit`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/edit_black_24dp.svg")
      ).addSvgIcon(
        `favorite`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/favorite_black_24dp.svg")
      ).addSvgIcon(
        `favorite_border`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/favorite_border_black_24dp.svg")
      ).addSvgIcon(
        `home`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/home_white_24dp.svg")
      ).addSvgIcon(
        `login`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/login_white_24dp.svg")
      ).addSvgIcon(
        `logout`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logout_white_24dp.svg")
      ).addSvgIcon(
        `menu`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menu_white_24dp.svg")
      ).addSvgIcon(
        `search`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/search_black_24dp.svg")
      ).addSvgIcon(
        `trending_down`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/trending_down_black_24dp.svg")
      ).addSvgIcon(
        `trending_flat`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/trending_flat_black_24dp.svg")
      ).addSvgIcon(
        `trending_up`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/trending_up_black_24dp.svg")
      ).addSvgIcon(
        `visibility`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/visibility_black_24dp.svg")
      ).addSvgIcon(
        `visibility_off`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/visibility_off_black_24dp.svg")
      ).addSvgIcon(
        `trending_up_white`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/trending_up_white_24dp.svg")
      ).addSvgIcon(
        `trending_down_white`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/trending_down_white_24dp.svg")
      ).addSvgIcon(
        `favorite_white`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/favorite_white_24dp.svg")
      );    
  }
}
