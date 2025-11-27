package mx.ipn.consultoriomedico.features.cita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Cita;
import mx.ipn.consultoriomedico.features.cita.DTO.CitaDTO;
import mx.ipn.consultoriomedico.features.cita.service.CitaService;

@RestController
@RequestMapping("/api/cita")
@Tag(name = "Cita", description = "API para gestionar citas")
public class CitaController {

    @Autowired
    private CitaService citaService;

    // Obtener todas las citas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Cita> readAll() {
        return citaService.findAll();
    }

    // Obtener una cita por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Cita readById(@PathVariable Long id) {
        return citaService.findById(id);
    }

    // Crear una nueva cita
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Cita> crearCita(@RequestBody CitaDTO citaDTO) {
        Cita cita = citaService.crearCita(citaDTO);
        return ResponseEntity.ok(cita);
    }

    // Actualizar una cita existente
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Cita> update(@PathVariable Long id, @RequestBody CitaDTO citaDTO) {
        citaDTO.setIdCita(id);
        Cita cita = citaService.actualizarCita(citaDTO);
        return ResponseEntity.ok(cita);
    }

    // Eliminar una cita
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        citaService.deleteById(id);
    }
}
