package org.restaurant.entities;

import java.util.HashSet;
import java.util.Set;

import org.restaurant.dto.RestaurantCreateDTO;
import org.restaurant.dto.RestaurantDTO;
import org.restaurant.enums.Rules;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurants")
public class RestaurantEntity extends PanacheEntity {

	private String email;

	private String title;

	private String description;

	private String profileUrl;

	private String password;

	private Set<String> rules;


	public RestaurantEntity() {

	}


	public RestaurantEntity(String title, String email, String description, String password, Set<String> rules) {
		this.title = title;
		this.email = email;
		this.description = description;
		this.rules = rules;
		this.password = password;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(final String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(final String email) {
		this.email = email;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(final String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(final String description) {
		this.description = description;
	}


	public String getProfileUrl() {
		return profileUrl;
	}


	public void setProfileUrl(final String profileUrl) {
		this.profileUrl = profileUrl;
	}


	public Set<String> getRules() {
		return rules;
	}


	public void setRules(final HashSet<String> rules) {
		this.rules = rules;
	}


	public RestaurantDTO toDto() {
		return new RestaurantDTO(title, email, description, rules.stream().toList());
	}


	public static RestaurantEntity fromDto(RestaurantCreateDTO dto) {

		return new RestaurantEntity(dto.title(), dto.email(), dto.description(), dto.password(),
			Set.of(Rules.UNVERIFIED.getValue()));
	}

}