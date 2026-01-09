import { Paciente } from './paciente.model';

export interface HistorialMedico {
  idHistorialMedico?: number;

  alergias?: string;
  enfermedadesCronicas?: string;
  adicciones?: string;
  discapacidades?: string;

  paciente?: Paciente;
}
