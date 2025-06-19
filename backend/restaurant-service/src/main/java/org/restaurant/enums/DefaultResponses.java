package org.restaurant.enums;

import org.restaurant.dto.DefaultResponseDTO;

public enum DefaultResponses {


	RESTAURANT_CREATED(new DefaultResponseDTO(201, "restaurante cadastrado!")),
	RESTAURANT_UPDATED(new DefaultResponseDTO(200, "restaurante atualizado com sucesso!")),
	RESTAURANT_DELETED(new DefaultResponseDTO(200, "restaurante removido."));

	private final DefaultResponseDTO response;


	DefaultResponses(DefaultResponseDTO response) {
		this.response = response;
	}


	public DefaultResponseDTO getResponse() {
		return response;
	}
}