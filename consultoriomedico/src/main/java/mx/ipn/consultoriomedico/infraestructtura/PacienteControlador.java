package mx.ipn.consultoriomedico.infraestructtura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.ipn.consultoriomedico.aplicacion.PacienteServicio;

@RestController
@RequestMapping("/api/paciente")
public class PacienteControlador {

    private final PacienteServicio servicio;

    @Autowired
    public PacienteControlador(PacienteServicio servicio) {
        this.servicio = servicio;
    }

}
