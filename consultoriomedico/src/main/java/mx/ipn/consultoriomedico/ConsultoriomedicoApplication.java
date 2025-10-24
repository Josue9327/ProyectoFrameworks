package mx.ipn.consultoriomedico;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mx.ipn.consultoriomedico.dominio.entidades.Paciente;
import mx.ipn.consultoriomedico.dominio.repositorios.PacienteRepositorio;

@SpringBootApplication
public class ConsultoriomedicoApplication implements CommandLineRunner {

    @Autowired
    private PacienteRepositorio dao;

    public static void main(String[] args) {
        SpringApplication.run(ConsultoriomedicoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Paciente p1 = Paciente.builder()
                .nombre("Alicia")
                .appat("Cortez")
                .apmat("Gamboa")
                .fechaNacimiento(new SimpleDateFormat("yyyy-MM-dd").parse("2003-13-05"))
                .telefono("5545458551")
                .direccion("Direccion random")
                .build();
        dao.save(p1);
    }

}
