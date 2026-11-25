-- 로컬 개발용 가상 데이터예요.
-- NEXTVAL이 50씩 증가해 ID 간격도 50이에요.
INSERT INTO creator (id, name, contact)
VALUES (creator_seq.NEXTVAL, '김하늘', 'haneul.kim@example.com');

INSERT INTO creator (id, name, contact)
VALUES (creator_seq.NEXTVAL, '박도윤', NULL);

INSERT INTO creator (id, name, contact)
VALUES (creator_seq.NEXTVAL, '이다은', 'daeun.lee@example.com');
