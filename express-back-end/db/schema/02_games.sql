DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE games (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  summary TEXT,
  platforms VARCHAR(255)[]  NOT NULL,
  first_release_date INTEGER,
  cover VARCHAR(255),
  screenshots VARCHAR(255)[]
);
