import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const assignments = sqliteTable('assignments', {
 id: text('id').primaryKey(),
 userId: text('user_id').notNull(),
 title: text('title').notNull(),
 description: text('description').notNull().default(''),
 course: text('course').notNull().default(''),
 due: text('due').notNull(),
}, table => [index('idx_assignments_user_due').on(table.userId, table.due)]);
