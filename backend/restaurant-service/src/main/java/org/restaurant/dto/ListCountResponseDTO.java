package org.restaurant.dto;

import java.util.List;

public record ListCountResponseDTO<T>(int pages, long total, List<T> list) {

}