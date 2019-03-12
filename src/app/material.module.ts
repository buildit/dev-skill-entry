import {NgModule} from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})

export class MaterialModule {
}
