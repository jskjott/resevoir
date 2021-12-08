import Container from './Container'

const gridStyle = {
	'gridTemplateColumns': '30px 30px 30px 30px 1fr 210px',
}

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
				<div
					style={gridStyle}
					className="w-full py-6 max-w-screen-xl grid"
				>
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
					<div className="place-self-center grid">
						<span className="place-self-center">
							<img
								style={radicleStyle}
								src="/images/radicle.png"
							></img>
						</span>
					</div>
					<div>
						<p className="self-center float-right font-serif w-max">
							2017 ~ 2021 Jonathan Skjøtt
						</p>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
