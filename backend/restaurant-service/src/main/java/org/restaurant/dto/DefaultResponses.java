package org.restaurant.dto;

public enum DefaultResponses {


	RESTAURANT_CREATED(new DefaultResponse(201, "restaurante cadastrado!")),
	RESTAURANT_UPDATED(new DefaultResponse(200, "restaurante atualizado com sucesso!")),
	RESTAURANT_DELETED(new DefaultResponse(200, "restaurante removido."));

	private final DefaultResponse response;


	DefaultResponses(DefaultResponse response) {
		this.response = response;
	}


	public DefaultResponse getResponse() {
		return response;
	}
}