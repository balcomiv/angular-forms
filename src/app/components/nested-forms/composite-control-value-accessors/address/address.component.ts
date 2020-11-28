import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  form = new FormGroup({
    stree: new FormControl(''),
    city: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  //#region ControlValueAccessor Implementation

  // tslint:disable-next-line: no-any
  writeValue(value: object): void {
    console.log({ value });

    //  '{emitEvent: false} or view to model logic will fire
    //  and mess up dirtyness
    this.form.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    //  this.onChange = fn;
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    //  this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    //  this.disabled = disabled;
  }
  //#endregion
}
