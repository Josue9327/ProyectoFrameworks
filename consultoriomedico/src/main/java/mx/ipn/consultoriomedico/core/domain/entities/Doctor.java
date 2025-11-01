package mx.ipn.consultoriomedico.core.domain.entities;

import java.io.Serializable;

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
@Table(name = "Doctor")
public class Doctor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctor_seq")
    @SequenceGenerator(name = "doctor_seq", sequenceName = "doctor_id_seq")
    @Column(name = "id_doctor", nullable = false)
    private Long idDoctor;

    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "appat", length = 50, nullable = false)
    private String appat;

    @Column(name = "apmat", length = 50, nullable = false)
    private String apmat;

    @Column(name = "especialidad", length = 50, nullable = false)
    private String especialidad;

    @Column(name = "telefono", length = 50, nullable = false)
    private String telefono;

    @Column(name = "correo", length = 50, nullable = false)
    private String correo;

}
