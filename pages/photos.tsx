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
						<img
							className=""
							src={`/images/waterfoliage.JPG`}
							alt={index.altText}
						/>
						<img
							className=""
							src={`/images/peeking.jpg`}
							alt={'peeking out through shrubbery'}
						/>
						<img
							className=""
							src={`/images/peonies.jpg`}
							alt={'peonies in vase at the onset of summer'}
						/>
						<img
							className=""
							src={`/images/sunsparks.jpg`}
							alt={'closeup of bushes in the sun'}
						/>
						<img
							className=""
							src={`/images/rotheredge.jpg`}
							alt={'dramatic silouette of wooden pavilion'}
						/>
						<img
							className=""
							src={`/images/opening_in_wall.jpg`}
							alt={'alleyway and brick wall'}
						/>
						<img
							className=""
							src={`/images/wrinkly_tree.jpg`}
							alt={
								'a tree with wrinkly branches extending upwards'
							}
						/>
						<img
							className=""
							src={`/images/bush_on_water.jpg`}
							alt={'a bush with flowers on the edge of a pond'}
						/>
						<img
							className=""
							src={`/images/flowers_and_dead_leaves.jpg`}
							alt={'purple flowers and dead leaves'}
						/>
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
