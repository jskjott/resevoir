import { ReactNode, FunctionComponent } from 'react'

type Props = {
	children?: ReactNode
}

const Container: FunctionComponent = ({ children }: Props) => {
	return (
		<div className="w-full grid">
			<div className="px-4 md:px-10 max-w-screen-xl">{children}</div>
		</div>
	)
}

export default Container
