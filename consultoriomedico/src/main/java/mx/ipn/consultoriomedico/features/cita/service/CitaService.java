package mx.ipn.consultoriomedico.features.cita.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Cita;
import mx.ipn.consultoriomedico.features.cita.DTO.CitaDTO;

public interface CitaService {

    public List<Cita> findAll();

    public Cita findById(Long id);

    public Cita save(Cita evento);

    public void deleteById(Long id);

    public ByteArrayInputStream reportePDF(List<Cita> listaCitas);

    public Cita crearCita(CitaDTO citaDTO);

    public Cita actualizarCita(CitaDTO citaDTO);
}
