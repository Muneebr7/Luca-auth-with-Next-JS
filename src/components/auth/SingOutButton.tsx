'use client'

import React from 'react'
import { Button } from '../ui/button'
import { logOutAction } from '@/_actions/auth/auth.action'

type Props = {
    children : React.ReactNode
}

function SingOutButton({children}: Props) {
  return (
   <Button onClick={ () => logOutAction() }>{children}</Button>
  )
}

export default SingOutButton