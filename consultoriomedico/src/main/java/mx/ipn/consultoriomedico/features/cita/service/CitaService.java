package mx.ipn.consultoriomedico.features.cita.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Cita;

public interface CitaService {

    public List<Cita> findAll();

    public Cita findById(Long id);

    public Cita save(Cita evento);

    public void deleteById(Long id);

    public ByteArrayInputStream reportePDF(List<Cita> listaCitas);
}
