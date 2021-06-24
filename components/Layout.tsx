import Footer from './Footer'
import Meta from './Meta'

type Props = {
	preview?: boolean
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<div className="min-h-screen py-10 pt-6 font-serif">
				<main className="">{children}</main>
			</div>
			<Footer />
		</>
	)
}

export default Layout
