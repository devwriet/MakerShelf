package com.makershelf.backend.creator;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatorRequest(
		@NotBlank @Size(max = 100) String name,
		String contact) {
}
