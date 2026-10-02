CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`course` text DEFAULT '' NOT NULL,
	`due` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_assignments_user_due` ON `assignments` (`user_id`,`due`);