import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
}: {
  title: string
  src: string
  slug?: string
  height: string | number
  width: string | number
}) {
  const image = <Image src={src} alt={`Cover Image for ${title}`} layout="responsive" width={width} height={height} />
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
