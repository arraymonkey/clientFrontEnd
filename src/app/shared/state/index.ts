import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
// import * as fromAppointments from './appointments/appointments.reducer';
import * as fromServices from './services/services.reducer';
// import * as fromCategories from './category/categories.reducer';
// import * as fromEmployees from './employees/employees.reducer';
//
//
// import {Employee} from "../employees/employee";
// import {Appointment} from "../appointments/appointment";
// import {Category} from "../category/category";
import {Service} from './services/service';


export interface AppState {
  // employees: fromEmployees.EmployeesState
  // appointments: fromAppointments.AppointmentsState,
  // categories: fromCategories.CategoriesState,
  services: fromServices.ServicesState
}

export const reducers: ActionReducerMap<AppState> = {
  // employees: fromEmployees.employeesReducer,
  // appointments: fromAppointments.appointmentsReducer,
  // categories: fromCategories.categoriesReducer,
  services: fromServices.servicesReducer
};
//
// // -------------------------------------------------------------------
// // EMPLOYEES SELECTORS
// // -------------------------------------------------------------------
// export const selectEmployeesState = createFeatureSelector<fromEmployees.EmployeesState>('employees');
//
// export const selectEmployeeIds = createSelector(
//   selectEmployeesState,
//   fromEmployees.selectEmployeeIds
// );
// export const selectEmployeeEntities = createSelector(
//   selectEmployeesState,
//   fromEmployees.selectEmployeeEntities
// );
// export const selectAllEmployees = createSelector(
//   selectEmployeesState,
//   fromEmployees.selectAllEmployees
// );
// export const selectCurrentEmployeeId = createSelector(
//   selectEmployeesState,
//   fromEmployees.getSelectedEmployeeId
// );
//
// const emptyEmployee: Employee = {
//   id: null,
//   name: '',
//   active: true,
// };
//
// export const selectCurrentEmployee = createSelector(
//   selectEmployeeEntities,
//   selectCurrentEmployeeId,
//   (employeeEntities, employeeId) => {
//     return employeeId ? employeeEntities[employeeId] : emptyEmployee;
//   }
// );
//
//
// // -------------------------------------------------------------------
// // APPOINTMENTS SELECTORS
// // -------------------------------------------------------------------
// export const selectAppointmentsState = createFeatureSelector<fromAppointments.AppointmentsState>('appointments');
//
// export const selectAppointmentIds = createSelector(
//   selectAppointmentsState,
//   fromAppointments.selectAppointmentIds
// );
// export const selectAppointmentEntities = createSelector(
//   selectAppointmentsState,
//   fromAppointments.selectAppointmentEntities
// );
// export const selectAllAppointments = createSelector(
//   selectAppointmentsState,
//   fromAppointments.selectAllAppointments
// );
// export const selectCurrentAppointmentId = createSelector(
//   selectAppointmentsState,
//   fromAppointments.getSelectedAppointmentId
// );
//
// const emptyAppointment: Appointment = {
//   id: null,
//   name: '',
// };
//
// export const selectCurrentAppointment = createSelector(
//   selectAppointmentEntities,
//   selectCurrentAppointmentId,
//   (appointmentEntities, appointmentId) => {
//     return appointmentId ? appointmentEntities[appointmentId] : emptyAppointment;
//   }
// );
//
//
// // -------------------------------------------------------------------
// // CATEGORIES SELECTORS
// // -------------------------------------------------------------------
// export const selectCategoriesState = createFeatureSelector<fromCategories.CategoriesState>('categories');
//
// export const selectCategoryIds = createSelector(
//   selectCategoriesState,
//   fromCategories.selectCategoryIds
// );
// export const selectCategoryEntities = createSelector(
//   selectCategoriesState,
//   fromCategories.selectCategoryEntities
// );
// export const selectAllCategories = createSelector(
//   selectCategoriesState,
//   fromCategories.selectAllCategories
// );
// export const selectCurrentCategory = createSelector(
//   selectCategoriesState,
//   fromCategories.getSelectedCategoryId
// );
//
// const emptyCategory: Category = {
//   id: null,
//   name: '',
// };
//

// -------------------------------------------------------------------
// SERVICES SELECTORS
// -------------------------------------------------------------------
export const selectServicesState = createFeatureSelector<fromServices.ServicesState>('services');

export const selectServiceIds = createSelector(
  selectServicesState,
  fromServices.selectServiceIds
);
export const selectServiceEntities = createSelector(
  selectServicesState,
  fromServices.selectServiceEntities
);
export const selectAllServices = createSelector(
  selectServicesState,
  fromServices.selectAllServices
);
export const selectCurrentServiceId = createSelector(
  selectServicesState,
  fromServices.getSelectedServiceId
);

const emptyService: Service = {
  Id: null,
  Client: null
};

export const selectCurrentService = createSelector(
  selectServiceEntities,
  selectCurrentServiceId,
  (serviceEntities, serviceId) => {
    return serviceId ? serviceEntities[serviceId] : emptyService;
  }
);


// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
// export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');
//
// export const selectAllCustomers = createSelector(
//   selectCustomersState,
//   fromCustomers.selectAllCustomers
// );
//
// export const selectCustomersEmployees = createSelector(
//   selectAllCustomers,
//   selectAllEmployees,
//   (customers, employees) => {
//     return customers.map(customer => ({
//       ...customer,
//       employees: employees.filter(employee => employee.customerId === customer.id)
//     }));
//   }
// );
