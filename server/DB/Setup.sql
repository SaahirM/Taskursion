CREATE SCHEMA IF NOT EXISTS `taskursion`;
USE `taskursion`;

CREATE TABLE IF NOT EXISTS `taskursion`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `taskursion`.`password` (
  `pw_user_id` INT UNSIGNED NOT NULL,
  `pw_value` VARCHAR(32) NOT NULL,
  `pw_salt` BLOB(32) NOT NULL,
  PRIMARY KEY (`pw_user_id`),
  UNIQUE INDEX `pw_user_id_UNIQUE` (`pw_user_id` ASC) VISIBLE,
  CONSTRAINT `pw_user_id`
    FOREIGN KEY (`pw_user_id`)
    REFERENCES `taskursion`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `taskursion`.`task` (
  `task_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_user_id` INT UNSIGNED NOT NULL,
  `task_title` VARCHAR(60) NULL,
  `task_desc` TEXT NULL,
  `task_parent_id` INT UNSIGNED NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE INDEX `task_id_UNIQUE` (`task_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`task_user_id` ASC) VISIBLE,
  INDEX `task_parent_id_idx` (`task_parent_id` ASC) VISIBLE,
  CONSTRAINT `task_user_id`
    FOREIGN KEY (`task_user_id`)
    REFERENCES `taskursion`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `task_id`
    FOREIGN KEY (`task_parent_id`)
    REFERENCES `taskursion`.`task` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_user`(IN username VARCHAR(20), IN email VARCHAR(255), IN pw_hash VARCHAR(32), IN pw_salt BLOB(32))
BEGIN
	INSERT INTO `taskursion`.`user` (`user_id`, `user_name`, `user_email`) VALUES (NULL, username, email);
	INSERT INTO `taskursion`.`password` (`pw_user_id`, `pw_value`, `pw_salt`) VALUES (
		(SELECT `user_id` FROM `taskursion`.`user` WHERE `user_email` = email),
        pw_hash,
        pw_salt
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_password`(IN username VARCHAR(20), IN email VARCHAR(255), OUT pw_hash VARCHAR(32), OUT pw_salt BLOB(32))
BEGIN
	SELECT `pw_value`, `pw_salt`
	INTO pw_hash, pw_salt
    FROM `taskursion`.`password`
    WHERE `pw_user_id` = (
		SELECT `user_id` FROM `taskursion`.`user` WHERE `user_email` = email
	);
END$$

DELIMITER ;

# Throw in test data
INSERT INTO `taskursion`.`user` (`user_id`, `user_name`, `user_email`) VALUES (1, 'User1', 'user1@test.com');
INSERT INTO `taskursion`.`password` (`pw_user_id`, `pw_value`, `pw_salt`) VALUES (1, 'hash', 0x73616C7424242424242424242424242424242424242424242424242424242424);
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (1, 1, 'Main parent task', 'This is a test task. It\'s going to be a parent task to two child tasks', NULL);
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (2, 1, 'Child task 1', 'A test task. It has a parent and no children', 1);
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (3, 1, 'Child task 2', 'A test task. It also has a parent and no children', 1);
