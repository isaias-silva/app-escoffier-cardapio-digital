package org.restaurant.providers.mappers;

import org.restaurant.dto.ErrorResponseDTO;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ClientExceptionProviderMapper implements ExceptionMapper<ClientErrorException> {

	@Override
	public Response toResponse(final ClientErrorException e) {

		int status=e.getResponse().getStatus();
		ErrorResponseDTO error = new ErrorResponseDTO(status, e.getMessage());

		return Response.status(status).entity(error).build();
	}
}