import {Component, Input} from '@angular/core';
import { DurationEditorDataModel } from './DurationEditorDataModel';


/**
 * Custom editor for duration value
 */
@Component({
  selector: 'app-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.scss']
})
export class DurationEditorComponent {

  /**
   * Model value, initially null
   */
  @Input()
  model: DurationEditorDataModel = new DurationEditorDataModel();

  /**
   * The flag indicates if the editor should be disabled
   */
  @Input()
  disabled = false;

  /**
   * Validates the duration editor values, prevents from typing negative values
   */
  validate() {
    if (this.model.days < 0) {
      this.model.days = 0;
    }
    if (this.model.hours < 0) {
      this.model.hours = 0;
    }
    if (this.model.minutes < 0) {
      this.model.minutes = 0;
    }
  }
}
