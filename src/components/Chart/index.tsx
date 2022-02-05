import React, { useEffect, useState, useCallback } from 'react'
import { Typography, Box, styled, useTheme, Divider } from '@mui/material'
import { createChart, CrosshairMode, IChartApi, ISeriesApi, LineStyle, LineType, Time } from 'lightweight-charts'
import dayjs from 'dayjs'
import useBreakpoint from 'hooks/useBreakpoint'

export type LineSeriesData = Array<{
  time: Time
  value: number
  rate?: string
}>

const Chart = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '3px',
  position: 'relative',
  minHeight: '100%',
  [theme.breakpoints.down('md')]: {
    transform: 'translateX(-10px)',
  },
}))

const secondaryColor = '#F0B90B'

export default function LineChart({
  style,
  lineSeriesData,
  height,
  lineColor,
  unit,
  // unit2,
  id,
  width,
  strikeData,
}: {
  style?: React.CSSProperties
  lineSeriesData: LineSeriesData
  strikeData?: { time: Time; value: number }
  height?: number
  lineColor?: string
  unit: string
  // unit2?: string
  id: string
  width?: number
}) {
  const theme = useTheme()
  const [strikeLineLeft, setStrikeLineLeft] = useState<number | undefined>(undefined)
  const [strikeLineHeight, setStrikeLineHeight] = useState<number | undefined>(undefined)
  const [chart, setChart] = useState<IChartApi | undefined>(undefined)
  // const [priceLine, setPriceLine] = useState<ISeriesApi<'Line'> | undefined>(undefined)
  const [lineSeries, setLineSeries] = useState<ISeriesApi<'Line'> | undefined>(undefined)

  const isDownMd = useBreakpoint('md')

  const handleStrikeLine = useCallback(() => {
    if (!strikeData) {
      return
    }
    const widthEl: HTMLTableCellElement | null = document.querySelector(
      `#${id}-chart table tr:first-child td:first-child`
    )
    const rect = widthEl?.getBoundingClientRect()
    const width = rect?.width || 0
    const height = rect?.height || 0

    const left = chart?.timeScale()?.timeToCoordinate?.(strikeData.time)
    if (!left) return

    setStrikeLineLeft((left as number) + width)
    setStrikeLineHeight(height)
  }, [chart, id, strikeData])

  useEffect(() => {
    if (chart) return
    const chartElement = (document.getElementById(id + '-chart') as HTMLDivElement) ?? ''
    if (!chartElement) return
    const chartEl = createChart(chartElement, {
      width: width ? width : chartElement ? chartElement.offsetWidth : 556,
      height: height,
      layout: {
        backgroundColor: 'transparent',
        textColor: '#00000050',
        fontSize: 10,
        fontFamily: 'SF Pro, Roboto, san-serif',
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          style: LineStyle.Dotted,
          color: 'rgba(0, 0, 0, 0.2)',
        },
      },
    })
    chartEl.applyOptions({
      layout: {
        fontFamily: 'SF Pro',
      },
      leftPriceScale: { autoScale: true, visible: true, drawTicks: false, borderColor: 'rgba(0, 0, 0, 0.2)' },
      rightPriceScale: { visible: false },
      timeScale: {
        fixLeftEdge: true,
        rightOffset: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        timeVisible: true,
        secondsVisible: true,
        shiftVisibleRangeOnNewBar: true,
        tickMarkFormatter: (time: any) => {
          return dayjs(time).format('DD MMM, YYYY')
        },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
          color: '#00000010',
          width: 2,
          visible: true,
          labelVisible: false,
        },
        horzLine: {
          visible: true,
          labelVisible: true,
        },
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false,
      },
    })
    setChart(chartEl)

    const lineSeries = chartEl.addLineSeries({
      color: lineColor ?? theme.palette.primary.main,
      lineWidth: 1,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      lineType: LineType.Simple,
      crosshairMarkerBorderColor: '#ffffff',
      crosshairMarkerBackgroundColor: theme.palette.text.primary,
      priceFormat: {
        type: 'price',
        precision: 2,
      },
    })
    handleStrikeLine()
    setLineSeries(lineSeries)
  }, [chart, handleStrikeLine, height, id, lineColor, theme, width])

  useEffect(() => {
    const resizeFunction = () => {
      const chartEl = document.getElementById(id + '-chart')
      if (!chartEl || !chart) return
      const resizeWidth = isDownMd ? window.innerWidth - 120 : width ? width : chartEl.getBoundingClientRect().width
      chart.resize(resizeWidth, height || 174)
      chart.timeScale().fitContent()
    }
    window.addEventListener('resize', resizeFunction)

    return () => window.removeEventListener('resize', resizeFunction)
  }, [chart, height, id, width, handleStrikeLine, isDownMd])

  useEffect(() => {
    if (!chart || !strikeData) return
    chart.timeScale().subscribeVisibleTimeRangeChange(handleStrikeLine)
    return () => chart.timeScale().unsubscribeVisibleTimeRangeChange(handleStrikeLine)
  }, [chart, id, lineSeries, strikeData, handleStrikeLine])

  useEffect(() => {
    if (lineSeries) {
      lineSeries.setData(lineSeriesData)
    }
    if (chart) {
      chart.timeScale().fitContent()
    }
  }, [chart, handleStrikeLine, lineColor, lineSeries, lineSeriesData, strikeData, theme])

  // useEffect(() => {
  //   if (!chart || !strikeData) return
  //   if (!priceLine) {
  //     const pl = chart?.addLineSeries({
  //       lineType: LineType.Simple,
  //       lineStyle: LineStyle.Dashed,
  //       lineWidth: 1,
  //       color: secondaryColor,
  //       crosshairMarkerVisible: false,
  //     })
  //     setPriceLine(pl)
  //   }
  //   priceLine?.setData([strikeData])
  // }, [chart, handleStrikeLine, priceLine, strikeData])

  return (
    <>
      <Chart sx={{ ...style }} id={id + '-chart'}></Chart>
    </>
  )
}
