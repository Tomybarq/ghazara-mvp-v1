CREATE TABLE `articleTags` (
	`articleId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `articleTags_articleId_tagId_pk` PRIMARY KEY(`articleId`,`tagId`)
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleEn` varchar(255),
	`slug` varchar(255) NOT NULL,
	`summary` text,
	`summaryEn` text,
	`content` text NOT NULL,
	`contentEn` text,
	`featuredImage` varchar(1024),
	`categoryId` int,
	`author` varchar(160) NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(140) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `incomingEmails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sender` varchar(320) NOT NULL,
	`recipient` varchar(320) NOT NULL,
	`subject` varchar(500),
	`body` text,
	`receivedAt` timestamp NOT NULL DEFAULT (now()),
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incomingEmails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(80) NOT NULL,
	`slug` varchar(100) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_slug_unique` UNIQUE(`slug`)
);
