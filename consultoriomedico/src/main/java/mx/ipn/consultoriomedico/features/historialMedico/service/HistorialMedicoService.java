package mx.ipn.consultoriomedico.features.historialMedico.service;

import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;
import mx.ipn.consultoriomedico.features.historialMedico.DTO.HistorialMedicoDTO;

public interface HistorialMedicoService {

    public List<HistorialMedico> findAll();

    public HistorialMedico findById(Long id);

    public HistorialMedico save(HistorialMedico historialMedico);

    public void deleteById(Long id);

    public HistorialMedico crearHistorialMedico(HistorialMedicoDTO historialMedicoDTO);

    public HistorialMedico actualizarHistorialMedico(HistorialMedicoDTO historialMedicoDTO);

}
