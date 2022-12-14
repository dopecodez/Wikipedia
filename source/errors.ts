export class wikiError extends Error {
    code?: string;
    constructor(message: string, code?: string) {
        super(message);
        this.name = 'wikiError';
        this.code = code;
    }
}

export class searchError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'searchError';
    }
}

export class autocompletionsError extends wikiError {
  constructor(message: string) {
      super(message);
      this.name = 'autocompletionsError';
  }
}


export class pageError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'pageError';
    }
}

export class summaryError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'summaryError';
    }
}

export class imageError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'imageError';
    }
}

export class htmlError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'htmlError';
    }
}

export class contentError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'contentError';
    }
}

export class categoriesError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'categoriesError';
    }
}

export class linksError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'linksError';
    }
}

export class geoSearchError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'geoSearchError';
    }
}

export class coordinatesError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'coordinatesError';
    }
}

export class infoboxError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'infoboxError';
    }
}

export class preloadError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'preloadError';
    }
}

export class introError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'introError';
    }
}

export class relatedError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'relatedError';
    }
}

export class mediaError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'mediaError';
    }
}

export class eventsError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'eventsError';
    }
}

export class fcError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'featuredContentError';
    }
}

export class pdfError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'pdfError';
    }
}

export class citationError extends wikiError {
    constructor(message: string) {
        super(message);
        this.name = 'citationError';
    }
}