export type Paciente = {
    idPaciente?: number;
    nombre: string;
    appat: string; // Backend uses 'appat'
    apmat: string; // Backend uses 'apmat'
    fechaNacimiento?: string;
    telefono?: string;
    direccion?: string;
    correo?: string; // Field not present in backend entity
};
