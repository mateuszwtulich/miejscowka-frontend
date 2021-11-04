import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { DurationEditorDataModel } from './DurationEditorDataModel';

/**
 * Custom ag grid editor for duration field.
 */
@Component({
  selector: 'app-duration-editor-search-form',
  templateUrl: './duration-editor-search-from.component.html',
  styleUrls: ['./duration-editor-search-from.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationEditorSearchFromComponent),
      multi: true
    }
  ]
})
export class DurationEditorSearchFromComponent implements ControlValueAccessor {

  /**
   * The flag indicates if the editor should be disabled
   */
  @Input()
  disabled = false;

  /**
   * Model value, initially null
   */
  model: DurationEditorDataModel = new DurationEditorDataModel;

  private onModelChange: ((value: any) => void) | undefined;

  /**
   * {@inheritDoc}
   */
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  /**
   * {@inheritDoc}
   */
  registerOnTouched(fn: any): void {
    // the touched functionality is redundant here
  }

  /**
   * {@inheritDoc}
   */
  writeValue(model: DurationEditorDataModel): void {
    this.model = model;
    if (this.onModelChange) {
      this.onModelChange(model);
    }
  }
}

