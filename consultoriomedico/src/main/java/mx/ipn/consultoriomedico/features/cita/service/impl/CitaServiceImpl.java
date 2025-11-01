package mx.ipn.consultoriomedico.features.cita.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Cita;
import mx.ipn.consultoriomedico.features.cita.repository.CitaRepository;
import mx.ipn.consultoriomedico.features.cita.service.CitaService;

@Service
@Transactional
public class CitaServiceImpl implements CitaService {

    @Autowired
    private CitaRepository citaRepository;

    @Override
    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    @Override
    public Cita findById(Long id) {
        return citaRepository.findById(id).orElse(null);
    }

    @Override
    public Cita save(Cita cita) {
        return citaRepository.save(cita);
    }

    @Override
    public void deleteById(Long id) {
        if (citaRepository.existsById(id)) {
            citaRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Cita> listaCitas) {
        return null;
    }
}
