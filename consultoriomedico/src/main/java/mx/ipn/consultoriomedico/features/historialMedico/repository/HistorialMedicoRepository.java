package mx.ipn.consultoriomedico.features.historialMedico.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;

public interface HistorialMedicoRepository extends JpaRepository<HistorialMedico, Long> {

}
