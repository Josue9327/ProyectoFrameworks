package mx.ipn.consultoriomedico.features.paciente.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.paciente.service.PacienteService;

@RestController
@RequestMapping("/api/paciente")
@Tag(name = "Paciente", description = "API para gestionar pacientes")
public class PacienteController {

    @Autowired
    private PacienteService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Paciente> readAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Paciente readById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Paciente create(@RequestBody Paciente paciente) {
        return service.save(paciente);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Paciente update(@PathVariable Long id, @RequestBody Paciente paciente) {
        paciente.setIdPaciente(id);
        return service.save(paciente);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}
