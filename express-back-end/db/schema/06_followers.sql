DROP TABLE IF EXISTS followers CASCADE;
CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  follower_id INTEGER REFERENCES users(id)
);