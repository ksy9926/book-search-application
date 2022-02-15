import styled from 'styled-components'
import COLOR_PALETTE from 'styles/colors'
import { APP_TITLE } from 'constants/constants'

const Header = () => {
  return (
    <HeaderWrap>
      <HeaderInnerWrap>
        <Title>{APP_TITLE}</Title>
      </HeaderInnerWrap>
    </HeaderWrap>
  )
}

export default Header

/* ****************************************************************
  Header

[Header Component Size]
- Header Width : 100%
- Header Inner Width : 1130px
- Header Height : 80px
*******************************************************************/

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  background: ${COLOR_PALETTE.BLUE500};
`

const HeaderInnerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1130px;
  height: 80px;
`

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${COLOR_PALETTE.GRAY900};
`
