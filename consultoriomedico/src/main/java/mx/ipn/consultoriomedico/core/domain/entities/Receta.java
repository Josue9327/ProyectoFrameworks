package mx.ipn.consultoriomedico.core.domain.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Receta")
public class Receta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receta_seq")
    @SequenceGenerator(name = "receta_seq", sequenceName = "receta_id_seq")
    @Column(name = "id_receta", nullable = false)
    private Long idReceta;

    @Column(name = "medicamento", length = 100, nullable = false)
    private String medicamento;

    @Column(name = "dosis", length = 50, nullable = false)
    private String dosis;

    @ManyToOne
    @JoinColumn(name = "id_tratamiento", nullable = false)
    private Tratamiento tratamiento;

}
