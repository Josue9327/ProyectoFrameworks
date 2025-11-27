package mx.ipn.consultoriomedico.features.receta.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecetaDTO {
    private Long idReceta;
    private String medicamentos;
    private String dosis;
    private Long idTratamiento;
}
