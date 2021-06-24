import Layout from '../components/Layout'
import { getAllPages, markdownToHtml } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import Header from '../components/Header'
import Backlinks from '../components/Backlinks'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'

interface Page {
	docs: Record<string, PageWithLinks>
}

type Props = {
	tree: Page
}

const radicleStyle = {
	height: '25px',
}

export default function Doc({ docs }: Page) {
	function treeToHTML(tree: Record<string, PageWithLinks>) {
		const children = Object.values(tree)

		return children.map((page, index) => (
			<div className="pl-8" key={index}>
				<p>
					<a href={page.slug}>{page.title} </a>
					<span className=" pl-2 opacity-20">
						{' '}
						{page.dates[page.dates.length - 1]}
					</span>
				</p>
			</div>
		))
	}

	return (
		<Layout>
			<Header color={[0, 0, 0]} />
			<Container>
				<article className="mb-32 grid">
					<Head>
						<title>Index | Resevoir</title>
					</Head>
					<img
						className="w-1/2 w-full max-h-screen md:w-4/6"
						src={`/images/rotheredge.jpg`}
						alt="rotheredge"
					/>
					<div className="w-full md:w-4/6">
						<div className="mb-10">
							<p className="py-8 pb-4 pl-8 mb-4 border-b"></p>
							<div className="mb-6">{treeToHTML(docs)}</div>
						</div>
					</div>
				</article>
			</Container>
		</Layout>
	)
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticProps() {
	const docs = getAllPages()
	const docArray = Object.values(docs)

	// const mentioned: Record<string, number> = {}

	// const indexPage = docs.index
	// mentioned.index = 1

	// const tree: Page = {
	// 	info: indexPage,
	// 	tree: {},
	// }

	// function buildTree(stub: Page) {
	// 	stub.info.mentions.forEach((mention) => {
	// 		if (!(mention in mentioned) || mentioned[mention] < 1) {
	// 			const pageInfo = docs[mention]

	// 			if (pageInfo === undefined) {
	// 				throw new Error('internal')
	// 			}

	// 			stub.tree[mention] = {
	// 				info: pageInfo,
	// 				tree: {},
	// 			}

	// 			if (!(mention in mentioned)) {
	// 				mentioned[mention] = 0
	// 			} else {
	// 				mentioned[mention] = mentioned[mention] + 1
	// 			}
	// 		}
	// 	})

	// 	Object.values(stub.tree).forEach((child) => buildTree(child))
	// }

	// buildTree(tree)

	return {
		props: {
			docs,
		},
	}
}
