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
@Table(name = "HistorialMedico")
public class HistorialMedico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "historial_medico_seq")
    @SequenceGenerator(name = "historial_medico_seq", sequenceName = "historial_medico_id_seq")
    @Column(name = "id_historial_medico", nullable = false)
    private Long idHistorialMedico;

    @Column(name = "alergias")
    private String alergias;

    @Column(name = "enfermedades_cronicas")
    private String enfermedadesCronicas;

    @Column(name = "adicciones")
    private String adicciones;

    @Column(name = "discapacidades")
    private String discapacidades;

    @OneToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

}
