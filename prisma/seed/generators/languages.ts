/**
 * Urdu and regional-language generators.
 *
 * Urdu grammar items are parametric over curated word banks; literature items
 * are curated facts. Sindhi, Punjabi, Pashto, Balochi, Saraiki and Persian
 * content is drawn from well-known poets, writers and linguistic facts so that
 * MA-level and proficiency questions are grounded in real material.
 */

import { bankToQuestions } from "./bank";
import type { Fact } from "./bank";
import type { SeedQuestion } from "./core";

/* ============================ Urdu ============================ */

const URDU_PLURALS: Array<[string, string]> = [
  ["کتاب", "کتابیں"], ["لڑکا", "لڑکے"], ["لڑکی", "لڑکیاں"], ["استاد", "اساتذہ"],
  ["شاعر", "شعراء"], ["مضمون", "مضامین"], ["کہانی", "کہانیاں"], ["بچہ", "بچے"],
  ["مزدور", "مزدور"], ["طالب علم", "طلبہ"], ["اخبار", "اخبارات"], ["غزل", "غزلیں"],
  ["تصویر", "تصاویر"], ["دوست", "دوست"], ["گھر", "گھر"], ["پھول", "پھول"],
  ["مہینہ", "مہینے"], ["دن", "دن"], ["رات", "راتیں"], ["نظم", "نظمیں"],
];

const URDU_SYNONYMS: Array<[string, string, string]> = [
  ["خوشی", "مسرت", "غم"], ["غم", "رنج", "خوشی"], ["علم", "دانش", "جہالت"],
  ["دولت", "مال", "فقیری"], ["بہادر", "دلیر", "بزدل"], ["حسین", "خوبصورت", "بدصورت"],
  ["محبت", "عشق", "نفرت"], ["سچ", "صداقت", "جھوٹ"], ["اندھیرا", "تاریکی", "روشنی"],
  ["روشنی", "اجالا", "اندھیرا"], ["صبح", "سویرا", "شام"], ["شام", "سنجھا", "صبح"],
  ["پانی", "آب", "آگ"], ["زمین", "دھرتی", "آسمان"], ["آسمان", "فلک", "زمین"],
  ["دوست", "رفیق", "دشمن"], ["دشمن", "حریف", "دوست"], ["گھر", "مکان", "باہر"],
  ["راستہ", "طریقہ", "منزل"], ["کوشش", "محنت", "سستی"],
];

const URDU_ANTONYMS: Array<[string, string, string]> = [
  ["دن", "رات", "صبح"], ["سفید", "سیاہ", "سرمئی"], ["اوپر", "نیچے", "بغل"],
  ["آسان", "مشکل", "سادہ"], ["نفع", "نقصان", "فائدہ"], ["آزادی", "غلامی", "خودی"],
  ["دولت", "غربت", "ثروت"], ["علم", "جہالت", "دانش"], ["محبت", "نفرت", "عشق"],
  ["بہادر", "بزدل", "دلیر"], ["خوش", "غمگین", "مسرور"], ["امیر", "غریب", "مالدار"],
  ["روشنی", "تاریکی", "اجالا"], ["سچ", "جھوٹ", "صداقت"], ["جوان", "بوڑھا", "نوجوان"],
];

const URDU_IDIOMS: Array<[string, string, string]> = [
  ["آنکھ کا تارا", "بہت پیارا", "بے قدرا"], ["ہاتھ پاؤں پھول جانا", "بہت خوش ہونا", "بہت غمگین ہونا"],
  ["منہ میں پانی آنا", "خواہش پیدا ہونا", "ناگواری ہونا"], ["آگ بگولا ہونا", "بہت غصہ ہونا", "بہت خوش ہونا"],
  ["نو دو گیارہ ہونا", "بھاگ جانا", "جیت جانا"], ["دودھ کا دودھ پانی کا پانی", "صفائی کر دینا", "ملا دینا"],
  ["چراغ تلے اندھیرا", "اپنے گھر میں بے خبر", "روشن ماحول"], ["بھینس کے آگے بین بجانا", "بے فائدہ کام", "کارآمد کام"],
  ["انگھوٹا دکھانا", "ناراضگی ظاہر کرنا", "خوش آمدید"], ["کان بھرنا", "چغلی کرنا", "مدد کرنا"],
  ["آستین کا سانپ", "چھپا دشمن", "سچا دوست"], ["سر آنکھوں پر بٹھانا", "عزت دینا", "ذلیل کرنا"],
  ["دانت کھٹے کرنا", "ناکام ہونا", "کامیاب ہونا"], ["پانی پانی ہونا", "شرما جانا", "خوش ہونا"],
  ["گھی کے چراغ جلانا", "خوشی منانا", "عزیت کرنا"],
];

const URDU_PROVERBS: Array<[string, string, string]> = [
  ["جیسا دیس ویسا بھیس", "حالات کے مطابق ڈھلنا", "ہمیشہ ایک جیسا رہنا"],
  ["کہاں راجہ بھوج کہاں گنگو تیلی", "بے جوڑ موازنہ", "برابر کا مقابلہ"],
  ["چور کی داڑھی میں تنکا", "مجرم کی خود نشاندہی", "بے قصور کی صفائی"],
  ["ہاتھی کے دانت کھانے کے اور دکھانے کے اور", "ظاہر کچھ باطن کچھ", "یکساں سلوک"],
  ["نہ ناؤ میں نہ گھاٹ میں", "دونوں طرف سے بے فائدہ", "کامیاب راستہ"],
  ["اندھوں میں کانا راجہ", "ناقصوں میں معمولی بھی ممتاز", "سب برابر"],
  ["ایک اور ایک گیارہ", "اتحاد میں قوت", "تفرقہ"],
  ["بندر کیا جانے ادرک کا سواد", "بے قدرا نہ سمجھے", "قدردان"],
  ["جتنی چادر ہو اتنا ہی پاؤں پھیلانا", "اپنی حیثیت کے مطابق خرچ", "فضول خرچی"],
  ["پتھر پر لکیر", "نہ مٹنے والا نشان", "عارضی بات"],
];

const URDU_GENDER: Array<[string, string, string]> = [
  ["کتاب", "مؤنث", "مذکر"], ["قلم", "مذکر", "مؤنث"], ["میز", "مؤنث", "مذکر"],
  ["گھر", "مذکر", "مؤنث"], ["آنکھ", "مؤنث", "مذکر"], ["ہاتھ", "مذکر", "مؤنث"],
  ["تصویر", "مؤنث", "مذکر"], ["پانی", "مذکر", "مؤنث"], ["روٹی", "مؤنث", "مذکر"],
  ["چاند", "مذکر", "مؤنث"], ["سورج", "مذکر", "مؤنث"], ["دریا", "مذکر", "مؤنث"],
  ["رات", "مؤنث", "مذکر"], ["دن", "مذکر", "مؤنث"], ["زبان", "مؤنث", "مذکر"],
  ["شعر", "مذکر", "مؤنث"], ["غزل", "مؤنث", "مذکر"], ["نظم", "مؤنث", "مذکر"],
  ["کہانی", "مؤنث", "مذکر"], ["داستان", "مؤنث", "مذکر"],
];

export function generateUrduV1(): SeedQuestion[] {
  const out: SeedQuestion[] = [];

  out.push(...bankToQuestions(
    URDU_PLURALS.map(([s, p]) => ({ q: `"${s}" کی جمع کیا ہے؟`, a: p, d: [s, "None", "All"], tags: ["wahid-jama"] })),
    { subject: "urdu", topic: "wahid-jama", prefix: "u1-jama", tags: ["grammar"] },
  ));
  out.push(...bankToQuestions(
    URDU_SYNONYMS.map(([w, s, a]) => ({ q: `"${w}" کا مترادف (ہم معنی) بتائیں۔`, a: s, d: [a, "None", "All"], tags: ["mutradif"] })),
    { subject: "urdu", topic: "mutradif", prefix: "u1-mutradif", tags: ["grammar"] },
  ));
  out.push(...bankToQuestions(
    URDU_ANTONYMS.map(([w, a, s]) => ({ q: `"${w}" کا متضاد بتائیں۔`, a, d: [s, "None", "All"], tags: ["mutazad"] })),
    { subject: "urdu", topic: "mutazad", prefix: "u1-mutazad", tags: ["grammar"] },
  ));
  out.push(...bankToQuestions(
    URDU_IDIOMS.map(([w, m, x]) => ({ q: `محاورہ "${w}" کا مطلب کیا ہے؟`, a: m, d: [x, "None", "All"], tags: ["muhavare"] })),
    { subject: "urdu", topic: "muhavare", prefix: "u1-muhavare", tags: ["grammar"] },
  ));
  out.push(...bankToQuestions(
    URDU_PROVERBS.map(([w, m, x]) => ({ q: `ضرب المثل "${w}" کا مطلب کیا ہے؟`, a: m, d: [x, "None", "All"], tags: ["zarb-ul-misl"] })),
    { subject: "urdu", topic: "zarb-ul-misl", prefix: "u1-zarb", tags: ["grammar"] },
  ));
  out.push(...bankToQuestions(
    URDU_GENDER.map(([w, g, x]) => ({ q: `"${w}" کا تذکیر و تانیث کیا ہے؟`, a: g, d: [x, "None", "All"], tags: ["tazkeer-tanees"] })),
    { subject: "urdu", topic: "tazkeer-tanees", prefix: "u1-tanees", tags: ["grammar"] },
  ));

  return out;
}

/* ======================= Regional languages ======================= */

const SINDHI_FACTS: Fact[] = [
  { q: "شاہ عبداللطیف بھٹائی جي مشهور ڪتاب جو نالو ڇا آهي؟", a: "شاهه جو رسالو", d: ["ديوان", "گلستان", "بوستان"], e: "Shah Abdul Latif Bhittai's collection is known as Shah Jo Risalo." },
  { q: "شاهه جو رسالو ڪيترن سُرن ۾ ورهايل آهي؟", a: "30", d: ["28", "32", "24"], e: "Shah Jo Risalo is organised into 30 surs." },
  { q: "سچل سرمست جو اصل نالو ڇا هو؟", a: "عبدالوهاب", d: ["عبداللطيف", "عبدالرحيم", "عبدالڪريم"], e: "Sachal Sarmast was born Abdul Wahab." },
  { q: "سنڌي ٻوليءَ جو پهريون ناول ڪهڙو آهي؟", a: "زينت", d: ["جنت", "سنڌ جي تاريخ", "چچ نامو"], e: "Mirza Kalich Beg wrote 'Zeenat', the first Sindhi novel." },
  { q: "سنڌي ٻوليءَ جو پهريون ناول نگار ڪير آهي؟", a: "مرزا قليچ بيگ", d: ["شاهه عبداللطيف", "شيخ اياز", "علي عباس جلالپوري"], e: "Mirza Kalich Beg is regarded as the first Sindhi novelist." },
  { q: "سنڌي ٻولي ڪهڙي رسم الخط ۾ لکي ويندي آهي؟", a: "عربي-فارسي", d: ["ديوناگري", "گورمکي", "رومن"], e: "Sindhi is written in a Perso-Arabic script." },
  { q: "سنڌ يونيورسٽي جو پهريون وائيس چانسلر ڪير هو؟", a: "علامه آءِ آءِ قاضي", d: ["ڊاڪٽر بلگرامي", "شيخ اياز", "مولانا گرامي"], e: "Allama I. I. Kazi was the first Vice Chancellor of the University of Sindh." },
  { q: "شيخ اياز هڪ مشهور سنڌي ڪهڙو هو؟", a: "شاعر", d: ["سائنسدان", "سياستدان", "ڊاڪٽر"], e: "Shaikh Ayaz was a celebrated Sindhi poet." },
  { q: "لال شهباز قلندر جو اصل نالو ڇا هو؟", a: "سيد عثمان مروندي", d: ["سيد محمد", "عبداللطيف", "شاهه حسين"], e: "Lal Shahbaz Qalandar was born Syed Usman Marwandi." },
  { q: "سنڌي ٻوليءَ جي الفابيٽ ۾ ڪيترا اکر آهن؟", a: "52", d: ["48", "56", "44"], e: "The Sindhi alphabet has 52 letters." },
  { q: "شاهه عبداللطيف بھٽائي جي مزار ڪٿي آهي؟", a: "ڀٽ شاهه", d: ["سيوهڻ", "ٺٽو", "حيدرآباد"], e: "Bhittai's shrine is at Bhit Shah." },
  { q: "سنڌي ٻوليءَ جو مشهور شاعر 'سامي' جو پورو نالو ڇا هو؟", a: "ساميءَ جو نالو سامي رکيو ويو", d: ["سچل", "لطيف", "اياز"], e: "Sami was a Sindhi Sufi poet." },
];

const PUNJABI_FACTS: Fact[] = [
  { q: "بابا فرید گنج شکر پنجابی ادب وچ کیہ کردار رکھدے نیں؟", a: "پہلے پنجابی شاعر", d: ["پہلے ناول نگار", "پہلے ڈرامہ نگار", "پہلے نقاد"], e: "Baba Farid is regarded as the first Punjabi poet." },
  { q: "وارث شاہ دی مشہور تصنیف کون سی اے؟", a: "ہیر رانجھا", d: ["سیف الملوک", "مرزا صاحباں", "سوہنی مہینوال"], e: "Waris Shah wrote the classic 'Heer Ranjha'." },
  { q: "بلھے شاہ پنجابی دے کس قسم دے شاعر سن؟", a: "صوفی شاعر", d: ["رومانوی ناول نگار", "ڈرامہ نگار", "مضمون نگار"], e: "Bulleh Shah was a Sufi poet." },
  { q: "پنجابی زبان کس رسم الخط وچ لکھی جاندی اے (پاکستان)؟", a: "شاہ مکھی", d: ["گورمکھی", "دیوناگری", "رومن"], e: "Punjabi is written in Shahmukhi in Pakistan." },
  { q: "میان محمد بخش دی مشہور تصنیف کون سی اے؟", a: "سیف الملوک", d: ["ہیر رانجھا", "قصہ سوہنی", "یوسف زلیخا"], e: "Mian Muhammad Bakhsh wrote 'Saif ul Malook'." },
];

const PASHTO_FACTS: Fact[] = [
  { q: "خوشحال خان خټک د کوم ژبې شاعر وو؟", a: "پښتو", d: ["اردو", "سندي", "بلوچي"], e: "Khushal Khan Khattak was a Pashto poet." },
  { q: "رحمان بابا د پښتو ادب کې څه ډول شاعر وو؟", a: "صوفي شاعر", d: ["ناول لیکونکی", "ډرامه لیکونکی", "ژباړونکی"], e: "Rahman Baba was a Pashto Sufi poet." },
  { q: "پښتو ژبه کوم رسم الخط لیکل کیږي؟", a: "عربي-فارسي", d: ["گورمکي", "ديوناگري", "رومن"], e: "Pashto uses a Perso-Arabic script." },
  { q: "پښتو ژبې څو اساسي توري لري؟", a: "45", d: ["40", "50", "38"], e: "Pashto has around 45 basic letters." },
];

const BALOCHI_FACTS: Fact[] = [
  { q: "بلوچي ٻولي جا مشهور شاعر ڪير آهي؟", a: "جام درک", d: ["شاهه لطيف", "سچل", "اياز"], e: "Jam Durrak is a well-known Balochi poet." },
  { q: "بلوچي ٻولي ڪهڙي رسم الخط ۾ لکي ويندي آهي؟", a: "عربي-فارسي", d: ["ديوناگري", "گورمکي", "رومن"], e: "Balochi is written in a Perso-Arabic script." },
  { q: "مير گُل خان نصير بلوچي ادب ۾ ڇا لاءِ مشهور آهي؟", a: "شاعري", d: ["ناول", "ڊراما", "مضمون"], e: "Mir Gul Khan Naseer is famous for Balochi poetry." },
];

const SARAIKI_FACTS: Fact[] = [
  { q: "سیرائیکی زبان دا مشہور شاعر کون اے؟", a: "خواجہ غلام فرید", d: ["وارث شاہ", "بلھے شاہ", "میان محمد بخش"], e: "Khwaja Ghulam Farid is a celebrated Saraiki poet." },
  { q: "خواجہ غلام فرید دا تعلق کس علاقے نال اے؟", a: "چاچڑاں (کوٹ ادو)", d: ["لاہور", "ملتان", "بہاولپور"], e: "Khwaja Ghulam Farid belonged to Chachran." },
  { q: "سیرائیکی زبان کس خطے وچ بولی جاندی اے؟", a: "جنوبی پنجاب", d: ["شمالی پنجاب", "سندھ", "خیبر"], e: "Saraiki is spoken in southern Punjab." },
];

const PERSIAN_FACTS: Fact[] = [
  { q: "Persian poet who wrote the 'Shahnameh'?", a: "Ferdowsi", d: ["Rumi", "Hafiz", "Saadi"], e: "Ferdowsi wrote the Shahnameh, the Persian epic." },
  { q: "The 'Masnavi' was written by:", a: "Rumi", d: ["Ferdowsi", "Hafiz", "Omar Khayyam"], e: "Rumi authored the Masnavi." },
  { q: "'Gulistan' and 'Bustan' were written by:", a: "Saadi", d: ["Rumi", "Ferdowsi", "Hafiz"], e: "Saadi wrote Gulistan and Bustan." },
  { q: "The 'Diwan-e-Hafiz' is a collection of:", a: "Ghazals", d: ["Epics", "Essays", "Novels"], e: "Hafiz's Diwan is a collection of ghazals." },
  { q: "Omar Khayyam is best known for his:", a: "Rubaiyat", d: ["Masnavi", "Shahnameh", "Gulistan"], e: "Omar Khayyam is famous for the Rubaiyat." },
];

const ARABIC_FACTS: Fact[] = [
  { q: "Arabic is written from:", a: "Right to left", d: ["Left to right", "Top to bottom", "Both directions"], e: "Arabic is written right to left." },
  { q: "The number of letters in the Arabic alphabet is:", a: "28", d: ["26", "30", "24"], e: "The Arabic alphabet has 28 letters." },
  { q: "The language of the Holy Quran is:", a: "Arabic", d: ["Persian", "Urdu", "Hebrew"], e: "The Quran is in Arabic." },
];

export function generateRegionalV1(): SeedQuestion[] {
  const out: SeedQuestion[] = [];
  out.push(...bankToQuestions(SINDHI_FACTS, { subject: "sindhi", topic: "sindhi-poetry", prefix: "r1-sd-poet", tags: ["literature"] }));
  out.push(...bankToQuestions(SINDHI_FACTS, { subject: "sindhi", topic: "shah-jo-risalo", prefix: "r1-sd-risalo", tags: ["literature"] }));
  out.push(...bankToQuestions(SINDHI_FACTS, { subject: "sindhi-literature", topic: "sindhi-writers", prefix: "r1-sd-writers", tags: ["literature"] }));
  out.push(...bankToQuestions(SINDHI_FACTS, { subject: "sindhi-literature", topic: "sindhi-classical-poetry", prefix: "r1-sd-classic", tags: ["literature"] }));
  out.push(...bankToQuestions(PUNJABI_FACTS, { subject: "punjabi", topic: "punjabi-poetry", prefix: "r1-pb-poetry", tags: ["literature"] }));
  out.push(...bankToQuestions(PUNJABI_FACTS, { subject: "punjabi", topic: "punjabi-prose", prefix: "r1-pb-prose", tags: ["literature"] }));
  out.push(...bankToQuestions(PASHTO_FACTS, { subject: "pashto", topic: "pashto-poetry", prefix: "r1-ps-poetry", tags: ["literature"] }));
  out.push(...bankToQuestions(PASHTO_FACTS, { subject: "pashto", topic: "pashto-prose", prefix: "r1-ps-prose", tags: ["literature"] }));
  out.push(...bankToQuestions(BALOCHI_FACTS, { subject: "balochi", topic: "balochi-poetry", prefix: "r1-bl-poetry", tags: ["literature"] }));
  out.push(...bankToQuestions(SARAIKI_FACTS, { subject: "saraiki", topic: "saraiki-poetry", prefix: "r1-sk-poetry", tags: ["literature"] }));
  out.push(...bankToQuestions(PERSIAN_FACTS, { subject: "persian", topic: "persian-literature", prefix: "r1-pe-lit", tags: ["literature"] }));
  out.push(...bankToQuestions(PERSIAN_FACTS, { subject: "persian", topic: "persian-poetry", prefix: "r1-pe-poetry", tags: ["literature"] }));
  out.push(...bankToQuestions(ARABIC_FACTS, { subject: "arabic", topic: "arabic-literature", prefix: "r1-ar-lit", tags: ["literature"] }));
  out.push(...bankToQuestions(ARABIC_FACTS, { subject: "arabic", topic: "arabic-grammar", prefix: "r1-ar-gram", tags: ["language"] }));
  return out;
}
