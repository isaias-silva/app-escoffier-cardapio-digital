package org.restaurant.controllers;

import org.restaurant.dto.AuthResponseDTO;
import org.restaurant.dto.LoginRequestDTO;
import org.restaurant.services.AuthService;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthController {

	@Inject
	private AuthService authService;

	@POST()
	public AuthResponseDTO login(@Valid LoginRequestDTO data) {
		return authService.login(data);

	}
}