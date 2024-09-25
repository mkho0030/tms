import { Chip } from '@mui/material'
import React from 'react'

const ProgressStatus = ({status}: {status: number}) => {
  return (
    <>
      {status == 0 && <Chip label="Not Started"></Chip>}
      {status == 1 && <Chip label="In Progress" color="warning"></Chip>}
      {status == 2 && <Chip label="Completed" color="success"></Chip>}
    </>  
)
}

export default ProgressStatus