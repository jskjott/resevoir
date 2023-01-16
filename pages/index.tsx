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
	draftNumber: number
	palette: [number, number, number]
}

const currentYear = 0

export default function Doc({
	docArray,
	manifestationsArray,
	index,
	draftNumber,
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
						<span className="invisible w-0 md:w-auto md:visible">
							Jonathan Skjøtt‘s momentum archive —
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
								<div className="mx-auto mb-10 ">
									<div className="mt-12"></div>
									<div className="max-w-xl pb-8 font-sans text-3xl font-bold pl-28">
										<a
											className="text-3xl underline "
											href="./about"
										>
											Jonathan Skjøtt
										</a>{' '}
										is developing digital{' '}
										<a
											className="text-3xl underline "
											href="./games"
										>
											games
										</a>
										, writing conceptual{' '}
										<a
											className="text-3xl underline "
											href="./writing"
										>
											pieces
										</a>
										, and developing situated{' '}
										<a
											className="text-3xl underline "
											href="./crafts"
										>
											crafts
										</a>
										.
									</div>
									<div
										className="grid"
										style={{
											gridTemplateColumns:
												'repeat(auto-fill, minmax(200px, 1fr)',
										}}
									>
										<div className="flex w-full border-b-2 border-white">
											<a
												style={{
													width: '200px',
												}}
												href={`/now`}
												className="self-end h-9"
											>
												<div className="flex w-full h-full p-2 pb-1 bg-white hover:bg-black">
													<div className="relative self-end font-sans text-sm ">
														{draftNumber} momentums
														now
													</div>
												</div>
											</a>
										</div>
										{manifestationsArray.map(
											(page, index) => [
												index > 0 &&
												page.dates[0].slice(6) !==
													manifestationsArray[
														index - 1
													].dates[0].slice(6) ? (
													<div className="flex w-full border-b-2 border-white">
														<div
															className="flex self-end my-0"
															style={{
																color: `dimgray`,
																width: '200px',
															}}
														>
															<span className="self-end w-full pb-1 pl-1 font-serif text-5xl font-light bg-white leading-8">
																{page.dates[0].slice(
																	6,
																)}
															</span>
														</div>
													</div>
												) : null,

												<div
													key={index}
													className="flex w-full border-white"
													style={{
														borderBottom: `${
															manifestationsArray.length -
																1 >
																index &&
															page.dates[0].slice(
																6,
															) ===
																manifestationsArray[
																	index + 1
																].dates[0].slice(
																	6,
																)
																? 'solid white'
																: ''
														}`,
													}}
												>
													<a
														style={{
															width: '200px',
															borderBottom: `${
																manifestationsArray.length -
																	1 >
																	index &&
																page.dates[0].slice(
																	6,
																) ===
																	manifestationsArray[
																		index +
																			1
																	].dates[0].slice(
																		6,
																	)
																	? ''
																	: 'solid white'
															}`,
														}}
														href={`/${page.slug}`}
														className="relative self-end border-white group grid"
													>
														<div className="relative flex h-16 p-2 pb-0">
															<div className="relative z-10 self-end pt-2 pb-1 font-sans text-sm leading-4">
																{page.title}{' '}
															</div>
															<span className="absolute px-1 text-3xl text-white opacity-0 left-1 -top-1 group-hover:opacity-100 serif">
																{page.tags.map(
																	(tag) =>
																		tag,
																)}
															</span>
														</div>
													</a>
												</div>,
											],
										)}
									</div>
								</div>
								<div className="mx-auto mb-10 ">
									<div className="mt-12"></div>
									<div
										className="mx-4 grid"
										style={{
											gridTemplateColumns:
												'repeat(auto-fill, minmax(200px, 1fr)',
										}}
									>
										{manifestationsArray.map(
											(page, index) => (
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
																{page.tags.map(
																	(tag) =>
																		tag,
																)}
															</span>
														</div>
														<div className="text-xs">
															{page.dates[0].slice(
																6,
															)}
														</div>
													</div>
												</a>
											),
										)}
									</div>
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
	let draftNumber = 0
	const docArray = Object.values(docs)
	const manifestationsArray = docArray.filter((doc) => {
		let manifestation = false

		doc.tags.forEach((tag) => {
			if (tag === 'project' || tag === 'essay') {
				manifestation = true
			}
			if (tag.includes('draft')) {
				manifestation = false
				draftNumber++
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

	const palette = await Vibrant.from(`./public/images/solaris.png`)
		.getPalette()
		.then((palette) => palette)

	return {
		props: {
			docArray,
			manifestationsArray,
			index,
			about,
			now,
			draftNumber,
			palette: palette.DarkVibrant?.rgb,
		},
	}
}
