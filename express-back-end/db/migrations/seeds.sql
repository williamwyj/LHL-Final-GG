INSERT INTO users (username, password)
VALUES

('Test', 'a'),
('gamer100', 'a'),
('mario', 'a');

INSERT INTO reviews (user_id, game_id, content, rating)
VALUES 

(2, 3, 'This game sucks!', 1),
(3, 3, 'This game rules!', 10),
(3, 2, 'Althought flawed this game has some real potential behind it', 5);

INSERT INTO games (title, description, platform)
VALUES 
('Scrabble Extreme', 'Creating words on a board under threat of a hired gunman', 'PS5'),
('Bowser''s contemplation', 'a harrowing meditation on evil', 'Switch'),
('The Legend of Zelda Bad Breath of the Wild', 'Finally, brush ganondorf''s teeth!', 'Switch');

INSERT INTO likes (user_id, review_id, type)
VALUES 

(1, 3, 'like'),
(1, 2, 'hmm'),
(1, 1, 'haha'),
(2, 3, 'like'),
(2, 2, 'haha');

INSERT INTO user_game_relationships (user_id, game_id, liked, played, play_list)
VALUES

(3, 2, TRUE, TRUE, FALSE),
(3, 3, TRUE, FALSE, TRUE),
(2, 1, FALSE, FALSE, TRUE),
(1, 1, FALSE, TRUE, FALSE);

INSERT INTO followers (user_id, follower_id)
VALUES
(3, 2),
(3, 1),
(2, 1),
(1, 2),
(1, 3);