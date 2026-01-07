export type Cita = {
  idCita?: number;
  pacienteId: number;
  doctorId: number;
  tipoCitaId: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: 'pendiente' | 'realizada' | 'cancelada';
};