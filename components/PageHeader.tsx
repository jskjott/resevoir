type Props = {
	title: string
}

const PostHeader = ({ title }: Props) => {
	return (
		<>
			<h1 className="max-w-md mx-auto mb-12 text-2xl font-bold leading-tight tracking-tighter text-center md:text-2xl lg:text-2xl md:leading-none md:text-left">
				{title}
			</h1>
			<div className="max-w-2xl mx-auto"></div>
		</>
	)
}

export default PostHeader
