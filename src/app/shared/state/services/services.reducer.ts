import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ServicesActions, ServicesActionTypes } from './services.actions';
import {Service} from './service';

/**
 * Interface to the part of the Store containing ServicesState
 * and other information related to ServicesData.
 */
export interface ServicesState extends EntityState<Service> {
  selectedServiceId: string | null;
}

export const adapter: EntityAdapter<Service> = createEntityAdapter<Service>();
export const initialState: ServicesState = adapter.getInitialState({
  // additional entity state properties
  selectedServiceId: null,
});

export function servicesReducer(state = initialState, action: ServicesActions): ServicesState {
  switch (action.type) {
    case ServicesActionTypes.ServiceSelected: {
      return Object.assign({}, state, { selectedServiceId: action.payload });
    }

    case ServicesActionTypes.ServicesLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case ServicesActionTypes.ServiceAdded: {
      return adapter.addOne(action.payload, state);
    }

    case ServicesActionTypes.ServiceUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case ServicesActionTypes.ServiceDeleted: {
      return adapter.removeOne(action.payload.Id, state);
    }

    default:
      return state;
  }
}

export const getSelectedServiceId = (state: ServicesState) => state.selectedServiceId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of service ids
export const selectServiceIds = selectIds;

// select the dictionary of service entities
export const selectServiceEntities = selectEntities;

// select the array of services
export const selectAllServices = selectAll;

// select the total service count
export const selectServiceTotal = selectTotal;
