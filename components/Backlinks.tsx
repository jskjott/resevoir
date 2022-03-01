import Link from 'next/link'

type Props = {
	backlinks: string[]
	dates: string[]
	image: string
}

const Backlinks = ({ backlinks, image, dates }: Props) => {
	const array = [...new Set(backlinks)]

	return (
		<div className="flex px-1 text-white my-0.5 md:h-8 md:flex-row">
			<div className="w-full align-middle">
				<span>backlinks: </span>
				{array.map((link, index) => {
					if (index === 0) {
						return (
							<span className="h-8">
								<Link
									key={index}
									href={link === 'index' ? '/' : link}
								>
									<a>{link}</a>
								</Link>
							</span>
						)
					} else {
						return (
							<span>
								{' '}
								|{' '}
								<Link key={index} href={link}>
									<a>{link}</a>
								</Link>
							</span>
						)
					}
				})}
			</div>
			<div className="flex justify-end">
				<span className=" w-28">
					{' '}
					{dates.map((link, index) => (
						<span key={index}>{link} </span>
					))}
				</span>

				<a className="pr-2" href={`/images/${image}`}>
					image
				</a>
			</div>
		</div>
	)
}

export default Backlinks
