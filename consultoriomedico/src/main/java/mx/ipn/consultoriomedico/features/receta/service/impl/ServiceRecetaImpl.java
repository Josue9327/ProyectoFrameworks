package mx.ipn.consultoriomedico.features.receta.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Receta;
import mx.ipn.consultoriomedico.features.receta.repository.RecetaRepository;
import mx.ipn.consultoriomedico.features.receta.service.ServiceReceta;

@Service
@Transactional
public class ServiceRecetaImpl implements ServiceReceta {

    @Autowired
    private RecetaRepository recetaRepository;

    @Override
    public List<Receta> findAll() {
        return recetaRepository.findAll();
    }

    @Override
    public Receta findById(Long id) {
        return recetaRepository.findById(id).orElse(null);
    }

    @Override
    public Receta save(Receta receta) {
        return recetaRepository.save(receta);
    }

    @Override
    public void deleteById(Long id) {
        if (recetaRepository.existsById(id)) {
            recetaRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Receta> listaRecetas) {
        // Por ahora retornamos null
        // Aquí se puede implementar la generación de PDF usando iText u otra librería
        return null;
    }
}
