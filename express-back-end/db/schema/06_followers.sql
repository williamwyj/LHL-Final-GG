DROP TABLE IF EXISTS user_game_relationships CASCADE
CREATE TABLE user_game_relationships (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id REFERENECES users(id),
  follower_id REFERENCES users(id)
);