export const BACKEND_URL = 'http://localhost:7252/api'

export const processQuery = (query: string | string[] | undefined) => {
    if (typeof query === 'string') {
        return query
    }
    if (Array.isArray(query) && query.length > 0) {
        return query[0]
    }
    return ''
}
