package mx.ipn.consultoriomedico.features.paciente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

}
