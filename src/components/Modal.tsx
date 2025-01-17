/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FC } from 'react'
import styled from 'styled-components'

import { ModalContextProvider, useModalContext } from '../contexts/modal'
import Button from './Button'
import { Section } from './PageComponents/PageContainers'
import PanelTitle, { TitleContainer } from './PageComponents/PanelTitle'
import Spinner from './Spinner'

interface ModalProps {
  title: string
  subtitle?: string
  onClose: () => void
  focusMode?: boolean
  isLoading?: boolean
}

export const Modal: FC<ModalProps> = ({ children, title, subtitle, onClose, focusMode, isLoading }) => (
  <ModalContextProvider title={title} subtitle={subtitle} onClose={onClose}>
    <ModalContents focusMode={focusMode} isLoading={isLoading}>
      {children}
    </ModalContents>
  </ModalContextProvider>
)

const ModalContents: FC<{ focusMode?: boolean; isLoading?: boolean }> = ({ children, focusMode, isLoading }) => {
  const { modalTitle, modalSubtitle, onModalClose } = useModalContext()

  return (
    <ModalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <StyledModal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ModalHeader>
          <PanelTitle smaller useLayoutId={false}>
            {modalTitle}
            {modalSubtitle && <ModalSubtitle>{modalSubtitle}</ModalSubtitle>}
          </PanelTitle>
          <CloseButton squared transparent onClick={onModalClose}>
            <X />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        {isLoading && (
          <>
            <ModalBackdrop />
            <ModalLoadingSpinner>
              <Spinner />
            </ModalLoadingSpinner>
          </>
        )}
      </StyledModal>
      <ModalBackdrop onClick={onModalClose} focusMode={focusMode} />
    </ModalContainer>
  )
}

export const HeaderContent = styled(Section)`
  flex: 0;
  margin-bottom: var(--spacing-4);
`

export const HeaderLogo = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  padding: var(--spacing-4);
  z-index: 1000;
`

const ModalBackdrop = styled.div<{ focusMode?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, focusMode }) =>
    theme.name === 'light'
      ? focusMode
        ? 'rgba(0, 0, 0, 0.8)'
        : 'rgba(0, 0, 0, 0.15)'
      : focusMode
      ? 'rgba(0, 0, 0, 0.9)'
      : 'rgba(0, 0, 0, 0.6)'};
`

const StyledModal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  max-width: 600px;
  max-height: 95vh;
  box-shadow: 0 30px 30px var(--color-shadow-15);
  border-radius: var(--radius);
  background-color: ${({ theme }) => theme.bg.primary};
  z-index: 1;
  position: relative;

  ${TitleContainer} {
    flex: 1;
    margin: var(--spacing-3) var(--spacing-4) var(--spacing-3) var(--spacing-4);
  }
`

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-3);
`

const CloseButton = styled(Button)`
  color: ${({ theme }) => theme.font.primary};
  margin-right: var(--spacing-2);
`

const ModalContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 var(--spacing-4) var(--spacing-4) var(--spacing-4);
`

export const ModalFooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding: var(--spacing-3) var(--spacing-3) 0;
`

export const ModalFooterButton = ({ ...props }) => (
  <ModalFooterButtonStyled short {...props}>
    {props.children}
  </ModalFooterButtonStyled>
)

const ModalFooterButtonStyled = styled(Button)`
  min-width: 111px;
  height: 30px;
`

const ModalSubtitle = styled.div`
  color: ${({ theme }) => theme.font.secondary};
  font-size: 14px;
  margin-top: var(--spacing-1);
`

const ModalLoadingSpinner = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export default Modal
