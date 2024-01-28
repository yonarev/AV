-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-01-2024 a las 12:00:03
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
-- Estructura de tabla para la tabla `usuariosav`
--

CREATE TABLE `usuariosav` (
  `idUsuario` varchar(50) NOT NULL,
  `usuario` varchar(4) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `psw` varchar(4) DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuariosav`
--

INSERT INTO `usuariosav` (`idUsuario`, `usuario`, `nombre`, `psw`, `tipo`, `detalle`) VALUES
('22012024204609', 'x', 'x', 'x', 'x', 'x'),
('22012024204619', 'y', 'y', 'y', 'y', 'y'),
('22012024220940', 'javv', 'Jorge Vera Videla', '5494', 'admin', 'desarrollador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuariosav`
--
ALTER TABLE `usuariosav`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `nombre` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
