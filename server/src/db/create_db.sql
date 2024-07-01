CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  isadmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS proposals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  cost DECIMAL NOT NULL,
  isapproved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (author) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proposal_id INTEGER NOT NULL,
  voter TEXT NOT NULL,
  score INTEGER NOT NULL,
  FOREIGN KEY (proposal_id) REFERENCES proposals(id),
  FOREIGN KEY (voter) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS state (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  budget DECIMAL NOT NULL,
  phase INTEGER DEFAULT 0
);

INSERT
  INTO users (username, email, name, surname, password, salt, isadmin)
VALUES 
  ('admin', 'admin@gmail.com', 'Fulvio',      'Corno',    'acf95ff8f78df596082a188add8fd0e7e0b745793ec395f4c08659ea4ed11177a719bdc6389e50f6587e6e612931b9e2a97d128610d3b2f419d495c00a197b3c', '01234567890123456789012345678901', true),  -- password: admin
  ('user1', 'user1@gmail.com', 'Fulvio',      'Corno',    '18843fe59c9f6731eed25d30d6b4f24ba9ba9b5f0dd2cbe66f7b9cda42025587ab2d8cb0ed0a512b1d130fdd1f0a0c477b47b3f85a3eaecb1a93db14aa6540a6', '01234567890123456789012345678901', false), -- password: user1
  ('user2', 'user2@gmail.com', 'Luca',        'Mannella', '8961d32f6aa6522cc0b6afeaf49a48174e8f4c4feeb61e87d9fd529005328ac8898ec483850467153f22ee2980d7429e77ae5b4bba645a2c4f9922cf4a1c5935', '01234567890123456789012345678901', false), -- password: user2
  ('user3', 'user3@gmail.com', 'Juan Pablo',  'Sáenz',    '865aff81d90ddbd008d5910b8adb8869e90ed522a120f7476ad9b0c6112f9fd654406c4ef6dee5e2ade30dc90bf33602f8a2f195249724cd34fa238d54d8ec8e', '01234567890123456789012345678901', false); -- password: user3
