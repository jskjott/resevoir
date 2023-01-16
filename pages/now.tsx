import Layout from '../components/Layout'
import { getAllPages, getPageBySlug, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import PostBody from '../components/PostBody'
import Header from '../components/Header'
import Link from 'next/link'
import Head from 'next/head'
import Vibrant from 'node-vibrant'

interface ExtendedPageWithLinks extends PageWithLinks {
	manifestationsArray: PageWithLinks[]
}

export default function Doc({
	title,
	img,
	altText,
	tags,
	dates,
	content,
	mentionedIn,
	manifestationsArray,
	palette,
}: ExtendedPageWithLinks) {
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
				<div className="flex h-8 px-1 text-white my-0.5 md:h-8 md:flex-row">
					<span className="invisible w-0 md:w-auto md:visible">
						Jona Skjøtt‘s momentum archive —
					</span>
					<Link href="welcome">
						<a className="pl-1">Welcome</a>
					</Link>
					<span>,</span>
					<Link href="resevoir">
						<a className="pl-2">Info</a>
					</Link>
					<span>,</span>
					<Link href="now">
						<a className="pl-2">Now</a>
					</Link>
					<span>,</span>
					<Link href="projects">
						<a className="pl-2">Projects</a>
					</Link>
					<span>,</span>
					<Link href="writing">
						<a className="pl-2">Writing</a>
					</Link>
				</div>
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
						</div>
					</div>
					<div
						className="mx-4 grid"
						style={{
							gridTemplateColumns:
								'repeat(auto-fill, minmax(200px, 1fr)',
						}}
					>
						{manifestationsArray.map((page, index) => (
							<a
								style={{
									width: '200px',
									height: '200px',
								}}
								href={`/${page.slug}`}
								className="relative p-2 mb-8 grid"
								key={index}
							>
								<img
									className=" rounded-sm"
									src={`thumbnails/${page.img}`}
									alt={page.altText}
								/>
								<div className="absolute bottom-0 p-2">
									<div className="relative py-2 font-sans text-sm">
										{page.title}{' '}
										<span
											className="absolute px-1 text-white rounded text-tiny"
											style={{
												background: `rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6)`,
											}}
										>
											ongoing
										</span>
									</div>
									<div className="text-xs">
										{page.dates[0].slice(6)}
									</div>
								</div>
							</a>
						))}
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
	const docArray = Object.values(docs)
	const manifestationsArray = docArray.filter((doc) => {
		let manifestation = false

		doc.tags.forEach((tag) => {
			if (tag === 'draft') {
				manifestation = true
			}
		})

		if (manifestation) {
			return true
		} else {
			return false
		}
	})

	manifestationsArray.sort((firstEl, secondEl) => {
		const firstDate = new Date(
			`${firstEl.dates[0].slice(6)}-${firstEl.dates[0].slice(
				3,
				5,
			)}-${firstEl.dates[0].slice(0, 2)}`,
		)
		const secondDate = new Date(
			`${secondEl.dates[0].slice(6)}-${secondEl.dates[0].slice(
				3,
				5,
			)}-${secondEl.dates[0].slice(0, 2)}`,
		)

		return secondDate.getTime() - firstDate.getTime()
	})

	const doc = getPageBySlug('now.txt')

	if (doc === undefined) {
		throw Error('internal')
	}

	const nowPage = doc
	let contentString = `# ${nowPage.title}
	${nowPage.content}`
	let titleString = nowPage.title

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
	const palette = await Vibrant.from(`./public/images/${nowPage.img}`)
		.getPalette()
		.then((palette) => palette)

	return {
		props: {
			...nowPage,
			manifestationsArray,
			palette: palette.DarkVibrant?.rgb,
			title,
			content,
		},
	}
}

// eslint-disable-next-line @typescript-eslint/require-await
