CREATE SCHEMA IF NOT EXISTS `taskursion`;
USE `taskursion`;

CREATE TABLE IF NOT EXISTS `taskursion`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_password` CHAR(116) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE);
  
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
  CONSTRAINT `user_id`
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
CREATE PROCEDURE `new_user` (IN username VARCHAR(20), IN email VARCHAR(255), IN pw CHAR(116))
BEGIN
	INSERT INTO `taskursion`.`user` (`user_name`, `user_email`, `user_password`) VALUES (username, email, pw);
END$$

CREATE PROCEDURE `get_login_info` (IN username VARCHAR(20), IN email VARCHAR(255), OUT id INT, OUT pw CHAR(116))
BEGIN
	SELECT `user_id`, `user_password` INTO id, pw
    FROM `taskursion`.`user`
    WHERE `user_name` = username AND `user_email` = email;
END$$

DELIMITER ;

# Throw in some test data
INSERT INTO `taskursion`.`user` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES (1, 'User1', 'user1@test.com', '$argon2i$v=19$m=4096,t=3,p=1$4r1TCoREeLfMxIskBtBPF28zFQeY6VHnwz6ZMoLeUkk$yiw6YNQ490vrB0DJF/Z871h/JZ8h4rksHA2wvoF5FP8');
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (1, 1, 'Main parent task', 'This is a test task. It\'s going to be a parent task to two child tasks', NULL);
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (2, 1, 'Child task 1', 'A test task. It has a parent and no children', 1);
INSERT INTO `taskursion`.`task` (`task_id`, `task_user_id`, `task_title`, `task_desc`, `task_parent_id`) VALUES (3, 1, 'Child task 2', 'A test task. It also has a parent and no children', 1);
