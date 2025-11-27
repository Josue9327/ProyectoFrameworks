package mx.ipn.consultoriomedico.features.tratamiento.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Cita;
import mx.ipn.consultoriomedico.core.domain.entities.Tratamiento;
import mx.ipn.consultoriomedico.features.cita.repository.CitaRepository;
import mx.ipn.consultoriomedico.features.tratamiento.DTO.TratamientoDTO;
import mx.ipn.consultoriomedico.features.tratamiento.repository.TratamientoRepository;
import mx.ipn.consultoriomedico.features.tratamiento.service.TratamientoService;

@Service
@Transactional
public class TratamientoServiceImpl implements TratamientoService {

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Override
    public List<Tratamiento> findAll() {
        return tratamientoRepository.findAll();
    }

    @Override
    public Tratamiento findById(Long id) {
        return tratamientoRepository.findById(id).orElse(null);
    }

    @Override
    public Tratamiento save(Tratamiento tratamiento) {
        return tratamientoRepository.save(tratamiento);
    }

    @Override
    public void deleteById(Long id) {
        if (tratamientoRepository.existsById(id)) {
            tratamientoRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Tratamiento> listaTratamientos) {
        return null;
    }

    @Autowired
    private CitaRepository citaRepository;

    @Override
    public Tratamiento crearTratamiento(TratamientoDTO tratamientoDTO) {
        Tratamiento tratamiento = new Tratamiento();
        Cita cita = citaRepository.findById(tratamientoDTO.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        tratamiento.setDiagnostico(tratamientoDTO.getDiagnostico());
        tratamiento.setCita(cita);
        return tratamientoRepository.save(tratamiento);
    }

    @Override
    public Tratamiento actualizarTratamiento(TratamientoDTO tratamientoDTO) {
        Tratamiento tratamiento = tratamientoRepository.findById(tratamientoDTO.getIdTratamiento())
                .orElseThrow(() -> new RuntimeException("Tratamiento no encontrado"));
        Cita cita = citaRepository.findById(tratamientoDTO.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        tratamiento.setCita(cita);
        tratamiento.setDiagnostico(tratamientoDTO.getDiagnostico());
        return tratamientoRepository.save(tratamiento);
    }
}
