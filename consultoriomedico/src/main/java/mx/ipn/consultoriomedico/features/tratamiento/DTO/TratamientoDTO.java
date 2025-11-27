package mx.ipn.consultoriomedico.features.tratamiento.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TratamientoDTO {
    private Long idTratamiento;
    private String diagnostico;
    private Long idCita;
}
