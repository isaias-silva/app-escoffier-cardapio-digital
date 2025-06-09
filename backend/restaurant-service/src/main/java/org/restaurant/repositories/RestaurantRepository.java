package org.restaurant.repositories;

import org.restaurant.models.RestaurantEntity;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RestaurantRepository implements PanacheMongoRepository<RestaurantEntity> {


}