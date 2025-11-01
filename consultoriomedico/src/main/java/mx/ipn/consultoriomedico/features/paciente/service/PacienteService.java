package mx.ipn.consultoriomedico.features.paciente.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Paciente;

public interface PacienteService {

    public List<Paciente> findAll();

    public Paciente findById(Long id);

    public Paciente save(Paciente evento);

    public void deleteById(Long id);

    public ByteArrayInputStream reportePDF(List<Paciente> listaPacientes);

}
