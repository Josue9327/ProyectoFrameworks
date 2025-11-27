package mx.ipn.consultoriomedico.core.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TipoCita")
public class TipoCita {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_cita_id_seq")
    @SequenceGenerator(name = "tipo_cita_id_seq", sequenceName = "tipo_cita_id_seq")
    @Column(name = "id_tipo_cita", nullable = false)
    private Long idTipoCita;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

}
