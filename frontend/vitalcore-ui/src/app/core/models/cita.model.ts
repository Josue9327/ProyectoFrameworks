export type Cita = {
  doctor?: any;
  paciente?: any;
  tipoCita?: any;
  idCita?: number;
  pacienteId: number;
  doctorId: number;
  tipoCitaId: number;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'realizada' | 'cancelada';
};
