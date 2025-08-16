package org.restaurant.repositories;



import org.restaurant.entities.RestaurantEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RestaurantRepository implements PanacheRepository<RestaurantEntity> {
}