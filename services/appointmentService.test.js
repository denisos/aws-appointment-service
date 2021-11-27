// const appointmentService = require('./appointmentService');
import { createAppointment, getAppointment, listAppointment } from './appointmentService';

describe('AppointmentService ', () => {
  // const mockStorage with spies
  let mockStore = {
    list: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
  };

  test('should call list as expected', () => {
    const res = listAppointment(mockStore);
    expect(mockStore.list.mock.calls.length).toEqual(1);
  });

  test('should call get as expected', () => {
    const res = getAppointment('123ff', mockStore);
    expect(mockStore.get.mock.calls.length).toEqual(1);
    expect(mockStore.get).toHaveBeenCalledWith('123ff');
  });

  test('should create as expected', () => {
    const mockCreateData = {
      "time": "10:00:00PST", 
      "name": "Jane Doe", 
      "date": "12/01/2021" 
    };
    const res = createAppointment(mockCreateData, mockStore);
    expect(mockStore.create.mock.calls.length).toEqual(1);
    expect(mockStore.create).toHaveBeenCalledWith(mockCreateData);
  });
});
