-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2024 a las 11:59:44
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `q`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulosv`
--

CREATE TABLE `articulosv` (
  `idArticulo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `codigoArticulo` int(11) DEFAULT NULL,
  `articulo` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `detalle` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stockBodegaCentral` int(11) DEFAULT NULL,
  `stockBodega` int(11) DEFAULT NULL,
  `stockVitrina` int(11) DEFAULT NULL,
  `stockRepo` int(11) DEFAULT NULL,
  `stockCritico` int(11) DEFAULT NULL,
  `archivo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idUsuario` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `articulosv`
--

INSERT INTO `articulosv` (`idArticulo`, `codigoArticulo`, `articulo`, `detalle`, `stockBodegaCentral`, `stockBodega`, `stockVitrina`, `stockRepo`, `stockCritico`, `archivo`, `idUsuario`) VALUES
('19012024095014', 424549, 'Vaso yoghurt cute celebration', 'Disney 100 $2990', 2175, 36, 14, 12, 10, 'foto19012024095014', '21012024220020'),
('19012024100859', 287359, 'Shaker value keep $2590', 'Vaso 700ml mezcla batidos', 229, 0, 15, 0, 15, 'foto19012024100859', '21012024220020'),
('19012024101518', 273116, 'Botella toma jugo kido', '250ml $2190', 391, 0, 11, 20, 20, 'foto19012024101518', '21012024220020'),
('19012024102633', 118869, 'Set escolar minie rose 4un', '$1990 estuche lapiz goma sacap', 525, 384, 8, 25, 8, 'foto19012024102633', '21012024220020'),
('19012024104336', 321576, 'Ollla a presion tefal 7.6l', '$18990', 0, 50, 17, 40, 10, 'foto19012024104336', '21012024220020'),
('19012024105654', 575119, 'Porta sandwitch distroller', '', 776, 25, 82, 0, 10, 'foto19012024105654', '21012024220020'),
('19012024112932', 30211, 'Sarten 26cm tefal', 'Antiadherente', 1075, 137, 11, 14, 10, 'foto19012024112932', '21012024220020'),
('19012024113753', 1283, 'Alcohol spray 250 ml', '', 0, 0, 42, 48, 10, 'foto19012024113753', '21012024220020'),
('22012024095621', 322487, 'Set botella + porta sandwich', 'Distroller $2000', 1665, 408, 36, 0, 0, 'foto22012024095621.jpg', '21012024220020'),
('22012024121430', 4206, 'Eaponja multiuso anatomica', 'Acanalada 4 unidades $1790x', 41, 0, 31, 0, 0, 'foto22012024121430.jpg', '21012024220020'),
('22012024154858', 33264, 'Sarten 30cm tefal aupee cook', '$6990', 1518, 52, 10, 12, 10, 'foto22012024154858.jpg', '21012024220020'),
('23012024143816', 10000, 'Juego sabanas esenciales 1.5pl', '50%algodon', 3, 0, 3, 0, 0, 'foto23012024143816.jpg', '21012024220020'),
('23012024174843', 73139, 'Vip pets mini', 'Fans s1 cdu', 319, 0, 17, 0, 0, 'foto23012024174843.jpg', '21012024220020'),
('23012024175348', 7634, 'pala', 'Pala', 11, 0, 3, 0, 0, 'foto23012024175348.jpg', '21012024220020'),
('23012024214237', 1, '1', '1', 11, 11, 11, 1, 1, 'foto23012024214237.jpg', '21012024220245');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulosv`
--
ALTER TABLE `articulosv`
  ADD PRIMARY KEY (`idArticulo`),
  ADD UNIQUE KEY `codigoArticulo` (`codigoArticulo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
