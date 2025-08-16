package org.restaurant.services;

import java.util.List;

import org.restaurant.dto.ListCountResponseDTO;
import org.restaurant.dto.RestaurantCreateDTO;
import org.restaurant.dto.RestaurantDTO;
import org.restaurant.dto.RestaurantUpdateDTO;
import org.restaurant.enums.MessagesConstants;
import org.restaurant.enums.Rules;
import org.restaurant.enums.RulesConstants;
import org.restaurant.entities.RestaurantEntity;
import org.restaurant.repositories.RestaurantRepository;
import org.restaurant.tools.CryptUtils;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class RestaurantService {

	@Inject
	RestaurantRepository restaurantRepository;


	public void register(final RestaurantCreateDTO data) {
		final RestaurantEntity restaurantExists = restaurantRepository.find("email", data.email()).firstResult();

		if (restaurantExists != null) {
			throw new BadRequestException(MessagesConstants.EMAIL_IN_USE);
		}

		final RestaurantEntity restaurant = RestaurantEntity.fromDto(data);
		final String hashPassword = CryptUtils.hashPassword(restaurant.getPassword());
		restaurant.setPassword(hashPassword);

		restaurant.persist();
	}


	public RestaurantEntity get(final Long id) {

		try {

			final RestaurantEntity restaurant = restaurantRepository.findById(id);

			if (restaurant == null || restaurant.getRules().contains(RulesConstants.BANNED)) {
				throw new NotFoundException();
			}
			return restaurant;

		} catch (Exception e) {
			throw new NotFoundException(MessagesConstants.RESTAURANT_NOT_FOUND);
		}

	}


	public ListCountResponseDTO<RestaurantDTO> getAll(int page, int count) {

		PanacheQuery<RestaurantEntity> query = restaurantRepository.findAll().page(Page.of(page - 1, count));
		return formatConsultInDTO(query);
	}


	public ListCountResponseDTO<RestaurantDTO> getByRule(int page, int count, Rules rule) {

		PanacheQuery<RestaurantEntity> query = restaurantRepository.find("rules like ?1", "%" + rule.getValue() + "%")
			.page(Page.of(page - 1, count));

		return formatConsultInDTO(query);
	}


	public ListCountResponseDTO<RestaurantDTO> search(int page, int count, String word) {

		PanacheQuery<RestaurantEntity> query = restaurantRepository.find("title like ?1 or description like ?1", "%" +word+ "%")
			.page(Page.of(page - 1, count));

		return formatConsultInDTO(query);
	}


	private ListCountResponseDTO<RestaurantDTO> formatConsultInDTO(final PanacheQuery<RestaurantEntity> query) {
		List<RestaurantDTO> restaurants = query.list().stream().map(RestaurantEntity::toDto).toList();

		return new ListCountResponseDTO<RestaurantDTO>(query.pageCount(), query.stream().count(), restaurants);
	}


	public void update(final Long id, final RestaurantUpdateDTO data) {
		RestaurantEntity restaurant = get(id);

		if (data.password() != null) {
			if (CryptUtils.checkPassword(data.password(), restaurant.getPassword())) {
				throw new BadRequestException(MessagesConstants.SAME_PASSWORD);
			} else {
				restaurant.setPassword(CryptUtils.hashPassword(data.password()));
			}

		}

		if (data.description() != null) {
			restaurant.setDescription(data.description());
		}
		if (data.title() != null && !data.title().equals(restaurant.getTitle())) {
			restaurant.setTitle(data.title());
		}
		if (data.email() != null && !data.email().equals(restaurant.getEmail())) {
			restaurant.setEmail(data.email());
		}

		//update

	}

}