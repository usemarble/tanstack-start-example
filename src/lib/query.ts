import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { marble } from "./client";

export const getPosts = createServerFn().handler(async () => {
  const posts = await marble.posts.list();
  return posts.result;
});

export const getTags = createServerFn().handler(async () => {
  const tags = await marble.tags.list();
  return tags.result;
});

export const getSinglePost = createServerFn()
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    const post = await marble.posts.get({ identifier: slug });
    return post;
  });

export const getCategories = createServerFn().handler(async () => {
  const categories = await marble.categories.list();
  return categories.result;
});

export const getAuthors = createServerFn().handler(async () => {
  const authors = await marble.authors.list();
  return authors.result;
});
