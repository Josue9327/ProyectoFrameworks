package mx.ipn.consultoriomedico.features.receta.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Receta;
import mx.ipn.consultoriomedico.features.receta.DTO.RecetaDTO;

public interface ServiceReceta {

    // Obtener todas las recetas
    List<Receta> findAll();

    // Obtener una receta por ID
    Receta findById(Long id);

    // Crear o actualizar una receta
    Receta save(Receta receta);

    // Eliminar una receta por ID
    void deleteById(Long id);

    // Generar un reporte PDF con la lista de recetas
    ByteArrayInputStream reportePDF(List<Receta> listaRecetas);

    Receta crearReceta(RecetaDTO recetaDTO);

    Receta actualizarReceta(RecetaDTO recetaDTO);
}
