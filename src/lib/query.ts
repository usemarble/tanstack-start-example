import type {
  MarbleAuthorList,
  MarbleCategoryList,
  MarblePost,
  MarblePostList,
  MarbleTagList,
} from "@/types/marble";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const url = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_PUBLIC_KEY;

if (!url || !key) {
  throw new Error(
    "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
  );
}

export const getPosts = createServerFn().handler(async () => {
  try {
    const raw = await fetch(`${url}/posts`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data: MarblePostList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getTags = createServerFn().handler(async () => {
  try {
    const raw = await fetch(`${url}/tags`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data: MarbleTagList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getSinglePost = createServerFn()
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    try {
      const raw = await fetch(`${url}/posts/${slug}`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      const data: MarblePost = await raw.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  });

export const getCategories = createServerFn().handler(async () => {
  try {
    const raw = await fetch(`${url}/categories`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data: MarbleCategoryList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAuthors = createServerFn().handler(async () => {
  try {
    const raw = await fetch(`${url}/authors`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data: MarbleAuthorList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});
