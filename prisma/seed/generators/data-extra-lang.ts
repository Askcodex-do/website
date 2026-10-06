/**
 * Coverage completion banks.
 *
 * The remaining topics across every subject that the older generators left
 * empty. Grouped by domain for readability; every fact carries an explanation so
 * each question has an answer rationale.
 */

import { f, generateSubjectBanks } from "./data-core";
import type { SubjectSpec } from "./data-core";

export const EXTRA_BANKS: SubjectSpec[] = [
  /* ============================ English ============================ */
  {
    slug: "english",
    topics: [
      {
        slug: "direct-indirect-speech",
        facts: [
          f("Convert to indirect speech: He said, \"I am tired.\"", "He said that he was tired.", ["He said that I am tired.", "He says that he is tired.", "He said I was tired."], "Present tense shifts to past in indirect speech."),
          f("Convert to indirect speech: She said, \"I will come.\"", "She said that she would come.", ["She said that she will come.", "She said that I would come.", "She says she will come."], "'Will' becomes 'would' in indirect speech."),
          f("Convert to direct speech: He said that he had finished.", "He said, \"I have finished.\"", ["He said, \"I finished.\"", "He says, \"I have finished.\"", "He said, \"He has finished.\""], "Past perfect in indirect speech maps to present perfect in direct speech."),
          f("In indirect speech, 'today' usually becomes:", "that day", ["this day", "the day", "now"], "'Today' becomes 'that day' in indirect speech."),
          f("In indirect speech, 'tomorrow' usually becomes:", "the next day", ["this day", "yesterday", "today"], "'Tomorrow' becomes 'the next day'."),
          f("In indirect speech, 'here' usually becomes:", "there", ["here", "where", "everywhere"], "'Here' becomes 'there' in indirect speech."),
        ],
      },
      {
        slug: "spelling",
        facts: [
          f("Choose the correctly spelled word:", "Necessary", ["Neccessary", "Necesary", "Necessery"], "The correct spelling is 'necessary'."),
          f("Choose the correctly spelled word:", "Accommodation", ["Accomodation", "Acommodation", "Accommodetion"], "The correct spelling is 'accommodation'."),
          f("Choose the correctly spelled word:", "Definitely", ["Definately", "Definitly", "Defenitely"], "The correct spelling is 'definitely'."),
          f("Choose the correctly spelled word:", "Occurrence", ["Occurence", "Ocurrence", "Occurrance"], "The correct spelling is 'occurrence'."),
          f("Choose the correctly spelled word:", "Separate", ["Seperate", "Separete", "Seperete"], "The correct spelling is 'separate'."),
          f("Choose the correctly spelled word:", "Privilege", ["Priviledge", "Privilage", "Privilige"], "The correct spelling is 'privilege'."),
        ],
      },
      {
        slug: "vocabulary",
        facts: [
          f("What does 'benevolent' mean?", "Kind and generous", ["Cruel", "Wealthy", "Lazy"], "'Benevolent' means kind and generous."),
          f("What does 'meticulous' mean?", "Very careful and precise", ["Careless", "Slow", "Angry"], "'Meticulous' means very careful."),
          f("What does 'candid' mean?", "Honest and straightforward", ["Secretive", "Rude", "Shy"], "'Candid' means honest and direct."),
          f("What does 'verbose' mean?", "Using too many words", ["Concise", "Silent", "Rapid"], "'Verbose' means wordy."),
          f("What does 'tenacious' mean?", "Persistent", ["Weak", "Timid", "Generous"], "'Tenacious' means persistent."),
          f("What does 'ephemeral' mean?", "Short-lived", ["Eternal", "Heavy", "Bright"], "'Ephemeral' means short-lived."),
        ],
      },
      {
        slug: "comprehension",
        facts: [
          f("In reading comprehension, the 'main idea' is the:", "Central point of the passage", ["First sentence only", "Last sentence only", "A minor detail"], "The main idea is the passage's central point."),
          f("A 'tone' in a passage refers to the author's:", "Attitude", ["Grammar", "Punctuation", "Spelling"], "Tone is the author's attitude."),
          f("An inference is a conclusion drawn from:", "Evidence in the passage", ["Personal opinion", "Outside knowledge only", "Guesswork"], "Inferences are based on evidence."),
          f("A fact differs from an opinion because it is:", "Verifiable", ["Emotional", "Personal", "Biased"], "Facts are verifiable."),
          f("The purpose of a topic sentence is to:", "State the paragraph's main idea", ["Conclude the passage", "Provide an example", "Quote a source"], "Topic sentences state the main idea."),
          f("Scanning a text means looking for:", "Specific information", ["General meaning", "Grammar rules", "Spelling errors"], "Scanning looks for specific information."),
        ],
      },
      {
        slug: "punctuation",
        facts: [
          f("Which punctuation mark ends a question?", "Question mark", ["Full stop", "Comma", "Colon"], "A question mark ends a question."),
          f("Which mark indicates possession?", "Apostrophe", ["Comma", "Colon", "Semicolon"], "An apostrophe shows possession."),
          f("Which mark separates items in a list?", "Comma", ["Full stop", "Question mark", "Exclamation mark"], "Commas separate list items."),
          f("Which mark introduces a list or explanation?", "Colon", ["Comma", "Apostrophe", "Hyphen"], "A colon introduces a list or explanation."),
          f("Which mark joins two related independent clauses?", "Semicolon", ["Comma", "Full stop", "Apostrophe"], "A semicolon joins related independent clauses."),
          f("Which mark shows strong emotion?", "Exclamation mark", ["Comma", "Colon", "Semicolon"], "An exclamation mark shows strong emotion."),
        ],
      },
      {
        slug: "conditionals",
        facts: [
          f("Which conditional expresses a real possibility?", "First conditional", ["Zero conditional", "Second conditional", "Third conditional"], "The first conditional expresses real possibility."),
          f("Which conditional expresses an unreal present situation?", "Second conditional", ["First conditional", "Zero conditional", "Third conditional"], "The second conditional expresses unreality."),
          f("Which conditional expresses an unreal past situation?", "Third conditional", ["First conditional", "Second conditional", "Zero conditional"], "The third conditional expresses unreal past."),
          f("Complete: If it rains, we ____ stay home.", "will", ["would", "would have", "had"], "First conditional uses 'will'."),
          f("Complete: If I ____ rich, I would travel.", "were", ["am", "will be", "had been"], "Second conditional uses 'were'."),
          f("Which conditional states a general truth?", "Zero conditional", ["First conditional", "Second conditional", "Third conditional"], "The zero conditional states general truths."),
        ],
      },
      {
        slug: "modals",
        facts: [
          f("Which modal expresses ability?", "Can", ["Must", "Should", "May"], "'Can' expresses ability."),
          f("Which modal expresses obligation?", "Must", ["Can", "May", "Might"], "'Must' expresses obligation."),
          f("Which modal expresses advice?", "Should", ["Must", "Can", "Will"], "'Should' expresses advice."),
          f("Which modal expresses possibility?", "May", ["Must", "Should", "Will"], "'May' expresses possibility."),
          f("Which modal expresses permission?", "May", ["Must", "Ought", "Would"], "'May' can express permission."),
          f("Which modal expresses a strong deduction?", "Must", ["May", "Might", "Could"], "'Must' can express strong deduction."),
        ],
      },
      {
        slug: "phrasal-verbs",
        facts: [
          f("What does 'give up' mean?", "To quit", ["To surrender a gift", "To raise", "To begin"], "'Give up' means to quit."),
          f("What does 'look after' mean?", "To take care of", ["To search", "To ignore", "To resemble"], "'Look after' means to take care of."),
          f("What does 'put off' mean?", "To postpone", ["To extinguish", "To wear", "To remove"], "'Put off' means to postpone."),
          f("What does 'carry on' mean?", "To continue", ["To transport", "To stop", "To lift"], "'Carry on' means to continue."),
          f("What does 'turn down' mean?", "To reject", ["To reduce volume only", "To arrive", "To increase"], "'Turn down' means to reject."),
          f("What does 'bring about' mean?", "To cause", ["To carry", "To delay", "To remove"], "'Bring about' means to cause."),
        ],
      },
      {
        slug: "subject-verb-agreement",
        facts: [
          f("Choose the correct sentence:", "The dogs run fast.", ["The dogs runs fast.", "The dogs running fast.", "The dog run fast."], "Plural subjects take plural verbs."),
          f("Choose the correct sentence:", "She goes to school.", ["She go to school.", "She going to school.", "She gone to school."], "Third-person singular takes '-s'."),
          f("Choose the correct sentence:", "Each of the boys is present.", ["Each of the boys are present.", "Each of the boy are present.", "Each of the boys were present."], "'Each' is singular."),
          f("Choose the correct sentence:", "Neither of them has arrived.", ["Neither of them have arrived.", "Neither of them are arrived.", "Neither of them were arrived."], "'Neither' is singular."),
          f("Choose the correct sentence:", "The news is good.", ["The news are good.", "The news were good.", "The news be good."], "'News' is singular."),
          f("Choose the correct sentence:", "Mathematics is my favourite subject.", ["Mathematics are my favourite subject.", "Mathematics were my favourite subject.", "Mathematics be my favourite subject."], "Subject names ending in -s are singular."),
        ],
      },
      {
        slug: "essay-writing",
        facts: [
          f("An essay's introduction should:", "Introduce the topic and thesis", ["Conclude the argument", "List references", "Provide examples only"], "Introductions state the topic and thesis."),
          f("A thesis statement presents:", "The main argument", ["A quotation", "A definition only", "A conclusion"], "A thesis states the main argument."),
          f("The body paragraphs should each contain:", "One main idea", ["Many unrelated ideas", "Only quotations", "Only statistics"], "Body paragraphs develop one idea each."),
          f("The conclusion should:", "Summarise and reinforce the argument", ["Introduce new ideas", "List references", "Begin the essay"], "Conclusions summarise the argument."),
          f("Coherence in an essay means:", "Logical connection of ideas", ["Length", "Vocabulary only", "Punctuation"], "Coherence is logical connection."),
          f("An essay's tone should be:", "Consistent", ["Random", "Only humorous", "Only emotional"], "A consistent tone is important."),
        ],
      },
    ],
  },

  /* ============================ Urdu ============================ */
  {
    slug: "urdu",
    topics: [
      {
        slug: "urdu-qawaid",
        facts: [
          f("زبان کے قواعد کے علم کو کیا کہتے ہیں؟", "قواعد", ["تاریخ", "ادب", "شاعری"], "قواعد زبان کے اصولوں کا علم ہے۔"),
          f("اسم، فعل اور حرف زبان کے ____ ہیں۔", "اجزائے ترکیبی", ["اصناف", "اصول", "مصطلحات"], "یہ زبان کے اجزائے ترکیبی ہیں۔"),
          f("جملے کے دو بنیادی حصے کون سے ہیں؟", "مسند اور مسند الیہ", ["مبتدا اور خبر", "فاعل اور مفعول", "اسم اور حرف"], "جملہ مسند اور مسند الیہ سے بنتا ہے۔"),
          f("'قواعد' کا لفظی مطلب کیا ہے؟", "اصول", ["قاعدہ", "قانون", "ضابطہ"], "قواعد اصولوں کو کہتے ہیں۔"),
          f("زبان کے بنیادی اجزاء میں کون شامل نہیں؟", "تصویر", ["اسم", "فعل", "حرف"], "تصویر زبان کا جزو نہیں۔"),
          f("درست جملہ منتخب کریں:", "وہ کتاب پڑھتا ہے۔", ["وہ کتاب پڑھتے ہے۔", "وہ کتاب پڑھ ہیں۔", "وہ کتاب پڑھتا ہیں۔"], "'وہ کتاب پڑھتا ہے' درست جملہ ہے۔"),
        ],
      },
      {
        slug: "ism-fe-l",
        facts: [
          f("وہ لفظ جو کسی شخص، جگہ یا چیز کا نام ہو، کہلاتا ہے:", "اسم", ["فعل", "حرف", "صفت"], "اسم نام کو کہتے ہیں۔"),
          f("وہ لفظ جو کسی کام کے کرنے کو ظاہر کرے، کہلاتا ہے:", "فعل", ["اسم", "حرف", "صفت"], "فعل کام ظاہر کرتا ہے۔"),
          f("'احمد نے کتاب پڑھی' میں فاعل کون ہے؟", "احمد", ["کتاب", "پڑھی", "نے"], "احمد فاعل ہے۔"),
          f("'احمد نے کتاب پڑھی' میں مفعول کون ہے؟", "کتاب", ["احمد", "پڑھی", "نے"], "کتاب مفعول ہے۔"),
          f("فعل ماضی سے کیا مراد ہے؟", "گزرا ہوا زمانہ", ["آئندہ زمانہ", "حال", "مستقبل"], "فعل ماضی گزرے زمانے کو ظاہر کرتا ہے۔"),
          f("فعل امر سے کیا مراد ہے؟", "حکم دینا", ["سوال کرنا", "بتانا", "پوچھنا"], "فعل امر حکم کے لیے ہے۔"),
        ],
      },
      {
        slug: "urdu-imla",
        facts: [
          f("درست املا منتخب کریں:", "کتاب", ["کتب", "کتاب", "کتبہ"], "درست املا 'کتاب' ہے۔"),
          f("درست املا منتخب کریں:", "استاد", ["استادھ", "استد", "استاذ"], "درست املا 'استاد' ہے۔"),
          f("درست املا منتخب کریں:", "مہینہ", ["ماہینہ", "مہینہ", "ماہنہ"], "درست املا 'مہینہ' ہے۔"),
          f("درست املا منتخب کریں:", "ذمہ داری", ["ذمہ داری", "ضمہ داری", "زمداری"], "درست املا 'ذمہ داری' ہے۔"),
          f("درست املا منتخب کریں:", "ضرورت", ["ضرورت", "زارورت", "ضروت"], "درست املا 'ضرورت' ہے۔"),
          f("درست املا منتخب کریں:", "فرق", ["فرق", "فارق", "فرک"], "درست املا 'فرق' ہے۔"),
        ],
      },
      {
        slug: "jumla-sazi",
        facts: [
          f("'وہ اسکول جاتا ہے' میں فعل کون ہے؟", "جاتا ہے", ["وہ", "اسکول", "ہے"], "'جاتا ہے' فعل ہے۔"),
          f("جملہ مکمل کریں: ہم ____ کھیلتے ہیں۔", "کرکٹ", ["کرکٹ نے", "کرکٹ کا", "کرکٹ سے"], "'ہم کرکٹ کھیلتے ہیں' درست ہے۔"),
          f("جملہ مکمل کریں: وہ ____ پڑھ رہی ہے۔", "کتاب", ["کتاب نے", "کتاب کو", "کتاب سے"], "'وہ کتاب پڑھ رہی ہے' درست ہے۔"),
          f("سوالیہ جملہ کون سا ہے؟", "کیا تم آئے ہو؟", ["تم آئے ہو۔", "تم آؤ۔", "تم آؤ گے۔"], "سوالیہ جملے میں سوال ہوتا ہے۔"),
          f("منفی جملہ کون سا ہے؟", "میں نہیں جاؤں گا۔", ["میں جاؤں گا۔", "میں جاؤں؟", "میں جاؤں۔"], "منفی جملے میں نفی ہوتی ہے۔"),
          f("حکمیہ جملہ کون سا ہے؟", "یہاں آؤ۔", ["وہ آیا۔", "کیا وہ آیا؟", "وہ آئے گا۔"], "حکمیہ جملہ حکم ظاہر کرتا ہے۔"),
        ],
      },
      {
        slug: "ghazal",
        facts: [
          f("غزل کے ہر شعر میں کتنے مصرعے ہوتے ہیں؟", "دو", ["تین", "چار", "ایک"], "ہر شعر میں دو مصرعے ہوتے ہیں۔"),
          f("غزل کا پہلا شعر کہلاتا ہے:", "مطلع", ["مقطع", "رادف", "قافیہ"], "پہلا شعر مطلع کہلاتا ہے۔"),
          f("غزل کا آخری شعر کہلاتا ہے:", "مقطع", ["مطلع", "ردیف", "بحر"], "آخری شعر مقطع کہلاتا ہے۔"),
          f("غزل کے قافیے کی پابندی کو کہتے ہیں:", "ردیف و قافیہ", ["بحر", "وزن", "تلمیح"], "ردیف و قافیہ غزل کا لازمی جزو ہے۔"),
          f("مشہور غزل گو شاعر کون ہیں؟", "مرزا غالب", ["میر انیس", "نظیر اکبرآبادی", "محسن نقوی"], "مرزا غالب مشہور غزل گو شاعر ہیں۔"),
          f("غزل کا موضوع عموماً کیا ہوتا ہے؟", "عشق و محبت", ["جنگ", "سائنس", "سیاست"], "غزل عموماً عشق و محبت پر ہوتی ہے۔"),
        ],
      },
      {
        slug: "nazm",
        facts: [
          f("نظم اور غزل میں بنیادی فرق کیا ہے؟", "نظم میں قافیے کی پابندی لازم نہیں", ["نظم میں بحر نہیں ہوتی", "نظم میں مصرعے نہیں ہوتے", "نظم میں موضوع نہیں ہوتا"], "نظم میں قافیے کی پابندی لازم نہیں۔"),
          f("'شکوہ' کس کی نظم ہے؟", "علامہ اقبال", ["مرزا غالب", "میر تقی میر", "فیض احمد فیض"], "'شکوہ' علامہ اقبال کی نظم ہے۔"),
          f("'جواب شکوہ' کس نے لکھی؟", "علامہ اقبال", ["مرزا غالب", "حالی", "اکبر الہ آبادی"], "'جواب شکوہ' علامہ اقبال کی نظم ہے۔"),
          f("نظم کا ایک مشہور شاعر کون ہیں؟", "نظیر اکبرآبادی", ["مرزا غالب", "میر تقی میر", "داغ دہلوی"], "نظیر اکبرآبادی نظم کے شاعر ہیں۔"),
          f("نظم میں عموماً کتنے موضوعات ہوتے ہیں؟", "ایک", ["بہت سے", "دو", "تین"], "نظم عموماً ایک موضوع پر ہوتی ہے۔"),
          f("نظم کی مثال کون سی ہے؟", "شکوہ", ["دیوان", "کلیات", "مثنوی"], "'شکوہ' ایک نظم ہے۔"),
        ],
      },
      {
        slug: "afsana",
        facts: [
          f("افسانہ کا مطلب کیا ہے؟", "چھوٹی کہانی", ["بڑا ناول", "طویل نظم", "ڈراما"], "افسانہ چھوٹی کہانی کو کہتے ہیں۔"),
          f("اردو افسانے کا مشہور افسانہ نگار کون ہیں؟", "سعادت حسن منٹو", ["مرزا غالب", "علامہ اقبال", "فیض احمد فیض"], "منٹو مشہور افسانہ نگار ہیں۔"),
          f("'ٹوبہ ٹیک سنگھ' کس کا افسانہ ہے؟", "سعادت حسن منٹو", ["پریم چند", "کرشن چندر", "بیدی"], "'ٹوبہ ٹیک سنگھ' منٹو کا افسانہ ہے۔"),
          f("افسانے کے عناصر میں کون شامل نہیں؟", "بحر", ["کردار", "واقعہ", "مقام"], "بحر افسانے کا عنصر نہیں۔"),
          f("اردو افسانے کے بانی کون مانے جاتے ہیں؟", "پریم چند", ["منٹو", "غالب", "اقبال"], "پریم چند کو اردو افسانے کا باوا آدم کہا جاتا ہے۔"),
          f("افسانہ عموماً کس صنف سے تعلق رکھتا ہے؟", "نثر", ["شاعری", "غزل", "نظم"], "افسانہ نثر کی صنف ہے۔"),
        ],
      },
      {
        slug: "drama-urdu",
        facts: [
          f("ڈراما کا مطلب کیا ہے؟", "تمثیلی کھیل", ["نظم", "غزل", "افسانہ"], "ڈراما تمثیلی کھیل ہے۔"),
          f("ڈرامے کے عناصر میں کون شامل ہے؟", "مکالمہ", ["قافیہ", "ردیف", "بحر"], "مکالمہ ڈرامے کا عنصر ہے۔"),
          f("ڈراما عموماً کہاں پیش کیا جاتا ہے؟", "اسٹیج", ["کتاب", "اخبار", "رسالہ"], "ڈراما اسٹیج پر پیش ہوتا ہے۔"),
          f("اردو ڈرامے کا مشہور ڈرامہ نگار کون ہیں؟", "امتیاز علی تاج", ["غالب", "اقبال", "منٹو"], "امتیاز علی تاج مشہور ڈرامہ نگار ہیں۔"),
          f("'انارکلی' کس کی تصنیف ہے؟", "امتیاز علی تاج", ["منٹو", "پریم چند", "فیض"], "'انارکلی' امتیاز علی تاج کی تصنیف ہے۔"),
          f("ڈرامے کی ایک قسم کون سی ہے؟", "المیہ", ["غزل", "نظم", "قصیدہ"], "المیہ ڈرامے کی قسم ہے۔"),
        ],
      },
      {
        slug: "urdu-sahafat",
        facts: [
          f("صحافت کا مطلب کیا ہے؟", "اخبار نویسی", ["شاعری", "افسانہ", "ڈراما"], "صحافت اخبار نویسی ہے۔"),
          f("اردو کا پہلا اخبار کون سا مانا جاتا ہے؟", "جام جہاں نما", ["جنگ", "ڈان", "نوائے وقت"], "جام جہاں نما ابتدائی اردو اخبار ہے۔"),
          f("'زمیندار' اخبار کس نے نکالا؟", "ظفر علی خان", ["قائداعظم", "اقبال", "غالب"], "زمیندار ظفر علی خان نے نکالا۔"),
          f("'ڈان' اخبار کس سے منسوب ہے؟", "قائداعظم", ["اقبال", "لیاقت علی خان", "ظفر علی خان"], "ڈان قائداعظم سے منسوب ہے۔"),
          f("صحافت کا اہم اصول کیا ہے؟", "سچائی", ["جھوٹ", "تعصب", "بددیانتی"], "صحافت کا اہم اصول سچائی ہے۔"),
          f("اخبار کی ایک قسم کون سی ہے؟", "روزنامہ", ["غزل", "نظم", "قصیدہ"], "روزنامہ اخبار کی قسم ہے۔"),
        ],
      },
      {
        slug: "urdu-qaumi-tahreek",
        facts: [
          f("تحریک آزادی میں اردو کا کردار کیا تھا؟", "قومی اتحاد کا ذریعہ", ["صرف ادب", "صرف تجارت", "صرف سائنس"], "اردو قومی اتحاد کا ذریعہ بنی۔"),
          f("اردو کو قومی زبان کا درجہ کب ملا؟", "1947 کے بعد", ["1857", "1900", "1930"], "اردو کو قومی زبان کا درجہ آزادی کے بعد ملا۔"),
          f("تحریک پاکستان میں اردو شاعری نے کیا کردار ادا کیا؟", "بیداری پیدا کی", ["تفریح", "تجارت", "کھیل"], "اردو شاعری نے بیداری پیدا کی۔"),
          f("'سارے جہاں سے اچھا' کس کی نظم ہے؟", "علامہ اقبال", ["غالب", "فیض", "جوش"], "یہ نظم علامہ اقبال کی ہے۔"),
          f("قائداعظم کی اردو سے محبت کیسی تھی؟", "گہری", ["کم", "سطحی", "نہ ہونے کے برابر"], "قائداعظم اردو سے گہری محبت رکھتے تھے۔"),
          f("تحریک آزادی کے دوران اردو صحافت کا کردار کیا تھا؟", "آزادی کی حمایت", ["غلامی کی حمایت", "لاقیدی", "لاپرواہی"], "اردو صحافت نے آزادی کی حمایت کی۔"),
        ],
      },
    ],
  },

  /* ============================ Sindhi ============================ */
  {
    slug: "sindhi",
    topics: [
      {
        slug: "sindhi-grammar",
        facts: [
          f("Sindhi is written in which script?", "Perso-Arabic", ["Devanagari", "Gurmukhi", "Latin"], "Sindhi uses a Perso-Arabic script."),
          f("How many grammatical genders does Sindhi have?", "2", ["1", "3", "4"], "Sindhi has two grammatical genders."),
          f("Sindhi is an official language of:", "Sindh", ["Punjab", "KP", "Balochistan"], "Sindhi is official in Sindh."),
          f("A Sindhi noun can be:", "Masculine or feminine", ["Only masculine", "Only feminine", "Neuter"], "Sindhi nouns have two genders."),
          f("Sindhi belongs to which language family?", "Indo-Aryan", ["Dravidian", "Iranian", "Turkic"], "Sindhi is Indo-Aryan."),
          f("The Sindhi alphabet is based on:", "Arabic script", ["Latin script", "Greek script", "Cyrillic script"], "Sindhi uses an Arabic-based script."),
        ],
      },
      {
        slug: "sindhi-vocabulary",
        facts: [
          f("In Sindhi, 'pani' means:", "Water", ["Fire", "Earth", "Air"], "'Pani' means water."),
          f("In Sindhi, 'ghar' means:", "House", ["Tree", "Road", "Field"], "'Ghar' means house."),
          f("In Sindhi, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Sindhi, 'dost' means:", "Friend", ["Enemy", "Teacher", "Doctor"], "'Dost' means friend."),
          f("In Sindhi, 'suraj' means:", "Sun", ["Moon", "Star", "Cloud"], "'Suraj' means sun."),
          f("In Sindhi, 'phul' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Phul' means flower."),
        ],
      },
      {
        slug: "sindhi-idioms",
        facts: [
          f("Sindhi idioms are called:", "Istalahat", ["Ghazal", "Nazm", "Sher"], "Sindhi idioms are istalahat."),
          f("An idiom's meaning is:", "Figurative", ["Literal", "Random", "Musical"], "Idioms carry figurative meaning."),
          f("Sindhi idioms reflect:", "Local culture", ["Foreign culture", "Only science", "Only politics"], "Sindhi idioms reflect local culture."),
          f("Using idioms makes language:", "Expressive", ["Dull", "Confusing", "Formal only"], "Idioms make language expressive."),
          f("Sindhi idioms are commonly used in:", "Daily speech", ["Only books", "Only courts", "Only law"], "Idioms are used in daily speech."),
          f("A Sindhi idiom usually conveys:", "Wisdom", ["Numbers", "Dates", "Names"], "Idioms convey wisdom."),
        ],
      },
      {
        slug: "sindhi-proverbs",
        facts: [
          f("Sindhi proverbs are called:", "Aqwal", ["Ghazal", "Sher", "Nazm"], "Sindhi proverbs are aqwal."),
          f("A proverb expresses:", "Common wisdom", ["A question", "An order", "A number"], "Proverbs express common wisdom."),
          f("Sindhi proverbs are passed down through:", "Oral tradition", ["Only books", "Only films", "Only radio"], "Proverbs pass down orally."),
          f("Proverbs are usually:", "Short", ["Very long", "Musical", "Rhymed only"], "Proverbs are short sayings."),
          f("Sindhi proverbs often mention:", "Nature and animals", ["Only machines", "Only cities", "Only numbers"], "Sindhi proverbs often reference nature."),
          f("Proverbs are used to:", "Teach a lesson", ["Confuse listeners", "Tell time", "Count money"], "Proverbs teach lessons."),
        ],
      },
      {
        slug: "sindhi-prose",
        facts: [
          f("The father of Sindhi prose is:", "Mirza Kalich Beg", ["Shah Latif", "Sachal Sarmast", "Shaikh Ayaz"], "Kalich Beg is the father of Sindhi prose."),
          f("Sindhi prose includes:", "Essays and fiction", ["Only poetry", "Only songs", "Only drama"], "Sindhi prose includes essays and fiction."),
          f("Modern Sindhi prose developed in the:", "20th century", ["16th century", "17th century", "18th century"], "Modern Sindhi prose developed in the 20th century."),
          f("A Sindhi essay is called:", "Mazmoon", ["Ghazal", "Sher", "Nazm"], "Mazmoon is a Sindhi essay."),
          f("Sindhi prose is used in:", "Education", ["Only music", "Only dance", "Only painting"], "Sindhi prose is used in education."),
          f("Sindhi novels became popular in the:", "20th century", ["15th century", "16th century", "17th century"], "Sindhi novels grew in the 20th century."),
        ],
      },
      {
        slug: "sindhi-script",
        facts: [
          f("The Sindhi script has how many letters (approx.)?", "52", ["26", "28", "40"], "Sindhi has about 52 letters."),
          f("Sindhi is written from:", "Right to left", ["Left to right", "Top to bottom", "Bottom to top"], "Sindhi is written right to left."),
          f("The Sindhi script is derived from:", "Arabic", ["Latin", "Greek", "Cyrillic"], "Sindhi script derives from Arabic."),
          f("Additional Sindhi letters represent:", "Retroflex sounds", ["Vowels only", "Numbers only", "Punctuation"], "Sindhi adds letters for retroflex sounds."),
          f("Sindhi writing uses:", "Diacritics", ["Only capitals", "Only symbols", "Only numbers"], "Sindhi uses diacritics."),
          f("The Sindhi script is also called:", "Sindhi-Arabic", ["Sindhi-Latin", "Sindhi-Greek", "Sindhi-Devanagari"], "The script is Sindhi-Arabic."),
        ],
      },
    ],
  },

  /* ============================ Punjabi ============================ */
  {
    slug: "punjabi",
    topics: [
      {
        slug: "punjabi-grammar",
        facts: [
          f("Punjabi is written in which scripts?", "Shahmukhi and Gurmukhi", ["Only Latin", "Only Devanagari", "Only Cyrillic"], "Punjabi uses Shahmukhi and Gurmukhi."),
          f("Punjabi belongs to which language family?", "Indo-Aryan", ["Dravidian", "Iranian", "Turkic"], "Punjabi is Indo-Aryan."),
          f("Punjabi is the language of:", "Punjab", ["Sindh", "KP", "Balochistan"], "Punjabi is the language of Punjab."),
          f("How many tones does Punjabi have?", "3", ["1", "2", "5"], "Punjabi is a tonal language with three tones."),
          f("A Punjabi noun has how many genders?", "2", ["1", "3", "4"], "Punjabi has two genders."),
          f("Punjabi is widely spoken in:", "Pakistan and India", ["Only Pakistan", "Only India", "Only Bangladesh"], "Punjabi is spoken in both Pakistan and India."),
        ],
      },
      {
        slug: "punjabi-vocabulary",
        facts: [
          f("In Punjabi, 'pani' means:", "Water", ["Fire", "Earth", "Air"], "'Pani' means water."),
          f("In Punjabi, 'ghar' means:", "House", ["Tree", "Road", "Field"], "'Ghar' means house."),
          f("In Punjabi, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Punjabi, 'ma' means:", "Mother", ["Father", "Sister", "Brother"], "'Ma' means mother."),
          f("In Punjabi, 'phull' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Phull' means flower."),
          f("In Punjabi, 'kutta' means:", "Dog", ["Cat", "Cow", "Goat"], "'Kutta' means dog."),
        ],
      },
      {
        slug: "punjabi-idioms",
        facts: [
          f("Punjabi idioms are called:", "Akhana", ["Ghazal", "Sher", "Nazm"], "Punjabi idioms are akhana."),
          f("Punjabi idioms reflect:", "Rural life", ["Only urban life", "Only science", "Only politics"], "Punjabi idioms reflect rural life."),
          f("Using idioms makes Punjabi:", "Vivid", ["Dull", "Confusing", "Formal only"], "Idioms make Punjabi vivid."),
          f("Punjabi idioms are common in:", "Folk speech", ["Only books", "Only courts", "Only law"], "Punjabi idioms are common in folk speech."),
          f("A Punjabi idiom usually conveys:", "Wisdom", ["Numbers", "Dates", "Names"], "Idioms convey wisdom."),
          f("Punjabi idioms often reference:", "Animals and farming", ["Only machines", "Only cities", "Only numbers"], "Punjabi idioms reference animals and farming."),
        ],
      },
      {
        slug: "punjabi-proverbs",
        facts: [
          f("Punjabi proverbs are called:", "Akhan", ["Ghazal", "Sher", "Nazm"], "Punjabi proverbs are akhan."),
          f("A Punjabi proverb expresses:", "Common wisdom", ["A question", "An order", "A number"], "Proverbs express common wisdom."),
          f("Punjabi proverbs pass down through:", "Oral tradition", ["Only books", "Only films", "Only radio"], "Proverbs pass down orally."),
          f("Punjabi proverbs are usually:", "Short", ["Very long", "Musical", "Rhymed only"], "Proverbs are short."),
          f("Punjabi proverbs often mention:", "Nature", ["Only machines", "Only cities", "Only numbers"], "Punjabi proverbs often reference nature."),
          f("Proverbs are used to:", "Teach a lesson", ["Confuse listeners", "Tell time", "Count money"], "Proverbs teach lessons."),
        ],
      },
    ],
  },

  /* ============================ Pashto ============================ */
  {
    slug: "pashto",
    topics: [
      {
        slug: "pashto-grammar",
        facts: [
          f("Pashto is written in which script?", "Perso-Arabic", ["Devanagari", "Gurmukhi", "Latin"], "Pashto uses a Perso-Arabic script."),
          f("Pashto belongs to which language family?", "Iranian", ["Indo-Aryan", "Dravidian", "Turkic"], "Pashto is an Iranian language."),
          f("Pashto is mainly spoken in:", "Khyber Pakhtunkhwa and Afghanistan", ["Punjab only", "Sindh only", "Balochistan only"], "Pashto is spoken in KP and Afghanistan."),
          f("How many grammatical genders does Pashto have?", "2", ["1", "3", "4"], "Pashto has two genders."),
          f("Pashto is an official language of:", "Afghanistan", ["Iran", "Tajikistan", "Uzbekistan"], "Pashto is official in Afghanistan."),
          f("Pashto has how many cases (approx.)?", "3", ["1", "5", "7"], "Pashto has about three cases."),
        ],
      },
      {
        slug: "pashto-vocabulary",
        facts: [
          f("In Pashto, 'oba' means:", "Water", ["Fire", "Earth", "Air"], "'Oba' means water."),
          f("In Pashto, 'kor' means:", "House", ["Tree", "Road", "Field"], "'Kor' means house."),
          f("In Pashto, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Pashto, 'mor' means:", "Mother", ["Father", "Sister", "Brother"], "'Mor' means mother."),
          f("In Pashto, 'gul' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Gul' means flower."),
          f("In Pashto, 'spy' means:", "Dog", ["Cat", "Cow", "Goat"], "'Spy' means dog."),
        ],
      },
      {
        slug: "pashto-idioms",
        facts: [
          f("Pashto idioms are called:", "Istilahat", ["Ghazal", "Sher", "Nazm"], "Pashto idioms are istilahat."),
          f("Pashto idioms reflect:", "Pashtun culture", ["Only urban life", "Only science", "Only politics"], "Pashto idioms reflect Pashtun culture."),
          f("Using idioms makes Pashto:", "Expressive", ["Dull", "Confusing", "Formal only"], "Idioms make Pashto expressive."),
          f("Pashto idioms are common in:", "Daily speech", ["Only books", "Only courts", "Only law"], "Pashto idioms are common in daily speech."),
          f("A Pashto idiom usually conveys:", "Wisdom", ["Numbers", "Dates", "Names"], "Idioms convey wisdom."),
          f("Pashto idioms often reference:", "Hospitality and honour", ["Only machines", "Only cities", "Only numbers"], "Pashto idioms reference hospitality and honour."),
        ],
      },
      {
        slug: "pashto-proverbs",
        facts: [
          f("Pashto proverbs are called:", "Mataluna", ["Ghazal", "Sher", "Nazm"], "Pashto proverbs are mataluna."),
          f("A Pashto proverb expresses:", "Common wisdom", ["A question", "An order", "A number"], "Proverbs express common wisdom."),
          f("Pashto proverbs pass down through:", "Oral tradition", ["Only books", "Only films", "Only radio"], "Proverbs pass down orally."),
          f("Pashto proverbs are usually:", "Short", ["Very long", "Musical", "Rhymed only"], "Proverbs are short."),
          f("Pashto proverbs often mention:", "Nature and honour", ["Only machines", "Only cities", "Only numbers"], "Pashto proverbs reference nature and honour."),
          f("Proverbs are used to:", "Teach a lesson", ["Confuse listeners", "Tell time", "Count money"], "Proverbs teach lessons."),
        ],
      },
    ],
  },

  /* ============================ Balochi / Saraiki ============================ */
  {
    slug: "balochi",
    topics: [
      {
        slug: "balochi-grammar",
        facts: [
          f("Balochi is written in which script?", "Perso-Arabic", ["Devanagari", "Gurmukhi", "Latin"], "Balochi uses a Perso-Arabic script."),
          f("Balochi belongs to which language family?", "Iranian", ["Indo-Aryan", "Dravidian", "Turkic"], "Balochi is an Iranian language."),
          f("Balochi is mainly spoken in:", "Balochistan", ["Punjab", "Sindh", "KP"], "Balochi is spoken in Balochistan."),
          f("How many grammatical genders does Balochi have?", "2", ["1", "3", "4"], "Balochi has two genders."),
          f("Balochi is also spoken in:", "Iran and Afghanistan", ["Only Pakistan", "Only India", "Only China"], "Balochi is spoken in Iran and Afghanistan."),
          f("Balochi literature is mostly:", "Oral", ["Printed only", "Digital only", "Filmed only"], "Balochi literature is largely oral."),
        ],
      },
      {
        slug: "balochi-vocabulary",
        facts: [
          f("In Balochi, 'ap' means:", "Water", ["Fire", "Earth", "Air"], "'Ap' means water."),
          f("In Balochi, 'log' means:", "House", ["Tree", "Road", "Field"], "'Log' means house."),
          f("In Balochi, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Balochi, 'mas' means:", "Mother", ["Father", "Sister", "Brother"], "'Mas' means mother."),
          f("In Balochi, 'gul' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Gul' means flower."),
          f("In Balochi, 'kuchik' means:", "Dog", ["Cat", "Cow", "Goat"], "'Kuchik' means dog."),
        ],
      },
      {
        slug: "balochi-idioms",
        facts: [
          f("Balochi idioms reflect:", "Baloch culture", ["Only urban life", "Only science", "Only politics"], "Balochi idioms reflect Baloch culture."),
          f("Using idioms makes Balochi:", "Expressive", ["Dull", "Confusing", "Formal only"], "Idioms make Balochi expressive."),
          f("Balochi idioms are common in:", "Daily speech", ["Only books", "Only courts", "Only law"], "Balochi idioms are common in daily speech."),
          f("A Balochi idiom usually conveys:", "Wisdom", ["Numbers", "Dates", "Names"], "Idioms convey wisdom."),
          f("Balochi idioms often reference:", "Nature and honour", ["Only machines", "Only cities", "Only numbers"], "Balochi idioms reference nature and honour."),
          f("Balochi idioms are preserved through:", "Oral tradition", ["Only print", "Only film", "Only radio"], "Balochi idioms are preserved orally."),
        ],
      },
    ],
  },
  {
    slug: "saraiki",
    topics: [
      {
        slug: "saraiki-grammar",
        facts: [
          f("Saraiki is written in which script?", "Shahmukhi", ["Devanagari", "Gurmukhi", "Latin"], "Saraiki uses Shahmukhi."),
          f("Saraiki belongs to which language family?", "Indo-Aryan", ["Dravidian", "Iranian", "Turkic"], "Saraiki is Indo-Aryan."),
          f("Saraiki is mainly spoken in:", "South Punjab", ["Sindh", "KP", "Balochistan"], "Saraiki is spoken in South Punjab."),
          f("Saraiki is closely related to:", "Punjabi and Sindhi", ["Pashto", "Balochi", "Kashmiri"], "Saraiki is related to Punjabi and Sindhi."),
          f("Saraiki has how many tones?", "3", ["1", "2", "5"], "Saraiki is a tonal language."),
          f("Saraiki is also called:", "Multani", ["Lahori", "Peshawari", "Karachi"], "Saraiki is also called Multani."),
        ],
      },
      {
        slug: "saraiki-vocabulary",
        facts: [
          f("In Saraiki, 'pani' means:", "Water", ["Fire", "Earth", "Air"], "'Pani' means water."),
          f("In Saraiki, 'ghar' means:", "House", ["Tree", "Road", "Field"], "'Ghar' means house."),
          f("In Saraiki, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Saraiki, 'ma' means:", "Mother", ["Father", "Sister", "Brother"], "'Ma' means mother."),
          f("In Saraiki, 'phull' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Phull' means flower."),
          f("In Saraiki, 'kutta' means:", "Dog", ["Cat", "Cow", "Goat"], "'Kutta' means dog."),
        ],
      },
      {
        slug: "saraiki-idioms",
        facts: [
          f("Saraiki idioms reflect:", "Saraiki culture", ["Only urban life", "Only science", "Only politics"], "Saraiki idioms reflect Saraiki culture."),
          f("Using idioms makes Saraiki:", "Expressive", ["Dull", "Confusing", "Formal only"], "Idioms make Saraiki expressive."),
          f("Saraiki idioms are common in:", "Daily speech", ["Only books", "Only courts", "Only law"], "Saraiki idioms are common in daily speech."),
          f("A Saraiki idiom usually conveys:", "Wisdom", ["Numbers", "Dates", "Names"], "Idioms convey wisdom."),
          f("Saraiki idioms often reference:", "Nature and farming", ["Only machines", "Only cities", "Only numbers"], "Saraiki idioms reference nature and farming."),
          f("Saraiki idioms are preserved through:", "Oral tradition", ["Only print", "Only film", "Only radio"], "Saraiki idioms are preserved orally."),
        ],
      },
    ],
  },

  /* ============================ Arabic / Persian ============================ */
  {
    slug: "arabic",
    topics: [
      {
        slug: "arabic-morphology",
        facts: [
          f("Arabic morphology studies:", "Word formation", ["Sentence structure", "Sound only", "Poetry only"], "Morphology studies word formation."),
          f("An Arabic root usually has how many letters?", "3", ["2", "4", "5"], "Most Arabic roots have three letters."),
          f("The pattern system in Arabic is called:", "Wazn", ["Nahw", "Balagha", "Khat"], "Wazn is the Arabic pattern system."),
          f("Arabic plurals can be:", "Broken or sound", ["Only sound", "Only broken", "Neither"], "Arabic has broken and sound plurals."),
          f("Arabic grammar is called:", "Nahw", ["Sarf", "Balagha", "Adab"], "Nahw is Arabic grammar; Sarf is morphology."),
          f("The study of Arabic word structure is:", "Sarf", ["Nahw", "Balagha", "Adab"], "Sarf studies word structure."),
        ],
      },
      {
        slug: "arabic-vocabulary",
        facts: [
          f("In Arabic, 'ma' means:", "Water", ["Fire", "Earth", "Air"], "'Ma' means water."),
          f("In Arabic, 'bayt' means:", "House", ["Tree", "Road", "Field"], "'Bayt' means house."),
          f("In Arabic, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Arabic, 'umm' means:", "Mother", ["Father", "Sister", "Brother"], "'Umm' means mother."),
          f("In Arabic, 'zahra' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Zahra' means flower."),
          f("In Arabic, 'salam' means:", "Peace", ["War", "Trade", "Travel"], "'Salam' means peace."),
        ],
      },
      {
        slug: "arabic-comprehension",
        facts: [
          f("Arabic is written from:", "Right to left", ["Left to right", "Top to bottom", "Bottom to top"], "Arabic is written right to left."),
          f("Classical Arabic is the language of the:", "Quran", ["Bible", "Vedas", "Torah"], "Classical Arabic is the Quran's language."),
          f("Modern Standard Arabic is used in:", "Formal contexts", ["Only casual speech", "Only poetry", "Only songs"], "MSA is used formally."),
          f("Arabic has how many letters?", "28", ["26", "30", "24"], "Arabic has 28 letters."),
          f("The Arabic definite article is:", "Al-", ["The-", "El- only", "La-"], "'Al-' is the Arabic definite article."),
          f("Arabic dialects vary by:", "Region", ["Only age", "Only gender", "Only occupation"], "Arabic dialects vary by region."),
        ],
      },
    ],
  },
  {
    slug: "persian",
    topics: [
      {
        slug: "persian-grammar",
        facts: [
          f("Persian is written in which script?", "Perso-Arabic", ["Devanagari", "Gurmukhi", "Latin"], "Persian uses a Perso-Arabic script."),
          f("Persian belongs to which language family?", "Iranian", ["Indo-Aryan", "Dravidian", "Turkic"], "Persian is an Iranian language."),
          f("Persian is the official language of:", "Iran", ["Iraq", "Turkey", "Egypt"], "Persian is official in Iran."),
          f("Persian has how many grammatical genders?", "0", ["1", "2", "3"], "Persian has no grammatical gender."),
          f("The Persian word order is:", "Subject-Object-Verb", ["Subject-Verb-Object", "Verb-Subject-Object", "Object-Subject-Verb"], "Persian is SOV."),
          f("Persian is written from:", "Right to left", ["Left to right", "Top to bottom", "Bottom to top"], "Persian is written right to left."),
        ],
      },
      {
        slug: "persian-vocabulary",
        facts: [
          f("In Persian, 'ab' means:", "Water", ["Fire", "Earth", "Air"], "'Ab' means water."),
          f("In Persian, 'khane' means:", "House", ["Tree", "Road", "Field"], "'Khane' means house."),
          f("In Persian, 'kitab' means:", "Book", ["Pen", "Paper", "Desk"], "'Kitab' means book."),
          f("In Persian, 'madar' means:", "Mother", ["Father", "Sister", "Brother"], "'Madar' means mother."),
          f("In Persian, 'gol' means:", "Flower", ["Fruit", "Leaf", "Root"], "'Gol' means flower."),
          f("In Persian, 'dust' means:", "Friend", ["Enemy", "Teacher", "Doctor"], "'Dust' means friend."),
        ],
      },
    ],
  },
];
