package mx.ipn.consultoriomedico.features.historialMedico.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.HistorialMedico;

public interface HistorialMedicosService {

    public List<HistorialMedico> findAll();

    public HistorialMedico findById(Long id);

    public HistorialMedico save(HistorialMedico historialMedico);

    public void deleteById(Long id);

    public ByteArrayInputStream reportePDF(List<HistorialMedico> listaHostHistorialesMedicos);

}
