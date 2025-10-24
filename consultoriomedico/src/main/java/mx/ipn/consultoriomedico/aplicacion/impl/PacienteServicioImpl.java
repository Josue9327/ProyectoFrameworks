package mx.ipn.consultoriomedico.aplicacion.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.aplicacion.PacienteServicio;
import mx.ipn.consultoriomedico.dominio.entidades.Paciente;
import mx.ipn.consultoriomedico.dominio.repositorios.PacienteRepositorio;

@Service
@Transactional
public class PacienteServicioImpl implements PacienteServicio {

    @Autowired
    private PacienteRepositorio dao;

    @Override
    public Paciente guardarPaciente(Paciente paciente) {
        return dao.save(paciente);

    }

}
