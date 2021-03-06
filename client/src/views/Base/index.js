import colors from '@colors'
import styled from '@emotion/styled'
import { Grid } from 'lese'
import { Header } from './components/Header'
import { TopLeft } from './components/TopLeft'
import { Sidebar } from './components/Sidebar'

const GridStyled = styled(Grid)`
  background-color: ${colors.backgrounds[500]};
  width: 100vw;
  height: 100vh;
`

export const Base = ({ children, ...props }) => {
  return (
    <GridStyled rows="56px 1fr" columns="240px 1fr" align="stretch" {...props}>
      <TopLeft />
      <Header />
      <Sidebar />
      {children}
    </GridStyled>
  )
}
