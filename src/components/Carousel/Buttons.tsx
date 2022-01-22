import React from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import IconButton from '@mui/material/IconButton'

export const PrevButton = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
  <IconButton onClick={onClick} disabled={!enabled}>
    <ArrowCircleLeftIcon />
  </IconButton>
)

export const NextButton = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
  <IconButton onClick={onClick} disabled={!enabled}>
    <ArrowCircleRightIcon />
  </IconButton>
)
