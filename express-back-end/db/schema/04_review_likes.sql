DROP TABLE IF EXISTS likes CASCADE
CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id REFERENECES users(id) ON DELETE CASCADE,
  review_id REFERENECES reviews(id) ON DELETE CASCADE,
  type VARCHAR(255)
);