import {Post} from '@/src/interfaces/post';
import fs from 'fs';
import matter from 'gray-matter';
import {join} from 'path';

const postsDirectory = join(process.cwd(), '_posts');
const pagesDirectory = join(process.cwd(), '_pages');

export async function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {...data, slug: realSlug, content} as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = (
    await Promise.all(slugs.map(async slug => await getPostBySlug(slug)))
  )
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function getPageSlugs() {
  return fs.readdirSync(pagesDirectory);
}

export async function getPageBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(pagesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {...data, slug: realSlug, content} as Post;
}

export async function getAllPages(): Promise<Post[]> {
  const slugs = await getPageSlugs();
  const posts = (
    await Promise.all(slugs.map(async slug => await getPageBySlug(slug)))
  )
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
