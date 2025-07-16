package org.restaurant.enums;

public enum Rules {

	ADMIN(RulesConstants.ADM), RESTAURANT(RulesConstants.RESTAURANT), BANNED(RulesConstants.BANNED);

	private final String value;


	Rules(String valueRule) {
		value = valueRule;
	}


	public String getValue() {
		return value;
	}
}