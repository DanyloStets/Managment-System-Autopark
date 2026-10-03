CREATE TABLE `car` (
  `id_car` int NOT NULL,
  `vin` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `mileage` int DEFAULT NULL,
  PRIMARY KEY (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `driver` (
  `id_driver` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `car` varchar(45) DEFAULT NULL,
  `id_licence` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `maintenance_service` (
  `id_service` int NOT NULL,
  `car_last` int DEFAULT NULL,
  `work_performed` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `route` (
  `id_route` int NOT NULL,
  `destination` varchar(45) DEFAULT NULL,
  `from_where` varchar(45) DEFAULT NULL,
  `time_from` varchar(45) DEFAULT NULL,
  `time_arrival` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
