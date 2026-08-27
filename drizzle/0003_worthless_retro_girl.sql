CREATE TABLE `activityLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`userOpenId` varchar(64),
	`userName` varchar(120),
	`type` enum('register','login','profile_update','user_created','role_change') NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activityLog_id` PRIMARY KEY(`id`)
);
