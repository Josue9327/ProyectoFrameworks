package mx.ipn.consultoriomedico.features.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.features.doctor.service.DoctorService;

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

    // Crear un nuevo doctor
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Doctor create(@RequestBody Doctor doctor) {
        return doctorService.save(doctor);
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
