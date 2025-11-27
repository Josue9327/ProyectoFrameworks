package mx.ipn.consultoriomedico.features.historialMedico.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialMedicoDTO {

    private Long idHistorialMedico;
    private String alergias;
    private String enfermedadesCronicas;
    private String adicciones;
    private String discapacidades;
    private Long pacienteId;

}
