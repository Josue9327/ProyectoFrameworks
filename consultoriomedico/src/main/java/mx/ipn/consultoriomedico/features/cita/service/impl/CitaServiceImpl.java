package mx.ipn.consultoriomedico.features.cita.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Cita;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;
import mx.ipn.consultoriomedico.features.cita.DTO.CitaDTO;
import mx.ipn.consultoriomedico.features.cita.repository.CitaRepository;
import mx.ipn.consultoriomedico.features.cita.service.CitaService;
import mx.ipn.consultoriomedico.features.doctor.repository.DoctorRepository;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;
import mx.ipn.consultoriomedico.features.tipoCita.repository.TipoCitaRepository;

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

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TipoCitaRepository tipoCitaRepository;

    @Override
    public Cita crearCita(CitaDTO citaDTO) {
        Paciente paciente = pacienteRepository.findById(citaDTO.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Doctor doctor = doctorRepository.findById(citaDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
        TipoCita tipoCita = tipoCitaRepository.findById(citaDTO.getTipoCitaId())
                .orElseThrow(() -> new RuntimeException("Tipo de cita no encontrado"));

        Cita cita = new Cita();
        cita.setFecha(citaDTO.getFecha());
        cita.setHora(citaDTO.getHora());
        cita.setPaciente(paciente);
        cita.setDoctor(doctor);
        cita.setTipoCita(tipoCita);

        return citaRepository.save(cita);
    }

    @Override
    public Cita actualizarCita(CitaDTO citaDTO) {
        Cita cita = citaRepository.findById(citaDTO.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setFecha(citaDTO.getFecha());
        cita.setHora(citaDTO.getHora());
        cita.setPaciente(pacienteRepository.findById(citaDTO.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado")));
        cita.setDoctor(doctorRepository.findById(citaDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado")));
        cita.setTipoCita(tipoCitaRepository.findById(citaDTO.getTipoCitaId())
                .orElseThrow(() -> new RuntimeException("Tipo de cita no encontrado")));
        return citaRepository.save(cita);
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Cita> listaCitas) {
        throw new UnsupportedOperationException("Unimplemented method 'reportePDF'");
    }

}
