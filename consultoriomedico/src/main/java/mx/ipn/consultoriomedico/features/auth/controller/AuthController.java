package mx.ipn.consultoriomedico.features.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import mx.ipn.consultoriomedico.features.auth.service.AuthService;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginResponse;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse registerResponse = authService.register(request);
        return ResponseEntity.ok(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse loginResponse = authService.login(request);
            return ResponseEntity.ok(loginResponse);

        } catch (Exception e) {

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("mensaje", "Error al iniciar sesión");
            respuesta.put("error", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(respuesta);
        }
    }
}
