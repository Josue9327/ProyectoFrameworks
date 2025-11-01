package mx.ipn.consultoriomedico;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;

@SpringBootApplication
public class ConsultoriomedicoApplication implements CommandLineRunner {

    @Autowired
    private PacienteRepository dao;

    public static void main(String[] args) {
        SpringApplication.run(ConsultoriomedicoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }

}
