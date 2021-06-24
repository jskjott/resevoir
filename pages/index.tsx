import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import Header from '../components/Header'
import Backlinks from '../components/Backlinks'
import Head from 'next/head'
import Link from 'next/link'
import { generateRss } from '../api/rss'
import fs from 'fs'
import Vibrant from 'node-vibrant'

type Props = {
	docArray: PageWithLinks[]
	index: PageWithLinks
	about: string
	palette: [number, number, number]
}

const radicleStyle = {
	height: '25px',
}

export default function Doc({ docArray, index, about, palette }: Props) {
	return (
		<Layout>
			<Header color={palette} />
			<Container>
				<article className="w-full grid">
					<Head>
						<title>Index | Resevoir</title>
					</Head>
					<div className="md:grid gap-10 md:grid-cols-3">
						<div className="col-start-1 col-end-3 grid">
							<img
								className=""
								src={`/images/waterfoliage.JPG`}
								alt={index.altText}
							/>
						</div>
						<div className="max-w-lg opacity-50 grid col-end-4 col-start-3 hover:opacity-100 transition-opacity duration-200 ease-in-out">
							<div
								className="md:place-self-center"
								dangerouslySetInnerHTML={{
									__html: index.content,
								}}
							/>
						</div>
					</div>
					<div className="md:grid gap-10 md:grid-cols-2 lg:grid-cols-3">
						<div className="max-w-lg mb-6 opacity-50 col-start-1 col-end-3 grid hover:opacity-100 transition-opacity duration-200 ease-in-out">
							<div
								className="pt-8 md:py-8"
								dangerouslySetInnerHTML={{
									__html: about,
								}}
							/>
						</div>
						<div className="mb-6 opacity-50 col-start-3 col-end-4 hover:opacity-100 transition-opacity duration-200 ease-in-out">
							<p className="pb-8 md:py-8">
								Sprouts growing throuhgout the site:
							</p>

							<svg
								className="w-md"
								height={`${(1 + docArray.length / 10) * 30}px`}
								xmlns="http://www.w3.org/2000/svg"
							>
								{docArray.map((page, index) => (
									<a href={page.slug} key={index}>
										<rect
											x={`${30 * (index % 10)}px`}
											y={`${
												30 * Math.floor(index / 10)
											}px`}
											width="22px"
											height="22px"
											fill="#90A252"
											strokeWidth="0.25px"
										/>
									</a>
								))}
							</svg>
						</div>
					</div>
				</article>
			</Container>
		</Layout>
	)
}

export async function getStaticProps() {
	const docs = getAllPages()
	const docArray = Object.values(docs)

	const aboutPage = docs.jonathan
	let about = aboutPage.content
	const aboutLinks = [...about.matchAll(/\[\[(.*?)\]\]/g)]
	aboutLinks.forEach((match) => {
		about = about.replace(match[0], `[{${match[1]}}](${match[1]})`)
	})
	about = await markdownToHtml(about)

	const indexPage = docs.index
	let contentString = `# ${docs.index.title}
	${indexPage.content}`

	const matches = [...contentString.matchAll(/\[\[(.*?)\]\]/g)]
	matches.forEach((match) => {
		contentString = contentString.replace(
			match[0],
			`[{${match[1]}}](${match[1]})`,
		)
	})

	const content = await markdownToHtml(contentString)

	const rss = await generateRss(docArray)

	fs.writeFileSync('./public/rss.xml', rss)

	const index = {
		...indexPage,
		content,
	}

	const palette = await Vibrant.from(`./public/images/waterfoliage.JPG`)
		.getPalette()
		.then((palette) => palette)

	return {
		props: {
			docArray,
			index,
			about,
			palette: palette.DarkVibrant?.rgb,
		},
	}
}
