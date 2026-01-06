export type HistorialMedico = {
    idHistorialMedico: number;
    alergias: string;
    enfermedadesCronicas: string;
    adicciones: string;
    discapacidades: string;
    // link to patient optional here or just handled via service logic
};
