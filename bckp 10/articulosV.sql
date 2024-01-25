-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-01-2024 a las 23:51:09
-- Versión del servidor: 10.5.20-MariaDB
-- Versión de PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id18639165_basedatos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulosV`
--

CREATE TABLE `articulosV` (
  `idArticulo` varchar(50) NOT NULL,
  `codigoArticulo` int(11) DEFAULT NULL,
  `articulo` varchar(50) DEFAULT NULL,
  `detalle` varchar(100) DEFAULT NULL,
  `stockBodegaCentral` int(11) DEFAULT NULL,
  `stockBodega` int(11) DEFAULT NULL,
  `stockVitrina` int(11) DEFAULT NULL,
  `stockRepo` int(11) DEFAULT NULL,
  `stockCritico` int(11) DEFAULT NULL,
  `archivo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `articulosV`
--

INSERT INTO `articulosV` (`idArticulo`, `codigoArticulo`, `articulo`, `detalle`, `stockBodegaCentral`, `stockBodega`, `stockVitrina`, `stockRepo`, `stockCritico`, `archivo`) VALUES
('19012024095014', 424549, 'Vaso yoghurt cute celebration', 'Disney 100 $2990', 2175, 36, 14, 12, 10, 'foto19012024095014'),
('19012024100859', 287359, 'Shaker value keep $2590', 'Vaso 700ml mezcla batidos', 229, 0, 15, 0, 15, 'foto19012024100859'),
('19012024101518', 273116, 'Botella toma jugo kido', '250ml $2190', 391, 0, 11, 20, 20, 'foto19012024101518'),
('19012024102633', 118869, 'Set escolar minie rose 4un', '$1990 estuche lapiz goma sacap', 525, 384, 8, 25, 8, 'foto19012024102633'),
('19012024104336', 321576, 'Ollla a presion tefal 7.6l', '$18990', 0, 50, 17, 40, 10, 'foto19012024104336'),
('19012024105654', 575119, 'Porta sandwitch distroller', '', 776, 25, 82, 0, 10, 'foto19012024105654'),
('19012024112932', 30211, 'Sarten 26cm tefal', 'Antiadherente', 1075, 137, 11, 14, 10, 'foto19012024112932'),
('19012024113753', 1283, 'Alcohol spray 250 ml', '', 0, 0, 42, 48, 10, 'foto19012024113753'),
('22012024095621', 322487, 'Set botella + porta sandwich', 'Distroller $2000', 1665, 408, 36, 0, 0, 'foto22012024095621.jpg'),
('22012024121430', 4206, 'Eaponja multiuso anatomica', 'Acanalada 4 unidades $1790x', 41, 0, 31, 0, 0, 'foto22012024121430.jpg'),
('22012024154858', 33264, 'Sarten 30cm tefal aupee cook', '$6990', 1518, 52, 10, 12, 10, 'foto22012024154858.jpg'),
('23012024143816', 10000, 'Juego sabanas esenciales 1.5pl', '50%algodon', 3, 0, 3, 0, 0, 'foto23012024143816.jpg'),
('23012024174843', 73139, 'Vip pets mini', 'Fans s1 cdu', 319, 0, 17, 0, 0, 'foto23012024174843.jpg'),
('23012024175348', 0, '07634', 'Pala', 11, 0, 3, 0, 0, 'foto23012024175348.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulosV`
--
ALTER TABLE `articulosV`
  ADD PRIMARY KEY (`idArticulo`),
  ADD UNIQUE KEY `codigoArticulo` (`codigoArticulo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
