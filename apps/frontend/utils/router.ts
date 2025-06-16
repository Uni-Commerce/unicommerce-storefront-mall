import Router from 'next/router'

export const redirectTo = (
  destination: string,
  { res, status }: { res?: any; status?: number } = {}
) => {
  if (res) {
    res.writeHead(status || 302, { Location: destination })
    res.end()
  } else {
    Router.push(destination)
  }
}
