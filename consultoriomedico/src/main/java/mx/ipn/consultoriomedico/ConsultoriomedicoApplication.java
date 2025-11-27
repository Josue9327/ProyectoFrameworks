package mx.ipn.consultoriomedico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;
import mx.ipn.consultoriomedico.features.tipoCita.repository.TipoCitaRepository;

@SpringBootApplication
public class ConsultoriomedicoApplication implements CommandLineRunner {

    @Autowired
    private TipoCitaRepository dao;

    public static void main(String[] args) {
        SpringApplication.run(ConsultoriomedicoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        /* crearCatalogos(); */
    }

    public void crearCatalogos() {
        TipoCita tipoCitaConsultaGeneral = new TipoCita();
        tipoCitaConsultaGeneral.setNombre("Consulta");
        tipoCitaConsultaGeneral.setDescripcion("Consulta General");
        dao.save(tipoCitaConsultaGeneral);

        TipoCita tipoCitaExamenGeneral = new TipoCita();
        tipoCitaExamenGeneral.setNombre("Examen");
        tipoCitaExamenGeneral.setDescripcion("Examen General");
        dao.save(tipoCitaExamenGeneral);

        TipoCita tipoCitaCitaMedica = new TipoCita();
        tipoCitaCitaMedica.setNombre("Cita Medica");
        tipoCitaCitaMedica.setDescripcion("Cita Medica");
        dao.save(tipoCitaCitaMedica);

        TipoCita tipoCitaControl = new TipoCita();
        tipoCitaControl.setNombre("Control");
        tipoCitaControl.setDescripcion("Control de Seguimiento");
        dao.save(tipoCitaControl);

        TipoCita tipoCitaUrgencia = new TipoCita();
        tipoCitaUrgencia.setNombre("Urgencia");
        tipoCitaUrgencia.setDescripcion("Consulta de Urgencia");
        dao.save(tipoCitaUrgencia);

        TipoCita tipoCitaEspecialista = new TipoCita();
        tipoCitaEspecialista.setNombre("Especialista");
        tipoCitaEspecialista.setDescripcion("Consulta con Especialista");
        dao.save(tipoCitaEspecialista);
    }

}
