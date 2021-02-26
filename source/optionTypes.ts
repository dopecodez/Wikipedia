export interface searchOptions {
    limit?: number
    suggestion?: boolean
}

export interface pageOptions {
    autoSuggest?: boolean
    redirect?: boolean
    preload?: boolean
    fields?: Array<pageFunctions>
}

export interface listOptions {
    autoSuggest?: boolean
    redirect?: boolean
    limit?: number
}

export interface geoOptions {
    limit?: number
    radius?: number
}

export type pageFunctions =
    'summary' | 'images' | 'intro' | 'html' | 'content' | 'categories' | 'links' | 'references' | 'coordinates'
    | 'langLinks' | 'infobox' | 'tables' | 'related'

export interface eventOptions {
    type?: eventTypes,
    month?: string,
    day?: string
}

export type eventTypes =
    'all' | 'selected' | 'births' | 'deaths' | 'events' | 'holidays'