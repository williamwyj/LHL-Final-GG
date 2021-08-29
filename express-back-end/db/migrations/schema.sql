DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL
);

DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  content TEXT,
  rating INTEGER
);

DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  platform VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS likes CASCADE;
CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  type VARCHAR(255)
);

DROP TABLE IF EXISTS user_game_relationships CASCADE;
CREATE TABLE user_game_relationships (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  liked BOOLEAN NOT NULL DEFAULT FALSE,
  played BOOLEAN NOT NULL DEFAULT FALSE,
  play_list BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS followers CASCADE;
CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  follower_id INTEGER REFERENCES users(id)
);