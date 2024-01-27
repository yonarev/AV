-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2024 a las 12:03:57
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
-- Estructura de tabla para la tabla `usuariosav`
--

CREATE TABLE `usuariosav` (
  `idUsuario` varchar(50) NOT NULL,
  `usuario` varchar(4) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `psw` varchar(4) DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuariosav`
--

INSERT INTO `usuariosav` (`idUsuario`, `usuario`, `nombre`, `psw`, `tipo`, `detalle`) VALUES
('21012024220020', 'javv', 'Jorge andres Vera Videla', '5494', 'admin', 'admin'),
('21012024220245', 'juan', 'Juan', '1234', 'operativo', 'Jefe de bodega'),
('21012024220404', 'javi', 'javiera', '1234', 'reposicion', 'repone productos ');

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
