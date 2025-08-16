package org.restaurant.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record RestaurantUpdateDTO(
	@Size(max = 20, min = 3, message = "use no máximo 20 caracteres e no mínimo 3 caracteres no título") String title,
	@Email(message = "email inválido") String email,
	 String description,
	@Size(min = 6, max = 12, message = "senha deve ter de 6 a 12 caracteres") String password) {

}