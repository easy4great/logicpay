CREATE TABLE `users` ( `id` INT NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `salt` varchar(255) DEFAULT NULL, `token` varchar(255) DEFAULT NULL, `ip` varchar(255) DEFAULT NULL, `Lastlogin` datetime DEFAULT NULL, `fname` varchar(255) NOT NULL, `lname` varchar(255) NOT NULL, `mname` varchar(255) DEFAULT NULL, `pic` blob DEFAULT NULL, `gender` varchar(255) DEFAULT NULL, `nationality` varchar(255) DEFAULT NULL, `so` varchar(255) DEFAULT NULL, `dob` date DEFAULT NULL, `homead` varchar(255) DEFAULT NULL, `tel` INT DEFAULT NULL, `tel2` INT DEFAULT NULL, `nin` bigint(10) DEFAULT 0123456789, `accnum` bigint(10) DEFAULT 0123456789, `acctype` varchar(10) DEFAULT 'savings', `acbal` INT DEFAULT 0, `create_date` datetime DEFAULT now(), `activate_date` datetime DEFAULT now(), PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;