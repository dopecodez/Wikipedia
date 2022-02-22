export const pageJson = {
    "pageid": 100,
    "ns": 1,
    "title": "Test",
    "contentmodel": "",
    "pagelanguage": "",
    "pagelanguagehtmlcode": "",
    "pagelanguagedir": "",
    "touched": "",
    "lastrevid": 0,
    "length": 0,
    "fullurl": "",
    "editurl": "",
    "canonicalurl": ""
}

export const summaryJson = {
    type: "",
    title: "Test Summary",
    displaytitle: "Test",
    namespace: { id: 0, text: "" },
    wikibase_item: "",
    titles: { canonical: "", normalized: "", display: "" },
    pageid: 100,
    thumbnail: {
        source: "",
        width: 0,
        height: 0
    },
    originalimage: {
        source: "",
        width: 0,
        height: 0
    },
    lang: "",
    dir: "",
    revision: "",
    tid: "",
    timestamp: "",
    description: "",
    description_source: "",
    content_urls: {
        desktop: {
            page: "",
            revisions: "",
            edit: "",
            talk: ""
        },
        mobile: {
            page: "",
            revisions: "",
            edit: "",
            talk: ""
        }
    },
    extract: "",
    extract_html: ""
}

export const eventsJson = {
    births: [
        {
            text: "test",
            pages: [summaryJson]
        }
    ],
    deaths: [
        {
            text: "test",
            pages: [summaryJson]
        }
    ],
    events: [
        {
            text: "test",
            pages: [summaryJson]
        }
    ],
    holidays: [
        {
            text: "test",
            pages: [summaryJson]
        }
    ],
    selected: [
        {
            text: "test",
            pages: [summaryJson]
        }
    ]
}

export const rawJson = {
    contentformat: 'text/x-wiki',
    contentmodel: 'wikitext',
    '*': '{{pp-move-indef}}\n' +
      '{{short description|Creator and lead developer of Linux kernel}}\n' +
      '{{Use dmy dates|date=July 2020}}\n' +
      '{{Infobox person\n' +
      '| name               = Linus Torvalds\n' +
      '| image              = LinuxCon Europe Linus Torvalds 03 (cropped).jpg\n' +
      '| caption           = Torvalds at LinuxCon Europe 2014\n'
}

export const tableJson = {
    contentformat: 'text/x-wiki',
    contentmodel: 'wikitext',
    '*': '{{pp-move-indef}}\n' +
        '== Awards and achievements ==\n' +
        '{| class="wikitable"\n' +
        '|-\n' +
        '! colspan="3" style="background: LightSteelBlue;" | Awards and achievements\n' +
        '|- style="background:#ccc;"\n' +
        '! Year !! Award !! Notes\n' +
        '|-\n' +
        '|2018\n' +
        '|IEEE Masaru Ibuka Consumer Electronics Award\n' +
        '|[[IEEE Masaru Ibuka Consumer Electronics Award]] is conferred by the [[Institute of Electrical and Electronics Engineers]] for outstanding contributions to consumer electronics technology has been named in honor the co-founder and honorary chairman of Sony Corporation, Masaru Ibuka. 2018 Ibuka award was conferred to Linus Torvalds "For his leadership of the development and proliferation of Linux."<ref name="ibuka_rl" />\n' +
        '|-\n' +
        '|2014\n' +
        '|IEEE Computer Pioneer Award\n' +
        "|On 23 April 2014, the [[Institute of Electrical and Electronics Engineers]] named Torvalds as the 2014 recipient of the IEEE Computer Society's Computer Pioneer Award. The Computer Pioneer Award was established in 1981 by the IEEE Computer Society Board of Governors to recognize and honor the vision of those whose efforts resulted in the creation and continued vitality of the computer industry. The award is presented to outstanding individuals whose main contribution to the concepts and development of the computer field was made at least 15 years earlier.<ref>{{cite web|url=http://www.computer.org/portal/web/pressroom/Linus-Torvalds-Named-Recipient-of-the-2014-IEEE-Computer-Society-Computer-Pioneer-Award|title=Linus Torvalds Named Recipient of the 2014 IEEE Computer Society Computer Pioneer Award|publisher=[[Institute of Electrical and Electronics Engineers]]|date=23 April 2014|accessdate=5 May 2014|archive-url=https://web.archive.org/web/20140504034244/http://www.computer.org/portal/web/pressroom/Linus-Torvalds-Named-Recipient-of-the-2014-IEEE-Computer-Society-Computer-Pioneer-Award|archive-date=4 May 2014|url-status=dead}}</ref>\n" +
        '|-\n' +
        '|}\n' +
        '\n' +
        '== Media recognition ==\n' +
        "[[Time (magazine)|''Time'' magazine]] has recognized Torvalds multiple times:\n" 
}

export const mediaJson = {
    revision: "111",
    tid: "222",
    items: [{
        title: "sample",
        section_id: 1,
        type: "image",
        caption: {
            html: "test",
            text: "test"
        },
        showInGallery: true,
        srcset: [{
            src: "/something.jpg",
            scale: "1"
        }]
    }]
}

export const mobileSections = {
    lead: {
        ns: 0,
        id: 3449027,
        revision: "1000443218",
        lastmodified: "2021-01-15T03:44:53Z",
        lastmodifier: {
            user: "Ser Amantio di Nicolao",
            gender: "unknown"
        },
        displaytitle: "<i>Girls Like Me</i>",
        normalizedtitle: "Girls Like Me",
        wikibase_item: "Q5564650",
        description: "1986 studio album by Tanya Tucker",
        description_source: "local",
        protection: {},
        editable: true,
        languagecount: 1,
        image: {
            file: "TanyaTuckerGirlsLikeMeOriginal.jpg",
            urls: {
            320: "https://upload.wikimedia.org/wikipedia/en/4/48/TanyaTuckerGirlsLikeMeOriginal.jpg",
            640: "https://upload.wikimedia.org/wikipedia/en/4/48/TanyaTuckerGirlsLikeMeOriginal.jpg",
            800: "https://upload.wikimedia.org/wikipedia/en/4/48/TanyaTuckerGirlsLikeMeOriginal.jpg",
            1024: "https://upload.wikimedia.org/wikipedia/en/4/48/TanyaTuckerGirlsLikeMeOriginal.jpg"
            }
        },
        issues: [
            {
                html: "This is article",
                text: "This is article"
            }
        ],
        sections: [
            {
                id: 0,
                text: "<p>This is article</p>"
            },
            {
                id: 1,
                toclevel: 1,
                anchor: "Track_listing",
                line: "Track listing"
            },
            {
                id: 2,
                toclevel: 1,
                anchor: "Chart_performance",
                line: "Chart performance"
            }
        ]
    },
    remaining: {
        sections: [
            {
                id: 1,
                text: "\n<ol><li>\"<a href=\"/wiki/One_Love_at_a_Time\" title=\"One Love at a Time\">One Love at a Time</a>\"</li></ol>",
                toclevel: 1,
                line: "Track listing",
                anchor: "Track_listing"
            },
            {
                id: 2,
                text: "\n<table class=\"wikitable\">\n<tbody><tr><th>abc</th></tr></tbody></table>",
                toclevel: 1,
                line: "Chart performance",
                anchor: "Chart_performance"
            }
        ]
    }
}

export const title = {
  items: [
    {
      title: "White-naped_seedeater",
      page_id: 12450272,
      rev: 1012232317,
      tid: "fce161c0-8ea1-11eb-8f0f-a75f37ec29b6",
      namespace: 0,
      user_id: 40600116,
      user_text: "ShortDescBot",
      timestamp: "2021-03-15T09:14:24Z",
      comment: "[[User:ShortDescBot|ShortDescBot]] adding [[Wikipedia:Short description|short description]] \"Species of bird\"",
      tags: [],
      restrictions: [],
      page_language: "en",
      redirect: false
    }
  ]
}

export const notFoundJson = {
  type: "https://mediawiki.org/wiki/HyperSwitch/errors/not_found",
  title: "Not found.",
  method: "get",
  detail: "Page or revision not found.",
  uri: "/en.wikipedia.org/v1/page/mobile-html/does-not-exist-on-wikipedia"
}

export const htmlString = "<!DOCTYPE html><html>abcde</html>";

export const citationData = {
    data: [
        {
            "itemType": "journalArticle",
            "issue": "2",
            "DOI": "10.23884/ijesg.2017.2.2.04",
            "pages": "47–63",
            "title": "A MODEL APPLICATION OF MICRO GRID: BATMAN UNIVERSITY MICRO GRID",
            "volume": "2",
            "publicationTitle": "International Journal of Energy and Smart Grid",
            "date": "2017-12-30",
            "url": "http://dx.doi.org/10.23884/ijesg.2017.2.2.04",
            "ISSN": [
                "2548-0332"
            ],
            "accessDate": "2021-09-23",
            "author": [
                [
                    "Mehmet Esref",
                    "Demir"
                ],
                [
                    "Musa",
                    "Yilmaz"
                ],
                [
                    "Ahmet",
                    "Gündogdu"
                ]
            ],
            "source": [
                "Crossref"
            ]
        },
        {
            "itemType": "book",
            "title": "Batman.",
            "url": "http://worldcat.org/oclc/983466999",
            "abstractNote": "\"Batman: Arkham Asylum exposes players to a dark and atmospheric adventure that takes them into the depths of Arkham Asylum. Batman Arkham City introduces a brand-new story that draws together an all-star cast of classic characters and murderous villains from the Batman universe\"--Amazon.com.",
            "oclc": "983466999",
            "author": [
                [
                    "WB Games (Firm), contributor. Warner Bros. Interactive Entertainment,",
                    "publisher."
                ]
            ],
            "accessDate": "2021-09-23",
            "source": [
                "WorldCat"
            ]
        }
    ]
}

const sampleSummary = {
    "type": "standard",
    "title": "Jared_Lee_Loughner",
    "displaytitle": "Jared Lee Loughner",
    "namespace": {
        "id": 0,
        "text": ""
    },
    "wikibase_item": "Q4267485",
    "titles": {
        "canonical": "Jared_Lee_Loughner",
        "normalized": "Jared Lee Loughner",
        "display": "Jared Lee Loughner"
    },
    "pageid": 30372228,
    "thumbnail": {
        "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Jared_Loughner_USMS.jpg/256px-Jared_Loughner_USMS.jpg",
        "width": 256,
        "height": 320
    },
    "originalimage": {
        "source": "https://upload.wikimedia.org/wikipedia/commons/8/82/Jared_Loughner_USMS.jpg",
        "width": 480,
        "height": 600
    },
    "lang": "en",
    "dir": "ltr",
    "revision": "1063449101",
    "tid": "fa00d540-6d07-11ec-b627-0543a4912f8c",
    "timestamp": "2022-01-03T04:11:55Z",
    "description": "American mass murderer",
    "description_source": "local",
    "content_urls": {
        "desktop": {
            "page": "https://en.wikipedia.org/wiki/Jared_Lee_Loughner",
            "revisions": "https://en.wikipedia.org/wiki/Jared_Lee_Loughner?action=history",
            "edit": "https://en.wikipedia.org/wiki/Jared_Lee_Loughner?action=edit",
            "talk": "https://en.wikipedia.org/wiki/Talk:Jared_Lee_Loughner"
        },
        "mobile": {
            "page": "https://en.m.wikipedia.org/wiki/Jared_Lee_Loughner",
            "revisions": "https://en.m.wikipedia.org/wiki/Special:History/Jared_Lee_Loughner",
            "edit": "https://en.m.wikipedia.org/wiki/Jared_Lee_Loughner?action=edit",
            "talk": "https://en.m.wikipedia.org/wiki/Talk:Jared_Lee_Loughner"
        }
    },
    "rxtract": "abc",
    "extract_html": "<p>abc</p>",
    "normalizedtitle": "abc"
}

export const fcData = {
    "tfa": sampleSummary,
    "mostread": {
        "date": "2022-01-07Z",
        "articles": [
            {
                "views": 1064940,
                "rank": 3,
                "view_history": [
                    {
                        "date": "2022-01-07Z",
                        "views": 1064940
                    }
                ],
                ...sampleSummary
            },
        ]
    },
    "image": {
        "title": "File:1930s Japan Travel Poster - 01.jpg",
        "thumbnail": {
            "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/1930s_Japan_Travel_Poster_-_01.jpg/640px-1930s_Japan_Travel_Poster_-_01.jpg",
            "width": 640,
            "height": 934
        },
        "image": {
            "source": "https://upload.wikimedia.org/wikipedia/commons/5/54/1930s_Japan_Travel_Poster_-_01.jpg",
            "width": 2056,
            "height": 3000
        },
        "file_page": "https://commons.wikimedia.org/wiki/File:1930s_Japan_Travel_Poster_-_01.jpg",
        "artist": {
            "html": "Japanese Government Railways",
            "text": "Japanese Government Railways",
            "name": "Japanese Government Railways"
        },
        "credit": {
            "html": "Heritage Auctions",
            "text": "Heritage Auctions"
        },
        "license": {
            "type": "Public domain",
            "code": "pd"
        },
        "description": {
            "html": "Sea bathing in Obama",
            "text": "Sea bathing in Obama",
            "lang": "en"
        },
        "wb_entity_id": "M31526367",
        "structured": {
            "captions": {}
        }
    },
    "news": [
        {
            "links": [ sampleSummary ],
            "story": "<!--Jan 7-->Bahamian-American actor."
        },
    ],
    "onthisday": [
        {
            "text": "abc",
            "pages": [ sampleSummary ]
        }
    ],
}