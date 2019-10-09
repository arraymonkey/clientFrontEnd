import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NxModule} from '@nrwl/nx';

import {reducers} from '.';
import {ServicesEffects} from './services/services.effects';

@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 10}),
    EffectsModule.forRoot([
      ServicesEffects
    ]),
  ],
  declarations: []
})
export class StateModule {
}
