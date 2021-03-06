const COOKIE_NAME = '__uid'
function handleRequest(request: Request): Response {
  const cookie = getCookie(request, COOKIE_NAME)
  if (cookie) {
    // respond with the cookie value
    return new Response(cookie)
  }
  return new Response('No cookie with name: ' + COOKIE_NAME)
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Grabs the cookie with name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to grab
 */
function getCookie(request: Request, name: string): string {
  let result = ''
  const cookieString = request.headers.get('Cookie')
  if (cookieString) {
    const cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim()
      if (cookieName === name) {
        const cookieVal = cookie.split('=')[1]
        result = cookieVal
      }
    })
  }
  return result
}

export {}
