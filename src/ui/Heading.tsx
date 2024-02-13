import styled, { css } from 'styled-components'

interface HeadingProps {
	type?: 'h1' | 'h2' | 'h3' | 'h4'
}

const test = css`
	text-align: center;
`

const Heading = styled.h1<HeadingProps>`
	${props =>
		props.type === 'h1' &&
		`
    font-size: 3rem;
    font-weight: 600;
  `}
	${props =>
		props.type === 'h2' &&
		`
    font-size: 2rem;
    font-weight: 600;
  `}
  ${props =>
		props.type === 'h3' &&
		`
    font-size: 2rem;
    font-weight: 500;
  `}
  ${props =>
		props.type === 'h4' &&
		`
    font-size: 3rem;
    text-align: center;
    font-weight: 600;
  `}
  line-height: 1.4;
	${test}
`

export default Heading
