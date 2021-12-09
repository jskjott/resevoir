import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import PostBody from '../components/PostBody'
import Header from '../components/Header'
import Backlinks from '../components/Backlinks'
import Head from 'next/head'
import Vibrant from 'node-vibrant'

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

			<Head>
				<title>
					Resevoir・
					{title.replace(/<p>/, '').replace(/<\/p>/, '')}
				</title>
				<meta property="og:image" content={img} />
				<style
					dangerouslySetInnerHTML={{
						__html: `
						a:hover {
							color:white;
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, .6);
							
						}

						h1 {
							color: rgba(${palette[0]},${palette[1]},${palette[2]}, 1);
							text-decoration: underline 15px rgb(${palette[0]},${palette[1]},${palette[2]});
							padding-bottom: 3rem;
							padding-top: 1rem;
						}
						h2, h3, h4 {
							color: rgba(${palette[0]},${palette[1]},${palette[2]}, 1);
						}

						::selection {
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6); /* WebKit/Blink Browsers */
							color: white;
						}
						::-moz-selection {
						background: rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6); /* Gecko Browsers */
						color: white;
						}
						`,
					}}
				/>
			</Head>

			<div
				className="relative w-full pt-8 pb-4 md:pt-20 md:p-24 grid md:pb-36 place-self-center"
				style={{
					background: `rgba(${palette[0]},${palette[1]},${palette[2]}, .1)`,
				}}
			>
				<img
					className="relative w-auto max-h-screen place-self-center "
					src={`/images/${img}`}
					alt={altText}
				/>
				<span
					style={{
						color: `rgba(${palette[0]},${palette[1]},${palette[2]}, .4)`,
					}}
					className="px-2 pt-4 text-sm md:pt-10 place-self-center"
				>
					{' '}
					{altText}
				</span>
			</div>
			<Container>
				<article className="grid">
					<div className="w-full place-self-center md:w-4/6">
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
