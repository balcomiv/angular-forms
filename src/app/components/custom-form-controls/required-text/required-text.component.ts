import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @description Requirements
 *  Support everything a reqular text field does (implement ControlValueAccessor)
 *  Required validation
 *  Error message that shows when control is invalid
 *    for any reason
 */
@Component({
  selector: 'app-required-text',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.scss'],
  //  Provide as a ValueAccessor so form control directives (like ngModel && formControlName)
  //  can actually see the value accessor (I.E. ngModel will inject ValueAccessor token, so if
  //  it's not in the injection chain, we will have an issue)
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RequiredTextComponent, // Hoisting
    },
  ],
})
export class RequiredTextComponent implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef | undefined;
  // onChange: (value: any) => void;
  // onTouched: (value: any) => void;

  disabled = false;
  // tslint:disable-next-line: no-any
  onChange: any = () => {};
  // tslint:disable-next-line: no-any
  onTouched: any = () => {};

  /**
   * Write value to view
   * @param value value to write
   */
  // tslint:disable-next-line: no-any
  writeValue(value: any): void {
    if (!this.input) {
      return;
    }
    this.input.nativeElement.value = value;
  }

  /**
   * Save off callback to call on change
   * @description Our responsibility to know when to call it (see template input event)
   * @param fn Forms API function to call when the value changes in
   * the DOM
   */
  // tslint:disable-next-line: no-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Save off callback to call on change
   * @description Our responsibility to know when to call it (see template onBlur event)
   * @param fn Forms API function to call when the control has been touched in
   * the DOM
   */
  // tslint:disable-next-line: no-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Enable/disable element in view
   */
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
