import { useState, useMemo } from "react";

// ─── MASTER SKILL LIBRARY (merged from all sources) ───────────────────────────
const SKILL_LIBRARY = {
  "📚 Education & Academic": [
    "Mathematics","Algebra","Calculus","Geometry","Statistics","Trigonometry",
    "Physics","Chemistry","Biology","Ecology","Astronomy","Geology",
    "History","World History","Art History","Philosophy","Logic & Critical Thinking",
    "Psychology","Sociology","Anthropology","Political Science","Economics",
    "Literature","Poetry","Creative Writing","Essay Writing & Editing",
    "Academic Research & Research Methods","Public Speaking & Presentation Skills",
    "Debate & Argumentation","Speed Reading","Note-Taking Techniques",
    "Study Skills & Exam Prep","Memory Techniques","Homeschooling",
    "SAT / ACT Prep","GMAT Prep","GRE Prep","LSAT Prep","IELTS Prep","Driving Theory",
    "Financial Literacy & Budgeting Basics","Critical Thinking & Logic Puzzles",
  ],
  "🌍 Languages & Communication": [
    "Spanish","French","German","Italian","Portuguese","Mandarin Chinese",
    "Cantonese","Japanese","Korean","Arabic","Russian","Hindi","Bengali",
    "Urdu","Swahili","Dutch","Swedish","Norwegian","Danish","Finnish",
    "Polish","Czech","Romanian","Greek","Turkish","Vietnamese","Thai",
    "Indonesian","Tagalog","Hebrew","Persian / Farsi","Punjabi","Tamil",
    "Latin","Esperanto","ASL (Sign Language)","British Sign Language",
    "Baby Sign Language",
    "Conversation Practice","Accent Reduction & Pronunciation Coaching",
    "Translation (Written)","Translation (Spoken / Interpretation)",
    "Storytelling & Public Reading","Non-Verbal Communication",
    "Body Language & Active Listening","Business Writing","Blogging",
    "Creative Writing","Business Communication","Email Etiquette",
  ],
  "🎵 Music": [
    "Piano","Classical Guitar","Acoustic Guitar","Electric Guitar","Bass Guitar",
    "Drums","Percussion","Violin","Viola","Cello","Double Bass","Harp",
    "Trumpet","Saxophone","Clarinet","Flute","Oboe","Bassoon","Trombone",
    "Tuba","French Horn","Euphonium","Ukulele","Banjo","Mandolin","Sitar",
    "Accordion","Harmonica","Recorder","Bagpipes","Didgeridoo","Synthesizer",
    "Singing / Vocals","Opera Singing","Choir","A Cappella","Beatboxing","Rap",
    "Vocal Coaching","Songwriting","Music Composition","Music Theory",
    "Ear Training","Music Production","DJing & Music Mixing","Sound Engineering",
    "Mixing & Mastering","Music Notation","Conducting","Music History",
  ],
  "💃 Dance & Performing Arts": [
    "Ballet","Contemporary Dance","Modern Dance","Jazz Dance","Hip Hop Dance",
    "Breakdancing / B-Boying","Salsa","Bachata","Merengue","Cumbia","Tango",
    "Argentine Tango","Waltz","Foxtrot","Swing","Lindy Hop","Ballroom Dance",
    "Tap Dance","Flamenco","Belly Dancing","Bollywood Dance","K-Pop Dance",
    "Pole Dancing","Aerial Silk","Acrobatics","Cheerleading","Zumba",
    "Aerobics","Dance Fitness",
    "Acting","Improv Comedy","Stage Presence & Theater","Stand-Up Comedy",
    "Sketch Comedy","Voice Acting","Audiobook Narration","Mime","Clowning",
    "Puppetry","Street Performance","Magic Tricks & Sleight of Hand",
    "Stage Combat","Storytelling","Slam Poetry","Spoken Word",
  ],
  "⚽ Sports & Fitness": [
    "Soccer / Football","Basketball","Tennis","Badminton","Table Tennis","Squash",
    "Swimming","Water Safety","Diving","Water Polo","Surfing","Kayaking",
    "Canoeing","Rowing","Sailing",
    "Running & Jogging Techniques","Sprint Training","Marathon Training",
    "Cycling","Mountain Biking","Bike Maintenance",
    "Volleyball","Beach Volleyball","Baseball","Softball","Cricket","Rugby",
    "American Football","Hockey","Field Hockey","Ice Hockey","Lacrosse",
    "Golf","Mini-Golf Basics","Archery","Fencing","Shooting Sports","Bowling",
    "Billiards / Pool","Team Sports Coaching",
    "Rock Climbing","Bouldering","Parkour","Skateboarding","Ice Skating",
    "Roller Skating","Snowboarding","Skiing","Gymnastics","Horseback Riding",
    "Scuba Diving","Snorkeling","Hiking & Trail Navigation",
    "Weight Training & Strength Conditioning","Olympic Weightlifting",
    "Powerlifting","CrossFit","HIIT","Calisthenics","Functional Fitness",
    "Bodybuilding","Home Workout Planning (No Equipment)",
    "Stretching & Flexibility Routines","Foam Rolling","Mobility Training",
    "Personal Training","Pilates","Core Strength","Yoga (Hatha)","Yoga (Vinyasa)",
    "Yoga (Restorative)","Yoga (Ashtanga)","Yoga (Kundalini)","Yoga (Yin)",
    "Barre","Tai Chi","Qigong",
  ],
  "🥊 Martial Arts & Combat": [
    "Karate","Taekwondo","Judo","Jiu-Jitsu","Brazilian Jiu-Jitsu","Kung Fu",
    "Muay Thai","Kickboxing","Boxing","Wrestling","Aikido","Hapkido",
    "Krav Maga","Capoeira","Sambo","Sumo","Ninjutsu","Tai Chi for Combat",
  ],
  "🍳 Cooking & Food": [
    "Basic Knife Skills & Meal Prep","Quick Weeknight Dinners",
    "Meal Planning on a Budget","Healthy Eating & Nutrition Planning",
    "Vegetarian Cooking","Vegan Cooking","Gluten-Free Cooking","Raw Food",
    "Italian Cuisine","French Cuisine","Japanese Cuisine","Chinese Cuisine",
    "Indian Cuisine","Mexican Cuisine","Thai Cuisine","Korean Cuisine",
    "Mediterranean Cuisine","Middle Eastern Cuisine","West African Cuisine",
    "Ethiopian Cuisine","Vietnamese Cuisine","Peruvian Cuisine","Spanish Cuisine",
    "Greek Cuisine","American BBQ","Grilling & Smoking","Sushi & Asian Techniques",
    "Soup, Sauce & Stock Making","Ramen Making","Dumpling & Dim Sum",
    "Sourdough Bread","Bread Baking","Pastry Making","Cake Decorating",
    "Cookie Decorating","Chocolate Making","Ice Cream Making",
    "Pasta Making","Pizza Making","Charcuterie",
    "Fermentation & Pickling","Food Preservation (Canning, Dehydrating)",
    "Cheese Making","Beer Brewing","Mead Making",
    "Cocktail Mixing & Bartending","Mocktail Making",
    "Coffee Brewing & Latte Art","Tea Ceremony & Brewing",
    "Wine Tasting","Food Photography",
  ],
  "💻 Technology & Digital Skills": [
    "Python","JavaScript","TypeScript","Java","C","C++","C#","Swift","Kotlin",
    "Go","Rust","PHP","Ruby","R","MATLAB","Scala","Perl","Haskell","Lua",
    "HTML & CSS","React","Vue.js","Angular","Svelte","Next.js","Node.js",
    "Django","Flask","FastAPI","Ruby on Rails","Laravel","Spring Boot",
    "SQL","PostgreSQL","MySQL","MongoDB","Redis","Firebase",
    "Machine Learning","Deep Learning","AI Tool Usage & Prompt Engineering",
    "Data Science","Data Analysis","Data Visualization",
    "Cybersecurity Basics","Password Management","Ethical Hacking",
    "Penetration Testing","Network Security",
    "Cloud Computing (AWS)","Cloud Computing (Azure)","Cloud Computing (GCP)",
    "DevOps","Docker","Kubernetes","Linux","Bash Scripting",
    "iOS App Development","Android App Development","React Native","Flutter",
    "App or Website Building","WordPress","Shopify","Webflow","No-Code Development",
    "Game Development","Unity","Unreal Engine","Godot",
    "Blender (3D)","3D Printing","Arduino","Raspberry Pi","Electronics","Robotics",
    "Blockchain","Web3","Smart Contracts",
    "UI / UX Design","Figma","Adobe XD","Wireframing","Prototyping",
    "Excel & Spreadsheets","Advanced Excel","Google Sheets","PowerPoint",
    "Social Media Management & Content Creation",
    "Photography Editing (Photoshop, Lightroom)",
    "Video Production & YouTube Editing","Podcasting & Audio Editing",
    "SEO","Digital Marketing","Google Ads","Email Marketing",
    "Affiliate Marketing","Content Strategy",
    "Tech Troubleshooting (Phones, Computers, WiFi)",
  ],
  "🎨 Arts & Design": [
    "Pencil Drawing & Sketching","Charcoal Drawing","Ink Drawing",
    "Figure Drawing","Portrait Drawing","Cartoon & Comics","Manga / Anime Art",
    "Perspective Drawing","Watercolor Painting","Oil Painting","Acrylic Painting",
    "Gouache","Pastel Art","Encaustic Painting","Digital Art","Digital Illustration",
    "Procreate","Adobe Illustrator","Adobe Photoshop",
    "Graphic Design","Logo Design","Social Media Graphics",
    "Brand Identity","Typography","Calligraphy","Hand Lettering",
    "Printmaking","Screen Printing","Linocut","Etching","Lithography",
    "Pottery & Ceramics (Hand-Building)","Pottery (Wheel-Throwing)",
    "Sculpting (Clay)","Sculpting (Stone)","Sculpting (Wood)",
    "Glassblowing","Stained Glass","Mosaic Art","Resin Art",
    "Nail Art","Body Painting","Face Painting","Henna / Mehndi","Tattooing",
    "Photography (Portrait)","Photography (Landscape)","Photography (Street)",
    "Photography (Wildlife)","Photography (Macro)","Photography (Food)",
    "Astrophotography","Film Photography","Darkroom",
    "Videography","Filmmaking & Cinematography","Drone Photography",
    "Video Editing (Adobe Premiere)","Video Editing (Final Cut Pro)",
    "After Effects","Motion Graphics","2D Animation","3D Animation","Stop Motion",
  ],
  "✂️ Crafts & Making": [
    "Knitting","Crocheting","Embroidery","Cross-Stitch","Macramé",
    "Weaving","Tapestry","Sewing & Tailoring","Quilting & Fabric Crafts",
    "Costume Making","Jewelry Making","Beading","Wire Wrapping",
    "Silversmithing","Goldsmithing",
    "Woodworking","Woodcarving","Furniture Making & Upcycling",
    "Pyrography (Wood Burning)","Leatherworking","Bookbinding",
    "Origami & Paper Crafts","Card Making","Scrapbooking & Journaling",
    "Candle Making","Soap Making","Perfume Making",
    "Tie-Dye","Fabric Dyeing","Block Printing","Lace Making",
    "Rug Making","Basket Weaving","Model Building",
    "RC Cars & Drones","Laser Cutting","Printmaking",
  ],
  "💼 Business & Professional Skills": [
    "Entrepreneurship","Business Planning","Startup Strategy","Pitch Decks",
    "Personal Finance","Budgeting","Investing (Stocks)","Investing (ETFs)",
    "Real Estate Investing","Cryptocurrency","Options Trading",
    "Accounting","Bookkeeping","Tax Preparation","Financial Modeling",
    "Marketing Strategy","Branding","Sales","Cold Calling","Copywriting",
    "Negotiation","Public Relations","Networking & Small Talk",
    "LinkedIn Optimization","Resume Writing","Cover Letter Writing",
    "Job Interview Prep","Freelancing","Remote Work Best Practices",
    "Time Management & Productivity Systems","Leadership & Team Motivation",
    "Project Management","Agile / Scrum","Legal Basics",
    "Contract Writing","Intellectual Property Basics",
  ],
  "🌱 DIY, Home & Life Skills": [
    "Basic Home Repairs (Plumbing, Electrical, Painting)",
    "Furniture Assembly & Upcycling","Carpentry & Woodworking",
    "Organizing & Decluttering","Laundry & Stain Removal",
    "Sewing Buttons & Simple Mending",
    "Car Maintenance (Oil Change, Tire Repair)","Car Detailing","Basic Mechanics",
    "Bicycle Repair",
    "Gardening & Plant Care (Indoor/Outdoor)","Vegetable Growing",
    "Herb Growing","Flower Arranging","Hydroponics","Aquaponics","Beekeeping",
    "Composting","Eco-Friendly Living & Zero Waste",
    "Knot Tying & Basic Survival Skills","Budget Meal Shopping & Grocery Hacks",
    "Dog Training","Cat Care","Bird Care","Aquarium Keeping",
    "Horse Care","Pet Care & Training",
    "Childcare & Babysitting Tips","Parenting Skills","Teaching Kids",
    "Journaling & Bullet Journaling","Vision Boarding","Life Coaching",
    "Event Planning (Parties & Gatherings)","Wedding Planning",
    "Makeup Application","Hairstyling",
    "Astrology & Tarot Reading Basics","Crystal Healing","Aromatherapy",
    "Genealogy Research","Volunteer Coordination & Community Organizing",
    "Mushroom Foraging","Herbalism & Natural Remedies",
    "Candle Making","Soap Making",
  ],
  "🧘 Health & Wellness": [
    "Meditation","Mindfulness","Breathwork","Pranayama",
    "Stress Management Techniques","Sleep Improvement Habits",
    "Basic First Aid & CPR","Mental Health Awareness",
    "Nutrition Coaching","Massage & Self-Care Routines",
    "Reflexology","Acupressure","Reiki","Sound Healing",
    "Journaling for Wellbeing","Gratitude Practice","Habit Building",
    "CBT Techniques","Emotional Intelligence","Empathy Training",
    "Anger Management","Anxiety Management","Grief Support",
    "Positive Psychology","Stoicism",
    "NLP (Neuro-Linguistic Programming)","Hypnosis Basics",
  ],
  "🏕️ Outdoor & Adventure Skills": [
    "Camping & Wilderness Basics","Bushcraft","Wilderness Survival",
    "Fishing","Foraging","Hunting","Trapping",
    "Kayaking & Canoeing Intro","Sailing Basics",
    "Hiking & Trail Navigation","Backpacking & Packing Light",
    "Rock Climbing (Outdoor)","Navigation & Orienteering","Geocaching",
    "Birdwatching & Nature Identification","Astronomy & Stargazing",
    "Geology & Rock Collecting","Mushroom Foraging",
  ],
  "🎮 Games, Puzzles & Strategy": [
    "Chess","Strategy Board Games","Card Games (Poker, Bridge)",
    "Magic Card Tricks","Board Games & Game Night Hosting",
    "Crossword Puzzles","Sudoku","Rubik's Cube & Speed Cubing",
    "Escape Room Strategies","Video Game Design Basics",
    "Tabletop RPGs (D&D)","Trivia & Quiz Hosting","Puzzle Solving",
  ],
  "🎭 Performance & Media": [
    "Podcasting","Radio Broadcasting","News Anchoring",
    "Screenwriting","Playwriting","Script Analysis",
    "Juggling","Fire Performance","Beatboxing","Rap & Freestyle",
    "Stand-Up Comedy","Improv Comedy",
    "Floral Design","Party Planning","Event Hosting",
    "Escape Room Design",
  ],
};

const ALL_CATEGORIES = Object.keys(SKILL_LIBRARY);
const ALL_SKILLS_FLAT = ALL_CATEGORIES.flatMap(cat =>
  SKILL_LIBRARY[cat].map(s => ({ skill: s, category: cat }))
);

// ─── Explore filter categories ─────────────────────────────────────────────
const EXPLORE_CATS = [
  { id:"all",       label:"All",          emoji:"✦" },
  { id:"academic",  label:"Academic",     emoji:"📚" },
  { id:"languages", label:"Languages",    emoji:"🌍" },
  { id:"music",     label:"Music",        emoji:"🎵" },
  { id:"dance",     label:"Dance & Arts", emoji:"💃" },
  { id:"sports",    label:"Sports",       emoji:"⚽" },
  { id:"martial",   label:"Martial Arts", emoji:"🥊" },
  { id:"cooking",   label:"Cooking",      emoji:"🍳" },
  { id:"tech",      label:"Tech",         emoji:"💻" },
  { id:"arts",      label:"Arts",         emoji:"🎨" },
  { id:"crafts",    label:"Crafts",       emoji:"✂️" },
  { id:"business",  label:"Business",     emoji:"💼" },
  { id:"home",      label:"Home & Life",  emoji:"🌱" },
  { id:"wellness",  label:"Wellness",     emoji:"🧘" },
  { id:"outdoor",   label:"Outdoor",      emoji:"🏕️" },
  { id:"games",     label:"Games",        emoji:"🎮" },
  { id:"performance",label:"Performance", emoji:"🎭" },
];

// ─── Sample listings ───────────────────────────────────────────────────────
const skillsData = [
  { id:1,  name:"Mia Chen",     avatar:"MC", color:"#FF6B6B", offering:"Piano Lessons",         seeking:"Spanish Tutoring",       category:"music",     tags:["Beginner-friendly","1hr sessions"],   rating:4.9, swaps:34, online:true },
  { id:2,  name:"Jordan Lee",   avatar:"JL", color:"#4ECDC4", offering:"Python Coding",          seeking:"Guitar Basics",          category:"tech",      tags:["All levels","Project-based"],         rating:4.8, swaps:21, online:true },
  { id:3,  name:"Sofia Reyes",  avatar:"SR", color:"#FFD93D", offering:"Homemade Pasta",         seeking:"Yoga (Vinyasa)",         category:"cooking",   tags:["Hands-on","Small groups"],            rating:5.0, swaps:18, online:false },
  { id:4,  name:"Marcus Webb",  avatar:"MW", color:"#6BCB77", offering:"Basketball Coaching",    seeking:"Mathematics Tutoring",   category:"sports",    tags:["Outdoor","All ages"],                 rating:4.7, swaps:29, online:true },
  { id:5,  name:"Priya Nair",   avatar:"PN", color:"#A78BFA", offering:"Watercolor Painting",    seeking:"Portrait Photography",   category:"arts",      tags:["Creative","Materials included"],      rating:4.9, swaps:12, online:false },
  { id:6,  name:"Theo Bauer",   avatar:"TB", color:"#FB923C", offering:"French Language",        seeking:"Cocktail Mixing",        category:"languages", tags:["Conversational","Flexible"],          rating:4.6, swaps:41, online:true },
  { id:7,  name:"Aiko Tanaka",  avatar:"AT", color:"#F472B6", offering:"Japanese Cuisine",       seeking:"Ballet Dance",           category:"cooking",   tags:["Authentic","Weekend sessions"],       rating:4.8, swaps:15, online:true },
  { id:8,  name:"Dev Patel",    avatar:"DP", color:"#34D399", offering:"Machine Learning",       seeking:"Music Production",       category:"tech",      tags:["Advanced","Pair coding"],             rating:4.7, swaps:9,  online:false },
  { id:9,  name:"Lena Müller",  avatar:"LM", color:"#60A5FA", offering:"Violin Lessons",         seeking:"Oil Painting",           category:"music",     tags:["Classical","Patient teacher"],        rating:5.0, swaps:22, online:true },
  { id:10, name:"Carlos Vega",  avatar:"CV", color:"#FBBF24", offering:"Salsa Dancing",          seeking:"Web Development",        category:"dance",     tags:["Fun","Partner welcome"],              rating:4.9, swaps:37, online:true },
  { id:11, name:"Sam Wright",   avatar:"SW", color:"#F87171", offering:"Essay Writing & Editing",seeking:"Baking (Bread)",         category:"academic",  tags:["University level","Online ok"],       rating:4.7, swaps:14, online:true },
  { id:12, name:"Yuki Park",    avatar:"YP", color:"#818CF8", offering:"Meditation",             seeking:"Digital Illustration",   category:"wellness",  tags:["Beginner-friendly","Virtual ok"],     rating:4.9, swaps:28, online:false },
  { id:13, name:"Omar Hassan",  avatar:"OH", color:"#2DD4BF", offering:"Chess",                  seeking:"Running Coaching",       category:"games",     tags:["Strategy","All ages"],                rating:4.8, swaps:19, online:true },
  { id:14, name:"Rina Flores",  avatar:"RF", color:"#FB7185", offering:"Knitting",               seeking:"Korean Language",        category:"crafts",    tags:["Cozy","Materials shared"],            rating:5.0, swaps:11, online:false },
  { id:15, name:"Jake Turner",  avatar:"JT", color:"#A3E635", offering:"Camping & Survival",     seeking:"Graphic Design",         category:"outdoor",   tags:["Outdoor","Hands-on"],                 rating:4.6, swaps:7,  online:true },
];

const messagesData = [
  { id:1, from:"Mia Chen",    avatar:"MC", color:"#FF6B6B", text:"Hey! I saw you're looking for piano lessons 🎹", time:"2m ago",  unread:true },
  { id:2, from:"Jordan Lee",  avatar:"JL", color:"#4ECDC4", text:"Session confirmed for Saturday at 3pm!",          time:"1h ago",  unread:true },
  { id:3, from:"Sofia Reyes", avatar:"SR", color:"#FFD93D", text:"Thanks for the yoga tip! Want to swap again?",     time:"3h ago",  unread:false },
];

const privacyItems = [
  { id:"location", label:"Location",      desc:"Helps match nearby swappers",        icon:"📍" },
  { id:"email",    label:"Email address", desc:"For session confirmations",           icon:"✉️" },
  { id:"realname", label:"Real name",     desc:"Shown on your public profile",        icon:"👤" },
  { id:"photo",    label:"Profile photo", desc:"Makes your profile more trusted",     icon:"🖼️" },
];

// ─── CSS ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{display:none;}
  .ss{font-family:'Syne',sans-serif;background:#0F0F14;min-height:100vh;color:#F0EEF8;display:flex;flex-direction:column;max-width:430px;margin:0 auto;position:relative;}
  .card{background:#1A1A24;border-radius:18px;border:1px solid #2A2A38;transition:transform .18s;}
  .card:hover{transform:translateY(-2px);}
  .pill{background:#252534;border-radius:100px;padding:3px 9px;font-size:10px;color:#9B9BB8;font-family:'DM Sans',sans-serif;}
  .tab-btn{flex:1;padding:11px;background:none;border:none;color:#5C5C7A;font-family:'Syne',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:color .2s;display:flex;flex-direction:column;align-items:center;gap:3px;}
  .tab-btn.active{color:#C084FC;}
  .cat-btn{padding:7px 13px;border-radius:100px;border:1px solid #2A2A38;background:#1A1A24;color:#9B9BB8;font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;white-space:nowrap;transition:all .2s;flex-shrink:0;}
  .cat-btn.active{background:#C084FC;border-color:#C084FC;color:#0F0F14;font-weight:600;}
  .cta{background:linear-gradient(135deg,#C084FC,#818CF8);border:none;border-radius:14px;padding:14px;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:opacity .2s;width:100%;}
  .cta:hover{opacity:.87;}
  .cta:disabled{opacity:.35;cursor:not-allowed;}
  .cta-ghost{background:none;border:1.5px solid #2A2A38;border-radius:14px;padding:13px;color:#9B9BB8;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;width:100%;}
  .cta-ghost:hover{border-color:#C084FC55;color:#C084FC;}
  .cta-sm{background:linear-gradient(135deg,#C084FC,#818CF8);border:none;border-radius:10px;padding:8px 14px;color:white;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;}
  .ss-input{background:#1A1A24;border:1.5px solid #2A2A38;border-radius:14px;padding:12px 16px;color:#F0EEF8;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .2s;}
  .ss-input::placeholder{color:#4A4A62;}
  .ss-input:focus{border-color:#C084FC77;}
  .toggle{width:44px;height:24px;border-radius:100px;border:none;cursor:pointer;position:relative;transition:background .25s;flex-shrink:0;}
  .toggle-thumb{position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:white;transition:left .25s;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(12px);z-index:60;display:flex;align-items:flex-end;justify-content:center;}
  .sheet{background:#1A1A24;border-radius:28px 28px 0 0;padding:24px;width:100%;max-width:430px;border:1px solid #2A2A38;max-height:92vh;overflow-y:auto;}
  .priv-row{display:flex;align-items:center;gap:12px;padding:13px 14px;background:#1A1A24;border-radius:14px;border:1px solid #2A2A38;}
  .skill-chip{padding:8px 13px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;transition:all .18s;border:1.5px solid #2A2A38;background:#1A1A24;color:#9B9BB8;white-space:nowrap;}
  .skill-chip:hover{border-color:#C084FC55;color:#D0A0FF;}
  .skill-chip.selected{background:#2D1F3D;border-color:#C084FC;color:#C084FC;font-weight:600;}
  .cat-header{font-size:9px;color:#5C5C7A;font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:2px;font-weight:700;padding:4px 0 8px;margin-top:6px;}
  .count-badge{background:#C084FC22;border:1px solid #C084FC55;border-radius:100px;padding:2px 9px;font-size:10px;color:#C084FC;font-family:'DM Sans',sans-serif;font-weight:600;}
  .free-tag{background:#1A2A1A;border:1px solid #2A4A2A;border-radius:100px;padding:2px 9px;font-size:10px;color:#6BCB77;font-family:'DM Sans',sans-serif;font-weight:600;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .3s ease both;}
  .tag-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;}
`;

// ─── Shared ─────────────────────────────────────────────────────────────────
function Av({i,c,size=44,r=13,online}){
  return(
    <div style={{position:"relative",flexShrink:0}}>
      <div style={{width:size,height:size,borderRadius:r,background:c+"28",border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.27,fontWeight:800,color:c}}>{i}</div>
      {online&&<div style={{position:"absolute",bottom:-2,right:-2,width:10,height:10,borderRadius:"50%",background:"#6BCB77",border:"2px solid #1A1A24"}}/>}
    </div>
  );
}
function Toggle({on,onChange}){return(<button className="toggle" style={{background:on?"#C084FC":"#2A2A38"}} onClick={()=>onChange(!on)}><div className="toggle-thumb" style={{left:on?23:3}}/></button>);}
function PrivBadge(){return(<span style={{display:"inline-flex",alignItems:"center",gap:5,background:"#0F1F0F",border:"1px solid #2A4A2A",borderRadius:100,padding:"3px 10px"}}><span style={{fontSize:10}}>🔒</span><span style={{fontSize:10,color:"#6BCB77",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Privacy-first</span></span>);}

// ─── Skill Picker ─────────────────────────────────────────────────────────
function SkillPicker({selected,onChange,maxH="48vh"}){
  const [q,setQ]=useState("");
  const [activeCat,setActiveCat]=useState("all");

  const filtered=useMemo(()=>{
    if(q.trim()) return ALL_SKILLS_FLAT.filter(s=>s.skill.toLowerCase().includes(q.toLowerCase()));
    if(activeCat==="all") return null;
    return ALL_SKILLS_FLAT.filter(s=>s.category===activeCat);
  },[q,activeCat]);

  const toggle=skill=>onChange(prev=>prev.includes(skill)?prev.filter(x=>x!==skill):[...prev,skill]);

  return(
    <div>
      <div style={{position:"relative",marginBottom:11}}>
        <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#4A4A62"}}>🔍</div>
        <input className="ss-input" style={{paddingLeft:40,fontSize:13}} placeholder={`Search ${ALL_SKILLS_FLAT.length}+ skills...`} value={q} onChange={e=>setQ(e.target.value)}/>
      </div>

      {!q&&(
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:3}}>
          <button className={`cat-btn ${activeCat==="all"?"active":""}`} onClick={()=>setActiveCat("all")}>✦ All</button>
          {ALL_CATEGORIES.map(cat=><button key={cat} className={`cat-btn ${activeCat===cat?"active":""}`} onClick={()=>setActiveCat(cat)}>{cat}</button>)}
        </div>
      )}

      {selected.length>0&&(
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span className="count-badge">{selected.length} selected</span>
          <button onClick={()=>onChange([])} style={{background:"none",border:"none",color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",fontSize:11,cursor:"pointer"}}>Clear all</button>
        </div>
      )}

      <div style={{maxHeight:maxH,overflowY:"auto",paddingRight:2}}>
        {filtered===null?(
          Object.entries(SKILL_LIBRARY).map(([cat,skills])=>(
            <div key={cat}>
              <div className="cat-header">{cat}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
                {skills.map(s=><button key={s} className={`skill-chip ${selected.includes(s)?"selected":""}`} onClick={()=>toggle(s)}>{s}</button>)}
              </div>
            </div>
          ))
        ):(
          <div>
            {filtered.length===0
              ?<div style={{fontSize:13,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",padding:"20px 0"}}>No skills found for "{q}" — you can add it as a custom skill.</div>
              :<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {filtered.map(({skill})=><button key={skill} className={`skill-chip ${selected.includes(skill)?"selected":""}`} onClick={()=>toggle(skill)}>{skill}</button>)}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Onboarding ────────────────────────────────────────────────────────────
function Welcome({go}){
  return(
    <div className="fu" style={{flex:1,display:"flex",flexDirection:"column",padding:"60px 28px 40px",justifyContent:"space-between"}}>
      <div>
        <div style={{width:60,height:60,borderRadius:18,background:"linear-gradient(135deg,#C084FC18,#818CF818)",border:"1.5px solid #C084FC33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:22}}>⇄</div>
        <div style={{fontSize:10,color:"#C084FC",fontWeight:700,letterSpacing:3,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}>FREE · COMMUNITY</div>
        <div style={{fontSize:34,fontWeight:800,lineHeight:1.1,marginBottom:14}}>Skill<span style={{color:"#C084FC"}}>Swap</span></div>
        <div style={{fontSize:15,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",lineHeight:1.65,marginBottom:28}}>Trade what you know for what you want to learn. No money. No algorithms. Just people.</div>
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          {[
            ["📚",`${ALL_SKILLS_FLAT.length}+ skills across ${ALL_CATEGORIES.length} categories`],
            ["🔒","Your data stays yours — share only what you choose"],
            ["🌙","In-person or virtual swaps, one-off or ongoing"],
            ["✦","100% free, always"],
          ].map(([icon,text])=>(
            <div key={text} style={{display:"flex",gap:11,alignItems:"center"}}>
              <div style={{width:34,height:34,borderRadius:10,background:"#1A1A24",border:"1px solid #2A2A38",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{icon}</div>
              <div style={{fontSize:13,color:"#C0C0D8",fontFamily:"'DM Sans',sans-serif"}}>{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:32}}>
        <button className="cta" onClick={()=>go("create")}>Create Free Account</button>
        <button className="cta-ghost" onClick={()=>go("login")}>Sign In</button>
        <button onClick={()=>go("app")} style={{background:"none",border:"none",color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",padding:"8px"}}>Browse without an account →</button>
      </div>
    </div>
  );
}

function CreateAccount({go}){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [showPass,setShowPass]=useState(false);
  const valid=username.trim().length>=3&&password.length>=6;
  return(
    <div className="fu" style={{flex:1,display:"flex",flexDirection:"column",padding:"54px 28px 40px",overflowY:"auto"}}>
      <button onClick={()=>go("welcome")} style={{background:"none",border:"none",color:"#9B9BB8",fontSize:20,cursor:"pointer",alignSelf:"flex-start",marginBottom:26,padding:0}}>←</button>
      <PrivBadge/>
      <div style={{fontSize:24,fontWeight:800,marginTop:12,marginBottom:8}}>Create your account</div>
      <div style={{fontSize:13,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",lineHeight:1.65,marginBottom:20}}>Just a <strong style={{color:"#C084FC"}}>username & password</strong> — that's all we ever need. No email, no phone required.</div>
      <div style={{background:"#0F1F0F",border:"1px solid #1E3A1E",borderRadius:14,padding:13,marginBottom:22,display:"flex",gap:10}}>
        <span style={{fontSize:16,flexShrink:0}}>🌱</span>
        <div style={{fontSize:12,color:"#6BCB77",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>We collect <strong>zero personal data</strong> at signup. You decide later what, if anything, to share — and always on your terms.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
        <div>
          <label style={{fontSize:10,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,display:"block",marginBottom:7}}>Username</label>
          <input className="ss-input" placeholder="e.g. coolpianist42" value={username} onChange={e=>setUsername(e.target.value)}/>
          <div style={{fontSize:11,color:"#4A4A62",fontFamily:"'DM Sans',sans-serif",marginTop:5}}>Your public handle. Keep it non-identifying if you prefer.</div>
        </div>
        <div>
          <label style={{fontSize:10,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,display:"block",marginBottom:7}}>Password</label>
          <div style={{position:"relative"}}>
            <input className="ss-input" type={showPass?"text":"password"} placeholder="6+ characters" value={password} onChange={e=>setPassword(e.target.value)} style={{paddingRight:48}}/>
            <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:15,color:"#5C5C7A"}}>{showPass?"🙈":"👁️"}</button>
          </div>
        </div>
      </div>
      <div style={{marginTop:"auto",display:"flex",flexDirection:"column",gap:10}}>
        <button className="cta" disabled={!valid} onClick={()=>go("privacy")}>Continue →</button>
        <div style={{fontSize:11,color:"#3A3A52",fontFamily:"'DM Sans',sans-serif",textAlign:"center",lineHeight:1.6}}>By continuing you agree to our Terms. We will never sell your data.</div>
      </div>
    </div>
  );
}

function PrivacySetup({go}){
  const [s,setS]=useState({location:false,email:false,realname:false,photo:false});
  const toggle=id=>setS(p=>({...p,[id]:!p[id]}));
  const anyOn=Object.values(s).some(Boolean);
  return(
    <div className="fu" style={{flex:1,display:"flex",flexDirection:"column",padding:"54px 28px 40px",overflowY:"auto"}}>
      <button onClick={()=>go("create")} style={{background:"none",border:"none",color:"#9B9BB8",fontSize:20,cursor:"pointer",alignSelf:"flex-start",marginBottom:26,padding:0}}>←</button>
      <PrivBadge/>
      <div style={{fontSize:24,fontWeight:800,marginTop:12,marginBottom:8}}>Your data, your choice</div>
      <div style={{fontSize:13,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",lineHeight:1.65,marginBottom:22}}>Everything below is <strong style={{color:"#F0EEF8"}}>optional</strong>. You can skip all of it and change your mind any time.</div>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:20}}>
        {privacyItems.map(item=>(
          <div key={item.id} className="priv-row">
            <div style={{width:38,height:38,borderRadius:11,background:"#252534",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{item.label}</div><div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif"}}>{item.desc}</div></div>
            <Toggle on={s[item.id]} onChange={()=>toggle(item.id)}/>
          </div>
        ))}
      </div>
      <div style={{background:"#0F1525",border:"1px solid #1E2A3A",borderRadius:14,padding:12,marginBottom:22,display:"flex",gap:10}}>
        <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
        <div style={{fontSize:12,color:"#818CF8",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>Adjust these any time in <strong>Profile → Privacy Settings</strong>. Data is only shared with users you initiate a swap with.</div>
      </div>
      <div style={{marginTop:"auto",display:"flex",flexDirection:"column",gap:10}}>
        <button className="cta" onClick={()=>go("skills")}>{anyOn?"Save & Continue →":"Continue with minimum data →"}</button>
        <button className="cta-ghost" onClick={()=>go("skills")}>Skip all for now</button>
      </div>
    </div>
  );
}

function PickSkills({go}){
  const [offering,setOffering]=useState([]);
  const [seeking,setSeeking]=useState([]);
  const [mode,setMode]=useState("offering");
  return(
    <div className="fu" style={{flex:1,display:"flex",flexDirection:"column",padding:"54px 28px 36px",overflowY:"auto"}}>
      <button onClick={()=>go("privacy")} style={{background:"none",border:"none",color:"#9B9BB8",fontSize:20,cursor:"pointer",alignSelf:"flex-start",marginBottom:20,padding:0}}>←</button>
      <div style={{fontSize:23,fontWeight:800,marginBottom:6}}>Your skills</div>
      <div style={{fontSize:13,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,marginBottom:16}}>{ALL_SKILLS_FLAT.length}+ skills across {ALL_CATEGORIES.length} categories. Pick what you <strong style={{color:"#C084FC"}}>offer</strong> and what you <strong style={{color:"#6BCB77"}}>want to learn</strong>.</div>

      {/* Mode toggle */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[["offering","I can teach","#C084FC"],["seeking","I want to learn","#6BCB77"]].map(([id,label,color])=>(
          <button key={id} onClick={()=>setMode(id)} style={{flex:1,padding:"10px",borderRadius:12,border:`1.5px solid ${mode===id?color:"#2A2A38"}`,background:mode===id?color+"22":"#1A1A24",color:mode===id?color:"#5C5C7A",fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s"}}>
            {label} {mode===id&&(id==="offering"?offering.length:seeking.length)>0?`(${(id==="offering"?offering:seeking).length})`:""} 
          </button>
        ))}
      </div>

      {mode==="offering"
        ?<SkillPicker selected={offering} onChange={setOffering} maxH="40vh"/>
        :<SkillPicker selected={seeking} onChange={setSeeking} maxH="40vh"/>
      }

      <div style={{marginTop:18,display:"flex",flexDirection:"column",gap:10}}>
        <button className="cta" onClick={()=>go("done")}>
          {offering.length+seeking.length>0?`Save ${offering.length+seeking.length} skill${offering.length+seeking.length>1?"s":""} & Finish →`:"Skip & Finish →"}
        </button>
        <div style={{fontSize:11,color:"#4A4A62",fontFamily:"'DM Sans',sans-serif",textAlign:"center"}}>You can add and edit skills any time from your profile.</div>
      </div>
    </div>
  );
}

function Done({go}){
  return(
    <div className="fu" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center"}}>
      <div style={{width:76,height:76,borderRadius:22,background:"linear-gradient(135deg,#C084FC,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,marginBottom:22}}>⇄</div>
      <div style={{fontSize:28,fontWeight:800,marginBottom:10}}>You're in! 🎉</div>
      <div style={{fontSize:14,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",lineHeight:1.7,marginBottom:36}}>Welcome to SkillSwap. You only share data when <em>you</em> decide to. Your privacy is always in your hands.</div>
      <button className="cta" onClick={()=>go("app")}>Start Exploring →</button>
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
function Explore({saved,toggleSave,onRequest}){
  const [cat,setCat]=useState("all");
  const [q,setQ]=useState("");
  const filtered=skillsData.filter(s=>(cat==="all"||s.category===cat)&&(!q||[s.offering,s.seeking,s.name].some(f=>f.toLowerCase().includes(q.toLowerCase()))));
  return(
    <div style={{padding:"0 18px"}}>
      <div style={{position:"relative",marginBottom:14}}>
        <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#4A4A62"}}>🔍</div>
        <input className="ss-input" style={{paddingLeft:40}} placeholder="Search skills or people..." value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div style={{display:"flex",gap:7,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
        {EXPLORE_CATS.map(c=><button key={c.id} className={`cat-btn ${cat===c.id?"active":""}`} onClick={()=>setCat(c.id)}>{c.emoji} {c.label}</button>)}
      </div>
      {cat==="all"&&!q&&(
        <>
          <div style={{background:"linear-gradient(135deg,#2D1F3D,#1F2035)",borderRadius:18,padding:18,marginBottom:13,border:"1px solid #3D2F5D",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,#C084FC1A,transparent)"}}/>
            <div style={{fontSize:9,color:"#C084FC",fontWeight:700,letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>✦ COMMUNITY · FREE</div>
            <div style={{fontSize:16,fontWeight:700,marginBottom:3}}>Share what you know,<br/>learn what you love.</div>
            <div style={{fontSize:12,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>{ALL_SKILLS_FLAT.length}+ skills across {ALL_CATEGORIES.length} categories</div>
            <div className="tag-row" style={{marginBottom:13}}>
              {["Evening-friendly","Beginner-friendly","Virtual ok","Hands-on"].map(t=><span key={t} className="pill">{t}</span>)}
            </div>
            <button className="cta-sm" style={{fontSize:11,padding:"6px 13px"}}>Browse Matches →</button>
          </div>
          <div style={{display:"flex",gap:9,marginBottom:16}}>
            {[["1.2k","Swappers"],[`${ALL_SKILLS_FLAT.length}+`,"Skills"],[`${ALL_CATEGORIES.length}`,"Categories"],["100%","Free"]].map(([v,l])=>(
              <div key={l} style={{flex:1,background:"#1A1A24",borderRadius:12,padding:"10px 7px",textAlign:"center",border:"1px solid #2A2A38"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#C084FC"}}>{v}</div>
                <div style={{fontSize:9,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>{filtered.length} listing{filtered.length!==1?"s":""}</div>
      <div style={{display:"flex",flexDirection:"column",gap:11,paddingBottom:16}}>
        {filtered.map(sk=>(
          <div key={sk.id} className="card" style={{padding:15}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <Av i={sk.avatar} c={sk.color} online={sk.online}/>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{sk.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:3}}>
                    <span style={{color:"#FFD93D",fontSize:10}}>{"★".repeat(Math.floor(sk.rating))}</span>
                    <span style={{fontSize:10,color:"#9B9BB8",fontFamily:"'DM Sans',sans-serif"}}>{sk.rating} · {sk.swaps} swaps</span>
                  </div>
                </div>
              </div>
              <button style={{background:saved.includes(sk.id)?"#2D1F3D":"#252534",border:`1px solid ${saved.includes(sk.id)?"#C084FC":"#2A2A38"}`,borderRadius:9,padding:"8px 10px",cursor:"pointer",fontSize:14}} onClick={()=>toggleSave(sk.id)}>{saved.includes(sk.id)?"💜":"🤍"}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:7,alignItems:"center",marginBottom:11}}>
              <div style={{background:"#252534",borderRadius:10,padding:"8px 10px"}}><div style={{fontSize:8,color:"#5C5C7A",textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>OFFERS</div><div style={{fontSize:12,fontWeight:700}}>{sk.offering}</div></div>
              <div style={{fontSize:14,color:"#5C5C7A"}}>⇄</div>
              <div style={{background:"#252534",borderRadius:10,padding:"8px 10px"}}><div style={{fontSize:8,color:"#C084FC",textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>WANTS</div><div style={{fontSize:12,fontWeight:700}}>{sk.seeking}</div></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{sk.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
              <button className="cta-sm" onClick={()=>onRequest(sk)}>Request</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages(){
  return(
    <div style={{padding:"0 18px"}}>
      <div style={{fontSize:20,fontWeight:800,marginBottom:18}}>Messages</div>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:22}}>
        {messagesData.map(m=>(
          <div key={m.id} style={{background:"#1A1A24",borderRadius:14,border:"1px solid #2A2A38",padding:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
            <div style={{position:"relative",flexShrink:0}}>
              <Av i={m.avatar} c={m.color}/>
              {m.unread&&<div style={{position:"absolute",top:-3,right:-3,width:9,height:9,borderRadius:"50%",background:"#C084FC",border:"2px solid #1A1A24"}}/>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:700,fontSize:13}}>{m.from}</div><div style={{fontSize:10,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif"}}>{m.time}</div></div>
              <div style={{fontSize:12,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",marginBottom:10,textTransform:"uppercase",letterSpacing:1.5,fontWeight:700}}>Active Swaps</div>
      {[{name:"Piano ↔ Spanish",partner:"Mia Chen",color:"#FF6B6B",p:70},{name:"Python ↔ Guitar",partner:"Jordan Lee",color:"#4ECDC4",p:40}].map(s=>(
        <div key={s.name} className="card" style={{padding:13,marginBottom:9}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}><div style={{fontWeight:700,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:"#9B9BB8",fontFamily:"'DM Sans',sans-serif"}}>with {s.partner}</div></div>
          <div style={{background:"#252534",borderRadius:100,height:5}}><div style={{width:`${s.p}%`,height:"100%",borderRadius:100,background:`linear-gradient(90deg,${s.color},#C084FC)`}}/></div>
          <div style={{fontSize:10,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",marginTop:5}}>{s.p}% complete</div>
        </div>
      ))}
    </div>
  );
}

function Profile({saved,onPrivacy,onEditSkills}){
  return(
    <div style={{padding:"0 18px"}}>
      <div style={{textAlign:"center",padding:"14px 0 20px"}}>
        <div style={{width:68,height:68,borderRadius:20,background:"linear-gradient(135deg,#C084FC28,#818CF828)",border:"2px solid #C084FC44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:"#C084FC",margin:"0 auto 10px"}}>YOU</div>
        <div style={{fontSize:17,fontWeight:800}}>Your Profile</div>
        <div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",marginTop:2}}>Anonymous · Free Account</div>
        <div style={{marginTop:9}}><PrivBadge/></div>
        <div style={{display:"flex",justifyContent:"center",gap:18,marginTop:14}}>
          {[["0","Swaps"],["0","Skills"],["—","Rating"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#C084FC"}}>{v}</div><div style={{fontSize:9,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif"}}>{l}</div></div>
          ))}
        </div>
      </div>
      <button className="cta" style={{marginBottom:11}} onClick={onEditSkills}>+ Add / Edit Your Skills</button>
      <div onClick={onPrivacy} style={{background:"#0F1F0F",border:"1px solid #1E3A1E",borderRadius:14,padding:"13px 14px",marginBottom:11,display:"flex",gap:11,alignItems:"center",cursor:"pointer"}}>
        <div style={{width:36,height:36,borderRadius:10,background:"#1A2F1A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🔒</div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:"#6BCB77"}}>Privacy Settings</div><div style={{fontSize:11,color:"#3A6A3A",fontFamily:"'DM Sans',sans-serif"}}>Control exactly what you share</div></div>
        <div style={{color:"#3A6A3A",fontSize:17}}>›</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {[["🎓","My Skills",`Manage your ${ALL_SKILLS_FLAT.length}+ skill options`],["📅","Schedule","View upcoming sessions"],["💜","Saved",`${saved.length} skills saved`],["⚙️","Settings","Account preferences"]].map(([icon,title,sub])=>(
          <div key={title} className="card" style={{padding:"13px 14px",display:"flex",alignItems:"center",gap:11,cursor:"pointer"}}>
            <div style={{fontSize:17}}>{icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{title}</div><div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif"}}>{sub}</div></div>
            <div style={{color:"#3A3A52",fontSize:17}}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sheets ────────────────────────────────────────────────────────────────
function PrivacySheet({onClose}){
  const [s,setS]=useState({location:false,email:false,realname:false,photo:false});
  const toggle=id=>setS(p=>({...p,[id]:!p[id]}));
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div style={{width:38,height:4,borderRadius:2,background:"#2A2A38",margin:"0 auto 20px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:6}}><span style={{fontSize:20}}>🔒</span><div style={{fontSize:19,fontWeight:800}}>Privacy Settings</div></div>
        <div style={{fontSize:13,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",marginBottom:20,lineHeight:1.6}}>You're in full control. Shared data is only visible to users you initiate a swap with — never sold or used for ads.</div>
        <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:20}}>
          {privacyItems.map(item=>(
            <div key={item.id} className="priv-row">
              <div style={{width:38,height:38,borderRadius:11,background:"#252534",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{item.label}</div><div style={{fontSize:11,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif"}}>{item.desc}</div></div>
              <Toggle on={s[item.id]} onChange={()=>toggle(item.id)}/>
            </div>
          ))}
        </div>
        <div style={{background:"#0F1525",border:"1px solid #1E2A3A",borderRadius:13,padding:12,marginBottom:18,fontSize:12,color:"#818CF8",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>ℹ️ &nbsp;You can revoke access at any time. Revoking removes data from your profile immediately.</div>
        <button className="cta" onClick={onClose}>Save Settings</button>
      </div>
    </div>
  );
}

function EditSkillsSheet({onClose}){
  const [offering,setOffering]=useState([]);
  const [seeking,setSeeking]=useState([]);
  const [mode,setMode]=useState("offering");
  const [customSkill,setCustomSkill]=useState("");

  const addCustom=()=>{
    if(!customSkill.trim()) return;
    if(mode==="offering") setOffering(p=>[...p,customSkill.trim()]);
    else setSeeking(p=>[...p,customSkill.trim()]);
    setCustomSkill("");
  };

  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div style={{width:38,height:4,borderRadius:2,background:"#2A2A38",margin:"0 auto 18px"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <div style={{fontSize:19,fontWeight:800}}>Add Skills</div>
          <div style={{display:"flex",gap:6}}>
            {offering.length>0&&<span className="count-badge">✦ {offering.length}</span>}
            {seeking.length>0&&<span style={{background:"#6BCB7722",border:"1px solid #6BCB7755",borderRadius:100,padding:"2px 9px",fontSize:10,color:"#6BCB77",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>🎓 {seeking.length}</span>}
          </div>
        </div>
        <div style={{fontSize:13,color:"#8888AA",fontFamily:"'DM Sans',sans-serif",marginBottom:14,lineHeight:1.5}}>Browse <strong style={{color:"#F0EEF8"}}>{ALL_SKILLS_FLAT.length}+ skills</strong> across {ALL_CATEGORIES.length} categories — or add your own.</div>

        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[["offering","I can teach 📣","#C084FC"],["seeking","I want to learn 🎓","#6BCB77"]].map(([id,label,color])=>(
            <button key={id} onClick={()=>setMode(id)} style={{flex:1,padding:"10px 6px",borderRadius:12,border:`1.5px solid ${mode===id?color:"#2A2A38"}`,background:mode===id?color+"22":"#1A1A24",color:mode===id?color:"#5C5C7A",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s"}}>
              {label}
            </button>
          ))}
        </div>

        <SkillPicker selected={mode==="offering"?offering:seeking} onChange={mode==="offering"?setOffering:setSeeking} maxH="38vh"/>

        {/* Custom skill input */}
        <div style={{marginTop:14,marginBottom:4}}>
          <div style={{fontSize:10,color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,marginBottom:8}}>Can't find yours? Add a custom skill</div>
          <div style={{display:"flex",gap:8}}>
            <input className="ss-input" style={{flex:1,fontSize:13}} placeholder="e.g. Klingon Language" value={customSkill} onChange={e=>setCustomSkill(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustom()}/>
            <button className="cta-sm" onClick={addCustom} style={{flexShrink:0}}>Add</button>
          </div>
        </div>

        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:9}}>
          <button className="cta" onClick={onClose}>{offering.length+seeking.length>0?`Save ${offering.length+seeking.length} skill${offering.length+seeking.length>1?"s":""}`:""||"Done"}</button>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",padding:"8px",textAlign:"center"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function RequestSheet({skill,onClose}){
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div style={{width:38,height:4,borderRadius:2,background:"#2A2A38",margin:"0 auto 20px"}}/>
        <div style={{display:"flex",gap:11,alignItems:"center",marginBottom:16}}>
          <Av i={skill.avatar} c={skill.color} size={48} r={14}/>
          <div><div style={{fontWeight:800,fontSize:16}}>{skill.name}</div><div style={{fontSize:11,color:"#9B9BB8",fontFamily:"'DM Sans',sans-serif"}}>{skill.swaps} successful swaps</div></div>
        </div>
        <div style={{background:"#252534",borderRadius:13,padding:13,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:8,color:"#5C5C7A",textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif"}}>OFFERING</div><div style={{fontWeight:700,fontSize:14}}>{skill.offering}</div></div>
            <div style={{fontSize:18}}>⇄</div>
            <div style={{textAlign:"right"}}><div style={{fontSize:8,color:"#C084FC",textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif"}}>WANTS</div><div style={{fontWeight:700,fontSize:14}}>{skill.seeking}</div></div>
          </div>
        </div>
        <div style={{background:"#0F1F0F",border:"1px solid #1E3A1E",borderRadius:13,padding:12,marginBottom:18,display:"flex",gap:9}}>
          <span style={{fontSize:15}}>🔒</span>
          <div style={{fontSize:12,color:"#6BCB77",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>Sending a request only shares your <strong>username</strong>. No personal data is revealed until you both agree to swap.</div>
        </div>
        <button className="cta" onClick={onClose}>✦ Send Swap Request</button>
        <button onClick={onClose} style={{width:"100%",padding:11,background:"none",border:"none",color:"#5C5C7A",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",marginTop:7}}>Cancel</button>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("welcome");
  const [tab,setTab]=useState("explore");
  const [saved,setSaved]=useState([]);
  const [reqCard,setReqCard]=useState(null);
  const [showPrivacy,setShowPrivacy]=useState(false);
  const [showEditSkills,setShowEditSkills]=useState(false);

  const toggleSave=id=>setSaved(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const go=s=>setScreen(s);

  const onboard={
    welcome:<Welcome go={go}/>,
    create:<CreateAccount go={go}/>,
    login:<CreateAccount go={go}/>,
    privacy:<PrivacySetup go={go}/>,
    skills:<PickSkills go={go}/>,
    done:<Done go={go}/>,
  };

  if(screen!=="app"){
    return(
      <div className="ss"><style>{css}</style>
        <div style={{position:"fixed",top:-80,right:-80,width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,#C084FC08,transparent)",pointerEvents:"none"}}/>
        {onboard[screen]}
      </div>
    );
  }

  return(
    <div className="ss"><style>{css}</style>
      <div style={{position:"fixed",top:-80,right:-80,width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,#C084FC08,transparent)",pointerEvents:"none"}}/>

      <div style={{padding:"48px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div>
          <div style={{fontSize:9,color:"#C084FC",fontWeight:700,letterSpacing:3,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>FREE · COMMUNITY</div>
          <div style={{fontSize:22,fontWeight:800}}>Skill<span style={{color:"#C084FC"}}>Swap</span></div>
        </div>
        <div style={{position:"relative"}}>
          <div style={{width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#C084FC,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer"}}>🔔</div>
          <div style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:"50%",background:"#FF6B6B",border:"2px solid #0F0F14"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",paddingBottom:76}}>
        {tab==="explore"&&<Explore saved={saved} toggleSave={toggleSave} onRequest={setReqCard}/>}
        {tab==="messages"&&<Messages/>}
        {tab==="profile"&&<Profile saved={saved} onPrivacy={()=>setShowPrivacy(true)} onEditSkills={()=>setShowEditSkills(true)}/>}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#12121C",borderTop:"1px solid #1E1E2E",display:"flex",paddingBottom:12}}>
        {[["explore","🔍","Explore"],["messages","💬","Messages"],["profile","👤","Profile"]].map(([id,icon,label])=>(
          <button key={id} className={`tab-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
            <span style={{fontSize:17}}>{icon}</span><span>{label}</span>
          </button>
        ))}
      </div>

      {reqCard&&<RequestSheet skill={reqCard} onClose={()=>setReqCard(null)}/>}
      {showPrivacy&&<PrivacySheet onClose={()=>setShowPrivacy(false)}/>}
      {showEditSkills&&<EditSkillsSheet onClose={()=>setShowEditSkills(false)}/>}
    </div>
  );
}
