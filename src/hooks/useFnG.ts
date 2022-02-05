import { useEffect, useState } from 'react'
import { fngFormatter, formatedFngProps } from 'utils/fetch/fng'

export function useFnG() {
  const [FnG, setFnG] = useState<formatedFngProps[]>([])

  useEffect(() => {
    fetch(`https://api.alternative.me/fng/`, {
      method: 'GET',
      mode: 'cors',
      headers: {},
    })
      .then((r) => {
        return r.clone().json()
      })
      .then((json) => {
        const formatted = fngFormatter(json)
        console.log(formatted)

        setFnG(formatted)
      })
      .catch((e) => console.error(e))
  }, [])

  return FnG
}
