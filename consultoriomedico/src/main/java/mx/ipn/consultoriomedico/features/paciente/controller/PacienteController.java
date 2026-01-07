package mx.ipn.consultoriomedico.features.paciente.controller;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.paciente.service.PacienteService;
import mx.ipn.consultoriomedico.util.service.EmailService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/paciente")
@Tag(name = "Paciente", description = "API para gestionar pacientes")
public class PacienteController {

    @Autowired
    private PacienteService service;

    @Autowired
    private EmailService emailService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Paciente> readAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Paciente readById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Paciente paciente) {
        Map<String, Object> respuesta = new HashMap<>();
        try {
            Paciente pacienteGuardado = service.save(paciente);
            respuesta.put("mensaje", "Paciente creado exitosamente");
            respuesta.put("paciente", pacienteGuardado);
            return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
        } catch (Exception e) {
            respuesta.put("mensaje", "Error al crear el paciente");
            respuesta.put("error", e.getMessage());

            return new ResponseEntity<>(respuesta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Paciente update(@PathVariable Long id, @Valid @RequestBody Paciente paciente) {
        paciente.setIdPaciente(id);
        return service.save(paciente);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping(value = "/reporte/pdf")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InputStreamResource> generarReportePDF() {
        List<Paciente> listaPacientes = service.findAll();
        ByteArrayInputStream bis = service.reportePDF(listaPacientes);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=reporte_frases.pdf");
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    @GetMapping("/enviarPDFCorreo/{correo}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> enviarPDFCorreo(@PathVariable String correo) {
        List<Paciente> listaPacientes = service.findAll();
        ByteArrayInputStream bis = service.reportePDF(listaPacientes);
        emailService.enviarCorreo(correo, "Reporte de Pacientes",
                "Se adjunta el reporte de pacientes", bis);
        return ResponseEntity.ok("Correo enviado correctamente");
    }

}
