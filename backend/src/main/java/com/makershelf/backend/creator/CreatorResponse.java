package com.makershelf.backend.creator;

public record CreatorResponse(Long id, String name, String contact) {

	public static CreatorResponse from(Creator creator) {
		return new CreatorResponse(creator.getId(), creator.getName(), creator.getContact());
	}
}
