'use client'

import React from 'react'

import { ERROR_MESSAGE_MAP } from '../constants/message'

const useSafeContext = <T>(ctx: React.Context<T>) => {
  const context = React.useContext(ctx)

  if (context === null) {
    throw new Error(`${ctx.displayName}${ERROR_MESSAGE_MAP['context']}`)
  }

  return context
}

export default useSafeContext
