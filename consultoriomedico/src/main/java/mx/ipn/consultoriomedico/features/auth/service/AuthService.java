package mx.ipn.consultoriomedico.features.auth.service;

import mx.ipn.consultoriomedico.features.auth.DTO.LoginRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.LoginResponse;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterRequest;
import mx.ipn.consultoriomedico.features.auth.DTO.RegisterResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);
}
