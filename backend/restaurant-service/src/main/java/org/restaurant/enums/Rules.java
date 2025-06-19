package org.restaurant.enums;

public enum Rules {
	ADMIN("admin"), RESTAURANT("restaurant"), BANNED("banned");

	private final String value;


	Rules(String valueRule) {
		value = valueRule;
	}


	public String getValue() {
		return value;
	}
}