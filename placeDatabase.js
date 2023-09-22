// placesDatabase.js

const weatherPlaceDB = {
  'Summer and Dry': {
    'Sightseeing': [
      'Great Ocean Road',
      'Philip island',
      'Healesville Sanctuary',
      'Royal Botanic Gardens Cranbourne',
      'Rippon Lea Estate',
      'Wilsons Promontory National Park',
      'St. Kilda Beach',
      'Moonlit Sanctuary Wildlife Conservation Park',
    ],
    'Festivals': [
      'Summer Nights Drone show Fed Square',
      'St. Kilda Festival',
      'Midsumma Festival',
      'Moomba Festival',
      'White Night Melbourne',
    ],
    'Entertainment': [
      'Luna Park',
      'Summer Night Market',
      'Arthurs Seat Eagle Gondola at Mornington',
      'Moonlight Cinema',
      'MPavilion',
      'MSO Sidney Myer Free Concerts',
      'Ron Barassi Senior Park',
    ],
    'Sports': [
      'Kayaking on the Yarra River',
      'Stand-up Paddleboarding on Port Phillip Bay',
      'Docklands Stadium',
      'Horse Racing Flemington',
      'Swim at Melbourne Sports and Aquatic Centre (MSAC)',
      'Surfing at Great Ocean Road',
    ],
  },
  'Summer and Wet': {
    'Sightseeing': [
      'Sea Life Aquarium', 
      'National Sports Museum', 
      'Werribee Mansion', 
      'Como House and Garden', 
      'Rippon Lea Estate', 
      'Melbourne Aquarium', 
      'Eureka Skydeck', 
      'Point Nepean National Park', 
      'Red Hill Lavender Farm', 
      'Auto Museum Arthurs Seat State Park'
      ],
    'Entertainment': [
      'Watch Screenings Fed Square', 
      'iFly Skydiving', 
      'Watch Broadways Princess Theatre', 
      'Scienceworks', 
      'Melbourne Observatory', 
      'Legoland Discovery Centre', 
      'Escape Hunt Melbourne', 
      'Carlton Brewhouse Tour'
      ],
    'Sports': [
      'X-Golf Golf Simulators', 
    'Indoor Tennis at Melbourne Park', 
    'E-sports Bar GG EZ', 
    'Indoor golf park at Holey Moley', 
    'Bowling at WYNCITY Bowl', 
    'Ice Skating at O\'Brien Group Arena',
    'Stand-up Paddleboarding on the Yarra River',
    'Kiteboarding at St. Kilda Beach', 
    'Beach Volleyball at South Melbourne Beach'
    ],
    'Exhibitions': [
      'The Dax Centre', 
      'Australian Sports Museum, The LUME'],
  },
  'Winter and Wet': {
    'Entertainment': [
      'Melbourne Theatre Company',
      'Melbourne Symphony Orchestra',
      "Her Majesty's Theatre",
      'Shrine of Remembrance',
      'Melbourne Planetarium',
    ],
    'Sightseeing': [
      'Melbourne Aquarium',
      'The Comics Lounge (Comedy Club)',
    ],
    'Exhibitions': [
      'Australian Centre for Contemporary Art (ACCA)',
      'Rising: The Wilds',
      'Heide Museum of Modern Art',
    ],
    'Shopping': [
      'Chadstone',
      'Emporium Melbourne',
    ],
  },
  'Winter and Dry': {
    'Entertainment': [
      'ice skating at the ice rink or O\'Brien Group Arena',
      'AFL (Australian Football League) match at MCG',
      'Eureka Skydeck\'s "Edge Experience"'],
    'Sightseeing': [
      'Werribee Mansion',
      'Dandenong Ranges National Park', 
      'Great Alpine Road', 
      'Healesville Sanctuary', 
      'Yarra River Dinner Cruise', 
      'Brighton Beach', 
      'Yarra Valley Wine Tours', 
      'Queen Victoria Market', 
      'State Library of Victoria', 
      'Royal Exhibition Building', 
      'Melbourne Central Shopping Centre'
    ],
    'Festivals': [
      'Winter Night Market', 
      'Melbourne International Comedy Festival', 
      'Melbourne Winter Masterpieces Exhibition at NGV', 
      'Melbourne Food and Wine Festival', 
      'Melbourne Night Noodle Markets'
    ],
    'Sports': [
      'Skiing and snowboarding at Mt Buller', 
      'Snowshoeing and winter hikes in the Dandenong Ranges'],
  },
  'Spring and Dry': {
    'Sightseeing': [
      'Melbourne International Flower and Garden Show',
      'Royal Botanic Gardens',
      'Yarra Valley Wineries in Full Bloom',
      'Grampians National Park',
      'Sorrento Back Beach',
      'Healesville Sanctuary in Spring',
      'Dandenong Ranges Botanic Garden',
      'Macedon Ranges',
    ],
    'Sports': [
      'Hiking in the Grampians National Park',
      'Watch AFL game',
      'Melbourne Cup',
      'Cycling along the Capital City Trail',
      'Rock Climbing in the You Yangs Regional Park',
      'Mountain Biking in Lysterfield Park',
    ],
    'Entertainment': [
      'Yarra Valley wineries',
      'Peninsula Hot Springs',
      'Yarra Valley Chocolaterie & Ice Creamery',
      'Moonlit Sanctuary Wildlife Conservation Park',
      'Port Phillip Bay Dolphin and Seal Sightseeing Cruise',
    ],
    'Festivals': [
      'Melbourne Fringe Festival',
      'Melbourne Writers Festival',
      'Tesselaar\'s Tulip Festival',
      'Melbourne Spring Fashion Week',
      'Melbourne International Flower and Garden Show',
      'Melbourne Spring Fashion Week (MSFW) Runway Shows',
    ],
  },
  'Spring and Wet': {
    'Entertainment': [
      'Melbourne International Comedy Festival', 
      'Legoland Discovery Centre', 
      'Virtual Reality Escape Room near QVM', 
      'Melbourne Star Observation Wheel', 
      'Regent Theatre', 
      'Melbourne Planetarium'
    ],
    'Sports': [
      'Indoor golf park at Holey Moley', 
      'Bowling at WYNCITY Bowl'
    ],
    'Exhibitions': [
      'Scienceworks',
      'Melbourne Museum',
      'National Gallery of Victoria',
      'Healesville Glass Blowing Studio',
      'Scienceworks',
    ],
  },
  'Autumn and Dry': {
    'Sightseeing': [
      'Puffing Billy Railway at Dandenong',
      'Maroondah Reservoir Park',
      'Black Spur Drive',
      'Serendip Sanctuary',
      'Half Moon Bay',
      'Williamstown Bay and River Cruises',
      'Werribee Mansion Garden Tours',
    ],
    'Festivals': [
      'Melbourne Food and Wine Festival',
      'Tesselaar Tulip Festival',
      'Melbourne Fashion Festival',
      'Melbourne International Film Festival',
    ],
    'Entertainment': [
      'Werribee Open Range Zoo', 
      'Maroondah Reservoir Park', 
      'Dandenong Ranges National Park', 
      'Peninsula Picnic at Mornington Peninsula', 
      'Como House and Garden', 
      'Melbourne Symphony Orchestra at the Sidney Myer Music Bowl'
    ],
    'Sports': [
      'Hot air ballooning over the Yarra Valley',
      'Stand-up Paddleboarding on Yarra River',
      'Horseback Riding in the Yarra Valley',
    ],
  },
  'Autumn and Wet': {
    'Entertainment': [
      'Melbourne Recital Centre',
      'Eureka Skydeck',
      'The Butterfly Club (Cabaret & Comedy)',
      'Athenaeum Theatre',
      'The Royal Society of Victoria',
      'Jewish Holocaust Centre',
      'Melbourne Recital Centre',
    ],
    'Sports': [
      'Indoor Cycling at Spin Classes',
    ],
    'Exhibitions': [
      'National Art Gallery of Victoria', 
      'The Ian Potter Centre', 
      'Heide Museum of Modern Art', 
      'Jewish Holocaust Centre', 
      'Australian Centre for Contemporary Art (ACCA)'
    ],
    'Shoping': [
      'Block Arcade', 
      'Chapel Street Shopping Precinct'
    ],
  },
};

  
  export default weatherPlaceDB;  