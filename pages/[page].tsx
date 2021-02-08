import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import PostBody from '../components/PostBody'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader'
import Backlinks from '../components/Backlinks'
import Head from 'next/head'
import Image from 'next/image'

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
}: PageWithLinks) {
	return (
		<Layout>
			<Container>
				<Header />

				<article>
					<Head>
						<title>
							Resevoir・
							{title.replace(/<p>/, '').replace(/<\/p>/, '')}
						</title>
						<meta property="og:image" content={img} />
					</Head>
					<div className="max-w-md mx-auto mb-10">
						<img src={`/images/${img}`} alt={altText} />
						<div className="mb-8"></div>
						<PostBody content={content} />
						<div className="pt-12" />
						<Backlinks backlinks={mentionedIn} dates={dates} />
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

	return {
		props: {
			...docs[params.page],
			title,
			content,
		},
	}
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
	const docs = getAllPages()
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
