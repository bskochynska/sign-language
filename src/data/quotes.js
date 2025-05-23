const quotes = [
  {
    id: 1,
    quote:
      "У 2014 році вийшов фільм 'Плем'я' українського виробництва, що став першою кінострічкою, де актори спілкувалися українською мовою жестів без жодного розмовного діалогу."
  },
  {
    id: 2,
    quote: "Вчені вважають, що 3 мільйони років до н. е. жести слугували первинними засобами передачі інформації і лише поступово вони почали доповнюватися звуками. Утворення сучасних жестових мов почалося у Середньовіччі. Ними спілкувалися ченці під час посту, коли говорити було заборонено. "
  },
  {
    id: 3,
    quote:
      "У Законі про забезпечення функціонування української мови як єдиної державної виокремлена стаття, присвячена жестовій мові, що має назву “Статус української жестової мови та мовні права жестомовних осіб”. У цій статті прописано, що кожному українцю гарантується право вільно використовувати та вивчати українську жестову мову."
  },
  {
    id: 4,
    quote: "У кожної країни є своя жестова мова, що відрізняється від інших власним вокабуляром, граматикою та синтаксисом. Окрім того, існує міжнародна жестова мова. Вона має менший обсяг жестів і використовується здебільшого у сфері політики та науки."
  },
  {
    id: 5,
    quote: "Жестова мова – це жива мова, яка постійно розвивається. З часом у ній з’являються нові жести, а старі – виходять з ужитку або змінюються. У ній, як і в українській, існують свої регіональні діалекти."
  },
  {
    id: 6,
    quote: "Як і будь-яка мова, жестова теж має свої особливості. Зокрема українська жестова мова використовує не лише руки, але й міміку, положення тіла, рухи голови та очей для передачі інформації. Важливу роль відіграє й простір перед тілом."
  },
  {
    id: 7,
    quote: "В Україні до повномасштабного вторгнення кожна 10 людина мала порушення слуху. В умовах війни ці показники суттєво зросли, тому знання базових елементів жестової мови, таких як алфавіт, є не просто корисним, але й необхідним."
  },
  {
    id: 8,
    quote: "Викладання жестової мови в Україні розпочалося на початку 1800-х років, коли було відкрито низку філій Віденської школи для глухих. Викладання здійснювалося старофранцузькою жестовою мовою, яку розробив священник Шарль-Мішель де л'Епе́ (1712–1789). Протягом ХХ ст. в Україні сформувалася власна жестова мова."
  },
];

const randomQuote = Math.floor(Math.random() * quotes.length);

export const quote = quotes[randomQuote];
