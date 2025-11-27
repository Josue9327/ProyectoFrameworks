package mx.ipn.consultoriomedico.features.tratamiento.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.Tratamiento;
import mx.ipn.consultoriomedico.features.tratamiento.DTO.TratamientoDTO;

public interface TratamientoService {

    public List<Tratamiento> findAll();

    public Tratamiento findById(Long id);

    public Tratamiento save(Tratamiento evento);

    public void deleteById(Long id);

    public ByteArrayInputStream reportePDF(List<Tratamiento> listaEventos);

    public Tratamiento crearTratamiento(TratamientoDTO tratamientoDTO);

    public Tratamiento actualizarTratamiento(TratamientoDTO tratamientoDTO);

}
