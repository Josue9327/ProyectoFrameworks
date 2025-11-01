package mx.ipn.consultoriomedico.features.cita.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Cita;

public interface CitaRepository extends JpaRepository<Cita, Long> {
}
