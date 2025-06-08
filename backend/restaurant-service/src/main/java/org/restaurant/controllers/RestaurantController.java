package org.restaurant.controllers;

import org.restaurant.dto.DefaultResponse;
import org.restaurant.dto.DefaultResponses;
import org.restaurant.dto.RestaurantDTO;

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

	@GET()
	@Path("me")
	public RestaurantDTO getMyRestaurant() throws Exception {

		return new RestaurantDTO("my restaurant", "", "", "");
	}
	@GET()
	public RestaurantDTO getRestaurant(@QueryParam("id") String id) {

		return new RestaurantDTO("example", "", "", "");
	}
	@POST()
	@Path("register")
	public DefaultResponse registerRestaurant() {
		return DefaultResponses.RESTAURANT_CREATED.getResponse();
	}

	@PUT()
	@Path("update")
	public DefaultResponse updateRestaurant() {
		return DefaultResponses.RESTAURANT_UPDATED.getResponse();
	}

	@DELETE()
	@Path("remove")
	public String deleteRestaurant() {

		return "";
	}

}