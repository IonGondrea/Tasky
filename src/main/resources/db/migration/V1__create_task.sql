CREATE TABLE tasks (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(100) NOT NULL,
                       description TEXT,
                       status VARCHAR(20) NOT NULL,
                       priority VARCHAR(10) NOT NULL,
                       due_date DATE,
                       created_at TIMESTAMP NOT NULL,
                       updated_at TIMESTAMP NOT NULL
);
