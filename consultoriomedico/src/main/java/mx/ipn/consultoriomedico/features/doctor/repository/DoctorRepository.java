package mx.ipn.consultoriomedico.features.doctor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    public Optional<Doctor> findByCorreo(String correo);
}
