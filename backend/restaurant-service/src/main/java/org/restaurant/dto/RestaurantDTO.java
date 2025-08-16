package org.restaurant.dto;

import java.util.List;

public record RestaurantDTO(String title,String email, String description, List<String> rules) {

}