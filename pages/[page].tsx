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
	tags,
	dates,
	content,
	mentionedIn,
	palette,
}: PageWithLinks) {
	return (
		<Layout>
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
							padding-top: 5rem;
							padding-bottom: 1rem;
						}
						h2, h3, h4 {
							color: rgba(${palette[0]},${palette[1]},${palette[2]}, 1);
						}

						::selection {
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6); /* WebKit/Blink Browsers */
							color: white;
						}

						background: rgba(${palette[0]},${palette[1]},${palette[2]}, .2)

						html {
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, .2);
						}

						img {
							padding-top: 1rem;
							padding-bottom: 1rem;
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
				className="fixed top-0 z-30 w-screen h-8"
				style={{
					background: `rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6)`,
				}}
			>
				<Backlinks backlinks={mentionedIn} dates={dates} image={img} />
			</div>
			<div className="fixed top-0 z-20 w-screen h-8 bg-white"></div>
			{tags.includes('draft') === true && (
				<div
					style={{
						color: `rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6)`,
					}}
					className="absolute text-5xl top-8 right-2"
				>
					DRAFT
				</div>
			)}
			<Header color={palette} />

			{/* <img
				className="top-0 right-0 w-auto p-2 h-2/3 md:p-8"
				style={{ left: '20vw' }}
				src={`/images/${img}`}
				alt={altText}
			/> */}
			{/* <span
					style={{
						color: `rgba(${palette[0]},${palette[1]},${palette[2]}, .4)`,
					}}
					className="px-2 text-sm place-self-center"
				>
					{' '}
					{altText}
				</span> */}
			<Container>
				<article className="relative grid">
					<div className=" w-full place-self-center">
						<div className="max-w-lg mx-auto mb-10">
							<div className="mt-12"></div>
							<PostBody content={content} />
							<div className="pt-12" />
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

	if (docs.now !== null) {
		delete docs.now
	}

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
