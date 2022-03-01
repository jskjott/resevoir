import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import Header from '../components/Header'
import PostBody from '../components/PostBody'
import Head from 'next/head'
import { generateRss } from '../api/rss'
import Link from 'next/link'
import fs from 'fs'
import Vibrant from 'node-vibrant'

type Props = {
	docArray: PageWithLinks[]
	manifestationsArray: PageWithLinks[]
	index: PageWithLinks
	about: string
	now: string
	palette: [number, number, number]
}

export default function Doc({
	docArray,
	manifestationsArray,
	index,
	now,
	about,
	palette,
}: Props) {
	return (
		<Layout>
			<Container>
				<div
					className="fixed top-0 z-30 w-screen h-8"
					style={{
						background: `rgba(${palette[0]},${palette[1]},${palette[2]}, 0.6)`,
					}}
				>
					<div className="flex h-8 px-1 text-white my-0.5 md:h-8 md:flex-row">
						<span className="invisible md:visible">
							{' '}
							Jona Skjøtt‘s momentum archive —
						</span>
						<Link href="welcome">
							<a className="pl-1">Welcome</a>
						</Link>
						<span>,</span>
						<Link href="resevoir">
							<a className="pl-1">Info</a>
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
				<Header color={palette} />
				<article
					className="w-full"
					style={{
						background: `rgba(${palette[0]},${palette[1]},${palette[2]}, 0.2)`,
					}}
				>
					<Head>
						<title>Index | Resevoir</title>
						<style
							dangerouslySetInnerHTML={{
								__html: `
						h1 {
							color: rgba(${palette[0]},${palette[1]},${palette[2]}, 1);
							text-decoration: underline 15px rgb(${palette[0]},${palette[1]},${palette[2]});
							padding-top: 0rem;
							padding-bottom: 1rem; 
						}

						a:hover {
							color:white;
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, .6);
						};

						html {
							background: rgba(${palette[0]},${palette[1]},${palette[2]}, .2);
						}
						`,
							}}
						/>
					</Head>

					<Container>
						<article className="relative grid">
							<div className=" w-full place-self-center">
								<div className="mt-32 mb-10 md:mt-0 md:ml-28">
									<div className="mt-12"></div>

									<div
										className=""
										// style={{
										// 	gridTemplateColumns:
										// 		'repeat(5, 200px)',
										// }}
									>
										{manifestationsArray.map(
											(page, index) => (
												<a
													style={{ height: '100px' }}
													href={`/${page.slug}`}
													className=" flex p-2 mb-8"
													key={index}
												>
													<div className=" bottom-0 p-2">
														<div className="py-2 font-sans text-3xl">
															{page.title}{' '}
														</div>
														<div className="text-xs">
															{page.dates[0].slice(
																6,
															)}
														</div>
													</div>
													<img
														className=" rounded-sm"
														src={`images/thumbnails/${page.img}`}
														alt={page.altText}
													/>
												</a>
											),
										)}
									</div>

									{/* <div className="pt-12" />
									<p className="pb-8 md:py-8">
										Sprouts growing throuhgout the site:
									</p>

									<svg
										className="w-md"
										height={`${
											(1 + docArray.length / 10) * 30
										}px`}
										xmlns="http://www.w3.org/2000/svg"
									>
										{docArray.map((page, index) => (
											<a href={page.slug} key={index}>
												<rect
													x={`${30 * (index % 10)}px`}
													y={`${
														30 *
														Math.floor(index / 10)
													}px`}
													width="22px"
													height="22px"
													fill="#90A252"
													strokeWidth="0.25px"
												/>
											</a>
										))}
									</svg> */}
								</div>
							</div>
						</article>
					</Container>
				</article>
			</Container>
		</Layout>
	)
}

export async function getStaticProps() {
	const docs = getAllPages()
	const docArray = Object.values(docs)
	const manifestationsArray = docArray.filter((doc) => {
		let manifestation = false

		doc.tags.forEach((tag) => {
			if (tag === 'essay') {
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

	const nowPage = docs.now
	let now = nowPage.content
	now = await markdownToHtml(now)

	const aboutPage = docs.jonathan
	let about = aboutPage.content
	const aboutLinks = [...about.matchAll(/\[\[(.*?)\]\]/g)]
	aboutLinks.forEach((match) => {
		about = about.replace(match[0], `[{${match[1]}}](${match[1]})`)
	})
	about = await markdownToHtml(about)

	const indexPage = docs.index
	let contentString = indexPage.content

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

	const palette = await Vibrant.from(`./public/images/veins_I.png`)
		.getPalette()
		.then((palette) => palette)

	return {
		props: {
			docArray,
			manifestationsArray,
			index,
			about,
			now,
			palette: palette.DarkVibrant?.rgb,
		},
	}
}
