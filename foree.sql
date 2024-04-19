-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 07:01 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foree`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`) VALUES
(4001, 'Trans Studio Mall Bandung', 'Jl. Gatot Subroto No.289'),
(4002, 'Griya Buah Batu', 'Jl. Buah Batu No.183-185'),
(4003, 'Bandung Indah Plaza', 'Jl. Merdeka No.56'),
(4004, 'Dipatiukur, Bandung', 'Jl. Dipatiukur No.71');

-- --------------------------------------------------------

--
-- Table structure for table `branchproduct`
--

CREATE TABLE `branchproduct` (
  `branchId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `branchproduct`
--

INSERT INTO `branchproduct` (`branchId`, `productId`, `productQuantity`) VALUES
(4001, 2001, 17),
(4001, 2002, 11),
(4001, 2003, 5),
(4001, 2004, 6),
(4001, 2008, 7),
(4001, 2013, 10),
(4001, 2014, 15),
(4001, 2015, 5),
(4001, 2016, 9),
(4001, 2017, 8),
(4001, 2018, 12),
(4001, 2019, 5),
(4002, 2001, 8),
(4002, 2002, 9),
(4002, 2005, 8),
(4002, 2013, 7),
(4002, 2014, 15),
(4002, 2015, 8),
(4002, 2016, 9),
(4002, 2017, 8),
(4002, 2018, 11),
(4002, 2019, 10),
(4003, 2007, 12),
(4003, 2008, 11),
(4003, 2013, 10),
(4003, 2014, 4),
(4003, 2015, 12),
(4003, 2016, 7),
(4003, 2017, 13),
(4003, 2018, 9),
(4003, 2019, 6),
(4004, 2001, 13),
(4004, 2002, 11),
(4004, 2007, 9),
(4004, 2008, 15),
(4004, 2013, 10),
(4004, 2014, 9),
(4004, 2015, 10),
(4004, 2016, 7),
(4004, 2017, 8),
(4004, 2018, 12),
(4004, 2019, 12);

-- --------------------------------------------------------

--
-- Table structure for table `deliverydetails`
--

CREATE TABLE `deliverydetails` (
  `orderId` int(11) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `deliverydetails`
--

INSERT INTO `deliverydetails` (`orderId`, `phoneNumber`, `address`) VALUES
(3001, '087825672313', 'Jl Bojong Kenyot');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`orderId`, `productId`, `quantity`) VALUES
(3001, 2002, 1),
(3002, 2001, 1),
(3002, 2003, 2),
(3003, 2008, 1),
(3004, 2001, 1),
(3004, 2005, 1),
(3006, 2001, 1),
(3006, 2002, 3),
(3007, 2007, 1),
(3008, 2007, 1),
(3009, 2005, 2),
(3010, 2003, 1),
(3011, 2001, 1),
(3011, 2004, 1),
(3012, 2007, 1),
(3013, 2003, 2),
(3014, 2002, 1),
(3015, 2001, 1),
(3023, 2001, 2),
(3023, 2002, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `transactionTime` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `userId` int(11) DEFAULT NULL,
  `status` enum('ON PROGRESS','ON DELIVERY','COMPLETED') NOT NULL,
  `branchid` int(11) DEFAULT NULL,
  `paymentMethod` enum('CASH','SHOPEEPAY','OVO','GOPAY') NOT NULL,
  `devileryMethod` enum('DELIVERY','PICK UP') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `transactionTime`, `userId`, `status`, `branchid`, `paymentMethod`, `devileryMethod`) VALUES
(3001, '2023-04-19 08:29:46', 1007, 'COMPLETED', 4001, 'CASH', 'DELIVERY'),
(3002, '2024-02-21 04:40:01', 1008, 'COMPLETED', 4001, 'SHOPEEPAY', 'DELIVERY'),
(3003, '2024-02-21 04:40:03', 1011, 'COMPLETED', 4004, 'OVO', 'DELIVERY'),
(3004, '2024-02-21 04:40:09', 1010, 'COMPLETED', 4002, 'GOPAY', 'DELIVERY'),
(3005, '2024-02-21 04:40:10', 1012, 'COMPLETED', 4003, 'CASH', 'PICK UP'),
(3006, '2024-02-21 04:39:53', 1012, 'ON DELIVERY', 4001, 'CASH', 'DELIVERY'),
(3007, '2023-04-19 08:29:46', 1008, 'COMPLETED', 4003, 'CASH', 'DELIVERY'),
(3008, '2023-04-19 08:29:46', 1009, 'COMPLETED', 4003, 'CASH', 'DELIVERY'),
(3009, '2024-02-21 04:39:55', 1009, 'ON PROGRESS', 4002, 'CASH', 'DELIVERY'),
(3010, '2024-02-21 04:40:16', 1010, 'COMPLETED', 4001, 'CASH', 'PICK UP'),
(3011, '2023-04-19 08:29:46', 1007, 'COMPLETED', 4001, 'CASH', 'DELIVERY'),
(3012, '2023-04-19 08:29:46', 1007, 'COMPLETED', 4004, 'CASH', 'DELIVERY'),
(3013, '2023-05-02 08:29:46', 1010, 'COMPLETED', 4001, 'CASH', 'DELIVERY'),
(3014, '2024-02-21 04:39:57', 1012, 'ON PROGRESS', 4004, 'CASH', 'DELIVERY'),
(3015, '2024-02-21 04:39:59', 1008, 'ON DELIVERY', 4004, 'CASH', 'DELIVERY'),
(3023, '2023-05-03 04:57:16', 1014, 'COMPLETED', 4002, 'CASH', 'DELIVERY');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `pictureUrl` varchar(255) NOT NULL,
  `category` enum('COFFEE','NON COFFEE','DONUT') NOT NULL,
  `subcategory` enum('LATTE','FLAVOURED COFFEE','CHOCOLATE','REFRESHER','DONUTS') NOT NULL,
  `desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `pictureUrl`, `category`, `subcategory`, `desc`) VALUES
(2001, 'Caramel Praline Coffee Ice Blended', 33000, 'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE20220316104853625591/detail/b39059c734f247c88b9f82fecf66a254_1677604096059278500.webp', 'COFFEE', 'FLAVOURED COFFEE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2002, 'Nutty Oat Latte', 39000, 'https://asset.kompas.com/crops/HKEAkp9mCy39YbCBpQ56mnlN2X8=/0x0:0x0/750x500/data/photo/2021/06/02/60b724e0ef82b.jpg', 'COFFEE', 'LATTE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2003, 'Shaken Choco Berry', 33000, 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230208170127306174/detail/798000e665fa40e6bcbf4e70c286a5b7_1678986036468904256.webp', 'NON COFFEE', 'CHOCOLATE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2004, 'Butterscotch Sea Salt Latte', 29000, 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/7782cfde-12c1-43f1-bb3f-61ac6c7be67e_menu-item-image_1661308493316.jpg', 'COFFEE', 'LATTE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2005, 'Double Iced Shaken Latte', 33000, 'https://fore.coffee/wp-content/uploads/2019/12/Iced-Roasted-Latte-1.jpg', 'COFFEE', 'LATTE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2007, 'Hibiscus Lychee Peach Yakult', 29000, 'https://www.foodierate.com/uploads/fullsize/42621/1SqRFW6342c46507576_hibiscus-peach-yakult-fore-coffee.jpg', 'NON COFFEE', 'REFRESHER', 'Minuman sehat yang menyegarkan wkowkwok'),
(2008, 'Matcha Ice Blended', 33000, 'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE20220316104940232875/detail/f85874db39064fa28d27b95b3da05da9_1647427780451619770.webp', 'NON COFFEE', 'REFRESHER', 'Minuman sehat yang menyegarkan wkowkwok'),
(2011, 'Coffee Latte', 10000, 'images.google.com/1', 'COFFEE', 'LATTE', 'Minuman sehat yang menyegarkan wkowkwok'),
(2012, 'Iced Aren Latte 123', 28000, 'https://profile.fore.coffee/wp-content/uploads/2019/12/Aren-Latte.jpg', 'COFFEE', 'LATTE', ''),
(2013, 'Chocolate Donut', 13000, 'https://media.istockphoto.com/photos/donut-with-sprinkles-isolated-picture-id538335769?k=6&m=538335769&s=612x612&w=0&h=3tWMzxWCN99V21CcbUny2TQBsYklc1es3gARr4add7s=', 'DONUT', 'DONUTS', 'donut enak sekali'),
(2014, 'Strawberry Donut', 13000, 'https://media.istockphoto.com/photos/donut-with-sprinkles-isolated-picture-id538335769?k=6&m=538335769&s=612x612&w=0&h=3tWMzxWCN99V21CcbUny2TQBsYklc1es3gARr4add7s=', 'DONUT', 'DONUTS', 'donut enak sekali'),
(2015, 'Tiramisu Donut', 15000, 'https://media.istockphoto.com/photos/donut-with-sprinkles-isolated-picture-id538335769?k=6&m=538335769&s=612x612&w=0&h=3tWMzxWCN99V21CcbUny2TQBsYklc1es3gARr4add7s=', 'DONUT', 'DONUTS', 'donut enak sekali'),
(2016, 'Pure Cocoa Drink', 35000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOmgaYeH8CuBL39nCV0GgIM2lRzZDu4k1XrVtyI3Y4A&s', '', 'CHOCOLATE', 'chocolate enak'),
(2017, 'Caramel Chocolatier', 32000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOmgaYeH8CuBL39nCV0GgIM2lRzZDu4k1XrVtyI3Y4A&s', '', 'CHOCOLATE', 'chocolate enak'),
(2018, 'Lychee Tea', 31000, 'https://preppykitchen.com/wp-content/uploads/2023/09/Long-Island-Iced-Tea-Recipe-Card-500x500.jpg', '', 'REFRESHER', 'teh enak'),
(2019, 'Ice Jasmine Tea', 35000, 'https://preppykitchen.com/wp-content/uploads/2023/09/Long-Island-Iced-Tea-Recipe-Card-500x500.jpg', '', 'REFRESHER', 'teh enak');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `role` enum('CUSTOMER','ADMIN','INVESTOR') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `role`) VALUES
(1001, 'if-21010@students.ithb.ac.id', 'koja123', 'koja', 'INVESTOR'),
(1002, 'if-21020@students.ithb.ac.id', 'vincent123', 'Vincent', 'INVESTOR'),
(1003, 'if-21007@students.ithb.ac.id', 'sheren123', 'Sheren', 'INVESTOR'),
(1004, 'if-21055@students.ithb.ac.id', 'mena123', 'Mena', 'INVESTOR'),
(1005, 'if-21017@students.ithb.ac.id', 'felis123', 'Felis', 'INVESTOR'),
(1006, 'admin1@gmail.com', 'admin1123', 'Admin1', 'ADMIN'),
(1007, 'bryan@gmail.com', 'bryan123', 'Bryan', 'CUSTOMER'),
(1008, 'kecoy@gmail.com', 'kecoy123', 'Kecoy', 'CUSTOMER'),
(1009, 'epen@gmail.com', 'epen123', 'epen', 'CUSTOMER'),
(1010, 'abi@gmail.com', 'abi123', 'abitantan', 'CUSTOMER'),
(1011, 'shandy@gmail.com', 'shandy123', 'shandy', 'CUSTOMER'),
(1012, 'jul@gmail.com', 'jul123', 'jul', 'CUSTOMER'),
(1014, 'udin@gmail.com', 'password321', 'Udin Sukijan', 'CUSTOMER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `branchproduct`
--
ALTER TABLE `branchproduct`
  ADD PRIMARY KEY (`branchId`,`productId`) USING BTREE,
  ADD KEY `productId` (`productId`) USING BTREE;

--
-- Indexes for table `deliverydetails`
--
ALTER TABLE `deliverydetails`
  ADD PRIMARY KEY (`orderId`) USING BTREE;

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderId`,`productId`) USING BTREE,
  ADD KEY `productId` (`productId`) USING BTREE;

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `userId` (`userId`) USING BTREE,
  ADD KEY `branchid` (`branchid`) USING BTREE;

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4009;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3024;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3024;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2020;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1017;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branchproduct`
--
ALTER TABLE `branchproduct`
  ADD CONSTRAINT `branchproduct_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branches` (`id`),
  ADD CONSTRAINT `branchproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `deliverydetails`
--
ALTER TABLE `deliverydetails`
  ADD CONSTRAINT `deliverydetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`branchid`) REFERENCES `branches` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
