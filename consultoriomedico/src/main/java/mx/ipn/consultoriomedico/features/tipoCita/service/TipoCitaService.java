package mx.ipn.consultoriomedico.features.tipoCita.service;

import java.util.List;

import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;

public interface TipoCitaService {

    public List<TipoCita> findAll();

    public TipoCita findById(Long id);

    public TipoCita save(TipoCita tipoCita);

    public void deleteById(Long id);

}
