import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { Flagv1Component } from './flag.v1.component';

@NgModule({
  imports: [SharedModule],
  declarations: [Flagv1Component],
  exports: [Flagv1Component]
})
export class Flagv1Module {}
