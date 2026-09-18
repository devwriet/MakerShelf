package com.makershelf.backend.creator;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

// 각 테스트가 남긴 데이터가 다음 테스트에 영향을 주지 않도록 트랜잭션을 롤백해요.
@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:makershelf-test;DB_CLOSE_DELAY=-1",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.flyway.enabled=false"
})
@AutoConfigureMockMvc
@Transactional
class CreatorControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void findAll_returns200AndList() throws Exception {
		createCreator("김민준", "010-1234-5678");

		mockMvc.perform(get("/api/creators"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1)))
				.andExpect(jsonPath("$[0].name").value("김민준"));
	}

	@Test
	void findById_returns200_whenCreatorExists() throws Exception {
		long id = createCreator("이서연", "seoyeon@example.com");

		mockMvc.perform(get("/api/creators/{id}", id))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id))
				.andExpect(jsonPath("$.name").value("이서연"))
				.andExpect(jsonPath("$.contact").value("seoyeon@example.com"));
	}

	@Test
	void findById_returns404_whenCreatorMissing() throws Exception {
		mockMvc.perform(get("/api/creators/{id}", 999L))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.message").value("Creator not found: 999"));
	}

	@Test
	void create_returns201_whenValid() throws Exception {
		mockMvc.perform(post("/api/creators")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest("박도윤", null))))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.name").value("박도윤"))
				.andExpect(jsonPath("$.contact").doesNotExist());
	}

	@Test
	void create_returns400_whenNameBlank() throws Exception {
		mockMvc.perform(post("/api/creators")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest(" ", "010-0000-0000"))))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.name").exists());
	}

	@Test
	void update_returns200_whenValid() throws Exception {
		long id = createCreator("최수아", "old@example.com");

		mockMvc.perform(put("/api/creators/{id}", id)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest("최수아", "new@example.com"))))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.contact").value("new@example.com"));
	}

	@Test
	void update_returns400_whenNameBlank() throws Exception {
		long id = createCreator("한지우", null);

		mockMvc.perform(put("/api/creators/{id}", id)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest("", null))))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.name").exists());
	}

	@Test
	void update_returns404_whenCreatorMissing() throws Exception {
		mockMvc.perform(put("/api/creators/{id}", 999L)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest("아무개", null))))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.message").value("Creator not found: 999"));
	}

	@Test
	void delete_returns204_whenCreatorExists() throws Exception {
		long id = createCreator("삭제대상", null);

		mockMvc.perform(delete("/api/creators/{id}", id))
				.andExpect(status().isNoContent());

		mockMvc.perform(get("/api/creators/{id}", id))
				.andExpect(status().isNotFound());
	}

	@Test
	void delete_returns404_whenCreatorMissing() throws Exception {
		mockMvc.perform(delete("/api/creators/{id}", 999L))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.message").value("Creator not found: 999"));
	}

	private long createCreator(String name, String contact) throws Exception {
		String response = mockMvc.perform(post("/api/creators")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(new CreatorRequest(name, contact))))
				.andExpect(status().isCreated())
				.andReturn().getResponse().getContentAsString();
		return objectMapper.readTree(response).get("id").asLong();
	}
}
