import { Doctor } from './doctor.model';
import { Paciente } from './paciente.model';
import { TipoCita } from './tipo-cita.model';

export type Cita = {
    idCita: number;
    fecha: string;
    hora: string;
    paciente: Paciente;
    doctor: Doctor;
    tipoCita: TipoCita;
};
