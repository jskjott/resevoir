import { FunctionComponent } from 'react'
import Link from 'next/link'

type Props = {
	backlinks: string[]
	dates: string[]
}

const Backlinks = ({ backlinks, dates }: Props) => {
	const array = [...new Set(backlinks)]

	return (
		<div>
			<span className="text-xs">
				edit dates:{' '}
				{dates.map((link, index) => (
					<span key={index}>{link} </span>
				))}
			</span>
			<p className="text-xs">
				backlinks:{' '}
				{array.map((link, index) => {
					if (index === 0) {
						return (
							<Link
								key={index}
								href={link === 'index' ? '/' : link}
							>
								<a>{link}</a>
							</Link>
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
			</p>
		</div>
	)
}

export default Backlinks
