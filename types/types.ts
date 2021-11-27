
export interface Appointment {
  name: string;
  date: string;
  time: string;
}

export interface IncomingBody {
  data: Appointment
}

export interface ListResult {
  Items: Appointment[];
}
