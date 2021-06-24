import Image from 'next/image'

type Props = {
	content: string
}

const PostBody = ({ content }: Props) => {
	return (
		<div className="max-w-lg mx-auto">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	)
}

export default PostBody
