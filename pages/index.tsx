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

type Props = {
	docArray: PageWithLinks[]
	index: PageWithLinks
}

const radicleStyle = {
	height: '25px',
}

export default function Doc({ docArray, index }: Props) {
	return (
		<Layout>
			<Container>
				<Header />

				<article className="mb-32 grid">
					<Head>
						<title>Index | Resevoir</title>
					</Head>
					<div className="max-w-md mx-auto mb-10">
						<img
							className="mb-6"
							src={`/images/${index.img}`}
							alt={index.altText}
						/>
						<div
							className="mb-6"
							dangerouslySetInnerHTML={{
								__html: index.content,
							}}
						/>
						<div className="mb-12 grid">
							<svg
								className="w-md place-self-center"
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
											fill="white"
											strokeWidth="0.25px"
										/>
									</a>
								))}
							</svg>
						</div>

						<Backlinks
							backlinks={index.mentionedIn}
							dates={index.dates}
						/>

						<div className="h-3 pt-16 pb-32 grid">
							<span className="place-self-center">
								<img
									style={radicleStyle}
									src="/images/radicle.png"
								></img>
							</span>
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

	return {
		props: {
			docArray,
			index,
		},
	}
}
