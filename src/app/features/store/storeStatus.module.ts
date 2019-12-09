import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { CommonModule } from '@angular/common';

import {StoreStatusComponent} from './storeStatus.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [StoreStatusComponent],
})
export class StoreStatusModule {}
