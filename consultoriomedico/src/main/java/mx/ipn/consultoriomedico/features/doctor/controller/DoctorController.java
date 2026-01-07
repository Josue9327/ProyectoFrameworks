package mx.ipn.consultoriomedico.features.doctor.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginResponse;
import mx.ipn.consultoriomedico.features.doctor.service.DoctorService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctor")
@Tag(name = "Doctor", description = "API para gestionar doctores")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Obtener todos los doctores
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Doctor> readAll() {
        return doctorService.findAll();
    }

    // Obtener un doctor por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Doctor readById(@PathVariable Long id) {
        return doctorService.findById(id);
    }

    // Buscar un doctor por correo
    @GetMapping("/correo/{correo}")
    @ResponseStatus(HttpStatus.OK)
    public Doctor readByCorreo(@PathVariable String correo) {
        return doctorService.findByCorreo(correo);
    }

    // Crear un nuevo doctor
    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Doctor doctor) {
        Map<String, Object> respuesta = new HashMap<>();
        try {
            Doctor doctorGuardado = doctorService.save(doctor);
            respuesta.put("mensaje", "Doctor creado exitosamente");
            respuesta.put("doctor", doctorGuardado);
            return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
        } catch (Exception e) {
            respuesta.put("mensaje", "Error al crear el doctor");
            respuesta.put("error", e.getMessage());

            return new ResponseEntity<>(respuesta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Actualizar un doctor existente
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Doctor update(@PathVariable Long id, @RequestBody Doctor doctor) {
        doctor.setIdDoctor(id);
        return doctorService.save(doctor);
    }

    // Eliminar un doctor
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        doctorService.deleteById(id);
    }
}
