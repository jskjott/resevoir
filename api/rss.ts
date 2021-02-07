import { markdownToHtml, Page } from './functions'

export async function generateRssItem(page: Page) {
	const content = await markdownToHtml(page.content)

	const elements = page.dates[0].split('-')
	if (elements.length < 3) {
		throw new Error('internal')
	}
	const date = new Date(
		parseInt(elements[2]),
		parseInt(elements[1]) - 1,
		parseInt(elements[0]),
	)

	return `
    <item>
      <guid>${'https://resevoir.vercel.app/'}/${page.slug}</guid>
      <title>${page.title}</title>
      <link>${'https://resevoir.vercel.app/'}/${page.slug}</link>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>
  `
}

export async function generateRss(pages: Page[]) {
	const itemsList = await Promise.all(pages.map(generateRssItem))

	const elements = pages[0].dates[0].split('-')
	if (elements.length < 3) {
		throw new Error('internal')
	}
	const lastDate = new Date(
		parseInt(elements[2]),
		parseInt(elements[1]) - 1,
		parseInt(elements[0]),
	)

	return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${'Resevoir'}</title>
        <link>${'https://resevoir.vercel.app/'}</link>
        <description>${'A KNOWLEDGE-BASE FEATURING THE MOMENTUMS OF JONATHAN SKJØTT.'}</description>
        <language>en</language>
        <lastBuildDate>${lastDate.toUTCString()}</lastBuildDate>
        <atom:link href="${'https://resevoir.vercel.app/'}" rel="self" type="application/rss+xml"/>
        ${itemsList.join('')}
      </channel>
    </rss>
  `
}
