package mx.ipn.consultoriomedico.features.doctor.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Doctor;

public interface DoctorService {

    List<Doctor> findAll();

    Doctor findById(Long id);

    Doctor save(Doctor doctor);

    void deleteById(Long id);

    ByteArrayInputStream reportePDF(List<Doctor> listaDoctores);
}
