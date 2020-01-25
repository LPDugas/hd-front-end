import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from 'app/features/features-routing.module';
import { FeaturesComponent } from 'app/features/features.component';
import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledViewTesterModule } from './diagnosticDetailledViewTester/diagnosticDetailledViewTester.module';
import { ProfileModule } from './profile/profile.module';
import { StoresModule } from './stores/stores.module';
import { StoreStatusModule } from './store/storeStatus.module';

@NgModule({
  imports: [
    SharedModule,
    FeaturesRoutingModule,
    ProfileModule,
    DiagnosticDetailledViewTesterModule,
    StoresModule,
    StoreStatusModule,
  ],
  declarations: [FeaturesComponent],
})
export class FeaturesModule {}
