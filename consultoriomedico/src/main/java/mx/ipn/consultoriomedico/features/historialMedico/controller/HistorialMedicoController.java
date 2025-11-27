package mx.ipn.consultoriomedico.features.historialMedico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.features.historialMedico.DTO.HistorialMedicoDTO;
import mx.ipn.consultoriomedico.features.historialMedico.service.HistorialMedicoService;
import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/api/historialMedico")
@Tag(name = "Historial Medico", description = "API para gestionar pacientes")
public class HistorialMedicoController {

    @Autowired
    private HistorialMedicoService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<HistorialMedico> readAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HistorialMedico readById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HistorialMedico create(@RequestBody HistorialMedicoDTO historialMedicoDTO) {
        return service.crearHistorialMedico(historialMedicoDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HistorialMedico update(@PathVariable Long id, @RequestBody HistorialMedicoDTO historialMedicoDTO) {
        historialMedicoDTO.setIdHistorialMedico(id);
        return service.actualizarHistorialMedico(historialMedicoDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

}
