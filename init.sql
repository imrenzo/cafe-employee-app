
CREATE SEQUENCE employee_seq START 0 MINVALUE 0 INCREMENT 1;
CREATE TABLE IF NOT EXISTS employees (
    seq_id BIGINT DEFAULT nextval('employee_seq'),
    id CHAR(9) GENERATED ALWAYS AS ('UI' || LPAD(seq_id::text, 7, '0')) STORED PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	/*https://www.regular-expressions.info/email.html*/
    email_address VARCHAR(255) NOT NULL UNIQUE CHECK (email_address ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), 
    phone_number CHAR(8) NOT NULL CHECK (phone_number ~ '^[89][0-9]{7}$'),
    gender VARCHAR(6) NOT NULL CHECK (gender IN ('male', 'female')) -- No uppercase for consistency
);

CREATE TABLE IF NOT EXISTS cafes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    logo TEXT, -- image url/path
    location VARCHAR(255) NOT NULL CHECK (location !~ '[A-Z]') -- No uppercase for consistency
);

CREATE TABLE IF NOT EXISTS employee_cafe (
    employee_id CHAR(9) PRIMARY KEY REFERENCES employees(id) ON DELETE CASCADE,
    cafe_id UUID NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
    start_date DATE NOT NULL
);

--  Seed data for employees table  --
DO $$
DECLARE
    i INT;
    first_names TEXT[] := ARRAY[
        'John','Jane','Alice','Bob','Charlie','Diana','Eve','Frank','Grace','Hannah',
        'Ian','Jack','Karen','Leo','Mia','Nina','Oscar','Paul','Quinn','Rachel',
        'Steve','Tina','Uma','Victor','Wendy','Xander','Yara','Zoe','Liam','Noah',
        'Emma','Olivia','Ava','Sophia','Isabella','Mason','Logan','Lucas','Ethan','James',
        'Benjamin','Elijah','Alexander','Michael','Daniel','Matthew','Henry','Jackson','Sebastian','Jack'
    ];
    last_names TEXT[] := ARRAY[
        'Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Garcia','Rodriguez','Wilson',
        'Martinez','Anderson','Taylor','Thomas','Hernandez','Moore','Martin','Jackson','Thompson','White',
        'Lopez','Lee','Gonzalez','Harris','Clark','Lewis','Robinson','Walker','Perez','Hall',
        'Young','Allen','Sanchez','Wright','King','Scott','Green','Baker','Adams','Nelson',
        'Hill','Ramirez','Campbell','Mitchell','Roberts','Carter','Phillips','Evans','Turner','Torres'
    ];
    genders TEXT[] := ARRAY['male','female'];
BEGIN
    FOR i IN 1..50 LOOP
        INSERT INTO employees (name, email_address, phone_number, gender)
        VALUES (
            first_names[i] || ' ' || last_names[i],
            LOWER(first_names[i] || '.' || last_names[i] || '@gmail.com'),
            (8 + FLOOR(random() * 2))::INT || LPAD((FLOOR(random() * 10000000))::TEXT,7,'0'),  -- starts with 8 or 9
            genders[1 + (i % 2)]
        );
    END LOOP;
END $$;

--  Seed data for cafes table  --
DO $$
DECLARE
    cafe_names TEXT[] := ARRAY[
        'ABC Cafe', 'Cafe XYZ', 'Java Beans', 'Latte Lounge', 'Mocha House',
        'Brew & Co', 'Cuppa Corner', 'The Coffee Spot', 'Espresso Express', 'Bean There'
    ];
    locations TEXT[] := ARRAY[
        'orchard','marina','clementi','tanjong_pagar','bugis',
        'holland_village','toa_payoh','bishan','novena','bukit_timah'
    ];
    i INT;
BEGIN
    FOR i IN 1..10 LOOP
        INSERT INTO cafes (name, description, location, logo)
        VALUES (
            cafe_names[i],
            'Description for ' || cafe_names[i],
            locations[i],
            '/uploads/' || LOWER(REPLACE(cafe_names[i],' ','_')) || '.png'
        );
    END LOOP;
END $$;

--  Seed data for employee_cafe table  --
DO $$
DECLARE
    emp RECORD;
    cafe_ids UUID[];
    days_ago INT;
BEGIN
    SELECT array_agg(id) INTO cafe_ids FROM cafes;

    FOR emp IN SELECT id FROM employees LOOP
        days_ago := FLOOR(random() * 30)::INT;
        INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
        VALUES (
            emp.id,
            cafe_ids[1 + FLOOR(random() * array_length(cafe_ids,1))],  -- random cafe
            CURRENT_DATE - days_ago  -- random start date in last 30 days
        );
    END LOOP;
END $$;
