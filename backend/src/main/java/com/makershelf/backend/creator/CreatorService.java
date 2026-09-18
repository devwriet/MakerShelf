package com.makershelf.backend.creator;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CreatorService {

	private final CreatorRepository creatorRepository;

	public CreatorService(CreatorRepository creatorRepository) {
		this.creatorRepository = creatorRepository;
	}

	public List<CreatorResponse> findAll() {
		return creatorRepository.findAll().stream().map(CreatorResponse::from).toList();
	}

	public CreatorResponse findById(Long id) {
		return CreatorResponse.from(getOrThrow(id));
	}

	public CreatorResponse create(CreatorRequest request) {
		Creator creator = new Creator();
		creator.setName(request.name());
		creator.setContact(request.contact());
		return CreatorResponse.from(creatorRepository.save(creator));
	}

	public CreatorResponse update(Long id, CreatorRequest request) {
		Creator creator = getOrThrow(id);
		creator.setName(request.name());
		creator.setContact(request.contact());
		return CreatorResponse.from(creatorRepository.save(creator));
	}

	public void delete(Long id) {
		if (!creatorRepository.existsById(id)) {
			throw new CreatorNotFoundException(id);
		}
		creatorRepository.deleteById(id);
	}

	private Creator getOrThrow(Long id) {
		return creatorRepository.findById(id).orElseThrow(() -> new CreatorNotFoundException(id));
	}
}
