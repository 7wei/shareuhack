import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  alt,
}: {
  title: string
  src: string
  slug?: string
  height: string | number
  width: string | number
  alt: string
}) {
  const image = <Image src={src} alt={alt} layout="responsive" width={width} height={height} priority />
  return (
    <div>
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
