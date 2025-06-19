package org.restaurant.dto;
import jakarta.validation.constraints.NotBlank;


public record LoginRequestDTO(@NotBlank(message = "O email é obrigatório") String email,
	@NotBlank(message = "senha é obrigatória") String password) {

}