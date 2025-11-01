package mx.ipn.consultoriomedico.features.receta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Long> {

}
