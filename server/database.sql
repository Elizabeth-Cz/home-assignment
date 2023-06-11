CREATE DATABASE fourindustry;

CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        employee_number VARCHAR,
        first_name VARCHAR,
        last_name VARCHAR,
        email_address VARCHAR,
        phone_number VARCHAR,
        company_id VARCHAR
    );