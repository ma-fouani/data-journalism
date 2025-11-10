const coords = [
    /*{
        "name": "",
        "coords": [34.8516, 31.0461],
        "id": "ISR",
        "zoom": 1,
        "news": {
            "date": "",
            "title": "Pager Attacks",
            "subtitle": "",
            "description": "",
            "link": "",
            "image": ""
        }
    },*/
    {
        "name": "Israel",
        "coords": [34.8516, 31.0461],
        "id": "ISR",
        "zoom": 10,
        "news": {
            "date": "Reported 2022",
            "title": "Mossad discovers Hezbollah procurement of pagers; operation concept begins",
            "subtitle": "Intelligence interception and initial planning phase",
            "description": "According to retired Mossad operatives interviewed by CBS and press reports, Israeli intelligence learned Hezbollah was acquiring pagers and walkie-talkies, sparking the idea to create booby-trapped devices at the manufacturing level.",
            "link": "https://www.cbsnews.com/news/mossad-operation-hezbollah-pagers-60-minutes/",
            "image": "https://i.ytimg.com/vi/S6-vLKZyPpU/maxresdefault.jpg"
        }
    },
    {
        "name": "Hungary",
        "coords": [19.5033, 47.1625],
        "id": "HUN",
        "zoom": 14,
        "news": {
            "date": "2023–2024 (reported)",
            "title": "Creation of fake European shell companies",
            "subtitle": "Mossad sets up front entities to mimic real distributors",
            "description": "Investigations revealed the creation of shell firms such as BAC Consulting Kft in Hungary, complete with websites, showrooms, and marketing videos, to disguise Mossad’s role and establish a fake supply chain.",
            "link": "https://www.reuters.com/world/middle-east/how-israel-infiltrated-hezbollahs-supply-chain-2024-09-20/",
            "image": "https://e3.365dm.com/24/09/768x432/skynews-bac-lebanon-strikes_6690166.jpg"
        }
    },
    {
        "name": "Taiwan",
        "coords": [120.9605, 23.6978],
        "id": "TWN",
        "zoom": 10,
        "news": {
            "date": "Mid-2024 (reported)",
            "title": "Gold Apollo licensing and BAC Consulting connection",
            "subtitle": "Suspicious licensing and manufacturing relationships emerge",
            "description": "Gold Apollo denied exporting pagers to Lebanon and stated they were produced under license by the Budapest-based BAC Consulting. Taiwanese authorities investigated irregularities after the explosions.",
            "link": "https://www.theguardian.com/world/2024/sep/20/taiwan-gold-apollo-pagers-lebanon-investigation",
            "image": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2171971156.jpg?q=w_1160,c_fill/f_webp"
        }
    },
    {
        "name": "Turkey",
        "coords": [35.2433, 38.9637],
        "id": "TUR",
        "zoom": 8,
        "news": {
            "date": "Mid-2024 (reported)",
            "title": "Suspicious shipments intercepted in transit",
            "subtitle": "Turkey reportedly seizes a shipment of explosive pagers",
            "description": "Turkish intelligence reportedly intercepted a shipment of pagers and chargers containing explosive material during transit to Lebanon, as part of a wider investigation into the operation.",
            "link": "https://www.reuters.com/world/middle-east/turkey-seized-explosive-pagers-linked-lebanon-blasts-2024-09-18/",
            "image": "https://www.tonlexing.com/wp-content/uploads/2024/12/How-Long-Does-it-Take-to-Ship-from-China-to-Turkey.webp"
        }
    },
    {
        "name": "Lebanon",
        "coords": [35.8623, 33.8547],
        "id": "LBN",
        "zoom": 16,
        "news": {
            "date": "Reported June 2024",
            "title": "Hezbollah acquires the pagers from the intermediary and distributes them to members",
            "subtitle": "Distribution period up to September 2024 (reported)",
            "description": "According to multiple news organisations, Hezbollah purchased the pagers through the intermediary company and distributed thousands of units to operatives (the devices were attractive because pagers avoid cell-phone vulnerabilities). Hezbollah later instructed cadres to use pagers rather than cell phones. The devices reportedly circulated widely inside Hezbollah areas in Lebanon and some in Syria.",
            "link": "https://en.wikipedia.org/wiki/2024_Lebanon_electronic_device_attacks?utm_source=chatgpt.com",
            "image": "https://qodenext.com/wp-content/uploads/2024/01/loading-and-unloading-logistic.webp"
        }
    },
    {
        "name": "Lebanon",
        "coords": [35.8623, 33.8547],
        "id": "LBN",
        "zoom": 22,
        "news": {
            "date": "17 September 2024",
            "title": "Coordinated pager explosions across Lebanon",
            "subtitle": "Thousands of devices detonate simultaneously",
            "description": "At around 15:30 local time, thousands of pagers detonated in a coordinated sequence across Lebanon and parts of Syria. The blasts killed dozens and injured thousands, causing widespread panic. Hezbollah blamed Israel; Israel did not officially comment at the time.",
            "link": "https://www.bbc.com/news/world-middle-east-68282819",
            "image": "https://i.ytimg.com/vi/JRQzbazXgXs/maxresdefault.jpg"
        }
    },
    {
        "name": "Lebanon",
        "coords": [35.8623, 33.8547],
        "id": "LBN",
        "zoom": 26,
        "news": {
            "date": "18 September 2024",
            "title": "Second wave of explosions — walkie-talkies detonate",
            "subtitle": "Day two of the coordinated operation",
            "description": "A second series of blasts hit Lebanon when walkie-talkies reportedly detonated, wounding additional Hezbollah members and civilians. Hospitals across the country were overwhelmed with burn and eye injuries.",
            "link": "https://www.france24.com/en/middle-east/20240918-lebanon-walkie-talkie-explosions-follow-pager-blasts",
            "image": "https://static.independent.co.uk/2024/09/18/17/lebanon-walkie-talkie-splash.jpg"
        }
    },
    {
        "name": "Israel",
        "coords": [34.8516, 31.0461],
        "id": "ISR",
        "zoom": 16,
        "news": {
            "date": "20 September 2024",
            "title": "Press investigations attribute operation to Mossad",
            "subtitle": "Reuters and NYT reconstruct the supply chain",
            "description": "Investigations by Reuters and The New York Times identified BAC Consulting as a Mossad-linked front company that delivered booby-trapped pagers to Hezbollah. The reports highlighted extensive deception tactics used to disguise the devices as legitimate imports.",
            "link": "https://www.nytimes.com/2024/09/20/world/middleeast/israel-lebanon-pager-explosions.html",
            "image": "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/theprobe/media/media_files/dsIXbh9LtENLPriGT6w9.jpg"
        }
    },
    {
        "name": "Lebanon",
        "coords": [35.8623, 33.8547],
        "id": "LBN",
        "zoom": 26,
        "news": {
            "date": "October 2024",
            "title": "Casualty updates and international reactions",
            "subtitle": "Health Ministry reports and UN statements",
            "description": "The Lebanese Health Ministry announced updated figures with thousands wounded and dozens killed. UN experts and rights groups called for investigations into the attacks, warning of indiscriminate harm and potential violations of international law.",
            "link": "https://www.reuters.com/world/middle-east/lebanon-health-ministry-reports-thousands-injured-pager-blasts-2024-09-18/",
            "image": "https://i.ytimg.com/vi/ifLPzklNqRc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCSN088L6fLukGR6anTgws2ZEaxyQ"
        }
    },
    {
        "name": "Iran",
        "coords": [51.3890, 35.6892],
        "id": "IRN",
        "zoom": 16,
        "news": {
            "date": "November 2024 – January 2025",
            "title": "Hundreds of injured Hezbollah members treated in Iran",
            "subtitle": "Specialized medical evacuations and surgeries",
            "description": "Iranian media reported that hundreds of injured Hezbollah members were flown to Iran for specialized surgeries, including eye and hand operations. Hospitals in Tehran and Mashhad received many of the patients.",
            "link": "https://www.irna.ir/news/85372870",
            "image": "https://cnn-arabic-images.cnn.io/cloudinary/image/upload/w_1750,h_919,c_fill,q_auto,g_center/t_cnnarabic_watermark_logo_v5/cnnarabic/2024/10/09/images/279692.jpg"
        }
    },
    {
        "name": "United States of America",
        "coords": [-95.7129, 37.0902],
        "id": "USA",
        "zoom": 5,
        "news": {
            "date": "22 December 2024",
            "title": "60 Minutes interview with former Mossad agents",
            "subtitle": "Operation publicly described on U.S. television",
            "description": "CBS’s 60 Minutes aired interviews with former Mossad operatives who confirmed key details about the pager operation, describing how the agency created fake companies and embedded micro-explosives in the devices’ batteries.",
            "link": "https://www.cbsnews.com/news/mossad-operation-hezbollah-pagers-60-minutes/",
            "image": "https://assets2.cbsnewsstatic.com/hub/i/r/2024/12/21/d7d181f4-cbbd-49f8-918f-2517a88580f7/thumbnail/620x349/89d9f4afbf4a3b09272621847fc244aa/pagers-video-stahl.jpg"
        }
    }
]