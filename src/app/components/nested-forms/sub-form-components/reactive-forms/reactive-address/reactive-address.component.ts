import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-reactive-address',
  template: `
    <div formGroupName="address">
      <input formControlName="street" />
      <input formControlName="city" />
    </div>

    <pre>{{ form.value | json }}</pre>
  `,
  styles: [],
})
export class ReactiveAddressComponent implements OnInit {
  form: FormGroup;

  constructor(private parent: FormGroupDirective) {
    this.form = parent.form;
  }

  ngOnInit(): void {
    this.form.addControl(
      'address',
      new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
      })
    );
  }
}
