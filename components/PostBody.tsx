type Props = {
	content: string
}

const PostBody = ({ content }: Props) => {
	return (
		<div className="max-w-lg px-2 mx-auto md:px-0">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	)
}

export default PostBody
