package org.restaurant.controllers;

import org.restaurant.dto.DefaultResponseDTO;
import org.restaurant.dto.ListCountResponseDTO;
import org.restaurant.dto.RestaurantDTO;
import org.restaurant.dto.RestaurantUpdateDTO;
import org.restaurant.enums.DefaultResponses;
import org.restaurant.dto.RestaurantCreateDTO;
import org.restaurant.enums.RulesConstants;
import org.restaurant.services.RestaurantService;
import org.eclipse.microprofile.jwt.JsonWebToken;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("restaurant")
@Produces(MediaType.APPLICATION_JSON)

public class RestaurantController {

	@Inject
	private RestaurantService restaurantService;

	@Inject
	private JsonWebToken jsonWebToken;


	@GET()
	@Path("me")
	@RolesAllowed({RulesConstants.RESTAURANT, RulesConstants.UNVERIFIED})
	public RestaurantDTO getMyRestaurant() {
		String id = jsonWebToken.getSubject();
		return restaurantService.get(Long.parseLong(id)).toDto();
	}


	@GET()
	@Path("search")
	public ListCountResponseDTO<RestaurantDTO> searchRestaurant(@QueryParam("query") String query,
		@DefaultValue("1") @Min(1) @QueryParam("page") int page, @DefaultValue("10") @Max(50) @QueryParam("count") int count) {

		return restaurantService.search(page, count, query);
	}


	@GET()
	@Path("all")
	public ListCountResponseDTO<RestaurantDTO> getAllRestaurants(@DefaultValue("1") @Min(1) @QueryParam("page") int page,
		@DefaultValue("10") @Max(50) @QueryParam("count") int count) {

		return restaurantService.getAll(page, count);
	}


	@GET()
	public RestaurantDTO getRestaurant(@QueryParam("id") String id) {
		return restaurantService.get(Long.parseLong(id)).toDto();
	}


	@POST()
	@Path("register")
	@Transactional
	public DefaultResponseDTO registerRestaurant(@Valid RestaurantCreateDTO data) {
		restaurantService.register(data);
		return DefaultResponses.RESTAURANT_CREATED.getResponse();
	}


	@PUT()
	@Path("update")
	@RolesAllowed(RulesConstants.RESTAURANT)
	@Transactional
	public DefaultResponseDTO updateRestaurant(@Valid RestaurantUpdateDTO data) {
		String id = jsonWebToken.getSubject();
		restaurantService.update(Long.parseLong(id), data);
		return DefaultResponses.RESTAURANT_UPDATED.getResponse();
	}


	@DELETE()
	@Path("remove")
	@RolesAllowed({RulesConstants.ADM})
	public DefaultResponseDTO deleteRestaurant() {

		return DefaultResponses.RESTAURANT_DELETED.getResponse();
	}

}