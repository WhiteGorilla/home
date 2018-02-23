INSERT INTO `textile` (`id`, `type_id`, `brand_id`, `kind_id`) VALUES (NULL, '1', '2', '1');
INSERT INTO `textile` (`id`, `type_id`, `brand_id`, `kind_id`) VALUES (NULL, '2', '3', '2');
INSERT INTO `textile` (`id`, `type_id`, `brand_id`, `kind_id`) VALUES (NULL, '2', '4', '2');
INSERT INTO `textile` (`id`, `type_id`, `brand_id`, `kind_id`) VALUES (NULL, '2', '1', '3');

INSERT INTO `kind` (`id`, `name`, `footage_m`) VALUES (NULL, 'satin', '4');
INSERT INTO `kind` (`id`, `name`, `footage_m`) VALUES (NULL, 'knitwear', '5');
INSERT INTO `kind` (`id`, `name`, `footage_m`) VALUES (NULL, 'coarse', '10');

INSERT INTO `types` (`id`, `type`) VALUES (NULL, 'for home'), (NULL, 'for clothes');

INSERT INTO `brands` (`id`, `brand`, `price_m`) VALUES (NULL, 'Stella Ricci', '100'), (NULL, 'ShtorTex', '200');
INSERT INTO `brands` (`id`, `brand`, `price_m`) VALUES (NULL, 'Trembita', '50'), (NULL, 'Pantex', '25');

relation view

ALTER TABLE `textile` ADD FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `textile` ADD FOREIGN KEY (`kind_id`) REFERENCES `kind`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `textile` ADD FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;