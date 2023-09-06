//test regex

export function buildRoutePath(path ) {

  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')
  //console.log(pathWithParams)
  const pathRegex = new RegExp(`^${pathWithParams}`)
  return pathRegex
}