package org.restaurant.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;

import org.restaurant.dto.AuthResponseDTO;
import org.restaurant.dto.LoginRequestDTO;
import org.restaurant.entities.RestaurantEntity;
import org.restaurant.repositories.RestaurantRepository;
import org.restaurant.tools.CryptUtils;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class AuthService {

	@Inject
	RestaurantRepository restaurantRepository;


	public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
		RestaurantEntity restaurant = restaurantRepository.find("email", loginRequestDTO.email()).firstResult();
		if (restaurant == null) {
			throw new NotFoundException("restaurante não encontrado!");
		}
		if (!CryptUtils.checkPassword(loginRequestDTO.password(), restaurant.getPassword())) {
			throw new NotAuthorizedException("senha incorreta");
		}
		try {
			String token = Jwt.issuer("http://auth-service").subject(restaurant.id.toString())
				.groups(new HashSet<>(restaurant.getRules())).expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
				.sign();
			return new AuthResponseDTO(token, "restaurante logado com sucesso");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

}