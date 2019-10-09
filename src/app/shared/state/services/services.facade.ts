import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllServices, selectCurrentService } from '..';
import { ServicesActionTypes } from './services.actions';
import * as ServicesActions from './services.actions';
import { ServicesState } from './services.reducer';

@Injectable({
  providedIn: 'root'
})
export class ServicesFacade {
  allServices$ = this.store.pipe(select(selectAllServices));
  currentService$ = this.store.pipe(select(selectCurrentService));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ServicesActionTypes.AddService
        || action.type === ServicesActionTypes.UpdateService
        || action.type === ServicesActionTypes.DeleteService
      )
    );

  constructor(private store: Store<ServicesState>, private actions$: ActionsSubject) {}

  selectService(itemId) {
    this.store.dispatch(new ServicesActions.ServiceSelected(itemId));
  }

  loadServices() {
    this.store.dispatch(new ServicesActions.LoadServices());
  }

  addService(item) {
    this.store.dispatch(new ServicesActions.AddService(item));
  }

  updateService(item) {
    this.store.dispatch(new ServicesActions.UpdateService(item));
  }

  deleteService(item) {
    this.store.dispatch(new ServicesActions.DeleteService(item));
  }
}
