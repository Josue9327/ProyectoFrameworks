import { Tratamiento } from './tratamiento.model';

export type Receta = {
    idReceta: number;
    medicamento: string;
    dosis: string;
    tratamiento: Tratamiento;
};
