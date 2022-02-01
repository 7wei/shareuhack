import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Box } from '@mui/material'
import Image from 'components/Image'
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import IconButton from '@mui/material/IconButton'

interface Props {
  urls: string[]
  size: string | number
}

export default function Carousel(props: Props) {
  const { urls, size } = props

  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  // const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <Box className="embla" sx={{ overflow: 'hidden' }} width={size} height={size}>
      <Box className="embla__viewport" ref={viewportRef} sx={{ position: 'relative' }} width={size} height={size}>
        <Box className="embla__container" display="flex" width={size} height={size}>
          {urls &&
            urls.length > 0 &&
            urls.map((url, idx) => {
              return (
                <Box
                  key={idx}
                  className="embla__slide"
                  sx={{
                    position: 'relative',
                    flex: '0 0 100%',
                  }}
                >
                  <Image src={url} layout="fill" />
                </Box>
              )
            })}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '12px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
          ))}
        </Box>
      </Box>
      {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
    </Box>
  )
}

// const PrevButton = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
//   <IconButton onClick={onClick} disabled={!enabled}>
//     <ArrowCircleLeftIcon />
//   </IconButton>
// )

// const NextButton = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
//   <IconButton onClick={onClick} disabled={!enabled}>
//     <ArrowCircleRightIcon />
//   </IconButton>
// )

export const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <Box width={6} height={6} borderRadius="50%" sx={{ background: selected ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }} />
  </IconButton>
)
