package mx.ipn.consultoriomedico.features.cita.DTO;

import java.util.Date;
import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CitaDTO {
    private Long idCita;
    private Date fecha;
    private Time hora;
    private Long pacienteId;
    private Long doctorId;
    private Long tipoCitaId;
}