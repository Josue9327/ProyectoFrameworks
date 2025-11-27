package mx.ipn.consultoriomedico.features.historialMedico.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.historialMedico.DTO.HistorialMedicoDTO;
import mx.ipn.consultoriomedico.features.historialMedico.repository.HistorialMedicoRepository;
import mx.ipn.consultoriomedico.features.historialMedico.service.HistorialMedicoService;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;

@Service
@Transactional
public class HistorialMedicoServiceImpl implements HistorialMedicoService {

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

    @Autowired
    private PacienteRepository pacienteRepository;

    @Override
    public HistorialMedico crearHistorialMedico(HistorialMedicoDTO historialMedicoDTO) {
        Paciente paciente = pacienteRepository.findById(historialMedicoDTO.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        HistorialMedico historialMedico = new HistorialMedico();
        historialMedico.setAlergias(historialMedicoDTO.getAlergias());
        historialMedico.setEnfermedadesCronicas(historialMedicoDTO.getEnfermedadesCronicas());
        historialMedico.setAdicciones(historialMedicoDTO.getAdicciones());
        historialMedico.setDiscapacidades(historialMedicoDTO.getDiscapacidades());
        historialMedico.setPaciente(paciente);

        return historialMedicoRepository.save(historialMedico);
    }

    @Override
    public HistorialMedico actualizarHistorialMedico(HistorialMedicoDTO historialMedicoDTO) {
        HistorialMedico historialMedico = historialMedicoRepository.findById(historialMedicoDTO.getIdHistorialMedico())
                .orElseThrow(() -> new RuntimeException("Historial médico no encontrado"));
        historialMedico.setAlergias(historialMedicoDTO.getAlergias());
        historialMedico.setEnfermedadesCronicas(historialMedicoDTO.getEnfermedadesCronicas());
        historialMedico.setAdicciones(historialMedicoDTO.getAdicciones());
        historialMedico.setDiscapacidades(historialMedicoDTO.getDiscapacidades());
        return historialMedicoRepository.save(historialMedico);
    }
}
