package mx.ipn.consultoriomedico.features.tipoCita.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;
import mx.ipn.consultoriomedico.features.tipoCita.repository.TipoCitaRepository;
import mx.ipn.consultoriomedico.features.tipoCita.service.TipoCitaService;

@Service
@Transactional
public class TipoCitaServiceImpl implements TipoCitaService {

    @Autowired
    private TipoCitaRepository tipoCitaRepository;

    @Override
    public List<TipoCita> findAll() {
        return tipoCitaRepository.findAll();
    }

    @Override
    public TipoCita findById(Long id) {
        return tipoCitaRepository.findById(id).orElse(null);
    }

    @Override
    public TipoCita save(TipoCita tipoCita) {
        return tipoCitaRepository.save(tipoCita);
    }

    @Override
    public void deleteById(Long id) {
        if (tipoCitaRepository.existsById(id)) {
            tipoCitaRepository.deleteById(id);
        }

    }

}
