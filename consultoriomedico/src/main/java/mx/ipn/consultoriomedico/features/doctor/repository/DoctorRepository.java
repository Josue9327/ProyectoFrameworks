package mx.ipn.consultoriomedico.features.doctor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
