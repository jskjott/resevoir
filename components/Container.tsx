import { ReactNode, FunctionComponent } from 'react'

type Props = {
	children?: ReactNode
}

const Container: FunctionComponent = ({ children }: Props) => {
	return (
		<div className="w-full grid">
			<div className="max-w-screen-xl grid">{children}</div>
		</div>
	)
}

export default Container
