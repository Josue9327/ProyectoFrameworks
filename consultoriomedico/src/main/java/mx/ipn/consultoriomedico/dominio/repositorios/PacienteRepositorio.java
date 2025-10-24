package mx.ipn.consultoriomedico.dominio.repositorios;

import org.springframework.data.repository.CrudRepository;

import mx.ipn.consultoriomedico.dominio.entidades.Paciente;

public interface PacienteRepositorio extends CrudRepository<Paciente, Long> {

}
