package org.restaurant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RestaurantDTO(

	@NotBlank(message = "título é obrigatório") @Size(max = 20, min = 3, message = "use no máximo 20 caracteres e no mínimo 3 caracteres no título") String title,
	@NotBlank(message = "O email é obrigatório") @Email(message = "email inválido") String email,
	@NotBlank(message = "é preciso uma descrição") String description,
	@NotBlank(message = "senha é obrigatória") @Size(min = 6, max = 12, message = "senha deve ter de 6 a 12 caracteres") String password,
	String profile) {

}