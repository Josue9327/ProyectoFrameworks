package mx.ipn.consultoriomedico.features.tipoCita.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;

public interface TipoCitaRepository extends JpaRepository<TipoCita, Long> {
    
}
