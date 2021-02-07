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
			<div className="min-h-screen font-serif text-white bg-black">
				<main>{children}</main>
			</div>
			<Footer />
		</>
	)
}

export default Layout
