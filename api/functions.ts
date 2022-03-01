import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { generateNetwork } from './generateBacklinks'

export type Page = {
	title: string
	dates: string[]
	tags: string[]
	altText: string
	img: string
	content: string
	slug: string
	palette: [number, number, number]
}

export async function markdownToHtml(markdown: string) {
	const result = await remark().use(html).process(markdown)
	return result.toString()
}

const postsDirectory = join(process.cwd(), './content')

export function getPageSlugs() {
	return fs.readdirSync(postsDirectory)
}

export function getPageBySlug(slug: string) {
	const realSlug = slug.replace(/\.txt$/, '')
	const fullPath = join(postsDirectory, `${realSlug}.txt`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	const matches: unknown = [...fileContents.matchAll(/\n/g)]

	if (
		!(
			Array.isArray(matches) &&
			matches.length >= 3 &&
			typeof matches[3] === 'object' &&
			matches[3] !== null
		)
	) {
		throw new Error('internal')
	}

	const point = matches[4] as { index: number }

	const prepared = `---
${fileContents.slice(0, point.index)}
---
${fileContents.slice(point.index)}`

	const {
		data,
		content,
	}: { data: Record<string, unknown>; content: string } = matter(prepared)

	if (
		typeof data.title !== 'string' ||
		typeof data.altText !== 'string' ||
		!(
			Array.isArray(data.dates) &&
			data.dates.every((item) => typeof item === 'string')
		) ||
		!(
			Array.isArray(data.tags) &&
			data.tags.every((item) => typeof item === 'string')
		) ||
		typeof data.img !== 'string'
	) {
		throw new Error('internal')
	}

	const dates = data.dates
	const tags = data.tags

	const pageData: Page = {
		title: data.title,
		palette: [0, 0, 0],
		slug: slug.replace(/.txt/, '').replace(/ /g, '-'),
		dates,
		tags,
		altText: data.altText,
		img: data.img,
		content,
	}

	return pageData
}

export function getAllPages() {
	const slugs = getPageSlugs()

	const posts = slugs
		.filter((slug) => slug !== '.DS_Store' && slug !== 'Notes & Settings')
		.map((slug) => getPageBySlug(slug))
	const entryDictionary = generateNetwork(posts)

	return entryDictionary
}
