package mx.ipn.consultoriomedico.features.receta.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Receta;
import mx.ipn.consultoriomedico.features.receta.DTO.RecetaDTO;
import mx.ipn.consultoriomedico.features.receta.service.ServiceReceta;

@RestController
@RequestMapping("/api/receta")
@Tag(name = "Receta", description = "API para gestionar recetas")
public class RecetaController {

    @Autowired
    private ServiceReceta serviceReceta;

    // Obtener todas las recetas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Receta> readAll() {
        return serviceReceta.findAll();
    }

    // Obtener una receta por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Receta readById(@PathVariable Long id) {
        return serviceReceta.findById(id);
    }

    // Crear una nueva receta
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Receta create(@RequestBody RecetaDTO recetaDTO) {
        return serviceReceta.crearReceta(recetaDTO);
    }

    // Actualizar una receta existente
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Receta update(@PathVariable Long id, @RequestBody RecetaDTO recetaDTO) {
        recetaDTO.setIdReceta(id);
        return serviceReceta.actualizarReceta(recetaDTO);
    }

    // Eliminar una receta
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        serviceReceta.deleteById(id);
    }
}
