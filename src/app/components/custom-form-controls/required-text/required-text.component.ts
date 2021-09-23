import { Component, ElementRef, OnInit, Self, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  Validators,
} from '@angular/forms';

type Nullable<T> = T | null;

/**
 * @description Requirements
 *  Support everything a regular text field does (implement ControlValueAccessor)
 *  Required validation
 *  Error message that shows when control is invalid
 *    for any reason
 */
@Component({
  selector: 'app-required-text',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.scss'],

  //  Don't provide ValueAccessor or Validation as this would make a circular reference.
  // NgControl injects value accessor && validators, so we can't inject it, if it is also
  // injecting us.
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   multi: true,
    //   useExisting: RequiredTextComponent, // Hoisting
    // },
  ],
})
export class RequiredTextComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') input: ElementRef | undefined;

  //  ControlValueAccessor Impl
  disabled = false;
  onChange = (value: string): void => {};
  onTouched = (): void => {};

  //  NgControl => NgModel, FormControlDirective, FormControlName
  //  See images in assets 'ng-control-hierarchy'
  //  @Self in case somebody wraps your form control with their own form control. Don't want to grab theirs.
  constructor(@Self() public controlDir: NgControl) {
    //  Our job to make sure NgControl is set up with the right valueAccessor and validators
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    //  Our job to make sure NgControl is set up with the right valueAccessor and validators
    this.addValidators(this.controlDir.control);
  }

  //  TODO: Consider putting this in utils
  addValidators(control: Nullable<AbstractControl>): void {
    if (!control) {
      console.log(`${this.constructor}: No control`);
    }

    const validators = control?.validator
      ? [control.validator, Validators.required]
      : Validators.required;

    control?.setValidators(validators);
    control?.updateValueAndValidity();
  }

  //#region ControlValueAccessor Implementation
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
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Save off callback to call on change
   * @description Our responsibility to know when to call it (see template onBlur event)
   * @param fn Forms API function to call when the control has been touched in
   * the DOM
   */
  // tslint:disable-next-line: no-any
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Enable/disable element in view
   */
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
  //#endregion
}
