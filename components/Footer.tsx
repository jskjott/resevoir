import Container from './Container'

const gridStyle = {
	'gridTemplateColumns': '30px 30px 30px 30px 1fr 210px',
}

const footerStyle = {
	'height': '30px',
}

const githubStyle = {
	'height': '30px',
	'filter': 'invert(1)',
}

const Footer = () => {
	return (
		<footer style={footerStyle} className="bg-black border-t">
			<Container>
				<div style={gridStyle} className="max-w-md py-1 mx-auto grid">
					<a href="https://webring.recurse.com">
						<img
							style={footerStyle}
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
					<span></span>
					<p className="font-serif text-white">
						2017 ~ 2021 Jonathan Skjøtt
					</p>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
