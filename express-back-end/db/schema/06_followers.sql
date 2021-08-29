DROP TABLE IF EXISTS followers CASCADE
CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id REFERENECES users(id),
  follower_id REFERENCES users(id)
);