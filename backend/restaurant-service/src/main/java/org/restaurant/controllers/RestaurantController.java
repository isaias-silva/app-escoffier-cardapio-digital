package org.restaurant.controllers;

import org.restaurant.dto.DefaultResponseDTO;
import org.restaurant.dto.RestaurantDTO;
import org.restaurant.enums.DefaultResponses;
import org.restaurant.dto.RestaurantCreateDTO;
import org.restaurant.enums.RulesConstants;
import org.restaurant.services.RestaurantService;
import org.eclipse.microprofile.jwt.JsonWebToken;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.DELETE;
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
	@RolesAllowed({RulesConstants.RESTAURANT, RulesConstants.ADM})
	public RestaurantDTO getMyRestaurant() throws Exception {
		String id = jsonWebToken.getSubject();
		return restaurantService.get(id);
	}

	@GET()
	public RestaurantDTO getRestaurant(@QueryParam("id") String id) throws Exception {
		return restaurantService.get(id);
	}


	@POST()
	@Path("register")
	public DefaultResponseDTO registerRestaurant(@Valid RestaurantCreateDTO data) {
		restaurantService.register(data);
		return DefaultResponses.RESTAURANT_CREATED.getResponse();
	}


	@PUT()
	@Path("update")
	@RolesAllowed({RulesConstants.RESTAURANT, RulesConstants.ADM})
	public DefaultResponseDTO updateRestaurant() {

		return DefaultResponses.RESTAURANT_UPDATED.getResponse();
	}


	@DELETE()
	@Path("remove")
	@RolesAllowed({RulesConstants.ADM})
	public DefaultResponseDTO deleteRestaurant() {

		return DefaultResponses.RESTAURANT_DELETED.getResponse();
	}

}