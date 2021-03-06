import { blue } from 'chalk'
import React from 'react'
import { TextEditor } from '../Notes/components/CKeditor'
import { NoteSelector } from '../Notes/components/NoteSelector'
import styled from '@emotion/styled'
import { Flex, Grid } from 'lese'

export const Notes = () => {
  return (
    <Grid columns="1fr 240px">
      <TextEditor />
      <NoteSelector />
    </Grid>
  )
}
