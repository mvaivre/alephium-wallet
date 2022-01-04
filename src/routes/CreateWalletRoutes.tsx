/*
Copyright 2018 - 2021 The Alephium Authors
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

import { walletGenerate } from 'alephium-js'
import { FC, useEffect } from 'react'

import AppHeader from '../components/AppHeader'
import FloatingLogo from '../components/FloatingLogo'
import { StepsContextProvider } from '../contexts/steps'
import { useWalletContext, WalletContextProvider } from '../contexts/wallet'
import CheckWordsIntroPage from '../pages/WalletManagement/CheckWordsIntroPage'
import CheckWordsPage from '../pages/WalletManagement/CheckWordsPage'
import CreateAccountPage from '../pages/WalletManagement/CreateAccountPage'
import WalletWelcomePage from '../pages/WalletManagement/WalletWelcomePage'
import WalletWordsPage from '../pages/WalletManagement/WalletWordsPage'

const CreateWalletRoutes = () => {
  const createWalletSteps: JSX.Element[] = [
    <CreateAccountPage key="create-account" />,
    <WalletWordsPage key="wallet-words" />,
    <CheckWordsIntroPage key="check-words-intro" />,
    <CheckWordsPage key="check-words" />,
    <WalletWelcomePage key="welcome" />
  ]

  return (
    <WalletContextProvider>
      <CreateWallet stepElements={createWalletSteps} baseUrl="create" />
    </WalletContextProvider>
  )
}

const CreateWallet: FC<{ stepElements: JSX.Element[]; baseUrl: string }> = ({ stepElements, baseUrl }) => {
  const { setPlainWallet, setMnemonic } = useWalletContext()

  // Init wallet
  useEffect(() => {
    const wallet = walletGenerate()
    setPlainWallet(wallet)
    setMnemonic(wallet.mnemonic)
  }, [setMnemonic, setPlainWallet])

  return (
    <>
      <AppHeader />
      <FloatingLogo />
      <StepsContextProvider stepElements={stepElements} baseUrl={baseUrl} />
    </>
  )
}

export default CreateWalletRoutes