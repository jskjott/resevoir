import Container from './Container'

const footerStyle = {
	height: '30px',
	filter: 'invert(1)',
	margin: '0',
}

const githubStyle = {
	height: '30px',
	margin: '0',
}

const radicleStyle = {
	filter: 'invert(1)',
	height: '25px',
}

const Footer = () => {
	return (
		<footer className="bg-white opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out">
			<Container>
				<div className="w-full h-8 md:grid-cols-3 max-w-screen-xl grid">
					<div className="flex align-self-center md:place-self-auto place-self-center">
						<a href="https://webring.recurse.com">
							<img
								style={githubStyle}
								src="https://webring.recurse.com/icon.png"
								alt="RC Webring Logo"
							/>
						</a>
						<a href="https://webring.xxiivv.com/#random">
							<img
								style={footerStyle}
								src="https://webring.xxiivv.com/icon.white.svg"
							/>
						</a>
						<a href="https://github.com/jskjott">
							<img
								className="float-right"
								style={githubStyle}
								src="images/github.png"
								alt="Github Logo"
							/>
						</a>
						<a href="https://twitter.com/jskjott">
							<img
								style={footerStyle}
								src="images/Twitter_Logo.png"
								alt="Twitter Logo"
							/>
						</a>
					</div>
					<div className="md:place-self-center grid">
						<span className="py-4 md:py-0 place-self-center">
							<img
								style={radicleStyle}
								src="/images/radicle.png"
							></img>
						</span>
					</div>
					<div className="">
						<p className="font-serif text-center md:text-right">
							2017 ~ 2021 Jonathan Skjøtt
						</p>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
