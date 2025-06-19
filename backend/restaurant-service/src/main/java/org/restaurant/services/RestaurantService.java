package org.restaurant.services;

import org.restaurant.dto.RestaurantDTO;
import org.restaurant.models.RestaurantEntity;
import org.restaurant.repositories.RestaurantRepository;
import org.restaurant.tools.CryptUtils;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;

@ApplicationScoped
public class RestaurantService {

	@Inject
	RestaurantRepository restaurantRepository;

	
	public void register(RestaurantDTO data) {
		final RestaurantEntity restaurantExists = restaurantRepository.find("email", data.email()).firstResult();

		if (restaurantExists != null) {
			throw new BadRequestException("email já está em uso");
		}

		final RestaurantEntity restaurant = RestaurantEntity.fromDto(data);
		final String hashPassword = CryptUtils.hashPassword(restaurant.getPassword());
		restaurant.setPassword(hashPassword);

		restaurant.persist();
	}
}