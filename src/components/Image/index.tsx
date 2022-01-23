import { useState } from 'react'
import NextImage from 'next/image'

interface Props {
  src: string
  fallbackSrc?: string
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
  width?: string | number
  height?: string | number
  title?: string
  alt?: string
  priority?: boolean
}

const FallbackImg = '/assets/brand/shareuhack.png'

export default function Image(props: Props) {
  const { src, fallbackSrc = FallbackImg, layout, width, height, title, alt, priority } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <NextImage
      title={title}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      placeholder="blur"
      blurDataURL={src}
      width={width}
      height={height}
      layout={layout}
      priority={priority}
    />
  )
}
