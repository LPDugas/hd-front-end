import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { Paragraphv1Component } from './paragraphv1.component';

@NgModule({
  imports: [SharedModule],
  declarations: [Paragraphv1Component],
  exports: [Paragraphv1Component]
})
export class Paragraphv1Module {}
