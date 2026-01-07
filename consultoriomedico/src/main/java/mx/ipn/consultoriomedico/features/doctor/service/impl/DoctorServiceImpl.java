package mx.ipn.consultoriomedico.features.doctor.service.impl;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.features.doctor.repository.DoctorRepository;
import mx.ipn.consultoriomedico.features.doctor.service.DoctorService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor findById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public Doctor findByCorreo(String correo) {
        return doctorRepository.findByCorreo(correo).orElse(null);
    }

    @Override
    public Doctor save(Doctor doctor) {
        if (doctorRepository.findByCorreo(doctor.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya esta en uso");
        }
        if (doctor.getPassword() == null || doctor.getPassword().isBlank()) {
            throw new RuntimeException("El password no puede estar vacio");
        }
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepository.save(doctor);
    }

    @Override
    public void deleteById(Long id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Doctor> listaDoctores) {
        return null;
    }
}
