package mx.ipn.consultoriomedico.util.service;

import java.io.ByteArrayInputStream;

public interface EmailService {
    void enviarCorreo(String destinatario, String asunto, String cuerpo, ByteArrayInputStream bis);
}
