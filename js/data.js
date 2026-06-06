// CultureQuest AI - India's Cultural Passport
// Cultural Database

const CULTURAL_DATA = {
  jaipur: {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The Pink City of Valour & Royalty",
    themeColor: "#E07A5F", // Terracotta pink
    intro: "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is a marvel of ancient Indian urban planning. Built with pink terracotta-painted walls to welcome British royalty in 1876, the city represents a spectacular blend of Rajput chivalry, architectural mathematical genius, and vibrant handicraft traditions.",
    image: "images/jaipur_header.png",
    coordinates: { x: 30, y: 42 }, // Relative position on the SVG map
    stampSymbol: "🕌", // Custom SVG or emoji fallback for passport stamp
    stampLabel: "ROYAL JAIPUR",
    quiz: [
      {
        question: "Why was Jaipur painted pink in 1876 by Maharaja Sawai Ram Singh?",
        options: [
          "It was the cheapest paint available at that time",
          "To welcome Prince Albert of Britain, as pink is the traditional color of hospitality",
          "To comply with an ancient astrological warning",
          "Because the Maharaja personally disliked yellow and red"
        ],
        answer: 1,
        explanation: "In 1876, Maharaja Sawai Ram Singh ordered the entire city painted pink—a color historically associated with hospitality—to welcome Prince Albert, the Prince of Wales, on his royal tour."
      },
      {
        question: "Which iconic Jaipur structure has 953 small outer windows (Jharokhas) designed for royal women?",
        options: [
          "Amer Fort",
          "City Palace",
          "Hawa Mahal (Palace of Winds)",
          "Jal Mahal"
        ],
        answer: 2,
        explanation: "Hawa Mahal, or the Palace of Winds, was built in 1799 with 953 small windows (jharokhas). This allowed royal women to observe daily street life and festivals without being seen, while keeping the interior cool through the Venturi effect."
      },
      {
        question: "Jaipur's UNESCO World Heritage observatory, the Jantar Mantar, houses the Samrat Yantra. What is it?",
        options: [
          "An ancient telescope to view Jupiter's moons",
          "A massive sundial that measures time with an accuracy of two seconds",
          "A weather forecasting chamber built of red sandstone",
          "A musical acoustic arena for court singers"
        ],
        answer: 1,
        explanation: "The Vrihat Samrat Yantra at Jantar Mantar is the world's largest stone sundial. It stands 27 meters tall and measures local time with a precision of just two seconds."
      }
    ],
    content: {
      history: "Jaipur was planned according to Vastu Shastra (ancient Indian science of architecture) and Shilpa Shastra. Designed by Vidyadhar Bhattacharya, it was divided into nine blocks representing the nine planets (Navagrahas). Unlike other medieval cities, its streets are wide, grid-aligned, and structured for commerce.",
      traditions: "The culture is steeped in folklore, martial music, and colorful celebrations. The royal court patronized Kathak dance and Dhrupad music. Today, traditional greetings like 'Khammaghani' (respectful greetings) and the wearing of colorful turbans (Pagris) remain alive.",
      festivals: "The Teej and Gangaur festivals are spectacular events where grand royal processions of Goddess Parvati wind through the old city, accompanied by decorated elephants, folk dancers, and traditional music.",
      foodCulture: "Dal Baati Churma (baked wheat balls with lentil curry and sweetened crushed wheat), Laal Maas (a fiery mutton curry made with Mathania chillies), and sweet Mawa Kachori and Ghevar form the cornerstone of Jaipur's rich culinary legacy.",
      artCraft: "Famous for Blue Pottery (utilizing quartz instead of clay), Block Printing (particularly Sanganeri and Bagru prints), Meenakari (enamel work on gold), and gemstone cutting.",
      importantPlaces: [
        { name: "Hawa Mahal", desc: "A five-story crown-shaped honeycomb sandstone palace with intricate latticework." },
        { name: "Amer Fort", desc: "A hilltop fortress blending Hindu and Mughal styles, featuring the stunning Sheesh Mahal (Mirror Palace)." },
        { name: "Jantar Mantar", desc: "A collection of nineteen architectural astronomical instruments built by Maharaja Jai Singh II." }
      ],
      folkStories: [
        {
          title: "The Vision of Vidyadhar",
          text: "Maharaja Jai Singh II, an avid astronomer and mathematician, dreamt of a city that mirrored the order of the cosmos. He partnered with a brilliant young Bengali architect, Vidyadhar Bhattacharya. Together, they mapped the stars onto the grid of the earth, creating India's first fully planned city based on celestial harmony.",
          highlight: "Vastu planning meets astronomical precision",
          image: "images/jaipur_story.png"
        },
        {
          title: "The Mirror Palace Myth",
          text: "It is said that the Sheesh Mahal (Fort Mirror Palace) was built because the Queen loved sleeping under the stars, but royal custom forbade her from sleeping outdoors. The Maharaja built the hall so that lighting a single candle would reflect across thousands of tiny concave mirrors, recreating a glowing night sky indoors.",
          highlight: "A sky made of glass beads and candlelight"
        }
      ],
      facts: [
        "Jaipur is part of India's Golden Triangle tourist circuit.",
        "The city was painted pink in just a few weeks under royal decree.",
        "It houses the world's largest cannon on wheels, Jaivana, at Jaigarh Fort."
      ],
      factVsMyth: [
        {
          myth: "Hawa Mahal was a grand palace for the king to live in luxury.",
          fact: "Hawa Mahal is actually not a residential palace. It has no staircases to the upper floors (only ramps) and is largely a facade with thin corridors, built specifically for the ladies to view processions."
        }
      ]
    }
  },
  varanasi: {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "The Eternal City of Light & Liberation",
    themeColor: "#D65A31", // Deep terracotta orange
    intro: "Mark Twain wrote, 'Varanasi is older than history, older than tradition, older even than legend.' Known as Kashi or Banaras, it is one of the world's oldest continuously inhabited cities. Built on the banks of the sacred River Ganges, it is the center of Hindu cosmology, music, and the philosophy of life, death, and liberation (Moksha).",
    image: "images/varanasi_header.png",
    coordinates: { x: 55, y: 45 },
    stampSymbol: "🪔",
    stampLabel: "KASHI ASCENT",
    quiz: [
      {
        question: "Which musical heritage school (Gharana) is Varanasi famous for, producing legendary artists like Ustad Bismillah Khan?",
        options: [
          "Gwalior Gharana",
          "Banaras Gharana",
          "Kirana Gharana",
          "Patiala Gharana"
        ],
        answer: 1,
        explanation: "The Banaras Gharana is one of the most prestigious schools of Indian classical music, renowned for producing masters of the shehnai (Bismillah Khan), sitar (Ravi Shankar), and tabla."
      },
      {
        question: "What daily ceremony takes place at Dashashwamedh Ghat every single evening at sunset?",
        options: [
          "A silent meditation march",
          "The grand Ganga Aarti, honoring the river with brass lamps and rhythmic chanting",
          "A holy bathing marathon",
          "A classical poetry duel"
        ],
        answer: 1,
        explanation: "The Ganga Aarti is a daily ritual where priests perform worship to the river Ganges and Lord Shiva using multi-tiered brass oil lamps, incense, and synchronized Vedic chants."
      },
      {
        question: "Varanasi's famous Banarasi sarees are world-renowned. What is their defining characteristic?",
        options: [
          "They are made of coarse wild jute threads",
          "Intricate brocade weaving with real gold and silver threads (Zari) on fine silk",
          "Geometric tie-and-dye patterns on cotton",
          "Hand-painted tribal scenes depicting forest gods"
        ],
        answer: 1,
        explanation: "Banarasi sarees are woven on traditional handlooms, famous for their heavy silk and intricate gold/silver brocade work called Zari, featuring motifs inspired by Mughal art."
      }
    ],
    content: {
      history: "Associated with Lord Shiva, Varanasi has been the intellectual and spiritual capital of India for three millennia. Adi Shankara established Shiva worship here, Kabir and Ravidas wrote their revolutionary mystic poetry here, and Gautama Buddha preached his very first sermon nearby in Sarnath.",
      traditions: "A living museum of Hindu rituals. Life rotates around the 84 Ghats (stone steps leading to the river). Cremation ghats like Manikarnika remind visitors of the cycle of mortality, while the morning 'Subah-e-Banaras' celebrates the sunrise with Vedic hymns and Ragas.",
      festivals: "Dev Deepawali (The Diwali of the Gods) occurs 15 days after Diwali, where all 84 ghats are illuminated by over a million earthen lamps, and the river reflects a sea of floating lights.",
      foodCulture: "A paradise of vegetarian street food. Famous for Kachori Sabzi, Tamatar Chaat (spicy tomato mash served in clay pots), Banarasi Lassi topped with thick rabri, and the legendary Banarasi Paan (betel leaf preparation).",
      artCraft: "Famous for hand-woven Banarasi silk sarees, pink enamel jewelry (Gulabi Meenakari), and clay vessels and wooden toys.",
      importantPlaces: [
        { name: "Kashi Vishwanath Temple", desc: "The sacred gold-plated spire temple dedicated to Lord Shiva." },
        { name: "Dashashwamedh Ghat", desc: "The primary and most bustling ghat, host to the spectacular Ganga Aarti." },
        { name: "Sarnath", desc: "Located 10km away, the deer park where Buddha gave his first sermon on the Dharma." }
      ],
      folkStories: [
        {
          title: "The Descent of the Ganga",
          text: "According to legend, King Bhagiratha did penance for thousands of years to bring the heavenly river Ganga to earth to cleanse the ashes of his ancestors. However, the force of the falling river would have crushed the earth. Lord Shiva stepped in and caught the mighty river in his matted locks, releasing her gently onto the plains of Kashi.",
          highlight: "Cosmic waters tamed by Shiva's locks",
          image: "images/varanasi_story.png"
        },
        {
          title: "Kabir's Weaver Wisdom",
          text: "Kabir, the 15th-century mystic poet, worked as a humble weaver at the ghats of Varanasi. While interlacing warp and weft threads on his loom, he composed couplets (Dohas) that criticized religious orthodoxy. He compared the human body to a finely woven sheet ('Jhini Jhini Bini Chadariya') that must be returned to the Creator untarnished.",
          highlight: "Metaphors of the loom and soul"
        }
      ],
      facts: [
        "Varanasi has over 3,000 temples.",
        "The city produces the finest hand-knotted carpets alongside silk.",
        "Sanskrit is still spoken fluently by local scholars in traditional schools (Pathshalas)."
      ],
      factVsMyth: [
        {
          myth: "Varanasi is only a city of death and mourning.",
          fact: "While Manikarnika Ghat handles cremations, Varanasi is actually a vibrant celebration of life. Its ghats echo with music, laughter, wrestling in mud pits (Akharas), academic debates, and bustling trade."
        }
      ]
    }
  },
  kolkata: {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    tagline: "The City of Joy, Art & Soul",
    themeColor: "#8D0801", // Deep crimson/maroon (vermilion)
    intro: "Formerly Calcutta, the capital of British India until 1911, Kolkata is the cradle of the Indian Renaissance. It is a city defined by grand colonial brick architecture, yellow ambassador cabs, street side tea discussions (Adda), Nobel Laureates, and a passionate love for literature, cinema, and football.",
    image: "images/kolkata_header.png",
    coordinates: { x: 68, y: 52 },
    stampSymbol: "🌉",
    stampLabel: "BENGAL SOUL",
    quiz: [
      {
        question: "During Durga Puja, what is the traditional clay sculpting ritual performed to breathe life into the idols?",
        options: [
          "Bhasanjoli (River immersion)",
          "Chokkhu Daan (Painting the third eye of Goddess Durga)",
          "Dhunuchi Naach (Smoke dance)",
          "Anjali chanting"
        ],
        answer: 1,
        explanation: "Chokkhu Daan (the donation of the eyes) is a sacred ritual where the artisan paints the eyes of Goddess Durga in complete darkness, symbolizing the awakening of the divine feminine consciousness."
      },
      {
        question: "Which landmark iron-cantilever bridge, built without a single nut or bolt, spans the Hooghly River to connect Kolkata and Howrah?",
        options: [
          "Vidyasagar Setu",
          "Howrah Bridge (Rabindra Setu)",
          "Vivekananda Setu",
          "Nivedita Setu"
        ],
        answer: 1,
        explanation: "Howrah Bridge is a structural marvel completed in 1943. It is a suspension-type cantilever bridge made of high-tensile steel, designed to expand and contract with temperature without using nuts and bolts."
      },
      {
        question: "What is the famous Bengali sweet, consisting of soft spongy cottage cheese balls soaked in clear sugar syrup?",
        options: [
          "Sandesh",
          "Rasgulla (Roshogolla)",
          "Mishti Doi",
          "Darbesh"
        ],
        answer: 1,
        explanation: "Roshogolla, patented by Bengal, is a legendary sweet made of fresh chhena (cottage cheese) kneaded and boiled in light sugar syrup, resulting in a soft, springy, melt-in-the-mouth texture."
      }
    ],
    content: {
      history: "Formed from three villages (Kalikata, Gobindapur, Sutanuti) by the British East India Company. It became the capital of the Empire, witnessing the rise of social reformers like Raja Ram Mohan Roy, spiritual guides like Ramakrishna and Vivekananda, and Nobel Laureate Rabindranath Tagore.",
      traditions: "The culture thrives on 'Adda'—long, passionate intellectual arguments over tea in clay cups (bhar). Bengali cinema (Satyajit Ray), literature, and the Baul mystic musical tradition shape the social fabric.",
      festivals: "Durga Puja, a UNESCO Intangible Cultural Heritage, transforms the entire city into a massive open-air art gallery with thousands of artistic temporary temples (Pandals) and rhythmic beats of the 'Dhak' drums.",
      foodCulture: "Maach-Bhaat (fish curry and rice) is the staple. Kolkata is also famous for Kosha Mangsho (slow-cooked spicy mutton), Mughlai parathas, and street-style Kathi rolls, along with sweets like Mishti Doi and Sandesh.",
      artCraft: "Terracotta pottery from Bankura, Sholapith (pith craft used for bridal crowns and deity ornaments), and Kalighat Paintings (a style of bold brushwork watercolor paintings).",
      importantPlaces: [
        { name: "Victoria Memorial", desc: "A magnificent white marble monument blending British, Mughal, and Venetian architecture." },
        { name: "Howrah Bridge", desc: "The iconic cantilever bridge that stands as the gateway to the city." },
        { name: "Kumartuli", desc: "The historic potters' quarter where clay idols of gods are handcrafted for festivals." }
      ],
      folkStories: [
        {
          title: "The Wandering Bauls",
          text: "The Bauls are mystic minstrels of Bengal who wear saffron robes and play the single-stringed Ektara. They belong to no established religion, preaching instead the search for the 'Man of the Heart' (Moner Manush) hidden within every human being. Their soulful, dancing street performances are a cry for universal love.",
          highlight: "Mystics of the soil and the ektara",
          image: "images/kolkata_story.png"
        },
        {
          title: "The Awakening of Durga",
          text: "According to the Puranas, King Ram invoked Goddess Durga in autumn (an unseasonal time, or Akal Bodhan) to gain her blessings before his battle with Ravana. The potters of Kumartuli recreate this cosmic battle yearly, carving her out of holy mud collected from the doorsteps of prostitutes, representing the absolute inclusion of all society in the divine.",
          highlight: "Idols sculpted from the mud of inclusion"
        }
      ],
      facts: [
        "Kolkata is the only Indian city with an operating tram network.",
        "It houses the National Library of India, the largest in the country.",
        "The city boasts the oldest golf club outside the UK."
      ],
      factVsMyth: [
        {
          myth: "Roshogolla was invented in ancient times in Bengal.",
          fact: "The modern spongy Roshogolla was actually invented in Kolkata in 1868 by Nobin Chandra Das. Before that, sweets were dry and made of evaporated milk solids (khoya) rather than fresh split-milk cottage cheese."
        }
      ]
    }
  },
  mysore: {
    id: "mysore",
    name: "Mysore",
    state: "Karnataka",
    tagline: "The Royal City of Silk & Sandalwood",
    themeColor: "#2A9D8F", // Deep teal/emerald green
    intro: "Now Mysuru, this city was the capital of the Kingdom of Mysore ruled by the Wadiyar dynasty, with a brief reign by Hyder Ali and Tipu Sultan. Located at the foothills of Chamundi Hills, Mysore is famed for its palaces, fragrant sandalwood, rich silk fabrics, and the world-renowned Ashtanga Yoga.",
    image: "images/mysore_header.png",
    coordinates: { x: 32, y: 78 },
    stampSymbol: "🐘",
    stampLabel: "MYSORE CROWN",
    quiz: [
      {
        question: "During Mysore Dasara, what is the weight of the golden chariot (Howdah) mounted on the lead elephant carrying Goddess Chamundeshwari?",
        options: [
          "750 kilograms of pure gold",
          "50 kilograms",
          "150 kilograms",
          "300 kilograms"
        ],
        answer: 0,
        explanation: "The Golden Howdah (Chinnada Ambari) used in the Vijayadashami elephant procession (Jumboo Savari) is made of wood covered in 750 kg of pure gold sheets."
      },
      {
        question: "Which unique dessert was created in the royal kitchens of King Krishnaraja Wadiyar IV, made of chickpea flour, ghee, and sugar?",
        options: [
          "Dharwad Pedha",
          "Mysore Pak",
          "Chiroti",
          "Payasam"
        ],
        answer: 1,
        explanation: "Mysore Pak was invented by royal chef Madappa Schema. When asked for its name by the king, Madappa called it 'Mysore Paka' (Paka meaning sugar syrup in Kannada)."
      },
      {
        question: "What makes Mysore Sandalwood oil and soap historically unique?",
        options: [
          "It is made from marine weeds",
          "The Kingdom of Mysore held a state monopoly on sandalwood trees to preserve their quality",
          "The oil is fluorescent under dark light",
          "It was imported from Madagascar"
        ],
        answer: 1,
        explanation: "To prevent exploitation and maintain absolute purity, the Maharaja of Mysore declared sandalwood a state monopoly in 1792, establishing the Government Sandalwood Oil Factory in 1916."
      }
    ],
    content: {
      history: "Named after Mahishasura, the buffalo demon slain by Goddess Chamundeshwari. The Wadiyar dynasty ruled from 1399, patronizing Carnatic music, Sanskrit literature, and building some of India's most breathtaking palaces.",
      traditions: "The city maintains a slow royal pace. The practice of Ashtanga Yoga attracts thousands of global seekers. Mysore also holds the Geographical Indication (GI) tags for Mysore Silk, Mysore Sandalwood Oil, and Mysore Jasmine.",
      festivals: "Mysore Dasara (Nada Habba) is a 10-day state festival. On the final day, the Mysore Palace is illuminated by 100,000 lightbulbs, and a grand parade of decorated elephants marches through the city.",
      foodCulture: "Mysore Masala Dosa (crispy crepe lined with spicy red chili-garlic chutney and potato mash), Mysore Pak, and traditional South Indian meals served on banana leaves with spicy Rasam and Bisi Bele Bath.",
      artCraft: "Rosewood inlay work (embedding ivory or plastic into dark wood), Ganjifa cards (ancient hand-painted circular playing cards), and Mysore Paintings (using gold leaf foils).",
      importantPlaces: [
        { name: "Mysore Palace", desc: "An Indo-Saracenic marvel with stained glass, carved wooden doors, and golden pillars." },
        { name: "Chamundi Hill", desc: "A temple dedicated to the patron goddess, featuring a massive monolithic stone Nandi bull." },
        { name: "Devaraja Market", desc: "A colorful 100-year-old bazaar selling heaps of powder pigments, flowers, and sandalwood." }
      ],
      folkStories: [
        {
          title: "The Demon and the Goddess",
          text: "Legend says the buffalo-headed demon Mahishasura tortured the three worlds. The gods combined their energies to create the fierce warrior goddess Chamundeshwari. Mounted on a lion, she fought the demon on Chamundi hill for nine days and nights. Her victory on the tenth day is celebrated as Vijayadashami.",
          highlight: "The victory of light over the buffalo demon",
          image: "images/mysore_story.png"
        },
        {
          title: "Madappa's Sweet Mistake",
          text: "Madappa, the head chef of Mysore Palace, was struggling to make a new sweet for the Maharaja. He mixed chickpea flour, sugar, and ghee in a hot pan. Just as it cooled, it crystallized into a porous, melt-in-the-mouth block. Terrified, he presented it to the King. The King took one bite, smiled, and declared it the royal sweet of the state.",
          highlight: "A royal kitchen invention"
        }
      ],
      facts: [
        "Mysore Palace is the second most visited monument in India after the Taj Mahal.",
        "The city was the first in India to have a planned urban drainage system.",
        "Traditional Mysore Silk sarees use real gold thread (Zari) in their borders."
      ],
      factVsMyth: [
        {
          myth: "Mysore Palace is an ancient structure from the 10th century.",
          fact: "The current palace was actually completed in 1912. The original wooden palace was completely destroyed by fire during a royal wedding in 1897, prompting the Maharaja to commission British architect Henry Irwin to build a fireproof stone structure."
        }
      ]
    }
  },
  udaipur: {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    tagline: "The Venice of the East & City of Lakes",
    themeColor: "#457B9D", // Soft lake blue
    intro: "Founded in 1559 by Maharana Udai Singh II of the Sisodia clan of Rajputs, Udaipur is nestled in the green Aravalli Hills. Renowned for its mirror-like artificial lakes, floating marble palaces, and a fierce history of independence (never fully yielding to the Mughals), it is a sanctuary of romantic heritage.",
    image: "images/udaipur_header.png",
    coordinates: { x: 26, y: 48 },
    stampSymbol: "⛵",
    stampLabel: "MEWAR SHINE",
    quiz: [
      {
        question: "Udaipur is famous for its artificial lakes. Which lake houses the famous Lake Palace (Taj Lake Palace)?",
        options: [
          "Lake Pichola",
          "Fateh Sagar Lake",
          "Udai Sagar Lake",
          "Jaisamand Lake"
        ],
        answer: 0,
        explanation: "Lake Pichola, built in 1362 by a gypsy banjara to transport grain, is home to the stunning Lake Palace, which floats like a white marble ship on its waters."
      },
      {
        question: "Udaipur's Mewar school of painting is famous for what artistic style?",
        options: [
          "Large oil portraits of British generals",
          "Intricate miniature paintings using natural pigments made from crushed gemstones and gold",
          "Tribal wall art made of charcoal",
          "Abstract geometric canvas splashes"
        ],
        answer: 1,
        explanation: "Mewar miniature paintings are characterized by bright, natural colors extracted from minerals, shells, and gemstones, featuring emotional depictions of Radha-Krishna and royal hunts."
      },
      {
        question: "At the Bagore-ki-Haveli, what cultural exhibition is certified by the Guinness Book of World Records?",
        options: [
          "The world's longest mustache collection",
          "The world's largest turban (Pagri)",
          "The oldest collection of sword hilts",
          "The tallest bronze lamp"
        ],
        answer: 1,
        explanation: "Bagore-ki-Haveli exhibits the world's largest turban. It measures over 150 inches wide and required 80 meters of fabric, representing the turbans worn by different clans of Rajasthan."
      }
    ],
    content: {
      history: "Udaipur succeeded Chittorgarh as the capital of Mewar kingdom. Protected by the Aravalli range and lakes, it successfully resisted multiple Mughal sieges under figures like Maharana Pratap, maintaining a unique line of artistic and political autonomy.",
      traditions: "Mewar chivalry and honor shape local folklore. Folk performances like the Bhavai dance (balancing multiple clay pots on the head while dancing on glass shards or swords) and Ghoomar are kept alive at historical spots.",
      festivals: "The Mewar Festival welcomes spring with traditional singing, dancing, and floating lights on Lake Pichola, coinciding with Gangaur.",
      foodCulture: "Famous for Mewari food, including Ker Sangri (a dried desert berry and bean dish), Safed Maas (meat slow-cooked in a white yogurt and cashew paste), and freshly roasted Baatis with ghee.",
      artCraft: "Phad Paintings (large scroll paintings depicting folk deities), Miniature painting, Puppetry (Kathputli), and marble stone carving.",
      importantPlaces: [
        { name: "City Palace", desc: "A massive palace complex built over 400 years, showcasing blue tiles, mirrors, and lake views." },
        { name: "Lake Palace", desc: "An 18th-century white marble pleasure palace situated on Jag Niwas Island." },
        { name: "Saheliyon-ki-Bari", desc: "The 'Courtyard of Maidens' featuring marble fountains, pools, and lotus ponds." }
      ],
      folkStories: [
        {
          title: "The Sacrifice of Panna Dhai",
          text: "Panna Dhai was a royal wet nurse to the infant prince Udai Singh. When the usurper Banvir came to murder the prince in his bed, Panna placed her own son, Chandan, in the royal crib. She watched her son die to save the lineage of Mewar. Udai Singh was smuggled away to safety, and he later grew up to found the city of Udaipur.",
          highlight: "A mother's ultimate sacrifice for Mewar's throne",
          image: "images/udaipur_story.png"
        },
        {
          title: "The Curse of the Tightrope Dancer",
          text: "A Maharana promised a beautiful tightrope walker (Natni) half his kingdom if she could cross Lake Pichola on a rope. As she reached the middle, the anxious court advisors cut the rope. Before drowning, the dancer cursed the royal house, prophesying that the kingdom would never have direct heirs. Eerily, Mewar went on to adopt many of its subsequent rulers.",
          highlight: "A broken promise and a lake's curse"
        }
      ],
      facts: [
        "Udaipur's lakes are entirely man-made, built to secure water in the dry desert.",
        "The James Bond movie 'Octopussy' was filmed extensively at the Lake Palace.",
        "It houses Sajjangarh, the Monsoon Palace, built high on a hill to watch monsoon clouds."
      ],
      factVsMyth: [
        {
          myth: "Lake Pichola was built by the royal Mewar kings as a pleasure lake.",
          fact: "The lake was actually built by a humble Banjara (grain carrier gypsy) in 14th century. The Banjara needed to cross the river during monsoons to transport grain. The kings only later reinforced the dams and built palaces around it."
        }
      ]
    }
  },
  ajmer: {
    id: "ajmer",
    name: "Ajmer",
    state: "Rajasthan",
    tagline: "The City of Harmony & Devotion",
    themeColor: "#E76F51", // Warm sandy brick
    intro: "Surrounded by the rugged Aravalli mountains, Ajmer is a historical bridge between Hindu and Islamic traditions. Founded by Raja Ajaypal Chauhan in the 7th century, the city is home to the world-famous Sufi shrine of Khwaja Moinuddin Chishti and is the gateway to Pushkar, home to the world's only active Brahma temple.",
    image: "images/ajmer_header.png",
    coordinates: { x: 28, y: 44 },
    stampSymbol: "🕌",
    stampLabel: "AJMER CHISHTI",
    quiz: [
      {
        question: "Which 12th-century Sufi saint's resting place makes Ajmer one of the most visited pilgrimage sites in South Asia?",
        options: [
          "Nizamuddin Auliya",
          "Khwaja Moinuddin Chishti",
          "Salim Chishti",
          "Baba Farid"
        ],
        answer: 1,
        explanation: "Khwaja Moinuddin Chishti, also known as Gharib Nawaz (Benefactor of the Poor), established the Chishti order of Sufism in India, teaching that devotion to God is achieved through service to humanity."
      },
      {
        question: "What unique architectural monument in Ajmer, built by Qutb-ud-din Aibak, was constructed in just two and a half days?",
        options: [
          "Taragarh Fort",
          "Adhai Din Ka Jhonpra (Shed of Two and a Half Days)",
          "Akbari Masjid",
          "Ana Sagar pavilion"
        ],
        answer: 1,
        explanation: "Adhai Din Ka Jhonpra is an ancient mosque built in 1199 CE. According to legend, it was converted from a Sanskrit college in just 60 hours, blending Hindu-Sanskrit masonry with Islamic arches."
      },
      {
        question: "Ajmer is located next to Pushkar. What unique animal trading event is Pushkar famous for globally?",
        options: [
          "The Pushkar Elephant Bazaar",
          "The annual Pushkar Camel Fair (Mela)",
          "The Horse Pageant of Mewar",
          "The Royal Falconry Festival"
        ],
        answer: 1,
        explanation: "The Pushkar Camel Fair is one of the world's largest camel and livestock fairs. It features camel races, trading, and religious bathing in the sacred Pushkar Lake."
      }
    ],
    content: {
      history: "As the capital of the Chauhan dynasty, Ajmer was the seat of Prithviraj Chauhan. It was later conquered by the Delhi Sultanate, Mughals, and British. The Mughals built the Ana Sagar lake and pavilions, and Akbar walked from Agra to Ajmer barefoot as a vow.",
      traditions: "A melting pot of Sufi Qawwali and Hindu bhajan singing. In the Dargah, massive copper cauldrons (Degs) are used to cook sweet rice pudding for thousands of poor visitors daily, funded by donors of all faiths.",
      festivals: "The annual Urs festival commemorates the death anniversary of Khwaja Moinuddin Chishti. During this time, the shrine echoes with round-the-clock Qawwali performances that send listeners into spiritual ecstasy.",
      foodCulture: "Sohan Halwa (a rich, dense, nutty traditional sweet), Kadhi Kachori (spicy pastry crushed and covered in sour chickpea gravy), and Ajmer's famous mutton dishes like Lal Maas and Biryani.",
      artCraft: "Phad painting, leather crafts, and miniature marble sculpting.",
      importantPlaces: [
        { name: "Ajmer Sharif Dargah", desc: "The tomb of Sufi saint Khwaja Moinuddin Chishti, representing spiritual peace." },
        { name: "Adhai Din Ka Jhonpra", desc: "An early Indo-Islamic mosque displaying intricate carved stone pillars." },
        { name: "Ana Sagar Lake", desc: "A scenic man-made lake built by Arnoraja, grandfather of Prithviraj Chauhan." }
      ],
      folkStories: [
        {
          title: "The Qawwali of Devotion",
          text: "Sufi music (Qawwali) in Ajmer began as a way to transcend language barriers. The saints sang in Hindavi, blending Persian poetry with local Indian musical scales. The rhythms of the dholak and hand-claps mimic the beating of the heart, pulling listeners into a trance where the boundaries between the self and the divine completely disappear.",
          highlight: "Sufi music bridging cultural divides",
          image: "images/ajmer_story.png"
        },
        {
          title: "Akbar's Barefoot Pilgrimage",
          text: "Emperor Akbar, desperate for an heir, prayed to the Sufi saint. After his son Salim (Jahangir) was born, the Emperor walked barefoot all the way from Agra to the Dargah in Ajmer (a distance of over 370 kilometers) to pay his respects. He donated a massive brass cauldron (Deg) to feed the poor, a cauldron that is still in use today.",
          highlight: "A barefoot emperor's gratitude"
        }
      ],
      facts: [
        "Pushkar, 15km from Ajmer, has one of the very few temples dedicated to Lord Brahma in the world.",
        "The Dargah attracts millions of pilgrims of all religions, including Hindus and Sikhs.",
        "Ajmer is home to Mayo College, often called the 'Eton of India', built for royalty in 1875."
      ],
      factVsMyth: [
        {
          myth: "Only Muslims are allowed to visit and pray inside the Ajmer Sharif Dargah.",
          fact: "The Dargah is a symbol of universal harmony (Sufism). Over 60% of the daily visitors are non-Muslims who come to offer 'Chadar' (sacred sheets) and seek blessings, embodying the core Chishti value of 'peace with all' (Sulh-i-kul)."
        }
      ]
    }
  }
};
