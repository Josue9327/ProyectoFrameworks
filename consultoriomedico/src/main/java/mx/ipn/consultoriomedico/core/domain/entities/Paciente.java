package mx.ipn.consultoriomedico.core.domain.entities;

import java.io.Serializable;
import java.util.Date;
import jakarta.validation.constraints.NotEmpty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Paciente")
public class Paciente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "frase_seq")
    @SequenceGenerator(name = "frase_seq", sequenceName = "frase_id_seq")
    @Column(name = "id_paciente", nullable = false)
    private Long idPaciente;

    @NotEmpty(message = "El nombre no puede estar vacia")
    @Column(nullable = false, length = 50)
    private String nombre;

    @NotEmpty(message = "El apellido paterno no puede estar vacia")
    @Column(nullable = false, length = 50)
    private String appat;

    @NotEmpty(message = "El apellido materno no puede estar vacia")
    @Column(nullable = false, length = 50)
    private String apmat;

    @NotNull(message = "La fecha de nacimiento no puede estar vacia")
    @Past(message = "La fecha de nacimiento debe ser anterior a la fecha actual")
    @Column(name = "fecha_nacimiento", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @NotEmpty(message = "El telefono no puede estar vacia")
    @Column(nullable = false, length = 15)
    private String telefono;

    @NotEmpty(message = "La direccion no puede estar vacia")
    @Column(nullable = false, length = 100)
    private String direccion;

    @NotEmpty(message = "El correo no puede estar vacia")
    @Column(nullable = false, length = 100)
    private String correo;

    @NotEmpty(message = "El password no puede estar vacia")
    @Column(nullable = false, length = 100)
    private String password;

}
