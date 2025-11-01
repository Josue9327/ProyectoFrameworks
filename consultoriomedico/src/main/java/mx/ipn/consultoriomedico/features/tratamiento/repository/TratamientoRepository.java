package mx.ipn.consultoriomedico.features.tratamiento.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.ipn.consultoriomedico.core.domain.entities.Tratamiento;

public interface TratamientoRepository extends JpaRepository<Tratamiento, Long> {

}
