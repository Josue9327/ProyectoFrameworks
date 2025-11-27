package mx.ipn.consultoriomedico.features.tipoCita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import mx.ipn.consultoriomedico.core.domain.entities.TipoCita;
import mx.ipn.consultoriomedico.features.tipoCita.service.TipoCitaService;

@RestController
@RequestMapping("/api/tipoCita")
@Tag(name = "Tipo Cita", description = "API para gestionar tipos de citas")
public class TipoCitaController {

    @Autowired
    private TipoCitaService tipoCitaService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TipoCita> readAll() {
        return tipoCitaService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TipoCita readById(@PathVariable Long id) {
        return tipoCitaService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TipoCita create(@RequestBody TipoCita tipoCita) {
        return tipoCitaService.save(tipoCita);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TipoCita update(@PathVariable Long id, @RequestBody TipoCita tipoCita) {
        tipoCita.setIdTipoCita(id);
        return tipoCitaService.save(tipoCita);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        tipoCitaService.deleteById(id);
    }

}
