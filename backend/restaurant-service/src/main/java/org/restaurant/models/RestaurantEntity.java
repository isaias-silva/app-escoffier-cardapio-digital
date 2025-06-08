package org.restaurant.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class RestaurantEntity {
    @Id
    @GeneratedValue
    public Long id;

    public String email;
    public String title;
    public String description;
    public String profile_url;

}
