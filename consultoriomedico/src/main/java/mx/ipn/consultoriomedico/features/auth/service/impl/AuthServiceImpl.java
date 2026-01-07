package mx.ipn.consultoriomedico.features.auth.service.impl;

import mx.ipn.consultoriomedico.features.auth.service.AuthService;
import mx.ipn.consultoriomedico.core.domain.entities.Doctor;
import mx.ipn.consultoriomedico.core.domain.entities.Paciente;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginResponse;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterResponse;
import mx.ipn.consultoriomedico.features.doctor.repository.DoctorRepository;
import mx.ipn.consultoriomedico.features.paciente.repository.PacienteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import mx.ipn.consultoriomedico.features.auth.DTO.UserResponse;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    private final DoctorRepository doctorRepository;
    private final PacienteRepository pacienteRepository;
    private final PasswordEncoder passwordEncoder;

    private final String SECRET_KEY = "1.!Fd@p6Sk9>yJUr8IHLvBHGUTaq{!Q$";
    private final Key key = Keys.hmacShaKeyFor(
            SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    private static final long EXPIRATION_TIME = 3600 * 1000;

    public AuthServiceImpl(DoctorRepository doctorRepository, PacienteRepository pacienteRepository,
            PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.pacienteRepository = pacienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Optional<Doctor> doctor = doctorRepository.findByCorreo(request.getCorreo());
        UserResponse userResponse = null;
        if (doctor.isPresent()) {
            Doctor doctorEncontrado = doctor.get();
            if (!passwordEncoder.matches(request.getPassword(), doctorEncontrado.getPassword())) {
                throw new RuntimeException("Usuario o contraseña incorrecta");
            }
            userResponse = UserResponse.builder()
                    .correo(doctorEncontrado.getCorreo())
                    .rol("DOCTOR")
                    .nombre(doctorEncontrado.getNombre() + " " + doctorEncontrado.getAppat() + " "
                            + doctorEncontrado.getApmat())
                    .build();
            String token = generarToken(doctorEncontrado.getCorreo());
            return new LoginResponse(token, "Bearer", EXPIRATION_TIME, userResponse);
        }

        Optional<Paciente> paciente = pacienteRepository.findByCorreo(request.getCorreo());
        if (paciente.isPresent()) {
            Paciente pacienteEncontrado = paciente.get();
            if (!passwordEncoder.matches(request.getPassword(), pacienteEncontrado.getPassword())) {
                throw new RuntimeException("Usuario o contraseña incorrecta");
            }
            userResponse = UserResponse.builder()
                    .correo(pacienteEncontrado.getCorreo())
                    .rol("PACIENTE")
                    .nombre(pacienteEncontrado.getNombre() + " " + pacienteEncontrado.getAppat() + " "
                            + pacienteEncontrado.getApmat())
                    .build();
            String token = generarToken(pacienteEncontrado.getCorreo());
            return new LoginResponse(token, "Bearer", EXPIRATION_TIME, userResponse);
        }

        throw new RuntimeException("Usuario o contraseña incorrecta");
    }

    @Override
    public RegisterResponse register(RegisterRequest request) {
        return null;
    }

    private String generarToken(String correo) {
        return Jwts.builder()
                .setSubject(correo)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

}
