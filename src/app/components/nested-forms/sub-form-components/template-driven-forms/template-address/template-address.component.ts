import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-address',
  template: `
    <div ngModelGroup>
      <input name="street" ngModel />
      <input name="city" ngModel />
    </div>
  `,
  styles: [],
  //  Allows ngModelGroup to reach up above @Host boundary and find ngForm directive
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class TemplateAddressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
