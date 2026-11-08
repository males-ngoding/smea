import { relations } from "drizzle-orm/relations";
import { user, account, session, category, article } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	articles: many(article),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const articleRelations = relations(article, ({one}) => ({
	category: one(category, {
		fields: [article.categoryId],
		references: [category.id]
	}),
	user: one(user, {
		fields: [article.authorId],
		references: [user.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	articles: many(article),
}));