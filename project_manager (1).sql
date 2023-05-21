-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2023 at 09:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(20) NOT NULL,
  `description` varchar(20) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `description`, `start_date`, `end_date`, `name`) VALUES
(12, 'az', '2023-04-08', '2023-04-01', 'az'),
(22, '212123', '1211-02-21', '0121-02-21', 'KEAZ'),
(50, 'ZAEA', '1222-12-12', '1222-02-12', 'AEZ'),
(55, 'ZAEA', '1222-12-12', '1222-02-12', 'AEZ'),
(173, 'zaea', '2023-02-12', '2023-02-25', 'aea'),
(329, 'azea', '2023-02-17', '2023-02-19', 'zea');

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `Project_id` int(11) NOT NULL,
  `Member_email` varchar(20) NOT NULL,
  `Role` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `memberID` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`Project_id`, `Member_email`, `Role`, `name`, `memberID`) VALUES
(22, 'oussemasahbeni@gmail', 'aze', 'aeza', 12),
(22, 'gmail@gmail.com', 'aea', 'ezaez', 121),
(22, 'oussemasahbeni@gmail', 'azaz', 'azaz', 122);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskID` int(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `due_date` date NOT NULL,
  `Project_id` int(11) NOT NULL,
  `memberID` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `Age` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `firstname`, `lastname`, `email`, `gender`, `Age`, `username`, `password`) VALUES
(1, 'aa', 'aaa', 'aaa@gmail.com', '', 12, 'AZEA', '$2y$10$o3w03/vx4GNx0NcCxAIPK.aA.veia3dxsbkCAiGeewElXnqrICca6'),
(2, 'oussema', 'sahbeni', 'oussemasahbeni300@gmail.com', '', 12, 'spike', '$2y$10$YWmKDmZGUhCj7WPZ19p2GOPy.1ATzEJm/A4vBXRDtto02MAjuHw/i'),
(3, 'rayen', 'benomrane', 'rayenclub@gmail.com', '', 20, 'rayen', '$2y$10$mrV.EkEd0KQyhcikhJgfz.ze4WEcgqMkyzf57vCtvmwWAMGEBuQEK'),
(4, 'selim', 'selmi', 'selimselmi@gmail.com', 'male', 12, 'oussemasahbeni123', '$2y$10$ToVEoVNkZU/jJTbEUyutguPVpiM1oqh69YkUPG4e4bAmO7gaCV/Mm'),
(6, 'oumaima', 'sahbeni', 'oumaimasahbeni@gmail.com', 'female', 40, 'oumaima', '$2y$10$n2y1lQZJ.nIo1r72saWe5elnf0hXt8jznEOFeE2Vyup/QbL2IddbG'),
(8, 'Selim', 'Selmi', 'selimselmi123@gmail.com', 'other', 20, 'Selim123', '$2y$10$ndhRdpleUCie2Iho82v6AeuT7wmntcZ.7qKakJlH16hWHUflbDvfO'),
(9, 'achref', 'rahali', 'achrefhabib@gmail.com', 'other', 50, 'achref', '$2y$10$WSZZUCM5WFKpnqwRTs9W3Ome3tU2gINg2hEsD.STkKA1CCb5GJRBq'),
(10, 'achref', 'rahali', 'ach@gmail.com', 'male', 18, 'ach', '$2y$10$GARErostOjlqD8p8rL1GW.MSHkS2b86z4Q.VQVsOCtcAI72QUubqa'),
(11, 'zhbs', 'xhr', 'shhf@gmail.com', 'male', 120, 'fhfjud', '$2y$10$eiUScrtjHJNELT6HBfhMEulyv2gNx2wxWqA5UEdXza8V5FiLbHdXu'),
(13, 'ACHREF', 'JBALJLOUD', 'achrefjloud@gmail.com', 'other', 18, 'achref', '$2y$10$vzMNBwz/.7GpY4WttAYi0.PDcpdmAWKNTBmtTM3vHv9TPYIgSkpKG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`Project_id`,`memberID`),
  ADD KEY `memberID` (`memberID`),
  ADD KEY `Member_email` (`Member_email`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskID`,`Project_id`,`memberID`),
  ADD KEY `tasks_ibfk_1` (`Project_id`),
  ADD KEY `memberID` (`memberID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `ref` FOREIGN KEY (`Project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`Project_id`) REFERENCES `project_members` (`Project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`memberID`) REFERENCES `project_members` (`memberID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
