package mx.ipn.consultoriomedico.core.domain.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

public class HistorialMedico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "historial_medico_seq")
    @SequenceGenerator(name = "historial_medico_seq", sequenceName = "historial_medico_id_seq")
    @Column(name = "id_historial_medico", nullable = false)
    private Long idHistorialMedico;

    @NotNull(message = "La fecha no puede estar vacía")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_doctor", nullable = false)
    private Doctor doctor;
}
