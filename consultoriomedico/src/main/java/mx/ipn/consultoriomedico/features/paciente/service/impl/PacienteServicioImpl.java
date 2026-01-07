package mx.ipn.consultoriomedico.features.paciente.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

import jakarta.transaction.Transactional;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;
import mx.ipn.consultoriomedico.features.paciente.service.PacienteService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
public class PacienteServicioImpl implements PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Paciente> findAll() {
        return pacienteRepository.findAll();
    }

    @Override
    public Paciente findById(Long id) {
        return pacienteRepository.findById(id).orElse(null);
    }

    @Override
    public Paciente findByCorreo(String correo) {
        return pacienteRepository.findByCorreo(correo).orElse(null);
    }

    @Override
    public Paciente save(Paciente paciente) {
        paciente.setPassword(passwordEncoder.encode(paciente.getPassword()));
        return pacienteRepository.save(paciente);
    }

    @Override
    public void deleteById(Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
        }
    }

    @Override
    public ByteArrayInputStream reportePDF(List<Paciente> listaPaciente) {
        Document documento = new Document(PageSize.A4, 40, 40, 50, 40);
        ByteArrayOutputStream salida = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(documento, salida);
            documento.open();

            // ======== ENCABEZADO ========
            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLUE);
            Paragraph titulo = new Paragraph("Listado de Pacientes", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            documento.add(titulo);

            // Línea divisoria
            LineSeparator linea = new LineSeparator();
            linea.setLineColor(BaseColor.LIGHT_GRAY);
            linea.setLineWidth(1);
            documento.add(new Chunk(linea));
            documento.add(Chunk.NEWLINE);

            // ======== CONFIG TABLA ========
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, BaseColor.WHITE);
            Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
            PdfPTable tabla = new PdfPTable(5);
            tabla.setWidthPercentage(100);
            tabla.setWidths(new float[] { 1f, 3f, 2f, 2f, 3f });
            tabla.setSpacingBefore(15);

            // ======== ENCABEZADOS ========
            BaseColor azulSuave = new BaseColor(52, 152, 219); // Azul suave
            Stream.of("ID", "Nombre Completo", "Fecha de Nacimiento", "Teléfono", "Dirección")
                    .forEach(headerTitle -> {
                        PdfPCell encabezado = new PdfPCell(new Phrase(headerTitle, headerFont));
                        encabezado.setBackgroundColor(azulSuave);
                        encabezado.setHorizontalAlignment(Element.ALIGN_CENTER);
                        encabezado.setVerticalAlignment(Element.ALIGN_MIDDLE);
                        encabezado.setPadding(7);
                        encabezado.setBorderWidth(0.8f);
                        tabla.addCell(encabezado);
                    });

            // ======== FILAS ========
            SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");

            for (Paciente paciente : listaPaciente) {
                String nombreCompleto = paciente.getNombre() + " " + paciente.getAppat() + " " + paciente.getApmat();
                String fechaFormateada = formatoFecha.format(paciente.getFechaNacimiento());

                tabla.addCell(celdaTexto(String.valueOf(paciente.getIdPaciente()), textFont));
                tabla.addCell(celdaTexto(nombreCompleto, textFont));
                tabla.addCell(celdaTexto(fechaFormateada, textFont));
                tabla.addCell(celdaTexto(paciente.getTelefono(), textFont));
                tabla.addCell(celdaTexto(paciente.getDireccion(), textFont));
            }

            documento.add(tabla);
            documento.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ByteArrayInputStream(salida.toByteArray());
    }

    /**
     * Crea una celda con estilo uniforme.
     */
    private PdfPCell celdaTexto(String contenido, Font fuente) {
        PdfPCell celda = new PdfPCell(new Phrase(contenido != null ? contenido : "", fuente));
        celda.setPadding(6);
        celda.setHorizontalAlignment(Element.ALIGN_LEFT);
        celda.setVerticalAlignment(Element.ALIGN_MIDDLE);
        celda.setBorderWidth(0.6f);
        return celda;
    }
}
