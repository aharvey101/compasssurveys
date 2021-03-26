CREATE TABLE surveys (
  id SERIAL NOT NULL PRIMARY KEY,
  name varchar(255),
  question_Number int
);

CREATE TABLE questions (
  id SERIAL NOT NULL PRIMARY KEY,
  survey_id int NOT NULL,
  title varchar(255) NOT NULL,
  questionDescription varchar(255),
  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE answers (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(255) NOT NULL,
  question_id int NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);