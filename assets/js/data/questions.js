/**
 * Question bank - 4 classes x 10 subjects.
 * Each subject has 10 "subject" questions (7 are drawn at random) and
 * 5 "iq" questions (3 are drawn at random) => 10 questions per attempt.
 * Shape: QUESTION_BANK[className][subjectId] = { subject: [...], iq: [...] }
 * Question: { q: string, options: string[4], ans: index of the correct option }
 */
const QUESTION_BANK = {
      "Class 7": {
        computer: {
          subject: [
            { q: "Which core component acts as the central processor executing arithmetic and logic operations in a computer?", options: ["CPU", "Monitor", "Keyboard", "Mouse"], ans: 0 },
            { q: "Which of the following peripherals is classified strictly as a hard-copy output device?", options: ["Keyboard", "Printer", "Mouse", "Scanner"], ans: 1 },
            { q: "What is the primary characteristic of RAM (Random Access Memory)?", options: ["Volatile and temporary storage", "Permanent storage", "Read-only access", "External backup"], ans: 0 },
            { q: "Which file extension is standard for modern Microsoft Word XML-based documents?", options: [".docx", ".xlsx", ".pptx", ".txt"], ans: 0 },
            { q: "In a text editor, which key removes the character immediately preceding the text insertion cursor?", options: ["Delete", "Backspace", "Enter", "Shift"], ans: 1 },
            { q: "What does the architectural standard 'WWW' stand for in networking?", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], ans: 0 },
            { q: "Which application is a classic raster graphics editor built into Windows for basic digital painting?", options: ["MS Paint", "MS Excel", "Notepad", "Calculator"], ans: 0 },
            { q: "In computer memory measurement, 8 bits combined together are formally referred to as a:", options: ["Byte", "Kilobyte", "Megabyte", "Gigabyte"], ans: 0 },
            { q: "Which hardware transducer converts acoustic sound waves into electrical audio signals?", options: ["Speaker", "Microphone", "Monitor", "Printer"], ans: 1 },
            { q: "The graphical interface elements representing applications or files on a computer screen are called:", options: ["Icons", "Folders", "Files", "Taskbar"], ans: 0 }
          ],
          iq: [
            { q: "If CAT is coded as 3120, what is DOG?", options: ["4157", "4147", "4158", "3157"], ans: 0 },
            { q: "Which number comes next in series: 5, 10, 20, 40, ?", options: ["50", "60", "80", "100"], ans: 2 },
            { q: "Find the odd one out:", options: ["Earth", "Mars", "Sun", "Jupiter"], ans: 2 },
            { q: "If 2 + 3 = 10, 3 + 4 = 21, then 4 + 5 = ?", options: ["36", "20", "9", "45"], ans: 0 },
            { q: "Which word cannot be formed from 'EXHIBITION'?", options: ["EXIT", "NOTE", "BOX", "BOXER"], ans: 3 }
          ]
        },
        english: {
          subject: [
            { q: "Choose the correct irregular plural form of the noun 'Child':", options: ["Childs", "Children", "Childes", "Childrens"], ans: 1 },
            { q: "Identify the primary lexical verb in the sentence: 'The stray dog barks loudly at night.'", options: ["Dog", "Barks", "Loudly", "The"], ans: 1 },
            { q: "Select the appropriate indefinite article for the phrase: '__ apple a day keeps the doctor away.'", options: ["A", "An", "The", "None"], ans: 1 },
            { q: "Which of the following is a direct synonym for the adjective 'Fast'?", options: ["Slow", "Quick", "Heavy", "Cold"], ans: 1 },
            { q: "What is the standard lexical antonym of the adjective 'Happy'?", options: ["Sad", "Glad", "Joyful", "Excited"], ans: 0 },
            { q: "Identify the pronoun from the given options:", options: ["Ali", "He", "Running", "Table"], ans: 1 },
            { q: "Choose the correct dictionary spelling:", options: ["Beautifull", "Beautiful", "Beutiful", "Batiful"], ans: 1 },
            { q: "What is the correct past tense form of the irregular verb 'Eat'?", options: ["Eated", "Eaten", "Ate", "Eating"], ans: 2 },
            { q: "Which of the following represents a proper noun?", options: ["City", "Pakistan", "River", "Boy"], ans: 1 },
            { q: "Which punctuation mark is strictly required at the end of an interrogative sentence?", options: ["Full Stop", "Question Mark", "Exclamation", "Comma"], ans: 1 }
          ],
          iq: [
            { q: "If A = 1, CAT = 24, what is DOG?", options: ["26", "30", "28", "25"], ans: 0 },
            { q: "Find the missing letter: A, C, E, G, ?", options: ["H", "I", "J", "K"], ans: 1 },
            { q: "Which word is opposite to 'Ancient'?", options: ["Old", "Modern", "Historic", "Antique"], ans: 1 },
            { q: "If pen is to write, knife is to:", options: ["Cut", "Eat", "Run", "Draw"], ans: 0 },
            { q: "Choose the odd one out: Book, Pen, Pencil, Apple", options: ["Book", "Pen", "Pencil", "Apple"], ans: 3 }
          ]
        },
        maths: {
          subject: [
            { q: "Calculate the product of 7 and 8:", options: ["54", "56", "64", "48"], ans: 1 },
            { q: "How many total straight edges or sides does a standard regular hexagon possess?", options: ["5", "6", "7", "8"], ans: 1 },
            { q: "What is the total perimeter of a square whose individual side measures exactly 5cm?", options: ["20cm", "25cm", "10cm", "15cm"], ans: 0 },
            { q: "Express the common fraction 1/2 as an equivalent percentage value:", options: ["25%", "50%", "75%", "100%"], ans: 1 },
            { q: "Identify the smallest and only even prime number in mathematics:", options: ["0", "1", "2", "3"], ans: 2 },
            { q: "Evaluate the arithmetic expression following order of operations: 15 + (6 x 2)", options: ["27", "42", "21", "30"], ans: 0 },
            { q: "Any geometric angle measuring strictly less than 90 degrees is known as:", options: ["Obtuse", "Acute", "Right", "Straight"], ans: 1 },
            { q: "What is the principal square root of the number 64?", options: ["6", "7", "8", "9"], ans: 2 },
            { q: "If the algebraic equation 3x = 12 holds true, what is the value of x?", options: ["2", "3", "4", "6"], ans: 2 },
            { q: "What is the sum total of all interior angles inside any standard triangle?", options: ["90°", "180°", "360°", "270°"], ans: 1 }
          ],
          iq: [
            { q: "If 3, 6, 9, 12, what is next?", options: ["14", "15", "16", "18"], ans: 1 },
            { q: "If a dozen apples cost 120, how much do 3 apples cost?", options: ["30", "40", "20", "60"], ans: 0 },
            { q: "Which number is half of one quarter of 80?", options: ["10", "20", "40", "5"], ans: 0 },
            { q: "If today is Monday, what day will it be after 3 days?", options: ["Wednesday", "Thursday", "Friday", "Tuesday"], ans: 1 },
            { q: "Find missing number: 2, 3, 5, 7, 11, ?", options: ["12", "13", "15", "17"], ans: 1 }
          ]
        },
        science: {
          subject: [
            { q: "During the process of biological photosynthesis, green plants primarily absorb which atmospheric gas?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 1 },
            { q: "At standard atmospheric pressure at sea level, what is the exact boiling point of pure water?", options: ["50°C", "80°C", "100°C", "120°C"], ans: 2 },
            { q: "Which formed cellular component of human blood plays a critical role in coagulation (clotting)?", options: ["RBC", "WBC", "Platelets", "Plasma"], ans: 2 },
            { q: "What is the proper chemical formula for common table salt?", options: ["NaCl", "H2O", "CO2", "HCl"], ans: 0 },
            { q: "Which muscular organ acts as the primary pump for circulating blood throughout the body?", options: ["Lungs", "Brain", "Heart", "Kidney"], ans: 2 },
            { q: "The physical phase transition where a liquid changes directly into a gas state is called:", options: ["Evaporation", "Condensation", "Freezing", "Melting"], ans: 0 },
            { q: "Exposure to natural sunlight helps the human body synthesize which essential vitamin?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], ans: 3 },
            { q: "What is the dense central core region of an atom consisting of protons and neutrons called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], ans: 2 },
            { q: "Which planet in our solar system is widely designated as the 'Red Planet' due to iron oxide?", options: ["Venus", "Mars", "Jupiter", "Saturn"], ans: 1 },
            { q: "Which laboratory meteorological instrument is specifically used to measure atmospheric pressure?", options: ["Thermometer", "Barometer", "Speedometer", "Ammeter"], ans: 1 }
          ],
          iq: [
            { q: "Which animal can live without water longest?", options: ["Camel", "Rat", "Kangaroo", "Elephant"], ans: 0 },
            { q: "Water is to ice as steam is to:", options: ["Liquid", "Gas", "Solid", "Heat"], ans: 1 },
            { q: "Which direction does the sun rise from?", options: ["North", "South", "East", "West"], ans: 2 },
            { q: "If all bloops are bleeps, and all bleeps are blips, are bloops always blips?", options: ["Yes", "No", "Maybe", "None"], ans: 0 },
            { q: "Which bird can fly backward?", options: ["Eagle", "Hummingbird", "Sparrow", "Crow"], ans: 1 }
          ]
        },
        islamiat: {
          subject: [
            { q: "Bunyadi taur par Islam ke kul kitne ahem arkaan (pillars) qarar diye gaye hain?", options: ["4", "5", "6", "7"], ans: 1 },
            { q: "Islam ki tareekh mein sab se pehli Wahi kahan aur kis maqam par nazil hui thi?", options: ["Ghaar-e-Thawr", "Ghaar-e-Hira", "Ghaar-e-Safa", "Uhud"], ans: 1 },
            { q: "Quran Majeed ki tilawat ke liye usay kul kitne barabar hisson ya Paras mein taqseem kiya gaya hai?", options: ["20", "25", "30", "40"], ans: 2 },
            { q: "Islami tareeqay ke mutabiq Namaz-e-Janaza mein kul kitni takbeerein kahi jati hain?", options: ["3", "4", "5", "6"], ans: 1 },
            { q: "Khulafa-e-Rashideen mein se Islam ke sab se pehle Khalifa ka naam kya hai?", options: ["Hazrat Umar (R.A)", "Hazrat Abu Bakr (R.A)", "Hazrat Usman (R.A)", "Hazrat Ali (R.A)"], ans: 1 },
            { q: "Quran-e-Pak aur Islamic aqeeday ke mutabiq 'Khatam-un-Nabiyyin' kis Azeem Hasti ko kaha gaya hai?", options: ["Hazrat Musa (A.S)", "Hazrat Isa (A.S)", "Hazrat Muhammad (S.A.W)", "Hazrat Ibrahim (A.S)"], ans: 2 },
            { q: "Islamic Hijri calendar ke kis mubarak mahine mein roze rakhna har musalman par farz kiya gaya hai?", options: ["Muharram", "Rabi-ul-Awwal", "Ramzan", "Shawwal"], ans: 2 },
            { q: "Quran Majeed ki tamam Suroton mein se sab se lambi (bari) Surah konsi shumar hoti hai?", options: ["Surah Yaseen", "Surah Al-Baqarah", "Surah Al-Ikhlas", "Surah Al-Fatiha"], ans: 1 },
            { q: "Sahib-e-nisab musalman par Zakat saal mein kitni martaba ada karna farz hoti hai?", options: ["Ek baar", "Do baar", "Teen baar", "Har mahine"], ans: 0 },
            { q: "Shariat ki istilaha mein arabi zuban ke andar 'Roze' ko kya kaha jata hai?", options: ["Salat", "Saum", "Hajj", "Zakat"], ans: 1 }
          ],
          iq: [
            { q: "Aqlmand insaan ki kya pehchan hai?", options: ["Sabar karna", "Jaldbaazi", "Gussa", "Larna"], ans: 0 },
            { q: "Sahi faisla karne ke liye kya zaroori hai?", options: ["Ghaur-o-fikr", "Shor", "Jaldbaazi", "La-parwahi"], ans: 0 },
            { q: "Behtareen dost woh hai jo:", options: ["Mushkil me kaam aaye", "Dhokha de", "Chhor de", "Bura bhala kahe"], ans: 0 },
            { q: "Waqt ki pabandi se kya milta hai?", options: ["Kamyabi", "Nakami", "Susti", "Nuqsan"], ans: 0 },
            { q: "Sach bolne ka kya natija hota hai?", options: ["Sukoon aur izzat", "Nuqsan", "Sazaa", "Darr"], ans: 0 }
          ]
        },
        physics: {
          subject: [
            { q: "According to the International System of Units (SI), what is the standard base unit for length?", options: ["Centimeter", "Meter", "Kilometer", "Foot"], ans: 1 },
            { q:1, q: "In a homogeneous and transparent medium, light fundamentally travels in a:", options: ["Curved path", "Zigzag path", "Straight line", "Circular orbit"], ans: 2 },
            { q: "What specific form of mechanical energy is stored inside a physically stretched rubber band?", options: ["Kinetic energy", "Potential energy", "Thermal energy", "Chemical energy"], ans: 1 },
            { q: "The measurable downward gravitational force exerted by Earth on any physical mass is defined as its:", options: ["Mass", "Weight", "Volume", "Density"], ans: 1 },
            { q: "Which scientific instrument is primarily utilized to measure precise thermal temperature?", options: ["Barometer", "Thermometer", "Ruler", "Scale"], ans: 1 },
            { q: "Acoustic sound waves fundamentally require a material medium and cannot propagate through a:", options: ["Solid medium", "Liquid medium", "Gas medium", "Vacuum"], ans: 3 },
            { q: "Which classical simple machine consists of a grooved wheel designed to house a rotating rope or cable?", options: ["Lever", "Pulley", "Wedge", "Screw"], ans: 1 },
            { q: "What specialized type of curved mirror is universally integrated as a rear-view mirror in automobiles?", options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic mirror"], ans: 1 },
            { q: "In thermodynamics, thermal heat energy naturally transfers spontaneously from:", options: ["Cold body to hot body", "Hot body to cold body", "Equal to equal body", "None of these"], ans: 1 },
            { q: "What is the standard SI unit used for measuring electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], ans: 1 }
          ],
          iq: [
            { q: "If a stone drops in water, what is created?", options: ["Ripples", "Fire", "Sound only", "Nothing"], ans: 0 },
            { q: "Which shape has 3 sides?", options: ["Triangle", "Square", "Circle", "Rectangle"], ans: 0 },
            { q: "If speed increases, time taken to cover distance:", options: ["Decreases", "Increases", "Remains same", "Zero"], ans: 0 },
            { q: "Heavy object sinks because of its:", options: ["Density", "Color", "Shape only", "Height"], ans: 0 },
            { q: "Which force pulls objects toward Earth?", options: ["Gravity", "Friction", "Magnetism", "Tension"], ans: 0 }
          ]
        },
        chemistry: {
          subject: [
            { q: "What is the standard chemical element symbol assigned to Oxygen?", options: ["Ox", "O", "Og", "Om"], ans: 1 },
            { q: "A pure molecule of water is chemically composed of Hydrogen bonded directly with:", options: ["Nitrogen", "Oxygen", "Carbon", "Helium"], ans: 1 },
            { q: "Under standard conditions, matter is commonly categorized into how many fundamental physical states?", options: ["2", "3", "5", "6"], ans: 1 },
            { q: "The natural process involving the souring or spoiling of fresh milk represents a permanent:", options: ["Physical change", "Chemical change", "Temporary change", "Reversible change"], ans: 1 },
            { q: "On the standard pH chemical scale, what is the exact neutral value assigned to pure water?", options: ["1", "5", "7", "14"], ans: 2 },
            { q: "Any chemical substance that tastes characteristically sour and converts blue litmus paper red is an:", options: ["Acid", "Base", "Salt", "Water"], ans: 0 },
            { q: "A pure substance composed exclusively of only one single type of atom is known as an:", options: ["Compound", "Element", "Mixture", "Solution"], ans: 1 },
            { q: "For the chemical corrosion process of iron (rusting) to occur, it strictly requires iron, water, and:", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], ans: 1 },
            { q: "Which compressed gas is heavily relied upon inside standard fire extinguishers to smother flames?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 1 },
            { q: "In laboratory chemistry, filtration is a technique used to separate what type of materials from liquids?", options: ["Dissolved substances", "Insoluble solids", "Gaseous elements", "Miscible liquids"], ans: 1 }
          ],
          iq: [
            { q: "Which color results from mixing Blue and Yellow?", options: ["Green", "Red", "Purple", "Orange"], ans: 0 },
            { q: "What is the hardest natural substance on Earth?", options: ["Diamond", "Gold", "Iron", "Platinum"], ans: 0 },
            { q: "Gas filled in balloons to make them float:", options: ["Helium", "Oxygen", "Nitrogen", "Carbon Dioxide"], ans: 0 },
            { q: "Common name of H2O:", options: ["Water", "Salt", "Sugar", "Acid"], ans: 0 },
            { q: "Which metal is liquid at room temperature?", options: ["Mercury", "Iron", "Copper", "Aluminum"], ans: 0 }
          ]
        },
        biology: {
          subject: [
            { q: "In all living organisms, what is structurally recognized as the basic fundamental unit of life?", options: ["Tissue", "Organ", "Cell", "System"], ans: 2 },
            { q: "What is the name of the specialized light-absorbing green pigment found inside plant chloroplasts?", options: ["Carotene", "Chlorophyll", "Xanthophyll", "Melanin"], ans: 1 },
            { q: "Through which specialized microscopic respiratory opening do most insects breathe?", options: ["Gills", "Lungs", "Spiracles", "Stomata"], ans: 2 },
            { q: "An average healthy adult human skeletal system consists of exactly how many bones?", options: ["206", "300", "150", "208"], ans: 0 },
            { q: "Which primary anatomical part of a green plant is chiefly responsible for synthesizing food via photosynthesis?", options: ["Roots", "Stem", "Leaves", "Flowers"], ans: 2 },
            { q: "Ecologically, consumers that subsist entirely on plant matter are classified as:", options: ["Carnivores", "Herbivores", "Omnivores", "Decomposers"], ans: 1 },
            { q: "Which internal excretory organ is primarily tasked with filtering metabolic waste products from the bloodstream?", options: ["Heart", "Liver", "Kidneys", "Lungs"], ans: 2 },
            { q: "How do saprophytic fungi primarily acquire their necessary organic nutrients?", options: ["Photosynthesis", "Decomposition", "Ingestion", "Chemosynthesis"], ans: 1 },
            { q: "What are the microscopic cellular pores located on plant leaf surfaces designed for gas exchange called?", options: ["Veins", "Stomata", "Pores", "Xylem"], ans: 1 },
            { q: "Which specific category of blood cells functions as the body's primary defense against pathogenic infections?", options: ["RBCs", "WBCs", "Platelets", "Plasma"], ans: 1 }
          ],
          iq: [
            { q: "Which animal is known as ship of desert?", options: ["Camel", "Horse", "Elephant", "Donkey"], ans: 0 },
            { q: "How many legs does a spider have?", options: ["8", "6", "4", "10"], ans: 0 },
            { q: "Which mammal can fly?", options: ["Bat", "Whale", "Kangaroo", "Seal"], ans: 0 },
            { q: "Young one of a frog is called:", options: ["Tadpole", "Caterpillar", "Pup fry", "Cub"], ans: 0 },
            { q: "Which sense organ helps us taste?", options: ["Tongue", "Nose", "Skin", "Eye"], ans: 0 }
          ]
        },
        history: {
          subject: [
            { q: "The ancient urban Indus Valley Civilization flourished primarily in the river basin of the:", options: ["Nile River", "Indus River", "Ganges River", "Amazon River"], ans: 1 },
            { q: "Who was the historical military conqueror and founder of the grand Mughal Empire in South Asia?", options: ["Akbar", "Babur", "Humayun", "Shah Jahan"], ans: 1 },
            { q: "In which historical year did the monumental War of Independence take place in the subcontinent?", options: ["1857", "1947", "1757", "1920"], ans: 0 },
            { q: "The iconic white marble mausoleum known as the Taj Mahal was commissioned by which Mughal ruler?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], ans: 1 },
            { q: "During approximately which century BC did Alexander the Great conduct his military expedition into India?", options: ["4th Century BC", "1st Century BC", "10th Century BC", "2nd Century BC"], ans: 0 },
            { q: "Which prominent historical figure earned the widespread title of the 'Iron Man of India'?", options: ["Nehru", "Sardar Patel", "Gandhi", "Subhash Bose"], ans: 1 },
            { q: "The majestic Badshahi Mosque situated in Lahore was constructed under the reign of which Mughal emperor?", options: ["Akbar", "Aurangzeb", "Jahangir", "Shah Jahan"], ans: 1 },
            { q: "The ruins of the ancient pre-historic urban metropolis Mohenjo-Daro lie in which modern Pakistani province?", options: ["Punjab", "Sindh", "KPK", "Balochistan"], ans: 1 },
            { q: "The historic trunk trade route known as the Grand Trunk (GT) Road was originally established by:", options: ["Sher Shah Suri", "Babur", "Akbar", "Humayun"], ans: 0 },
            { q: "Who formally presented the historic Lahore Resolution during the annual session in March 1940?", options: ["Quaid-e-Azam", "A.K. Fazlul Huq", "Allama Iqbal", "Liaquat Ali Khan"], ans: 1 }
          ],
          iq: [
            { q: "If a king lives in a castle, where does an eskimo live?", options: ["Igloo", "Tent", "Cave", "Hut"], ans: 0 },
            { q: "Time past is called:", options: ["History / Past", "Future", "Present", "Moment"], ans: 0 },
            { q: "Which monument is one of the Seven Wonders of the World in India?", options: ["Taj Mahal", "Badshahi Mosque", "Eiffel Tower", "Big Ben"], ans: 0 },
            { q: "Ancient people wrote on rocks and walls called:", options: ["Rock art / Petroglyphs", "Books", "Laptops", "Papers"], ans: 0 },
            { q: "Who invents or discovers old buried treasures?", options: ["Archaeologist", "Doctor", "Engineer", "Pilot"], ans: 0 }
          ]
        },
        geography: {
          subject: [
            { q: "According to standard global geographical classification, how many total continents exist on Earth?", options: ["5", "6", "7", "8"], ans: 2 },
            { q: "Which of the following is scientifically recognized as the largest oceanic division on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], ans: 2 },
            { q: "What is the official designated federal capital city of the Islamic Republic of Pakistan?", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"], ans: 2 },
            { q: "What is the primary name of the zero-latitude parallel line that divides Earth into Northern and Southern hemispheres?", options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Longitude line"], ans: 1 },
            { q: "Which towering mountain peak holds the official record for being the highest above sea level worldwide?", options: ["K2", "Mount Everest", "Nanga Parbat", "Kanchanjunga"], ans: 1 },
            { q: "Which massive non-polar land region is classified as the largest hot desert on Earth?", options: ["Thar Desert", "Sahara Desert", "Gobi Desert", "Atacama Desert"], ans: 1 },
            { q: "Which major river system serves as the longest continuous river flowing through Pakistan?", options: ["Chenab River", "Jhelum River", "Indus River", "Ravi River"], ans: 2 },
            { q: "What are the geographical imaginary vertical reference lines running from the North Pole to the South Pole called?", options: ["Latitudes", "Longitudes", "Equators", "Altitudes"], ans: 1 },
            { q: "Which sovereign neighboring country is situated directly along the eastern border of Pakistan?", options: ["Iran", "Afghanistan", "China", "India"], ans: 3 },
            { q: "Which traditional navigation instrument utilizes a magnetized needle to determine cardinal directions?", options: ["Scale", "Compass", "Thermometer", "Barometer"], ans: 1 }
          ],
          iq: [
            { q: "Which country has the shape of a high-heeled boot?", options: ["Italy", "India", "Chile", "Japan"], ans: 0 },
            { q: "Island country known as Land of Rising Sun:", options: ["Japan", "China", "Australia", "New Zealand"], ans: 0 },
            { q: "Largest country in the world by land area:", options: ["Russia", "Canada", "China", "USA"], ans: 0 },
            { q: "Which continent has no countries?", options: ["Antarctica", "Africa", "Europe", "Australia"], ans: 0 },
            { q: "Line dividing day and night on Earth is called:", options: ["Terminator", "Equator", "Meridian", "Axis"], ans: 0 }
          ]
        }
      } ,
      "Class 8": {
        computer: {
          subject: [
            { q: "Which number system is used by computers?", options: ["Binary", "Decimal", "Octal", "Hexadecimal"], ans: 0 },
            { q: "Which of the following is a storage device?", options: ["Hard Disk", "Monitor", "Keyboard", "Speaker"], ans: 0 },
            { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Management", "Home Tool Markup Language"], ans: 0 },
            { q: "Which shortcut is used to paste copied text?", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], ans: 1 },
            { q: "Which device connects computers in a network?", options: ["Switch/Router", "Printer", "Monitor", "Mouse"], ans: 0 },
            { q: "What is temporary computer memory called?", options: ["RAM", "ROM", "Hard Disk", "CD-ROM"], ans: 0 },
            { q: "Which company developed Windows OS?", options: ["Apple", "Microsoft", "Google", "IBM"], ans: 1 },
            { q: "Email stands for:", options: ["Electronic Mail", "Electrical Mail", "Easy Mail", "Exchange Mail"], ans: 0 },
            { q: "What is malicious software called?", options: ["Malware", "Hardware", "Freeware", "Shareware"], ans: 0 },
            { q: "Which key combination opens Task Manager?", options: ["Ctrl + Alt + Del", "Ctrl + Shift + Esc", "Alt + F4", "Ctrl + Escape"], ans: 0 }
          ],
          iq: [
            { q: "If COMPUTER is coded as 8 letters, what is HARDWARE?", options: ["7", "8", "9", "6"], ans: 1 },
            { q: "Find missing number: 4, 8, 16, 32, ?", options: ["48", "64", "50", "60"], ans: 1 },
            { q: "Odd one out: RAM, ROM, Hard Disk, Keyboard", options: ["RAM", "ROM", "Hard Disk", "Keyboard"], ans: 3 },
            { q: "If 1 Byte = 8 bits, 2 Bytes =", options: ["16 bits", "12 bits", "8 bits", "32 bits"], ans: 0 },
            { q: "Which is fastest: Light, Sound, Internet, Electricity?", options: ["Light", "Sound", "Internet", "Electricity"], ans: 0 }
          ]
        },
        english: {
          subject: [
            { q: "What is a word that joins words or sentences called?", options: ["Conjunction", "Preposition", "Adverb", "Interjection"], ans: 0 },
            { q: "What is the superlative form of 'Good'?", options: ["Gooder", "Best", "Better", "Most good"], ans: 1 },
            { q: "Identify the passive voice of: 'Ali wrote a letter.'", options: ["A letter was written by Ali.", "Ali is writing a letter.", "A letter writes Ali.", "Ali has written."], ans: 0 },
            { q: "What is the synonym of 'Brave'?", options: ["Coward", "Fearless", "Weak", "Timid"], ans: 1 },
            { q: "Choose the correct preposition: 'The cat jumped __ the table.'", options: ["on", "over", "in", "at"], ans: 0 },
            { q: "What is the antonym of 'Accept'?", options: ["Refuse", "Receive", "Take", "Agree"], ans: 0 },
            { q: "Which sentence is in present continuous tense?", options: ["He runs fast.", "He is running.", "He ran yesterday.", "He will run."], ans: 1 },
            { q: "Find the abstract noun:", options: ["Honesty", "Table", "Dog", "School"], ans: 0 },
            { q: "What is the plural of 'Tooth'?", options: ["Tooths", "Teeth", "Teeths", "Tooth"], ans: 1 },
            { q: "Who wrote 'Hamlet'?", options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "John Keats"], ans: 0 }
          ],
          iq: [
            { q: "Find odd word out: Read, Write, Speak, Table", options: ["Read", "Write", "Speak", "Table"], ans: 3 },
            { q: "If SUN = 3, MOON = 4, EARTH = ?", options: ["5", "6", "4", "7"], ans: 0 },
            { q: "Rearrange 'TAC':", options: ["CAT", "ACT", "Both A & B", "None"], ans: 2 },
            { q: "Light is to Dark as Knowledge is to:", options: ["Ignorance", "Smart", "Book", "School"], ans: 0 },
            { q: "Which letter comes next: Z, Y, X, W, ?", options: ["V", "U", "T", "S"], ans: 0 }
          ]
        },
        maths: {
          subject: [
            { q: "Solve for x: 2x + 5 = 15", options: ["5", "10", "15", "2"], ans: 0 },
            { q: "Square of 12 is:", options: ["120", "144", "122", "169"], ans: 1 },
            { q: "What is the formula for area of a rectangle?", options: ["L x W", "2(L+W)", "Side x Side", "1/2 x B x H"], ans: 0 },
            { q: "If a = 3 and b = 4, what is a² + b²?", options: ["7", "12", "25", "14"], ans: 2 },
            { q: "Cube root of 27 is:", options: ["3", "9", "6", "1"], ans: 0 },
            { q: "A triangle with all 3 sides equal is called:", options: ["Isosceles", "Equilateral", "Scalene", "Right-angled"], ans: 1 },
            { q: "What is 20% of 250?", options: ["40", "50", "60", "25"], ans: 1 },
            { q: "Value of pi (π) up to 2 decimal places is:", options: ["3.14", "3.41", "2.14", "3.16"], ans: 0 },
            { q: "If 5 workers build a wall in 10 days, how long do 10 workers take?", options: ["5 days", "10 days", "20 days", "2 days"], ans: 0 },
            { q: "Sum of complementary angles is equal to:", options: ["90°", "180°", "360°", "45°"], ans: 0 }
          ],
          iq: [
            { q: "If 1+1=2, 2+2=4, 4+4=8, 8+8=?", options: ["16", "12", "20", "14"], ans: 0 },
            { q: "Find missing value: 100, 90, 80, 70, ?", options: ["60", "50", "65", "55"], ans: 0 },
            { q: "A clock shows 3:00. What is angle between hands?", options: ["90°", "180°", "45°", "60°"], ans: 0 },
            { q: "If half of a number is 20, what is the number?", options: ["40", "30", "50", "10"], ans: 0 },
            { q: "Complete series: 1, 4, 9, 16, ?", options: ["25", "20", "30", "36"], ans: 0 }
          ]
        },
        science: {
          subject: [
            { q: "Cell organelle responsible for protein synthesis is:", options: ["Ribosome", "Mitochondria", "Nucleus", "Vacuole"], ans: 0 },
            { q: "Which law states action and reaction are equal and opposite?", options: ["Newton 1st Law", "Newton 2nd Law", "Newton 3rd Law", "Law of Gravitation"], ans: 2 },
            { q: "Which element has atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], ans: 1 },
            { q: "Sound travels fastest through which medium?", options: ["Air", "Water", "Steel (Solids)", "Vacuum"], ans: 2 },
            { q: "Endocrine glands secrete:", options: ["Enzymes", "Hormones", "Blood", "Water"], ans: 1 },
            { q: "Process by which solid changes directly to gas is:", options: ["Sublimation", "Evaporation", "Melting", "Condensation"], ans: 0 },
            { q: "SI unit of force is:", options: ["Joule", "Pascal", "Newton", "Watt"], ans: 2 },
            { q: "Which gland regulates human growth?", options: ["Thyroid", "Pituitary", "Adrenal", "Pancreas"], ans: 1 },
            { q: "Which mirror forms virtual and diminished images always?", options: ["Convex", "Concave", "Plane", "Cylindrical"], ans: 0 },
            { q: "Ozone layer protects us from harmful ______ rays.", options: ["Infrared", "Ultraviolet (UV)", "X-Rays", "Gamma"], ans: 1 }
          ],
          iq: [
            { q: "If ice melts to water, water boils to:", options: ["Vapor", "Ice", "Liquid", "Snow"], ans: 0 },
            { q: "Which organ never rests?", options: ["Heart", "Eye", "Hand", "Leg"], ans: 0 },
            { q: "Which planet is closest to Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], ans: 0 },
            { q: "Find odd one out: Iron, Gold, Silver, Wood", options: ["Wood", "Iron", "Gold", "Silver"], ans: 0 },
            { q: "What flows in an electric circuit?", options: ["Electrons", "Protons", "Neutrons", "Atoms"], ans: 0 }
          ]
        },
        islamiat: {
          subject: [
            { q: "Ghazwa-e-Badr kis Hijri me lari gayi?", options: ["1 Hijri", "2 Hijri", "3 Hijri", "5 Hijri"], ans: 1 },
            { q: "As-Siddiq kis Sahabi ka laqab hai?", options: ["Hazrat Umar (R.A)", "Hazrat Abu Bakr (R.A)", "Hazrat Usman (R.A)", "Hazrat Ali (R.A)"], ans: 1 },
            { q: "Tawrat kis Nabi par nazil hui?", options: ["Hazrat Musa (A.S)", "Hazrat Isa (A.S)", "Hazrat Dawood (A.S)", "Hazrat Ibrahim (A.S)"], ans: 0 },
            { q: "Quran Majeed ki sab se choti Surah konsi hai?", options: ["Surah Al-Kausar", "Surah Al-Ikhlas", "Surah Al-Nas", "Surah Al-Falaq"], ans: 0 },
            { q: "Makkah kis saal me Fatah hua?", options: ["6 Hijri", "8 Hijri", "10 Hijri", "2 Hijri"], ans: 1 },
            { q: "Hajj kis maah me adaa kiya jata hai?", options: ["Ramzan", "Zul-Hijjah", "Rabi-ul-Awwal", "Shawwal"], ans: 1 },
            { q: "Zul-Nurain kis Sahabi ka laqab tha?", options: ["Hazrat Abu Bakr (R.A)", "Hazrat Usman (R.A)", "Hazrat Ali (R.A)", "Hazrat Khalid bin Waleed (R.A)"], ans: 1 },
            { q: "Jang-e-Yarmouk kis ke dor-e-Khilafat me huwi?", options: ["Hazrat Abu Bakr (R.A)", "Hazrat Umar (R.A)", "Hazrat Usman (R.A)", "Hazrat Ali (R.A)"], ans: 1 },
            { q: "Zaboor kis Nabi par nazil hui?", options: ["Hazrat Dawood (A.S)", "Hazrat Musa (A.S)", "Hazrat Isa (A.S)", "Hazrat Yahya (A.S)"], ans: 0 },
            { q: "Safat aur Marwah ke darmian dorne ko kya kehte hain?", options: ["Tawaf", "Sa'i", "Rami", "Ruku"], ans: 1 }
          ],
          iq: [
            { q: "Musalman din me kitni farz namazein parhte hain?", options: ["5", "4", "6", "3"], ans: 0 },
            { q: "Sab se pehli Aazan kis Sahabi ne di?", options: ["Hazrat Bilal (R.A)", "Hazrat Ali (R.A)", "Hazrat Umar (R.A)", "Hazrat Zaid (R.A)"], ans: 0 },
            { q: "Adab ka aaghaz kahan se hota hai?", options: ["Ghar se", "Bazar se", "Khel se", "Safar se"], ans: 0 },
            { q: "Musalmanon ka Qibla konsa hai?", options: ["Khana Kaaba", "Masjid-e-Nabwi", "Masjid-e-Aqsa", "Bait-ul-Muqaddas"], ans: 0 },
            { q: "Rozay se insaan me kya paida hota hai?", options: ["Taqwa aur Sabar", "Susti", "Gussa", "Bhook"], ans: 0 }
          ]
        },
        physics: {
          subject: [
            { q: "Rate of change of displacement is called:", options: ["Speed", "Velocity", "Acceleration", "Distance"], ans: 1 },
            { q: "What is the acceleration due to gravity on Earth?", options: ["9.8 m/s²", "5.0 m/s²", "12 m/s²", "1.6 m/s²"], ans: 0 },
            { q: "Pascal is the unit of:", options: ["Force", "Pressure", "Work", "Power"], ans: 1 },
            { q: "Which instrument measures electric current?", options: ["Voltmeter", "Ammeter", "Ohmmeter", "Galvanometer"], ans: 1 },
            { q: "Frequency is measured in:", options: ["Hertz (Hz)", "Joules", "Watts", "Meters"], ans: 0 },
            { q: "Work done is calculated as:", options: ["Force x Distance", "Force / Time", "Mass x Acceleration", "Power x Velocity"], ans: 0 },
            { q: "Ability to do work is called:", options: ["Power", "Energy", "Force", "Momentum"], ans: 1 },
            { q: "Lenses work on the principle of light ______.", options: ["Reflection", "Refraction", "Absorption", "Dispersion"], ans: 1 },
            { q: "Unit of power is:", options: ["Joule", "Watt", "Newton", "Pascal"], ans: 1 },
            { q: "Density is defined as:", options: ["Mass / Volume", "Volume / Mass", "Mass x Volume", "Weight / Area"], ans: 0 }
          ],
          iq: [
            { q: "Speed = Distance / ?", options: ["Time", "Mass", "Force", "Area"], ans: 0 },
            { q: "If force doubles and area stays same, pressure:", options: ["Doubles", "Halves", "Same", "Zero"], ans: 0 },
            { q: "Echo is formed due to light or sound?", options: ["Sound Reflection", "Light Refraction", "Heat", "Magnet"], ans: 0 },
            { q: "Magnet has how many poles?", options: ["2", "4", "1", "3"], ans: 0 },
            { q: "Primary colors of light are Red, Blue and:", options: ["Green", "Yellow", "White", "Orange"], ans: 0 }
          ]
        },
        chemistry: {
          subject: [
            { q: "Smallest particle of an element retaining its properties:", options: ["Atom", "Molecule", "Ion", "Compound"], ans: 0 },
            { q: "Symbol for Sodium is:", options: ["So", "Na", "Sd", "S"], ans: 1 },
            { q: "Negatively charged particle in an atom is:", options: ["Proton", "Neutron", "Electron", "Positron"], ans: 2 },
            { q: "Atomic number equals total number of ______ in nucleus.", options: ["Neutrons", "Protons", "Electrons", "Protons + Neutrons"], ans: 1 },
            { q: "Common table salt chemical formula:", options: ["NaCl", "KCl", "HCl", "NaOH"], ans: 0 },
            { q: "Bases turn red litmus paper into:", options: ["Yellow", "Blue", "Green", "Pink"], ans: 1 },
            { q: "Alloy of Iron and Carbon is called:", options: ["Bronze", "Brass", "Steel", "Copper"], ans: 2 },
            { q: "Horizontal rows in periodic table are called:", options: ["Groups", "Periods", "Blocks", "Columns"], ans: 1 },
            { q: "Gas liberated when acid reacts with metals:", options: ["Oxygen", "Hydrogen", "Nitrogen", "Chlorine"], ans: 1 },
            { q: "Chemical formula of Carbon Dioxide:", options: ["CO", "CO2", "C2O", "C3O2"], ans: 1 }
          ],
          iq: [
            { q: "Water formula H2O has how many total atoms?", options: ["3", "2", "4", "1"], ans: 0 },
            { q: "Which gas do humans exhale?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], ans: 0 },
            { q: "Which element is liquid metal?", options: ["Mercury", "Gold", "Silver", "Iron"], ans: 0 },
            { q: "pH 2 indicates strong acid or base?", options: ["Strong Acid", "Strong Base", "Neutral", "Salt"], ans: 0 },
            { q: "Rusting happens in dry or moist air?", options: ["Moist Air", "Dry Air", "Vacuum", "Oil"], ans: 0 }
          ]
        },
        biology: {
          subject: [
            { q: "Which organelle is the control center of cell?", options: ["Nucleus", "Cytoplasm", "Cell Membrane", "Vacuole"], ans: 0 },
            { q: "Transport of water in plants occurs through:", options: ["Phloem", "Xylem", "Stomata", "Cortex"], ans: 1 },
            { q: "Transport of food in plants occurs through:", options: ["Xylem", "Phloem", "Epidermis", "Pith"], ans: 1 },
            { q: "Which organ secretes Insulin?", options: ["Liver", "Pancreas", "Kidney", "Stomach"], ans: 1 },
            { q: "Human heart has how many chambers?", options: ["2", "3", "4", "5"], ans: 2 },
            { q: "Main site of nutrient absorption in human body:", options: ["Stomach", "Small Intestine", "Large Intestine", "Esophagus"], ans: 1 },
            { q: "Structural unit of nervous system is:", options: ["Nephron", "Neuron", "Axon", "Cell Body"], ans: 1 },
            { q: "Process of food breakdown using oxygen is:", options: ["Anaerobic Respiration", "Aerobic Respiration", "Photosynthesis", "Fermentation"], ans: 1 },
            { q: "Enzymes are biologically active ______.", options: ["Fats", "Carbohydrates", "Proteins", "Vitamins"], ans: 2 },
            { q: "Deficiency of Iron leads to:", options: ["Scurvy", "Rickets", "Anemia", "Goitre"], ans: 2 }
          ],
          iq: [
            { q: "Which blood group is universal donor?", options: ["O negative", "AB positive", "A positive", "B negative"], ans: 0 },
            { q: "Normal human body temperature is approximately:", options: ["37°C", "98°C", "45°C", "25°C"], ans: 0 },
            { q: "Brain is protected inside:", options: ["Skull", "Ribcage", "Spine", "Pelvis"], ans: 0 },
            { q: "How many lungs do humans have?", options: ["2", "1", "3", "4"], ans: 0 },
            { q: "Pulse is measured from:", options: ["Artery", "Vein", "Capillary", "Nerve"], ans: 0 }
          ]
        },
        history: {
          subject: [
            { q: "Who was the first President of Pakistan?", options: ["Liaquat Ali Khan", "Iskander Mirza", "Ayub Khan", "Quaid-e-Azam"], ans: 1 },
            { q: "In which year was All India Muslim League formed?", options: ["1905", "1906", "1911", "1920"], ans: 1 },
            { q: "Who gave the historic Allahabad Address in 1930?", options: ["Quaid-e-Azam", "Allama Iqbal", "Sir Syed Ahmad Khan", "Liaquat Ali Khan"], ans: 1 },
            { q: "Sir Syed Ahmad Khan founded which educational institute?", options: ["Islamia College", "MAO College Aligarh", "Jamia Millia", "Nadwa Institute"], ans: 1 },
            { q: "Partition of Bengal took place in which year?", options: ["1905", "1911", "1920", "1935"], ans: 0 },
            { q: "Who was the British Viceroy during India's partition in 1947?", options: ["Lord Mountbatten", "Lord Curzon", "Lord Wavell", "Lord Dalhousie"], ans: 0 },
            { q: "Khilafat Movement was started in India in which year?", options: ["1919", "1930", "1940", "1911"], ans: 0 },
            { q: "First Constitution of Pakistan was enforced in:", options: ["1947", "1956", "1962", "1973"], ans: 1 },
            { q: "Which agreement was signed between India & Pakistan in 1966?", options: ["Tashkent Declaration", "Simla Agreement", "Delhi Pact", "Lahore Declaration"], ans: 0 },
            { q: "Who was the first Prime Minister of Pakistan?", options: ["Liaquat Ali Khan", "Iskander Mirza", "Khawaja Nazimuddin", "Zulfikar Ali Bhutto"], ans: 0 }
          ],
          iq: [
            { q: "Pakistan came into being on 14th August:", options: ["1947", "1948", "1946", "1950"], ans: 0 },
            { q: "Who is Father of Nation in Pakistan?", options: ["Quaid-e-Azam", "Allama Iqbal", "Liaquat Ali", "Sir Syed"], ans: 0 },
            { q: "National poet of Pakistan is:", options: ["Allama Iqbal", "Faiz", "Ghalib", "Iqbal Lahori"], ans: 0 },
            { q: "Capital of Pakistan before Islamabad was:", options: ["Karachi", "Lahore", "Rawalpindi", "Peshawar"], ans: 0 },
            { q: "How many colors in Pakistan flag?", options: ["2", "3", "4", "1"], ans: 0 }
          ]
        },
        geography: {
          subject: [
            { q: "Which mountain range separates Asia from Europe?", options: ["Himalayas", "Urals", "Alps", "Andes"], ans: 1 },
            { q: "K2, the second highest peak, belongs to which range?", options: ["Himalayas", "Karakoram", "Hindu Kush", "Sulaiman"], ans: 1 },
            { q: "Which ocean lies to the south of Pakistan?", options: ["Pacific Ocean", "Indian Ocean (Arabian Sea)", "Atlantic Ocean", "Arctic Ocean"], ans: 1 },
            { q: "Largest island in the world is:", options: ["Greenland", "Madagascar", "Borneo", "Sri Lanka"], ans: 0 },
            { q: "Which soil is best suited for growing cotton?", options: ["Sandy Soil", "Black / Loamy Soil", "Clay Soil", "Peat Soil"], ans: 1 },
            { q: "Capital city of Punjab province in Pakistan:", options: ["Multan", "Lahore", "Rawalpindi", "Faisalabad"], ans: 1 },
            { q: "The layer of atmosphere where weather changes occur:", options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"], ans: 1 },
            { q: "Which desert is located in Sindh, Pakistan?", options: ["Thal", "Thar", "Kharan", "Cholistan"], ans: 1 },
            { q: "World's longest river is:", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], ans: 1 },
            { q: "Which province of Pakistan is largest by land area?", options: ["Punjab", "Sindh", "Balochistan", "KPK"], ans: 2 }
          ],
          iq: [
            { q: "How many provinces in Pakistan?", options: ["4", "5", "6", "3"], ans: 0 },
            { q: "Largest city of Pakistan by population:", options: ["Karachi", "Lahore", "Faisalabad", "Rawalpindi"], ans: 0 },
            { q: "Which sea borders Karachi?", options: ["Arabian Sea", "Red Sea", "Black Sea", "Caspian Sea"], ans: 0 },
            { q: "Which side is North on a standard map?", options: ["Top", "Bottom", "Right", "Left"], ans: 0 },
            { q: "Coldest continent on Earth:", options: ["Antarctica", "Europe", "Asia", "North America"], ans: 0 }
          ]
        }
      },

      "Class 9": {
        computer: {
          subject: [
            { q: "Which unit is responsible for arithmetic and logical operations?", options: ["ALU", "CU", "MU", "Register"], ans: 0 },
            { q: "What is a collection of web pages called?", options: ["Web Site", "Web Browser", "Search Engine", "Hyperlink"], ans: 0 },
            { q: "Which memory is non-volatile?", options: ["RAM", "ROM", "Cache", "Registers"], ans: 1 },
            { q: "Which of the following is a high-level programming language?", options: ["Python", "Machine Code", "Binary", "Assembly"], ans: 0 },
            { q: "What is an IP address?", options: ["Internet Protocol address", "Internal Program address", "Inter network Port", "Instant Packet address"], ans: 0 },
            { q: "Which network topology has a central hub?", options: ["Star Topology", "Bus Topology", "Ring Topology", "Mesh Topology"], ans: 0 },
            { q: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Record Link", "Uniform Read Locator", "Unified Retrieval Link"], ans: 0 },
            { q: "Which port is commonly used for HTTP traffic?", options: ["Port 80", "Port 443", "Port 21", "Port 25"], ans: 0 },
            { q: "What is the base of the hexadecimal number system?", options: ["16", "10", "8", "2"], ans: 0 },
            { q: "Which device regenerates network signals over long distances?", options: ["Repeater", "Switch", "Router", "Bridge"], ans: 0 }
          ],
          iq: [
            { q: "Binary 10 in decimal equals:", options: ["2", "10", "4", "1"], ans: 0 },
            { q: "If 1 KB = 1024 Bytes, 2 KB =", options: ["2048 Bytes", "2000 Bytes", "1024 Bytes", "4096 Bytes"], ans: 0 },
            { q: "Which is hardware: Windows, Antivirus, Mouse, MS Office?", options: ["Mouse", "Windows", "Antivirus", "MS Office"], ans: 0 },
            { q: "Shortcut for Undo is Ctrl + ?", options: ["Z", "Y", "C", "X"], ans: 0 },
            { q: "Smallest unit of digital image is:", options: ["Pixel", "Bit", "Byte", "Dot"], ans: 0 }
          ]
        },
        english: {
          subject: [
            { q: "What is a figure of speech comparing two unlike things using 'like' or 'as'?", options: ["Simile", "Metaphor", "Personification", "Alliteration"], ans: 0 },
            { q: "Choose the correct indirect speech of: He said, 'I am tired.'", options: ["He said that he was tired.", "He said he is tired.", "He told he was tired.", "He says he is tired."], ans: 0 },
            { q: "What is the antonym of 'Transparent'?", options: ["Opaque", "Clear", "Bright", "Translucent"], ans: 0 },
            { q: "Identify the gerund in: 'Swimming is a great exercise.'", options: ["Swimming", "Is", "Great", "Exercise"], ans: 0 },
            { q: "What is the synonym of 'Benevolent'?", options: ["Kind", "Cruel", "Angry", "Hateful"], ans: 0 },
            { q: "Which word is spelled correctly?", options: ["Environment", "Envirnment", "Enviroment", "Envirnoment"], ans: 0 },
            { q: "What does the idiom 'Break a leg' mean?", options: ["Good luck", "Get injured", "Run fast", "Stop working"], ans: 0 },
            { q: "Identify the modal verb in: 'You must submit your assignment.'", options: ["Must", "Submit", "Assignment", "You"], ans: 0 },
            { q: "What is the past participle of 'Write'?", options: ["Written", "Wrote", "Writing", "Writed"], ans: 0 },
            { q: "What is the plural of 'Matrix'?", options: ["Matrices", "Matrixes", "Matrix", "Matrice"], ans: 0 }
          ],
          iq: [
            { q: "Find missing letter in sequence: B, D, F, H, ?", options: ["J", "I", "K", "L"], ans: 0 },
            { q: "Which word means same as 'Enormous'?", options: ["Huge", "Tiny", "Small", "Thin"], ans: 0 },
            { q: "Odd one out: Apple, Orange, Banana, Potato", options: ["Potato", "Apple", "Orange", "Banana"], ans: 0 },
            { q: "Opposite of 'Optimistic' is:", options: ["Pessimistic", "Hopeful", "Positive", "Bright"], ans: 0 },
            { q: "Complete analogy: Doctor : Hospital :: Teacher : ?", options: ["School", "Office", "Court", "Bank"], ans: 0 }
          ]
        },
        maths: {
          subject: [
            { q: "Value of log(10) to base 10 is:", options: ["0", "1", "10", "100"], ans: 1 },
            { q: "If A and B are disjoint sets, then A ∩ B = ?", options: ["A", "B", "Empty Set (∅)", "Universal Set"], ans: 2 },
            { q: "Discriminant of quadratic equation ax² + bx + c = 0 is:", options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "b - 4ac"], ans: 0 },
            { q: "What is the value of i² (iota squared)?", options: ["1", "-1", "0", "2"], ans: 1 },
            { q: "Product of roots of quadratic equation ax² + bx + c = 0 is:", options: ["-b/a", "c/a", "b/c", "a/c"], ans: 1 },
            { q: "Degree of a linear polynomial is:", options: ["0", "1", "2", "3"], ans: 1 },
            { q: "If a matrix has 2 rows and 3 columns, its order is:", options: ["3x2", "2x3", "6", "2x2"], ans: 1 },
            { q: "Determinant of identity matrix I of order 2x2 is:", options: ["0", "1", "2", "-1"], ans: 1 },
            { q: "Hypotenuse² = Base² + ______²", options: ["Perpendicular", "Area", "Side", "Radius"], ans: 0 },
            { q: "In a right triangle, sin(30°) equals:", options: ["1/2", "√3/2", "1/√2", "1"], ans: 0 }
          ],
          iq: [
            { q: "If 2^3 = 8, what is 3^2?", options: ["9", "6", "8", "12"], ans: 0 },
            { q: "Find next prime number after 13:", options: ["17", "15", "14", "19"], ans: 0 },
            { q: "What is 15% of 100?", options: ["15", "10", "20", "25"], ans: 0 },
            { q: "If x + 2 = 10, then 2x = ?", options: ["16", "8", "20", "12"], ans: 0 },
            { q: "Average of 10, 20, 30 is:", options: ["20", "15", "25", "30"], ans: 0 }
          ]
        },
        science: {
          subject: [
            { q: "S.I. unit of momentum is:", options: ["kg m/s", "N/m", "kg m/s²", "Joule"], ans: 0 },
            { q: "Avogadro's number is equal to:", options: ["6.022 x 10²³", "3 x 10⁸", "9.8 x 10²²", "1.6 x 10⁻¹⁹"], ans: 0 },
            { q: "Which organelle contains digestive enzymes?", options: ["Lysosome", "Golgi Body", "Chloroplast", "Ribosome"], ans: 0 },
            { q: "Inertia of a body depends directly on its:", options: ["Mass", "Velocity", "Volume", "Shape"], ans: 0 },
            { q: "Valency of Carbon is:", options: ["2", "4", "6", "8"], ans: 1 },
            { q: "Phloem tissue transports ______ in plants.", options: ["Water", "Organic Food", "Minerals", "Gases"], ans: 1 },
            { q: "Universal gravitational constant G value is approximately:", options: ["6.67 x 10⁻¹¹ N m²/kg²", "9.8 m/s²", "3 x 10⁸ m/s", "1.01 x 10⁵ Pa"], ans: 0 },
            { q: "Isotopes have same atomic number but different ______ number.", options: ["Proton", "Electron", "Mass / Neutron", "Valency"], ans: 2 },
            { q: "Process of division of nucleus in cell cycle is:", options: ["Karyokinesis", "Cytokinesis", "Interphase", "Meiosis"], ans: 0 },
            { q: "Formula for kinetic energy is:", options: ["mgh", "1/2 mv²", "fd", "ma"], ans: 1 }
          ],
          iq: [
            { q: "Light speed in km/s is roughly:", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "3,000 km/s"], ans: 0 },
            { q: "Matter that has no fixed shape nor volume:", options: ["Gas", "Liquid", "Solid", "Crystal"], ans: 0 },
            { q: "Which planet is famous for rings?", options: ["Saturn", "Jupiter", "Uranus", "Mars"], ans: 0 },
            { q: "Boiling point of water in Kelvin is:", options: ["373 K", "273 K", "100 K", "0 K"], ans: 0 },
            { q: "Power unit Watt = Joule per ?", options: ["Second", "Minute", "Hour", "Meter"], ans: 0 }
          ]
        },
        islamiat: {
          subject: [
            { q: "Ghazwa-e-Uhud me Kitne Musalman Shaheed huway?", options: ["50", "70", "100", "313"], ans: 1 },
            { q: "Surah Al-Anfal me kis Ghazwa ka zikr kasrat se hai?", options: ["Ghazwa-e-Badr", "Ghazwa-e-Uhud", "Ghazwa-e-Khandaq", "Ghazwa-e-Tabook"], ans: 0 },
            { q: "Sulah Hudaibiya kis saal hui?", options: ["5 Hijri", "6 Hijri", "7 Hijri", "8 Hijri"], ans: 1 },
            { q: "Hadith ke lughwi maani kya hain?", options: ["Nasihat", "Nayi Baat / Guftagu", "Hukm", "Kitab"], ans: 1 },
            { q: "Quran Majeed me Sujud-e-Tilawat kitne hain?", options: ["12", "14", "15", "16"], ans: 1 },
            { q: "Ghazwa-e-Khandaq ka doosra naam kya hai?", options: ["Ghazwa-e-Ahzab", "Ghazwa-e-Tabook", "Ghazwa-e-Hunain", "Ghazwa-e-Mutah"], ans: 0 },
            { q: "Hazrat Hamza (R.A) kis Ghazwa me Shaheed huway?", options: ["Ghazwa-e-Badr", "Ghazwa-e-Uhud", "Ghazwa-e-Khandaq", "Ghazwa-e-Khaibar"], ans: 1 },
            { q: "Misaq-e-Madina kitne mukhtalif fariqon ke darmian hua?", options: ["2", "3", "4", "5"], ans: 0 },
            { q: "Bait-e-Rizwan kis mauqa par li gayi?", options: ["Sulah Hudaibiya", "Fatah Makkah", "Ghazwa-e-Badr", "Hajjat-ul-Wada"], ans: 0 },
            { q: "Zakat ke masarif ki tadad Kitni hai?", options: ["6", "7", "8", "10"], ans: 2 }
          ],
          iq: [
            { q: "Hijri taqwim kis mahine se shuru hoti hai?", options: ["Muharram", "Ramzan", "Rabi-ul-Awwal", "Shawwal"], ans: 0 },
            { q: "Aitekaaf kis mahine ke aakhri 10 din me hota hai?", options: ["Ramzan", "Rajab", "Shaban", "Zul-Hijjah"], ans: 0 },
            { q: "Quran Sharif me kul kitni Manzilein hain?", options: ["7", "30", "114", "6666"], ans: 0 },
            { q: "As-Saif-ullah kis Sahabi ka laqab hai?", options: ["Hazrat Khalid bin Waleed (R.A)", "Hazrat Ali (R.A)", "Hazrat Hamza (R.A)", "Hazrat Umar (R.A)"], ans: 0 },
            { q: "Jummah ki namaz me kitni Farz rakatein hain?", options: ["2", "4", "3", "1"], ans: 0 }
          ]
        },
        physics: {
          subject: [
            { q: "Branch of physics dealing with study of motion without reference to force:", options: ["Kinematics", "Dynamics", "Statics", "Thermodynamics"], ans: 0 },
            { q: "Vector quantity among the following is:", options: ["Speed", "Distance", "Displacement", "Mass"], ans: 2 },
            { q: "Turning effect of a force is called:", options: ["Torque", "Work", "Momentum", "Pressure"], ans: 0 },
            { q: "Center of gravity of a uniform rod is at its:", options: ["Mid-point", "One end", "Quarter point", "Outside"], ans: 0 },
            { q: "Value of 'g' at the center of Earth is:", options: ["9.8 m/s²", "Infinity", "Zero", "4.9 m/s²"], ans: 2 },
            { q: "Hooke's Law is valid within:", options: ["Plastic limit", "Elastic limit", "Break point", "Ultimate stress"], ans: 1 },
            { q: "Specific heat capacity of water is:", options: ["4200 J/kg K", "2100 J/kg K", "1000 J/kg K", "33600 J/kg K"], ans: 0 },
            { q: "State of matter having definite shape and volume:", options: ["Solid", "Liquid", "Gas", "Plasma"], ans: 0 },
            { q: "Transfer of heat in solids takes place mainly by:", options: ["Conduction", "Convection", "Radiation", "Absorption"], ans: 0 },
            { q: "Efficiency of a machine is ratio of Output to ______.", options: ["Power", "Input", "Work", "Loss"], ans: 1 }
          ],
          iq: [
            { q: "Friction opposes motion in which direction?", options: ["Opposite", "Same", "Perpendicular", "Any"], ans: 0 },
            { q: "Work = Force x Displacement x cos(?) for max work:", options: ["0°", "90°", "180°", "45°"], ans: 0 },
            { q: "Convex lens is also known as:", options: ["Converging Lens", "Diverging Lens", "Flat Lens", "Mirror"], ans: 0 },
            { q: "Potential energy formula is m x g x ?", options: ["h (Height)", "v (Velocity)", "t (Time)", "a"], ans: 0 },
            { q: "Sound travels fastest in Solid, Liquid, or Gas?", options: ["Solid", "Liquid", "Gas", "Vacuum"], ans: 0 }
          ]
        },
        chemistry: {
          subject: [
            { q: "Empirical formula of Benzene (C6H6) is:", options: ["CH", "C2H2", "CH2", "C6H6"], ans: 0 },
            { q: "Father of modern chemistry is:", options: ["Lavoisier", "Dalton", "Mendeleev", "Rutherford"], ans: 0 },
            { q: "Rutherford used which foil for scattering experiment?", options: ["Gold", "Silver", "Aluminum", "Copper"], ans: 0 },
            { q: "Maximum capacity of 'L' shell for electrons is:", options: ["2", "8", "18", "32"], ans: 1 },
            { q: "Modern periodic law was presented by:", options: ["Mendeleev", "Moseley", "Newlands", "Dobereiner"], ans: 1 },
            { q: "Bond formed by complete transfer of electrons is:", options: ["Ionic Bond", "Covalent Bond", "Coordinate Bond", "Metallic Bond"], ans: 0 },
            { q: "Bond formed by equal sharing of electrons:", options: ["Ionic", "Covalent", "Dative", "Hydrogen"], ans: 1 },
            { q: "Molarity is defined as moles of solute per ______ of solution.", options: ["Liter (dm³)", "Gram", "Kilogram", "Milliliter"], ans: 0 },
            { q: "Oxidation involves ______ of electrons.", options: ["Gain", "Loss", "Sharing", "Addition"], ans: 1 },
            { q: "Corrosion of Iron is commonly called:", options: ["Galvanizing", "Rusting", "Tarnishing", "Erosion"], ans: 1 }
          ],
          iq: [
            { q: "Formula of Ozone gas is:", options: ["O3", "O2", "O", "O4"], ans: 0 },
            { q: "pH 7 indicates neutral, acidic, or basic?", options: ["Neutral", "Acidic", "Basic", "Salt"], ans: 0 },
            { q: "Proton charge is positive, negative, or zero?", options: ["Positive", "Negative", "Zero", "Neutral"], ans: 0 },
            { q: "Heavy water contains isotope of Hydrogen named:", options: ["Deuterium", "Protium", "Tritium", "Helium"], ans: 0 },
            { q: "Gas produced when carbon burns in insufficient air:", options: ["Carbon Monoxide", "Carbon Dioxide", "Oxygen", "Methane"], ans: 0 }
          ]
        },
        biology: {
          subject: [
            { q: "Binomial nomenclature system was introduced by:", options: ["Carolus Linnaeus", "Robert Hooke", "Aristotle", "Darwin"], ans: 0 },
            { q: "Powerhouse of eukaryotic cell is:", options: ["Mitochondria", "Chloroplast", "Golgi Body", "Ribosome"], ans: 0 },
            { q: "Phase of mitosis where chromosomes line up at equator:", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], ans: 1 },
            { q: "Enzymes speed up chemical reactions by lowering ______ energy.", options: ["Kinetic", "Activation", "Potential", "Thermal"], ans: 1 },
            { q: "Dark reaction of photosynthesis occurs in:", options: ["Thylakoid", "Stroma", "Granum", "Outer membrane"], ans: 1 },
            { q: "Opening and closing of stomata is controlled by:", options: ["Guard Cells", "Epidermal Cells", "Mesophyll Cells", "Xylem Cells"], ans: 0 },
            { q: "Major component of plant cell wall is:", options: ["Chitin", "Cellulose", "Peptidoglycan", "Lignin"], ans: 1 },
            { q: "Loss of water in vapor form from aerial parts of plant:", options: ["Guttation", "Transpiration", "Evaporation", "Imbibition"], ans: 1 },
            { q: "Which blood vessel carries oxygenated blood from lungs to heart?", options: ["Pulmonary Artery", "Pulmonary Vein", "Aorta", "Vena Cava"], ans: 1 },
            { q: "Dengue fever is transmitted by vector female:", options: ["Anopheles", "Aedes Mosquito", "Culex", "Housefly"], ans: 1 }
          ],
          iq: [
            { q: "DNA structure was discovered as double:", options: ["Helix", "Square", "Circle", "Sheet"], ans: 0 },
            { q: "Largest organ in human body is:", options: ["Skin", "Liver", "Brain", "Heart"], ans: 0 },
            { q: "Which cell lacks a nucleus?", options: ["Red Blood Cell", "White Blood Cell", "Neuron", "Muscle Cell"], ans: 0 },
            { q: "Vitamin C deficiency causes:", options: ["Scurvy", "Rickets", "Beriberi", "Goitre"], ans: 0 },
            { q: "Heart of human has how many valves primarily?", options: ["4", "2", "3", "6"], ans: 0 }
          ]
        },
        history: {
          subject: [
            { q: "Objectives Resolution was passed in Constituent Assembly in year:", options: ["1947", "1949", "1951", "1956"], ans: 1 },
            { q: "Who was the prime mover of Two-Nation Theory initially?", options: ["Sir Syed Ahmad Khan", "Quaid-e-Azam", "Allama Iqbal", "Chaudhry Rahmat Ali"], ans: 0 },
            { q: "Who coined the name 'Pakistan' in 1933 pamphlet?", options: ["Chaudhry Rahmat Ali", "Allama Iqbal", "Liaquat Ali Khan", "Sir Aga Khan"], ans: 0 },
            { q: "Under 1973 Constitution, who is the head of state in Pakistan?", options: ["Prime Minister", "President", "Chief Justice", "Speaker"], ans: 1 },
            { q: "Lucknow Pact (1916) was signed between Muslim League and:", options: ["British Raj", "Congress", "Akali Dal", "Unionist Party"], ans: 1 },
            { q: "First Governor General of Pakistan was:", options: ["Liaquat Ali Khan", "Quaid-e-Azam Mohammad Ali Jinnah", "Iskander Mirza", "Khawaja Nazimuddin"], ans: 1 },
            { q: "Who led the Simla Deputation in 1906?", options: ["Sir Aga Khan", "Nawab Waqar-ul-Mulk", "Sir Syed", "Mohsin-ul-Mulk"], ans: 0 },
            { q: "Cripps Mission came to India in which year?", options: ["1940", "1942", "1945", "1946"], ans: 1 },
            { q: "Boundary line between British India and Afghanistan is:", options: ["Radcliffe Line", "Durand Line", "McMahon Line", "Line of Control"], ans: 1 },
            { q: "In 1971, East Pakistan emerged as an independent nation named:", options: ["Sri Lanka", "Bangladesh", "Burma", "Maldives"], ans: 1 }
          ],
          iq: [
            { q: "Lahore Resolution was passed on 23rd March:", options: ["1940", "1930", "1947", "1956"], ans: 0 },
            { q: "Who wrote National Anthem of Pakistan?", options: ["Hafeez Jalandhari", "Allama Iqbal", "Faiz Ahmad", "Jamiluddin Aali"], ans: 0 },
            { q: "First Constitution of Pakistan came in:", options: ["1956", "1947", "1962", "1973"], ans: 0 },
            { q: "Year of independence of Pakistan:", options: ["1947", "1940", "1950", "1945"], ans: 0 },
            { q: "Who was first Prime Minister of Pakistan?", options: ["Liaquat Ali Khan", "Quaid-e-Azam", "Ayub Khan", "Bhutto"], ans: 0 }
          ]
        },
        geography: {
          subject: [
            { q: "Which mountain pass connects Pakistan with China?", options: ["Khyber Pass", "Khunjerab Pass", "Bolan Pass", "Tochi Pass"], ans: 1 },
            { q: "Total land area of Pakistan is approximately:", options: ["796,095 sq km", "881,913 sq km", "650,000 sq km", "500,000 sq km"], ans: 1 },
            { q: "Mangla Dam is constructed on which river?", options: ["Indus", "Jhelum", "Chenab", "Sutlej"], ans: 1 },
            { q: "Tarbela Dam is constructed on river:", options: ["Indus", "Kabul", "Swat", "Ravi"], ans: 0 },
            { q: "Largest seaport of Pakistan is:", options: ["Gwadar Port", "Port Qasim", "Karachi Port", "Pasni Port"], ans: 2 },
            { q: "Natural vegetation found in dry arid regions:", options: ["Alpine", "Coniferous", "Thorn / Desert Scrub", "Mangroves"], ans: 2 },
            { q: "Mangrove forests in Pakistan are mainly located in delta of:", options: ["Indus Delta", "Hub Delta", "Makran Coast", "Dasht Delta"], ans: 0 },
            { q: "Which natural gas field discovered in 1952 is largest in Pakistan?", options: ["Sui Gas Field", "Badin", "Mari", "Qadirpur"], ans: 0 },
            { q: "Khyber Pass connects Peshawar with:", options: ["Kabul", "Quetta", "Chitral", "Islamabad"], ans: 0 },
            { q: "Which crop is known as the 'King of Fibers' in Pakistan?", options: ["Rice", "Wheat", "Cotton", "Sugarcane"], ans: 2 }
          ],
          iq: [
            { q: "Highest peak of Pakistan is:", options: ["K2", "Nanga Parbat", "Broad Peak", "Tirich Mir"], ans: 0 },
            { q: "City of Lights in Pakistan is:", options: ["Karachi", "Lahore", "Islamabad", "Multan"], ans: 0 },
            { q: "Khyber Pass is in which province?", options: ["KPK", "Punjab", "Sindh", "Balochistan"], ans: 0 },
            { q: "Gwadar port is located in which province?", options: ["Balochistan", "Sindh", "KPK", "Punjab"], ans: 0 },
            { q: "River Indus originates from:", options: ["Tibet (Lake Mansarovar)", "Kashmir", "Punjab", "Gilgit"], ans: 0 }
          ]
        }
      },

      "Class 10": {
        computer: {
          subject: [
            { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["Stack", "Queue", "Array", "Tree"], ans: 0 },
            { q: "Which protocol is used to send secure emails?", options: ["HTTPS / SMTPS", "FTP", "SNMP", "TCP"], ans: 0 },
            { q: "What is the time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], ans: 0 },
            { q: "Which database model represents data in tables (rows and columns)?", options: ["Relational Database", "Hierarchical", "Network", "Object-Oriented"], ans: 0 },
            { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "System Quality Logic", "Standard Query Link"], ans: 0 },
            { q: "Which of these is an example of cloud computing?", options: ["Google Drive", "Local Hard Drive", "RAM", "CD Drive"], ans: 0 },
            { q: "What is a firewall used for?", options: ["Network Security", "Speed boost", "Data storage", "Cooling CPU"], ans: 0 },
            { q: "Which concept in OOPs binds data and functions together?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], ans: 0 },
            { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interaction", "Application Process Integration"], ans: 0 },
            { q: "Which sorting algorithm has the best average-case performance?", options: ["Merge Sort / Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], ans: 0 }
          ],
          iq: [
            { q: "Full form of AI is:", options: ["Artificial Intelligence", "Automated Interface", "Active Integration", "Advanced Internet"], ans: 0 },
            { q: "1 Gigabyte (GB) equals how many MB?", options: ["1024 MB", "1000 MB", "512 MB", "2048 MB"], ans: 0 },
            { q: "CPU stands for:", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Program Unit"], ans: 0 },
            { q: "Which key renames a selected file in Windows?", options: ["F2", "F1", "F5", "F11"], ans: 0 },
            { q: "Which component is heart of computer hardware?", options: ["Motherboard", "Keyboard", "Mouse", "Monitor"], ans: 0 }
          ]
        },
        english: {
          subject: [
            { q: "What is a narrative poem set to music called?", options: ["Ballad", "Sonnet", "Epic", "Ode"], ans: 0 },
            { q: "What does the idiom 'Bite the bullet' mean?", options: ["Face a difficult situation with courage", "Eat something hard", "Shoot a gun", "Give up easily"], ans: 0 },
            { q: "Choose the correct sentence in conditional type 2:", options: ["If I were rich, I would travel the world.", "If I am rich, I will travel.", "If I was rich, I travel.", "If I had rich, I traveled."], ans: 0 },
            { q: "What is the antonym of 'Meticulous'?", options: ["Careless", "Careful", "Exact", "Detailed"], ans: 0 },
            { q: "Identify the clause type in: 'Although it was raining, we went out.'", options: ["Adverbial clause of concession", "Noun clause", "Relative clause", "Independent clause"], ans: 0 },
            { q: "What is the synonym of 'Ephemeral'?", options: ["Short-lived", "Permanent", "Eternal", "Endless"], ans: 0 },
            { q: "Which word is a homophone of 'Principal'?", options: ["Principle", "Prince", "Print", "Printable"], ans: 0 },
            { q: "What is an oxymoron?", options: ["Two contradictory terms used together", "A long exaggeration", "A humorous poem", "A direct comparison"], ans: 0 },
            { q: "What is the plural of 'Phenomenon'?", options: ["Phenomena", "Phenomenons", "Phenomenas", "Phenomeni"], ans: 0 },
            { q: "Who wrote 'A Tale of Two Cities'?", options: ["Charles Dickens", "Jane Austen", "Thomas Hardy", "George Orwell"], ans: 0 }
          ],
          iq: [
            { q: "Synonym of 'Abundant' is:", options: ["Plentiful", "Scarce", "Rare", "Empty"], ans: 0 },
            { q: "Antonym of 'Compulsory' is:", options: ["Optional", "Mandatory", "Necessary", "Required"], ans: 0 },
            { q: "Find correct spelling:", options: ["Accommodate", "Acomodate", "Accomodate", "Acommodate"], ans: 0 },
            { q: "Complete idiom: Every cloud has a silver:", options: ["Lining", "Border", "Shine", "Color"], ans: 0 },
            { q: "What type of word is 'Quietly'?", options: ["Adverb", "Adjective", "Noun", "Verb"], ans: 0 }
          ]
        },
        maths: {
          subject: [
            { q: "Standard form of quadratic equation is:", options: ["ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + c = 0", "x/a + y/b = 1"], ans: 0 },
            { q: "Distance formula between two points (x1, y1) and (x2, y2):", options: ["√[(x2-x1)² + (y2-y1)²]", "(x1+x2)/2", "m = (y2-y1)/(x2-x1)", "x² + y² = r²"], ans: 0 },
            { q: "In circle geometry, angle subtended by semi-circle is:", options: ["90°", "180°", "60°", "45°"], ans: 0 },
            { q: "Value of tan(45°) is equal to:", options: ["1", "0", "1/√3", "√3"], ans: 0 },
            { q: "Formula sin²θ + cos²θ = ?", options: ["1", "0", "tan²θ", "2"], ans: 0 },
            { q: "Mode in statistics represents:", options: ["Most frequent value", "Middle value", "Average", "Difference"], ans: 0 },
            { q: "Probability of an impossible event is:", options: ["0", "1", "0.5", "-1"], ans: 0 },
            { q: "If radius of sphere is r, its volume formula is:", options: ["4/3 π r³", "4 π r²", "2 π r", "π r² h"], ans: 0 },
            { q: "Arithmetic mean between 'a' and 'b' is:", options: ["(a+b)/2", "√(ab)", "2ab/(a+b)", "a - b"], ans: 0 },
            { q: "A line touching a circle at exactly one point is called:", options: ["Tangent", "Secant", "Chord", "Diameter"], ans: 0 }
          ],
          iq: [
            { q: "Logarithm base 10 of 1000 is:", options: ["3", "2", "1", "10"], ans: 0 },
            { q: "If sinθ = 1, then θ =", options: ["90°", "0°", "45°", "60°"], ans: 0 },
            { q: "Solve: (x+2)(x-2) =", options: ["x² - 4", "x² + 4", "x² - 2", "2x - 4"], ans: 0 },
            { q: "Sum of probabilities of all possible outcomes is:", options: ["1", "0", "100", "0.5"], ans: 0 },
            { q: "If diameter of circle is 14 cm, radius is:", options: ["7 cm", "28 cm", "14 cm", "3.5 cm"], ans: 0 }
          ]
        },
        science: {
          subject: [
            { q: "Unit of electrical resistance is:", options: ["Ohm (Ω)", "Volt", "Watt", "Farad"], ans: 0 },
            { q: "pH scale ranges from:", options: ["0 to 14", "1 to 10", "0 to 100", "-7 to +7"], ans: 0 },
            { q: "Functional unit of human kidney is:", options: ["Nephron", "Neuron", "Alveoli", "Villous"], ans: 0 },
            { q: "Split of heavy nucleus into lighter nuclei is called:", options: ["Nuclear Fission", "Nuclear Fusion", "Radioactivity", "Ionization"], ans: 0 },
            { q: "Functional group of Alcohols is:", options: ["-OH", "-CHO", "-COOH", "-CO-"], ans: 0 },
            { q: "Refractive index of diamond is approximately:", options: ["2.42", "1.33", "1.52", "1.00"], ans: 0 },
            { q: "Hormone regulating blood glucose level:", options: ["Insulin", "Thyroxine", "Adrenaline", "Estrogen"], ans: 0 },
            { q: "Ohm's law formula is:", options: ["V = IR", "P = VI", "F = ma", "E = mc²"], ans: 0 },
            { q: "Hydrocarbons containing double bond are called:", options: ["Alkenes", "Alkanes", "Alkynes", "Alkanols"], ans: 0 },
            { q: "Chromosome number in normal human body cells is:", options: ["46 (23 pairs)", "44", "48", "23 single"], ans: 0 }
          ],
          iq: [
            { q: "Light is which type of wave?", options: ["Electromagnetic", "Mechanical", "Longitudinal", "Sound"], ans: 0 },
            { q: "Which metal is best conductor of electricity?", options: ["Silver", "Copper", "Gold", "Aluminum"], ans: 0 },
            { q: "Atomic number represents count of:", options: ["Protons", "Neutrons", "Electrons + Protons", "Atoms"], ans: 0 },
            { q: "Power of lens unit is:", options: ["Diopter", "Meter", "Watt", "Joule"], ans: 0 },
            { q: "Gas responsible for global warming primarily:", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Argon"], ans: 0 }
          ]
        },
        islamiat: {
          subject: [
            { q: "Hajjat-ul-Wada kis Hijri me adaa kiya gaya?", options: ["10 Hijri", "8 Hijri", "9 Hijri", "11 Hijri"], ans: 0 },
            { q: "Quran-e-Pak ki muntedween aur zabt ka kaam kis Khalifa ke dor me mukammal hua?", options: ["Hazrat Abu Bakr (R.A) & Hazrat Usman (R.A)", "Hazrat Umar (R.A)", "Hazrat Ali (R.A)", "Hazrat Muawiya (R.A)"], ans: 0 },
            { q: "Ghazwa-e-Tabook kis mulk/taqat ke khilaf thi?", options: ["Rumi Empire (Byzantines)", "Khosrow / Parsis", "Jews of Khaibar", "Quraish"], ans: 0 },
            { q: "Jihad-e-Akbar kis ko qarar diya gaya hai?", options: ["Nafs ke khilaf Jihad", "Maal ka Jihad", "Talwar se Jihad", "Qalam se Jihad"], ans: 0 },
            { q: "Surah Al-Taubah me Bismillah kyu nahi hai?", options: ["Isme Ghazab & Munafiqeen par Bezarri ka zikr hai", "Yeh aakhri Surah thi", "Katib se reh gayi", "Pata nahi"], ans: 0 },
            { q: "Mawaikhat-e-Madina kahan ke logon ke darmian hui?", options: ["Muhajireen aur Ansar", "Ansar aur Jews", "Quraish aur Aus", "Khazraj aur Jews"], ans: 0 },
            { q: "Khaibar kis shahar ke qareeb ek Qila tha?", options: ["Madina Munawwara", "Makkah Mukarrama", "Taif", "Jeddah"], ans: 0 },
            { q: "Hazrat Ali (R.A) ko kis ne Shaheed kiya?", options: ["Ibn-e-Muljam", "Abu Lu'lu Firoz", "Abdullah bin Saba", "Yazeed"], ans: 0 },
            { q: "Ush'r zameen ki paidawar par kitna Hissa hota hai?", options: ["10% ya 5%", "2.5%", "20%", "15%"], ans: 0 },
            { q: "Sihah-e-Sitta se murad Hadith ki kitni mustanad kutub hain?", options: ["6 Kutub", "5 Kutub", "4 Kutub", "10 Kutub"], ans: 0 }
          ],
          iq: [
            { q: "Musalmanon ki pehli Hijrat kahan hui thi?", options: ["Habsha (Abyssinia)", "Madina", "Taif", "Yaman"], ans: 0 },
            { q: "Khatam-ul-Anbiya kis nabi ko kehte hain?", options: ["Hazrat Muhammad (S.A.W)", "Hazrat Isa (A.S)", "Hazrat Musa (A.S)", "Hazrat Adam (A.S)"], ans: 0 },
            { q: "Bait-ul-Muqaddas kahan waqia hai?", options: ["Palestine (Filastin)", "Saudi Arabia", "Egypt", "Jordan"], ans: 0 },
            { q: "Roze ka bunyadi maqsad kya hai?", options: ["Taqwa hasil karna", "Bhooka rehna", "Wazan kam karna", "Sona"], ans: 0 },
            { q: "Shab-e-Qadr kis mahine me aati hai?", options: ["Ramzan", "Rabi-ul-Awwal", "Muharram", "Zul-Hijjah"], ans: 0 }
          ]
        },
        physics: {
          subject: [
            { q: "Simple harmonic motion (SHM) acceleration is directly proportional to:", options: ["Displacement", "Velocity", "Mass", "Amplitude"], ans: 0 },
            { q: "Which type of wave is sound wave?", options: ["Longitudinal Mechanical", "Transverse Electromagnetic", "Surface Wave", "Stationary Wave"], ans: 0 },
            { q: "Speed of light in vacuum is:", options: ["3 x 10⁸ m/s", "3 x 10⁶ m/s", "3 x 10⁵ km/s", "Both 1 & 3"], ans: 3 },
            { q: "Coulomb's Law quantifies force between two:", options: ["Electric Charges", "Masses", "Magnetic Poles", "Currents"], ans: 0 },
            { q: "Unit of capacitance is:", options: ["Farad (F)", "Henry", "Tesla", "Ohm"], ans: 0 },
            { q: "Which logic gate outputs 1 only when all inputs are 1?", options: ["AND Gate", "OR Gate", "NOT Gate", "NAND Gate"], ans: 0 },
            { q: "Half-life of radioactive element formula constant:", options: ["0.693 / λ", "1 / λ", "λ²", "0.5 λ"], ans: 0 },
            { q: "Device converting mechanical energy into electrical energy:", options: ["Generator", "Motor", "Transformer", "Capacitor"], ans: 0 },
            { q: "Transformer works on principle of:", options: ["Mutual Induction", "Self Induction", "Seebeck Effect", "Photoelectric Effect"], ans: 0 },
            { q: "Which rays have highest penetrating power?", options: ["Gamma Rays", "Alpha Particles", "Beta Particles", "X-Rays"], ans: 0 }
          ],
          iq: [
            { q: "NOT gate inverts 0 to:", options: ["1", "0", "-1", "2"], ans: 0 },
            { q: "Unit of Frequency Hertz = ?", options: ["1 / Second", "Second", "Meter", "Joule"], ans: 0 },
            { q: "Substance with zero electrical resistance at low temp:", options: ["Superconductor", "Conductor", "Insulator", "Semiconductor"], ans: 0 },
            { q: "Alpha particle is nucleus of which atom?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], ans: 0 },
            { q: "Unit of magnetic field intensity is:", options: ["Tesla", "Weber", "Farad", "Henry"], ans: 0 }
          ]
        },
        chemistry: {
          subject: [
            { q: "Reversible reaction reaches equilibrium state when rates of forward and reverse reactions become:", options: ["Equal", "Zero", "Double", "Half"], ans: 0 },
            { q: "Self-ionization constant of water Kw at 25°C is:", options: ["1 x 10⁻¹⁴", "1 x 10⁻⁷", "1 x 10¹⁴", "7.0"], ans: 0 },
            { q: "Main component of Natural Gas (Sui Gas) is:", options: ["Methane (CH4)", "Ethane", "Propane", "Butane"], ans: 0 },
            { q: "General formula of Alkanes is:", options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnH2n+1"], ans: 0 },
            { q: "Deficiency of Vitamin A causes:", options: ["Night Blindness", "Scurvy", "Rickets", "Beriberi"], ans: 0 },
            { q: "Deoxyribose sugar is present in:", options: ["DNA", "RNA", "ATP", "Glucose"], ans: 0 },
            { q: "Hardness of temporary water is removed by adding:", options: ["Clark's Method (Slaked Lime)", "Washing Soda", "Zeolite", "Boiling"], ans: 3 },
            { q: "Major cause of Acid Rain is presence of oxides of:", options: ["Sulfur and Nitrogen", "Carbon and Hydrogen", "Sodium and Calcium", "Iron and Copper"], ans: 0 },
            { q: "Process of converting liquid oil into solid fat is:", options: ["Hydrogenation", "Halogenation", "Esterification", "Oxidation"], ans: 0 },
            { q: "Concentration of ore by Solvay process produces:", options: ["Sodium Carbonate", "Nitric Acid", "Sulfuric Acid", "Urea"], ans: 0 }
          ],
          iq: [
            { q: "Methane formula is CH4, how many Hydrogen atoms?", options: ["4", "1", "2", "3"], ans: 0 },
            { q: "Which acid is present in stomach?", options: ["Hydrochloric Acid (HCl)", "Sulfuric Acid", "Nitric Acid", "Acetic Acid"], ans: 0 },
            { q: "Vinegar contains which acid?", options: ["Acetic Acid", "Citric Acid", "Lactic Acid", "Formic Acid"], ans: 0 },
            { q: "Natural gas Sui Gas main component is Methane or Ethane?", options: ["Methane", "Ethane", "Propane", "Butane"], ans: 0 },
            { q: "Glucose formula is C6H12O6, total atoms =", options: ["24", "12", "18", "6"], ans: 0 }
          ]
        },
        biology: {
          subject: [
            { q: "Maintenance of internal body conditions within narrow range:", options: ["Homeostasis", "Osmoregulation", "Thermoregulation", "Excretion"], ans: 0 },
            { q: "Reflex action is controlled by:", options: ["Spinal Cord", "Cerebrum", "Cerebellum", "Medulla Oblongata"], ans: 0 },
            { q: "Asexual reproduction in Yeast occurs by:", options: ["Budding", "Binary Fission", "Fragmentation", "Spore Formation"], ans: 0 },
            { q: "Transmission of traits from parents to offspring is:", options: ["Heredity / Genetics", "Evolution", "Variation", "Taxonomy"], ans: 0 },
            { q: "Father of Genetics is:", options: ["Gregor Mendel", "Charles Darwin", "Watson", "Crick"], ans: 0 },
            { q: "Phenotype refers to physical expression while Genotype refers to:", options: ["Genetic Constitution", "Chromosomes", "Environment", "Mutations"], ans: 0 },
            { q: "In DNA, Adenine always pairs with:", options: ["Thymine", "Guanine", "Cytosine", "Uracil"], ans: 0 },
            { q: "Symbiotic relationship where both species benefit:", options: ["Mutualism", "Commensalism", "Parasitism", "Predation"], ans: 0 },
            { q: "Production of identical copies of genes or organisms is:", options: ["Cloning", "Splicing", "Fermentation", "Mutation"], ans: 0 },
            { q: "Antibiotics are used to treat infections caused by:", options: ["Bacteria", "Viruses", "Fungi", "Protozoa"], ans: 0 }
          ],
          iq: [
            { q: "Brain cell is called Neuron or Nephron?", options: ["Neuron", "Nephron", "Axon", "Cell"], ans: 0 },
            { q: "Kidney cell is called Nephron or Neuron?", options: ["Nephron", "Neuron", "Alveoli", "Villi"], ans: 0 },
            { q: "How many pairs of chromosomes in humans?", options: ["23 pairs", "46 pairs", "22 pairs", "24 pairs"], ans: 0 },
            { q: "Master gland of body is Pituitary or Thyroid?", options: ["Pituitary Gland", "Thyroid Gland", "Pancreas", "Adrenal"], ans: 0 },
            { q: "Gas taken in during respiration by humans:", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 0 }
          ]
        },
        history: {
          subject: [
            { q: "Year of enforcement of current Constitution of Pakistan:", options: ["1973", "1956", "1962", "1985"], ans: 0 },
            { q: "Simla Agreement in 1972 was signed between Z.A. Bhutto and:", options: ["Indira Gandhi", "Jawaharlal Nehru", "Atal Bihari Vajpayee", "Lal Bahadur Shastri"], ans: 0 },
            { q: "Pakistan became a nuclear power in May 1998 at:", options: ["Chagai Hills", "Thar", "Kahuta", "Skarud"], ans: 0 },
            { q: "Organization of Islamic Cooperation (OIC) summit was held in Lahore in year:", options: ["1974", "1971", "1977", "1981"], ans: 0 },
            { q: "Operation Zarb-e-Azb was launched by Pakistan Armed Forces in:", options: ["2014", "2008", "2016", "2010"], ans: 0 },
            { q: "China-Pakistan Economic Corridor (CPEC) agreement was formally launched in:", options: ["2015", "2010", "2018", "2013"], ans: 0 },
            { q: "Who was the founder of PPP (Pakistan Peoples Party)?", options: ["Zulfikar Ali Bhutto", "Benazir Bhutto", "Nawaz Sharif", "Asif Ali Zardari"], ans: 0 },
            { q: "First woman Prime Minister of Muslim World was:", options: ["Benazir Bhutto", "Sheikh Hasina", "Khaleda Zia", "Tansu Ciller"], ans: 0 },
            { q: "SAARC (South Asian Association) was established in year:", options: ["1985", "1990", "1978", "1995"], ans: 0 },
            { q: "Pakistan became member of United Nations (UN) on:", options: ["30 September 1947", "14 August 1947", "23 March 1948", "15 August 1947"], ans: 0 }
          ],
          iq: [
            { q: "Pakistan nuclear test date 28th May is celebrated as:", options: ["Youm-e-Takbeer", "Youm-e-Pakistan", "Youm-e-Iqbal", "Defense Day"], ans: 0 },
            { q: "Defense Day in Pakistan is celebrated on 6th:", options: ["September", "August", "March", "December"], ans: 0 },
            { q: "Current constitution of Pakistan was passed in year:", options: ["1973", "1956", "1962", "1947"], ans: 0 },
            { q: "Highest military award of Pakistan is:", options: ["Nishan-e-Haider", "Hilal-e-Jurat", "Sitara-e-Imtiaz", "Tamgha-e-Jurat"], ans: 0 },
            { q: "State Bank of Pakistan was inaugurated by Quaid-e-Azam in:", options: ["1948", "1947", "1949", "1950"], ans: 0 }
          ]
        },
        geography: {
          subject: [
            { q: "Gwadar Port is situated in which province?", options: ["Balochistan", "Sindh", "KPK", "Punjab"], ans: 0 },
            { q: "Climate zone of southern coastal areas of Pakistan:", options: ["Tropical / Coastal", "Sub-tropical Continental", "Alpine", "Arid Desert"], ans: 0 },
            { q: "Which canal system is the largest contiguous irrigation network in the world?", options: ["Indus Basin System", "Nile Canal System", "Suez Canal System", "Panama System"], ans: 0 },
            { q: "Major source of electricity generation in Pakistan currently includes:", options: ["Thermal and Hydel", "Nuclear only", "Solar only", "Wind only"], ans: 0 },
            { q: "Chashma Nuclear Power Plant is located in:", options: ["Punjab (Mianwali)", "Sindh", "Balochistan", "KPK"], ans: 0 },
            { q: "Thar coal reserve is famous for producing which type of coal?", options: ["Lignite", "Anthracite", "Bituminous", "Peat"], ans: 0 },
            { q: "Which city is known as the Manchester of Pakistan due to textile industry?", options: ["Faisalabad", "Sialkot", "Gujranwala", "Multan"], ans: 0 },
            { q: "City famous worldwide for manufacturing sports goods:", options: ["Sialkot", "Lahore", "Karachi", "Peshawar"], ans: 0 },
            { q: "Which glacier in Karakoram is one of world's longest non-polar glaciers?", options: ["Siachen Glacier", "Baltoro", "Biafo", "Hispar"], ans: 0 },
            { q: "Attock oil refinery processes crude oil from which region in Pakistan?", options: ["Potohar Plateau", "Badin Basin", "Sui", "Swat"], ans: 0 }
          ],
          iq: [
            { q: "Manchester of Pakistan is Faisalabad or Lahore?", options: ["Faisalabad", "Lahore", "Karachi", "Multan"], ans: 0 },
            { q: "City famous for surgical instruments & sports goods:", options: ["Sialkot", "Gujranwala", "Rawalpindi", "Hyderabad"], ans: 0 },
            { q: "Which desert is in Punjab, Pakistan?", options: ["Cholistan / Thal", "Thar", "Kharan", "Sahara"], ans: 0 },
            { q: "Port Qasim is located in which city?", options: ["Karachi", "Gwadar", "Pasni", "Ormara"], ans: 0 },
            { q: "Karakoram Highway connects Pakistan with:", options: ["China", "Afghanistan", "Iran", "India"], ans: 0 }
          ]
        }
      }
};
