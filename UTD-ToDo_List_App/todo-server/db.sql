CREATE DATABASE todo-db;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description TEXT,
    is_done BOOLEAN DEFAULT 'f',
    created_at TIMESTAMP NULL,
    modified_at TIMESTAMP NULL,
    is_deleted BOOLEAN DEFAULT 'f'
);