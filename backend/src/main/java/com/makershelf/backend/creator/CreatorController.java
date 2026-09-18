package com.makershelf.backend.creator;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/creators")
public class CreatorController {

	private final CreatorService creatorService;

	public CreatorController(CreatorService creatorService) {
		this.creatorService = creatorService;
	}

	@GetMapping
	public List<CreatorResponse> findAll() {
		return creatorService.findAll();
	}

	@GetMapping("/{id}")
	public CreatorResponse findById(@PathVariable Long id) {
		return creatorService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CreatorResponse create(@Valid @RequestBody CreatorRequest request) {
		return creatorService.create(request);
	}

	@PutMapping("/{id}")
	public CreatorResponse update(@PathVariable Long id, @Valid @RequestBody CreatorRequest request) {
		return creatorService.update(id, request);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		creatorService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
