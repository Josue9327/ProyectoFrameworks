import { Cita } from './cita.model';

export type Tratamiento = {
    idTratamiento: number;
    diagnostico: string;
    cita: Cita;
};
