import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Category, SubCategory, HotPostSlugs } from './constants'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function setLocale(locale) {
  document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
}

export function getFileName(locale) {
  if (['zh-CN', 'en-GB'].includes(locale)) {
    return `index.${locale}.md`
  }

  if (locale.split('-')[0] === 'zh') {
    return `index.zh-TW.md`
  }

  return 'index.md'
}

export function getPostBySlug(slug, fields = [], locale) {
  // const realSlug = slug.replace(/\.md$/, '')
  // const filename = locale === 'en-US' || !locale ? 'index.md' : `index.${locale}.md`

  const filename = getFileName(locale)

  const fullPath = join(postsDirectory, slug, filename)

  if (!fs.existsSync(fullPath)) {
    return
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPostPaths(locales) {
  let paths = []

  const slugs = getPostSlugs()

  for (let slug of slugs) {
    for (let locale of locales) {
      const filename = getFileName(locale)
      let fullpath = join(postsDirectory, slug, filename)
      if (!fs.existsSync(fullpath)) {
        continue
      }

      paths.push({ params: { slug }, locale })
    }
  }

  return paths
}

export function getAllCategoryPaths(locales) {
  let paths = []

  const categories = Object.keys(Category)

  for (let category of categories) {
    for (let locale of locales) {
      paths.push({ params: { category }, locale })
    }
  }

  return paths
}

export function getAllSubCategoryPaths(locales) {
  let paths = []

  const subCategories = Object.keys(SubCategory)

  for (let subCategory of subCategories) {
    for (let locale of locales) {
      paths.push({ params: { subCategory }, locale })
    }
  }

  return paths
}

export function getAllPosts(fields = [], locale) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, locale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostsBySlugs(slugs, fields = [], locale) {
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, locale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getCategoryPosts(category, fields = [], locale) {
  fields.indexOf('category') === -1 ? fields.push('category') : fields
  fields.indexOf('subCategory') === -1 ? fields.push('subCategory') : fields

  const posts = getAllPosts(fields, locale).filter((post) => post?.category === category)

  return posts
}

export function getSubCategoryPosts(subCategory, fields = [], locale) {
  fields.indexOf('subCategory') === -1 ? fields.push('subCategory') : fields

  const posts = getAllPosts(fields, locale).filter((post) => post?.subCategory === subCategory)

  return posts
}
export function getHotPosts(fields = [], locale) {
  const slugs = HotPostSlugs
  const posts = slugs.map((slug) => getPostBySlug(slug, fields, locale))
  // sort posts by date in descending order
  return posts
}
