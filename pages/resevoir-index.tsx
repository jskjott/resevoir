import Layout from '../components/Layout'
import { getAllPages } from '../api/functions'
import { PageWithLinks } from '../api/generateBacklinks'
import Container from '../components/Container'
import Header from '../components/Header'
import Head from 'next/head'

interface Page {
	docs: Record<string, PageWithLinks>
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
						<style
							dangerouslySetInnerHTML={{
								__html: `
						a:hover {
							color:white;
							background: rgba(${255},${255},${255}, .6);
						};
						`,
							}}
						/>
					</Head>
					<img
						className="w-full max-h-screen md:w-4/6"
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

	return {
		props: {
			docs,
		},
	}
}
