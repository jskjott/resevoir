import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import PostBody from '../components/PostBody'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader'
import Backlinks from '../components/Backlinks'
import Head from 'next/head'
import Vibrant from 'node-vibrant'

const radicleStyle = {
	height: '25px',
}

export default function Doc({
	title,
	img,
	altText,
	dates,
	content,
	mentionedIn,
	palette,
}: PageWithLinks) {
	return (
		<Layout>
			<Header color={palette} />
			<Container>
				<article className="grid">
					<Head>
						<title>
							Resevoir・
							{title.replace(/<p>/, '').replace(/<\/p>/, '')}
						</title>
						<meta property="og:image" content={img} />
					</Head>
					<img
						className="w-1/2 w-full max-h-screen md:w-4/6"
						src={`/images/${img}`}
						alt={altText}
					/>
					<div className="w-full md:w-4/6">
						<div className="max-w-lg mx-auto mb-10">
							<div className="mb-8"></div>
							<PostBody content={content} />
							<div className="pt-12" />
							<Backlinks backlinks={mentionedIn} dates={dates} />
						</div>
					</div>
				</article>
			</Container>
		</Layout>
	)
}

type StaticProps = {
	params: { page: string }
}

export async function getStaticProps({ params }: StaticProps) {
	const docs = getAllPages()

	const indexPage = docs[params.page]
	let contentString = `# ${indexPage.title}
	${indexPage.content}`
	let titleString = indexPage.title

	const matches = [...contentString.matchAll(/\[\[(.*?)\]\]/g)]
	matches.forEach((match) => {
		contentString = contentString.replace(
			match[0],
			`[{${match[1]}}](${match[1].replace(/ /g, '-')})`,
		)
	})

	const matchesTitle = [...titleString.matchAll(/\[\[(.*?)\]\]/g)]
	matchesTitle.forEach((match) => {
		titleString = titleString.replace(
			match[0],
			`[{${match[1]}}](${match[1].replace(/ /g, '-')})`,
		)
	})

	const content = await markdownToHtml(contentString)
	const title = await markdownToHtml(titleString)
	const palette = await Vibrant.from(
		`./public/images/${docs[params.page].img}`,
	)
		.getPalette()
		.then((palette) => palette)

	return {
		props: {
			...docs[params.page],
			palette: palette.DarkVibrant?.rgb,
			title,
			content,
		},
	}
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
	const docs = getAllPages()
	delete docs.photos
	const docArray = Object.values(docs)

	return {
		paths: docArray.map((doc) => {
			return {
				params: {
					test: doc,
					page: doc.slug,
				},
			}
		}),
		fallback: false,
	}
}
