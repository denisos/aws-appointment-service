import { Appointment } from '../types/types';

// Services are where business logic would live to coordinate requests
// currently it's simple crud operations but other cases would be more complex
//
export function createAppointment(params: Appointment, store: any) {
  return store.create(params);
}

export function getAppointment(id: string, store: any) {
  return store.get(id);
}

export function listAppointment(store: any) {
  return store.list();
}
