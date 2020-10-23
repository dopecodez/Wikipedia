export interface searchOptions {
    limit?: number
    suggestion?: boolean
}

export interface pageOptions {
    autoSuggest?: boolean
    redirect?: boolean
    preload?: boolean
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