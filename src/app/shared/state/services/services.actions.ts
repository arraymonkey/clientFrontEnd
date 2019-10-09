import { Action } from '@ngrx/store';
import {Service} from './service';

export enum ServicesActionTypes {
  ServicesAction = '[Services] Action',
  ServiceSelected = '[Services] Selected',
  LoadServices = '[Services] Load Data',
  ServicesLoaded = '[Services] Data Loaded',
  AddService = '[Services] Add Data',
  ServiceAdded = '[Services] Data Added',
  UpdateService = '[Services] Update Data',
  ServiceUpdated = '[Services] Data Updated',
  DeleteService = '[Services] Delete Data',
  ServiceDeleted = '[Services] Data Deleted',
}

export class Services implements Action {
  readonly type = ServicesActionTypes.ServicesAction;
}

export class ServiceSelected implements Action {
  readonly type = ServicesActionTypes.ServiceSelected;
  constructor(public payload) { }
}

export class LoadServices implements Action {
  readonly type = ServicesActionTypes.LoadServices;
  constructor() { }
}

export class ServicesLoaded implements Action {
  readonly type = ServicesActionTypes.ServicesLoaded;
  constructor(public payload: Service[]) { }
}

export class AddService implements Action {
  readonly type = ServicesActionTypes.AddService;
  constructor(public payload: Service) { }
}

export class ServiceAdded implements Action {
  readonly type = ServicesActionTypes.ServiceAdded;
  constructor(public payload: Service) { }
}

export class UpdateService implements Action {
  readonly type = ServicesActionTypes.UpdateService;
  constructor(public payload: Service) { }
}

export class ServiceUpdated implements Action {
  readonly type = ServicesActionTypes.ServiceUpdated;
  constructor(public payload: Service) { }
}

export class DeleteService implements Action {
  readonly type = ServicesActionTypes.DeleteService;
  constructor(public payload: Service) { }
}

export class ServiceDeleted implements Action {
  readonly type = ServicesActionTypes.ServiceDeleted;
  constructor(public payload: Service) { }
}

export type ServicesActions = Services
  | ServiceSelected
  | LoadServices
  | ServicesLoaded
  | AddService
  | ServiceAdded
  | UpdateService
  | ServiceUpdated
  | DeleteService
  | ServiceDeleted
;
