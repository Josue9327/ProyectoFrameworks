package mx.ipn.consultoriomedico.features.paciente.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;
import mx.ipn.consultoriomedico.features.paciente.service.PacienteService;

@Service
@Transactional
public class PacienteServicioImpl implements PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Override
    public List<Paciente> findAll() {
        return pacienteRepository.findAll();
    }

    @Override
    public Paciente findById(Long id) {
        return pacienteRepository.findById(id).orElse(null);
    }

    @Override
    public Paciente save(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    @Override
    public void deleteById(Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Paciente> listaPaciente) {
        return null;
    }

}
