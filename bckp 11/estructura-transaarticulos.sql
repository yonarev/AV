-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2024 a las 12:06:30
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
-- Estructura de tabla para la tabla `trasaarticulosv`
--

CREATE TABLE `trasaarticulosv` (
  `idTrans` varchar(30) NOT NULL,
  `fecha` varchar(10) DEFAULT NULL,
  `hora` varchar(10) DEFAULT NULL,
  `idUsuario` varchar(30) DEFAULT NULL,
  `idArticulo` varchar(50) DEFAULT NULL,
  `codigoArticulo` int(11) DEFAULT NULL,
  `articulo` varchar(50) DEFAULT NULL,
  `detalle` varchar(100) DEFAULT NULL,
  `stockBodegaCentral` int(11) DEFAULT NULL,
  `stockBodega` int(11) DEFAULT NULL,
  `stockVitrina` int(11) DEFAULT NULL,
  `stockRepo` int(11) DEFAULT NULL,
  `stockCritico` int(11) DEFAULT NULL,
  `archivo` varchar(100) DEFAULT NULL,
  `transaccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `trasaarticulosv`
--

INSERT INTO `trasaarticulosv` (`idTrans`, `fecha`, `hora`, `idUsuario`, `idArticulo`, `codigoArticulo`, `articulo`, `detalle`, `stockBodegaCentral`, `stockBodega`, `stockVitrina`, `stockRepo`, `stockCritico`, `archivo`, `transaccion`) VALUES
('24012024212302', '24/01/2024', '21:23:02', '21012024220020', '24012024212214', 11, '1', '1', 1, 1, 1, 1, 1, 'foto24012024212214.jpg', 'transaccion'),
('24012024212819', '24/01/2024', '21:28:19', '21012024220020', '24012024212214', 11, '1', '1', 11, 1, 1, 1, 1, NULL, 'transaccion'),
('24012024214103', '24/01/2024', '21:41:03', '21012024220020', '24012024212214', 11, '1', '1', 111, 11, 1, 1, 1, NULL, 'transaccion'),
('24012024214330', '24/01/2024', '21:43:30', '21012024220020', '24012024212214', 11, '1', '1', 111, 0, 1, 12, 1, NULL, 'Actualizacion del articulo '),
('24012024214416', '24/01/2024', '21:44:16', '21012024220020', '24012024214344', 222, '2', '2', 200, 0, 0, 0, 0, 'foto24012024214344.jpg', 'Generacion de un nuevo Articulo'),
('24012024214745', '24/01/2024', '21:47:45', '21012024220245', '24012024214344', 222, 'segundo articulo', '2', 200, 0, 0, 0, 0, NULL, 'Actualizacion del articulo '),
('24012024231828', '24/01/2024', '23:18:28', '21012024220245', '24012024214344', 222, 'segundo articulo', '2do arte', 200, 100, 0, 0, 0, NULL, 'Actualizacion del articulo:  & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se editaron los campos & Se editaron los campos'),
('24012024231914', '24/01/2024', '23:19:14', '21012024220245', '24012024214344', 222, 'segundo articulo', '2do arte', 200, 0, 0, 100, 0, NULL, 'Actualizacion del articulo:  & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se editaron los campos & Se editaron los campos & Se recalcularon los datos & posible reposicion de stock de vitrina & Se recalcularon los datos'),
('24012024232000', '24/01/2024', '23:20:00', '21012024220245', '24012024214344', 222, 'segundo articulo', '2do arte', 200, 0, 50, 50, 0, NULL, 'Actualizacion del articulo:  & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se editaron los campos & Se editaron los campos & Se recalcularon los datos & posible reposicion de stock de vitrina & Se recalcularon los datos & Se recalcularon los datos & Se agrego articulo a la lista de pedidos & solicitud de abastecimiento de bodega local'),
('24012024232038', '24/01/2024', '23:20:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Actualizacion del articulo:  & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se recalcularon los datos & Se editaron los campos & Se editaron los campos & Se recalcularon los datos & posible reposicion de stock de vitrina & Se recalcularon los datos & Se recalcularon los datos & Se agrego articulo a la lista de pedidos & solicitud de abastecimiento de bodega local & se elimino el articulo con id= 24012024214344'),
('24012024232655', '24/01/2024', '23:26:55', '21012024220245', '24012024232632', 33, '', '', 0, 0, 0, 0, 0, 'foto24012024232632.jpg', 'Generacion de un nuevo Articulo'),
('24012024232822', '24/01/2024', '23:28:22', '21012024220020', '24012024232632', 33, '', '', 100, 0, 0, 0, 0, NULL, 'Actualizacion del articulo:  & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Se editaron los campos'),
('24012024232836', '24/01/2024', '23:28:36', '21012024220020', '24012024232632', 33, 'xxx', 'xxx', 100, 0, 0, 0, 0, NULL, 'Actualizacion del articulo:  & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Se editaron los campos'),
('24012024233104', '24/01/2024', '23:31:04', '21012024220020', '24012024232632', 33, 'xxx', 'xxx', 50, 25, 12, 13, 0, NULL, 'Actualizacion del articulo:  & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Se editaron los campos & Se agrego articulo a la lista de pedidos & solicitud de abastecimiento de bodega local & Recalculo & posible abastecimiento de bodega local & Recalculo & posible reposicion de stock de vitrina & Recalculo & Recalculo'),
('24012024233114', '24/01/2024', '23:31:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Actualizacion del articulo:  & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Recalculo & Se editaron los campos & Se agrego articulo a la lista de pedidos & solicitud de abastecimiento de bodega local & Recalculo & posible abastecimiento de bodega local & Recalculo & posible reposicion de stock de vitrina & Recalculo & Recalculo & se elimino el articulo con id= 24012024232632 por el usuario con id function idUsuarioActivo() {\r\n    // Obtener el valor almacenado en sessionStorage con la clave \'av\'\r\n    let avValue = sessionStorage.getItem(\'av\');\r\n    // Verificar si el valor existe y no es nulo\r\n    if (avValue) {\r\n        try {\r\n            // Intentar convertir el valor de \'av\' a un objeto JavaScript\r\n            let avObject = JSON.parse(avValue);\r\n            // Devolver el valor del campo \'idUsuario\' si está presente\r\n            return avObject.idUsuario || null;\r\n        } catch (error) {\r\n            console.error(\'Error al analizar el valor de \"av\":\', error);\r\n            alert(\'Error al analizar el valor de \"av\":\'+ error);\r\n        }\r\n    } else {\r\n        console.error(\'No se encontró ningún valor en sessionStorage con la clave \"av\".\');\r\n        alert(\'No se encontró ningún valor en sessionStorage \');\r\n    }\r\n    // En caso de error o si no se encuentra el valor esperado, devolver null\r\n    return null;\r\n}'),
('24012024233432', '24/01/2024', '23:34:32', '21012024220020', '24012024233420', 44, '', '', 0, 0, 0, 0, 0, 'foto24012024233420.jpg', 'Generacion de un nuevo Articulo'),
('24012024233512', '24/01/2024', '23:35:12', '21012024220020', '24012024233420', 44, 'cuatro', 'cuatrito', 0, 0, 0, 0, 0, NULL, 'Actualizacion del articulo:  & Se editaron los campos'),
('24012024233640', '24/01/2024', '23:36:40', '21012024220020', '24012024233420', 44, 'cuatro', 'cuatrito', 100, 50, 25, 25, 0, NULL, 'Actualizacion del articulo:  & Se editaron los campos & Se editaron los campos & Se editaron los campos & posible abastecimiento de bodega local & posible reposicion de stock de vitrina'),
('24012024233657', '24/01/2024', '23:36:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Actualizacion del articulo:  & Se editaron los campos & Se editaron los campos & Se editaron los campos & posible abastecimiento de bodega local & posible reposicion de stock de vitrina & Se agrego articulo a la lista de pedidos & solicitud de abastecimiento de bodega local & se elimino el articulo con id= 24012024233420 por el usuario con id 21012024220020'),
('24012024233714', '24/01/2024', '23:37:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Actualizacion del articulo:  & se elimino el articulo con id= 24012024212214 por el usuario con id 21012024220020');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `trasaarticulosv`
--
ALTER TABLE `trasaarticulosv`
  ADD PRIMARY KEY (`idTrans`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
