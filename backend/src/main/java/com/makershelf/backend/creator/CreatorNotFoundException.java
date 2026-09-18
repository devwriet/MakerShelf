package com.makershelf.backend.creator;

public class CreatorNotFoundException extends RuntimeException {

	public CreatorNotFoundException(Long id) {
		super("Creator not found: " + id);
	}
}
