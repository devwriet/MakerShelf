package com.makershelf.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.flyway.autoconfigure.FlywayAutoConfiguration;
import org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

// DB, Hibernate, Flyway 관련 자동 설정을 빼요 — CI에는 Oracle이 없어서 이 테스트는
// 컨텍스트가 (DB 없이) 뜨는지만 확인해요. 실제 DB 연결은 로컬에서 ./gradlew bootRun으로 확인하세요.
@SpringBootTest
@EnableAutoConfiguration(exclude = {
		DataSourceAutoConfiguration.class,
		HibernateJpaAutoConfiguration.class,
		FlywayAutoConfiguration.class
})
class MakerShelfApplicationTests {

	@Test
	void contextLoads() {
	}

}
