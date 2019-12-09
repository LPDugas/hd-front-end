import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { CommonModule } from '@angular/common';

import {StoresComponent} from './stores.component';
import {StoreComponent} from './store/store.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [StoresComponent, StoreComponent],
})
export class StoresModule {}
