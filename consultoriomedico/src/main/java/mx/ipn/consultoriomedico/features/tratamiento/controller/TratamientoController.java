package mx.ipn.consultoriomedico.features.tratamiento.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Tratamiento;
import mx.ipn.consultoriomedico.features.tratamiento.DTO.TratamientoDTO;
import mx.ipn.consultoriomedico.features.tratamiento.service.TratamientoService;

@RestController
@RequestMapping("/api/tratamiento")
@Tag(name = "Tratamiento", description = "API para gestionar tratamientos")
public class TratamientoController {

    @Autowired
    private TratamientoService tratamientoService;

    // Obtener todos los tratamientos
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Tratamiento> readAll() {
        return tratamientoService.findAll();
    }

    // Obtener un tratamiento por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Tratamiento readById(@PathVariable Long id) {
        return tratamientoService.findById(id);
    }

    // Crear un nuevo tratamiento
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tratamiento create(@RequestBody TratamientoDTO tratamientoDTO) {
        return tratamientoService.crearTratamiento(tratamientoDTO);
    }

    // Actualizar un tratamiento existente
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Tratamiento update(@PathVariable Long id, @RequestBody TratamientoDTO tratamientoDTO) {
        tratamientoDTO.setIdTratamiento(id);
        return tratamientoService.actualizarTratamiento(tratamientoDTO);
    }

    // Eliminar un tratamiento
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        tratamientoService.deleteById(id);
    }
}
