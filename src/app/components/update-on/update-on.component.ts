import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-on',
  template: `
    <form [formGroup]="form">
      <input formControlName="first" placeholder="First" />
      <input formControlName="last" placeholder="Last" />
    </form>

    <p>
      {{ form.value | json }}
    </p>

    <p>
      {{ form.status }}
    </p>
  `,
  styleUrls: ['./update-on.component.scss'],
})
export class UpdateOnComponent {
  form = new FormGroup(
    {
      first: new FormControl('', { validators: Validators.required }),
      last: new FormControl('', { validators: Validators.required }),
    },
    { updateOn: 'blur' }
  );
}
