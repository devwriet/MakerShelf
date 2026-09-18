package com.makershelf.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// CI에는 Oracle이 없어서, 실제 JPA 리포지토리 빈이 뜨는지까지 확인하되 DB는 인메모리 H2로 대체해요.
// Flyway는 Oracle 전용 마이그레이션이라 테스트에서는 꺼요. 실제 DB 연결은 로컬에서
// ./gradlew bootRun으로 확인하세요.
@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:makershelf-test;DB_CLOSE_DELAY=-1",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
		"spring.flyway.enabled=false"
})
class MakerShelfApplicationTests {

	@Test
	void contextLoads() {
	}

}
