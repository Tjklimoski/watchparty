"use server";

const wordList = [
  "2g1c",
  "2girls1cup",
  "acrotomophilia",
  "alabamahotpocket",
  "alaskanpipeline",
  "anal",
  "anilingus",
  "anus",
  "apeshit",
  "arsehole",
  "ass",
  "asshole",
  "assmunch",
  "autoerotic",
  "autoerotic",
  "babeland",
  "babybatter",
  "babyjuice",
  "ballgag",
  "ballgravy",
  "ballkicking",
  "balllicking",
  "ballsack",
  "ballsucking",
  "bangbros",
  "bangbus",
  "bareback",
  "barelylegal",
  "barenaked",
  "bastard",
  "bastardo",
  "bastinado",
  "bbw",
  "bdsm",
  "beaner",
  "beaners",
  "beavercleaver",
  "beaverlips",
  "beastiality",
  "bestiality",
  "bigblack",
  "bigbreasts",
  "bigknockers",
  "bigtits",
  "bimbos",
  "birdlock",
  "bitch",
  "bitches",
  "blackcock",
  "blondeaction",
  "blondeonblondeaction",
  "blowjob",
  "blowjob",
  "blowyourload",
  "bluewaffle",
  "blumpkin",
  "bollocks",
  "bondage",
  "boner",
  "boob",
  "boobs",
  "bootycall",
  "brownshowers",
  "brunetteaction",
  "bukkake",
  "bulldyke",
  "bulletvibe",
  "bullshit",
  "bunghole",
  "bunghole",
  "busty",
  "butt",
  "buttcheeks",
  "butthole",
  "cameltoe",
  "camgirl",
  "camslut",
  "camwhore",
  "carpetmuncher",
  "carpetmuncher",
  "chocolaterosebuds",
  "cialis",
  "circlejerk",
  "clevelandsteamer",
  "clit",
  "clitoris",
  "cloverclamps",
  "clusterfuck",
  "cock",
  "cocks",
  "coprolagnia",
  "coprophilia",
  "cornhole",
  "coon",
  "coons",
  "creampie",
  "cum",
  "cumming",
  "cumshot",
  "cumshots",
  "cunnilingus",
  "cunt",
  "darkie",
  "daterape",
  "daterape",
  "deepthroat",
  "deepthroat",
  "dendrophilia",
  "dick",
  "dildo",
  "dingleberry",
  "dingleberries",
  "dirtypillows",
  "dirtysanchez",
  "doggiestyle",
  "doggiestyle",
  "doggystyle",
  "doggystyle",
  "dogstyle",
  "dolcett",
  "domination",
  "dominatrix",
  "dommes",
  "donkeypunch",
  "doubledong",
  "doublepenetration",
  "dpaction",
  "dryhump",
  "dvda",
  "eatmyass",
  "ecchi",
  "ejaculation",
  "erotic",
  "erotism",
  "escort",
  "eunuch",
  "fag",
  "faggot",
  "fecal",
  "felch",
  "fellatio",
  "feltch",
  "femalesquirting",
  "femdom",
  "figging",
  "fingerbang",
  "fingering",
  "fisting",
  "footfetish",
  "footjob",
  "frotting",
  "fuck",
  "fuckbuttons",
  "fuckin",
  "fucking",
  "fucktards",
  "fudgepacker",
  "fudgepacker",
  "futanari",
  "gangbang",
  "gangbang",
  "gaysex",
  "genitals",
  "giantcock",
  "girlon",
  "girlontop",
  "girlsgonewild",
  "goatcx",
  "goatse",
  "goddamn",
  "gokkun",
  "goldenshower",
  "goodpoop",
  "googirl",
  "goregasm",
  "grope",
  "groupsex",
  "g-spot",
  "guro",
  "handjob",
  "handjob",
  "hardcore",
  "hardcore",
  "hentai",
  "homoerotic",
  "honkey",
  "hooker",
  "horny",
  "hotcarl",
  "hotchick",
  "howtokill",
  "howtomurder",
  "hugefat",
  "humping",
  "incest",
  "intercourse",
  "jackoff",
  "jailbait",
  "jailbait",
  "jellydonut",
  "jerkoff",
  "jigaboo",
  "jiggaboo",
  "jiggerboo",
  "jizz",
  "juggs",
  "kike",
  "kinbaku",
  "kinkster",
  "kinky",
  "knobbing",
  "leatherrestraint",
  "leatherstraightjacket",
  "lemonparty",
  "livesex",
  "lolita",
  "lovemaking",
  "makemecome",
  "malesquirting",
  "masturbate",
  "masturbating",
  "masturbation",
  "menageatrois",
  "milf",
  "missionaryposition",
  "mong",
  "motherfucker",
  "moundofvenus",
  "mrhands",
  "muffdiver",
  "muffdiving",
  "nambla",
  "nawashi",
  "negro",
  "neonazi",
  "nigga",
  "nigger",
  "nignog",
  "nimphomania",
  "nipple",
  "nipples",
  "nsfw",
  "nsfwimages",
  "nude",
  "nudity",
  "nutten",
  "nympho",
  "nymphomania",
  "octopussy",
  "omorashi",
  "onecuptwogirls",
  "oneguyonejar",
  "orgasm",
  "orgy",
  "paedophile",
  "paki",
  "panties",
  "panty",
  "pedobear",
  "pedophile",
  "pegging",
  "penis",
  "phonesex",
  "pieceofshit",
  "pikey",
  "pissing",
  "pisspig",
  "pisspig",
  "playboy",
  "pleasurechest",
  "polesmoker",
  "ponyplay",
  "poof",
  "poon",
  "poontang",
  "punany",
  "poopchute",
  "poopchute",
  "porn",
  "porno",
  "pornography",
  "princealbertpiercing",
  "pthc",
  "pubes",
  "pussy",
  "queaf",
  "queef",
  "quim",
  "raghead",
  "ragingboner",
  "rape",
  "raping",
  "rapist",
  "rectum",
  "reversecowgirl",
  "rimjob",
  "rimming",
  "rosypalm",
  "rosypalmandher5sisters",
  "rustytrombone",
  "sadism",
  "santorum",
  "scat",
  "schlong",
  "scissoring",
  "semen",
  "sex",
  "sexcam",
  "sexo",
  "sexy",
  "sexual",
  "sexually",
  "sexuality",
  "shavedbeaver",
  "shavedpussy",
  "shemale",
  "shibari",
  "shit",
  "shitblimp",
  "shitty",
  "shota",
  "shrimping",
  "skeet",
  "slanteye",
  "slut",
  "s&m",
  "smut",
  "snatch",
  "snowballing",
  "sodomize",
  "sodomy",
  "spastic",
  "spic",
  "splooge",
  "sploogemoose",
  "spooge",
  "spreadlegs",
  "spunk",
  "strapon",
  "strapon",
  "strappado",
  "stripclub",
  "styledoggy",
  "suck",
  "sucks",
  "suicidegirls",
  "sultrywomen",
  "swastika",
  "swinger",
  "taintedlove",
  "tastemy",
  "teabagging",
  "threesome",
  "throating",
  "thumbzilla",
  "tiedup",
  "tightwhite",
  "tit",
  "tits",
  "titties",
  "titty",
  "tongueina",
  "topless",
  "tosser",
  "towelhead",
  "tranny",
  "tribadism",
  "tubgirl",
  "tubgirl",
  "tushy",
  "twat",
  "twink",
  "twinkie",
  "twogirlsonecup",
  "undressing",
  "upskirt",
  "urethraplay",
  "urophilia",
  "vagina",
  "venusmound",
  "viagra",
  "vibrator",
  "violetwand",
  "vorarephilia",
  "voyeur",
  "voyeurweb",
  "voyuer",
  "vulva",
  "wank",
  "wetback",
  "wetdream",
  "whitepower",
  "whore",
  "worldsex",
  "wrappingmen",
  "wrinkledstarfish",
  "xx",
  "xxx",
  "yaoi",
  "yellowshowers",
  "yiffy",
  "zoophilia",
];

export async function censor(phrase: string): Promise<string> {
  const badWordsIn: string[] = [];
  const testPhrase = phrase.toLowerCase();

  wordList.forEach(word => {
    if (testPhrase.includes(word)) badWordsIn.push(word);
  });

  if (badWordsIn.length === 0) return phrase;

  return phrase
    .split(" ")
    .map(word => {
      // remove any punction or numbers from within the word
      const testWord = word
        .toLowerCase()
        .replace(/[.,@\/#!$%\^&\*;:{}=\-_`~()0-9]/g, "");
      if (badWordsIn.includes(testWord)) {
        // check for any removed puncutation
        if (word.length <= 3) {
          // replace all characters with * except first character
          return word.replace(/(?<!^)./g, "*");
        } else {
          // replace all characters with * except first and last character
          return word.replace(/(?<!^).(?!$)/g, "*");
        }
      }
      return word;
    })
    .join(" ");
}
