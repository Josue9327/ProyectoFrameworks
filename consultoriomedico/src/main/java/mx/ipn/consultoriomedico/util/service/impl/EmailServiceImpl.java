package mx.ipn.consultoriomedico.util.service.impl;

import mx.ipn.consultoriomedico.util.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.activation.DataSource;
import jakarta.mail.util.ByteArrayDataSource;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void enviarCorreo(String destinatario, String asunto, String cuerpo, ByteArrayInputStream bis) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper;
        ;
        try {
            messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setFrom(new InternetAddress("sistemamedico2025@gmail.com", "Consultorio Médico"));
            DataSource dataSource = new ByteArrayDataSource(bis, "application/pdf");
            messageHelper.addAttachment("archivo.pdf", dataSource);
            messageHelper.setTo(destinatario);
            messageHelper.setSubject(asunto);
            messageHelper.setText(cuerpo);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo", e);
        }
    }
}
