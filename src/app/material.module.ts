import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatSliderModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
  ],
})

export class MaterialModule {
}
