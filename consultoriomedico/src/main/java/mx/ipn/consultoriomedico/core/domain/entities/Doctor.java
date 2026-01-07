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
import jakarta.validation.constraints.NotEmpty;

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

    @NotEmpty(message = "El nombre no puede estar vacia")
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @NotEmpty(message = "El apellido paterno no puede estar vacia")
    @Column(name = "appat", length = 50, nullable = false)
    private String appat;

    @NotEmpty(message = "El apellido materno no puede estar vacia")
    @Column(name = "apmat", length = 50, nullable = false)
    private String apmat;

    @NotEmpty(message = "La especialidad no puede estar vacia")
    @Column(name = "especialidad", length = 50, nullable = false)
    private String especialidad;

    @NotEmpty(message = "El telefono no puede estar vacia")
    @Column(name = "telefono", length = 50, nullable = false)
    private String telefono;

    @NotEmpty(message = "El correo no puede estar vacia")
    @Column(name = "correo", length = 100, nullable = false)
    private String correo;

    @NotEmpty(message = "La contraseña no puede estar vacia")
    @Column(name = "password", length = 100, nullable = false)
    private String password;

}
