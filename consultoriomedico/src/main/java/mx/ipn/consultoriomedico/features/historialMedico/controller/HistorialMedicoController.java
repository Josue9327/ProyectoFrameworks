package mx.ipn.consultoriomedico.features.historialMedico.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/historialMedico")
@Tag(name = "Historial Medico", description = "API para gestionar pacientes")
public class HistorialMedicoController {

    @Autowired
    @
    private HistorialMedicoSe service;

}
