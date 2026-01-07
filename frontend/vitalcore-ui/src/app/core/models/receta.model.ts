export type Receta = {
  idReceta?: number;
  pacienteId: number;
  doctorId: number;
  fecha: string;
  medicamento: string;
  dosis: string;
  duracion: string;
  tratamientoId?: number;
};