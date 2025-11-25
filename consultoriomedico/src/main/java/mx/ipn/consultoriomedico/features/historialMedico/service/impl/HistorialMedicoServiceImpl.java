package mx.ipn.consultoriomedico.features.historialMedico.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;
import mx.ipn.consultoriomedico.features.historialMedico.repository.HistorialMedicoRepository;
import mx.ipn.consultoriomedico.features.historialMedico.service.HistorialMedicosService;

@Service
@Transactional
public class HistorialMedicoServiceImpl implements HistorialMedicosService {

    @Autowired
    private HistorialMedicoRepository historialMedicoRepository;

    @Override
    public List<HistorialMedico> findAll() {
        return historialMedicoRepository.findAll();
    }

    @Override
    public HistorialMedico findById(Long id) {
        return historialMedicoRepository.findById(id).orElse(null);
    }

    @Override
    public HistorialMedico save(HistorialMedico historialMedico) {
        return historialMedicoRepository.save(historialMedico);
    }

    @Override
    public void deleteById(Long id) {
        if (historialMedicoRepository.existsById(id)) {
            historialMedicoRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<HistorialMedico> listaHostHistorialesMedicos) {
        throw new UnsupportedOperationException("Unimplemented method 'reportePDF'");
    }

}
