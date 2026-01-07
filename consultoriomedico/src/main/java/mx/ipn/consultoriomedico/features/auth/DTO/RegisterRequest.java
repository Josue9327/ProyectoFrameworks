package mx.ipn.consultoriomedico.features.auth.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String nombre;
    private String appat;
    private String apmat;
    private String fechaNacimiento;
    private String telefono;
    private String direccion;
    private String correo;
    private String password;
}
