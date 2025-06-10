package org.restaurant.controllers;

import org.restaurant.dto.DefaultResponse;
import org.restaurant.dto.DefaultResponses;
import org.restaurant.dto.RestaurantDTO;
import org.restaurant.services.RestaurantService;

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


	@GET()
	@Path("me")
	public RestaurantDTO getMyRestaurant() throws Exception {

		throw new Exception("not implemented");
	}


	@GET()
	public RestaurantDTO getRestaurant(@QueryParam("id") String id) throws Exception {
		throw new Exception("not implemented");

	}


	@POST()
	@Path("register")

	public DefaultResponse registerRestaurant(@Valid  RestaurantDTO data) {
		restaurantService.register(data);
		return DefaultResponses.RESTAURANT_CREATED.getResponse();
	}


	@PUT()
	@Path("update")
	public DefaultResponse updateRestaurant() {
		return DefaultResponses.RESTAURANT_UPDATED.getResponse();
	}


	@DELETE()
	@Path("remove")
	public DefaultResponse deleteRestaurant() {

		return DefaultResponses.RESTAURANT_DELETED.getResponse();
	}

}