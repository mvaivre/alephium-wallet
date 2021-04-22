import { motion, MotionStyle, Variants } from 'framer-motion'
import React, { FC } from 'react'
import styled from 'styled-components'
import { FiArrowLeft } from 'react-icons/fi'

export const PageContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  height: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  shown: (apparitionDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      delay: apparitionDelay,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }),
  out: {
    opacity: 0,
    x: -20
  }
}

interface ContentProps {
  apparitionDelay?: number
  style?: MotionStyle
  className?: string
}

export const SectionContent: React.FC<ContentProps> = ({ children, apparitionDelay, style, className }) => {
  return (
    <StyledContent
      variants={contentVariants}
      initial="hidden"
      animate="shown"
      exit="out"
      custom={apparitionDelay}
      style={style}
      className={className}
    >
      {children}
    </StyledContent>
  )
}

export const StyledContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`

interface SectionTitleProps {
  color: 'primary' | 'contrast'
  onBackButtonPress?: () => void
}

export const FooterActions = styled(SectionContent)`
  flex: 0;
  margin-bottom: 5vh;
`

// ===========
// == Title ==
// ===========

export const PageTitle: FC<SectionTitleProps> = ({ color, children, onBackButtonPress }) => {
  return (
    <TitleContainer>
      {onBackButtonPress && <BackArrow onClick={onBackButtonPress} strokeWidth={3} />}
      <H1 color={color} layoutId="sectionTitle">
        {children}
      </H1>
    </TitleContainer>
  )
}

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
`

const BackArrow = styled(FiArrowLeft)`
  height: 47px;
  width: 20px;
  margin-right: 20px;
  cursor: pointer;
`

const H1 = styled(motion.h1)<{ color: string }>`
  flex: 1;
  margin-top: 0;
  color: ${({ theme, color }) => (color === 'primary' ? theme.font.primary : theme.font.contrast)};
`
