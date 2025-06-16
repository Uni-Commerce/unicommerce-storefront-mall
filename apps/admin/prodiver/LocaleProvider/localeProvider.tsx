import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import type { PropsWithChildren } from 'react'

import { useCookie } from '@unicommerce/hooks'

const LocaleProvider = ({ children, ...props }: PropsWithChildren) => {
  const { cookie } = useCookie()
  const [locale, setLocale] = useState<string>('')
  const [messages, setMessages] = useState<any>(null)

  const onIntlError = (error: any) => {
    if (messages) {
      const errorCode: any = error.code
      if (errorCode === 'MISSING_TRANSLATION') {
        const Console = console
        Console.warn('Missing translation', error.message)
        return
      }

      throw error
    }
  }

  useEffect(() => {
    const fetchLocale = async () => {
      try {
        const cache: string = cookie.getItem('locale_code')
        const key: string = cache || 'zh-CN'
        const json: string = key.replace(/-/, '_')
        // Fetch i18n locale
        const result = await fetch(`${window.location.origin}/assets/i18n/${json}.json`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          method: 'GET',
          mode: 'cors'
        })

        const data = await result.json()
        if (!cache) cookie.setItem('locale_code', key)
        setLocale(key)
        setMessages({ ...data })
      } catch (error: any) {
        const Console = console
        Console.error(error.message)
      }
    }

    fetchLocale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IntlProvider
      key={locale}
      defaultLocale={locale}
      locale={locale}
      messages={messages}
      {...props}
      onError={onIntlError}
    >
      {messages && children}
    </IntlProvider>
  )
}

export default LocaleProvider
