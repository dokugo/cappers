// this module in obsolete now since i started to use useEffect at the App component again

import { EffectCallback, useEffect } from 'react'

const useEffectOnce = (effect: EffectCallback): void => useEffect(effect, [])

const useDidMount = (fn: () => void): void => {
  useEffectOnce(() => {
    fn()
  })
}

export default useDidMount
