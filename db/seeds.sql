INSERT INTO departments (name)
VALUES ('Medical/Surgical'),
       ('Emergency Services'),
       ('Administration'),
       ('Radiology'),
       ('Pharmacy');

INSERT INTO roles (title, salary, department)
VALUES ('Physician', 180000, 1),
       ('Surgeon', 450000, 1),
       ('Nurse', 80000, 1),
       ('ER Doctor', 3000000, 2),
       ('Paramedic', 60000, 2),
       ('ER Coordinator', 75000, 2),
       ('Hospital Administrator', 120000, 3),
       ('Medical Records', 50000, 3),
       ('Finance Manager', 100000, 3),
       ('Radiologist', 500000, 4),
       ('X-Ray Technician', 70000, 4),
       ('MRI Technologist', 65000, 4),
       ('Pharmacist', 150000,5),
       ('Pharmacy Technician', 40000, 5);
 
 INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES  ('Vinay', 'Kumar', NULL , 1),
        ('Jenna', 'Baker', 1 , 2),
        ('Sabrina', 'Carpenter', 1 , 3),
        ('Jacob', 'Casey', 3 , 4),
        ('Hayden', 'Craft', 7 , 5),
        ('Peter', 'Teimouri', 7 , 6),
        ('Aidan', 'Pawlak', 1 , 7),
        ('David', 'Fuentes', 1 , 8),
        ('Zane', 'Baker', 1 , 9),
        ('Shane', 'Jewett', 1 , 10),
        ('Alex', 'Smith', 10 , 11),
        ('Oliver', 'Herres', 10 , 12),
        ('Owen', 'Arehart', 4 , 13),
        ('Alejandro', 'Monteflores', 1 , 14),
        ('Spencer', 'Divine', 14 , 15);
        