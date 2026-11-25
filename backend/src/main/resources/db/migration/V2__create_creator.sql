-- Hibernate가 50개 ID를 예약하므로 증가 폭도 50으로 맞춰요.
CREATE SEQUENCE creator_seq
    START WITH 1
    INCREMENT BY 50;

-- AL32UTF8 한글도 글자 수 기준으로 길이를 제한해요.
CREATE TABLE creator (
    id NUMBER(19,0) PRIMARY KEY,
    name VARCHAR2(100 CHAR) NOT NULL,
    contact VARCHAR2(255 CHAR)
);
