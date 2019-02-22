import {NgModule} from '@angular/core';

import {MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatSliderModule} from '@angular/material';
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
  ],
})

export class MaterialModule {
}
