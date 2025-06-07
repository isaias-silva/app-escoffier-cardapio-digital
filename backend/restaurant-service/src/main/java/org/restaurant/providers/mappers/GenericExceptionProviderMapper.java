package org.restaurant.providers.mappers;

import org.restaurant.dto.ErrorResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GenericExceptionProviderMapper implements ExceptionMapper<Exception> {

	@Override
	public Response toResponse(final Exception e) {
		ErrorResponseDTO error = new ErrorResponseDTO(500, e.getMessage());

		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
	}
}