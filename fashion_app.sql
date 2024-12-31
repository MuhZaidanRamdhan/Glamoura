-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2024 at 03:24 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashion_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`) VALUES
(1, 2, 1, 2),
(2, 2, 2, 1),
(3, 2, 3, 3),
(4, 2, 4, 1),
(5, 3, 5, 2),
(6, 3, 6, 1),
(7, 4, 1, 1),
(8, 4, 2, 1),
(9, 5, 7, 5),
(10, 5, 8, 2),
(63, 23, 2, 20),
(64, 22, 2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'T-shirts', 'Casual and formal T-shirts for all styles'),
(2, 'Jackets', 'Stylish jackets and outerwear for any seasons'),
(3, 'Pants', 'Wide variety of pants for men and women'),
(4, 'Shoes', 'Fashionable and comfortable shoes for every occasion'),
(5, 'Dresses', 'Elegant dresses for women of all sizes'),
(6, 'Accessories', 'Jewelry, belts, bags, and more fashion accessories'),
(9, 'Hats & Caps', 'Our hats and caps serve you comfort, versatility, and an edgy style');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_11_08_114259_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_code` varchar(36) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','completed','canceled') NOT NULL DEFAULT 'pending',
  `shipping_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_code`, `user_id`, `total_price`, `payment_status`, `shipping_address`, `created_at`, `updated_at`) VALUES
(8, 'OR008', 8, 220.00, 'completed', '852 Willow St, Austin', '2024-12-09 12:06:02', '2024-12-09 12:31:48'),
(9, 'OR009', 9, 130.00, 'pending', '963 Chestnut St, Denver', '2024-12-09 12:06:02', '2024-12-09 12:31:48'),
(10, 'OR010', 10, 50.00, 'canceled', '741 Oak St, Portland', '2024-12-09 12:06:02', '2024-12-09 12:31:48'),
(18, 'ORD-Z2QZ8XDFJO', 11, 1250.00, 'pending', 'Jln Tanah Raya', '2024-12-10 09:58:41', '2024-12-10 09:58:41'),
(21, 'ORD-342CF0IJ8B', 22, 270.00, 'completed', 'jln barcelona dalam', '2024-12-25 02:10:33', '2024-12-25 04:15:28'),
(26, 'ORD-EPJ4KLGMTH', 23, 2400.00, 'pending', 'Jln Tanah Baru 2', '2024-12-26 00:29:09', '2024-12-26 00:29:09'),
(27, 'ORD-LJ80QYGNOY', 22, 310.00, 'pending', 'BLOK N26/16', '2024-12-27 23:41:25', '2024-12-27 23:41:25'),
(30, 'ORD-AALXRO4LB5', 26, 210.00, 'completed', 'bekasi utara', '2024-12-30 12:39:50', '2024-12-30 12:41:42'),
(31, 'ORD-Q1KWHHVQJP', 27, 825.00, 'completed', 'Bekasi Timur Regency', '2024-12-30 15:58:43', '2024-12-30 16:24:25');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(27, 18, 2, 5, 120.00),
(28, 18, 1, 5, 25.00),
(29, 18, 7, 5, 20.00),
(30, 18, 9, 5, 85.00),
(34, 21, 8, 1, 110.00),
(35, 21, 5, 2, 80.00),
(42, 26, 2, 20, 120.00),
(43, 27, 5, 3, 80.00),
(44, 27, 1, 1, 25.00),
(45, 27, 3, 1, 45.00),
(52, 30, 5, 1, 80.00),
(53, 30, 36, 2, 65.00),
(54, 31, 5, 5, 80.00),
(55, 31, 9, 5, 85.00);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_method` enum('credit_card','bank_transfer','e_wallet') NOT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `payment_method`, `payment_status`, `transaction_id`, `amount`, `payment_url`) VALUES
(9, 27, 'e_wallet', 'paid', 'TXN-KGXPVLPD4R', 310.00, NULL),
(12, 30, 'credit_card', 'paid', 'TXN-ZPYRJD46UG', 210.00, NULL),
(13, 31, 'e_wallet', 'paid', 'TXN-MFU4TDXCQQ', 825.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(5, 'App\\Models\\User', 14, 'token', 'c8b1ef30500200b75c663f985e8787f0395b7d287b2804c75d955c80e950670d', '[\"*\"]', '2024-12-11 23:33:39', NULL, '2024-12-11 23:23:40', '2024-12-11 23:33:39'),
(6, 'App\\Models\\User', 1, 'token', '3e189bc38a54405f74239d39caac46888745942c9df6c51049d0c726fca80c38', '[\"*\"]', NULL, NULL, '2024-12-18 21:45:44', '2024-12-18 21:45:44'),
(7, 'App\\Models\\User', 21, 'token', '67b433a39b5dd58276820264b911b16b67974450a0d78eb83b05e634a89b127d', '[\"*\"]', NULL, NULL, '2024-12-18 21:51:59', '2024-12-18 21:51:59'),
(8, 'App\\Models\\User', 1, 'token', 'da161f0d65e74c9cc17c97e2dd265b11d646dc0eda79f4cd42c44900b85d4f14', '[\"*\"]', NULL, NULL, '2024-12-18 22:04:50', '2024-12-18 22:04:50'),
(9, 'App\\Models\\User', 1, 'token', 'b5f12010533679011e9b2a1450986f4310233b969117ed12a96c30abac59a520', '[\"*\"]', NULL, NULL, '2024-12-18 22:06:40', '2024-12-18 22:06:40'),
(10, 'App\\Models\\User', 1, 'token', '7122a2a61c9aa4358df1ad8b462f384329c2fd38754b879a4a95d1662c76911f', '[\"*\"]', NULL, NULL, '2024-12-18 22:09:13', '2024-12-18 22:09:13'),
(11, 'App\\Models\\User', 1, 'token', '835f2f5f05495bd84de6f62422eb7f2601fecc41fb2140b80816ad7dc3bded3d', '[\"*\"]', NULL, NULL, '2024-12-18 22:09:34', '2024-12-18 22:09:34'),
(12, 'App\\Models\\User', 1, 'token', 'a0cca1a7fe4af95a33b2d911153157865f20eebef2072af21b42fa52cd53e2a1', '[\"*\"]', NULL, NULL, '2024-12-18 22:11:58', '2024-12-18 22:11:58'),
(13, 'App\\Models\\User', 1, 'token', '34aa17e0219bfa7004d32b0e971e91b43ea63b6910a41d849f6f324354109e24', '[\"*\"]', NULL, NULL, '2024-12-18 22:13:13', '2024-12-18 22:13:13'),
(14, 'App\\Models\\User', 1, 'token', '6defa3de336f9e8c087048b38a0f9320533aacc7643ae56035d0fd132e6544ca', '[\"*\"]', NULL, NULL, '2024-12-18 22:15:29', '2024-12-18 22:15:29'),
(15, 'App\\Models\\User', 1, 'token', '61062e3bba2744826323383db238ebe34f175a9d0a8af4b46e15de626104e690', '[\"*\"]', NULL, NULL, '2024-12-18 22:15:56', '2024-12-18 22:15:56'),
(16, 'App\\Models\\User', 1, 'token', '96068e75f9b219bedb03ef7498f93dc3eba214e1a33918319da7694521e5c148', '[\"*\"]', NULL, NULL, '2024-12-18 22:16:05', '2024-12-18 22:16:05'),
(17, 'App\\Models\\User', 1, 'token', '33b1c7d613fab7da97d9e0bdf52e9e1eae230e3e7e59607f2a788d752a5037c2', '[\"*\"]', NULL, NULL, '2024-12-18 22:18:04', '2024-12-18 22:18:04'),
(18, 'App\\Models\\User', 22, 'token', 'db4de2ed6d11f31cf372f8f938046e669cd18df698438a6fabb0859d30e131ba', '[\"*\"]', NULL, NULL, '2024-12-18 22:22:20', '2024-12-18 22:22:20'),
(19, 'App\\Models\\User', 14, 'token', '5c8b898e2ae11a09a9208787ab0fdb3cb56ab63e85eca0d710f52d15474a6adf', '[\"*\"]', NULL, NULL, '2024-12-19 05:40:36', '2024-12-19 05:40:36'),
(20, 'App\\Models\\User', 22, 'token', 'a0c44ebb4b6b597c7bab14649aea337b324e42ed542220b3f3a974315376960d', '[\"*\"]', NULL, NULL, '2024-12-19 05:42:52', '2024-12-19 05:42:52'),
(21, 'App\\Models\\User', 22, 'token', '27f0bff321723ba9e0b3a5adae079f93d74f753811cf07e2d5edbfce05036da9', '[\"*\"]', NULL, NULL, '2024-12-19 05:43:49', '2024-12-19 05:43:49'),
(22, 'App\\Models\\User', 1, 'token', '8c6d03fa732073768c02927d16a9e551505524d114a63813a4ff9678c5535680', '[\"*\"]', NULL, NULL, '2024-12-19 05:44:51', '2024-12-19 05:44:51'),
(23, 'App\\Models\\User', 22, 'token', 'ea500c2ad8802b2bfceaec2b29d9c2166d1cca3f50e1ff4d3cbf0d1202b1128a', '[\"*\"]', NULL, NULL, '2024-12-19 05:45:16', '2024-12-19 05:45:16'),
(24, 'App\\Models\\User', 22, 'token', 'fd4766c4a3f4f657ce7f066ea1acd2d69cf01399ff39b04c7cb24595ca34a513', '[\"*\"]', NULL, NULL, '2024-12-19 05:54:12', '2024-12-19 05:54:12'),
(25, 'App\\Models\\User', 22, 'token', '88000cf0fbfc24da5def346cef0a0899ddec62b80cf54aa1f5be8bbfe800508d', '[\"*\"]', NULL, NULL, '2024-12-19 05:59:28', '2024-12-19 05:59:28'),
(26, 'App\\Models\\User', 22, 'token', '012be9b476051efdeade8b7e050523d852ae6c1f6a68bab1d1a170959c6384e5', '[\"*\"]', NULL, NULL, '2024-12-19 06:04:44', '2024-12-19 06:04:44'),
(27, 'App\\Models\\User', 22, 'token', 'a6cac9296d7a37b1a69dad3ca40d8dfbfdcff145e7992eea2a26cccb11f45874', '[\"*\"]', NULL, NULL, '2024-12-19 06:06:01', '2024-12-19 06:06:01'),
(28, 'App\\Models\\User', 22, 'token', '7970c0040240be3146c580596ec92124dea469d031de840b76b3611251ea983c', '[\"*\"]', NULL, NULL, '2024-12-19 06:07:32', '2024-12-19 06:07:32'),
(29, 'App\\Models\\User', 1, 'token', 'ddc5dc2cb731465b49016778c95bdcd6c4203e1ba7f34d75f2b9e3224c651e13', '[\"*\"]', NULL, NULL, '2024-12-19 06:20:51', '2024-12-19 06:20:51'),
(30, 'App\\Models\\User', 22, 'token', 'f6d0cfca5ce44d9d919fa86968e5cd954e796f4b5285922239c30675556cfb3e', '[\"*\"]', NULL, NULL, '2024-12-22 06:08:50', '2024-12-22 06:08:50'),
(31, 'App\\Models\\User', 1, 'token', '81c09cbdd1938be71a53bf9c3e974505c5fd077d3770b8396c9b2156edb17fb5', '[\"*\"]', NULL, NULL, '2024-12-22 06:09:06', '2024-12-22 06:09:06'),
(32, 'App\\Models\\User', 22, 'token', '314f74448e6f0deb8fc0356302ab9ed3021f92d9d875d8fbf5617003cef686a9', '[\"*\"]', '2024-12-24 19:14:54', NULL, '2024-12-24 18:37:25', '2024-12-24 19:14:54'),
(33, 'App\\Models\\User', 1, 'token', '32e9f8b45e2fb174ae24cf4e6a1f0da9a5f390b5b56bee9bb554490eae596bab', '[\"*\"]', NULL, NULL, '2024-12-24 19:33:55', '2024-12-24 19:33:55'),
(34, 'App\\Models\\User', 22, 'token', '3d1b66f80ebf72f9bab0422c3265da3dca5a496802fb967a50f6299a8ab1c173', '[\"*\"]', NULL, NULL, '2024-12-24 19:39:26', '2024-12-24 19:39:26'),
(35, 'App\\Models\\User', 1, 'token', '27c22f2542219547910e9ce04740bd55f9f3fa4cbba65acf99100d9e491e2fc7', '[\"*\"]', '2024-12-24 22:29:29', NULL, '2024-12-24 19:55:36', '2024-12-24 22:29:29'),
(37, 'App\\Models\\User', 1, 'token', 'e328b639acdde6ae685ded6a8954a10be0403496859cce896b80b17760059e38', '[\"*\"]', '2024-12-24 22:31:47', NULL, '2024-12-24 21:54:55', '2024-12-24 22:31:47'),
(38, 'App\\Models\\User', 1, 'token', 'dfe46514ef25b7ef52e8e67be4164750e82b1b908d3f8a4fd729b39a5b5b601b', '[\"*\"]', '2024-12-24 22:48:08', NULL, '2024-12-24 22:29:41', '2024-12-24 22:48:08'),
(39, 'App\\Models\\User', 1, 'token', '8245f994146272b520c2e2bb2e547763ed0d0b362d22e42c92d5eebbbed2ff18', '[\"*\"]', '2024-12-24 23:28:54', NULL, '2024-12-24 22:31:58', '2024-12-24 23:28:54'),
(40, 'App\\Models\\User', 1, 'token', '5b688bf1dd470b6c73badd1dcb12b1d46a6aa439355aef5925f0e94caa42a262', '[\"*\"]', '2024-12-24 23:16:32', NULL, '2024-12-24 22:48:25', '2024-12-24 23:16:32'),
(41, 'App\\Models\\User', 22, 'token', 'c84cb40cdfc22cdbf4a0cd89f1c4b20c55f0b6e0b8945a0c0797ce4dd8e4c169', '[\"*\"]', '2024-12-24 23:33:47', NULL, '2024-12-24 23:17:12', '2024-12-24 23:33:47'),
(42, 'App\\Models\\User', 1, 'token', '63d3160d6229147606951981269c5a230a4fcb62e73954bbd4da5517b2ed89a7', '[\"*\"]', '2024-12-24 23:30:17', NULL, '2024-12-24 23:30:04', '2024-12-24 23:30:17'),
(43, 'App\\Models\\User', 23, 'token', '4a622f990122763018fae7ccb0bddf825cf2a8f0f701ee2f458d36e5682ffd28', '[\"*\"]', '2024-12-24 23:33:16', NULL, '2024-12-24 23:33:04', '2024-12-24 23:33:16'),
(44, 'App\\Models\\User', 22, 'token', '9e6d40e150a2950f57f9487c257d1822709403bd7c53ed16daac93783300bbc7', '[\"*\"]', '2024-12-24 23:40:09', NULL, '2024-12-24 23:33:58', '2024-12-24 23:40:09'),
(45, 'App\\Models\\User', 22, 'token', 'a60df1381f0f2dfb9efbacdb9a93025c41887b68125f702b4bcc9ed16fc032bb', '[\"*\"]', '2024-12-25 04:41:17', NULL, '2024-12-24 23:40:38', '2024-12-25 04:41:17'),
(46, 'App\\Models\\User', 1, 'token', '6000b7670ad21b11a5a5944c700ea20389c0edd3079f5de999da99173bc6958f', '[\"*\"]', '2024-12-25 05:07:47', NULL, '2024-12-25 04:41:44', '2024-12-25 05:07:47'),
(47, 'App\\Models\\User', 22, 'token', 'b7d84011860ff93b509a1987ba1eb354b6a7ff12bb86f7fd773820724230f2aa', '[\"*\"]', NULL, NULL, '2024-12-25 05:16:50', '2024-12-25 05:16:50'),
(48, 'App\\Models\\User', 22, 'token', 'e0616d003d5cfd5ab3b80fc509d085cdae11be013d8616c5ad8f7d4dcd5f8c2c', '[\"*\"]', NULL, NULL, '2024-12-25 05:17:30', '2024-12-25 05:17:30'),
(49, 'App\\Models\\User', 23, 'token', '5e0e5ddaa770c05b9c23b8a3fc07761ff2d0765bce20dc0271dcef82cef80884', '[\"*\"]', '2024-12-25 06:29:06', NULL, '2024-12-25 06:25:39', '2024-12-25 06:29:06'),
(50, 'App\\Models\\User', 1, 'token', 'b6ad9fd425ddeb25d7397b584ec04706c190ed98535feae14ff247deeb4a04ed', '[\"*\"]', '2024-12-25 06:32:49', NULL, '2024-12-25 06:29:56', '2024-12-25 06:32:49'),
(51, 'App\\Models\\User', 22, 'token', 'adf096ea8e91cab2e0e0fe33bd6a798a612724cfbff602adf4c5c990e74e1602', '[\"*\"]', '2024-12-25 17:34:30', NULL, '2024-12-25 07:32:08', '2024-12-25 17:34:30'),
(52, 'App\\Models\\User', 23, 'token', 'b93b2ea2894592ee081676b3d370a113db1c3ac580e31a6f5cad29268872cbbe', '[\"*\"]', '2024-12-25 17:29:23', NULL, '2024-12-25 07:37:41', '2024-12-25 17:29:23'),
(53, 'App\\Models\\User', 23, 'token', '02ecfda85eb3305eff2a5a41ee7eb6ad368f0440216cedace611a4c45fca5933', '[\"*\"]', '2024-12-30 09:07:29', NULL, '2024-12-25 17:21:40', '2024-12-30 09:07:29'),
(54, 'App\\Models\\User', 1, 'token', '534423a05b8451a1e41dacf71be559188d4ae4dc5f1f9b6130f4b5da2f232d87', '[\"*\"]', '2024-12-25 19:38:02', NULL, '2024-12-25 17:35:03', '2024-12-25 19:38:02'),
(55, 'App\\Models\\User', 22, 'token', '1aacdf7dd1018e283e22fe2539cbccf4f16737f9972b0710fdfdb575ea659805', '[\"*\"]', '2024-12-25 21:22:23', NULL, '2024-12-25 21:21:32', '2024-12-25 21:22:23'),
(56, 'App\\Models\\User', 1, 'token', 'a9e57e694c53dcbfc0847fe2d93314706496d1da01fa1a203e36a477e8801a8d', '[\"*\"]', '2024-12-25 21:22:45', NULL, '2024-12-25 21:22:35', '2024-12-25 21:22:45'),
(57, 'App\\Models\\User', 1, 'token', 'e4eb2d39f038f093ff1a7b967d8b78659eb69822307106bad31cc43074d0aa31', '[\"*\"]', '2024-12-25 21:43:11', NULL, '2024-12-25 21:41:54', '2024-12-25 21:43:11'),
(58, 'App\\Models\\User', 1, 'token', 'c728123ff0abd80b8685818b5d69439472d582a9842f07df7cacdca50140fddc', '[\"*\"]', '2024-12-25 21:44:25', NULL, '2024-12-25 21:44:20', '2024-12-25 21:44:25'),
(59, 'App\\Models\\User', 24, 'token', '9c5389579e20a1cac8d550fe7191990cfef8f3fc6c7077df21630990fe0d28cf', '[\"*\"]', '2024-12-26 02:30:15', NULL, '2024-12-25 21:49:17', '2024-12-26 02:30:15'),
(60, 'App\\Models\\User', 22, 'token', '941cd6760f573c6aa464ee5aa32aa7d533094c4ff1deb2f006986c9cfdb04408', '[\"*\"]', '2024-12-26 09:04:52', NULL, '2024-12-26 09:04:45', '2024-12-26 09:04:52'),
(61, 'App\\Models\\User', 1, 'token', '17ea5e033f2adb88acc37f20e90ee7dcf92b2ee0c4ead0cec4dd12565a2ece4e', '[\"*\"]', '2024-12-26 10:00:22', NULL, '2024-12-26 09:05:05', '2024-12-26 10:00:22'),
(62, 'App\\Models\\User', 1, 'token', 'daada510ad7058f4a05f9c97ca33c8573ee8b5e0e54a2bc4fec5c8ce1af6e894', '[\"*\"]', '2024-12-26 21:32:56', NULL, '2024-12-26 18:56:04', '2024-12-26 21:32:56'),
(63, 'App\\Models\\User', 23, 'token', '7c9a7578c3420cd33d19d9b946b0540531a97a59ed4616632727500fa3619359', '[\"*\"]', '2024-12-26 19:17:53', NULL, '2024-12-26 19:01:57', '2024-12-26 19:17:53'),
(64, 'App\\Models\\User', 1, 'token', 'b7426bf901f7df5eb8c861f80115d2e3c7a64ad639a6ae5332b50878f95f653e', '[\"*\"]', '2024-12-27 16:37:07', NULL, '2024-12-26 21:33:05', '2024-12-27 16:37:07'),
(65, 'App\\Models\\User', 1, 'token', 'f3aace3f4d543b61b712edbf7c4c32a29ba3cc749fd47323a7bec3e9a81c8398', '[\"*\"]', '2024-12-26 21:34:37', NULL, '2024-12-26 21:34:04', '2024-12-26 21:34:37'),
(66, 'App\\Models\\User', 1, 'token', 'bec6a8da143145556183b5a7d1b41588726fbe32fb056a6775d5e677a37c5b1c', '[\"*\"]', '2024-12-27 16:39:57', NULL, '2024-12-27 16:37:37', '2024-12-27 16:39:57'),
(67, 'App\\Models\\User', 22, 'token', '4a3f3523eab3e130499f11dd95686ae374e8af3c46a3cb4ecaa30db2c9dba570', '[\"*\"]', '2024-12-27 18:52:58', NULL, '2024-12-27 16:40:32', '2024-12-27 18:52:58'),
(68, 'App\\Models\\User', 22, 'token', '9b970a342aea42546a04362cee9475b1e4e2e9651de380a92483f32ddf845d3f', '[\"*\"]', '2024-12-27 18:38:49', NULL, '2024-12-27 17:03:05', '2024-12-27 18:38:49'),
(69, 'App\\Models\\User', 1, 'token', '11eb6e61c28f1d3bc238dc5c46b2d123bedb38be5782d12c83c60d776397eac1', '[\"*\"]', '2024-12-27 18:55:59', NULL, '2024-12-27 18:53:10', '2024-12-27 18:55:59'),
(70, 'App\\Models\\User', 22, 'token', '28ca74ccfa3ac3bed246f90ec22ca20cbdaa16e42f645f52c6b8d8bc04b3d9aa', '[\"*\"]', '2024-12-27 18:56:21', NULL, '2024-12-27 18:56:08', '2024-12-27 18:56:21'),
(71, 'App\\Models\\User', 1, 'token', '5de319f60324a730bf29f5d24f7430e05df86e50c83dcc3f9af18e3836e438df', '[\"*\"]', '2024-12-27 18:56:59', NULL, '2024-12-27 18:56:30', '2024-12-27 18:56:59'),
(72, 'App\\Models\\User', 25, 'token', '7836e4674bb3a7b25ef523bb9d1b6d43195a04fa872a3b65f010538f2c4d12a1', '[\"*\"]', '2024-12-28 18:57:30', NULL, '2024-12-28 18:36:01', '2024-12-28 18:57:30'),
(73, 'App\\Models\\User', 1, 'token', '3d466638ebcbac5aac4653ac0c09db56f0dd20aa97b94384a686d4da455b1761', '[\"*\"]', '2024-12-28 18:58:02', NULL, '2024-12-28 18:57:40', '2024-12-28 18:58:02'),
(74, 'App\\Models\\User', 25, 'token', '7348d64afc61aee0a722346943663d655cf99a5efc878b5d19ab1302c7a07e04', '[\"*\"]', '2024-12-28 18:58:43', NULL, '2024-12-28 18:58:18', '2024-12-28 18:58:43'),
(75, 'App\\Models\\User', 1, 'token', 'c9993fb8996f43e2a44fbe973e53714b035bb6e033830bfb84fbb6567afa7276', '[\"*\"]', '2024-12-28 18:59:50', NULL, '2024-12-28 18:59:10', '2024-12-28 18:59:50'),
(76, 'App\\Models\\User', 25, 'token', '2f726a7987a708ddab1ce874b7f43fb901f1d151708913a089e28cf8a74e5665', '[\"*\"]', '2024-12-28 19:02:12', NULL, '2024-12-28 18:59:57', '2024-12-28 19:02:12'),
(77, 'App\\Models\\User', 1, 'token', '8df944198b3e7958057fede7e522f781a5de055291519fed95daac6ca0fea552', '[\"*\"]', '2024-12-28 19:05:56', NULL, '2024-12-28 19:02:24', '2024-12-28 19:05:56'),
(78, 'App\\Models\\User', 1, 'token', '17b3030cfbc480189577cc8285eb95cdbab35a990c661531dfb570557967f44c', '[\"*\"]', '2024-12-28 19:14:14', NULL, '2024-12-28 19:06:51', '2024-12-28 19:14:14'),
(79, 'App\\Models\\User', 1, 'token', '36e5f4a740a63133ca3dd6caa1815be0f67469cef8c6510df20d984b9e8b5507', '[\"*\"]', '2024-12-28 20:10:47', NULL, '2024-12-28 19:14:30', '2024-12-28 20:10:47'),
(80, 'App\\Models\\User', 1, 'token', '8d98c6af85a8b6d2fe450f9b2951733acd3a6f5b54276cc9b2b8af0ce2d23ed6', '[\"*\"]', '2024-12-30 05:10:53', NULL, '2024-12-29 05:52:50', '2024-12-30 05:10:53'),
(81, 'App\\Models\\User', 22, 'token', '99bff5c4e7451efaa72cd7570c60818a91949432935637fcc6bc4ce7ced073a4', '[\"*\"]', '2024-12-30 05:19:19', NULL, '2024-12-30 05:16:15', '2024-12-30 05:19:19'),
(82, 'App\\Models\\User', 26, 'token', '51a8552cb61b90fd18b7dc954a7c68ce7b9e989f376cd611fb2eff630f1b9eb1', '[\"*\"]', '2024-12-30 05:40:56', NULL, '2024-12-30 05:36:21', '2024-12-30 05:40:56'),
(83, 'App\\Models\\User', 1, 'token', '53714935f4e81c9f07860ebc526429559caa37f4de6fd3550f577497ca0e7c71', '[\"*\"]', '2024-12-30 05:41:55', NULL, '2024-12-30 05:41:15', '2024-12-30 05:41:55'),
(84, 'App\\Models\\User', 26, 'token', '3bed0fde8e5713d3f4607bc6828ac22e12bd55e83c5454937986d1cf62c3ec10', '[\"*\"]', '2024-12-30 08:22:59', NULL, '2024-12-30 05:42:04', '2024-12-30 08:22:59'),
(85, 'App\\Models\\User', 27, 'token', '9843b14424df85c3e538ce854072e69a6c06676d4ac447cc0e956a0342becea8', '[\"*\"]', '2024-12-30 08:58:57', NULL, '2024-12-30 08:57:37', '2024-12-30 08:58:57'),
(86, 'App\\Models\\User', 1, 'token', '87240423b96761caca56481be5ca32424da7d5451bf6565f19249f07b9acb24f', '[\"*\"]', '2024-12-30 09:00:21', NULL, '2024-12-30 08:59:06', '2024-12-30 09:00:21'),
(87, 'App\\Models\\User', 27, 'token', '67d1ca037d7801680c392936fbb2537c5616a38bb8c1b80d6c5152d5217922ef', '[\"*\"]', '2024-12-30 09:03:11', NULL, '2024-12-30 09:00:31', '2024-12-30 09:03:11'),
(88, 'App\\Models\\User', 22, 'token', '5d9bf26b9a2e8ca55bdb302825a01318cf57008db3c9692f77deef6e84593f10', '[\"*\"]', '2024-12-30 09:07:22', NULL, '2024-12-30 09:07:05', '2024-12-30 09:07:22'),
(89, 'App\\Models\\User', 1, 'token', '16794826cf4380009788dcbd7827e0233e6659dc14738c09561503363f670153', '[\"*\"]', '2024-12-30 09:25:00', NULL, '2024-12-30 09:24:14', '2024-12-30 09:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `code`, `name`, `description`, `price`, `stock`, `category_id`, `image`) VALUES
(1, 'PD001', 'Red T-shirt', 'This red T-shirt is made from 100% high-quality cotton, offering both comfort and durability. Ideal for casual outings, it features a simple yet stylish design with a round neckline. The fabric is soft to the touch, ensuring maximum comfort throughout the day. Perfect for pairing with jeans or shorts, this T-shirt is a must-have in your wardrobe. Available in various sizes to suit all body types.', 25.00, 98, 1, 'red_tshirt.jpg'),
(2, 'PD002', 'Black Leather Jacket', 'A classic black leather jacket that adds an instant edgy look to your wardrobe. Crafted from genuine leather, this jacket features a slim fit design, with a smooth and soft texture that gets better with age. It comes with a zipper closure, side pockets, and stylish metal hardware. Ideal for colder weather or evening outings, this jacket offers both warmth and style. Layer it over a T-shirt or hoodie for a trendy, casual look.', 120.00, 45, 2, 'black_jacket.jpg'),
(3, 'PD003', 'Blue Jeans', 'These classic blue jeans are a wardrobe staple that never goes out of style. Made from durable denim, they offer a comfortable fit with just the right amount of stretch. The mid-rise waist and straight-leg cut make them flattering for all body types. Whether you’re dressing up or down, these jeans can be paired with a T-shirt, sweater, or blouse for any occasion. They also feature sturdy stitching and deep pockets for added functionality.', 45.00, 79, 3, 'blue_jeans.jpg'),
(4, 'PD004', 'Running Shoes', 'Stay active and stylish with these running shoes designed for ultimate comfort and support. Whether you’re running, walking, or working out, these shoes are built with a lightweight mesh upper, cushioned insole, and a flexible rubber sole for maximum movement. The modern design and sleek look make these shoes perfect for athletic wear or casual outfits. Available in various colors to suit your personal style.', 60.00, 100, 4, 'running_shoes.jpg'),
(5, 'PD005', 'Summer Dress', 'This stylish summer dress is the perfect choice for sunny days. Made from a lightweight and breathable fabric, it features a flattering A-line silhouette that drapes beautifully. The dress has a V-neckline and adjustable straps for a comfortable fit. The soft pastel colors and floral print make it ideal for garden parties, beach outings, or casual gatherings. Pair it with sandals for a relaxed look or dress it up with heels for a more formal occasion.', 80.00, 51, 5, 'summer_dress.jpg'),
(6, 'PD006', 'Leather Wallet', 'This genuine leather wallet is perfect for keeping your essentials organized. With a sleek design and multiple compartments, it can hold your cards, cash, and receipts with ease. The high-quality leather ensures durability and a luxurious feel, while the compact size makes it easy to carry in your bag or pocket. Available in various colors, this wallet is both functional and stylish, making it a great gift for yourself or a loved one.', 30.00, 149, 6, 'leather_wallet.jpg'),
(7, 'PD007', 'White T-shirt', 'A timeless white T-shirt made from premium cotton that offers both comfort and breathability. The simple design with a round neckline makes it versatile and easy to pair with almost any outfit. Perfect for layering or wearing on its own, this T-shirt can be dressed up with a blazer or kept casual with jeans or shorts. Ideal for everyday wear, it’s a wardrobe essential for any season.', 20.00, 200, 1, 'white_tshirt.jpg'),
(8, 'PD008', 'Red Dress', 'This elegant red dress is perfect for any formal occasion. Made from high-quality polyester and spandex, it features a fitted silhouette that accentuates your figure. The dress has a sweetheart neckline, sleeveless design, and a back zipper closure for a smooth fit. Whether you’re attending a wedding, cocktail party, or dinner, this dress is guaranteed to turn heads and make you feel confident and beautiful.', 110.00, 27, 5, 'red_dress.jpg'),
(9, 'PD009', 'High Heels', 'Add a touch of glamour to your outfit with these elegant high heels. Made from soft suede material, these heels feature a pointed toe design and a slim stiletto heel for a sophisticated look. The padded insole ensures comfort, allowing you to wear them for extended periods without discomfort. These heels are perfect for pairing with dresses, skirts, or pants for a night out or a formal event. Available in classic black and nude shades.', 85.00, 68, 4, 'high_heels.jpg'),
(10, 'PD010', 'Blue Scarf', 'This cozy blue scarf is a must-have accessory for the colder months. Made from a soft wool blend, it provides warmth and comfort while adding a stylish touch to your outfit. The scarf features a classic checkered pattern and frayed edges for a relaxed, casual look. Whether you’re wearing a coat, jacket, or sweater, this scarf adds both warmth and a pop of color to your winter wardrobe. It’s the perfect accessory for any season.', 15.00, 250, 6, 'blue_scarf.jpg'),
(14, 'PD011', 'Sky Blue Men’s Long Sleeve T Shirt', 'Product : Sky Blue Men’s Long Sleeve T-Shirt\r\nBrand : BEAST\r\nColour : Sky Blue\r\nMaterial : 65/35 Cotton Heather. Softened.\r\nThickness : 180 GSM\r\nSize Range : S – XXL\r\nQuality Standards : 100% QC Passed. Export Ready.\r\nSpecialities : Tagless. Comfortable. Excellent Colorfastness. Anti-Shrink. \r\nWarranty : 14 Day Easy Returns & Size Exchanges. Return & Exchange Policy\r\nDelivery : Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.\r\nPayment Options : Card or Cash on Delivery at Checkout.\r\nA Genuine Product. Made in Sri Lanka.', 35.00, 40, 1, 'T-Shirt1.jpg'),
(15, 'PD012', 'Royal Blue & Navy Blue Sports T Shirt', 'Product : Royal Blue & Navy Blue Men’s Sports T-Shirt\r\nBrand : OXYGEN SPORTS\r\nStyle : Crew Neck – Short Sleeve\r\nColour : Royal Blue & Navy Blue\r\nMaterial : Dri-Fit – 95% Polyester Microfiber, 5% Spandex\r\nThickness : 150 – 160 GSM\r\nSize Range : XS – XXL\r\nQuality Standards : 100% QC Passed. Export Ready.\r\nSpecialities : Lightweight, Moisture-Wicking, Wrinkle Free, Anti-Shrink, Quick-Dry Performance. \r\nWarranty : 14 Day Easy Returns & Size Exchanges. Return & Exchange Policy\r\nDelivery : Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.\r\nPayment Options : Card or Cash on Delivery at Checkout.\r\nA Genuine Product. Made in Sri Lanka.', 30.00, 15, 1, 'T-Shirt2.jpg'),
(16, 'PD013', 'Raven Black Men’s Polo T Shirt', 'Product : Men’s Premium Raven Black Polo T-Shirt\r\nBrand : BEAST\r\nColour : Black | Raven Black\r\nMaterial : 65/35 Cotton Pique Knit\r\nThickness : 220 GSM\r\nSize Range : XS – XXL\r\nQuality Standards : 100% QC Passed. Export Ready.\r\nSpecialities : Tagless. Comfortable. Excellent Colorfastness. Anti-Shrink. \r\nWarranty : 14 Day Easy Returns & Size Exchanges. Return & Exchange Policy\r\nDelivery : Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.\r\nPayment Options : Card or Cash on Delivery at Checkout.\r\nA Genuine Product. Made in Sri Lanka.', 40.00, 34, 1, 'T-Shirt3.jpg'),
(17, 'PD014', 'Cotton White Men’s Polo T Shirt\r\n', 'Product : Men’s Premium Cotton White Polo T-Shirt\r\nBrand : BEAST\r\nColour : White | Cotton White\r\nMaterial : 65/35 Cotton Pique Knit\r\nThickness : 220 GSM\r\nSize Range : XS – XXL\r\nQuality Standards : 100% QC Passed. Export Ready.\r\nSpecialities : Tagless. Comfortable. Excellent Colorfastness. Anti-Shrink. \r\nWarranty : 14 Day Easy Returns & Size Exchanges. Return & Exchange Policy\r\nDelivery : Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.\r\nPayment Options : Card or Cash on Delivery at Checkout.\r\nA Genuine Product. Made in Sri Lanka.\r\n', 25.00, 23, 1, 'T-Shirt4.jpg'),
(18, 'PD015', 'Retro Chuck Track Jacket', 'RUN IT BACK\r\n\r\nNothing beats a classic track jacket, except the All Star print. It provides a sporty warming style that you can rely on when the temperature drops. Zip it up or down, over your favorite tee for a fresh look in hot weather.\r\n\r\nFEATURES AND BENEFITS\r\n\r\nDurable and lightweight polyester fabric\r\nStandard fit for a comfortable and easy feel\r\nRaglan sleeves for freedom of movement\r\nMini All Star patch on the left chest for iconic sporty style\r\nComplete the look with matching Retro track pants\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 30.00, 56, 2, 'Jacket1.jpg'),
(19, 'PD016', 'Retro Chuck Varsity Jacket', 'This varisity jacket gives you the comfort you crave, with a sporty and stylish appeal that will never go out of style. Plus, embroidered patches let everyone know which team you\'re a fan of.\r\n\r\nFEATURES AND BENEFITS\r\n\r\nFaux wool fabric gives you the look and feel of a classic varsity jacket\r\nStandard fit for a relaxed, comfortable feel\r\nSnap-button closure\r\nDual side pockets\r\nSatin stitching and embroidery on left chest and back\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 40.00, 42, 2, 'Jacket2.jpg'),
(20, 'PD017', 'Retro Full Zip Hoodie', 'DAILY APPEARANCE\r\n\r\nSport-inspired, couch-friendly, casual—this zip-up hoodie is the complete package. Lightweight, in soft colors, and zipped up, this hoodie will complete your look.\r\n\r\nFEATURES AND BENEFITS:\r\n\r\n• Fleece keeps you warm every time you wear it\r\n• Standard fit for comfort\r\n• Front zipper for easy on and off\r\n• Kangaroo pocket for storing valuables or keeping your hands warm\r\n• Retro Converse graphics that symbolize the brand\'s heritage\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 35.00, 15, 2, 'jacket3.jpg'),
(21, 'PD018', 'Retro Chuck Track Jacket', 'RUN IT BACK\r\n\r\nNothing beats a classic track jacket, except the All Star print. It provides a sporty warming style that you can rely on when the temperature drops. Zip it up or down, over your favorite tee for a fresh look in hot weather.\r\n\r\nFEATURES AND BENEFITS\r\n\r\nDurable and lightweight polyester fabric\r\nStandard fit for a comfortable and easy feel\r\nRaglan sleeves for freedom of movement\r\nMini All Star patch on the left chest for iconic sporty style\r\nComplete the look with matching Retro track pants\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 30.00, 20, 2, 'Jacket4.jpg'),
(23, 'PD020', 'Fleece Pants', 'FAVORITE PANTS\r\n\r\nWhether you’re cruising around town or lounging on the couch, these ultra-soft pants are the perfect winter pick. Pair them with your favorite tee or hoodie for a casual look.\r\n\r\nFEATURES AND BENEFITS:\r\n\r\n• Terry Fleece material that feels soft on the skin\r\n• Standard fit that fits the body\r\n• Adjustable waistband with drawstring for a perfect fit\r\n• Side pockets to warm hands or store small items\r\n• Embroidered Chuck Taylor logo on the left leg\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 65.00, 25, 3, 'Pant1.jpg'),
(24, 'PD021', 'Heritage Track Pant', 'COOL AND CASUAL\r\n\r\nFrom warming up before a run to everyday wear, these Heritage Track Pants are ready for it all. With college-inspired colors and classic sweatpants styling, you can reminisce in a variety of looks.\r\n\r\nFEATURES AND BENEFITS\r\n\r\nSoft-to-the-skin poly-cotton material\r\nStandard fit for a loose, practical feel\r\nAdjustable waistband for a comfortable fit\r\nTwo side pockets\r\nSmall Converse logo embroidery on left side pocket\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 70.00, 35, 3, 'Pant2.jpg'),
(26, 'PD022\r\n', 'Gold Standard Pant', 'THE PERFECT PANTS\r\n\r\nThe weather can be unpredictable, which is why Converse created these premium trousers to accompany you. These aren’t your average pair of trousers—Converse designed them in a variety of sizes, so you’re sure to love them, no matter who you are. The All Star logo cut and embroidery give classic Converse details, while still giving you a unique twist that’s true to your personality.\r\n\r\nFEATURES AND BENEFITS\r\n\r\nPremium loose-fitting trousers with high-quality construction\r\nAdjustable fit with metal-tipped drawstring, comfortable elastic cuffs, and side/back pockets\r\nMade from durable French Terry for optimal\r\nfit All Star logo embroidery in satin for a more attractive look\r\nPre-washed to minimize shrinkage\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 55.00, 40, 3, 'Pant3.jpg'),
(27, 'PD023', 'Woven Parachute Pant', 'These children\'s pants are here for your active little one, with light and elastic fabric to give your little one room to move freely.\r\n\r\nCHOOSE YOUR SIZE\r\n\r\nAbout Size:\r\n\r\nA difference of 1-2 cm may occur due to the development and production process.', 40.00, 10, 3, 'Pant4.jpg'),
(28, 'PD024', 'Go To CT Patch Pant', 'FIT FOR ALL\r\n\r\nTimeless, everyday pants are made with every body type in mind. Soft fleece provides comfort, while a mini Chuck Taylor patch pays homage to heritage. Plus, easy-to-style colors give you the freedom to build the perfect fit.\r\n\r\nFEATURES AND BENEFITS:\r\n\r\n- Fleece feels soft and warm against the skin\r\n- Standard, inclusive sizing is thoughtfully designed for most body types\r\n- Elastic waistband with drawstring helps provide a customized fit\r\n- Two side pockets to store your small essentials\r\n- 80% COTTON, 20% POLYESTER\r\n\r\nRegarding Size: A difference of 1-2 cm may occur due to the development and production process.\r\n\r\nAbout Color: Actual colors may vary. This is because each monitor has different capabilities to display colors, we cannot guarantee that the color you see accurately depicts the color of the product.', 25.00, 20, 3, 'Pant5.jpg'),
(30, 'PD026', 'Nike Pegasus 41 \'Eliud Kipchoge\'', 'Responsive cushioning in the Pegasus provides an energised ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole. Plus, improved engineered mesh on the upper decreases weight and increases breathability.\r\n\r\n\r\nColour Shown: White/Pale Ivory/Dragon Red/Black\r\nStyle: HJ7037-100\r\nCountry/Region of Origin: China\r\n', 120.00, 10, 4, 'shoes2.jpg'),
(31, 'PD027', 'Nike Alphafly 3 Premium', 'Fine-tuned for speed, the Alphafly 3 Premium helps push you beyond what you thought possible. Three innovative technologies power your run: a double dose of Air Zoom units helps launch you into your next step; a full-length carbon-fibre plate helps propel you forwards with ease; and a heel-to-toe ZoomX foam midsole helps keep you fresh as you conquer the iconic ekiden.\r\n\r\n\r\nColour Shown: White/Black/University Red/Habanero Red\r\nStyle: HQ3501-100\r\nCountry/Region of Origin: China\r\n', 110.00, 21, 4, 'shoes3.jpg'),
(35, 'PD029', 'Nike Dunk High By You', 'Take a seat at the table and add your special touch to the hoops-to-streets icon. Inspired by the outdoors, the customisable design lets you be as expressive as you want. Choose between canvas and suede accents for a healthy dose of trail-time flavour. Add classic leather for those on-the-town days. Next, write a piece of your story on the pull tab, which doubles as the perfect spot to attach your kicks to your backpack when it\'s time to cross streams or hit the beach. Plus, countless colour options let you be as adventurous as you want. Whatever you choose, your influence on the Nike Dunk High is undeniable.\r\n\r\nColour Shown: Multi-Colour/Multi-Colour/Multi-Colour\r\nStyle: DV2273-900Take a seat at the table and add your special touch to the hoops-to-streets icon. Inspired by the outdoors, the customisable design lets you be as expressive as you want. Choose between canvas and suede accents for a healthy dose of trail-time flavour. Add classic leather for those on-the-town days. Next, write a piece of your story on the pull tab, which doubles as the perfect spot to attach your kicks to your backpack when it\'s time to cross streams or hit the beach. Plus, countless colour options let you be as adventurous as you want. Whatever you choose, your influence on the Nike Dunk High is undeniable.\r\n\r\nColour Shown: Multi-Colour/Multi-Colour/Multi-Colour\r\nStyle: DV2273-900', 65.00, 12, 4, 'shoes1.jpg'),
(36, 'PD29', 'Floral Dresses', 'Dresses for Women 2024 Spring Puff Sleeve V Neck A-Line Flowy Floral Dresses Women\'s Summer Short Sleeve Wrap Midi Dress', 65.00, 9, 5, 'Dresses1.jpg'),
(37, 'PD030', 'Sequined wrap dress', 'Description & fit\r\nNew Arrival\r\nShort, long-sleeved dress in sequined jersey with a deep, V-shaped neckline and a wrapover front with wide ties at one side and a concealed button at the other.\r\n\r\nDescriptive Length\r\n\r\nLong sleeve\r\n\r\nStyle\r\n\r\nDeep neckline\r\n\r\nConcept\r\n\r\nMODERN CLASSIC\r\n\r\nFit\r\n\r\nRegular fit\r\n\r\nDescription\r\n\r\nSilver-coloured', 25.00, 10, 5, 'Dresses2.jpg'),
(38, 'PD031', 'Sequined dress', 'Short dress in sequined jersey with a round neckline and long, flared raglan sleeves. Concealed zip and hook-and-eye fastener at the back. Jersey lining.\r\n\r\nArticle number: 1204941004\r\nDescriptive Length\r\n\r\nLong sleeve\r\n\r\nStyle\r\n\r\nRound neck\r\n\r\nConcept\r\n\r\nEVERYDAY FASHION\r\n\r\nFit\r\n\r\nRegular fit\r\n\r\nDescription\r\n\r\nDark grey/Sequins', 40.00, 32, 5, 'Dresses3.jpg'),
(40, 'PD033', 'Beach Glasses Fashion Korean Sunglasses Import', 'Fashion glasses with trendy designs that are suitable for all ages. Equipped with UV protection lenses to protect your eyes from harmful UV rays. Suitable for use during outdoor activities, providing protection while adding a cool impression to your appearance.', 30.00, 12, 6, 'Kacamata-Hitam-Unisex.jpg'),
(41, 'PD034', '\r\nAurum Lab 9k Gold Ring - Lucy', 'gold ring with elegant and luxurious design. Ideal for special occasions or as everyday jewelry. This ring has a timeless shine and will add a luxurious impression to your appearance. The perfect choice for those of you who want to look more glamorous.', 65.00, 34, 6, 'cincin-emas.jpg'),
(42, 'PD036', 'Quiksilver 3 Belts Chocolate', 'Premium buckle with simple yet elegant design. Made from strong and durable selected leather, this buckle is perfect for everyday use or as a formal accessory. With a sturdy metal fastener, it gives a luxurious impression without compromising on comfort.', 25.00, 23, 6, 'gesper.jpg'),
(43, 'PD037', 'Waterwheel Pendant - Kalung Crystal by Her Jewellery\r\n', 'Beautiful necklace with modern design that is suitable to be combined with various types of clothing. Equipped with a pendant that emits elegant shine, this necklace will add charm to your appearance. Made of quality and durable materials.', 30.00, 11, 6, 'kalung.jpg'),
(44, 'PD37', 'Premium Baseball Cap', 'Look stylish with this Premium Baseball Cap ! Made of high-quality material that is cool and comfortable, this hat is suitable for various activities, from sports, hanging out with friends, to protecting the face from the hot sun. The classic design with easy-to-match colors makes it the perfect choice for every look. Available in various colors and sizes. Let\'s look cool with this hat!', 25.00, 12, 9, 'topi.jpg'),
(45, 'PD39', 'Trucker Hat', 'Want to look more casual and cool? This Trucker Hat is the right choice! With a sporty and modern design, this hat has a mesh vent on the back to keep your head cool. Suitable for those of you who like a casual style but still want to look cool. Ideal for use when on vacation, outdoor activities, or just taking a leisurely walk. Get it now and feel the comfort!', 35.00, 23, 9, 'topi3.jpg'),
(47, 'PD040\r\n', 'Fedora Hat', 'Look elegant with this Fedora Hat ! Known for its sleek and chic design, this hat can elevate your look in an instant. Made of quality, lightweight, and durable materials, it is suitable for formal or semi-formal events such as weddings, parties, or other special occasions. Get a classy impression with a Fedora hat that adds charm to every look!', 30.00, 32, 9, 'topi4.jpg'),
(48, 'PD041', 'Bucket Hat', 'Casual and Comfortable\r\nPerfect your casual style with this Bucket Hat ! Made of soft and comfortable cotton, this hat not only provides protection from the sun, but also adds a fashionable impression to every appearance. Ideal for outdoor events such as picnics, hiking, or vacations. With a simple yet stylish design, this hat is perfect for those of you who like to appear practical but still fashionable.', 25.00, 34, 9, 'topi5.jpg'),
(49, 'PD042', 'Snapback Hat', 'Appear in a contemporary style using a Snapback Hat ! With a bold design and adjustable size, this hat provides extra comfort and a modern look. Suitable for those of you who like streetwear style or just want to add to your collection of must-have fashion items. Available in a variety of colors and designs, this snapback hat can be combined with any outfit for a fresher and trendier impression. Don\'t miss out!', 30.00, 11, 9, 'topi6.jpg'),
(50, 'pd045', 'Canvas Hat', 'Look simple yet stylish with this Canvas Hat ! Made from strong and durable canvas material, this hat offers maximum comfort without sacrificing style. The simple yet modern design is suitable for all occasions, from casual walks, hangouts, to adventures. With adjustable straps, this hat is also easy to wear by anyone. Available in a variety of neutral colors that are easy to match with various outfits. The perfect choice for those of you who prioritize quality and function in one product!', 25.00, 32, 9, 'topi7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('54SWDZ02Jaa0Ta0XrsbmAtmu4yhAxqDNOcWwcbkw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWRaZ1dyNjZESFBlTkZmRTQ0dThDczJ6M0xhTDNXTFdYNlVXT0t0ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734497194),
('5EOksOaj62xFZ460MkkyYjM9lqOSDTcQ08ki7OEw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWJ6a0Zjanl5Z09mdUR4U1ZtVW5BUklmZ3RSNEN6VEJ5aThLWUZYeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735187747),
('6f6YHSGiT8Qo9QvHI9wHHrwtssSYAsr2mUjIn97F', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUm1ERnpWR2F0SmlBZnBVeGNFZnE2dkNPampnTmFKeGFsMERnQTBNRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733979809),
('75A7r4o5cVniN2SqEW0ShDG799Q8IPOw3SuDSjJv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMHlVbFBQdU52cWJYWFpPaThCeW43MXVZUWRDd1paS0FZcmE0ejdvciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734872873),
('CWRZtLRmMrH1xdUsQaLdG2Hx7DfzEhGhV6KTghtr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVkIxaXVUWEl0ZVdNME5RaTAyUkd6aWVsTzV1a2RpelJkSEdtV3pZRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733808096),
('FxMSHP8L4NUBnNhnej3WKPAtiMX7WATrUlhDd9B4', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRkcyZmh6ck9oV015cUhTOWIzclhUbURCSGl0djJjNVBuajV0eDBhWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733837994),
('Ks0xbYcQbGDCGAmp9vZcUAo84bcIs2VyuvaN5XSZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWTlxMXZlUDJGR1FnYlFTMGk0bUlrWHNlczZScWlNRlJIdW02RjhOWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735436043),
('OChlxMPSzDiuOf5PtzsrNty1BrudfACqabQySDXX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWUhQODc2emFuaUZoaFBINFQ5d1JuQ2s2eWZXT2RTYU9QeUlxeTE5WSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735560619),
('oNeFff45oNVc15yJ4xymQg2rwXjyHjGC4lzIvwpI', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVU5PSlZPZlROYmlucEZ1bWJGU2RIRGpHdzVJVTdPbVloWDhLdTBINSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733980163),
('orP2wUaNOKcCmOQqu4o9BT0UqkmQIFPyhIgGiqhr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTDBhdkVVWXo1M0EwcXNKRzBQU09OdUJ6dlp5bzk5eGp2eFBQbDFDZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735172444),
('owIa0IpU6CuaZLBRCw9m1mQNbfxUfyjNYEINVxCa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiazU2M005Y0hBcVVvQkdhRmJEbXZNQlJhWWhzaUVUejJUTjhDV01mMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735264450),
('ox9xlLatalwuM63pkhVhFBzHpQJKa08faEyT2a2r', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmM5TGptQnJVUjhWMThYM2JLdFRLOG1OS2dFSnYzMTNqeWFmOWVZWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733838030),
('QKze0aYQZJUNdnkUMtwZq0Amhbz6xXEfWM5ctO7I', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNXRET0Z3cHo3TGNpZ0hCd2ZIak9SSXVjNUxKRlRqV3V3MWxtUk5nTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735133114),
('QlvQ75fDcq3nAutwV8wuaWMWY1L6RRMrNaKADAvb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWwwQmJhUGloRXZwaDlUaTBWYlE5dFNCckFVMnRYUnpkVzNzZlo4OSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735476522),
('RI1VH28hSLNM8c23aUwa1hwbyPzSEq9OnBwXIC0i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicjBOVWFZdm1lOENic2JQa1lkeDRYOTBOSFEzYmx0TVE2N2J0NjBqTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735342585),
('Tey0Yt3ZmU6y1WUFnR7uXlAOvgxVP2Oi2VCe9iXh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVZZMEJCdUN0cE9XdmVzNlNKbFRsRHByb3ZZaHRUa1hOTHpVTk1FOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734571948),
('vn9Mep5uGjvinaxryflh00WEyNAPQbQubTdIRJ2b', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnVjMElmY3VSTTZOcGx1MHFpRU5DZE5iTUdlOERMUnlzeFFYVktURSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735435996),
('vVX1dcisfxNpK7ijheqHOtuBD8PXXEFRNj0bpRKj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnlTVkpsZFRZN2NXeEhPeGt1dUJvSFp5c3VXbDNJN0k0ak52TnR3VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734612027),
('wFGQKAvRRxbdfWakCU4WKAlV0szoUNgmqktjnITc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTHAxdW91SU9QNlVmSEZXM2FUVklvQThCVVBzekozOWZHQXRNczc1SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733816338),
('Wi2606Hl3Lil9Q6pbwDxx2jIDPqowu1wtv2oLX4n', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMEh1T0dodTVLYUZSY0lOQzF6S3NrN1dpdWlRaWYxdU9RUmxDSTMySiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1733824678);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `address`, `phone`) VALUES
(1, 'Admin Fashion', 'adminfashion@gmail.com', NULL, '$2y$12$wjMwmgIINkmQEG9CfO6EoOUaMYMCyWbRvadGV1f208LvjVqlXuqii', 'admin', NULL, '2024-12-09 03:44:45', '2024-12-24 22:27:57', NULL, NULL),
(2, 'John Doe', 'johndoe@gmail.com', NULL, '$2y$12$zMYtWxf93YNjTMZAOuFoD.ESLGFQTI6MsC4rZqLa3iGnlW8K4N3/.', 'user', NULL, '2024-12-09 03:51:24', '2024-12-28 19:36:02', NULL, NULL),
(3, 'Mary Smith', 'marysmith@gmail.com', NULL, '$2y$12$2WZ45ULkMXgLkEFF6CdtReIhvEvLUxsqtTZBY/ZYWn9/Q7pKJDNue', 'user', NULL, '2024-12-09 03:53:42', '2024-12-24 22:34:59', NULL, NULL),
(4, 'Alice Williams', 'alicewilliams@gmail.com', NULL, '$2y$12$GWVDKv.PDqOdR74SJ1JBf.7TQ4vWjFboEcwHOMSJJw2sIaFKsHNoa', 'user', NULL, '2024-12-09 03:53:56', '2024-12-09 03:53:56', NULL, NULL),
(5, 'Bob Jones', 'bobjones@gmail.com', NULL, '$2y$12$7ycYTt4RyZ15GLIGsgDSdufAAHQbv.7d2HJC.iEXg2M4lhGeufxLu', 'user', NULL, '2024-12-09 03:54:13', '2024-12-09 03:54:13', NULL, NULL),
(6, 'Charlie Brown', 'charliebrown@gmail.com', NULL, '$2y$12$tExotPN7IFlJt.yySOza9OiaiU3.7rCG3HfjQnKIU38tI9yFjc0BW', 'user', NULL, '2024-12-09 03:54:29', '2024-12-09 03:54:29', NULL, NULL),
(7, 'Eve Johnson', 'evejohnson@gmail.com', NULL, '$2y$12$h5YKJms.vjNc5GmfHm3hR.BpkZB9VKGoLupCzHX0KsT8MoXCQ.NfO', 'user', NULL, '2024-12-09 03:54:44', '2024-12-09 03:54:44', NULL, NULL),
(8, 'Frank Miller', 'frankmiller@gmail.com', NULL, '$2y$12$.M2vrZ6MGpJMaRdK7xBj6OlqzE4u/fCsVF1enrGT8GgvoKcAoXIXi', 'user', NULL, '2024-12-09 03:55:05', '2024-12-09 03:55:05', NULL, NULL),
(9, 'Grace Lee', 'gracelee@gmail.com', NULL, '$2y$12$4lO5vb6diqqzIykIj/ywfepK6KmOGB6OIgY4FLs6VnbjCbkGTR5T2', 'user', NULL, '2024-12-09 03:55:23', '2024-12-09 03:55:23', NULL, NULL),
(10, 'Hannah White', 'hannahwhite@gmail.com', NULL, '$2y$12$dWSmR2e3bfnIpIH2NqQe5.xWZMrM67BlDvYoi2R.PSOZrce.85hRW', 'user', NULL, '2024-12-09 03:55:38', '2024-12-09 03:55:38', NULL, NULL),
(11, 'Lucas Smith', 'lucassmith@gmail.com', NULL, '$2y$12$djYUfCvZ6.2XiDBsmJ3G5eQtRg46KgV7/XO4xPGjFuz1lDHIRvMSW', 'user', NULL, '2024-12-09 03:55:54', '2024-12-09 03:55:54', NULL, NULL),
(12, 'Akmal Maulana', 'akmalmaulana@gmail.com', NULL, '$2y$12$GR1c6G0Y.jUZtvedW3meXO9ZI0xpB5/uTrGraDEcKaBEaP/.yYwCy', 'user', NULL, '2024-12-09 21:22:14', '2024-12-09 21:22:14', NULL, NULL),
(13, 'Jesica Jane', 'jesica@gmail.com', NULL, '$2y$12$lo6bnDlpCFqPG/15LamJfOos83JvqVgUEQtIm.ZDHq3TbMkQwqHYq', 'user', NULL, '2024-12-11 22:06:34', '2024-12-11 22:06:34', NULL, NULL),
(22, 'mocha', 'mochalatte@gmail.com', NULL, '$2y$12$sur11azGP6xDgyq5urSXM.6ASZMv1fpHsZdPsNQC3Vzdzztb9pJ16', 'user', NULL, '2024-12-18 22:21:50', '2024-12-18 22:21:50', NULL, NULL),
(23, 'Padil', 'padil@gmail.com', NULL, '$2y$12$PWrNhtPa1VMTeMuuUBdDP.qV.WAn0xL6Cy0ZBodCEc1uaFshhCRre', 'user', NULL, '2024-12-24 23:33:00', '2024-12-24 23:33:00', NULL, NULL),
(24, 'arman', 'arman@gmail.com', NULL, '$2y$12$q6UqeMOeK.NDfxsISR/8DevA8oJQJAWAOqYp5kEOj5VNo7KU/KX2e', 'user', NULL, '2024-12-25 21:48:58', '2024-12-27 16:38:14', NULL, NULL),
(26, 'nazwa', 'nazwa@gmail.com', NULL, '$2y$12$GbGuO.DO/L36sZBXm/fWeexEypnldTh4/621cXAVL7DWeWrXsTtXG', 'user', NULL, '2024-12-30 05:36:13', '2024-12-30 05:36:13', NULL, NULL),
(27, 'Nadiena Azzahra Asyifa', 'nadiena@gmail.com', NULL, '$2y$12$zrWWq01aQyNT9FulbUTm9uTv5hYJHR0afWyxAanKqciwWGXzapqXq', 'user', NULL, '2024-12-30 08:57:09', '2024-12-30 08:57:09', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_code` (`order_code`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
