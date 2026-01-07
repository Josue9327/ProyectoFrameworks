package mx.ipn.consultoriomedico.core.domain.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "Tratamiento")
public class Tratamiento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tratamiento_seq")
    @SequenceGenerator(name = "tratamiento_seq", sequenceName = "tratamiento_id_seq")
    @Column(name = "id_tratamiento", nullable = false)
    private Long idTratamiento;

    @Column(name = "diagnostico", length = 200, nullable = false)
    private String diagnostico;

    @OneToOne
    @JoinColumn(name = "id_cita", nullable = false)
    private Cita Cita;

}
