import { Page } from './functions'

export interface PageWithLinks extends Page {
	mentionedIn: string[]
	mentions: string[]
}

export function generateNetwork(pages: Page[]) {
	const entries: PageWithLinks[] = pages.map((page) => {
		return {
			...page,
			mentionedIn: [],
			mentions: [],
		}
	})

	const entryDictionary: Record<string, PageWithLinks> = {}
	entries.forEach((entry) => {
		entryDictionary[entry.slug] = entry
	})

	entries.map((entry) => {
		const internal = [...entry.content.matchAll(/\[\[(.*?)\]\]/g)].map(
			(ele) => {
				if (
					Array.isArray(ele) &&
					ele.length > 0 &&
					typeof ele[0] === 'string'
				) {
					return ele[0].substring(2, ele[0].length - 2)
				}
			},
		)

		const routerLinks = [...entry.content.matchAll(/to="(.*?)"/g)].map(
			(ele) => {
				if (
					Array.isArray(ele) &&
					ele.length > 1 &&
					typeof ele[1] === 'string'
				) {
					return ele[1]
				}
			},
		)
		const links = [
			...internal,
			...routerLinks,
			...[...entry.content.matchAll(/]\((.*?\.html)\)/g)].map((ele) => {
				if (
					Array.isArray(ele) &&
					ele.length > 1 &&
					typeof ele[1] === 'string'
				) {
					return ele[1]
				}
			}),
		]

		if (links.length > 0) {
			links.forEach((page) => {
				if (
					entryDictionary[entry.slug] === undefined ||
					page === undefined
				) {
					throw new Error('internal')
				}

				entryDictionary[entry.slug.replace(/ /g, '-')].mentions.push(
					page.replace(/ /g, '-'),
				)
				entryDictionary[page.replace(/ /g, '-')].mentionedIn.push(
					entry.slug.replace(/ /g, '-'),
				)
			})
		}
	})

	return entryDictionary
}
