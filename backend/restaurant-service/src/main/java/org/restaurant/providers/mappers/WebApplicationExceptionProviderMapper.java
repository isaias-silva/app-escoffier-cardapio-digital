package org.restaurant.providers.mappers;

import org.restaurant.dto.ErrorResponseDTO;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class WebApplicationExceptionProviderMapper implements ExceptionMapper<WebApplicationException> {

	@Override
	public Response toResponse(final WebApplicationException e) {
		ErrorResponseDTO error = new ErrorResponseDTO(e.getResponse().getStatus(), e.getMessage());

		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
	}
}