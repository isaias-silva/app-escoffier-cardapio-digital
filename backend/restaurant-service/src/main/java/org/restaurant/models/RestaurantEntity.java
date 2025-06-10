package org.restaurant.models;

import org.restaurant.dto.RestaurantDTO;

import com.mongodb.lang.Nullable;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "restaurants")
public class RestaurantEntity extends PanacheMongoEntity {

	private String email;

	private String title;

	private String description;

	private String profileUrl;

	private String password;


	public RestaurantEntity() {

	}


	public RestaurantEntity(String title, String email, String description, String password ) {
		this.title = title;
		this.email = email;
		this.description = description;

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


	public static RestaurantEntity fromDto(RestaurantDTO dto) {

		return new RestaurantEntity(dto.title(), dto.email(), dto.description(), dto.password());
	}

}