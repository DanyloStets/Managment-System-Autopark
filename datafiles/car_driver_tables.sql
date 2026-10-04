CREATE TABLE `car` (
  `id_car` int NOT NULL,
  `vin` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `mileage` int DEFAULT NULL,
  `plate_number` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `driver` (
  `id_driver` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `car` varchar(45) DEFAULT NULL,
  `licence_id` varchar(45) DEFAULT NULL,
  `license_category` varchar(45) DEFAULT NULL,
  `experience_years` INT DEFAULT NULL,
  `medical_id` INT DEFAULT NULL,
  `medical_check_date` DATE,
  PRIMARY KEY (`id_driver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `maintenance_service` (
  `id_service` int NOT NULL,
  `vehicle_id` int DEFAULT NULL,
  `scheduled_date` DATE,
  `completed_date` DATE,
  `mileage_target` int DEFAULT NULL,
  `work_performed` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `route` (
  `id_route` int NOT NULL,
  `vehicle_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `destination` varchar(45) DEFAULT NULL,
  `from_where` varchar(45) DEFAULT NULL,
  `time_from` DATE,
  `time_arrival` DATE,
  PRIMARY KEY (`id_route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `expenses`(
	`id_expenses` int NOT NULL,
    `vehicle_id` int DEFAULT NULL,
    `category` varchar(45) DEFAULT NULL,
    `amount` int DEFAULT NULL,
    `date` DATE,
    `receipt_ref` int DEFAULT NULL,
    PRIMARY KEY (`id_expenses`)
);

CREATE TABLE `notification`(
	`id_notification` int NOT NULL,
    `type` varchar(45) DEFAULT NULL,
    `message` varchar(100) DEFAULT NULL,
    `to_date` DATE,
    `is_read` BOOLEAN,
    PRIMARY KEY (`id_notification`)
);
