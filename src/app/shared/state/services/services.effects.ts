import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import {
  AddService,
  DeleteService,
  ServiceAdded,
  ServiceDeleted,
  ServicesActionTypes,
  ServicesLoaded,
  ServiceUpdated,
  LoadServices,
  UpdateService,
} from './services.actions';
import { ServicesState } from './services.reducer';
import {Service, ServiceService} from './service';

@Injectable({providedIn: 'root'})
export class ServicesEffects {
  @Effect() effect$ = this.actions$.pipe(ofType(ServicesActionTypes.ServicesAction));

  @Effect()
  loadServices$ = this.dataPersistence.fetch(ServicesActionTypes.LoadServices, {
    run: (action: LoadServices, state: ServicesState) => {
      return this.servicesService.get().pipe(map((res: Service[]) => new ServicesLoaded(res)))
    },

    onError: (action: LoadServices, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addService$ = this.dataPersistence.pessimisticUpdate(ServicesActionTypes.AddService, {
    run: (action: AddService, state: ServicesState) => {
      return this.servicesService.create(action.payload).pipe(map((res: Service) => new ServiceAdded(res)))
    },

    onError: (action: AddService, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  updateService$ = this.dataPersistence.pessimisticUpdate(ServicesActionTypes.UpdateService, {
    run: (action: UpdateService, state: ServicesState) => {
      return this.servicesService.update(action.payload).pipe(map((res: Service) => new ServiceUpdated(res)))
    },

    onError: (action: UpdateService, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  deleteService$ = this.dataPersistence.pessimisticUpdate(ServicesActionTypes.DeleteService, {
    run: (action: DeleteService, state: ServicesState) => {
      return this.servicesService.delete(action.payload).pipe(map(_ => new ServiceDeleted(action.payload)))
    },

    onError: (action: DeleteService, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ServicesState>,
    private servicesService: ServiceService
  ) {}
}
