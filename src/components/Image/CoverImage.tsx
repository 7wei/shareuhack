import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  alt,
  priority,
  href,
}: {
  title: string
  src: string
  slug?: string
  height: string | number
  width: string | number
  alt: string
  priority?: boolean
  href?: string
}) {
  const image = <Image src={src} alt={alt} layout="responsive" width={width} height={height} priority={priority} />
  return (
    <div>
      {slug || href ? (
        <Link as={href ?? `/posts/${slug}`} href={href ?? `/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
