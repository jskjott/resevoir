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

const rssStyle = {
	height: '25px',
	margin: '0',
}

const radicleStyle = {
	filter: 'invert(1)',
	height: '25px',
}

const Footer = () => {
	return (
		<footer className="p-2">
			<Container>
				<div className="flex flex-row w-full h-8">
					<div className="flex h-8 pr-4 align-self-center md:place-self-auto place-self-center">
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
					<div className="pr-4 ">
						<p className="font-serif text-center md:text-right">
							2017 ~ 2021
						</p>
					</div>
					<div className="">
						<p className="font-serif text-center md:text-right">
							Jonathan Skjøtt
						</p>
					</div>
					<div className="absolute pr-2 right-2 md:place-self-center grid">
						<span className="flex py-4 md:py-0 place-self-center">
							<a href="/rss.xml">
								<img
									style={rssStyle}
									src="/images/rssIcon.png"
								></img>
							</a>
							<img
								style={radicleStyle}
								src="/images/radicle.png"
							></img>
						</span>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
