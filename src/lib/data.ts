import { Curriculum } from './types';

export const curriculum: Curriculum = {
  levels: [
    {
      id: 'a0',
      title: 'Уровень A0: Введение (Einstieg)',
      description: 'Ваши первые шаги в немецком языке. Изучите алфавит, правила чтения и самые важные первые фразы.',
      topics: [
        {
          id: 'alphabet-und-aussprache',
          title: 'Алфавит и произношение',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🔤</span> Немецкий алфавит
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В немецком алфавите 26 латинских букв + 4 особенные: <strong>Ä, Ö, Ü</strong> (умлауты) и <strong>ß</strong> (эсцет).
                </p>
                
                <h3 class="font-semibold mb-3 text-primary">Важные сочетания гласных:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div class="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <code>ei</code> <span class="text-primary font-bold">ай</span> <span class="text-xs text-muted-foreground">(nein, mein)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <code>ie</code> <span class="text-primary font-bold">и (долгое)</span> <span class="text-xs text-muted-foreground">(sie, Liebe)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <code>eu / äu</code> <span class="text-primary font-bold">ой</span> <span class="text-xs text-muted-foreground">(Euro, Häuser)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <code>au</code> <span class="text-primary font-bold">ау</span> <span class="text-xs text-muted-foreground">(Haus, Frau)</span>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Согласные с особенностями:</h3>
                <div class="space-y-2 bg-muted p-4 rounded-lg">
                  <div class="flex items-start gap-4 border-b border-border/50 pb-2">
                    <span class="font-bold w-12 underline">sch</span> 
                    <span>как русская <strong>Ш</strong> <span class="text-muted-foreground ml-2">(Schule, Tisch)</span></span>
                  </div>
                  <div class="flex items-start gap-4 border-b border-border/50 pb-2">
                    <span class="font-bold w-12 underline">st/sp</span> 
                    <span>в начале читается как <strong>ШТ / ШП</strong> <span class="text-muted-foreground ml-2">(Sport, Straße)</span></span>
                  </div>
                  <div class="flex items-start gap-4 border-b border-border/50 pb-2">
                    <span class="font-bold w-12 underline">v</span> 
                    <span>часто как <strong>Ф</strong> <span class="text-muted-foreground ml-2">(Vater, viel)</span> но иногда <strong>В</strong> (Vase)</span>
                  </div>
                  <div class="flex items-start gap-4">
                    <span class="font-bold w-12 underline">h</span> 
                    <span>в начале слова — выдох (как <strong>Х</strong>), в середине после гласной — <strong>не читается</strong> (удлиняет гласную)</span>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">💡 <strong>Совет:</strong> В немецком языке почти всё читается так, как пишется. Главное — запомнить правила для сочетаний букв.</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Первые слова',
              words: [
                { type: 'noun', german: 'Hallo', russian: 'Привет', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Hallo!', examplePlural: '-' },
                { type: 'other', german: 'Ja', russian: 'Да', example: 'Ja, bitte.' },
                { type: 'other', german: 'Nein', russian: 'Нет', example: 'Nein, danke.' },
                { type: 'other', german: 'Danke', russian: 'Спасибо', example: 'Vielen Dank!' },
                { type: 'other', german: 'Bitte', russian: 'Пожалуйста', example: 'Bitte sehr.' },
                { type: 'other', german: 'Tschüss', russian: 'Пока', example: 'Tschüss, bis morgen!' },
                { type: 'noun', german: 'Name', russian: 'Имя', article: 'der', plural: 'Namen', pluralArticle: 'die', exampleSingular: 'Mein Name ist Oleh.', examplePlural: 'Wie sind die Namen?' },
                { type: 'noun', german: 'Frau', russian: 'женщина/госпожа', article: 'die', plural: 'Frauen', pluralArticle: 'die', exampleSingular: 'Guten Tag, Frau Müller.', examplePlural: 'Drei Frauen.' },
                { type: 'noun', german: 'Herr', russian: 'мужчина/господин', article: 'der', plural: 'Herren', pluralArticle: 'die', exampleSingular: 'Guten Tag, Herr Schmidt.', examplePlural: 'Meine Herren.' },
                { type: 'verb', german: 'kommen', russian: 'приходить', conjugation: 'ich komme', example: 'Ich komme aus der Ukraine.' },
                { type: 'verb', german: 'heißen', russian: 'называться/зваться', conjugation: 'ich heiße', example: 'Ich heiße Oleh.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-1-ex-1',
              type: 'multiple-choice',
              question: 'Как читается сочетание "ei"?',
              options: ['и', 'ай', 'ой', 'ау'],
              correctAnswer: 'ай',
              explanation: 'Сочетание "ei" читается как "ай", например: nein, mein.'
            },
            {
              id: 'a0-1-ex-2',
              type: 'multiple-choice',
              question: 'Какая буква читается как "Ш" в сочетании "sch"?',
              options: ['s', 'sch', 'ch', 'st'],
              correctAnswer: 'sch',
              explanation: '"sch" — это классический звук "Ш" в немецком.'
            },
            {
              id: 'a0-1-ex-3',
              type: 'fill-in-the-blank',
              question: 'Переведите "Да" на немецкий.',
              correctAnswer: 'Ja',
              explanation: 'Ja — Да, Nein — Нет.'
            }
          ]
        },
        {
          id: 'zahlen-und-zeit',
          title: 'Числа и время',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🔢</span> Числа от 0 до 12
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <div class="bg-muted p-2 rounded text-center"><strong>0</strong> null</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>1</strong> eins</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>2</strong> zwei</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>3</strong> drei</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>4</strong> vier</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>5</strong> fünf</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>6</strong> sechs</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>7</strong> sieben</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>8</strong> acht</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>9</strong> neun</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>10</strong> zehn</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>11</strong> elf</div>
                  <div class="bg-muted p-2 rounded text-center"><strong>12</strong> zwölf</div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Дни недели:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div class="flex justify-between border-b pb-1"><span>Montag</span> <span class="text-muted-foreground">Понедельник</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Dienstag</span> <span class="text-muted-foreground">Вторник</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Mittwoch</span> <span class="text-muted-foreground">Среда</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Donnerstag</span> <span class="text-muted-foreground">Четверг</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Freitag</span> <span class="text-muted-foreground">Пятница</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Samstag</span> <span class="text-muted-foreground">Суббота</span></div>
                  <div class="flex justify-between border-b pb-1"><span>Sonntag</span> <span class="text-muted-foreground text-red-500 font-bold">Воскресенье</span></div>
                </div>

                <div class="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">⏰ <strong>Вопрос:</strong> "Wie spät ist es?" (Который час?) — "Es ist пять Uhr."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Числа и Дни',
              words: [
                { type: 'other', german: 'null', russian: 'ноль', example: 'Null Grad.' },
                { type: 'other', german: 'eins', russian: 'один', example: 'Eins, zwei, drei.' },
                { type: 'other', german: 'zwei', russian: 'два', example: 'Zwei Kaffee, bitte.' },
                { type: 'other', german: 'heute', russian: 'сегодня', example: 'Heute ist Montag.' },
                { type: 'other', german: 'morgen', russian: 'завтра', example: 'Morgen ist Dienstag.' },
                { type: 'noun', german: 'Tag', russian: 'день', article: 'der', plural: 'Tage', pluralArticle: 'die', exampleSingular: 'Einen schönen Tag!', examplePlural: 'Sieben Tage.' },
                { type: 'noun', german: 'Woche', russian: 'неделя', article: 'die', plural: 'Wochen', pluralArticle: 'die', exampleSingular: 'Nächste Woche.', examplePlural: 'Zwei Wochen.' },
                { type: 'other', german: 'wann', russian: 'когда', example: 'Wann kommst du?' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-2-ex-1',
              type: 'multiple-choice',
              question: 'Как по-немецки "два"?',
              options: ['eins', 'zwei', 'drei', 'vier'],
              correctAnswer: 'zwei',
              explanation: '0: null, 1: eins, 2: zwei, 3: drei...'
            },
            {
              id: 'a0-2-ex-2',
              type: 'fill-in-the-blank',
              question: 'Сегодня понедельник: Heute ist ___ .',
              correctAnswer: 'Montag',
              explanation: 'Дни недели: Montag, Dienstag, Mittwoch...'
            },
            {
              id: 'a0-2-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Который час?"',
              correctAnswer: 'Wie spät ist es',
              options: ['Wie', 'spät', 'ist', 'es'],
              explanation: 'Стандартный вопрос о времени: "Wie spät ist es?"'
            }
          ]
        },
        {
          id: 'farben-und-kleidung',
          title: 'Цвета и одежда',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🎨</span> Цвета (Farben)
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-white border"></div> <span>weiß</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-black"></div> <span>schwarz</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-red-500"></div> <span>rot</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-blue-500"></div> <span>blau</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-green-500"></div> <span>grün</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-yellow-400"></div> <span>gelb</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-gray-500"></div> <span>grau</span>
                  </div>
                  <div class="flex items-center gap-2 bg-muted p-2 rounded">
                    <div class="w-4 h-4 rounded-full bg-orange-500"></div> <span>orange</span>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Предметы одежды:</h3>
                <div class="space-y-2 bg-muted p-4 rounded-lg text-sm">
                  <div class="flex justify-between border-b pb-1"><span>das T-Shirt</span> <span class="text-muted-foreground italic">Футболка</span></div>
                  <div class="flex justify-between border-b pb-1"><span>die Hose</span> <span class="text-muted-foreground italic">Брюки</span></div>
                  <div class="flex justify-between border-b pb-1"><span>das Kleid</span> <span class="text-muted-foreground italic">Платье</span></div>
                  <div class="flex justify-between border-b pb-1"><span>der Rock</span> <span class="text-muted-foreground italic">Юбка</span></div>
                  <div class="flex justify-between border-b pb-1"><span>die Jacke</span> <span class="text-muted-foreground italic">Куртка</span></div>
                  <div class="flex justify-between"><span>die Schuhe</span> <span class="text-muted-foreground italic">Обувь (мн.ч.)</span></div>
                </div>

                <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">🧥 <strong>Вопрос:</strong> "Was trägst du?" (Что на тебе надето?) — "Ich trage eine blaue Hose."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Цвета и Гардероб',
              words: [
                { type: 'noun', german: 'Farbe', russian: 'цвет', article: 'die', plural: 'Farben', pluralArticle: 'die', exampleSingular: 'Welche Farbe?', examplePlural: 'Alle Farben.' },
                { type: 'other', german: 'blau', russian: 'синий', example: 'Der Himmel ist blau.' },
                { type: 'other', german: 'rot', russian: 'красный', example: 'Die Rose ist rot.' },
                { type: 'noun', german: 'Hose', russian: 'брюки', article: 'die', plural: 'Hosen', pluralArticle: 'die', exampleSingular: 'Eine Jeanshose.', examplePlural: 'Zwei Hosen.' },
                { type: 'noun', german: 'Hemd', russian: 'рубашка', article: 'das', plural: 'Hemden', pluralArticle: 'die', exampleSingular: 'Ein weißes Hemd.', examplePlural: 'Drei Hemden.' },
                { type: 'noun', german: 'Kleid', russian: 'платье', article: 'das', plural: 'Kleider', pluralArticle: 'die', exampleSingular: 'Ein schönes Kleid.', examplePlural: 'Viele Kleider.' },
                { type: 'verb', german: 'tragen', russian: 'носить', conjugation: 'er trägt', example: 'Ich trage ein T-Shirt.' },
                { type: 'other', german: 'schön', russian: 'красивый/хороший', example: 'Das ist ein schönes Kleid.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-3-ex-1',
              type: 'multiple-choice',
              question: 'Какого цвета небо (Himmel)?',
              options: ['rot', 'grün', 'blau', 'gelb'],
              correctAnswer: 'blau',
              explanation: 'Blau — синий, rot — красный, grün — зеленый.'
            },
            {
              id: 'a0-3-ex-2',
              type: 'fill-in-the-blank',
              question: 'Я ношу футболку: Ich ___ ein T-Shirt.',
              correctAnswer: 'trage',
              explanation: 'Глагол tragen (носить): ich trage, du trägst...'
            }
          ]
        },
        {
          id: 'hobbys-und-freizeit',
          title: 'Хобби и свободное время',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">⚽</span> Свободное время (Freizeit)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Чтобы рассказать о своих увлечениях, мы используем глагол <strong>machen</strong> (делать) или специфические глаголы действия.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted/50 rounded-lg border">
                    <h3 class="font-bold mb-2">Что ты делаешь?</h3>
                    <p class="italic text-sm">"Was machst du gern?"</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Что ты любишь делать?)</p>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Ответ:</h3>
                    <p class="italic text-sm">"Ich spiele <strong>Fußball</strong>."</p>
                    <p class="italic text-sm">"Ich höre <strong>Musik</strong>."</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Популярные хобби:</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm italic">
                  <div class="bg-muted p-2 rounded">Sport machen</div>
                  <div class="bg-muted p-2 rounded">Bücher lesen</div>
                  <div class="bg-muted p-2 rounded">Filme sehen</div>
                  <div class="bg-muted p-2 rounded">Schwimmen gehen</div>
                  <div class="bg-muted p-2 rounded">Klavier spielen</div>
                  <div class="bg-muted p-2 rounded">Deutsch lernen</div>
                </div>

                <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm">💡 <strong>Слово "gern":</strong> Добавьте его после глагола, чтобы сказать, что вам нравится это делать: <em>"Ich tanze gern."</em></p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Хобби',
              words: [
                { type: 'noun', german: 'Hobby', russian: 'хобби', article: 'das', plural: 'Hobbys', pluralArticle: 'die', exampleSingular: 'Mein Hobby ist Musik.', examplePlural: 'Hast du Hobbys?' },
                { type: 'noun', german: 'Musik', russian: 'музыка', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Ich höre Musik.', examplePlural: '-' },
                { type: 'noun', german: 'Sport', russian: 'спорт', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Ich mache Sport.', examplePlural: '-' },
                { type: 'noun', german: 'Fußball', russian: 'футбол', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Wir spielen Fußball.', examplePlural: '-' },
                { type: 'noun', german: 'Buch', russian: 'книга', article: 'das', plural: 'Bücher', pluralArticle: 'die', exampleSingular: 'Ein gutes Buch.', examplePlural: 'Ich lese Bücher.' },
                { type: 'noun', german: 'Film', russian: 'фильм', article: 'der', plural: 'Filme', pluralArticle: 'die', exampleSingular: 'Der Film ist gut.', examplePlural: '-' },
                { type: 'noun', german: 'Kino', russian: 'кино', article: 'das', plural: 'Kinos', pluralArticle: 'die', exampleSingular: 'Wir gehen ins Kino.', examplePlural: '-' },
                { type: 'verb', german: 'spielen', russian: 'играть', conjugation: 'er spielt', example: 'Ich spiele Tennis.' },
                { type: 'verb', german: 'machen', russian: 'делать', conjugation: 'er macht', example: 'Was machst du?' },
                { type: 'verb', german: 'hören', russian: 'слушать', conjugation: 'er hört', example: 'Musik hören.' },
                { type: 'verb', german: 'lesen', russian: 'читать', conjugation: 'er liest', example: 'Ich lese gern.' },
                { type: 'verb', german: 'sehen', russian: 'смотреть', conjugation: 'er sieht', example: 'Fernsehen.' },
                { type: 'verb', german: 'schwimmen', russian: 'плавать', conjugation: 'er schwimmt', example: 'Ich schwimme gern.' },
                { type: 'other', german: 'gern', russian: 'охотно (нравится)', example: 'Ich lerne gern.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-4-ex-1',
              type: 'multiple-choice',
              question: 'Что мы делаем с книгой (Buch)?',
              options: ['hören', 'spielen', 'lesen', 'schwimmen'],
              correctAnswer: 'lesen',
              explanation: 'Lesen — читать, hören — слушать, spielen — играть.'
            },
            {
              id: 'a0-4-ex-2',
              type: 'fill-in-the-blank',
              question: 'Мне нравится танцевать: Ich tanze ___ .',
              correctAnswer: 'gern',
              explanation: 'Слово "gern" добавляется после глагола, чтобы выразить симпатию к действию.'
            }
          ]
        },
        {
          id: 'wohnen-a0',
          title: 'Жилье (Wohnen)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🏠</span> Мой дом (Mein Zuhause)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Важно знать названия комнат и базовой мебели, а также как сказать, где что находится.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="space-y-2 bg-muted p-4 rounded-lg text-sm">
                    <h3 class="font-bold border-b pb-1 mb-2 text-primary">Комнаты (Zimmer):</h3>
                    <div class="flex justify-between"><span>das Zimmer</span> <span class="text-muted-foreground italic">Комната</span></div>
                    <div class="flex justify-between"><span>die Küche</span> <span class="text-muted-foreground italic">Кухня</span></div>
                    <div class="flex justify-between"><span>das Bad</span> <span class="text-muted-foreground italic">Ванная</span></div>
                    <div class="flex justify-between"><span>das Schlafzimmer</span> <span class="text-muted-foreground italic">Спальня</span></div>
                  </div>
                  <div class="space-y-2 bg-muted p-4 rounded-lg text-sm">
                    <h3 class="font-bold border-b pb-1 mb-2 text-primary">Мебель (Möbel):</h3>
                    <div class="flex justify-between"><span>der Tisch</span> <span class="text-muted-foreground italic">Стол</span></div>
                    <div class="flex justify-between"><span>der Stuhl</span> <span class="text-muted-foreground italic">Стул</span></div>
                    <div class="flex justify-between"><span>das Bett</span> <span class="text-muted-foreground italic">Кровать</span></div>
                    <div class="flex justify-between"><span>der Schrank</span> <span class="text-muted-foreground italic">Шкаф</span></div>
                  </div>
                </div>

                <div class="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <h3 class="font-bold text-sm mb-2">Где? (Wo?) + Dativ:</h3>
                  <div class="space-y-1 text-sm italic">
                    <p>• <strong>in</strong> der Küche (на кухне)</p>
                    <p>• <strong>auf</strong> dem Tisch (на столе)</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Дом и Мебель',
              words: [
                { type: 'noun', german: 'Haus', russian: 'дом', article: 'das', plural: 'Häuser', pluralArticle: 'die', exampleSingular: 'Das Haus ist groß.', examplePlural: '-' },
                { type: 'noun', german: 'Wohnung', russian: 'квартира', article: 'die', plural: 'Wohnungen', pluralArticle: 'die', exampleSingular: 'Meine Wohnung.', examplePlural: '-' },
                { type: 'noun', german: 'Zimmer', russian: 'комната', article: 'das', plural: 'Zimmer', pluralArticle: 'die', exampleSingular: 'Ein helles Zimmer.', examplePlural: '-' },
                { type: 'noun', german: 'Küche', russian: 'кухня', article: 'die', plural: 'Küchen', pluralArticle: 'die', exampleSingular: 'In der Küche.', examplePlural: '-' },
                { type: 'noun', german: 'Bad', russian: 'ванная', article: 'das', plural: 'Bäder', pluralArticle: 'die', exampleSingular: 'Das Bad ist klein.', examplePlural: '-' },
                { type: 'noun', german: 'Tisch', russian: 'стол', article: 'der', plural: 'Tische', pluralArticle: 'die', exampleSingular: 'Der Tisch ist aus Holz.', examplePlural: '-' },
                { type: 'noun', german: 'Stuhl', russian: 'стул', article: 'der', plural: 'Stühle', pluralArticle: 'die', exampleSingular: 'Ein bequemer Stuhl.', examplePlural: '-' },
                { type: 'noun', german: 'Bett', russian: 'кровать', article: 'das', plural: 'Betten', pluralArticle: 'die', exampleSingular: 'Im Bett schlafen.', examplePlural: '-' },
                { type: 'noun', german: 'Schrank', russian: 'шкаф', article: 'der', plural: 'Schränke', pluralArticle: 'die', exampleSingular: 'Der Schrank ist neu.', examplePlural: '-' },
                { type: 'other', german: 'hier', russian: 'здесь', example: 'Ich bin здесь.' },
                { type: 'other', german: 'dort', russian: 'там', example: 'Dort ist das Bad.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-5-ex-1',
              type: 'multiple-choice',
              question: 'Где мы готовим еду?',
              options: ['im Bad', 'im Schlafzimmer', 'in der Küche', 'im Schrank'],
              correctAnswer: 'in der Küche',
              explanation: 'Die Küche — кухня.'
            },
            {
              id: 'a0-5-ex-2',
              type: 'fill-in-the-blank',
              question: 'Стол (m): ___ Tisch.',
              correctAnswer: 'der',
              explanation: 'Tisch мужского рода, поэтому артикль — der.'
            }
          ]
        },
        {
          id: 'einkaufen-a0',
          title: 'Покупки (Einkaufen)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🛒</span> В магазине (Im Supermarkt)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Самые простые слова и фразы для того, чтобы купить еду или спросить цену.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted/50 rounded-lg border">
                    <h3 class="font-bold mb-2 text-primary">Сколько стоит?</h3>
                    <p class="italic text-sm">"Was kostet das?"</p>
                    <p class="italic text-sm">"Wie viel kostet это?"</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Сколько это стоит?)</p>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Ответ:</h3>
                    <p class="italic text-sm">"Das kostet <strong>5 Euro</strong>."</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Важные слова:</h3>
                <div class="grid grid-cols-2 gap-2 text-sm italic">
                  <div class="bg-muted p-2 rounded">der Supermarkt</div>
                  <div class="bg-muted p-2 rounded">die Kasse (касса)</div>
                  <div class="bg-muted p-2 rounded">das Geld (деньги)</div>
                  <div class="bg-muted p-2 rounded">teuer (дорого)</div>
                  <div class="bg-muted p-2 rounded">billig (дешево)</div>
                  <div class="bg-muted p-2 rounded">zahlen (платить)</div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Продукты и Цены',
              words: [
                { type: 'noun', german: 'Supermarkt', russian: 'супермаркет', article: 'der', plural: 'Supermärkte', pluralArticle: 'die', exampleSingular: 'Im Supermarkt.', examplePlural: '-' },
                { type: 'noun', german: 'Euro', russian: 'евро', article: 'der', plural: 'Euro', pluralArticle: 'die', exampleSingular: 'Ein Euro.', examplePlural: 'Zehn Euro.' },
                { type: 'noun', german: 'Cent', russian: 'цент', article: 'der', plural: 'Cent', pluralArticle: 'die', exampleSingular: 'Fünfzig Cent.', examplePlural: '-' },
                { type: 'noun', german: 'Milch', russian: 'молоко', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Milch kaufen.', examplePlural: '-' },
                { type: 'noun', german: 'Brot', russian: 'хлеб', article: 'das', plural: 'Brote', pluralArticle: 'die', exampleSingular: 'Frisches Brot.', examplePlural: '-' },
                { type: 'noun', german: 'Wasser', russian: 'вода', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Eine Flasche Wasser.', examplePlural: '-' },
                { type: 'noun', german: 'Kaffee', russian: 'кофе', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Kaffee trinken.', examplePlural: '-' },
                { type: 'verb', german: 'kosten', russian: 'стоить', conjugation: 'es kostet', example: 'Was kostet das?' },
                { type: 'verb', german: 'kaufen', russian: 'покупать', conjugation: 'ich kaufe', example: 'Ich kaufe Milch.' },
                { type: 'verb', german: 'zahlen', russian: 'платить', conjugation: 'ich zahle', example: 'Bar zahlen, bitte.' },
                { type: 'other', german: 'teuer', russian: 'дорого', example: 'Das ist teuer.' },
                { type: 'other', german: 'billig', russian: 'дешево', example: 'Das ist billig.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a0-6-ex-1',
              type: 'multiple-choice',
              question: 'Как спросить "Сколько это стоит?"',
              options: ['Was ist das?', 'Was kostet das?', 'Wer ist das?', 'Wie heißt du?'],
              correctAnswer: 'Was kostet das?',
              explanation: 'Kosten — стоить. "Was kostet das?" — стандартный вопрос о цене.'
            },
            {
              id: 'a0-6-ex-2',
              type: 'fill-in-the-blank',
              question: '1 евро = 100 ___ .',
              correctAnswer: 'Cent',
              explanation: 'В одном евро сто центов.'
            }
          ]
        }
      ]
    },
    {
      id: 'a1',
      title: 'Уровень A1: Начинающий (Anfänger)',
      description: 'Основы грамматики и базовая лексика. Научитесь рассказывать о себе, семье, еде и повседневных делах.',
      topics: [
        {
          id: 'begruessung-und-vorstellung',
          title: 'Приветствие и знакомство',
          explanation: `
            <div class="space-y-6">
              <section>
                <h2 class="font-headline text-2xl font-bold mb-4">Guten Tag! (Добрый день!)</h2>
                <p class="text-lg leading-relaxed mb-4">
                  Немцы ценят вежливость. Приветствие зависит от времени суток и от того, с кем вы говорите (друзья или официальные лица).
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="bg-card p-4 rounded-xl border shadow-sm">
                    <h3 class="font-bold text-primary mb-2">Официально</h3>
                    <ul class="space-y-1">
                      <li>• Guten Morgen (до 11:00)</li>
                      <li>• Guten Tag (11:00 - 18:00)</li>
                      <li>• Guten Abend (после 18:00)</li>
                      <li>• Auf Wiedersehen (До свидания)</li>
                    </ul>
                  </div>
                  <div class="bg-card p-4 rounded-xl border shadow-sm">
                    <h3 class="font-bold text-accent mb-2">Неофициально</h3>
                    <ul class="space-y-1">
                      <li>• Hallo / Hi (Привет)</li>
                      <li>• Tschüss (Пока)</li>
                      <li>• Bis bald (До скорого)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="font-headline text-2xl font-bold mb-4">Глагол "sein" (быть)</h2>
                <p class="mb-4">Это самый важный глагол! Как "to be" в английском. В немецком он спрягается (изменяется по лицам) *неправильно*.</p>
                <div class="bg-muted p-6 rounded-xl overflow-x-auto">
                  <table class="w-full min-w-[300px]">
                    <thead>
                      <tr class="border-b border-border/50">
                        <th class="text-left pb-2">Лицо</th>
                        <th class="text-left pb-2">Форма</th>
                        <th class="text-left pb-2">Пример</th>
                      </tr>
                    </thead>
                    <tbody class="space-y-2">
                       <tr><td class="py-2">ich (я)</td><td class="font-bold text-primary">bin</td><td class="text-muted-foreground">Ich <strong>bin</strong> Anna.</td></tr>
                       <tr><td class="py-2">du (ты)</td><td class="font-bold text-primary">bist</td><td class="text-muted-foreground">Du <strong>bist</strong> nett.</td></tr>
                       <tr><td class="py-2">er/sie/es (он/она/оно)</td><td class="font-bold text-primary">ist</td><td class="text-muted-foreground">Er <strong>ist</strong> Student.</td></tr>
                       <tr><td class="py-2">wir (мы)</td><td class="font-bold text-primary">sind</td><td class="text-muted-foreground">Wir <strong>sind</strong> hier.</td></tr>
                       <tr><td class="py-2">ihr (вы, группа)</td><td class="font-bold text-primary">seid</td><td class="text-muted-foreground">Ihr <strong>seid</strong> Freunde.</td></tr>
                       <tr><td class="py-2">sie (они) / Sie (Вы)</td><td class="font-bold text-primary">sind</td><td class="text-muted-foreground">Sie <strong>sind</strong> Lehrer.</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Знакомство',
              words: [
                { type: 'noun', german: 'Morgen', russian: 'утро', article: 'der', plural: 'Morgen', pluralArticle: 'die', exampleSingular: 'Der Morgen ist schön.', examplePlural: 'Die Morgen hier sind ruhig.' },
                { type: 'noun', german: 'Tag', russian: 'день', article: 'der', plural: 'Tage', pluralArticle: 'die', exampleSingular: 'Guten Tag!', examplePlural: 'Die Tage werden kürzer.' },
                { type: 'noun', german: 'Abend', russian: 'вечер', article: 'der', plural: 'Abende', pluralArticle: 'die', exampleSingular: 'Der Abend ist lang.', examplePlural: 'Ich mag gemütliche Abende.' },
                { type: 'noun', german: 'Nacht', russian: 'ночь', article: 'die', plural: 'Nächte', pluralArticle: 'die', exampleSingular: 'Gute Nacht.', examplePlural: 'Die Nächte sind kalt.' },
                { type: 'noun', german: 'Frau', russian: 'женщина, госпожа', article: 'die', plural: 'Frauen', pluralArticle: 'die', exampleSingular: 'Das ist Frau Müller.', examplePlural: 'Frauen und Männer sind gleichberechtigt.' },
                { type: 'noun', german: 'Herr', russian: 'мужчина, господин', article: 'der', plural: 'Herren', pluralArticle: 'die', exampleSingular: 'Guten Tag, Herr Schmidt.', examplePlural: 'Die Herren tragen Anzüge.' },
                { type: 'verb', german: 'sein', russian: 'быть', conjugation: 'er ist', example: 'Ich bin glücklich.' },
                { type: 'verb', german: 'heißen', russian: 'называться, зваться', conjugation: 'er heißt', example: 'Ich heiße Max.' },
                { type: 'verb', german: 'kommen', russian: 'приходить, быть родом из', conjugation: 'er kommt', example: 'Ich komme aus Deutschland.' },
                { type: 'verb', german: 'wohnen', russian: 'жить (проживать)', conjugation: 'er wohnt', example: 'Ich wohne in Berlin.' },
                { type: 'verb', german: 'sprechen', russian: 'говорить', conjugation: 'er spricht', example: 'Sprichst du Deutsch?' },
                { type: 'other', german: 'wie', russian: 'как', example: 'Wie heißt du?' },
                { type: 'other', german: 'wer', russian: 'кто', example: 'Wer ist das?' },
                { type: 'other', german: 'woher', russian: 'откуда', example: 'Woher kommst du?' },
                { type: 'other', german: 'aus', russian: 'из', example: 'Ich komme aus Russland.' },
                { type: 'other', german: 'gut', russian: 'хороший, хорошо', example: 'Mir geht es gut.' },
                { type: 'other', german: 'und', russian: 'и', example: 'Ich und du.' },
                { type: 'other', german: 'auch', russian: 'тоже', example: 'Ich bin auch hier.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-1-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "Добрый вечер"?',
              options: ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'],
              correctAnswer: 'Guten Abend',
              explanation: 'Guten Abend используется после 18:00.'
            },
            {
              id: 'a1-1-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich ___ Max. (Глагол "быть")',
              correctAnswer: 'bin',
              explanation: 'Спряжение Sein: ich bin, du bist, er ist...'
            },
            {
              id: 'a1-1-ex-3',
              type: 'word-order',
              question: 'Соберите предложение: "Откуда ты родом?"',
              correctAnswer: 'Woher kommst du',
              options: ['Woher', 'kommst', 'du'],
              explanation: 'В вопросах с вопросительным словом (W-Fragen) глагол стоит на втором месте.'
            }
          ]
        },
        {
          id: 'familie-und-freunde',
          title: 'Семья и друзья',
          explanation: `
            <div class="space-y-6">
              <section>
                <h2 class="font-headline text-2xl font-bold mb-4">Possessivartikel (Мой, твой, наш)</h2>
                <p class="mb-4">Притяжательные местоимения показывают принадлежность. В Nominativ они меняются в зависимости от рода <strong>следующего</strong> слова.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div class="bg-card p-4 rounded-xl border">
                    <h3 class="font-bold text-center border-b pb-2 mb-2">Maskulin (Der)</h3>
                    <p class="text-center"><em>Das ist <strong>mein</strong> Vater.</em></p>
                    <p class="text-center text-sm text-muted-foreground mt-1">(нет окончания)</p>
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">👨‍👩‍👧‍👦</span> Моя семья (Possessivartikel)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Чтобы сказать "мой", "твой" и т.д., мы используем притяжательные местоимения. Они стоят перед существительным.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div class="border p-4 rounded-lg bg-muted/50">
                    <h3 class="font-bold mb-2">Nominativ (Кто? Что?)</h3>
                    <ul class="space-y-2 text-sm italic">
                      <li><strong>mein</strong> Vater / <strong>meine</strong> Mutter</li>
                      <li><strong>dein</strong> Bruder / <strong>deine</strong> Schwester</li>
                      <li><strong>sein</strong> Kind / <strong>seine</strong> Tante</li>
                      <li><strong>ihr</strong> Opa / <strong>ihre</strong> Oma</li>
                    </ul>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary text-sm">Правило окончания:</h3>
                    <p class="text-xs">Если слово женского рода (die) или во множественном числе, добавляем окончание <strong>-e</strong>:</p>
                    <div class="mt-2 text-lg font-mono text-center">mein<strong>e</strong>, dein<strong>e</strong>...</div>
                  </div>
                </div>

                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm italic">"<strong>Meine</strong> Mutter ist Ärztin. <strong>Mein</strong> Bruder spielt Fußball."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Члены семьи',
              words: [
                { type: 'verb', german: 'lieben', russian: 'любить', conjugation: 'er liebt', example: 'Ich liebe meine Familie.' },
                { type: 'verb', german: 'leben', russian: 'жить (существовать)', conjugation: 'er lebt', example: 'Mein Opa lebt noch.' },
                { type: 'other', german: 'verheiratet', russian: 'женатый/замужем', example: 'Ich bin verheiratet.' },
                { type: 'other', german: 'ledig', russian: 'холостой/незамужняя', example: 'Er ist ledig.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-2-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "моя мама"?',
              options: ['mein Mutter', 'meine Mutter', 'meines Mutter', 'meiner Mutter'],
              correctAnswer: 'meine Mutter',
              explanation: 'Mutter — женского рода (die), поэтому к Possessivartikel добавляется окончание -e.'
            },
            {
              id: 'a1-2-ex-2',
              type: 'fill-in-the-blank',
              question: 'Das ist ___ Vater. (Мой)',
              correctAnswer: 'mein',
              explanation: 'Vater — мужского рода (der), окончание не нужно.'
            }
          ]
        },
        {
          id: 'essen-und-trinken',
          title: 'Еда и напитки',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🍕</span> В ресторане: Как сделать заказ?
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда мы хотим что-то заказать или вежливо попросить, мы используем глагол <strong>möchten</strong> (хотел бы).
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted/50 rounded-lg border">
                    <h3 class="font-bold mb-2">Вежливый заказ:</h3>
                    <p class="italic text-sm">"Ich <strong>möchte</strong> gern einen Kaffee, bitte."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Я бы хотел кофе, пожалуйста)</p>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Вопрос официанта:</h3>
                    <p class="italic text-sm">"Что вы хотите?" -> <strong>"Was möchten Sie?"</strong></p>
                    <p class="italic text-sm">"Что-нибудь еще?" -> <strong>"Sonst noch etwas?"</strong></p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Продукты и количества:</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr class="border-b">
                        <th class="py-2">Мера</th>
                        <th class="py-2">Пример</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium">ein Kilo</td>
                        <td class="py-2">ein Kilo Äpfel (килограмм яблок)</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium">ein Liter</td>
                        <td class="py-2">ein Liter Milch (литр молока)</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium">eine Packung</td>
                        <td class="py-2">eine Packung Tee (упаковка чая)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Еда и Магазин',
              words: [
                { type: 'noun', german: 'Essen', russian: 'еда', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Das Essen ist lecker.', examplePlural: '-' },
                { type: 'noun', german: 'Trinken', russian: 'напиток', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Getränke kaufen.', examplePlural: '-' },
                { type: 'noun', german: 'Brot', russian: 'хлеб', article: 'das', plural: 'Brote', pluralArticle: 'die', exampleSingular: 'Ein frisches Brot.', examplePlural: '-' },
                { type: 'noun', german: 'Apfel', russian: 'яблоко', article: 'der', plural: 'Äpfel', pluralArticle: 'die', exampleSingular: 'Ein roter Apfel.', examplePlural: '-' },
                { type: 'noun', german: 'Milch', russian: 'молоко', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Ein Glas Milch.', examplePlural: '-' },
                { type: 'noun', german: 'Kaffee', russian: 'кофе', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Ich trinke Kaffee.', examplePlural: '-' },
                { type: 'noun', german: 'Tee', russian: 'чай', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Schwarzer Tee.', examplePlural: '-' },
                { type: 'noun', german: 'Wasser', russian: 'вода', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Eine Flasche Wasser.', examplePlural: '-' },
                { type: 'noun', german: 'Käse', russian: 'сыр', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Ein Stück Käse.', examplePlural: '-' },
                { type: 'noun', german: 'Wurst', russian: 'колбаса', article: 'die', plural: 'Würste', pluralArticle: 'die', exampleSingular: 'Frische Wurst.', examplePlural: '-' },
                { type: 'noun', german: 'Ei', russian: 'яйцо', article: 'das', plural: 'Eier', pluralArticle: 'die', exampleSingular: 'Ein Ei kochen.', examplePlural: 'Zehn Eier.' },
                { type: 'noun', german: 'Gemüse', russian: 'овощи', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Viel Gemüse essen.', examplePlural: '-' },
                { type: 'noun', german: 'Obst', russian: 'фрукты', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Obst kaufen.', examplePlural: '-' },
                { type: 'verb', german: 'essen', russian: 'есть', conjugation: 'er isst', example: 'Was isst du?' },
                { type: 'verb', german: 'trinken', russian: 'пить', conjugation: 'er trinkt', example: 'Ich trinke gern Saft.' },
                { type: 'verb', german: 'möchten', russian: 'хотеть бы', conjugation: 'ich möchte', example: 'Ich möchte bestellen.' },
                { type: 'verb', german: 'bestellen', russian: 'заказывать', conjugation: 'ich bestelle', example: 'Wir bestellen Pizza.' },
                { type: 'verb', german: 'kaufen', russian: 'покупать', conjugation: 'er kauft', example: 'Ich kaufe Brot.' },
                { type: 'adjective', german: 'lecker', russian: 'вкусный', comparative: 'leckerer', superlative: 'am leckersten', example: 'Sehr lecker!' },
                { type: 'adjective', german: 'durstig', russian: 'жаждущий', comparative: '-', superlative: '-', example: 'Ich bin durstig.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-3-ex-1',
              type: 'multiple-choice',
              question: 'Что вы скажете официанту, чтобы заказать кофе?',
              options: ['Ich trinke Kaffee', 'Ich möchte einen Kaffee, bitte', 'Kaffee ist gut', 'Haben Sie кофе?'],
              correctAnswer: 'Ich möchte einen Kaffee, bitte',
              explanation: 'Глагол möchte используется для вежливого заказа.'
            },
            {
              id: 'a1-3-ex-2',
              type: 'fill-in-the-blank',
              question: '___ Liter Milch. (Один)',
              correctAnswer: 'ein',
              explanation: 'Liter — мужского рода (der).'
            }
          ]
        },
        {
          id: 'tagesablauf',
          title: 'Мой день: Распорядок',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">⏰</span> Глаголы с отделяемыми приставками
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В немецком языке многие глаголы имеют приставки, которые в простом предложении уходят в <strong>самый конец</strong>.
                </p>
                
                <div class="bg-muted p-4 rounded-lg mb-6">
                  <h3 class="font-bold text-center mb-2">Пример: aufstehen (вставать)</h3>
                  <div class="flex justify-center items-center gap-4 text-xl font-mono">
                    <span class="text-primary">Ich</span> 
                    <span class="bg-primary/20 p-1 rounded">stehe</span> 
                    <span>um 7 Uhr</span> 
                    <span class="bg-accent/20 p-1 rounded">auf</span>.
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 border border-border rounded-lg">
                    <h4 class="font-bold mb-2">Частые приставки:</h4>
                    <p class="text-sm"><strong>auf-, an-, ab-, mit-, ein-, aus-</strong></p>
                    <p class="text-xs text-muted-foreground mt-2">Они всегда стоят под ударением.</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg">
                    <h4 class="font-bold mb-2">Примеры:</h4>
                    <ul class="text-sm space-y-1">
                      <li>• <strong>an</strong>fangen (начинать)</li>
                      <li>• <strong>ein</strong>kaufen (закупаться)</li>
                      <li>• <strong>mit</strong>kommen (идти вместе)</li>
                    </ul>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm italic">"Wann <strong>fängt</strong> der Курс <strong>an</strong>?" — "Er <strong>fängt</strong> um 9 Uhr <strong>an</strong>."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Распорядок дня',
              words: [
                { type: 'noun', german: 'Uhr', russian: 'час/время', article: 'die', plural: 'Uhren', pluralArticle: 'die', exampleSingular: 'Es ist acht Uhr.', examplePlural: '-' },
                { type: 'noun', german: 'Zeit', russian: 'время', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Hast du Zeit?', examplePlural: '-' },
                { type: 'noun', german: 'Frühstück', russian: 'завтрак', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Das Frühstück ist fertig.', examplePlural: '-' },
                { type: 'noun', german: 'Arbeit', russian: 'работа', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Ich gehe zur Arbeit.', examplePlural: '-' },
                { type: 'verb', german: 'aufstehen', russian: 'вставать', conjugation: 'ich stehe auf', example: 'Ich stehe früh auf.' },
                { type: 'verb', german: 'anfangen', russian: 'начинать', conjugation: 'es fängt an', example: 'Der Kurs fängt an.' },
                { type: 'verb', german: 'einkaufen', russian: 'покупать продукты', conjugation: 'ich kauфе ein', example: 'Ich kaufe im Supermarkt ein.' },
                { type: 'verb', german: 'fernsehen', russian: 'смотреть телевизор', conjugation: 'ich sehe fern', example: 'Wir sehen abends fern.' },
                { type: 'verb', german: 'anrufen', russian: 'звонить (по телефону)', conjugation: 'ich rufe an', example: 'Ich rufe meine Mutter an.' },
                { type: 'verb', german: 'schlafen', russian: 'спать', conjugation: 'er schläft', example: 'Gute Nacht, schlaf gut!' },
                { type: 'adverb', german: 'zuerst', russian: 'сначала', example: 'Zuerст trinke ich Kaffee.' },
                { type: 'adverb', german: 'dann', russian: 'потом', example: 'Dann gehe ich los.' },
                { type: 'adverb', german: 'später', russian: 'позже', example: 'Bis später!' },
                { type: 'adverb', german: 'früh', russian: 'рано', example: 'Zu früh.' },
                { type: 'adverb', german: 'spät', russian: 'поздно', example: 'Es ist spät.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-4-ex-1',
              type: 'multiple-choice',
              question: 'Куда уходит приставка в глаголе aufstehen?',
              options: ['В начало', 'В конец предложения', 'После глагола', 'Никуда'],
              correctAnswer: 'В конец предложения',
              explanation: 'Отделяемые приставки в простом предложении всегда стоят в самом конце.'
            },
            {
              id: 'a1-4-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich ___ um 7 Uhr auf.',
              correctAnswer: 'stehe',
              explanation: 'Глагол aufstehen: ich stehe ... auf.'
            },
            {
              id: 'a1-4-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Я иду за покупками"',
              correctAnswer: 'Ich kaufe heute ein',
              options: ['Ich', 'kaufe', 'heute', 'ein'],
              explanation: 'Приставка ein- уходит в конец.'
            }
          ]
        },
        {
          id: 'in-der-stadt-a1',
          title: 'В городе (In der Stadt)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🏙️</span> Ориентация в городе
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Куда вы идете и где находитесь? Используем предлоги с падежом <strong>Dativ</strong> для обозначения места.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-muted/30">
                    <h3 class="font-bold mb-2">Важные места:</h3>
                    <ul class="text-sm space-y-1">
                      <li>• der Bahnhof (вокзал)</li>
                      <li>• die Bank (банк)</li>
                      <li>• die Apotheke (аптека)</li>
                      <li>• der Supermarkt (супермаркет)</li>
                    </ul>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 class="font-bold mb-2">Предлоги (Dativ):</h3>
                    <ul class="text-sm space-y-1 italic">
                      <li>• <strong>zu</strong> (к) -> zum Bahnhof</li>
                      <li>• <strong>nach</strong> (в/к - города, страны)</li>
                      <li>• <strong>bei</strong> (у/при) -> bei der Post</li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 bg-muted rounded-lg border">
                  <p class="text-sm">🗣️ <strong>Вопрос:</strong> "Wie komme ich zum Bahnhof?" (Как мне пройти к вокзалу?)</p>
                  <p class="text-sm mt-1">🗣️ <strong>Ответ:</strong> "Gehen Sie geradeaus und dann links." (Идите прямо и потом налево)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Город и Транспорт',
              words: [
                { type: 'noun', german: 'Stadt', russian: 'город', article: 'die', plural: 'Städte', pluralArticle: 'die', exampleSingular: 'Eine große Stadt.', examplePlural: '-' },
                { type: 'noun', german: 'Straße', russian: 'улица', article: 'die', plural: 'Straßen', pluralArticle: 'die', exampleSingular: 'In dieser Straße.', examplePlural: '-' },
                { type: 'noun', german: 'Bahnhof', russian: 'вокзал', article: 'der', plural: 'Bahnhöfe', pluralArticle: 'die', exampleSingular: 'Am Bahnhof.', examplePlural: '-' },
                { type: 'noun', german: 'Bank', russian: 'банк', article: 'die', plural: 'Banken', pluralArticle: 'die', exampleSingular: 'Geld auf der Bank.', examplePlural: '-' },
                { type: 'noun', german: 'Apotheke', russian: 'аптека', article: 'die', plural: 'Apotheken', pluralArticle: 'die', exampleSingular: 'Zur Apotheke gehen.', examplePlural: '-' },
                { type: 'noun', german: 'Post', russian: 'почта', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Brief bei der Post.', examplePlural: '-' },
                { type: 'verb', german: 'finden', russian: 'находить', conjugation: 'er findet', example: 'Ich finde den Weg не.' },
                { type: 'verb', german: 'suchen', russian: 'искать', conjugation: 'er sucht', example: 'Ich suche das Hotel.' },
                { type: 'other', german: 'geradeaus', russian: 'прямо', example: 'Immer geradeaus.' },
                { type: 'other', german: 'links', russian: 'налево', example: 'Biegen Sie links ab.' },
                { type: 'other', german: 'rechts', russian: 'направо', example: 'Dann nach rechts.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-5-ex-1',
              type: 'multiple-choice',
              question: 'Как спросить дорогу к вокзалу?',
              options: ['Wo ist вокзал?', 'Wie komme ich zum Bahnhof?', 'Haben Sie вокзал?', 'Wann ist вокзал?'],
              correctAnswer: 'Wie komme ich zum Bahnhof?',
              explanation: 'Стандартный вопрос для поиска пути.'
            },
            {
              id: 'a1-5-ex-2',
              type: 'fill-in-the-blank',
              question: 'Идите прямо: Gehen Sie ___ .',
              correctAnswer: 'geradeaus',
              explanation: 'Geradeaus — прямо.'
            }
          ]
        },
        {
          id: 'berufe-a1',
          title: 'Профессии (Berufe)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">💼</span> Работа и профессии
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Как рассказать о своей работе и как образуются женские формы названий профессий.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Женские формы (+in):</h3>
                    <p class="text-sm">Большинство профессий образуют женскую форму добавлением суффикса <strong>-in</strong>:</p>
                    <ul class="mt-2 space-y-1 text-sm italic">
                      <li>• der Lehrer -> die Lehrer<strong>in</strong></li>
                      <li>• der Arzt -> die Ärzt<strong>in</strong> (с умлаутом)</li>
                      <li>• der Student -> die Student<strong>in</strong></li>
                    </ul>
                  </div>
                  <div class="bg-primary/5 p-4 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Важные предлоги:</h3>
                    <p class="text-sm">Мы используем <strong>als</strong> (в качестве) и <strong>bei</strong> (в/на компании):</p>
                    <ul class="mt-2 space-y-1 text-sm italic">
                      <li>"Ich arbeite <strong>als</strong> Kellner."</li>
                      <li>"Ich arbeite <strong>bei</strong> Siemens."</li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 bg-muted rounded-lg border">
                  <p class="text-sm">🗣️ <strong>Вопрос:</strong> "Was bist du von Beruf?" (Кто ты по профессии?)</p>
                  <p class="text-sm mt-1">🗣️ <strong>Ответ:</strong> "Ich bin Ingenieur." (Я инженер)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Профессии и Работа',
              words: [
                { type: 'noun', german: 'Beruf', russian: 'профессия', article: 'der', plural: 'Berufe', pluralArticle: 'die', exampleSingular: 'Was bist du von Beruf?', examplePlural: '-' },
                { type: 'noun', german: 'Arbeit', russian: 'работа', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Ich suche Arbeit.', examplePlural: '-' },
                { type: 'noun', german: 'Lehrer', russian: 'учитель', article: 'der', plural: 'Lehrer', pluralArticle: 'die', exampleSingular: 'Der Lehrer erklärt.', examplePlural: '-' },
                { type: 'noun', german: 'Schüler', russian: 'ученик', article: 'der', plural: 'Schüler', pluralArticle: 'die', exampleSingular: 'Ein fleißiger Schüler.', examplePlural: '-' },
                { type: 'noun', german: 'Ingenieur', russian: 'инженер', article: 'der', plural: 'Ingenieure', pluralArticle: 'die', exampleSingular: 'Er ist Ingenieur.', examplePlural: '-' },
                { type: 'noun', german: 'Verkäufer', russian: 'продавец', article: 'der', plural: 'Verkäufer', pluralArticle: 'die', exampleSingular: 'Der Verkäufer помогает.', examplePlural: '-' },
                { type: 'noun', german: 'Kellner', russian: 'официант', article: 'der', plural: 'Kellner', pluralArticle: 'die', exampleSingular: 'Kellner von Beruf.', examplePlural: '-' },
                { type: 'noun', german: 'Arzt', russian: 'врач', article: 'der', plural: 'Ärzte', pluralArticle: 'die', exampleSingular: 'Zum Arzt gehen.', examplePlural: '-' },
                { type: 'noun', german: 'Firma', russian: 'фирма', article: 'die', plural: 'Firmen', pluralArticle: 'die', exampleSingular: 'Eine große Firma.', examplePlural: '-' },
                { type: 'verb', german: 'arbeiten', russian: 'работать', conjugation: 'ich arbeite', example: 'Wo arbeitest du?' },
                { type: 'verb', german: 'sich bewerben', russian: 'подавать заявку', conjugation: 'ich bewerbe mich', example: 'На должность bewerben.' },
                { type: 'other', german: 'arbeitslos', russian: 'безработный', example: 'Er ist zurzeit arbeitslos.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a1-6-ex-1',
              type: 'multiple-choice',
              question: 'Как образуется женская форма профессии "Lehrer"?',
              options: ['Lehrerin', 'Lehrfrau', 'Lehrerfrau', 'Lehrein'],
              correctAnswer: 'Lehrerin',
              explanation: 'Суффикс -in используется для образования женских форм профессий.'
            },
            {
              id: 'a1-2-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich arbeite ___ Siemens.',
              correctAnswer: 'bei',
              explanation: 'Предлог bei используется с названиями компаний.'
            }
          ]
        }
      ]
    },
    {
      id: 'a2',
      title: 'Уровень A2: Базовые знания (Grundlegende Kenntnisse)',
      description: 'Закрепление основ. Краткие, сфокусированные уроки на темы путешествий, здоровья, жилья и работы.',
      topics: [
        {
          id: 'a2-1-transport',
          title: 'A2.1 Путешествия: Транспорт',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📍</span> Предлоги места: Wohin? (Куда?)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда мы говорим о движении в определенном направлении (отвечаем на вопрос <strong>Куда? / Wohin?</strong>),
                  мы используем падеж <strong>Akkusativ</strong>.
                </p>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b">
                        <th class="py-2 font-semibold">Предлог</th>
                        <th class="py-2 font-semibold">Случай употребления</th>
                        <th class="py-2 font-semibold">Пример</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium text-primary">nach (+ Dativ/Geograf.)</td>
                        <td class="py-2">Города, страны (без артикля), направления</td>
                        <td class="py-2 italic">Ich fahre <strong>nach</strong> Berlin.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium text-primary">in (+ Akkusativ)</td>
                        <td class="py-2">Страны с артиклем, закрытые помещения, "внутрь"</td>
                        <td class="py-2 italic">Wir fliegen <strong>in die</strong> Türkei.<br>Ich gehe <strong>in den</strong> Park.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 font-medium text-primary">an (+ Akkusativ)</td>
                        <td class="py-2">К воде, к краю, к границе (вертикаль/горизонталь)</td>
                        <td class="py-2 italic">Wir fahren <strong>an den</strong> Strand.<br>Komm <strong>ans</strong> (an das) Fenster.</td>
                      </tr>
                      <tr>
                        <td class="py-2 font-medium text-primary">zu (+ Dativ)</td>
                        <td class="py-2">К людям, к местам (направление, не входя внутрь)</td>
                        <td class="py-2 italic">Ich gehe <strong>zum</strong> (zu dem) Arzt.<br>Wir fahren <strong>zum</strong> Bahnhof.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <p class="font-medium">💡 Запомните:</p>
                <p><strong>zu</strong> всегда требует Dativ, даже если вопрос "Куда?".</p>
                <p><strong>nach</strong> используется для большинства стран и ВСЕХ городов.</p>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'На вокзале и в пути',
              words: [
                { type: 'noun', german: 'Bahnhof', russian: 'вокзал', article: 'der', plural: 'Bahnhöfe', pluralArticle: 'die', exampleSingular: 'Der Zug steht am Bahnhof.', examplePlural: 'Die Bahnhöfe sind oft voll.' },
                { type: 'noun', german: 'Hauptbahnhof', russian: 'центральный вокзал', article: 'der', plural: 'Hauptbahnhöfe', pluralArticle: 'die', exampleSingular: 'Treffen wir uns am Hauptbahnhof.', examplePlural: '-' },
                { type: 'noun', german: 'Zug', russian: 'поезд', article: 'der', plural: 'Züge', pluralArticle: 'die', exampleSingular: 'Der Zug hat Verspätung.', examplePlural: 'Züge fahren schnell.' },
                { type: 'noun', german: 'S-Bahn', russian: 'городская электричка', article: 'die', plural: 'S-Bahnen', pluralArticle: 'die', exampleSingular: 'Ich nehme die S-Bahn.', examplePlural: '-' },
                { type: 'noun', german: 'U-Bahn', russian: 'метро', article: 'die', plural: 'U-Bahnen', pluralArticle: 'die', exampleSingular: 'Die U-Bahn ist schnell.', examplePlural: '-' },
                { type: 'noun', german: 'Straßenbahn', russian: 'трамвай', article: 'die', plural: 'Straßenbahnen', pluralArticle: 'die', exampleSingular: 'Die Straßenbahn kommt.', examplePlural: '-' },
                { type: 'noun', german: 'Bus', russian: 'автобус', article: 'der', plural: 'Busse', pluralArticle: 'die', exampleSingular: 'Der Bus fährt ab.', examplePlural: '-' },
                { type: 'noun', german: 'Gleis', russian: 'путь (платформа)', article: 'das', plural: 'Gleise', pluralArticle: 'die', exampleSingular: 'Der Zug fährt von Gleis 5.', examplePlural: '-' },
                { type: 'noun', german: 'Bahnsteig', russian: 'перрон', article: 'der', plural: 'Bahnsteige', pluralArticle: 'die', exampleSingular: 'Auf dem Bahnsteig warten.', examplePlural: '-' },
                { type: 'noun', german: 'Flughafen', russian: 'аэропорт', article: 'der', plural: 'Flughäfen', pluralArticle: 'die', exampleSingular: 'Wir fahren zum Flughafen.', examplePlural: '-' },
                { type: 'noun', german: 'Flugzeug', russian: 'самолет', article: 'das', plural: 'Flugzeuge', pluralArticle: 'die', exampleSingular: 'Das Flugzeug landet.', examplePlural: 'Viele Flugzeuge am Himmel.' },
                { type: 'noun', german: 'Flug', russian: 'рейс/полет', article: 'der', plural: 'Flüge', pluralArticle: 'die', exampleSingular: 'Guten Flug!', examplePlural: '-' },
                { type: 'noun', german: 'Koffer', russian: 'чемодан', article: 'der', plural: 'Koffer', pluralArticle: 'die', exampleSingular: 'Mein Koffer ist schwer.', examplePlural: 'Koffer packen.' },
                { type: 'noun', german: 'Gepäck', russian: 'багаж', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Viel Gepäck haben.', examplePlural: '-' },
                { type: 'noun', german: 'Tasche', russian: 'сумка', article: 'die', plural: 'Taschen', pluralArticle: 'die', exampleSingular: 'Meine Tasche ist weg.', examplePlural: '-' },
                { type: 'noun', german: 'Rucksack', russian: 'рюкзак', article: 'der', plural: 'Rucksäcke', pluralArticle: 'die', exampleSingular: 'Rucksack tragen.', examplePlural: '-' },
                { type: 'noun', german: 'Fahrkarte', russian: 'билет', article: 'die', plural: 'Fahrkarten', pluralArticle: 'die', exampleSingular: 'Fahrkarte kaufen.', examplePlural: 'Fahrkarten bitte!' },
                { type: 'noun', german: 'Ticket', russian: 'билет (разг.)', article: 'das', plural: 'Tickets', pluralArticle: 'die', exampleSingular: 'Hast du das Ticket?', examplePlural: '-' },
                { type: 'noun', german: 'Verspätung', russian: 'опоздание', article: 'die', plural: 'Verspätungen', pluralArticle: 'die', exampleSingular: 'Der Zug hat Verspätung.', examplePlural: '-' },
                { type: 'noun', german: 'Auskunft', russian: 'справочная', article: 'die', plural: 'Auskünfte', pluralArticle: 'die', exampleSingular: 'An der Auskunft fragen.', examplePlural: '-' },

                { type: 'verb', german: 'reisen', russian: 'путешествовать', conjugation: 'ich reise', example: 'Ich reise gern.' },
                { type: 'verb', german: 'abfahren', russian: 'отправляться', conjugation: 'er fährt ab', example: 'Der Bus fährt gleich ab.' },
                { type: 'verb', german: 'ankommen', russian: 'прибывать', conjugation: 'er kommt an', example: 'Wann kommen wir an?' },
                { type: 'verb', german: 'einsteigen', russian: 'входить (в транспорт)', conjugation: 'ich steige ein', example: 'Bitte schnell einsteigen.' },
                { type: 'verb', german: 'aussteigen', russian: 'выходить (из транспорта)', conjugation: 'ich steige aus', example: 'Wir müssen hier aussteigen.' },
                { type: 'verb', german: 'umsteigen', russian: 'делать пересадку', conjugation: 'ich steige um', example: 'Wir müssen in Berlin umsteigen.' },
                { type: 'verb', german: 'fliegen', russian: 'летать', conjugation: 'er fliegt', example: 'Wir fliegen nach Spanien.' },
                { type: 'verb', german: 'packen', russian: 'паковать', conjugation: 'ich packe', example: 'Koffer packen.' },

                { type: 'preposition', german: 'nach', russian: 'в (города/страны)', case: 'Dativ', example: 'Ich fahre nach Berlin.' },
                { type: 'preposition', german: 'zu', russian: 'к (направление)', case: 'Dativ', example: 'Zum Bahnhof.' },

                { type: 'adverb', german: 'pünktlich', russian: 'вовремя', example: 'Der Zug ist pünktlich.' },
                { type: 'adverb', german: 'geradeaus', russian: 'прямо', example: 'Gehen Sie geradeaus.' },
                { type: 'adverb', german: 'links', russian: 'слева/налево', example: 'Biegen Sie links ab.' },
                { type: 'adverb', german: 'rechts', russian: 'справа/направо', example: 'Dann rechts.' },
                { type: 'adverb', german: 'weit', russian: 'далеко', example: 'Ist es weit?' },
                { type: 'adverb', german: 'nah', russian: 'близко', example: 'Es ist ganz nah.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-1-ex-1',
              type: 'multiple-choice',
              question: 'С каким падежом используются предлоги места при вопросе "Wohin?" (Куда?)',
              options: ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ'],
              correctAnswer: 'Akkusativ',
              explanation: 'Вопрос "Wohin?" в немецком языке требует падежа Akkusativ.'
            },
            {
              id: 'a2-1-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich fahre ___ Berlin. (В Берлин)',
              correctAnswer: 'nach',
              explanation: 'С городами и большинством стран без артикля используется предлог nach.'
            },
            {
              id: 'a2-1-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Я иду к врачу"',
              correctAnswer: 'Ich gehe zum Arzt',
              options: ['Ich', 'gehe', 'zum', 'Arzt'],
              explanation: 'Предлог zu всегда требует Dativ (zu + dem = zum).'
            }
          ]
        },
        {
          id: 'a2-2-hotel',
          title: 'A2.2 Путешествия: Отель',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🛎️</span> Konjunktiv II: Вежливые просьбы
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В отеле и ресторане важно звучать вежливо. Вместо прямого "Я хочу" (Ich will) используйте конструкции с <strong>Konjunktiv II</strong>.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-semibold mb-2 text-red-500">Грубо / Слишком прямо:</h3>
                    <ul class="space-y-2 text-sm">
                      <li>Ich will ein Zimmer. (Я хочу комнату)</li>
                      <li>Gib mir den Schlüssel. (Дай мне ключ)</li>
                    </ul>
                  </div>
                  <div class="bg-green-50/50 p-4 rounded-lg border border-green-100">
                    <h3 class="font-semibold mb-2 text-green-600">Вежливо / Правильно:</h3>
                    <ul class="space-y-2 text-sm font-medium">
                      <li>Ich <strong>hätte gern</strong> ein Zimmer. (Я бы хотел...)</li>
                      <li>Ich <strong>würde gern</strong> einchecken. (Я бы хотел...)</li>
                      <li><strong>Könnten</strong> Sie mir helfen? (Не могли бы вы...)</li>
                      <li><strong>Dürfte</strong> ich fragen? (Могу я спросить?)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'В отеле',
              words: [
                { type: 'noun', german: 'Hotel', russian: 'отель', article: 'das', plural: 'Hotels', pluralArticle: 'die', exampleSingular: 'Das Hotel ist schön.', examplePlural: '-' },
                { type: 'noun', german: 'Rezeption', russian: 'ресепшн/стойка', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'An der Rezeption.', examplePlural: '-' },
                { type: 'noun', german: 'Empfang', russian: 'приемная', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Am Empfang warten.', examplePlural: '-' },
                { type: 'noun', german: 'Gast', russian: 'гость', article: 'der', plural: 'Gäste', pluralArticle: 'die', exampleSingular: 'Der Gast ist König.', examplePlural: '-' },
                { type: 'noun', german: 'Zimmer', russian: 'номер/комната', article: 'das', plural: 'Zimmer', pluralArticle: 'die', exampleSingular: 'Mein Zimmer ist 205.', examplePlural: '-' },
                { type: 'noun', german: 'Einzelzimmer', russian: 'одноместный номер', article: 'das', plural: 'Einzelzimmer', pluralArticle: 'die', exampleSingular: 'Ein Einzelzimmer bitte.', examplePlural: '-' },
                { type: 'noun', german: 'Doppelzimmer', russian: 'двухместный номер', article: 'das', plural: 'Doppelzimmer', pluralArticle: 'die', exampleSingular: 'Haben Sie ein Doppelzimmer?', examplePlural: '-' },
                { type: 'noun', german: 'Schlüssel', russian: 'ключ', article: 'der', plural: 'Schlüssel', pluralArticle: 'die', exampleSingular: 'Hier ist Ihr Schlüssel.', examplePlural: '-' },
                { type: 'noun', german: 'Schlüsselkarte', russian: 'ключ-карта', article: 'die', plural: 'Schlüsselkarten', pluralArticle: 'die', exampleSingular: 'Die Karte funktioniert nicht.', examplePlural: '-' },
                { type: 'noun', german: 'Ausweis', russian: 'паспорт/удостоверение', article: 'der', plural: 'Ausweise', pluralArticle: 'die', exampleSingular: 'Ihren Ausweis bitte.', examplePlural: '-' },
                { type: 'noun', german: 'Reisepass', russian: 'загранпаспорт', article: 'der', plural: 'Reisepässe', pluralArticle: 'die', exampleSingular: 'Ihr Reisepass.', examplePlural: '-' },
                { type: 'noun', german: 'Formular', russian: 'бланк/анкета', article: 'das', plural: 'Formulare', pluralArticle: 'die', exampleSingular: 'Füllen Sie das Formular aus.', examplePlural: '-' },
                { type: 'noun', german: 'Anmeldung', russian: 'регистрация', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Anmeldung ist hier.', examplePlural: '-' },
                { type: 'noun', german: 'Übernachtung', russian: 'ночевка', article: 'die', plural: 'Übernachtungen', pluralArticle: 'die', exampleSingular: 'Eine Übernachtung kostet 50 Euro.', examplePlural: '-' },
                { type: 'noun', german: 'Frühstück', russian: 'завтрак', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Mit Frühstück.', examplePlural: '-' },
                { type: 'noun', german: 'Halbpension', russian: 'полупансион', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Wir haben Halbpension.', examplePlural: '-' },
                { type: 'noun', german: 'Vollpension', russian: 'полный пансион', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Vollpension buchen.', examplePlural: '-' },
                { type: 'noun', german: 'Aufzug', russian: 'лифт', article: 'der', plural: 'Aufzüge', pluralArticle: 'die', exampleSingular: 'Der Aufzug ist da.', examplePlural: '-' },

                { type: 'verb', german: 'ausfüllen', russian: 'заполнять', conjugation: 'ich fülle aus', example: 'Bitte ausfüllen.' },
                { type: 'verb', german: 'unterschreiben', russian: 'подписывать', conjugation: 'ich unterschreibe', example: 'Hier unterschreiben.' },
                { type: 'verb', german: 'reservieren', russian: 'резервировать', conjugation: 'ich reserviere', example: 'Ich habe reserviert.' },
                { type: 'verb', german: 'buchen', russian: 'бронировать', conjugation: 'ich buche', example: 'Zimmer buchen.' },
                { type: 'verb', german: 'bezahlen', russian: 'оплачивать', conjugation: 'ich bezahle', example: 'Bar oder mit Karte bezahlen.' },
                { type: 'verb', german: 'übernachten', russian: 'ночевать', conjugation: 'ich übernachte', example: 'Wir übernachten hier.' },

                { type: 'adjective', german: 'frei', russian: 'свободный', comparative: '-', superlative: '-', example: 'Ist das Zimmer frei?' },
                { type: 'adjective', german: 'belegt', russian: 'занят', comparative: '-', superlative: '-', example: 'Alles belegt.' },
                { type: 'adjective', german: 'inklusive', russian: 'включено', comparative: '-', superlative: '-', example: 'Frühstück inklusive.' },
                { type: 'adjective', german: 'ruhig', russian: 'тихий/спокойный', comparative: 'ruhiger', superlative: 'am ruhigsten', example: 'Ein ruhiges Zimmer.' },
                { type: 'adjective', german: 'laut', russian: 'шумный', comparative: 'lauter', superlative: 'am lautesten', example: 'Zu laut hier.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-2-ex-1',
              type: 'multiple-choice',
              question: 'Как наиболее вежливо попросить номер в отеле?',
              options: ['Ich will ein Zimmer.', 'Ich habe ein Zimmer.', 'Ich hätte gern ein Zimmer.', 'Geben Sie mir ein Zimmer.'],
              correctAnswer: 'Ich hätte gern ein Zimmer.',
              explanation: '"Ich hätte gern" — стандартная вежливая форма для заказов и просьб.'
            },
            {
              id: 'a2-2-ex-2',
              type: 'fill-in-the-blank',
              question: '___ Sie mir helfen? (Не могли бы вы... / Können в вежливой форме)',
              correctAnswer: 'Könnten',
              explanation: 'Konjunktiv II (Könnten) делает просьбу вежливой.'
            }
          ]
        },
        {
          id: 'a2-3-korper',
          title: 'A2.3 Здоровье: Тело',
          explanation: `
            <div class="space-y-6">
               <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🩺</span> Притяжательные местоимения (Possessivpronomen)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Чтобы сказать "мой", "твой", "его", мы используем притяжательные местоимения. Они изменяются по падежам так же, как артикль <strong>ein</strong>.
                </p>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b">
                        <th class="py-2 font-semibold">Лицо</th>
                        <th class="py-2 font-semibold">Мужской (der)</th>
                        <th class="py-2 font-semibold">Средний (das)</th>
                        <th class="py-2 font-semibold">Женский (die) / Мн.ч.</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">ich (я)</td>
                        <td class="py-2 font-medium">mein</td>
                        <td class="py-2 font-medium">mein</td>
                        <td class="py-2 font-medium">mein<strong>e</strong></td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">du (ты)</td>
                        <td class="py-2 font-medium">dein</td>
                        <td class="py-2 font-medium">dein</td>
                        <td class="py-2 font-medium">dein<strong>e</strong></td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">er/es (он/оно)</td>
                        <td class="py-2 font-medium">sein</td>
                        <td class="py-2 font-medium">sein</td>
                        <td class="py-2 font-medium">sein<strong>e</strong></td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">sie (она)</td>
                        <td class="py-2 font-medium">ihr</td>
                        <td class="py-2 font-medium">ihr</td>
                        <td class="py-2 font-medium">ihr<strong>e</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                 <div class="mt-4 bg-muted/50 p-4 rounded-lg">
                    <p class="font-medium">Пример (Akkusativ - что болит?):</p>
                    <p>Ich habe Bauchschmerzen. (У меня болит живот)</p>
                    <p>Mein Kopf tut weh. (Моя голова болит - Nominativ)</p>
                 </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Части тела',
              words: [
                { type: 'noun', german: 'Körper', russian: 'тело', article: 'der', plural: 'Körper', pluralArticle: 'die', exampleSingular: 'Gesunder Körper.', examplePlural: '-' },
                { type: 'noun', german: 'Kopf', russian: 'голова', article: 'der', plural: 'Köpfe', pluralArticle: 'die', exampleSingular: 'Mein Kopf tut weh.', examplePlural: '-' },
                { type: 'noun', german: 'Haar', russian: 'волос/волосы', article: 'das', plural: 'Haare', pluralArticle: 'die', exampleSingular: 'Schönes Haar.', examplePlural: 'Lange Haare.' },
                { type: 'noun', german: 'Gesicht', russian: 'лицо', article: 'das', plural: 'Gesichter', pluralArticle: 'die', exampleSingular: 'Dein Gesicht.', examplePlural: '-' },
                { type: 'noun', german: 'Auge', russian: 'глаз', article: 'das', plural: 'Augen', pluralArticle: 'die', exampleSingular: 'Blaue Augen.', examplePlural: '-' },
                { type: 'noun', german: 'Ohr', russian: 'ухо', article: 'das', plural: 'Ohren', pluralArticle: 'die', exampleSingular: 'Linkes Ohr.', examplePlural: '-' },
                { type: 'noun', german: 'Nase', russian: 'нос', article: 'die', plural: 'Nasen', pluralArticle: 'die', exampleSingular: 'Die Nase läuft.', examplePlural: '-' },
                { type: 'noun', german: 'Mund', russian: 'рот', article: 'der', plural: 'Münder', pluralArticle: 'die', exampleSingular: 'Mund auf.', examplePlural: '-' },
                { type: 'noun', german: 'Zahn', russian: 'зуб', article: 'der', plural: 'Zähne', pluralArticle: 'die', exampleSingular: 'Kaputter Zahn.', examplePlural: 'Zähne putzen.' },
                { type: 'noun', german: 'Hals', russian: 'шея/горло', article: 'der', plural: 'Hälse', pluralArticle: 'die', exampleSingular: 'Halsweh.', examplePlural: '-' },
                { type: 'noun', german: 'Rücken', russian: 'спина', article: 'der', plural: 'Rücken', pluralArticle: 'die', exampleSingular: 'Mein Rücken schmerzt.', examplePlural: '-' },
                { type: 'noun', german: 'Brust', russian: 'грудь', article: 'die', plural: 'Brüste', pluralArticle: 'die', exampleSingular: 'Brustkorb.', examplePlural: '-' },
                { type: 'noun', german: 'Bauch', russian: 'живот', article: 'der', plural: 'Bäuche', pluralArticle: 'die', exampleSingular: 'Bauchweh haben.', examplePlural: '-' },
                { type: 'noun', german: 'Magen', russian: 'желудок', article: 'der', plural: 'Mägen', pluralArticle: 'die', exampleSingular: 'Mein Magen ist leer.', examplePlural: '-' },
                { type: 'noun', german: 'Arm', russian: 'рука (вся)', article: 'der', plural: 'Arme', pluralArticle: 'die', exampleSingular: 'Mein Arm.', examplePlural: '-' },
                { type: 'noun', german: 'Hand', russian: 'кисть руки', article: 'die', plural: 'Hände', pluralArticle: 'die', exampleSingular: 'Gib mir die Hand.', examplePlural: '-' },
                { type: 'noun', german: 'Finger', russian: 'палец (руки)', article: 'der', plural: 'Finger', pluralArticle: 'die', exampleSingular: 'Fünf Finger.', examplePlural: '-' },
                { type: 'noun', german: 'Bein', russian: 'нога', article: 'das', plural: 'Beine', pluralArticle: 'die', exampleSingular: 'Mein Bein ist gebrochen.', examplePlural: '-' },
                { type: 'noun', german: 'Knie', russian: 'колено', article: 'das', plural: 'Knie', pluralArticle: 'die', exampleSingular: 'Das Knie.', examplePlural: '-' },
                { type: 'noun', german: 'Fuß', russian: 'стопа', article: 'der', plural: 'Füße', pluralArticle: 'die', exampleSingular: 'Mein Fuß.', examplePlural: '-' },
                { type: 'noun', german: 'Zehe', russian: 'палец ноги', article: 'die', plural: 'Zehen', pluralArticle: 'die', exampleSingular: 'Große Zehe.', examplePlural: '-' },

                { type: 'verb', german: 'weh tun', russian: 'болеть (причинять боль)', conjugation: 'es tut weh', example: 'Es tut weh.' },
                { type: 'verb', german: 'schmerzen', russian: 'болеть', conjugation: 'es schmerzt', example: 'Der Fuß schmerzt.' },
                { type: 'verb', german: 'fühlen', russian: 'чувствовать', conjugation: 'ich fühle', example: 'Ich fühle mich gut.' },
                { type: 'verb', german: 'aussehen', russian: 'выглядеть', conjugation: 'du siehst aus', example: 'Du siehst gut aus.' },

                { type: 'adjective', german: 'dick', russian: 'толстый', comparative: 'dicker', superlative: 'am dicksten', example: 'Zu dick.' },
                { type: 'adjective', german: 'dünn', russian: 'тонкий/худой', comparative: 'dünner', superlative: 'am dünnsten', example: 'Er ist dünn.' },
                { type: 'adjective', german: 'groß', russian: 'большой/высокий', comparative: 'größer', superlative: 'am größten', example: 'Er ist groß.' },
                { type: 'adjective', german: 'klein', russian: 'маленький', comparative: 'kleiner', superlative: 'am kleinsten', example: 'Sie ist klein.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-3-ex-1',
              type: 'multiple-choice',
              question: 'Выберите правильный вариант: "Моя голова болит"',
              options: ['Mein Kopf tut weh', 'Meine Kopf tut weh', 'Meinen Kopf tut weh', 'Meinem Kopf tut weh'],
              correctAnswer: 'Mein Kopf tut weh',
              explanation: 'Kopf — мужского рода (der), поэтому в Nominativ окончание не нужно.'
            },
            {
              id: 'a2-3-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich habe ___schmerzen. (У меня болит живот)',
              correctAnswer: 'Bauch',
              explanation: 'Bauch (живот) + Schmerzen = Bauchschmerzen.'
            }
          ]
        },
        {
          id: 'a2-4-arzt',
          title: 'A2.4 Здоровье: У врача',
          explanation: `
            <div class="space-y-8 font-sans">
              
              <!-- 1. Context -->
              <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                  <span>💊</span> Императив (Повелительное наклонение)
                </h2>
                <p class="text-lg leading-relaxed text-foreground">
                  Как сказать "Сядь!", "Откройте рот!" или "Не курите!"? Это форма приказа или совета.<br>
                  В немецком императив меняется в зависимости от того, к кому мы обращаемся: к другу (du), к группе друзей (ihr) или к уважаемому человеку (Sie).
                </p>
              </div>

              <!-- 2. Visual Rule: The Triangle of Command -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <!-- DU -->
                <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-2 opacity-10 text-4xl">🫵</div>
                  <h3 class="font-bold text-lg mb-1 text-primary">du (Ты)</h3>
                  <p class="text-sm text-muted-foreground mb-3">Для друзей и детей</p>
                  <div class="bg-primary/10 w-full p-2 rounded-lg mb-2 font-mono">
                    <span class="line-through text-red-400">du</span> mach<span class="line-through text-red-400">st</span> -> <strong>Mach!</strong>
                  </div>
                  <p class="text-xs">Убираем <strong>du</strong> и <strong>-st</strong>.</p>
                </div>

                <!-- IHR -->
                <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-2 opacity-10 text-4xl">👨‍👩‍👧</div>
                  <h3 class="font-bold text-lg mb-1 text-primary">ihr (Вы - группа)</h3>
                  <p class="text-sm text-muted-foreground mb-3">Для двух и более друзей</p>
                  <div class="bg-primary/10 w-full p-2 rounded-lg mb-2 font-mono">
                    <span class="line-through text-red-400">ihr</span> macht -> <strong>Macht!</strong>
                  </div>
                  <p class="text-xs">Просто убираем <strong>ihr</strong>.</p>
                </div>

                <!-- SIE -->
                <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-2 opacity-10 text-4xl">🎩</div>
                  <h3 class="font-bold text-lg mb-1 text-primary">Sie (Вы - уваж.)</h3>
                  <p class="text-sm text-muted-foreground mb-3">Для врача, начальника</p>
                  <div class="bg-primary/10 w-full p-2 rounded-lg mb-2 font-mono">
                    Sie machen -> <strong>Machen Sie!</strong>
                  </div>
                  <p class="text-xs">Меняем местами слова.</p>
                </div>

              </div>

              <!-- 3. Exceptions (Sein) -->
              <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 flex items-start gap-4">
                <div class="text-2xl mt-1">⚠️</div>
                <div>
                  <h3 class="font-bold text-lg text-red-800 dark:text-red-400 mb-2">Исключение: sein (быть)</h3>
                  <p class="text-sm text-red-700 dark:text-red-300 mb-2">Глагол "быть" всегда ведет себя странно.</p>
                  <div class="grid grid-cols-3 gap-2 text-center text-sm font-bold font-mono">
                    <div class="bg-white/50 p-1 rounded">Sei! (du)</div>
                    <div class="bg-white/50 p-1 rounded">Seid! (ihr)</div>
                    <div class="bg-white/50 p-1 rounded">Seien Sie!</div>
                  </div>
                </div>
              </div>

              <!-- 4. Interactive Examples Table -->
              <div class="overflow-hidden rounded-xl border shadow-sm">
                <table class="w-full text-sm">
                  <thead class="bg-muted text-muted-foreground">
                    <tr>
                      <th class="p-3 text-left">Глагол</th>
                      <th class="p-3 text-left">Приказ (du)</th>
                      <th class="p-3 text-left">Перевод</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr class="bg-card hover:bg-muted/50 transition-colors">
                      <td class="p-3 font-medium">kommen</td>
                      <td class="p-3 text-primary font-bold">Komm!</td>
                      <td class="p-3 text-muted-foreground">Приходи!</td>
                    </tr>
                    <tr class="bg-card hover:bg-muted/50 transition-colors">
                      <td class="p-3 font-medium">lesen (e->ie)</td>
                      <td class="p-3 text-primary font-bold">Lies!</td>
                      <td class="p-3 text-muted-foreground">Читай! (смена корня!)</td>
                    </tr>
                    <tr class="bg-card hover:bg-muted/50 transition-colors">
                      <td class="p-3 font-medium">fahren (a->ä)</td>
                      <td class="p-3 text-primary font-bold">Fahr!</td>
                      <td class="p-3 text-muted-foreground">Езжай! (нет умляута!)</td>
                    </tr>
                     <tr class="bg-card hover:bg-muted/50 transition-colors">
                      <td class="p-3 font-medium">nehmen (e->i)</td>
                      <td class="p-3 text-primary font-bold">Nimm!</td>
                      <td class="p-3 text-muted-foreground">Бери! (смена корня!)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 5. Pro Tip -->
              <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800">
                 <h4 class="font-bold text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-2">
                    <span>💡</span> Pro-Tip: "Mal" и "Bitte"
                 </h4>
                 <p class="text-sm text-amber-700 dark:text-amber-300">
                    Императив может звучать грубо. Добавьте слово <strong>bitte</strong> (пожалуйста) или частицу <strong>mal</strong> (ка), чтобы звучать мягче/дружелюбнее. <br>
                    <em>"Sag mal..." (Скажи-ка...)</em>
                 </p>
              </div>

            </div>
          `,
          vocabulary: [
            {
              theme: 'Лечение и Аптека',
              words: [
                { type: 'noun', german: 'Arzt', russian: 'врач', article: 'der', plural: 'Ärzte', pluralArticle: 'die', exampleSingular: 'Der Arzt hilft.', examplePlural: '-' },
                { type: 'noun', german: 'Ärztin', russian: 'женщина-врач', article: 'die', plural: 'Ärztinnen', pluralArticle: 'die', exampleSingular: 'Die Ärztin.', examplePlural: '-' },
                { type: 'noun', german: 'Patient', russian: 'пациент', article: 'der', plural: 'Patienten', pluralArticle: 'die', exampleSingular: 'Der Patient wartet.', examplePlural: '-' },
                { type: 'noun', german: 'Praxis', russian: 'врачебная практика', article: 'die', plural: 'Praxen', pluralArticle: 'die', exampleSingular: 'In der Praxis.', examplePlural: '-' },
                { type: 'noun', german: 'Krankenhaus', russian: 'больница', article: 'das', plural: 'Krankenhäuser', pluralArticle: 'die', exampleSingular: 'Ins Krankenhaus müssen.', examplePlural: '-' },
                { type: 'noun', german: 'Termin', russian: 'прием/запись', article: 'der', plural: 'Termine', pluralArticle: 'die', exampleSingular: 'Einen Termin vereinbaren.', examplePlural: '-' },
                { type: 'noun', german: 'Krankenversicherung', russian: 'медстраховка', article: 'die', plural: 'Krankenversicherungen', pluralArticle: 'die', exampleSingular: 'Karte der Krankenversicherung.', examplePlural: '-' },

                { type: 'noun', german: 'Krankheit', russian: 'болезнь', article: 'die', plural: 'Krankheiten', pluralArticle: 'die', exampleSingular: 'Schlimme Krankheit.', examplePlural: '-' },
                { type: 'noun', german: 'Grippe', russian: 'грипп', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Grippe.', examplePlural: '-' },
                { type: 'noun', german: 'Erkältung', russian: 'простуда', article: 'die', plural: 'Erkältungen', pluralArticle: 'die', exampleSingular: 'Eine starke Erkältung.', examplePlural: '-' },
                { type: 'noun', german: 'Fieber', russian: 'температура/жар', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Hohes Fieber haben.', examplePlural: '-' },
                { type: 'noun', german: 'Husten', russian: 'кашель', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Husten haben.', examplePlural: '-' },
                { type: 'noun', german: 'Schnupfen', russian: 'насморк', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Schnupfen haben.', examplePlural: '-' },
                { type: 'noun', german: 'Schmerz', russian: 'боль', article: 'der', plural: 'Schmerzen', pluralArticle: 'die', exampleSingular: 'Starker Schmerz.', examplePlural: 'Kopfschmerzen (мн.ч).' },

                { type: 'noun', german: 'Apotheke', russian: 'аптека', article: 'die', plural: 'Apotheken', pluralArticle: 'die', exampleSingular: 'Zur Apotheke gehen.', examplePlural: '-' },
                { type: 'noun', german: 'Medikament', russian: 'лекарство', article: 'das', plural: 'Medikamente', pluralArticle: 'die', exampleSingular: 'Medikamente einnehmen.', examplePlural: '-' },
                { type: 'noun', german: 'Tablette', russian: 'таблетка', article: 'die', plural: 'Tabletten', pluralArticle: 'die', exampleSingular: 'Tablette nehmen.', examplePlural: '-' },
                { type: 'noun', german: 'Salbe', russian: 'мазь', article: 'die', plural: 'Salben', pluralArticle: 'die', exampleSingular: 'Salbe auftragen.', examplePlural: '-' },
                { type: 'noun', german: 'Rezept', russian: 'рецепт (медицинский)', article: 'das', plural: 'Rezepte', pluralArticle: 'die', exampleSingular: 'Das Rezept einlösen.', examplePlural: '-' },

                { type: 'verb', german: 'untersuchen', russian: 'осматривать', conjugation: 'er untersucht', example: 'Der Arzt untersucht mich.' },
                { type: 'verb', german: 'verschreiben', russian: 'прописывать', conjugation: 'er verschreibt', example: 'Rezept verschreiben.' },
                { type: 'verb', german: 'krankmelden', russian: 'сообщить о болезни', conjugation: 'er meldet sich krank', example: 'Sich krankmelden.' },
                { type: 'verb', german: 'fehlen', russian: 'не хватать/болеть', conjugation: 'es fehlt', example: 'Was fehlt Ihnen?' },
                { type: 'verb', german: 'einnehmen', russian: 'принимать (лекарство)', conjugation: 'ich nehme ein', example: 'Tabletten einnehmen.' },

                { type: 'adjective', german: 'krank', russian: 'больной', comparative: 'kränker', superlative: 'am kränksten', example: 'Ich bin krank.' },
                { type: 'adjective', german: 'gesund', russian: 'здоровый', comparative: 'gesünder', superlative: 'am gesündesten', example: 'Er ist gesund.' },
                { type: 'adjective', german: 'schlimm', russian: 'плохой/серьезный', comparative: 'schlimmer', superlative: 'am schlimmsten', example: 'Es ist nicht so schlimm.' },
                { type: 'other', german: 'Gute Besserung', russian: 'Выздоравливайте!', example: 'Gute Besserung!' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-4-ex-1',
              type: 'multiple-choice',
              question: 'Как врач скажет пациенту (на "Вы"): "Принимайте эти таблетки"?',
              options: ['Nehmen Sie diese Tabletten', 'Nimm diese Tabletten', 'Nehmt diese Tabletten', 'Du nimmst Tabletten'],
              correctAnswer: 'Nehmen Sie diese Tabletten',
              explanation: 'Для вежливой формы (Sie) используется инфинитив + местоимение Sie.'
            },
            {
              id: 'a2-4-ex-2',
              type: 'fill-in-the-blank',
              question: '___ ruhig! (Будь тих! - обращение к другу, глагол sein)',
              correctAnswer: 'Sei',
              explanation: 'Sei — форма императива для du от глагола sein.'
            }
          ]
        },
        {
          id: 'a2-5-wohnen',
          title: 'A2.5 Жилье: Обстановка',
          explanation: `
            <div class="space-y-8 font-sans">
              
              <!-- 1. Context -->
              <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                  <span>🏠</span> Окончания Прилагательных (Часть 1)
                </h2>
                <p class="text-lg leading-relaxed text-foreground">
                  Это одна из самых "пугающих" тем, но мы сделаем ее простой. <br>
                  Если перед прилагательным стоит <strong>определенный артикль (der, die, das)</strong>, то прилагательное как бы "отдыхает" и берет самые простые окончания.
                </p>
              </div>

              <!-- 2. Visual Table (Nominativ) -->
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                 <h3 class="font-bold text-xl mb-4 text-center">Правило "Светофор" (Nominativ)</h3>
                 
                 <div class="grid grid-cols-3 gap-4 text-center">
                    
                    <!-- Masculine -->
                    <div class="space-y-2">
                       <div class="text-blue-600 font-bold text-lg">DER 🔵</div>
                       <div class="bg-muted p-2 rounded-lg border border-blue-200">
                          der neu<span class="text-primary font-black text-xl">-e</span> Tisch
                       </div>
                    </div>

                    <!-- Feminine -->
                     <div class="space-y-2">
                       <div class="text-red-500 font-bold text-lg">DIE 🔴</div>
                       <div class="bg-muted p-2 rounded-lg border border-red-200">
                          die neu<span class="text-primary font-black text-xl">-e</span> Lampe
                       </div>
                    </div>

                    <!-- Neuter -->
                     <div class="space-y-2">
                       <div class="text-green-600 font-bold text-lg">DAS 🟢</div>
                       <div class="bg-muted p-2 rounded-lg border border-green-200">
                          das neu<span class="text-primary font-black text-xl">-e</span> Bett
                       </div>
                    </div>

                 </div>

                 <div class="mt-6 text-center text-muted-foreground italic">
                    Видите? Везде просто <strong>-e</strong>!
                 </div>
              </div>

              <!-- 3. The Shift (Akkusativ) -->
              <div class="bg-card p-6 rounded-xl border-l-4 border-purple-500 shadow-sm mt-4">
                 <h3 class="font-bold text-xl mb-2 flex items-center gap-2">
                    <span class="text-purple-500">⚡</span> Что меняется в Akkusativ? (Вижу кого/что?)
                 </h3>
                 <p class="mb-4">Меняется <strong>только мужской род</strong>. Остальные спят.</p>
                 
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl border border-purple-200">
                       <div class="font-bold text-purple-700 dark:text-purple-300 mb-1">Maskulin (DER -> DEN)</div>
                       <div class="text-lg">Ich sehe <strong>den</strong> neu<span class="bg-purple-600 text-white px-1 rounded font-bold">-en</span> Tisch.</div>
                       <p class="text-xs text-muted-foreground mt-2">Арктикль изменился (den) -> прилагательное тоже напряглось (-en).</p>
                    </div>
                    
                    <div class="bg-muted/50 p-4 rounded-xl flex items-center justify-center text-muted-foreground text-center">
                        <div>
                           <p>Die -> die neue (-e)</p>
                           <p>Das -> das neue (-e)</p>
                           <p class="text-xs mt-1">(Никаких изменений!)</p>
                        </div>
                    </div>
                 </div>
              </div>

              <!-- 4. Pro Tip Summary -->
              <div class="flex items-center gap-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100">
                 <div class="text-3xl">🧩</div>
                 <div>
                    <h4 class="font-bold text-green-800 dark:text-green-400">Алгоритм для A2:</h4>
                    <p class="text-sm text-green-700 dark:text-green-300">
                       1. Видишь <strong>der/die/das</strong>? Ставь <strong>-e</strong>.<br>
                       2. Видишь <strong>den</strong>? Ставь <strong>-en</strong>.<br>
                       (Это работает в 90% случаев на этом уровне!)
                    </p>
                 </div>
              </div>

            </div>
          `,
          vocabulary: [
            {
              theme: 'Мебель и Интерьер',
              words: [
                { type: 'noun', german: 'Möbel', russian: 'мебель', article: 'die', plural: 'Möbel', pluralArticle: 'die', exampleSingular: '(мн.ч)', examplePlural: 'Neue Möbel.' },
                { type: 'noun', german: 'Wohnzimmer', russian: 'гостиная', article: 'das', plural: 'Wohnzimmer', pluralArticle: 'die', exampleSingular: 'Im Wohnzimmer.', examplePlural: '-' },
                { type: 'noun', german: 'Schlafzimmer', russian: 'спальня', article: 'das', plural: 'Schlafzimmer', pluralArticle: 'die', exampleSingular: 'Im Schlafzimmer.', examplePlural: '-' },
                { type: 'noun', german: 'Küche', russian: 'кухня', article: 'die', plural: 'Küchen', pluralArticle: 'die', exampleSingular: 'In der Küche.', examplePlural: '-' },
                { type: 'noun', german: 'Badezimmer', russian: 'ванная', article: 'das', plural: 'Badezimmer', pluralArticle: 'die', exampleSingular: 'Im Bad.', examplePlural: '-' },
                { type: 'noun', german: 'Flur', russian: 'коридор', article: 'der', plural: 'Flure', pluralArticle: 'die', exampleSingular: 'Im Flur.', examplePlural: '-' },

                { type: 'noun', german: 'Tisch', russian: 'стол', article: 'der', plural: 'Tische', pluralArticle: 'die', exampleSingular: 'Der Tisch ist rund.', examplePlural: '-' },
                { type: 'noun', german: 'Schreibtisch', russian: 'письменный стол', article: 'der', plural: 'Schreibtische', pluralArticle: 'die', exampleSingular: 'Am Schreibtisch arbeiten.', examplePlural: '-' },
                { type: 'noun', german: 'Stuhl', russian: 'стул', article: 'der', plural: 'Stühle', pluralArticle: 'die', exampleSingular: 'Der Stuhl ist bequem.', examplePlural: '-' },
                { type: 'noun', german: 'Sessel', russian: 'кресло', article: 'der', plural: 'Sessel', pluralArticle: 'die', exampleSingular: 'Im Sessel sitzen.', examplePlural: '-' },
                { type: 'noun', german: 'Sofa', russian: 'диван', article: 'das', plural: 'Sofas', pluralArticle: 'die', exampleSingular: 'Das Sofa ist neu.', examplePlural: '-' },
                { type: 'noun', german: 'Bett', russian: 'кровать', article: 'das', plural: 'Betten', pluralArticle: 'die', exampleSingular: 'Im Bett liegen.', examplePlural: '-' },

                { type: 'noun', german: 'Schrank', russian: 'шкаф', article: 'der', plural: 'Schränke', pluralArticle: 'die', exampleSingular: 'Der Schrank ist groß.', examplePlural: '-' },
                { type: 'noun', german: 'Regal', russian: 'полка/стеллаж', article: 'das', plural: 'Regale', pluralArticle: 'die', exampleSingular: 'Bücher im Regal.', examplePlural: '-' },
                { type: 'noun', german: 'Kommode', russian: 'комод', article: 'die', plural: 'Kommoden', pluralArticle: 'die', exampleSingular: 'Alte Kommode.', examplePlural: '-' },

                { type: 'noun', german: 'Lampe', russian: 'лампа', article: 'die', plural: 'Lampen', pluralArticle: 'die', exampleSingular: 'Die Lampe ist hell.', examplePlural: '-' },
                { type: 'noun', german: 'Licht', russian: 'свет', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Mach das Licht an.', examplePlural: '-' },
                { type: 'noun', german: 'Teppich', russian: 'ковер', article: 'der', plural: 'Teppiche', pluralArticle: 'die', exampleSingular: 'Weicher Teppich.', examplePlural: '-' },
                { type: 'noun', german: 'Vorhang', russian: 'занавеска', article: 'der', plural: 'Vorhänge', pluralArticle: 'die', exampleSingular: 'Vorhang zuziehen.', examplePlural: '-' },
                { type: 'noun', german: 'Bild', russian: 'картина', article: 'das', plural: 'Bilder', pluralArticle: 'die', exampleSingular: 'Schönes Bild.', examplePlural: '-' },

                { type: 'verb', german: 'einrichten', russian: 'обставлять', conjugation: 'ich richte ein', example: 'Zimmer einrichten.' },
                { type: 'verb', german: 'stellen', russian: 'ставить', conjugation: 'ich stelle', example: 'Auf den Tisch stellen.' },
                { type: 'verb', german: 'legen', russian: 'класть', conjugation: 'ich lege', example: 'Ins Bett legen.' },
                { type: 'verb', german: 'hängen', russian: 'вешать/висеть', conjugation: 'ich hänge', example: 'Das Bild hängt.' },

                { type: 'adjective', german: 'bequem', russian: 'удобный', comparative: 'bequemer', superlative: 'am bequemsten', example: 'Sehr bequem.' },
                { type: 'adjective', german: 'unbequem', russian: 'неудобный', comparative: '-', superlative: '-', example: 'Zu unbequem.' },
                { type: 'adjective', german: 'hell', russian: 'светлый', comparative: 'heller', superlative: 'am hellsten', example: 'Helles Zimmer.' },
                { type: 'adjective', german: 'dunkel', russian: 'темный', comparative: 'dunkler', superlative: 'am dunkelsten', example: 'Dunkles Zimmer.' },
                { type: 'adjective', german: 'gemütlich', russian: 'уютный', comparative: 'gemütlicher', superlative: 'am gemütlichsten', example: 'Sehr gemütlich.' },
                { type: 'adjective', german: 'modern', russian: 'современный', comparative: 'moderner', superlative: 'am modernsten', example: 'Moderne Möbel.' },
                { type: 'adjective', german: 'altmodisch', russian: 'старомодный', comparative: '-', superlative: '-', example: 'Etwas altmodisch.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-5-ex-1',
              type: 'multiple-choice',
              question: 'Какое окончание получит прилагательное: "Der neu__ Tisch" (Новый стол)',
              options: ['-en', '-e', '-er', '-es'],
              correctAnswer: '-e',
              explanation: 'После определенного артикля в Nominativ прилагательное получает окончание -e.'
            },
            {
              id: 'a2-5-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich kaufe den neu___ Tisch. (Akkusativ)',
              correctAnswer: 'en',
              explanation: 'В Akkusativ мужского рода после определенного артикля прилагательное всегда получает окончание -en.'
            }
          ]
        },
        {
          id: 'a2-6-mieten',
          title: 'A2.6 Жилье: Аренда',
          explanation: `
          <div class="space-y-8 font-sans">
            
            <!-- 1. Context & Analogy -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                <span>🤔</span> Зачем нужны модальные глаголы?
              </h2>
              <p class="text-lg leading-relaxed text-foreground">
                Модальные глаголы меняют <em>настроение</em> предложения. В них есть разница между "я иду" (факт) и "я <strong>хочу</strong> идти" (желание) или "я <strong>должен</strong> идти" (необходимость).
              </p>
            </div>

            <!-- 2. The Formula (Visual Builder) -->
            <div class="space-y-4">
              <h3 class="font-bold text-xl text-foreground">🏗️ Как это строится?</h3>
              
              <div class="bg-card p-4 rounded-lg border shadow-sm flex flex-col md:flex-row items-center gap-2 justify-center text-lg">
                <div class="bg-muted px-4 py-2 rounded-md font-bold">Ich</div>
                <span class="text-muted-foreground">+</span>
                <div class="bg-primary/20 px-4 py-2 rounded-md font-bold text-primary border border-primary/20">muss</div>
                <span class="text-muted-foreground">+</span>
                <div class="bg-muted px-4 py-2 rounded-md italic">... Miete ...</div>
                <span class="text-muted-foreground">+</span>
                <div class="bg-accent/20 px-4 py-2 rounded-md font-bold text-accent border border-accent/20">zahlen</div>
              </div>
              <p class="text-center text-sm text-muted-foreground">Модальный глагол на <strong>2-м месте</strong>, основной глагол (инфинитив) — в <strong>самом конце</strong>.</p>
            </div>

            <!-- 3. Comparison Table -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Dürfen -->
              <div class="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div class="bg-green-100 dark:bg-green-900/30 p-4 border-b border-green-200 dark:border-green-800">
                  <h3 class="font-bold text-green-800 dark:text-green-300 text-lg flex items-center gap-2">
                    ✅ DÜRFEN (Разрешение)
                  </h3>
                  <p class="text-sm text-green-700 dark:text-green-400">"Можно", "разрешено"</p>
                </div>
                <div class="p-4 bg-card space-y-2 text-sm">
                  <div class="flex justify-between border-b pb-1"><span>ich</span> <span class="font-bold">darf</span></div>
                  <div class="flex justify-between border-b pb-1"><span>du</span> <span class="font-bold">darfst</span></div>
                  <div class="flex justify-between border-b pb-1"><span>er/sie/es</span> <span class="font-bold">darf</span></div>
                  <div class="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100">
                    <p class="font-bold text-red-600">⛔ Nicht dürfen = ЗАПРЕТ</p>
                    <p class="italic">"Hier darf man <strong>nicht</strong> rauchen."</p>
                  </div>
                </div>
              </div>

              <!-- Müssen -->
              <div class="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div class="bg-amber-100 dark:bg-amber-900/30 p-4 border-b border-amber-200 dark:border-amber-800">
                  <h3 class="font-bold text-amber-800 dark:text-amber-300 text-lg flex items-center gap-2">
                    ⚠️ MÜSSEN (Должен)
                  </h3>
                  <p class="text-sm text-amber-700 dark:text-amber-400">"Нужно", "обязан"</p>
                </div>
                <div class="p-4 bg-card space-y-2 text-sm">
                  <div class="flex justify-between border-b pb-1"><span>ich</span> <span class="font-bold">muss</span></div>
                  <div class="flex justify-between border-b pb-1"><span>du</span> <span class="font-bold">musst</span></div>
                  <div class="flex justify-between border-b pb-1"><span>er/sie/es</span> <span class="font-bold">muss</span></div>
                  <div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100">
                    <p class="font-bold text-amber-600">☝️ Необходимость</p>
                    <p class="italic">"Ich muss arbeiten." (У меня нет выбора)</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. Pro Tip -->
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
              <span class="text-2xl">💡</span>
              <div>
                <h4 class="font-bold text-yellow-800 dark:text-yellow-400 text-sm">Лайфхак для запоминания:</h4>
                <p class="text-sm text-yellow-900 dark:text-yellow-300">
                  В единственном числе (ich, er/sie/es) <strong>корневая гласная меняется</strong> (m<strong>u</strong>ss -> m<strong>u</strong>ss, d<strong>ü</strong>rf -> d<strong>a</strong>rf). Но во множественном числе она возвращается назад!
                </p>
              </div>
            </div>

          </div>
        `,
          vocabulary: [
            {
              theme: 'Аренда жилья',
              words: [
                { type: 'noun', german: 'Wohnung', russian: 'квартира', article: 'die', plural: 'Wohnungen', pluralArticle: 'die', exampleSingular: 'Schöne Wohnung.', examplePlural: '-' },
                { type: 'noun', german: 'Haus', russian: 'дом', article: 'das', plural: 'Häuser', pluralArticle: 'die', exampleSingular: 'Das Haus.', examplePlural: '-' },
                { type: 'noun', german: 'Mehrfamilienhaus', russian: 'многоквартирный дом', article: 'das', plural: 'Mehrfamilienhäuser', pluralArticle: 'die', exampleSingular: 'Ich wohne im Mehrfamilienhaus.', examplePlural: '-' },

                { type: 'noun', german: 'Miete', russian: 'арендная плата', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Miete ist hoch.', examplePlural: '-' },
                { type: 'noun', german: 'Kaltmiete', russian: 'аренда без комуслуг', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Kaltmiete plus Nebenkosten.', examplePlural: '-' },
                { type: 'noun', german: 'Nebenkosten', russian: 'коммунальные услуги', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: '(мн.ч) Nebenkosten bezahlen.', examplePlural: '(Strom, Wasser).' },
                { type: 'noun', german: 'Kaution', russian: 'залог', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: '3 Monate Kaution.', examplePlural: '-' },

                { type: 'noun', german: 'Vermieter', russian: 'арендодатель (хозяин)', article: 'der', plural: 'Vermieter', pluralArticle: 'die', exampleSingular: 'Der Vermieter ist nett.', examplePlural: '-' },
                { type: 'noun', german: 'Mieter', russian: 'арендатор (жилец)', article: 'der', plural: 'Mieter', pluralArticle: 'die', exampleSingular: 'Wir suchen einen Mieter.', examplePlural: '-' },
                { type: 'noun', german: 'Nachbar', russian: 'сосед', article: 'der', plural: 'Nachbarn', pluralArticle: 'die', exampleSingular: 'Der Nachbar ist laut.', examplePlural: '-' },
                { type: 'noun', german: 'Hausmeister', russian: 'управдом/смотритель', article: 'der', plural: 'Hausmeister', pluralArticle: 'die', exampleSingular: 'Fragen Sie den Hausmeister.', examplePlural: '-' },

                { type: 'noun', german: 'Vertrag', russian: 'договор', article: 'der', plural: 'Verträge', pluralArticle: 'die', exampleSingular: 'Mietvertrag unterschreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Quadratmeter', russian: 'кв. метр', article: 'der', plural: 'Quadratmeter', pluralArticle: 'die', exampleSingular: '50 Quadratmeter.', examplePlural: '-' },
                { type: 'noun', german: 'Erdgeschoss', russian: 'первый этаж', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Im Erdgeschoss.', examplePlural: '-' },
                { type: 'noun', german: 'Dachgeschoss', russian: 'мансарда/чердак', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Im Dachgeschoss.', examplePlural: '-' },

                { type: 'verb', german: 'suchen', russian: 'искать', conjugation: 'ich suche', example: 'Wohnung suchen.' },
                { type: 'verb', german: 'finden', russian: 'находить', conjugation: 'ich finde', example: 'Wohnung finden.' },
                { type: 'verb', german: 'besichtigen', russian: 'осматривать (кв)', conjugation: 'ich besichtige', example: 'Wohnung besichtigen.' },
                { type: 'verb', german: 'mieten', russian: 'снимать/арендовать', conjugation: 'ich miete', example: 'Wohnung mieten.' },
                { type: 'verb', german: 'vermieten', russian: 'сдавать в аренду', conjugation: 'er vermietet', example: 'Zimmer zu vermieten.' },
                { type: 'verb', german: 'umziehen', russian: 'переезжать', conjugation: 'ich ziehe um', example: 'Wir ziehen um.' },
                { type: 'verb', german: 'einziehen', russian: 'въезжать', conjugation: 'ich ziehe ein', example: 'Morgen einziehen.' },
                { type: 'verb', german: 'ausziehen', russian: 'выезжать', conjugation: 'ich ziehe aus', example: 'Bald ausziehen.' },
                { type: 'verb', german: 'renovieren', russian: 'делать ремонт', conjugation: 'ich renoviere', example: 'Wir müssen renovieren.' },

                { type: 'adjective', german: 'teuer', russian: 'дорогой', comparative: 'teurer', superlative: 'am teuersten', example: 'Zu teuer.' },
                { type: 'adjective', german: 'billig', russian: 'дешевый', comparative: 'billiger', superlative: 'am billigsten', example: 'Sehr billig.' },
                { type: 'adjective', german: 'günstig', russian: 'выгодный', comparative: 'günstiger', superlative: 'am günstigsten', example: 'Günstig.' },
                { type: 'adjective', german: 'zentral', russian: 'центральный', comparative: '-', superlative: '-', example: 'Zentrale Lage.' },
                { type: 'adjective', german: 'möbliert', russian: 'меблированный', comparative: '-', superlative: '-', example: 'Möbliertes Zimmer.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-6-ex-1',
              type: 'multiple-choice',
              question: 'Какой модальный глагол выражает запрет (Man ___ hier nicht rauchen)?',
              options: ['muss', 'soll', 'darf', 'will'],
              correctAnswer: 'darf',
              explanation: 'Dürfen с отрицанием выражает запрет.'
            },
            {
              id: 'a2-6-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich ___ Miete zahlen. (Я должен/вынужден платить аренду)',
              correctAnswer: 'muss',
              explanation: 'Глагол müssen выражает объективную необходимость.'
            }
          ]
        },
        {
          id: 'a2-7-routine',
          title: 'A2.7 Работа: Рутина',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🔄</span> Возвратные глаголы (Reflexive Verben)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Действия, направленные "на себя" (умывать<strong>ся</strong>, одевать<strong>ся</strong>). В немецком используется частица <strong>sich</strong>.
                </p>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b">
                        <th class="py-2 font-semibold">Лицо</th>
                        <th class="py-2 font-semibold">Akkusativ (sich)</th>
                        <th class="py-2 font-semibold">Пример</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">ich</td>
                        <td class="py-2 font-medium text-primary">mich</td>
                        <td class="py-2 italic">Ich wasche <strong>mich</strong>.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">du</td>
                        <td class="py-2 font-medium text-primary">dich</td>
                        <td class="py-2 italic">Du wäschst <strong>dich</strong>.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">er/sie/es</td>
                        <td class="py-2 font-medium text-primary">sich</td>
                        <td class="py-2 italic">Er wäscht <strong>sich</strong>.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">wir</td>
                        <td class="py-2 font-medium text-primary">uns</td>
                        <td class="py-2 italic">Wir waschen <strong>uns</strong>.</td>
                      </tr>
                      <tr class="border-b border-muted/50">
                        <td class="py-2 text-muted-foreground">ihr</td>
                        <td class="py-2 font-medium text-primary">euch</td>
                        <td class="py-2 italic">Ihr wascht <strong>euch</strong>.</td>
                      </tr>
                        <tr>
                        <td class="py-2 text-muted-foreground">Sie/sie (pl)</td>
                        <td class="py-2 font-medium text-primary">sich</td>
                        <td class="py-2 italic">Sie waschen <strong>sich</strong>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Распорядок дня',
              words: [
                { type: 'noun', german: 'Alltag', russian: 'будни', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Der Alltag.', examplePlural: '-' },
                { type: 'noun', german: 'Morgen', russian: 'утро', article: 'der', plural: 'Morgen', pluralArticle: 'die', exampleSingular: 'Guten Morgen.', examplePlural: '-' },
                { type: 'noun', german: 'Mittag', russian: 'полдень', article: 'der', plural: 'Mittage', pluralArticle: 'die', exampleSingular: 'Am Mittag.', examplePlural: '-' },
                { type: 'noun', german: 'Abend', russian: 'вечер', article: 'der', plural: 'Abende', pluralArticle: 'die', exampleSingular: 'Guten Abend.', examplePlural: '-' },
                { type: 'noun', german: 'Nacht', russian: 'ночь', article: 'die', plural: 'Nächte', pluralArticle: 'die', exampleSingular: 'Gute Nacht.', examplePlural: '-' },

                { type: 'noun', german: 'Wecker', russian: 'будильник', article: 'der', plural: 'Wecker', pluralArticle: 'die', exampleSingular: 'Der Wecker klingelt.', examplePlural: '-' },
                { type: 'noun', german: 'Pause', russian: 'перерыв', article: 'die', plural: 'Pausen', pluralArticle: 'die', exampleSingular: 'Eine Pause machen.', examplePlural: '-' },
                { type: 'noun', german: 'Mittagspause', russian: 'обеденный перерыв', article: 'die', plural: 'Mittagspausen', pluralArticle: 'die', exampleSingular: 'Lange Mittagspause.', examplePlural: '-' },
                { type: 'noun', german: 'Feierabend', russian: 'конец рабочего дня', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Endlich Feierabend!', examplePlural: '-' },

                { type: 'verb', german: 'aufstehen', russian: 'вставать', conjugation: 'ich stehe auf', example: 'Ich stehe früh auf.' },
                { type: 'verb', german: 'aufwachen', russian: 'просыпаться', conjugation: 'ich wache auf', example: 'Ich wache auf.' },
                { type: 'verb', german: 'sich waschen', russian: 'мыться/умываться', conjugation: 'ich wasche mich', example: 'Ich wasche mich.' },
                { type: 'verb', german: 'duschen', russian: 'принимать душ', conjugation: 'ich dusche', example: 'Ich dusche morgens.' },
                { type: 'verb', german: 'sich anziehen', russian: 'одеваться', conjugation: 'ich ziehe mich an', example: 'Ich ziehe mich schnell an.' },
                { type: 'verb', german: 'sich kämmen', russian: 'причесываться', conjugation: 'ich kämme mich', example: 'Ich kämme mich.' },
                { type: 'verb', german: 'sich beeilen', russian: 'торопиться', conjugation: 'ich beeile mich', example: 'Ich muss mich beeilen.' },

                { type: 'verb', german: 'frühstücken', russian: 'завтракать', conjugation: 'ich frühstücke', example: 'Ich frühstücke.' },
                { type: 'verb', german: 'losgehen', russian: 'выходить (из дома)', conjugation: 'ich gehe los', example: 'Ich gehe jetzt los.' },
                { type: 'verb', german: 'anfangen', russian: 'начинать', conjugation: 'es fängt an', example: 'Die Arbeit fängt an.' },
                { type: 'verb', german: 'aufhören', russian: 'заканчивать/прекращать', conjugation: 'es hört auf', example: 'Es hört auf.' },
                { type: 'verb', german: 'einkaufen', russian: 'покупать продукты', conjugation: 'ich kaufe ein', example: 'Ich kaufe im Supermarkt ein.' },
                { type: 'verb', german: 'fernsehen', russian: 'смотреть ТВ', conjugation: 'ich sehe fern', example: 'Ich sehe abends fern.' },
                { type: 'verb', german: 'schlafen', russian: 'спать', conjugation: 'er schläft', example: 'Gute Nacht.' },
                { type: 'verb', german: 'zubereiten', russian: 'готовить (пищу)', conjugation: 'ich bereite zu', example: 'Essen zubereiten.' },

                { type: 'adverb', german: 'morgens', russian: 'по утрам', example: 'Ich trinke morgens Kaffee.' },
                { type: 'adverb', german: 'abends', russian: 'по вечерам', example: 'Ich lese abends.' },
                { type: 'adverb', german: 'täglich', russian: 'ежедневно', example: 'Ich arbeite täglich.' },
                { type: 'adverb', german: 'meistens', russian: 'чаще всего', example: 'Meistens bin ich pünktlich.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-7-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "Я тороплюсь"?',
              options: ['Ich beeile sich', 'Ich beeile mich', 'Ich beeile dich', 'Ich beeile uns'],
              correctAnswer: 'Ich beeile mich',
              explanation: 'Возвратная частица sich меняется на mich для первого лица (ich).'
            },
            {
              id: 'a2-7-ex-2',
              type: 'fill-in-the-blank',
              question: 'Wir waschen ___ . (Мы умываемся)',
              correctAnswer: 'uns',
              explanation: 'Для wir возвратная часть — uns.'
            }
          ]
        },
        {
          id: 'a2-8-jobsuche',
          title: 'A2.8 Работа: Поиск',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">⏳</span> Perfekt (Прошедшее время)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Самое важное прошедшее время для разговора. Строится с помощью <strong>haben</strong> или <strong>sein</strong> + Partyzip II (в конце).
                </p>
                
                <h3 class="font-semibold mb-2 mt-4 text-primary">Формула:</h3>
                <div class="bg-muted p-4 rounded-lg text-center font-mono text-lg mb-6">
                  haben / sein + ... + <strong>ge</strong>-mach-<strong>t</strong> / <strong>ge</strong>-gang-<strong>en</strong>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="border p-4 rounded-lg">
                    <h3 class="font-semibold mb-2">С глаголом HABEN (большинство)</h3>
                    <ul class="text-sm space-y-2">
                      <li>Ich <strong>habe</strong> gearbeitet. (Я работал)</li>
                      <li>Du <strong>hast</strong> gelernt. (Ты учил)</li>
                      <li>Er <strong>hat</strong> geschlafen. (Он спал)</li>
                    </ul>
                  </div>
                  <div class="border p-4 rounded-lg border-blue-200 bg-blue-50/50">
                    <h3 class="font-semibold mb-2">С глаголом SEIN (движение, состояние)</h3>
                    <ul class="text-sm space-y-2">
                       <li>Ich <strong>bin</strong> gefahren. (Я ехал)</li>
                       <li>Er <strong>ist</strong> gegangen. (Он шел)</li>
                       <li>Wir <strong>sind</strong> aufgestanden. (Мы встали)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Работа и Вакансии',
              words: [
                { type: 'noun', german: 'Arbeit', russian: 'работа', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Viel Arbeit.', examplePlural: '-' },
                { type: 'noun', german: 'Job', russian: 'работа/подработка', article: 'der', plural: 'Jobs', pluralArticle: 'die', exampleSingular: 'Guter Job.', examplePlural: '-' },
                { type: 'noun', german: 'Arbeitsplatz', russian: 'рабочее место', article: 'der', plural: 'Arbeitsplätze', pluralArticle: 'die', exampleSingular: 'Sicherer Arbeitsplatz.', examplePlural: '-' },
                { type: 'noun', german: 'Beruf', russian: 'профессия', article: 'der', plural: 'Berufe', pluralArticle: 'die', exampleSingular: 'Mein Beruf.', examplePlural: '-' },
                { type: 'noun', german: 'Stelle', russian: 'должность/место', article: 'die', plural: 'Stellen', pluralArticle: 'die', exampleSingular: 'Offene Stelle.', examplePlural: '-' },
                { type: 'noun', german: 'Anzeige', russian: 'объявление', article: 'die', plural: 'Anzeigen', pluralArticle: 'die', exampleSingular: 'Anzeige in der Zeitung.', examplePlural: '-' },
                { type: 'noun', german: 'Bewerbung', russian: 'резюме/заявка', article: 'die', plural: 'Bewerbungen', pluralArticle: 'die', exampleSingular: 'Bewerbung schreiben.', examplePlural: '-' },

                { type: 'noun', german: 'Chef', russian: 'начальник', article: 'der', plural: 'Chefs', pluralArticle: 'die', exampleSingular: 'Der Chef.', examplePlural: '-' },
                { type: 'noun', german: 'Chefin', russian: 'начальница', article: 'die', plural: 'Chefinnen', pluralArticle: 'die', exampleSingular: 'Die Chefin.', examplePlural: '-' },
                { type: 'noun', german: 'Kollege', russian: 'коллега', article: 'der', plural: 'Kollegen', pluralArticle: 'die', exampleSingular: 'Netter Kollege.', examplePlural: '-' },
                { type: 'noun', german: 'Firma', russian: 'фирма', article: 'die', plural: 'Firmen', pluralArticle: 'die', exampleSingular: 'Große Firma.', examplePlural: '-' },
                { type: 'noun', german: 'Büro', russian: 'офис', article: 'das', plural: 'Büros', pluralArticle: 'die', exampleSingular: 'Im Büro.', examplePlural: '-' },
                { type: 'noun', german: 'Gehalt', russian: 'зарплата', article: 'das', plural: 'Gehälter', pluralArticle: 'die', exampleSingular: 'Gutes Gehalt.', examplePlural: '-' },
                { type: 'noun', german: 'Geld', russian: 'деньги', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Kein Geld.', examplePlural: '-' },
                { type: 'noun', german: 'Computer', russian: 'компьютер', article: 'der', plural: 'Computer', pluralArticle: 'die', exampleSingular: 'Der Computer.', examplePlural: '-' },

                { type: 'verb', german: 'arbeiten', russian: 'работать', conjugation: 'ich arbeite', example: 'Ich habe gearbeitet.' },
                { type: 'verb', german: 'jobben', russian: 'поддрабатывать', conjugation: 'ich jobbe', example: 'Ich habe gejobbt.' },
                { type: 'verb', german: 'studieren', russian: 'учиться (в вузе)', conjugation: 'ich studiere', example: 'Ich habe studiert.' },
                { type: 'verb', german: 'lernen', russian: 'учить/учиться', conjugation: 'ich lerne', example: 'Ich habe gelernt.' },
                { type: 'verb', german: 'suchen', russian: 'искать', conjugation: 'ich suche', example: 'Ich habe gesucht.' },
                { type: 'verb', german: 'finden', russian: 'находить', conjugation: 'ich finde', example: 'Ich habe gefunden.' },
                { type: 'verb', german: 'verdienen', russian: 'зарабатывать', conjugation: 'ich verdiene', example: 'Geld verdienen.' },
                { type: 'verb', german: 'kündigen', russian: 'увольняться', conjugation: 'ich kündige', example: 'Ich habe gekündigt.' },
                { type: 'verb', german: 'telefonieren', russian: 'звонить', conjugation: 'ich telefoniere', example: 'Ich habe telefoniert.' },

                { type: 'adjective', german: 'arbeitslos', russian: 'безработный', comparative: '-', superlative: '-', example: 'Er ist arbeitslos.' },
                { type: 'adjective', german: 'selbstständig', russian: 'самозанятый/независимый', comparative: '-', superlative: '-', example: 'Sie ist selbstständig.' },
                { type: 'adjective', german: 'interessant', russian: 'интересный', comparative: 'interessanter', superlative: 'am interessantesten', example: 'Interessant.' },
                { type: 'adjective', german: 'langweilig', russian: 'скучный', comparative: 'langweiliger', superlative: 'am langweiligsten', example: 'Langweilig.' },
                { type: 'adjective', german: 'schwer', russian: 'трудный', comparative: 'schwerer', superlative: 'am schwersten', example: 'Schwere Arbeit.' },
                { type: 'adjective', german: 'leicht', russian: 'легкий', comparative: 'leichter', superlative: 'am leichtesten', example: 'Leichte Arbeit.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-8-ex-1',
              type: 'multiple-choice',
              question: 'Какой вспомогательный глагол используется с "gehen" в Perfekt?',
              options: ['haben', 'sein', 'werden', 'machen'],
              correctAnswer: 'sein',
              explanation: 'Глаголы движения без прямого дополнения используют вспомогательный глагол sein.'
            },
            {
              id: 'a2-8-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich habe gestern ___ . (Я вчера работал)',
              correctAnswer: 'gearbeitet',
              explanation: 'Partizip II глагола arbeiten — gearbeitet.'
            }
          ]
        },
        {
          id: 'a2-9-wetter',
          title: 'A2.9 Погода (Das Wetter)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">☀️</span> Погода и безличные предложения
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Для описания погоды в немецком часто используется безличное местоимение <strong>es</strong>.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted/50 rounded-lg border">
                    <h3 class="font-bold mb-2">Глаголы (Es + Verb):</h3>
                    <ul class="text-sm space-y-1">
                      <li>Es <strong>regnet</strong>. (Идет дождь)</li>
                      <li>Es <strong>schneit</strong>. (Идет снег)</li>
                      <li>Es <strong>donnert</strong>. (Гремит гром)</li>
                    </ul>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Прилагательные (Es ist...):</h3>
                    <ul class="text-sm space-y-1">
                      <li>Es ist <strong>sonnig</strong>. (Солнечно)</li>
                      <li>Es ist <strong>windig</strong>. (Ветрено)</li>
                      <li>Es ist <strong>kalt / warm</strong>. (Холодно / тепло)</li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm">🗣️ <strong>Вопрос:</strong> "Wie ist das Wetter сегодня?" (Какая сегодня погода?)</p>
                  <p class="text-sm mt-1">🗣️ <strong>Ответ:</strong> "Die Sonne scheint и es ist warm." (Светит солнце и тепло)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Природа и Погода',
              words: [
                { type: 'noun', german: 'Wetter', russian: 'погода', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Schönes Wetter.', examplePlural: '-' },
                { type: 'noun', german: 'Sonne', russian: 'солнце', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Sonne scheint.', examplePlural: '-' },
                { type: 'noun', german: 'Regen', russian: 'дождь', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Viel Regen.', examplePlural: '-' },
                { type: 'noun', german: 'Schnee', russian: 'снег', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Weißer Schnee.', examplePlural: '-' },
                { type: 'noun', german: 'Wind', russian: 'ветер', article: 'der', plural: 'Winde', pluralArticle: 'die', exampleSingular: 'Starker Wind.', examplePlural: '-' },
                { type: 'noun', german: 'Wolke', russian: 'облако', article: 'die', plural: 'Wolken', pluralArticle: 'die', exampleSingular: 'Viele Wolken.', examplePlural: '-' },
                { type: 'noun', german: 'Gewitter', russian: 'гроза', article: 'das', plural: 'Gewitter', pluralArticle: 'die', exampleSingular: 'Ein Gewitter kommt.', examplePlural: '-' },
                { type: 'noun', german: 'Temperature', russian: 'температура', article: 'die', plural: 'Temperaturen', pluralArticle: 'die', exampleSingular: 'Die Temperatur steigt.', examplePlural: '-' },
                { type: 'noun', german: 'Grad', russian: 'градус', article: 'der', plural: 'Grad', pluralArticle: 'die', exampleSingular: '20 Grad.', examplePlural: '-' },
                { type: 'verb', german: 'scheinen', russian: 'светить', conjugation: 'die Sonne scheint', example: 'Heute scheint die Sonne.' },
                { type: 'verb', german: 'regnen', russian: 'идти (о дожде)', conjugation: 'es regnet', example: 'Gestern hat es geregnet.' },
                { type: 'verb', german: 'schneien', russian: 'идти (о снеге)', conjugation: 'es schneit', example: 'Im Winter schneit es.' },
                { type: 'adjective', german: 'sonnig', russian: 'солнечный', comparative: '-', superlative: '-', example: 'Sonniger Tag.' },
                { type: 'adjective', german: 'bewölkt', russian: 'облачно', comparative: '-', superlative: '-', example: 'Es ist bewölkt.' },
                { type: 'adjective', german: 'heiß', russian: 'жарко', comparative: 'heißer', superlative: 'am heißesten', example: 'Es ist sehr heiß.' },
                { type: 'adjective', german: 'trocken', russian: 'сухой', comparative: 'trockener', superlative: 'am trockensten', example: 'Trockenes Wetter.' },
                { type: 'adjective', german: 'nass', russian: 'мокрый', comparative: 'nasser', superlative: 'am nassesten', example: 'Die Straße ist nass.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-9-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "Идет дождь"?',
              options: ['Es ist Regen', 'Es regnet', 'Die Sonne regnet', 'Es ist sonnig'],
              correctAnswer: 'Es regnet',
              explanation: 'Для дождя используется глагол regnen (es regnet).'
            },
            {
              id: 'a2-9-ex-2',
              type: 'fill-in-the-blank',
              question: 'Heute ___ die Sonne. (Светит)',
              correctAnswer: 'scheint',
              explanation: 'Глагол scheinen — светить.'
            }
          ]
        },
        {
          id: 'a2-10-nebensatze',
          title: 'A2.10 Сложные предложения (Weil & Dass)',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🔗</span> Порядок слов в придаточных предложениях
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда мы используем союзы <strong>weil</strong> (потому что) или <strong>dass</strong> (что),
                  спрягаемый глагол уходит в <strong>самый конец</strong> предложения.
                </p>
                
                <div class="bg-muted p-4 rounded-lg mb-6">
                  <h3 class="font-bold text-center mb-2">Золотое правило:</h3>
                  <div class="flex justify-center items-center gap-2 text-lg font-mono flex-wrap">
                    <span>... , weil ich Deutsch</span>
                    <span class="bg-primary/20 p-1 rounded font-bold">lerne</span>.
                  </div>
                  <p class="text-center text-xs text-muted-foreground mt-2">(глагол всегда в конце после запятой)</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 border border-border rounded-lg">
                    <h4 class="font-bold mb-2 text-primary">weil (потому что)</h4>
                    <p class="text-sm italic">"Ich lerne, <strong>weil</strong> ich müde <strong>bin</strong>."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Я учусь, потому что я устал)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg">
                    <h4 class="font-bold mb-2 text-primary">dass (что)</h4>
                    <p class="text-sm italic">"Ich glaube, <strong>dass</strong> er <strong>kommt</strong>."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Я думаю, что он придет)</p>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">⚠️ Не забывайте про <strong>запятую</strong> перед союзом!</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Мнения и Причины',
              words: [
                { type: 'verb', german: 'glauben', russian: 'верить/думать', conjugation: 'ich glaube', example: 'Ich glaube, что...' },
                { type: 'verb', german: 'denken', russian: 'думать', conjugation: 'ich denke', example: 'Was denkst du?' },
                { type: 'verb', german: 'wissen', russian: 'знать', conjugation: 'er weiß', example: 'Ich weiß es не.' },
                { type: 'verb', german: 'sagen', russian: 'говорить/сказать', conjugation: 'er sagt', example: 'Er sagt, dass...' },
                { type: 'other', german: 'weil', russian: 'потому что', example: '..., weil ich Zeit habe.' },
                { type: 'other', german: 'dass', russian: 'что (союз)', example: '..., dass es gut ist.' },
                { type: 'other', german: 'wenn', russian: 'если/когда', example: '..., wenn ich komme.' },
                { type: 'other', german: 'deshalb', russian: 'поэтому', example: 'Deshalb bin ich hier.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-10-ex-1',
              type: 'word-order',
              question: 'Соберите фразу: "Я дома, потому что я болею"',
              correctAnswer: 'Ich bin zu Hause weil ich krank bin',
              options: ['Ich', 'bin', 'zu', 'Hause', 'weil', 'ich', 'krank', 'bin'],
              explanation: 'После "weil" глагол "bin" уходит в конец.'
            },
            {
              id: 'a2-10-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich denke, ___ du recht hast. (что)',
              correctAnswer: 'dass',
              explanation: 'Союз dass переводится как "что" в придаточных предложениях.'
            }
          ]
        },
        {
          id: 'a2-11-steigerung',
          title: 'A2.11 Сравнение (Steigerung der Adjektive)',
          explanation: `
          <div class="space-y-8 font-sans">
            
            <!-- 1. Context & Analogy -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                <span>🏎️</span> Зачем это нужно?
              </h2>
              <p class="text-lg leading-relaxed text-foreground">
                Представьте гонку. Одна машина быстрая. Но другая — <strong>быстрее</strong>. А третья — <strong>самая быстрая</strong>.<br>
                Без этих форм мы не можем сравнивать вещи, людей или цены. В немецком это работает почти как конструктор Lego: мы просто добавляем к слову нужные "детали"-окончания.
              </p>
            </div>

            <!-- 2. The Formula (Visual Builder) -->
            <div class="space-y-4">
              <h3 class="font-bold text-xl text-foreground">🏗️ Как это строится?</h3>
              
              <!-- Komparativ -->
              <div class="bg-card p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <span class="font-bold text-muted-foreground w-32">Сравнительная:</span>
                <div class="flex items-center gap-1 text-xl bg-muted px-4 py-2 rounded-md">
                  <span class="text-foreground">schnell</span>
                  <span class="text-primary font-black">+er</span>
                </div>
                <span class="text-muted-foreground">= schneller (быстрее)</span>
              </div>

              <!-- Superlativ -->
              <div class="bg-card p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <span class="font-bold text-muted-foreground w-32">Превосходная:</span>
                <div class="flex items-center gap-1 text-xl bg-muted px-4 py-2 rounded-md">
                  <span class="text-primary font-black">am</span>
                  <span class="text-foreground">schnell</span>
                  <span class="text-primary font-black">+sten</span>
                </div>
                <span class="text-muted-foreground">= am schnellsten (быстрее всех)</span>
              </div>
            </div>

            <!-- 3. Examples Table -->
            <div>
              <h3 class="font-bold text-xl mb-4 text-foreground">📊 Таблица форм</h3>
              <div class="overflow-hidden rounded-xl border shadow-sm">
                <table class="w-full text-left border-collapse text-sm sm:text-base">
                  <thead class="bg-muted text-muted-foreground">
                    <tr>
                      <th class="p-4 font-semibold">Positiv (Обычная)</th>
                      <th class="p-4 font-semibold">Komparativ (Сравнительная)</th>
                      <th class="p-4 font-semibold">Superlativ (Превосходная)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr class="bg-background hover:bg-muted/20 transition-colors">
                      <td class="p-4">klein (маленький)</td>
                      <td class="p-4 font-medium text-primary">klein<strong>er</strong></td>
                      <td class="p-4 font-medium text-purple-600 dark:text-purple-400">am klein<strong>sten</strong></td>
                    </tr>
                    <tr class="bg-background hover:bg-muted/20 transition-colors">
                      <td class="p-4">schön (красивый)</td>
                      <td class="p-4 font-medium text-primary">schön<strong>er</strong></td>
                      <td class="p-4 font-medium text-purple-600 dark:text-purple-400">am schön<strong>sten</strong></td>
                    </tr>
                    <!-- Umlaut group -->
                    <tr class="bg-yellow-50/50 dark:bg-yellow-900/10">
                      <td class="p-4 flex flex-col">
                        <span>alt (старый)</span>
                        <span class="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-1">Umlaut!</span>
                      </td>
                      <td class="p-4 font-medium text-primary"><strong>ä</strong>lter</td>
                      <td class="p-4 font-medium text-purple-600 dark:text-purple-400">am <strong>ä</strong>ltesten</td>
                    </tr>
                    <tr class="bg-yellow-50/50 dark:bg-yellow-900/10">
                      <td class="p-4">groß (большой)</td>
                      <td class="p-4 font-medium text-primary">gr<strong>ö</strong>ßer</td>
                      <td class="p-4 font-medium text-purple-600 dark:text-purple-400">am gr<strong>ö</strong>ßten</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="text-xs text-muted-foreground mt-2 px-2">* Короткие корневые гласные a, o, u часто получают умлаут (ä, ö, ü).</p>
            </div>

            <!-- 4. Exceptions (The Traps) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 dark:border-red-800">
                <h3 class="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <span>⚠️</span> Исключения (Выучить!)
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-center justify-between bg-white dark:bg-black/20 p-2 rounded shadow-sm">
                    <span>gut</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">besser</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">am besten</span>
                  </li>
                  <li class="flex items-center justify-between bg-white dark:bg-black/20 p-2 rounded shadow-sm">
                    <span>viel</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">mehr</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">am meisten</span>
                  </li>
                  <li class="flex items-center justify-between bg-white dark:bg-black/20 p-2 rounded shadow-sm">
                    <span>gern</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">lieber</span>
                    <span class="text-muted-foreground">→</span>
                    <span class="font-bold text-red-600">am liebsten</span>
                  </li>
                </ul>
              </div>

              <!-- 5. Common Mistakes -->
              <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800">
                <h3 class="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <span>🚫</span> Не говорите так!
                </h3>
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <div class="min-w-[24px] text-red-500 font-bold">❌</div>
                    <div>
                      <p class="line-through text-muted-foreground">Das Auto ist <strong>mehr schnell</strong>.</p>
                      <p class="text-xs text-muted-foreground">В немецком нельзя использовать "mehr" для усиления, как в английском "more".</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="min-w-[24px] text-green-600 font-bold">✅</div>
                    <div>
                      <p class="font-medium">Das Auto ist <strong>schneller</strong>.</p>
                    </div>
                  </div>
                  <hr class="border-amber-200/50">
                  <div class="flex items-start gap-3">
                    <div class="min-w-[24px] text-red-500 font-bold">❌</div>
                    <div>
                      <p class="line-through text-muted-foreground">Ich mag Kaffee <strong>besser</strong>.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="min-w-[24px] text-green-600 font-bold">✅</div>
                    <div>
                      <p class="font-medium">Ich mag Kaffee <strong>lieber</strong>.</p>
                      <p class="text-xs text-muted-foreground">Когда говорим о вкусах ("люблю больше"), используем form от gern -> lieber.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 6. Comparisons (Als vs Wie) -->
            <div class="bg-card border p-6 rounded-xl relative overflow-hidden">
              <div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-purple-600"></div>
              <h3 class="font-bold text-lg mb-4 pl-2">⚖️ Как сравнивать: ALS или WIE?</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-bold text-primary mb-2 text-center border-b pb-2">Разница (ALS)</h4>
                  <p class="text-center italic mb-2">"Быстрее, <strong>чем</strong>..."</p>
                  <p class="text-sm text-center bg-muted p-2 rounded">Используем <span class="text-primary font-black">Komparativ + als</span></p>
                  <p class="text-center mt-2 font-medium">Er ist größer <strong>als</strong> ich.</p>
                </div>

                <div>
                  <h4 class="font-bold text-purple-600 dark:text-purple-400 mb-2 text-center border-b pb-2">Равенство (WIE)</h4>
                  <p class="text-center italic mb-2">"Такой же, <strong>как</strong>..."</p>
                  <p class="text-sm text-center bg-muted p-2 rounded">Используем <span class="text-purple-600 font-black">so + Adjektiv + wie</span></p>
                  <p class="text-center mt-2 font-medium">Er ist <strong>so</strong> groß <strong>wie</strong> ich.</p>
                </div>
              </div>
            </div>

          </div>
        `,
          vocabulary: [
            {
              theme: 'Сравнение и Оценка',
              words: [
                { type: 'adjective', german: 'gut', russian: 'хороший', comparative: 'besser', superlative: 'am besten', example: 'Das ist am besten.' },
                { type: 'adjective', german: 'viel', russian: 'много', comparative: 'mehr', superlative: 'am meisten', example: 'Ich lerne mehr.' },
                { type: 'adjective', german: 'gern', russian: 'охотно', comparative: 'lieber', superlative: 'am liebsten', example: 'Ich trinke lieber Tee.' },
                { type: 'adjective', german: 'hoch', russian: 'высокий', comparative: 'höher', superlative: 'am höchsten', example: 'Ein hoher Berg.' },
                { type: 'adjective', german: 'nah', russian: 'близкий', comparative: 'näher', superlative: 'am nächsten', example: 'Der nächste Halt.' },
                { type: 'other', german: 'als', russian: 'чем (при сравнении)', example: 'Größer als du.' },
                { type: 'other', german: 'wie', russian: 'как (такой же как)', example: 'So groß wie ты.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-11-ex-1',
              type: 'multiple-choice',
              question: 'Какая форма сравнения у слова "gut"?',
              options: ['guter', 'besser', 'am gutesten', 'gut'],
              correctAnswer: 'besser',
              explanation: 'Gut — исключение: gut, besser, am besten.'
            },
            {
              id: 'a2-11-ex-2',
              type: 'fill-in-the-blank',
              question: 'Mein Bruder ist größer ___ ich. (чем)',
              correctAnswer: 'als',
              explanation: 'Слово "als" используется для сравнения при разнице в качествах.'
            }
          ]
        },
        {
          id: 'a2-12-praeteritum',
          title: 'A2.12 Прошедшее время (Präteritum)',
          explanation: `
          <div class="space-y-8 font-sans">
            
            <!-- 1. Context & Analogy -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                <span>🕰️</span> Когда использовать Präteritum?
              </h2>
              <p class="text-lg leading-relaxed text-foreground">
                В немецком есть два прошедших времени. <strong>Perfekt</strong> — для разговора ("Я сделал"). <strong>Präteritum</strong> — для книг и газет ("Он пошел, увидел...").<br>
                <strong>НО!</strong> Есть группа глаголов, которые даже в разговоре мы всегда используем в Präteritum. Это удобнее и быстрее.
              </p>
            </div>

            <!-- 2. The Golden Trio -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              <!-- SEIN -->
              <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                <div class="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2">🧘</div>
                <h3 class="font-bold text-lg mb-1">sein (быть)</h3>
                <p class="text-sm text-muted-foreground mb-3">Вместо "bin gewesen"</p>
                <div class="bg-muted w-full p-3 rounded-lg font-mono text-sm">
                  <div>ich <strong>war</strong></div>
                  <div>er <strong>war</strong></div>
                  <div>wir <strong>waren</strong></div>
                </div>
                <p class="text-xs mt-2 italic">"Ich war zu Hause."</p>
              </div>

              <!-- HABEN -->
              <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                <div class="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2">🎒</div>
                <h3 class="font-bold text-lg mb-1">haben (иметь)</h3>
                <p class="text-sm text-muted-foreground mb-3">Вместо "habe gehabt"</p>
                <div class="bg-muted w-full p-3 rounded-lg font-mono text-sm">
                  <div>ich <strong>hatte</strong></div>
                  <div>er <strong>hatte</strong></div>
                  <div>wir <strong>hatten</strong></div>
                </div>
                <p class="text-xs mt-2 italic">"Ich hatte keine Zeit."</p>
              </div>

              <!-- MODALS -->
              <div class="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                <div class="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2">⚙️</div>
                <h3 class="font-bold text-lg mb-1">Модальные</h3>
                <p class="text-sm text-muted-foreground mb-3">Müssen, können, wollen...</p>
                <div class="bg-muted w-full p-3 rounded-lg font-mono text-sm">
                  <div>ich <strong>musste</strong></div>
                  <div>er <strong>konnte</strong></div>
                  <div>sie <strong>wollte</strong></div>
                </div>
                <p class="text-xs mt-2 italic">"Ich musste arbeiten."</p>
              </div>

            </div>

            <!-- 5. Pro Tip (Common Mistake) -->
            <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800">
              <h3 class="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                <span>🚫</span> Частая ошибка
              </h3>
              <div class="flex items-start gap-3">
                <div class="min-w-[24px] text-red-500 font-bold">❌</div>
                <div>
                  <p class="line-through text-muted-foreground">Ich <strong>habe</strong> gestern krank <strong>gewesen</strong>.</p>
                  <p class="text-xs text-muted-foreground">Звучит очень громоздко и неестественно.</p>
                </div>
              </div>
              <div class="flex items-start gap-3 mt-2">
                <div class="min-w-[24px] text-green-600 font-bold">✅</div>
                <div>
                  <p class="font-medium">Ich <strong>war</strong> gestern krank.</p>
                  <p class="text-xs text-muted-foreground">Коротко и ясно!</p>
                </div>
              </div>
            </div>

            <div class="p-4 bg-muted rounded-lg border flex items-center gap-3">
               <span class="text-2xl">💡</span>
               <p class="text-sm">Запомните: в Präteritum формы <strong>ICH</strong> и <strong>ER/SIE/ES</strong> всегда совпадают! (Ich war = Er war).</p>
            </div>

          </div>
          `,
          vocabulary: [
            {
              theme: 'Прошлое и Возможности',
              words: [
                { type: 'verb', german: 'waren', russian: 'были (прош.вр. sein)', conjugation: 'ich war', example: 'Ich war dort.' },
                { type: 'verb', german: 'hatten', russian: 'имели (прош.вр. haben)', conjugation: 'ich hatte', example: 'Ich hatte keine Zeit.' },
                { type: 'verb', german: 'konnten', russian: 'могли (прош.вр. können)', conjugation: 'ich konnte', example: 'Ich konnte не.' },
                { type: 'verb', german: 'mussten', russian: 'должны были (прош.вр. müssen)', conjugation: 'ich musste', example: 'Ich musste gehen.' },
                { type: 'verb', german: 'wollten', russian: 'хотели (прош.вр. wollen)', conjugation: 'ich wollte', example: 'Я wollte fragen.' },
                { type: 'verb', german: 'durften', russian: 'имели разрешение', conjugation: 'ich durfte', example: 'Ich durfte nicht.' },
                { type: 'verb', german: 'sollten', russian: 'следовали совету', conjugation: 'ich sollte', example: 'Ich sollte warten.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-12-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "Я был там"?',
              options: ['Ich bin dort', 'Ich war dort', 'Ich bin dort gewesen', 'Ich hatte dort'],
              correctAnswer: 'Ich war dort',
              explanation: 'Для глагола sein в прошедшем времени обычно используется Präteritum (war).'
            },
            {
              id: 'a2-12-ex-2',
              type: 'fill-in-the-blank',
              question: 'Gestern ___ я работать. (Я должен был - müssen)',
              correctAnswer: 'musste',
              explanation: 'Präteritum от müssen для первого лица — musste.'
            }
          ]
        },
        {
          id: 'a2-13-praepositionen',
          title: 'A2.13 Предлоги: Место и Время',
          explanation: `
            <div class="space-y-8 font-sans">
              
              <!-- 1. Context -->
              <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                  <span>📍</span> Где? (Dativ) vs Куда? (Akkusativ)
                </h2>
                <p class="text-lg leading-relaxed text-foreground">
                  В немецком есть группа предлогов-хамелеонов (Wechselpräpositionen). Они могут требовать <strong>Dativ</strong> (если мы стоим на месте) или <strong>Akkusativ</strong> (если мы движемся туда).
                </p>
              </div>

              <!-- 2. The Visual Rule -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <!-- WO? (Static) -->
                <div class="bg-card p-6 rounded-xl border shadow-sm relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl">🛑</div>
                  <h3 class="font-bold text-xl mb-2 text-primary">WO? (Где?)</h3>
                  <p class="text-sm text-muted-foreground mb-4">Статика. Никто никуда не идет.</p>
                  <div class="bg-primary/20 p-3 rounded-lg text-center font-bold text-lg mb-4 text-primary">
                    DATIV (dem / der)
                  </div>
                  <ul class="space-y-2 text-sm">
                    <li>Ich bin <strong>im</strong> Kino.</li>
                    <li>Das Buch liegt <strong>auf dem</strong> Tisch.</li>
                  </ul>
                </div>

                <!-- WOHIN? (Dynamic) -->
                <div class="bg-card p-6 rounded-xl border shadow-sm relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏃</div>
                  <h3 class="font-bold text-xl mb-2 text-accent">WOHIN? (Куда?)</h3>
                  <p class="text-sm text-muted-foreground mb-4">Динамика. Движение в точку.</p>
                  <div class="bg-accent/20 p-3 rounded-lg text-center font-bold text-lg mb-4 text-accent">
                    AKKUSATIV (den / die)
                  </div>
                  <ul class="space-y-2 text-sm">
                    <li>Ich gehe <strong>ins</strong> Kino.</li>
                    <li>Ich lege das Buch <strong>auf den</strong> Tisch.</li>
                  </ul>
                </div>
              </div>

              <!-- 3. Prepositions List (Visual Grid) -->
              <div>
                <h3 class="font-bold text-xl mb-4">🗺️ Карта предлогов</h3>
                <div class="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div class="p-3 bg-muted rounded-lg font-medium">in (в)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">an (на/у)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">auf (на)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">vor (перед)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">hinter (за)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">über (над)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">unter (под)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">neben (рядом)</div>
                  <div class="p-3 bg-muted rounded-lg font-medium">zwischen (между)</div>
                </div>
              </div>

              <!-- 4. Contractions (Pro Tip) -->
              <div class="bg-card border p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 class="font-bold text-lg">Короткие формы</h4>
                  <p class="text-sm text-muted-foreground">Немцы любят сокращать:</p>
                </div>
                <div class="flex flex-wrap gap-3 text-sm font-mono">
                  <div class="bg-secondary px-3 py-1 rounded">in + dem = <strong>im</strong></div>
                  <div class="bg-secondary px-3 py-1 rounded">an + dem = <strong>am</strong></div>
                  <div class="bg-secondary px-3 py-1 rounded">in + das = <strong>ins</strong></div>
                </div>
              </div>

            </div>
          `,
          vocabulary: [
            {
              theme: 'Место и время',
              words: [
                { type: 'preposition', german: 'zwischen', russian: 'между', case: 'Wechselpräposition', example: 'Zwischen den Stühlen.' },
                { type: 'preposition', german: 'hinter', russian: 'за/позади', case: 'Wechselpräposition', example: 'Hinter dem Haus.' },
                { type: 'preposition', german: 'über', russian: 'над', case: 'Wechselpräposition', example: 'Über dem Tisch.' },
                { type: 'preposition', german: 'unter', russian: 'под', case: 'Wechselpräposition', example: 'Unter dem Sofa.' },
                { type: 'preposition', german: 'neben', russian: 'рядом/около', case: 'Wechselpräposition', example: 'Neben mir.' },
                { type: 'preposition', german: 'seit', russian: 'с (прошлого)', case: 'Dativ', example: 'Seit 2020.' },
                { type: 'preposition', german: 'vor', russian: 'до/назад', case: 'Dativ', example: 'Vor dem Essen / Vor zwei Jahren.' },
                { type: 'preposition', german: 'nach', russian: 'после', case: 'Dativ', example: 'Nach dem Kurs.' },
                { type: 'preposition', german: 'ab', russian: 'с (будущего)', case: 'Dativ', example: 'Ab morgen.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'a2-13-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "на столе" (Где? - Tisch der)',
              options: ['Auf den Tisch', 'Auf dem Tisch', 'An dem Tisch', 'In dem Tisch'],
              correctAnswer: 'Auf dem Tisch',
              explanation: 'Вопрос "Wo?" требует Dativ. Der Tisch -> dem Tisch.'
            },
            {
              id: 'a2-13-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich lerne Deutsch ___ einem Jahr. (уже год/с года назад)',
              correctAnswer: 'seit',
              explanation: 'Предлог seit указывает на действие, начатое в прошлом и длящееся до сих пор.'
            }
          ]
        }
      ]

    },
    {
      id: 'b1',
      title: 'Уровень B1: Самостоятельное владение (Selbstständige)',
      description: 'Переход к свободному общению. Разделение тем на небольшие блоки для комфортного изучения.',
      topics: [
        {
          id: 'b1-1-medien-news',
          title: 'B1.1 СМИ: Новости и Relativsätze',
          explanation: `
            <div class="space-y-8 font-sans">

              <!-- 1. Context -->
              <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h2 class="font-headline text-2xl font-bold mb-3 flex items-center gap-2 text-primary">
                  <span>🔗</span> Relativsätze (Который...)
                </h2>
                <p class="text-lg leading-relaxed text-foreground">
                  Как соединить два предложения в одно? <br>
                  "Das ist der Mann. Er liest die Zeitung." -> "Das ist der Mann, <strong>der</strong> die Zeitung <strong>liest</strong>."<br>
                  Это делает вашу речь плавной и "взрослой".
                </p>
              </div>

              <!-- 2. The Golden Rule -->
              <div class="bg-card p-6 rounded-xl border-l-4 border-primary shadow-sm">
                <h3 class="font-bold text-xl mb-2">Золотое правило порядка слов</h3>
                <div class="flex items-center gap-4 text-lg">
                  <span class="bg-muted px-3 py-1 rounded">Главное предложение</span>
                  <span>,</span>
                  <span class="bg-primary/20 px-3 py-1 rounded font-bold text-primary">Relativpronomen (der/die/das)</span>
                  <span>...</span>
                  <span class="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded text-red-600 font-bold border border-red-200">VERB ENDE!</span>
                </div>
              </div>

              <!-- 3. Table: Relative Pronouns -->
              <div class="overflow-hidden rounded-xl border shadow-sm">
                <table class="w-full text-sm">
                  <thead class="bg-muted text-muted-foreground">
                    <tr>
                      <th class="p-3 text-left">Падеж</th>
                      <th class="p-3 text-center">Maskulin (der)</th>
                      <th class="p-3 text-center">Feminin (die)</th>
                      <th class="p-3 text-center">Neutrum (das)</th>
                      <th class="p-3 text-center">Plural (die)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr class="bg-card">
                      <td class="p-3 font-bold">Nominativ</td>
                      <td class="p-3 text-center font-mono text-blue-600">der</td>
                      <td class="p-3 text-center font-mono text-red-600">die</td>
                      <td class="p-3 text-center font-mono text-green-600">das</td>
                      <td class="p-3 text-center font-mono text-purple-600">die</td>
                    </tr>
                    <tr class="bg-card/50">
                      <td class="p-3 font-bold">Akkusativ</td>
                      <td class="p-3 text-center font-mono text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20">den</td>
                      <td class="p-3 text-center font-mono text-red-600">die</td>
                      <td class="p-3 text-center font-mono text-green-600">das</td>
                      <td class="p-3 text-center font-mono text-purple-600">die</td>
                    </tr>
                    <tr class="bg-card">
                      <td class="p-3 font-bold">Dativ</td>
                      <td class="p-3 text-center font-mono text-blue-600">dem</td>
                      <td class="p-3 text-center font-mono text-red-600">der</td>
                      <td class="p-3 text-center font-mono text-green-600">dem</td>
                      <td class="p-3 text-center font-mono text-purple-600 font-bold bg-purple-50 dark:bg-purple-900/20">denen</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 4. Examples -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-muted/50 border">
                  <h4 class="font-bold mb-2">Nominativ (Кто?)</h4>
                  <p class="text-sm">Der Reporter, <strong>der</strong> hier <strong>steht</strong>, ist mein Chef.</p>
                  <p class="text-xs text-muted-foreground mt-1">(Репортер, КОТОРЫЙ здесь стоит...)</p>
                </div>
                <div class="p-4 rounded-xl bg-muted/50 border">
                  <h4 class="font-bold mb-2">Akkusativ (Кого?)</h4>
                  <p class="text-sm">Der Artikel, <strong>den</strong> ich <strong>lese</strong>, ist interessant.</p>
                  <p class="text-xs text-muted-foreground mt-1">(Статья, КОТОРУЮ я читаю...)</p>
                </div>
              </div>

              <!-- 5. Pro Tip -->
              <div class="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 rounded-xl">
                <div class="text-2xl">⚠️</div>
                <div>
                  <h4 class="font-bold text-amber-800 dark:text-amber-400">Запятая обязательна!</h4>
                  <p class="text-sm text-amber-700 dark:text-amber-300">В немецком, в отличие от английского, запятая перед <em>der/die/das</em> ставится всегда.</p>
                </div>
              </div>

            </div>
          `,
          vocabulary: [
            {
              theme: 'СМИ и Информация',
              words: [
                { type: 'noun', german: 'Nachricht', russian: 'новость', article: 'die', plural: 'Nachrichten', pluralArticle: 'die', exampleSingular: 'Eine wichtige Nachricht.', examplePlural: 'Ich höre Nachrichten.' },
                { type: 'noun', german: 'Sendung', russian: 'передача/трансляция', article: 'die', plural: 'Sendungen', pluralArticle: 'die', exampleSingular: 'Meine Lieblingssendung.', examplePlural: 'Interessante Sendungen.' },
                { type: 'noun', german: 'Zuschauer', russian: 'зритель', article: 'der', plural: 'Zuschauer', pluralArticle: 'die', exampleSingular: 'Der Zuschauer sieht fern.', examplePlural: 'Millionen Zuschauer.' },
                { type: 'noun', german: 'Zeitung', russian: 'газета', article: 'die', plural: 'Zeitungen', pluralArticle: 'die', exampleSingular: 'Zeitung lesen.', examplePlural: 'Alte Zeitungen.' },
                { type: 'noun', german: 'Bericht', russian: 'отчет/репортаж', article: 'der', plural: 'Berichte', pluralArticle: 'die', exampleSingular: 'Ein kurzer Bericht.', examplePlural: 'Tägliche Berichte.' },
                { type: 'verb', german: 'berichten', russian: 'сообщать/докладывать', conjugation: 'er berichtet', example: 'Er berichtet über das Wetter.' },
                { type: 'verb', german: 'übertragen', russian: 'транслировать', conjugation: 'es überträgt', example: 'Das Spiel wird live übertragen.' },
                { type: 'verb', german: 'veröffentlichen', russian: 'публиковать', conjugation: 'er veröffentlicht', example: 'Er veröffentlicht ein Buch.' },
                { type: 'adjective', german: 'aktuell', russian: 'актуальный', comparative: 'aktueller', superlative: 'am aktuellsten', example: 'Aktuelle Nachrichten.' },
                { type: 'adjective', german: 'spannend', russian: 'захватывающий', comparative: 'spannender', superlative: 'am spannendsten', example: 'Ein spannender Film.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-1-ex-1',
              type: 'fill-in-the-blank',
              question: 'Das ist der Reporter, ___ den Artikel schreibt.',
              correctAnswer: 'der',
              explanation: 'Для существительного мужского рода (der Reporter) в Nominativ используется относительное местоимение "der".'
            },
            {
              id: 'b1-1-ex-2',
              type: 'word-order',
              question: 'Соберите фразу: "Это газета, которую я читаю."',
              correctAnswer: 'Das ist die Zeitung die ich lese',
              options: ['Das', 'ist', 'die', 'Zeitung', 'die', 'ich', 'lese'],
              explanation: 'В придаточном предложении глагол (lese) уходит в самый конец.'
            }
          ]
        },
        {
          id: 'b1-2-medien-digital',
          title: 'B1.2 СМИ: Интернет',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">⚙️</span> Passiv Präsens (Страдательный залог)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Пассив используется, когда действие важнее того, кто его совершает. Обозначает "что происходит с объектом".
                </p>

                <h3 class="font-semibold mb-3 text-primary">Формула:</h3>
                <div class="bg-muted p-4 rounded-lg text-center font-mono text-xl mb-6 flex justify-center items-center gap-2">
                  <span class="text-primary font-bold">werden</span> + <span class="text-accent font-bold">Partizip II</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="border p-4 rounded-lg bg-green-50/50">
                    <h4 class="font-bold mb-1 text-green-700">Aktiv (Действительный)</h4>
                    <p class="text-sm italic">"Der Autor <strong>löscht</strong> die Datei."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Автор удаляет файл)</p>
                  </div>
                  <div class="border p-4 rounded-lg bg-blue-50/50">
                    <h4 class="font-bold mb-1 text-blue-700">Passiv (Страдательный)</h4>
                    <p class="text-sm italic">"Die Datei <strong>wird</strong> gelöscht."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Файл удаляется / Файл удален)</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3">Спряжение werden:</h3>
                <div class="grid grid-cols-3 gap-2 text-sm text-center mb-6">
                  <div class="p-2 bg-muted rounded">ich <strong>werde</strong></div>
                  <div class="p-2 bg-muted rounded">du <strong>wirst</strong></div>
                  <div class="p-2 bg-muted rounded text-primary font-bold">er/sie/es wird</div>
                  <div class="p-2 bg-muted rounded">wir <strong>werden</strong></div>
                  <div class="p-2 bg-muted rounded">ihr <strong>werdet</strong></div>
                  <div class="p-2 bg-muted rounded">sie <strong>werden</strong></div>
                </div>

                <div class="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">💻 <strong>Пример:</strong> "Passwörter <strong>werden</strong> часто <strong>geändert</strong>." (Пароли часто меняют)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Интернет и Технологии',
              words: [
                { type: 'noun', german: 'Datei', russian: 'файл', article: 'die', plural: 'Dateien', pluralArticle: 'die', exampleSingular: 'Eine große Datei.', examplePlural: 'Alle Dateien löschen.' },
                { type: 'noun', german: 'Passwort', russian: 'пароль', article: 'das', plural: 'Passwörter', pluralArticle: 'die', exampleSingular: 'Sicheres Passwort.', examplePlural: 'Passwörter ändern.' },
                { type: 'noun', german: 'Benutzer', russian: 'пользователь', article: 'der', plural: 'Benutzer', pluralArticle: 'die', exampleSingular: 'Neuer Benutzer.', examplePlural: 'Viele Benutzer.' },
                { type: 'noun', german: 'Anhang', russian: 'вложение', article: 'der', plural: 'Anhänge', pluralArticle: 'die', exampleSingular: 'Datei im Anhang.', examplePlural: 'E-Mails mit Anhängen.' },
                { type: 'verb', german: 'speichern', russian: 'сохранять', conjugation: 'es wird gespeichert', example: 'Daten werden gespeichert.' },
                { type: 'verb', german: 'herunterladen', russian: 'скачивать', conjugation: 'es wird heruntergeladen', example: 'Musik wird heruntergeladen.' },
                { type: 'verb', german: 'kopieren', russian: 'копировать', conjugation: 'es wird kopiert', example: 'Texte werden kopiert.' },
                { type: 'verb', german: 'löschen', russian: 'удалять', conjugation: 'es wird gelöscht', example: 'Die Nachricht wird gelöscht.' },
                { type: 'adjective', german: 'digital', russian: 'цифровой', comparative: '-', superlative: '-', example: 'Die digitale Welt.' },
                { type: 'adjective', german: 'virtuell', russian: 'виртуальный', comparative: '-', superlative: '-', example: 'Ein virtuelles Meeting.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-2-ex-1',
              type: 'multiple-choice',
              question: 'Как образуется Passiv Präsens?',
              options: ['haben + Partizip II', 'sein + Partizip II', 'werden + Partizip II', 'werden + Infinitiv'],
              correctAnswer: 'werden + Partizip II',
              explanation: 'Пассив настоящего времени строится с помощью вспомогательного глагола werden и причастия Partizip II.'
            },
            {
              id: 'b1-2-ex-2',
              type: 'fill-in-the-blank',
              question: 'Die Datei ___ (удаляется) gelöscht.',
              correctAnswer: 'wird',
              explanation: 'С существительным в единственном числе (die Datei) используется форма "wird".'
            }
          ]
        }
        ,
        {
          id: 'b1-3-umwelt-natur',
          title: 'B1.3 Экология: Сожаления о прошлом',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🌍</span> Konjunktiv II der Vergangenheit
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Используется для выражения нереальных ситуаций в прошлом (сожаления: "если бы только...").
                </p>

                <h3 class="font-semibold mb-3 text-primary">Формула:</h3>
                <div class="bg-muted p-4 rounded-lg text-center font-mono text-xl mb-6 flex justify-center items-center gap-2">
                  <span class="text-primary font-bold text-sm">hätte / wäre</span> + <span class="text-accent font-bold text-sm">...</span> + <span class="text-primary font-bold text-sm">Partizip II</span>
                </div>

                <div class="space-y-4">
                  <div class="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <p class="font-bold text-sm italic">"Wenn wir die Umwelt раньше <strong>geschützt hätten</strong>..."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Если бы мы защищали экологию раньше... — но мы этого не делали)</p>
                  </div>
                  <div class="p-4 border-l-4 border-accent bg-accent/5 rounded-r-lg">
                    <p class="font-bold text-sm italic">"Ich <strong>wäre</strong> gern dabei <strong>gewesen</strong>."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Я бы с удовольствием там поприсутствовал — но меня не было)</p>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm">💡 <strong>Hätte</strong> используется для большинства глаголов. <br> <strong>Wäre</strong> — для глаголов движения и состояния (sein, bleiben, gehen...).</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Экология и Климат',
              words: [
                { type: 'noun', german: 'Klimawandel', russian: 'изменение климата', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Der Klimawandel ist real.', examplePlural: '-' },
                { type: 'noun', german: 'Erderwärmung', russian: 'глобальное потепление', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Folgen der Erderwärmung.', examplePlural: '-' },
                { type: 'noun', german: 'Umweltschutz', russian: 'защита окружающей среды', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Aktiv im Umweltschutz.', examplePlural: '-' },
                { type: 'noun', german: 'Nachhaltigkeit', russian: 'устойчивое развитие', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Prinzip der Nachhaltigkeit.', examplePlural: '-' },
                { type: 'noun', german: 'Ressource', russian: 'ресурс', article: 'die', plural: 'Ressourcen', pluralArticle: 'die', exampleSingular: 'Knappe Ressourcen.', examplePlural: 'Naturressourcen schonen.' },
                { type: 'verb', german: 'belasten', russian: 'нагружать/загрязнять', conjugation: 'er belastet', example: 'Abgase belasten die Luft.' },
                { type: 'verb', german: 'reduzieren', russian: 'сокращать', conjugation: 'er reduziert', example: 'Plastikmüll reduzieren.' },
                { type: 'verb', german: 'schonen', russian: 'беречь', conjugation: 'er schont', example: 'Die Natur schonen.' },
                { type: 'verb', german: 'verbrauchen', russian: 'потреблять', conjugation: 'er verbraucht', example: 'Viel Energie verbrauchen.' },
                { type: 'adjective', german: 'nachhaltig', russian: 'устойчивый/экологичный', comparative: 'nachhaltiger', superlative: 'am nachhaltigsten', example: 'Ein nachhaltiger Lebensstil.' },
                { type: 'adjective', german: 'umweltschädlich', russian: 'вредный для среды', comparative: 'umweltschädlicher', superlative: 'am umweltschädlichsten', example: 'Plastik ist umweltschädlich.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-3-ex-1',
              type: 'multiple-choice',
              question: 'Какую форму Konjunktiv II использовать для сожаления: "Если бы я это знал..."?',
              options: ['Wenn ich es wüsste', 'Wenn ich es gewusst hätte', 'Wenn ich es wisse', 'Wenn ich es wissen würde'],
              correctAnswer: 'Wenn ich es gewusst hätte',
              explanation: 'Для нереального условия в прошлом используется hätte/wäre + Partizip II.'
            },
            {
              id: 'b1-3-ex-2',
              type: 'fill-in-the-blank',
              question: 'Ich ___ gern dabei gewesen. (Я бы с удовольствием там был)',
              correctAnswer: 'wäre',
              explanation: 'С глаголом "sein" (быть) используется вспомогательный глагол "wäre".'
            }
          ]
        },
        {
          id: 'b1-4-kommunikation-indirekt',
          title: 'B1.4 Коммуникация: Косвенные вопросы',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">❓</span> Indirekte Fragesätze (Косвенные вопросы)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Косвенные вопросы звучат более вежливо. Они являются придаточными предложениями, поэтому <strong>глагол уходит в самый конец</strong>.
                </p>

                <div class="space-y-4 mb-6">
                  <div class="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <h3 class="font-bold text-sm mb-1">W-Fragen (с вопросительным словом)</h3>
                    <p class="text-sm italic">"Wann kommt der Bus?" (Прямой)</p>
                    <p class="text-sm italic font-bold text-primary">"Ich möchte wissen, wann der Bus <strong>kommt</strong>." (Косвенный)</p>
                  </div>
                  <div class="p-4 border-l-4 border-accent bg-accent/5 rounded-r-lg">
                    <h3 class="font-bold text-sm mb-1">Ja/Nein-Fragen (с союзом <strong>ob</strong>)</h3>
                    <p class="text-sm italic">"Ist der Platz frei?" (Прямой)</p>
                    <p class="text-sm italic font-bold text-accent">"Können Sie mir sagen, <strong>ob</strong> der Platz frei <strong>ist</strong>?" (Косвенный)</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Вежливые вводные фразы:</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm italic">
                  <li class="bg-muted p-2 rounded">• Wissen Sie, ...</li>
                  <li class="bg-muted p-2 rounded">• Könnten Sie mir sagen, ...</li>
                  <li class="bg-muted p-2 rounded">• Ich würde gern wissen, ...</li>
                  <li class="bg-muted p-2 rounded">• Ich bin mir не совсем уверен, ...</li>
                </ul>

                <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-xs">💡 <strong>Совет:</strong> Если в вопросе есть модальный глагол или перфект, вспомогательный глагол всё равно уходит в самый конец: <em>"...ob du mir <strong>helfen kannst</strong>."</em></p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Общение и Вежливость',
              words: [
                { type: 'noun', german: 'Auskunft', russian: 'информация/справка', article: 'die', plural: 'Auskünfte', pluralArticle: 'die', exampleSingular: 'Eine Auskunft geben.', examplePlural: 'Informationen an der Auskunft.' },
                { type: 'noun', german: 'Anliegen', russian: 'запрос/дело', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Was является Ihr Anliegen?', examplePlural: '-' },
                { type: 'noun', german: 'Grund', russian: 'причина', article: 'der', plural: 'Gründe', pluralArticle: 'die', exampleSingular: 'Der Grund für мой Anruf.', examplePlural: 'Viele Gründe.' },
                { type: 'verb', german: 'nachfragen', russian: 'переспрашивать/уточнять', conjugation: 'er fragt nach', example: 'Darf ich kurz nachfragen?' },
                { type: 'verb', german: 'erläutern', russian: 'разъяснять', conjugation: 'er erläutert', example: 'Können Sie das erläutern?' },
                { type: 'verb', german: 'begründen', russian: 'обосновывать', conjugation: 'er begründet', example: 'Bitte begründen Sie Ihre Meinung.' },
                { type: 'verb', german: 'empfehlen', russian: 'рекомендовать', conjugation: 'er empfiehlt', example: 'Was können Sie empfehlen?' },
                { type: 'adjective', german: 'höflich', russian: 'вежливый', comparative: 'höflicher', superlative: 'am höflichsten', example: 'Eine höфliche Frage.' },
                { type: 'adjective', german: 'unhöflich', russian: 'невежливый', comparative: '-', superlative: '-', example: 'Das war unhöflich.' },
                { type: 'other', german: 'ob', russian: 'ли (союз)', example: 'Я не знаю, придет ли он.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-4-ex-1',
              type: 'multiple-choice',
              question: 'Какой союз используется в косвенном вопросе без вопросительного слова (да/нет)?',
              options: ['dass', 'wenn', 'ob', 'weil'],
              correctAnswer: 'ob',
              explanation: 'Союз "ob" переводится как "ли" и вводит косвенный вопрос.'
            },
            {
              id: 'b1-4-ex-2',
              type: 'word-order',
              question: 'Соберите вежливый вопрос: "Вы не знаете, придет ли автобус?"',
              correctAnswer: 'Wissen Sie ob der Bus kommt',
              options: ['Wissen', 'Sie', 'ob', 'der', 'Bus', 'kommt'],
              explanation: 'В косвенном вопросе (придаточном) глагол "kommt" стоит в конце.'
            }
          ]
        },
        {
          id: 'b1-5-arbeit-passiv',
          title: 'B1.5 Мир труда: Процессы и Passiv',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🏭</span> Описание процессов (Passiv)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На работе пассивный залог крайне важен для описания того, <strong>что</strong> делается, а не <strong>кем</strong>.
                </p>

                <div class="space-y-4 mb-6">
                  <div class="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <h3 class="font-bold text-sm mb-1">Пример процесса:</h3>
                    <p class="text-sm italic">"Zuerst <strong>wird</strong> die Ware <strong>bestellt</strong>." (Сначала товар заказывается)</p>
                    <p class="text-sm italic">"Dann <strong>wird</strong> sie <strong>geliefert</strong>." (Затем он доставляется)</p>
                    <p class="text-sm italic">"Schließlich <strong>wird</strong> die Rechnung <strong>bezahlt</strong>." (В конце оплачивается счет)</p>
                  </div>
                </div>

                <div class="bg-muted p-4 rounded-lg">
                  <h3 class="font-bold text-sm mb-2">Грамматический нюанс: von + Dativ</h3>
                  <p class="text-xs text-muted-foreground mb-2">Если всё же нужно указать, кто делает действие, используем предлог <strong>von</strong>:</p>
                  <p class="text-sm font-medium">"Der Brief wird <strong>vom</strong> Chef (von dem Chef) unterschrieben." </p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Бизнес-процессы',
              words: [
                { type: 'noun', german: 'Ware', russian: 'товар', article: 'die', plural: 'Waren', pluralArticle: 'die', exampleSingular: 'Die Ware ist da.', examplePlural: '-' },
                { type: 'noun', german: 'Lieferung', russian: 'доставка', article: 'die', plural: 'Lieferungen', pluralArticle: 'die', exampleSingular: 'Schnelle Lieferung.', examplePlural: '-' },
                { type: 'noun', german: 'Rechnung', russian: 'счет', article: 'die', plural: 'Rechnungen', pluralArticle: 'die', exampleSingular: 'Rechnung bezahlen.', examplePlural: '-' },
                { type: 'noun', german: 'Auftrag', russian: 'заказ/поручение', article: 'der', plural: 'Aufträge', pluralArticle: 'die', exampleSingular: 'Einen Auftrag erhalten.', examplePlural: '-' },
                { type: 'noun', german: 'Unterschrift', russian: 'подпись', article: 'die', plural: 'Unterschriften', pluralArticle: 'die', exampleSingular: 'Ihre Unterschrift, bitte.', examplePlural: '-' },
                { type: 'verb', german: 'bestellen', russian: 'заказывать', conjugation: 'es wird bestellt', example: 'Material wird bestellt.' },
                { type: 'verb', german: 'liefern', russian: 'доставлять', conjugation: 'es wird geliefert', example: 'Das Paket wurde geliefert.' },
                { type: 'verb', german: 'bezahlen', russian: 'оплачивать', conjugation: 'es wird bezahlt', example: 'Die Rechnung ist bezahlt.' },
                { type: 'verb', german: 'unterschreiben', russian: 'подписывать', conjugation: 'es wird unterschrieben', example: 'Vertrag unterschreiben.' },
                { type: 'verb', german: 'prüfen', russian: 'проверять', conjugation: 'es wird geprüft', example: 'Qualität prüfen.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-5-ex-1',
              type: 'fill-in-the-blank',
              question: 'Der Brief wird ___ Chef unterschrieben. (Шефом - von + dem)',
              correctAnswer: 'vom',
              explanation: 'Действующее лицо в пассиве вводится предлогом "von" + Dativ (von + dem = vom).'
            },
            {
              id: 'b1-5-ex-2',
              type: 'multiple-choice',
              question: 'Как сказать "Товар доставляется"?',
              options: ['Die Ware liefert.', 'Die Ware wird geliefert.', 'Die Ware ist geliefert.', 'Die Ware hat geliefert.'],
              correctAnswer: 'Die Ware wird geliefert.',
              explanation: 'Passiv Präsens подчеркивает процесс доставки.'
            }
          ]
        },
        {
          id: 'b1-6-beziehung-konflikt',
          title: 'B1.6 Отношения: Конфликт',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🤝</span> Взаимные глаголы (Reziproke Verben)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда действие направлено друг на друга. Чаще всего используется местоимение <strong>sich</strong> (во мн.ч.) или слово <strong>einander</strong> (друг друга).
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted/50 rounded-lg border">
                    <h3 class="font-bold mb-2">Использование "sich":</h3>
                    <p class="italic text-sm">"Wir <strong>streiten uns</strong>." (Мы ссоримся друг с другом)</p>
                    <p class="italic text-sm">"Sie <strong>verstehen sich</strong> gut." (Они хорошо понимают друг друга)</p>
                  </div>
                  <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 class="font-bold mb-2 text-primary">Использование "einander":</h3>
                    <p class="italic text-sm">"Wir helfen <strong>einander</strong>." (Мы помогаем друг другу)</p>
                    <p class="italic text-sm">"Sie vertrauen <strong>einander</strong>." (Они доверяют друг другу)</p>
                  </div>
                </div>

                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm">💡 <strong>Различие:</strong> <em>sich</em> — более привычно для повседневных глаголов, <em>einander</em> — подчеркивает взаимность и часто используется с предлогами: <strong>"voneinander lernen"</strong> (учиться друг у друга).</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Конфликт и Отношения',
              words: [
                { type: 'noun', german: 'Beziehung', russian: 'отношения', article: 'die', plural: 'Beziehungen', pluralArticle: 'die', exampleSingular: 'Wir haben eine gute Beziehung.', examplePlural: '-' },
                { type: 'noun', german: 'Streit', russian: 'ссора', article: 'der', plural: 'Streite', pluralArticle: 'die', exampleSingular: 'Wegen einer Kleinigkeit streiten.', examplePlural: '-' },
                { type: 'noun', german: 'Kompromiss', russian: 'компромисс', article: 'der', plural: 'Kompromisse', pluralArticle: 'die', exampleSingular: 'Einen Kompromiss finden.', examplePlural: '-' },
                { type: 'noun', german: 'Vertrauen', russian: 'доверие', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Vertrauen ist wichtig.', examplePlural: '-' },
                { type: 'noun', german: 'Mussverständnis', russian: 'недопонимание', article: 'das', plural: 'Missverständnisse', pluralArticle: 'die', exampleSingular: 'Ein Missverständnis klären.', examplePlural: '-' },
                { type: 'verb', german: 'streiten (sich)', russian: 'ссориться', conjugation: 'wir streiten uns', example: 'Warum streitet ihr euch?' },
                { type: 'verb', german: 'diskutieren', russian: 'обсуждать', conjugation: 'wir diskutieren', example: 'Über das Problem diskutieren.' },
                { type: 'verb', german: 'vertrauen', russian: 'доверять', conjugation: 'ich vertraue dir', example: 'Ich vertraue dir blind.' },
                { type: 'verb', german: 'verzeihen', russian: 'прощать', conjugation: 'ich verzeihe', example: 'Kannst du mir verzeihen?' },
                { type: 'verb', german: 'respektieren', russian: 'респектировать/уважать', conjugation: 'ich respektiere', example: 'Gegenseitiger Respekt.' },
                { type: 'adjective', german: 'ehrlich', russian: 'честный', comparative: 'ehrlicher', superlative: 'am ehrlichsten', example: 'Sei ehrlich zu mir.' },
                { type: 'adjective', german: 'treu', russian: 'верный', comparative: 'treuer', superlative: 'am treuesten', example: 'Ein treuer Freund.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-6-ex-1',
              type: 'multiple-choice',
              question: 'Как сказать "Мы помогаем друг другу"?',
              options: ['Wir helfen sich.', 'Wir helfen uns.', 'Wir helfen einander.', 'Wir helfen uns gegenseitig.'],
              correctAnswer: 'Wir helfen einander.',
              explanation: '"Einander" подчеркивает взаимность действия между людьми.'
            },
            {
              id: 'b1-6-ex-2',
              type: 'fill-in-the-blank',
              question: 'Warum streitet ihr ___ ? (Ссоритесь - возвратный глагол)',
              correctAnswer: 'euch',
              explanation: 'Для местоимения "ihr" возвратная частица — "euch".'
            }
          ]
        },
        {
          id: 'b1-7-zukunft-karriere',
          title: 'B1.7 Будущее: Карьера',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🎓</span> Родительный падеж (Genitiv)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Используется для обозначения принадлежности ("кого?/чего?") и с определенными предлогами. На уровне B1 важны предлоги: <strong>wegen</strong>, <strong>während</strong>, <strong>trotz</strong>.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">wegen</span>
                    <span class="text-xs text-muted-foreground italic">Wegen des Jobs</span>
                    <span class="text-[10px] mt-1">(Из-за работы)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">während</span>
                    <span class="text-xs text-muted-foreground italic">Während der Prüfung</span>
                    <span class="text-[10px] mt-1">(Во время экзамена)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">trotz</span>
                    <span class="text-xs text-muted-foreground italic">Trotz des Regens</span>
                    <span class="text-[10px] mt-1">(Несмотря на дождь)</span>
                  </div>
                </div>

                <div class="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                  <h3 class="font-bold text-sm mb-2">Правила артикля (Genitiv):</h3>
                  <div class="space-y-1 text-sm">
                    <p>• <strong>der / das</strong> -> <strong>des</strong> (к сущ. добавляется <strong>-s</strong> или <strong>-es</strong>)</p>
                    <p>• <strong>die / мн.ч.</strong> -> <strong>der</strong> </p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Карьера и Образование',
              words: [
                { type: 'noun', german: 'Ausbildung', russian: 'проф. обучение', article: 'die', plural: 'Ausbildungen', pluralArticle: 'die', exampleSingular: 'Eine Ausbildung machen.', examplePlural: '-' },
                { type: 'noun', german: 'Studium', russian: 'учеба в вузе', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Nach dem Studium.', examplePlural: '-' },
                { type: 'noun', german: 'Praktikum', russian: 'практика', article: 'das', plural: 'Praktika', pluralArticle: 'die', exampleSingular: 'Ein Praktikum absolvieren.', examplePlural: '-' },
                { type: 'noun', german: 'Erfahrung', russian: 'опыт', article: 'die', plural: 'Erfahrungen', pluralArticle: 'die', exampleSingular: 'Berufserfahrung sammeln.', examplePlural: '-' },
                { type: 'noun', german: 'Karriere', russian: 'карьера', article: 'die', plural: 'Karrieren', pluralArticle: 'die', exampleSingular: 'Karriere machen.', examplePlural: '-' },
                { type: 'noun', german: 'Unterlagen', russian: 'документы', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: '(мн.ч) Bewerbungsunterlagen.', examplePlural: '-' },
                { type: 'verb', german: 'sich bewerben', russian: 'подавать заявку', conjugation: 'ich bewerbe mich um', example: 'Um eine Stelle bewerben.' },
                { type: 'verb', german: 'bestehen', russian: 'сдавать (экзамен)', conjugation: 'ich habe bestanden', example: 'Die Prüfung bestehen.' },
                { type: 'verb', german: 'abschließen', russian: 'заканчивать/завершать', conjugation: 'ich schließe ab', example: 'Das Studium abschließen.' },
                { type: 'adjective', german: 'erfolgreich', russian: 'успешный', comparative: 'erfolgreicher', superlative: 'am erfolgreichsten', example: 'Ein erfolgreicher Abschluss.' },
                { type: 'adjective', german: 'beruflich', russian: 'профессиональный', comparative: '-', superlative: '-', example: 'Berufliche Ziele.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-7-ex-1',
              type: 'multiple-choice',
              question: 'Какое окончание получает мужской род в Genitiv (Wegen des Job__)?',
              options: ['-e', '-en', '-s', '-er'],
              correctAnswer: '-s',
              explanation: 'В Genitiv существительные мужского и среднего рода получают окончание -s или -es.'
            },
            {
              id: 'b1-7-ex-2',
              type: 'fill-in-the-blank',
              question: 'Trotz ___ Regens gehen wir spazieren. (Несмотря на дождь - Genitiv der)',
              correctAnswer: 'des',
              explanation: 'Предлог "trotz" требует Genitiv. Артикль "der" (Regen) меняется на "des".'
            }
          ]
        },
        {
          id: 'b1-8-zukunft-plaene',
          title: 'B1.8 Будущее: Планы',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🚀</span> Планы на будущее (Futur I)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Мы используем <strong>Futur I</strong> не только для событий в будущем, но и для планов, намерений и обещаний.
                </p>

                <div class="bg-muted p-4 rounded-lg mb-6 text-center">
                  <span class="font-mono text-xl"> <strong>werden</strong> + ... + <strong>Infinitiv</strong> </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 border border-border rounded-lg bg-green-50/50">
                    <h4 class="font-bold mb-2">Намерение (Absicht):</h4>
                    <p class="text-sm italic">"Ich <strong>werde</strong> mehr Sport machen."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Я буду больше заниматься спортом)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-blue-50/50">
                    <h4 class="font-bold mb-2">Прогноз (Prognose):</h4>
                    <p class="text-sm italic">"Nächstes Jahr <strong>wirst</strong> du fließend sprechen."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(В следующем году ты будешь говорить бегло)</p>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">💡 <strong>Важно:</strong> Если действие точно произойдет по расписанию, можно использовать и <em>Präsens</em> с наречием времени: <strong>"Morgen fliege ich."</strong></p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Мечты и Планы',
              words: [
                { type: 'noun', german: 'Zukunft', russian: 'будущее', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Zukunft gestalten.', examplePlural: '-' },
                { type: 'noun', german: 'Plan', russian: 'план', article: 'der', plural: 'Pläne', pluralArticle: 'die', exampleSingular: 'Einen Plan machen.', examplePlural: '-' },
                { type: 'noun', german: 'Traum', russian: 'мечта', article: 'der', plural: 'Träume', pluralArticle: 'die', exampleSingular: 'Meinen Traum verwirklichen.', examplePlural: '-' },
                { type: 'noun', german: 'Ziel', russian: 'цель', article: 'das', plural: 'Ziele', pluralArticle: 'die', exampleSingular: 'Mein Ziel erreichen.', examplePlural: '-' },
                { type: 'noun', german: 'Vorsatz', russian: 'намерение', article: 'der', plural: 'Vorsätze', pluralArticle: 'die', exampleSingular: 'Gute Vorsätze для нового года.', examplePlural: '-' },
                { type: 'verb', german: 'planen', russian: 'планировать', conjugation: 'ich plane', example: 'Die Reise заранее планировать.' },
                { type: 'verb', german: 'hoffen', russian: 'надеяться', conjugation: 'ich hoffe auf', example: 'Ich hoffe auf das Beste.' },
                { type: 'verb', german: 'träumen', russian: 'мечтать о', conjugation: 'ich träume von', example: 'Vom eigenen Haus träumen.' },
                { type: 'verb', german: 'erreichen', russian: 'достигать', conjugation: 'ich erreiche', example: 'Das Ziel endlich erreichen.' },
                { type: 'verb', german: 'versprechen', russian: 'обещать', conjugation: 'ich verspreche', example: 'Ich verspreche es dir.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-8-ex-1',
              type: 'fill-in-the-blank',
              question: 'Nächstes Jahr ___ ich fließend Deutsch sprechen. (Буду - Futur I)',
              correctAnswer: 'werde',
              explanation: 'Futur I образуется с помощью "werden" + инфинитив в конце.'
            },
            {
              id: 'b1-8-ex-2',
              type: 'word-order',
              question: 'Соберите фразу: "Я достигну своей цели."',
              correctAnswer: 'Ich werde mein Ziel erreichen',
              options: ['Ich', 'werde', 'mein', 'Ziel', 'erreichen'],
              explanation: 'Глагол "werden" на втором месте, смысловой глагол в инфинитиве — в самом конце.'
            }
          ]
        },
        {
          id: 'b1-9-plaene-ziele',
          title: 'B1.9 Планы и Намерения',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🎯</span> Инфинитив с "zu" (Infinitiv mit zu)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Конструкция используется после определенных глаголов, прилагательных и существительных. Она позволяет избежать повторения подлежащего.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 class="font-bold mb-2">После глаголов:</h3>
                    <p class="text-sm italic">"Ich <strong>plane</strong>, nächstes Jahr <strong>zu</strong> reisen."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Я планирую путешествовать в следующем году)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-accent/5">
                    <h3 class="font-bold mb-2 text-accent">После прилагательных:</h3>
                    <p class="text-sm italic">"Es ist <strong>wichtig</strong>, Deutsch <strong>zu</strong> lernen."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Важно учить немецкий)</p>
                  </div>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p class="text-sm">⚠️ <strong>Внимание:</strong> Глаголы с отделяемыми приставками ставят <strong>zu</strong> между приставкой и основой: <em>"подниматься" -> auf<strong>zu</strong>stehen</em>.</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Намерения и Жизненные цели',
              words: [
                { type: 'verb', german: 'versuchen', russian: 'пытаться', conjugation: 'ich versuche', example: 'Ich versuche, gesund zu leben.' },
                { type: 'verb', german: 'beschließen', russian: 'решать/принимать решение', conjugation: 'ich beschließe', example: 'Ich habe beschlossen, umzuziehen.' },
                { type: 'verb', german: 'vergessen', russian: 'забывать', conjugation: 'ich vergesse', example: 'Vergiss nicht, mich anzurufen.' },
                { type: 'verb', german: 'vorhaben', russian: 'намереваться', conjugation: 'ich habe vor', example: 'Was hast du heute vor?' },
                { type: 'noun', german: 'Absicht', russian: 'намерение', article: 'die', plural: 'Absichten', pluralArticle: 'die', exampleSingular: 'Ich habe die Absicht...', examplePlural: '-' },
                { type: 'adjective', german: 'bereit', russian: 'готовый', comparative: '-', superlative: '-', example: 'Ich bin bereit, zu helfen.' },
                { type: 'adjective', german: 'notwendig', russian: 'необходимый', comparative: 'notwendiger', superlative: 'am notwendigsten', example: 'Es ist notwendig, zu sparen.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-9-ex-1',
              type: 'fill-in-the-blank',
              question: 'Ich versuche, jeden Tag Sport ___ machen.',
              correctAnswer: 'zu',
              explanation: 'После "versuchen" используется инфинитив с "zu".'
            },
            {
              id: 'b1-9-ex-2',
              type: 'multiple-choice',
              question: 'Как правильно добавить "zu" к глаголу "anrufen"?',
              options: ['zu anrufen', 'anzurufern', 'anzurufen', 'anrufen zu'],
              correctAnswer: 'anzurufen',
              explanation: 'В глаголах с отделяемыми приставками "zu" ставится между приставкой и основой.'
            }
          ]
        },
        {
          id: 'b1-10-geschichte-passiv',
          title: 'B1.10 История и Пассив',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🏛️</span> Пассив в прошедшем времени (Präteritum Passiv)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Используется для описания исторических событий или процессов в прошлом, где само действие важнее исполнителя.
                </p>

                <div class="bg-muted p-4 rounded-lg mb-6 text-center">
                  <span class="font-mono text-xl"> <strong>wurde</strong> + ... + <strong>Partizip II</strong> </span>
                </div>

                <div class="space-y-4">
                  <div class="p-3 border-l-4 border-primary bg-primary/5">
                    <p class="text-sm font-bold italic">"Die Mauer <strong>wurde</strong> 1989 <strong>geöffnet</strong>."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Стена была открыта в 1989 году)</p>
                  </div>
                  <div class="p-3 border-l-4 border-accent bg-accent/5 text-sm">
                    <p><strong>ich / er / sie wurde</strong></p>
                    <p><strong>wir / sie wurden</strong></p>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <p class="text-sm">💡 <strong>Совет:</strong> Это основное время для написания рефератов и исторических очерков.</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'История и Общество',
              words: [
                { type: 'noun', german: 'Mauer', russian: 'стена', article: 'die', plural: 'Mauern', pluralArticle: 'die', exampleSingular: 'Die Berliner Mauer.', examplePlural: '-' },
                { type: 'noun', german: 'Wiedervereinigung', russian: 'воссоединение', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die deutsche Wiedervereinigung.', examplePlural: '-' },
                { type: 'noun', german: 'Krieg', russian: 'война', article: 'der', plural: 'Kriege', pluralArticle: 'die', exampleSingular: 'Der Zweite Weltkrieg.', examplePlural: '-' },
                { type: 'noun', german: 'Ereignis', russian: 'событие', article: 'das', plural: 'Ereignisse', pluralArticle: 'die', exampleSingular: 'Ein wichtiges Ereignis.', examplePlural: '-' },
                { type: 'verb', german: 'gründen', russian: 'основывать', conjugation: 'es wurde gegründet', example: 'Die Firma wurde 1950 gegründet.' },
                { type: 'verb', german: 'zerstören', russian: 'разрушать', conjugation: 'es wurde zerstört', example: 'Die Stadt wurde im Krieg zerstört.' },
                { type: 'verb', german: 'bauen', russian: 'строить', conjugation: 'es wurde gebaut', example: 'Das Haus wurde schnell gebaut.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-10-ex-1',
              type: 'fill-in-the-blank',
              question: 'Berlin ___ 1945 stark zerstört. (Было разрушено - Präteritum Passiv)',
              correctAnswer: 'wurde',
              explanation: 'Präteritum Passiv образуется с помощью "wurde" + Partizip II.'
            },
            {
              id: 'b1-10-ex-2',
              type: 'multiple-choice',
              question: 'Как перевести "Die Firma wurde gegründet"?',
              options: ['Фирма основывает', 'Фирма основала', 'Фирма была основана', 'Фирма основывается'],
              correctAnswer: 'Фирма была основана',
              explanation: 'Это пассивная конструкция в прошедшем времени.'
            }
          ]
        },
        {
          id: 'b1-11-gesundheit',
          title: 'B1.11 Здоровье и Советы',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🏥</span> Советы и рекомендации (Konjunktiv II)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда мы даем вежливые советы или рекомендации по здоровью, мы используем модальный глагол <strong>sollen</strong> в форме <strong>Konjunktiv II</strong>.
                </p>

                <div class="bg-muted p-4 rounded-lg mb-6 text-center">
                  <span class="font-mono text-xl"> <strong>sollte</strong> (+n / +st / +ten)</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 border border-border rounded-lg bg-green-50/50">
                    <h4 class="font-bold mb-2">Совет (Rat):</h4>
                    <p class="text-sm italic">"Du <strong>solltest</strong> mehr Wasser trinken."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Тебе следовало бы пить больше воды)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-red-50/50">
                    <h4 class="font-bold mb-2">При симптомах:</h4>
                    <p class="text-sm italic">"Sie <strong>sollten</strong> zum Arzt gehen."</p>
                    <p class="text-xs text-muted-foreground mt-1">(Вам следовало бы пойти к врачу)</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Здоровье и Тело',
              words: [
                { type: 'noun', german: 'Symptom', russian: 'симптом', article: 'das', plural: 'Symptome', pluralArticle: 'die', exampleSingular: 'Welche Symptome haben Sie?', examplePlural: '-' },
                { type: 'noun', german: 'Schmerz', russian: 'боль', article: 'der', plural: 'Schmerzen', pluralArticle: 'die', exampleSingular: 'Kopfschmerzen haben.', examplePlural: '-' },
                { type: 'noun', german: 'Rezept', russian: 'рецепт (медицинский)', article: 'das', plural: 'Rezepte', pluralArticle: 'die', exampleSingular: 'Ein Rezept verschreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Apotheke', russian: 'аптека', article: 'die', plural: 'Apotheken', pluralArticle: 'die', exampleSingular: 'In die Apotheke gehen.', examplePlural: '-' },
                { type: 'verb', german: 'untersuchen', russian: 'обследовать', conjugation: 'der Arzt untersucht', example: 'Den Patienten untersuchen.' },
                { type: 'verb', german: 'verschreiben', russian: 'выписывать (лекарство)', conjugation: 'er verschreibt', example: 'Ein Medikament verschreiben.' },
                { type: 'verb', german: 'sich fühlen', russian: 'чувствовать себя', conjugation: 'ich fühle mich', example: 'Ich fühle mich heute besser.' },
                { type: 'adjective', german: 'gesund', russian: 'здоровый/полезный', comparative: 'gesünder', superlative: 'am gesündesten', example: 'Gesundes Essen.' },
                { type: 'adjective', german: 'schwach', russian: 'слабый', comparative: 'schwächer', superlative: 'am schwächsten', example: 'Ich fühle mich noch schwach.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-11-ex-1',
              type: 'fill-in-the-blank',
              question: 'Du ___ (следует) zum Arzt gehen.',
              correctAnswer: 'solltest',
              explanation: 'Для вежливого совета используется форма "solltest".'
            },
            {
              id: 'b1-11-ex-2',
              type: 'multiple-choice',
              question: 'Что означает "verschreiben"?',
              options: ['Переписывать', 'Выписывать (рецепт)', 'Писать много', 'Подписывать'],
              correctAnswer: 'Выписывать (рецепт)',
              explanation: 'Глагол "verschreiben" используется врачами для назначения лекарств.'
            }
          ]
        },
        {
          id: 'b1-12-reisen-kultur',
          title: 'B1.12 Путешествия и Культура',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🌍</span> Культурные различия
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне B1 важно уметь описывать не только саму поездку, но и свои впечатления, сравнивая культуры и выражая мнения.
                </p>

                <div class="p-4 bg-muted rounded-lg border">
                  <h3 class="font-bold mb-2">Фразы для выражения мнения:</h3>
                  <p class="text-sm mb-1">• <strong>Meiner Meinung nach</strong> (+ Verb)... (По моему мнению...)</p>
                  <p class="text-sm mb-1">• <strong>Ich bin der Ansicht</strong>, dass... (Я придерживаюсь мнения, что...)</p>
                  <p class="text-sm">• <strong>Im Vergleich zu</strong> (+ Dativ)... (По сравнению с...)</p>
                </div>

                <div class="mt-4 bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                  <p class="text-sm italic">"<strong>Im Vergleich zu</strong> Deutschland ist das Wetter hier wärmer."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Туризм и Впечатления',
              words: [
                { type: 'noun', german: 'Sehenswürdigkeit', russian: 'достопримечательность', article: 'die', plural: 'Sehenswürdigkeiten', pluralArticle: 'die', exampleSingular: 'Berühmte Sehenswürdigkeit.', examplePlural: '-' },
                { type: 'noun', german: 'Eindruck', russian: 'впечатление', article: 'der', plural: 'Eindrücke', pluralArticle: 'die', exampleSingular: 'Einen guten Eindruck machen.', examplePlural: '-' },
                { type: 'noun', german: 'Unterschied', russian: 'различие', article: 'der', plural: 'Unterschiede', pluralArticle: 'die', exampleSingular: 'Ein großer Unterschied.', examplePlural: '-' },
                { type: 'noun', german: 'Erfahrung', russian: 'опыт/впечатление', article: 'die', plural: 'Erfahrungen', pluralArticle: 'die', exampleSingular: 'Eine tolle Erfahrung.', examplePlural: '-' },
                { type: 'verb', german: 'besichtigen', russian: 'осматривать', conjugation: 'ich besichtige', example: 'Die Altstadt besichtigen.' },
                { type: 'verb', german: 'vergleichen', russian: 'сравнивать', conjugation: 'er vergleicht', example: 'Preise vergleichen.' },
                { type: 'verb', german: 'buchen', russian: 'бронировать', conjugation: 'ich buche', example: 'Ein Hotelzimmer buchen.' },
                { type: 'adjective', german: 'beeindruckend', russian: 'впечатляющий', comparative: 'beeindruckender', superlative: 'am beeindruckendsten', example: 'Eine beeindruckende Kirche.' },
                { type: 'adjective', german: 'fremd', russian: 'чужой/иностранный', comparative: '-', superlative: '-', example: 'Eine fremde Kultur.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b1-12-ex-1',
              type: 'fill-in-the-blank',
              question: '___ Meinung nach ist Berlin toll. (По моему мнению)',
              correctAnswer: 'Meiner',
              explanation: 'Фраза "Meiner Meinung nach" требует Genitiv (Meinung — ж.р.).'
            },
            {
              id: 'b1-12-ex-2',
              type: 'word-order',
              question: 'Соберите фразу: "Я хотел бы забронировать номер."',
              correctAnswer: 'Ich möchte ein Zimmer buchen',
              options: ['Ich', 'möchte', 'ein', 'Zimmer', 'buchen'],
              explanation: 'Модальный глагол на втором месте, инфинитив в конце.'
            }
          ]
        }
      ]
    },
    {
      id: 'b2',
      title: 'Уровень B2: Продвинутый (Fortgeschrittene)',
      description: 'Deutsch für den Beruf. Подготовка к профессиональной деятельности и экзамену B2 Beruf.',
      topics: [
        {
          id: 'b2-1-job-bewerbung',
          title: 'B2.1 Работа: Заявка',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">💼</span> Konjunktiv II: Вежливость и возможности
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне B2 вы должны звучать профессионально. <strong>Konjunktiv II</strong> используется для вежливых просьб (höfliche Bitte) и гипотетических ситуаций.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Вежливые формы (würde / hätte / wäre):</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">würde + Infinitiv</span>
                    <span class="text-xs text-muted-foreground italic">Ich würde mich freuen.</span>
                    <span class="text-[10px] mt-1">(Я был бы рад)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">hätte</span>
                    <span class="text-xs text-muted-foreground italic">Ich hätte eine Frage.</span>
                    <span class="text-[10px] mt-1">(У меня был бы вопрос)</span>
                  </div>
                  <div class="bg-muted p-3 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-primary">wäre</span>
                    <span class="text-xs text-muted-foreground italic">Das wäre toll.</span>
                    <span class="text-[10px] mt-1">(Это было бы здорово)</span>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Фразы для собеседования:</h3>
                <div class="space-y-3">
                  <div class="p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <p class="font-bold text-sm italic">"Über eine Einladung zu einem persönlichen Gespräch <strong>würde</strong> ich <strong>mich</strong> sehr <strong>freuen</strong>."</p>
                    <p class="text-xs text-muted-foreground mt-1">Я был бы очень рад приглашению на личную беседу.</p>
                  </div>
                  <div class="p-3 border-l-4 border-accent bg-accent/5 rounded-r-lg">
                    <p class="font-bold text-sm italic">"<strong>Könnten</strong> Sie mir bitte sagen, wann die Stelle frei <strong>wäre</strong>?"</p>
                    <p class="text-xs text-muted-foreground mt-1">Не могли бы вы сказать, когда вакансия будет свободна?</p>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <p class="text-sm">📝 <strong>Nomen-Verb-Verbindungen:</strong> На этом уровне вместо глагола "bewerben" мы используем устойчивое выражение "eine Bewerbung einreichen" (подать заявку).</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Трудоустройство и Резюме',
              words: [
                { type: 'noun', german: 'Lebenslauf', russian: 'резюме', article: 'der', plural: 'Lebensläufe', pluralArticle: 'die', exampleSingular: 'Ein lückenloser Lebenslauf.', examplePlural: 'Wir prüfen alle Lebensläufe.' },
                { type: 'noun', german: 'Anschreiben', russian: 'сопроводительное письмо', article: 'das', plural: 'Anschreiben', pluralArticle: 'die', exampleSingular: 'Ein überzeugendes Anschreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Voraussetzung', russian: 'условие/предпосылка', article: 'die', plural: 'Voraussetzungen', pluralArticle: 'die', exampleSingular: 'Eine wichtige Voraussetzung.', examplePlural: 'Erfüllen Sie die Voraussetzungen?' },
                { type: 'noun', german: 'Erfahrung', russian: 'опыт', article: 'die', plural: 'Erfahrungen', pluralArticle: 'die', exampleSingular: 'Langjährige Erfahrung.', examplePlural: 'Inlandserfahrungen sammeln.' },
                { type: 'noun', german: 'Kenntnisse', russian: 'знания/навыки', article: 'die', plural: 'Kenntnisse', pluralArticle: 'die', exampleSingular: 'Gute Computerkenntnisse.', examplePlural: 'Sprachkenntnisse verbessern.' },
                { type: 'verb', german: 'einreichen', russian: 'подавать (документы)', conjugation: 'er reicht ein', example: 'Bitte reichen Sie Ihre Unterlagen ein.' },
                { type: 'verb', german: 'entsprechen', russian: 'соответствовать', conjugation: 'es entspricht', example: 'Das entspricht meinen Erwartungen.' },
                { type: 'verb', german: 'verfolgen', russian: 'преследовать (цели)', conjugation: 'er verfolgt', example: 'Er verfolgt seine Ziele konsequent.' },
                { type: 'adjective', german: 'ausführlich', russian: 'подробный', comparative: 'ausführlicher', superlative: 'am ausführlichsten', example: 'Ein ausführlicher Bericht.' },
                { type: 'adjective', german: 'überzeugend', russian: 'убедительный', comparative: 'überzeugender', superlative: 'am überzeugendsten', example: 'Eine überzeugende Antwort.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-1-ex-1',
              type: 'multiple-choice',
              question: 'Что такое "Lebenslauf"?',
              options: ['Сопроводительное письмо', 'Резюме', 'Трудовой договор', 'Свидетельство'],
              correctAnswer: 'Резюме',
              explanation: '"der Lebenslauf" переводится как резюме или автобиография.'
            },
            {
              id: 'b2-1-ex-2',
              type: 'word-order',
              question: 'Соберите предложение: "Пожалуйста, подайте ваши документы."',
              correctAnswer: 'Bitte reichen Sie Ihre Unterlagen ein',
              options: ['Bitte', 'Ihre', 'ein', 'reichen', 'Sie', 'Unterlagen'],
              explanation: 'Глагол "einreichen" является отделяемым, поэтому приставка "ein" уходит в конец предложения.'
            },
            {
              id: 'b2-1-ex-3',
              type: 'free-text-sentence',
              question: 'Переведите на немецкий: "Это соответствует моим ожиданиям."',
              correctAnswer: 'Das entspricht meinen Erwartungen',
              explanation: 'Глагол "entsprechen" требует после себя падежа Dativ (Erwartungen).'
            }
          ]
        },
        {
          id: 'b2-2-office-communication',
          title: 'B2.2 Работа: Офис',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📎</span> Partizipialattribute (Причастные обороты)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне B2 причастия часто используются как сложные прилагательные перед существительным. Это позволяет сжать информацию.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Partizip I vs Partizip II как определения:</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="border p-4 rounded-lg bg-orange-50/50">
                    <h4 class="font-bold mb-2">Partizip I (Активное)</h4>
                    <p class="text-xs text-muted-foreground mb-2">Глагол + -d + окончание</p>
                    <p class="text-sm font-bold italic">"Die <strong>telefonierende</strong> Kollegin."</p>
                    <p class="text-[10px] mt-1">(Звонящая коллега — она сама звонит сейчас)</p>
                  </div>
                  <div class="border p-4 rounded-lg bg-blue-50/50">
                    <h4 class="font-bold mb-2 text-blue-700">Partizip II (Пассивное)</h4>
                    <p class="text-xs text-muted-foreground mb-2">ge-...-t + окончание</p>
                    <p class="text-sm font-bold italic">"Die <strong>geschriebene</strong> E-Mail."</p>
                    <p class="text-[10px] mt-1">(Написанное письмо — его кто-то написал)</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Деловая переписка:</h3>
                <div class="space-y-2 bg-muted p-4 rounded-lg text-sm italic">
                  <p>• "Sehr geehrte Damen und Herren," (Формально, если имя неизвестно)</p>
                  <p>• "Bezugnehmend auf unser Telefonat..." (Ссылаясь на наш телефонный разговор...)</p>
                  <p>• "Für Rückfragen stehe ich Ihnen gerne zur Verfügung." (Для уточняющих вопросов я в вашем распоряжении)</p>
                  <p>• "Mit freundlichen Grüßen" (С уважением)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Офис и Иерархия',
              words: [
                { type: 'noun', german: 'Abteilung', russian: 'отдел', article: 'die', plural: 'Abteilungen', pluralArticle: 'die', exampleSingular: 'Die Marketing-Abteilung.', examplePlural: 'Alle Abteilungen informieren.' },
                { type: 'noun', german: 'Besprechung', russian: 'совещание', article: 'die', plural: 'Besprechungen', pluralArticle: 'die', exampleSingular: 'Eine dringende Besprechung.', examplePlural: 'Termine für Besprechungen.' },
                { type: 'noun', german: 'Vorgesetzte', russian: 'начальник', article: 'der', plural: 'Vorgesetzten', pluralArticle: 'die', exampleSingular: 'Mein Vorgesetzter.', examplePlural: 'Mit Vorgesetzten sprechen.' },
                { type: 'noun', german: 'Protokoll', russian: 'протокол', article: 'das', plural: 'Protokolle', pluralArticle: 'die', exampleSingular: 'Das Protokoll führen.', examplePlural: 'Ergebnisse im Protokoll.' },
                { type: 'verb', german: 'protokollieren', russian: 'вести протокол', conjugation: 'er protokolliert', example: 'Meetings werden protokolliert.' },
                { type: 'verb', german: 'organisieren', russian: 'организовывать', conjugation: 'er organisiert', example: 'Er organisiert die Konferenz.' },
                { type: 'verb', german: 'leiten', russian: 'руководить', conjugation: 'er leitet', example: 'Sie leitet das Team.' },
                { type: 'adjective', german: 'zuständig', russian: 'ответственный (за что-то)', comparative: '-', superlative: '-', example: 'Wer ist hier zuständig?' },
                { type: 'adjective', german: 'zuverlässig', russian: 'надежный', comparative: 'zuverlässiger', superlative: 'am zuverlässigsten', example: 'Ein zuverlässiger Mitarbeiter.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-2-ex-1',
              type: 'multiple-choice',
              question: 'Как перевести "Die geschriebene E-Mail"?',
              options: ['Пишущееся письмо', 'Написанное письмо', 'Письмо, которое напишут', 'Писать письмо'],
              correctAnswer: 'Написанное письмо',
              explanation: 'Partizip II в роли определения выражает завершенное действие или пассивное состояние.'
            },
            {
              id: 'b2-2-ex-2',
              type: 'fill-in-the-blank',
              question: 'Die ___ (звонящая) Kollegin.',
              correctAnswer: 'telefonierende',
              explanation: 'Partizip I (Infinitiv + d) выражает активное действие в процессе.'
            }
          ]
        },
        {
          id: 'b2-3-projekt-management',
          title: 'B2.3 Работа: Проект-менеджмент',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📊</span> Nominalisierung (Номинализация)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В деловом языке часто используют существительные вместо глаголов. Это делает речь более официальной и сжатой.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Как превратить действие в существительное:</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 bg-muted rounded-lg font-mono text-xs">
                    <p class="text-primary font-bold mb-1">Глагол -> Существительное (das + Infinitiv)</p>
                    <p>planen -> <strong>das Planen</strong></p>
                    <p>entscheiden -> <strong>das Entscheiden</strong></p>
                  </div>
                  <div class="p-4 bg-muted rounded-lg font-mono text-xs">
                    <p class="text-accent font-bold mb-1">Глагол -> Существительное (-ung)</p>
                    <p>planen -> <strong>die Planung</strong></p>
                    <p>lösen -> <strong>die Lösung</strong></p>
                  </div>
                </div>

                <div class="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <p class="font-bold text-sm italic">"Die <strong>Planung</strong> dieses Projekts beansprucht viel Zeit."</p>
                  <p class="text-xs text-muted-foreground mt-1">(Планирование этого проекта занимает много времени)</p>
                </div>

                <div class="mt-6 p-4 bg-muted rounded-lg">
                  <p class="text-sm">📝 <strong>Типичные суффиксы:</strong> -ung (die), -heit/-keit (die), -ismus (der), -schaft (die).</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Проект-менеджмент',
              words: [
                { type: 'noun', german: 'Meilenstein', russian: 'веха/этап', article: 'der', plural: 'Meilensteine', pluralArticle: 'die', exampleSingular: 'Einen Meilenstein erreichen.', examplePlural: 'Alle Meilensteine planen.' },
                { type: 'noun', german: 'Frist', russian: 'срок/дедлайн', article: 'die', plural: 'Fristen', pluralArticle: 'die', exampleSingular: 'Eine kurze Frist.', examplePlural: 'Fristen einhalten.' },
                { type: 'noun', german: 'Ressource', russian: 'ресурс', article: 'die', plural: 'Ressourcen', pluralArticle: 'die', exampleSingular: 'Personelle Ressourcen.', examplePlural: 'Ressourcen effizient nutzen.' },
                { type: 'noun', german: 'Zuständigkeit', russian: 'компетенция/ответственность', article: 'die', plural: 'Zuständigkeiten', pluralArticle: 'die', exampleSingular: 'Klare Zuständigkeiten.', examplePlural: '-' },
                { type: 'noun', german: 'Ablauf', russian: 'процесс/ход событий', article: 'der', plural: 'Abläufe', pluralArticle: 'die', exampleSingular: 'Der reibungslose Ablauf.', examplePlural: 'Arbeitsabläufe optimieren.' },
                { type: 'verb', german: 'koordinieren', russian: 'координировать', conjugation: 'er koordiniert', example: 'Termine koordinieren.' },
                { type: 'verb', german: 'überwachen', russian: 'контролировать/мониторить', conjugation: 'er überwacht', example: 'Den Fortschritt überwachen.' },
                { type: 'verb', german: 'umsetzen', russian: 'реализовывать', conjugation: 'er setzt um', example: 'Pläne umsetzen.' },
                { type: 'verb', german: 'beteiligen', russian: 'участвовать/привлекать', conjugation: 'er beteiligt', example: 'Stakeholder beteiligen.' },
                { type: 'adjective', german: 'effizient', russian: 'эффективный', comparative: 'effizienter', superlative: 'am effizientesten', example: 'Effizientes Zeitmanagement.' },
                { type: 'adjective', german: 'fristgerecht', russian: 'в срок', comparative: '-', superlative: '-', example: 'Die Lieferung erfolgte fristgerecht.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-3-ex-1',
              type: 'multiple-choice',
              question: 'Как правильно номинализировать глагол "planen" (планирование)?',
              options: ['das Plan', 'die Planung', 'der Planer', 'планировка'],
              correctAnswer: 'die Planung',
              explanation: 'Суффикс "-ung" превращает глагол в существительное женского рода, обозначающее процесс.'
            },
            {
              id: 'b2-3-ex-2',
              type: 'fill-in-the-blank',
              question: 'Wir müssen eine ___ (решение) treffen.',
              correctAnswer: 'Entscheidung',
              explanation: '"Eine Entscheidung treffen" — устойчивое сочетание (Nomen-Verb-Verbindung).'
            }
          ]
        },
        {
          id: 'b2-4-conflict',
          title: 'B2.4 Работа: Конфликт-менеджмент',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🤝</span> Субъективное значение модальных глаголов
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В конфликтных ситуациях мы часто выражаем предположения или сомнения. Для этого используются модальные глаголы в <strong>субъективном</strong> значении.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Степень уверенности:</h3>
                <div class="space-y-3 mb-6">
                  <div class="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <span class="font-bold">müssen / müsste</span>
                    <span class="text-sm">90-100% уверенности ("должно быть")</span>
                  </div>
                  <div class="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <span class="font-bold">dürfte</span>
                    <span class="text-sm">75% уверенности ("вероятно")</span>
                  </div>
                  <div class="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <span class="font-bold">könnte / mag</span>
                    <span class="text-sm">50% уверенности ("может быть")</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="border p-4 rounded-lg bg-red-50/50">
                    <h4 class="font-bold mb-2">Пример претензии:</h4>
                    <p class="text-sm italic">"Das <strong>müsste</strong> ein Fehler in der Planung sein."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Это, должно быть, ошибка в планировании)</p>
                  </div>
                  <div class="border p-4 rounded-lg bg-green-50/50">
                    <h4 class="font-bold mb-2 text-green-700">Поиск решения:</h4>
                    <p class="text-sm italic">"Wir <strong>dürften</strong> bis Ende der Woche eine Lösung finden."</p>
                    <p class="text-[10px] text-muted-foreground mt-1">(Вероятно, мы найдем решение до конца недели)</p>
                  </div>
                </div>

                <div class="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p class="text-sm">⚖️ <strong>Стратегии деэскалации:</strong> Вместо "Du hast unrecht", используйте "Ich habe den Eindruck, dass..." или "Es <strong>könnte</strong> sein, dass..."</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Разрешение конфликтов',
              words: [
                { type: 'noun', german: 'Auseinandersetzung', russian: 'спор/дискуссия', article: 'die', plural: 'Auseinandersetzungen', pluralArticle: 'die', exampleSingular: 'Eine sachliche Auseinandersetzung.', examplePlural: '-' },
                { type: 'noun', german: 'Meinungsverschiedenheit', russian: 'расхождение во мнениях', article: 'die', plural: 'Meinungsverschiedenheiten', pluralArticle: 'die', exampleSingular: 'Wegen einer Meinungsverschiedenheit.', examplePlural: '-' },
                { type: 'noun', german: 'Kompromissbereitschaft', russian: 'готовность к компромиссу', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Mangelnde Kompromissbereitschaft.', examplePlural: '-' },
                { type: 'noun', german: 'Vorwurf', russian: 'упрек', article: 'der', plural: 'Vorwürfe', pluralArticle: 'die', exampleSingular: 'Ein unberechtigter Vorwurf.', examplePlural: 'Vorwürfe machen.' },
                { type: 'noun', german: 'Schlichtung', russian: 'примирение/урегулирование', article: 'die', plural: 'Schlichtungen', pluralArticle: 'die', exampleSingular: 'Eine externe Schlichtung.', examplePlural: '-' },
                { type: 'verb', german: 'eskalieren', russian: 'обостряться', conjugation: 'es eskaliert', example: 'Der Streit eskalierte.' },
                { type: 'verb', german: 'vermitteln', russian: 'посредничать', conjugation: 'er vermittelt', example: 'Zwischen den Parteien vermitteln.' },
                { type: 'verb', german: 'beiliegen', russian: 'улаживать (конфликт)', conjugation: 'beilegen', example: 'Den Konflikt beilegen.' },
                { type: 'verb', german: 'nachgeben', russian: 'уступать', conjugation: 'er gibt nach', example: 'Manchmal muss man nachgeben.' },
                { type: 'adjective', german: 'konstruktiv', russian: 'конструктивный', comparative: 'konstruktiver', superlative: 'am konstruktivsten', example: 'Ein konstruktives Gespräch.' },
                { type: 'adjective', german: 'sachlich', russian: 'деловой/объективный', comparative: 'sachlicher', superlative: 'am sachlichsten', example: 'Bitte bleiben Sie sachlich.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-4-ex-1',
              type: 'multiple-choice',
              question: 'Какой модальный глагол выражает почти 100% уверенность ("Должно быть, это так")?',
              options: ['könnte', 'dürfte', 'müsste', 'mag'],
              correctAnswer: 'müsste',
              explanation: '"Müsste" или "muss" выражают высокую степень субъективной уверенности.'
            },
            {
              id: 'b2-4-ex-2',
              type: 'fill-in-the-blank',
              question: 'Das ___ (вероятно) до конца недели найти решение.',
              correctAnswer: 'dürfte',
              explanation: '"Dürfte" выражает вероятность около 75%.'
            }
          ]
        },
        {
          id: 'b2-5-skills',
          title: 'B2.5 Профессиональные навыки',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4">📎 Nomen-Verb-Verbindungen</h2>
                <p class="mb-4">На уровне B2 важно использовать устойчивые словосочетания "существительное + глагол" вместо простых глаголов.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-3 bg-muted rounded">
                    <p class="font-bold">entscheiden -></p>
                    <p class="italic">eine Entscheidung treffen</p>
                  </div>
                  <div class="p-3 bg-muted rounded">
                    <p class="font-bold">helfen -></p>
                    <p class="italic">Hilfe leisten</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Навыки',
              words: [
                { type: 'noun', german: 'Kenntnisse', russian: 'знания', article: 'die', plural: 'Kenntnisse', pluralArticle: 'die', exampleSingular: '(мн.ч.)', examplePlural: 'Gute Deutschkenntnisse.' },
                { type: 'noun', german: 'Fähigkeit', russian: 'способность', article: 'die', plural: 'Fähigkeiten', pluralArticle: 'die', exampleSingular: 'Meine Fähigkeiten.', examplePlural: '-' },
                { type: 'noun', german: 'Erfahrung', russian: 'опыт', article: 'die', plural: 'Erfahrungen', pluralArticle: 'die', exampleSingular: 'Berufserfahrung.', examplePlural: '-' },
                { type: 'noun', german: 'Weiterbildung', russian: 'повышение квалификации', article: 'die', plural: 'Weiterbildungen', pluralArticle: 'die', exampleSingular: 'Weiterbildung machen.', examplePlural: '-' },
                { type: 'noun', german: 'Zertifikat', russian: 'сертификат', article: 'das', plural: 'Zertifikate', pluralArticle: 'die', exampleSingular: 'Ein Zertifikat erhalten.', examplePlural: '-' },
                { type: 'verb', german: 'beherrschen', russian: 'владеть (языком/навыком)', conjugation: 'ich beherrsche', example: 'Ich beherrsche Englisch.' },
                { type: 'verb', german: 'entwickeln', russian: 'развивать', conjugation: 'ich entwickle', example: 'Software entwickeln.' },
                { type: 'verb', german: 'verbessern', russian: 'улучшать', conjugation: 'ich verbessere', example: 'Kenntnisse verbessern.' },
                { type: 'verb', german: 'anwenden', russian: 'применять', conjugation: 'ich wende an', example: 'Regeln anwenden.' },
                { type: 'adjective', german: 'erfahren', russian: 'опытный', comparative: 'erfahrener', superlative: 'am erfahrensten', example: 'Erfahrener Mitarbeiter.' },
                { type: 'adjective', german: 'flexibel', russian: 'гибкий', comparative: 'flexibler', superlative: 'am flexibelsten', example: 'Ich bin flexibel.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-5-ex-1',
              type: 'multiple-choice',
              question: 'Что означает "eine Entscheidung treffen"?',
              options: ['Встретить решение', 'Принять решение', 'Избежать решения', 'Обсудить решение'],
              correctAnswer: 'Принять решение',
              explanation: 'Это устойчивая Nomen-Verb-Verbindung (функциональный глагол).'
            },
            {
              id: 'b2-5-ex-2',
              type: 'word-order',
              question: 'Соберите фразу: "Я хорошо владею немецким."',
              correctAnswer: 'Ich beherrsche die deutsche Sprache gut',
              options: ['Ich', 'beherrsche', 'die', 'deutsche', 'Sprache', 'gut'],
              explanation: 'Глагол "beherrschen" означает глубокое владение навыком или языком.'
            }
          ]
        },
        {
          id: 'b2-6-presentation',
          title: 'B2.6 Презентация',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4">🎤 Redemittel für Vorträge</h2>
                <p class="mb-4">Фразы для успешного выступления и структурирования доклада.</p>
                <div class="space-y-2 text-sm italic">
                  <p>• "Ich möchte heute über... sprechen." (Я хотел бы сегодня поговорить о...)</p>
                  <p>• "Zusammenfassend kann man sagen..." (В заключение можно сказать...)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Выступление',
              words: [
                { type: 'noun', german: 'Thema', russian: 'тема', article: 'das', plural: 'Themen', pluralArticle: 'die', exampleSingular: 'Mein Thema ist...', examplePlural: '-' },
                { type: 'noun', german: 'Vortrag', russian: 'доклад', article: 'der', plural: 'Vorträge', pluralArticle: 'die', exampleSingular: 'Einen Vortrag halten.', examplePlural: '-' },
                { type: 'noun', german: 'Folie', russian: 'слайд', article: 'die', plural: 'Folien', pluralArticle: 'die', exampleSingular: 'Nächste Folie bitte.', examplePlural: '-' },
                { type: 'noun', german: 'Struktur', russian: 'структура', article: 'die', plural: 'Strukturen', pluralArticle: 'die', exampleSingular: 'Gute Struktur.', examplePlural: '-' },
                { type: 'noun', german: 'Einleitung', russian: 'введение', article: 'die', plural: 'Einleitungen', pluralArticle: 'die', exampleSingular: 'Die Einleitung.', examplePlural: '-' },
                { type: 'noun', german: 'Schluss', russian: 'заключение', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Zum Schluss.', examplePlural: '-' },
                { type: 'verb', german: 'präsentieren', russian: 'презентовать', conjugation: 'ich präsentiere', example: 'Ergebnisse präsentieren.' },
                { type: 'verb', german: 'erklären', russian: 'объяснять', conjugation: 'ich erkläre', example: 'Ich erkläre das.' },
                { type: 'verb', german: 'betonen', russian: 'подчеркивать', conjugation: 'ich betone', example: 'Wichtiges betonen.' },
                { type: 'verb', german: 'zusammenfassen', russian: 'резюмировать', conjugation: 'ich fasse zusammen', example: 'Kurz zusammenfassen.' },
                { type: 'adjective', german: 'anschaulich', russian: 'наглядный', comparative: 'anschaulicher', superlative: 'am anschaulichsten', example: 'Anschauliches Beispiel.' },
                { type: 'adjective', german: 'verständlich', russian: 'понятный', comparative: 'verständlicher', superlative: 'am verständlichsten', example: 'Gut verständlich.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-6-ex-1',
              type: 'multiple-choice',
              question: 'Какая фраза лучше всего подходит для начала презентации?',
              options: ['Ich bin fertig.', 'Ich möchte сегодня über ... sprechen.', 'Danke für свои вопросы.', 'Das здесь моя фолия.'],
              correctAnswer: 'Ich möchte сегодня über ... sprechen.',
              explanation: 'Стандартное и вежливое начало доклада.'
            },
            {
              id: 'b2-6-ex-2',
              type: 'fill-in-the-blank',
              question: 'Einen ___ (доклад) halten.',
              correctAnswer: 'Vortrag',
              explanation: 'Устойчивое сочетание: "einen Vortrag halten" — выступать с докладом.'
            }
          ]
        },
        {
          id: 'b2-7-lunch',
          title: 'B2.7 Деловой обед',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4">🍷 Small Talk</h2>
                <p class="mb-4">Wetter, Anreise, Hobbys. Табу: Деньги, политика, религия.</p>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Small Talk',
              words: [
                { type: 'noun', german: 'Essen', russian: 'еда', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Das Essen schmeckt.', examplePlural: '-' },
                { type: 'noun', german: 'Getränk', russian: 'напиток', article: 'das', plural: 'Getränke', pluralArticle: 'die', exampleSingular: 'Ein Getränk bitte.', examplePlural: '-' },
                { type: 'noun', german: 'Einladung', russian: 'приглашение', article: 'die', plural: 'Einladungen', pluralArticle: 'die', exampleSingular: 'Danke für die Einladung.', examplePlural: '-' },
                { type: 'noun', german: 'Gespräch', russian: 'разговор', article: 'das', plural: 'Gespräche', pluralArticle: 'die', exampleSingular: 'Netttes Gespräch.', examplePlural: '-' },
                { type: 'noun', german: 'Atmosphäre', russian: 'атмосфера', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Gute Atmosphäre.', examplePlural: '-' },
                { type: 'verb', german: 'einladen', russian: 'приглашать', conjugation: 'ich lade ein', example: 'Ich lade Sie ein.' },
                { type: 'verb', german: 'empfehlen', russian: 'рекомендовать', conjugation: 'ich empfehle', example: 'Ich empfehle den Fisch.' },
                { type: 'verb', german: 'schmecken', russian: 'быть вкусным', conjugation: 'es schmeckt', example: 'Es schmeckt gut.' },
                { type: 'verb', german: 'sich unterhalten', russian: 'беседовать', conjugation: 'wir unterhalten uns', example: 'Wir unterhalten uns.' },
                { type: 'adjective', german: 'lecker', russian: 'вкусный', comparative: 'leckerer', superlative: 'am leckersten', example: 'Sehr lecker.' },
                { type: 'adjective', german: 'angenehm', russian: 'приятный', comparative: 'angenehmer', superlative: 'am angenehmsten', example: 'Angenehmer Abend.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-7-ex-1',
              type: 'multiple-choice',
              question: 'Какие темы являются "табу" во время немецкого делового обеда?',
              options: ['Погода и хобби', 'Спорт и отпуск', 'Религия и политика', 'Еда и напитки'],
              correctAnswer: 'Религия и политика',
              explanation: 'В немецком Small Talk принято избегать острых социальных и личных тем.'
            },
            {
              id: 'b2-7-ex-2',
              type: 'fill-in-the-blank',
              question: 'Danke für die ___ (приглашение).',
              correctAnswer: 'Einladung',
              explanation: 'Вежливая форма благодарности за приглашение.'
            }
          ]
        },
        {
          id: 'b2-8-company-culture',
          title: 'B2.8 Культура компании',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4">🏢 Du oder Sie?</h2>
                <p class="mb-4">Различия в корпоративной культуре и правила обращения.</p>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Культура',
              words: [
                { type: 'noun', german: 'Firma', russian: 'фирма', article: 'die', plural: 'Firmen', pluralArticle: 'die', exampleSingular: 'Unsere Firma.', examplePlural: '-' },
                { type: 'noun', german: 'Unternehmen', russian: 'предприятие', article: 'das', plural: 'Unternehmen', pluralArticle: 'die', exampleSingular: 'Großes Unternehmen.', examplePlural: '-' },
                { type: 'noun', german: 'Regel', russian: 'правило', article: 'die', plural: 'Regeln', pluralArticle: 'die', exampleSingular: 'Wichtige Regel.', examplePlural: '-' },
                { type: 'noun', german: 'Verhalten', russian: 'поведение', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Professionelles Verhalten.', examplePlural: '-' },
                { type: 'noun', german: 'Kleidung', russian: 'одежда', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Passende Kleidung.', examplePlural: '-' },
                { type: 'noun', german: 'Hierarchie', russian: 'иерархия', article: 'die', plural: 'Hierarchien', pluralArticle: 'die', exampleSingular: 'Flache Hierarchien.', examplePlural: '-' },
                { type: 'verb', german: 'respektieren', russian: 'уважать', conjugation: 'ich respektiere', example: 'Wir respektieren uns.' },
                { type: 'verb', german: 'sich anpassen', russian: 'адаптироваться', conjugation: 'ich passe mich an', example: 'Sich anpassen.' },
                { type: 'verb', german: 'duzen', russian: 'говорить на ты', conjugation: 'wir duzen', example: 'Wir duzen uns.' },
                { type: 'verb', german: 'siezen', russian: 'говорить на Вы', conjugation: 'wir siezen', example: 'Wir siezen uns.' },
                { type: 'adjective', german: 'offen', russian: 'открытый', comparative: 'offener', superlative: 'am offensten', example: 'Offene Kultur.' },
                { type: 'adjective', german: 'konservativ', russian: 'консервативный', comparative: 'konservativer', superlative: 'am konservativsten', example: 'Eher konservativ.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-8-ex-1',
              type: 'multiple-choice',
              question: 'Что такое "flache Hierarchien"?',
              options: ['Строгая дисциплина', 'Трёхуровневое руководство', 'Минимальная дистанция между начальником и подчиненным', 'Отсутствие правил'],
              correctAnswer: 'Минимальная дистанция между начальником и подчиненным',
              explanation: 'Плоская иерархия подразумевает открытость и быстрое принятие решений.'
            },
            {
              id: 'b2-8-ex-2',
              type: 'fill-in-the-blank',
              question: 'Wir ___ uns. (Мы обращаемся друг к другу на "ты")',
              correctAnswer: 'duzen',
              explanation: 'Глагол "duzen" — обращаться на "ты".'
            }
          ]
        },
        {
          id: 'b2-9-zukunft-arbeit',
          title: 'B2.9 Будущее работы: Futur I и II',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🚀</span> Прогнозы и предположения
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Когда мы говорим о будущем на уровне B2, мы используем <strong>Futur I</strong> для прогнозов и <strong>Futur II</strong> для предположений о том, что уже свершится к моменту в будущем.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 class="font-bold mb-2">Futur I (Будущее)</h3>
                    <p class="text-xs mb-1">werden + Infinitiv</p>
                    <p class="text-sm italic">"Künstliche Intelligenz <strong>wird</strong> viele Jobs <strong>ersetzen</strong>."</p>
                    <p class="text-[10px] text-muted-foreground">(ИИ заменит многие рабочие места)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-accent/5">
                    <h3 class="font-bold mb-2">Futur II (Завершенное в будущем)</h3>
                    <p class="text-xs mb-1">werden + Partizip II + haben / sein</p>
                    <p class="text-sm italic">"Bis 2040 <strong>wird</strong> sich die Arbeitswelt <strong>verändert haben</strong>."</p>
                    <p class="text-[10px] text-muted-foreground">(К 2040 году мир труда [уже] изменится)</p>
                  </div>
                </div>

                <div class="p-4 bg-muted rounded-lg">
                  <h3 class="font-bold text-sm mb-2">Предложение (Vermutung):</h3>
                  <p class="text-sm italic">"Er ist nicht im Büro. Er <strong>wird</strong> wohl <strong>krank sein</strong>." (Он, вероятно, болен — Futur I для настоящего)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Технологии и Будущее',
              words: [
                { type: 'noun', german: 'Digitalisierung', russian: 'цифровизация', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Herausforderung Digitalisierung.', examplePlural: '-' },
                { type: 'noun', german: 'Automatisierung', russian: 'автоматизация', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Fortschritt der Automatisierung.', examplePlural: '-' },
                { type: 'noun', german: 'Intelligenz', russian: 'интеллект', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Künstliche Intelligenz (KI).', examplePlural: '-' },
                { type: 'noun', german: 'Arbeitsmarkt', russian: 'рынок труда', article: 'der', plural: 'Arbeitsmärkte', pluralArticle: 'die', exampleSingular: 'Wandel am Arbeitsmarkt.', examplePlural: '-' },
                { type: 'noun', german: 'Flexibilität', russian: 'гибкость', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Mehr Flexibilität.', examplePlural: '-' },
                { type: 'verb', german: 'ersetzen', russian: 'заменять', conjugation: 'er ersetzt', example: 'Roboter ersetzen Menschen.' },
                { type: 'verb', german: 'verändern', russian: 'менять', conjugation: 'er verändert', example: 'Die Welt verändert sich.' },
                { type: 'verb', german: 'prognostizieren', russian: 'прогнозировать', conjugation: 'er prognostiziert', example: 'Zukunft prognostizieren.' },
                { type: 'verb', german: 'beschleunigen', russian: 'ускорять', conjugation: 'er beschleunigt', example: 'Den Prozess beschleunigen.' },
                { type: 'adjective', german: 'effizient', russian: 'эффективный', comparative: 'effizienter', superlative: 'am effizientesten', example: 'Effizient arbeiten.' },
                { type: 'adjective', german: 'innovativ', russian: 'инновационный', comparative: 'innovativer', superlative: 'am innovativsten', example: 'Innovative Lösung.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-9-ex-1',
              type: 'multiple-choice',
              question: 'Что означает Futur II в контексте предположений?',
              options: [
                'Действие, которое происходит сейчас',
                'Действие, которое завершится к определенному моменту в будущем',
                'Простое будущее время',
                'Прошедшее время'
              ],
              correctAnswer: 'Действие, которое завершится к определенному моменту в будущем',
              explanation: 'Futur II (werden + Partizip II + haben/sein) выражает завершенность к будущему моменту.'
            },
            {
              id: 'b2-9-ex-2',
              type: 'fill-in-the-blank',
              question: 'Bis 2050 ___ die KI viele Prozesse optimiert haben.',
              correctAnswer: 'wird',
              explanation: 'Вспомогательный глагол для Futur I и II — werden.'
            }
          ]
        },
        {
          id: 'b2-10-verhandlungen',
          title: 'B2.10 Переговоры и Нетворкинг',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🤝</span> Двойные союзы (Zweiteilige Konnektoren)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне B2 важно уметь связывать мысли более сложными структурами. Двойные союзы помогают подчеркнуть альтернативы или перечисление.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 class="font-bold mb-2">nicht nur ..., sondern auch</h3>
                    <p class="text-xs mb-1">(не только ..., но и)</p>
                    <p class="text-sm italic">"Wir bieten <strong>nicht nur</strong> Service, <strong>sondern auch</strong> Qualität."</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-accent/5">
                    <h3 class="font-bold mb-2">sowohl ... als auch</h3>
                    <p class="text-xs mb-1">(как ..., так и)</p>
                    <p class="text-sm italic">"Ich spreche <strong>sowohl</strong> Deutsch <strong>als auch</strong> Englisch."</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-muted/50">
                    <h3 class="font-bold mb-2">entweder ... oder</h3>
                    <p class="text-xs mb-1">(или ..., или)</p>
                    <p class="text-sm italic">"Wir verhandeln <strong>entweder</strong> heute <strong>oder</strong> morgen."</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-muted/50">
                    <h3 class="font-bold mb-2">weder ... noch</h3>
                    <p class="text-xs mb-1">(ни ..., ни)</p>
                    <p class="text-sm italic">"Das ist <strong>weder</strong> effizient <strong>noch</strong> innovativ."</p>
                  </div>
                </div>

                <div class="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p class="text-sm">💡 <strong>Совет для нетворкинга:</strong> Используйте фразу <em>"Darf ich mich vorstellen?"</em> (Разрешите представиться?) для начала беседы на конференции.</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Переговоры и Контакты',
              words: [
                { type: 'noun', german: 'Verhandlung', russian: 'переговоры', article: 'die', plural: 'Verhandlungen', pluralArticle: 'die', exampleSingular: 'Eine harte Verhandlung.', examplePlural: 'Verhandlungen führen.' },
                { type: 'noun', german: 'Argument', russian: 'аргумент', article: 'das', plural: 'Argumente', pluralArticle: 'die', exampleSingular: 'Ein starkes Argument.', examplePlural: '-' },
                { type: 'noun', german: 'Kompromiss', russian: 'компромисс', article: 'der', plural: 'Kompromisse', pluralArticle: 'die', exampleSingular: 'Einen Kompromiss schließen.', examplePlural: '-' },
                { type: 'noun', german: 'Netzwerk', russian: 'сеть (контактов)', article: 'das', plural: 'Netzwerke', pluralArticle: 'die', exampleSingular: 'Ein berufliches Netzwerk.', examplePlural: '-' },
                { type: 'noun', german: 'Auftrag', russian: 'заказ/поручение', article: 'der', plural: 'Aufträge', pluralArticle: 'die', exampleSingular: 'Einen Auftrag erhalten.', examplePlural: '-' },
                { type: 'verb', german: 'verhandeln', russian: 'вести переговоры', conjugation: 'er verhandelt', example: 'Über den Preis verhandeln.' },
                { type: 'verb', german: 'überzeugen', russian: 'убеждать', conjugation: 'er überzeugt', example: 'Den Kunden überzeugen.' },
                { type: 'verb', german: 'widersprechen', russian: 'возражать', conjugation: 'er widerspricht', example: 'Da muss ich Ihnen widersprechen.' },
                { type: 'verb', german: 'zustimmen', russian: 'соглашаться', conjugation: 'er stimmt zu', example: 'Ich stimme Ihnen zu.' },
                { type: 'adjective', german: 'sachlich', russian: 'деловой/объективный', comparative: 'sachlicher', superlative: 'am sachlichsten', example: 'Eine sachliche Diskussion.' },
                { type: 'adjective', german: 'kompetent', russian: 'компетентный', comparative: 'kompetenter', superlative: 'am kompetentesten', example: 'Ein kompetenter Partner.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-10-ex-1',
              type: 'multiple-choice',
              question: 'Как переводится "sowohl ... als auch"?',
              options: ['или ... или', 'ни ... ни', 'как ... так и', 'не только ... но и'],
              correctAnswer: 'как ... так и',
              explanation: 'Sowohl ... als auch используется для перечисления двух положительных фактов.'
            },
            {
              id: 'b2-10-ex-2',
              type: 'fill-in-the-blank',
              question: 'Компьютер не только быстрый, ___ и надежный.',
              correctAnswer: 'sondern auch',
              explanation: 'Конструкция: nicht nur ..., sondern auch.'
            }
          ]
        }
      ]
    },
    {
      id: 'c1',
      title: 'Уровень C1: Профессиональное владение (Fachsprachliche Kenntnisse)',
      description: 'Эффективное использование языка в научной и профессиональной среде. Свободное выражение сложных мыслей.',
      topics: [
        {
          id: 'c1-1-academic-style',
          title: 'C1.1 Академический стиль: Nominalstil',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🎓</span> Nominalstil (Номинальный стиль)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В научной и официальной среде глагольные конструкции часто заменяются существительными с предлогами. Это делает текст более плотным и формальным.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-blue-50/10">
                    <h3 class="font-bold mb-2">Verbalstil (Глагольный)</h3>
                    <p class="text-sm italic">"Wenn man die Daten сравнивает..."</p>
                    <p class="text-[10px] text-muted-foreground">(Когда сравниваешь данные...)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 class="font-bold mb-2 text-primary">Nominalstil (Номинальный)</h3>
                    <p class="text-sm italic font-bold">"Beim Vergleich der Daten..."</p>
                    <p class="text-[10px] text-muted-foreground">(При сравнении данных...)</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Основные преобразования:</h3>
                <ul class="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li><strong>wenn / als</strong> -> bei + Dativ (при...)</li>
                  <li><strong>weil / da</strong> -> wegen / aufgrund + Genitiv (из-за... / на основании...)</li>
                  <li><strong>obwohl</strong> -> trotz + Genitiv (несмотря на...)</li>
                  <li><strong>damit / um zu</strong> -> zu / zwecks + Genitiv (в целях / для...)</li>
                </ul>
              </div>
            </div>
            `,
          vocabulary: [
            {
              theme: 'Наука и Исследование',
              words: [
                { type: 'noun', german: 'Analyse', russian: 'анализ', article: 'die', plural: 'Analysen', pluralArticle: 'die', exampleSingular: 'Eine gründliche Analyse.', examplePlural: '-' },
                { type: 'noun', german: 'Hypothese', russian: 'гипотеза', article: 'die', plural: 'Hypothesen', pluralArticle: 'die', exampleSingular: 'Eine Hypothese aufstellen.', examplePlural: '-' },
                { type: 'noun', german: 'Erkenntnis', russian: 'познание/вывод', article: 'die', plural: 'Erkenntnisse', pluralArticle: 'die', exampleSingular: 'Neue wissenschaftliche Erkenntnis.', examplePlural: 'Interessante Erkenntnisse gewinnen.' },
                { type: 'noun', german: 'Schlussfolgerung', russian: 'заключение/вывод', article: 'die', plural: 'Schlussfolgerungen', pluralArticle: 'die', exampleSingular: 'Eine logische Schlussfolgerung.', examplePlural: '-' },
                { type: 'verb', german: 'auswerten', russian: 'анализировать/обрабатывать (данные)', conjugation: 'er wertet aus', example: 'Daten statistisch auswerten.' },
                { type: 'verb', german: 'belegen', russian: 'подтверждать (документально)', conjugation: 'er belegt', example: 'Theorien mit Fakten belegen.' },
                { type: 'adjective', german: 'verrelevant', russian: 'соответствующий/важный', comparative: 'relevanter', superlative: 'am relevantesten', example: 'Relevante Informationen.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-1-ex-1',
              type: 'fill-in-the-blank',
              question: '___ (При) Regen findet das Experiment im Labor statt.',
              correctAnswer: 'Bei',
              explanation: 'В номинальном стиле союз "wenn es regnet" заменяется на "bei Regen".'
            },
            {
              id: 'c1-1-ex-2',
              type: 'multiple-choice',
              question: 'Как превратить "weil die Kosten steigen" в номинальную конструкцию?',
              options: ['trotz steigender Kosten', 'wegen steigender Kosten', 'bei steigenden Kosten', 'damit die Kosten steigen'],
              correctAnswer: 'wegen steigender Kosten',
              explanation: '"Wegen" выражает причину и требует Genitiv.'
            }
          ]
        },
        {
          id: 'c1-2-konjunktiv-1',
          title: 'C1.2 СМИ: Konjunktiv I',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📰</span> Konjunktiv I: Косвенная речь
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Konjunktiv I используется в новостях и докладах, чтобы дистанцироваться от высказывания другого человека. Он показывает, что вы просто передаете чужие слова.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Образование (Präsens):</h3>
                <p class="text-sm mb-4">Основа глагола + специальные окончания (-e, -est, -e, -en, -et, -en).</p>

                <div class="p-4 bg-muted rounded-lg mb-6">
                  <p class="font-bold">Пример (глагол sagen):</p>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <p>ich sage</p><p>wir sagen</p>
                    <p class="text-primary font-bold">er / sie / es sage</p><p>sie sagen</p>
                  </div>
                  <p class="mt-2 text-xs italic">"Der Experte sagte, die Krise <strong>sei</strong> vorbei." (Эксперт сказал, что кризис [якобы] прошел)</p>
                </div>

                <div class="p-4 bg-amber-50/10 border-l-4 border-amber-500 rounded-r-lg">
                  <p class="text-sm">⚠️ <strong>Важно:</strong> Если форма Konjunktiv I совпадает с Indikativ (например, "wir sagen"), вместо нее используется <strong>Konjunktiv II</strong> ("мы бы сказали").</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Медиа и Сообщения',
              words: [
                { type: 'noun', german: 'Berichterstattung', russian: 'освещение событий (в СМИ)', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Objektive Berichterstattung.', examplePlural: '-' },
                { type: 'noun', german: 'Quelle', russian: 'источник', article: 'die', plural: 'Quellen', pluralArticle: 'die', exampleSingular: 'Zuverlässige Quellen.', examplePlural: '-' },
                { type: 'noun', german: 'Stellungnahme', russian: 'изложение позиции/комментарий', article: 'die', plural: 'Stellungnahmen', pluralArticle: 'die', exampleSingular: 'Eine offizielle Stellungnahme.', examplePlural: '-' },
                { type: 'verb', german: 'behaupten', russian: 'утверждать (необоснованно)', conjugation: 'er behauptet', example: 'Er behauptet, unschuldig zu sein.' },
                { type: 'verb', german: 'mitteilen', russian: 'сообщать/уведомлять', conjugation: 'er teilt mit', example: 'Das Unternehmen teilte mit, dass...' },
                { type: 'adjective', german: 'glaubwürdig', russian: 'достоверный/заслуживающий доверия', comparative: 'glaubwürdiger', superlative: 'am glaubwürdigsten', example: 'Eine glaubwürdige Information.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-2-ex-1',
              type: 'fill-in-the-blank',
              question: 'Der Minister sagt, er ___ (быть) mit dem Ergebnis zufrieden.',
              correctAnswer: 'sei',
              explanation: 'Для er/sie/es в Konjunktiv I глагол "sein" имеет форму "sei".'
            },
            {
              id: 'c1-2-ex-2',
              type: 'word-order',
              question: 'Соберите косвенную речь: "Полиция сообщает, что преступник пойман."',
              correctAnswer: 'Die Polizei teilt mit der Täter sei gefasst',
              options: ['Die', 'Polizei', 'teilt', 'mit', 'der', 'Täter', 'sei', 'gefasst'],
              explanation: 'В косвенной речи без союза "dass" порядок слов прямой, но глагол стоит в Konjunktiv I.'
            }
          ]
        },
        {
          id: 'c1-3-passiv-ersatz',
          title: 'C1.3 Право и Закон: Passiversatz',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">⚖️</span> Альтернативы пассиву
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне C1 мы часто избегаем стандартного Passiv (werden + Partizip II), используя более элегантные конструкции.
                </p>

                <div class="space-y-4">
                  <div class="p-4 border-l-4 border-primary bg-primary/5">
                    <h3 class="font-bold">1. sein + zu + Infinitiv</h3>
                    <p class="text-sm">Выражает долженствование или возможность.</p>
                    <p class="text-sm italic">"Dieses Gesetz <strong>ist</strong> sofort <strong>einzuhalten</strong>." (= muss eingehalten werden)</p>
                  </div>
                  <div class="p-4 border-l-4 border-accent bg-accent/5">
                    <h3 class="font-bold">2. sich lassen + Infinitiv</h3>
                    <p class="text-sm">Выражает возможность.</p>
                    <p class="text-sm italic">"Das Problem <strong>lässt sich</strong> легко <strong>lösen</strong>." (= kann gelöst werden)</p>
                  </div>
                  <div class="p-4 border-l-4 border-muted bg-muted/50">
                    <h3 class="font-bold">3. Прилагательные на -bar, -abel</h3>
                    <p class="text-sm italic">"Ein <strong>unlösbares</strong> Problem." (= ein Problem, das nicht gelöst werden kann)</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Право и Общество',
              words: [
                { type: 'noun', german: 'Vorschrift', russian: 'предписание/правило', article: 'die', plural: 'Vorschriften', pluralArticle: 'die', exampleSingular: 'Eine rechtliche Vorschrift.', examplePlural: '-' },
                { type: 'noun', german: 'Gesetzgebung', russian: 'законодательство', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die aktuelle Gesetzgebung.', examplePlural: '-' },
                { type: 'noun', german: 'Verpflichtung', russian: 'обязательство', article: 'die', plural: 'Verpflichtungen', pluralArticle: 'die', exampleSingular: 'Einer Verpflichtung nachkommen.', examplePlural: '-' },
                { type: 'verb', german: 'verabschieden', russian: 'принимать (закон)', conjugation: 'er verabschiedet', example: 'Ein Gesetz verabschieden.' },
                { type: 'verb', german: 'verstoßen', russian: 'нарушать (против чего-то)', conjugation: 'er verstößt gegen', example: 'Gegen Regeln verstoßen.' },
                { type: 'adjective', german: 'verbindlich', russian: 'обязательный', comparative: 'verbindlicher', superlative: 'am verbindlichsten', example: 'Ein verbindliches Angebot.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-3-ex-1',
              type: 'fill-in-the-blank',
              question: 'Die Rechnung ___ sich nicht öffnen. (Счет не открывается/не может быть открыт)',
              correctAnswer: 'lässt',
              explanation: '"Sich lassen + Infinitiv" — пассивная замена для возможности.'
            },
            {
              id: 'c1-3-ex-2',
              type: 'multiple-choice',
              question: 'Что означает фраза "Die Hausaufgabe ist bis morgen zu machen"?',
              options: [
                'Домашнее задание сделано завтра.',
                'Домашнее задание нужно сделать к завтрашнему дню.',
                'Домашнее задание можно сделать завтра.',
                'Домашнее задание делается сейчас.'
              ],
              correctAnswer: 'Домашнее задание нужно сделать к завтрашнему дню.',
              explanation: '"sein + zu + Infinitiv" выражает необходимость (müssen).'
            }
          ]
        },
        {
          id: 'c1-4-nomen-verb',
          title: 'C1.4 Карьера: Nomen-Verb-Verbindungen',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">💼</span> Функциональные глаголы
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Сочетание существительного и глагола, которое имеет одно значение. Часто используется вместо простого глагола для придания делового оттенка.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="p-4 border border-border rounded-lg bg-muted text-sm">
                    <p><strong>простой глагол</strong></p>
                    <p class="italic">entscheiden (решать)</p>
                    <p class="italic">kritisieren (критиковать)</p>
                    <p class="italic">beenden (заканчивать)</p>
                  </div>
                  <div class="p-4 border border-border rounded-lg bg-primary/10 text-sm">
                    <p><strong>Nomen-Verb-Verbindung</strong></p>
                    <p class="italic font-bold">eine Entscheidung treffen</p>
                    <p class="italic font-bold">Kritik üben an (+ Dat)</p>
                    <p class="italic font-bold">zu Ende bringen</p>
                  </div>
                </div>

                <h3 class="font-semibold mb-3 text-primary">Популярные выражения:</h3>
                <ul class="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li><strong>In Anspruch nehmen</strong> — пользоваться (услугами / временем)</li>
                  <li><strong>Zur Verfügung stehen</strong> — быть в распоряжении</li>
                  <li><strong>Ein Gespräch führen</strong> — беседовать</li>
                  <li><strong>Einen Antrag stellen</strong> — подать заявление</li>
                </ul>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Профессиональная коммуникация',
              words: [
                { type: 'noun', german: 'Anspruch', russian: 'притязание/право', article: 'der', plural: 'Ansprüche', pluralArticle: 'die', exampleSingular: 'Einen Anspruch geltend machen.', examplePlural: '-' },
                { type: 'noun', german: 'Verfügung', russian: 'распоряжение', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Zur Verfügung stehen.', examplePlural: '-' },
                { type: 'noun', german: 'Antrag', russian: 'заявление/ходатайство', article: 'der', plural: 'Anträge', pluralArticle: 'die', exampleSingular: 'Einen Antrag stellen.', examplePlural: '-' },
                { type: 'verb', german: 'leisten', russian: 'совершать/выполнять', conjugation: 'er leistet', example: 'Hilфе leisten.' },
                { type: 'verb', german: 'begehen', russian: 'совершать (ошибку/преступление)', conjugation: 'er begeht', example: 'Einen Fehler begehen.' },
                { type: 'adjective', german: 'umfassend', russian: 'обширный/всесторонний', comparative: 'umfassender', superlative: 'am umfassendsten', example: 'Umfassende Kenntnisse.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-4-ex-1',
              type: 'fill-in-the-blank',
              question: 'Darf ich Ihre Hilfe in ___ nehmen? (Могу я воспользоваться вашей помощью?)',
              correctAnswer: 'Anspruch',
              explanation: '"In Anspruch nehmen" — устойчивое сочетание.'
            },
            {
              id: 'c1-4-ex-2',
              type: 'multiple-choice',
              question: 'Как сказать "критиковать" научным стилем?',
              options: ['Kritik machen', 'Kritik üben', 'Kritik haben', 'Kritik sagen'],
              correctAnswer: 'Kritik üben',
              explanation: '"Kritik üben an + Dativ" — стандартная форма.'
            }
          ]
        },
        {
          id: 'c1-5-feelings-nuances',
          title: 'C1.5 Психология: Выражение нюансов',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🧠</span> Модальные частицы и оттенки
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне C1 важно не просто передать информацию, но и выразить свое отношение к ней с помощью модальных частиц (doch, ja, halt, eben) и точных глаголов.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Модальные частицы:</h3>
                <div class="space-y-2 mb-6">
                  <div class="p-3 bg-muted rounded-lg">
                    <p class="text-sm"><strong>doch</strong> — выражает нетерпение или напоминание о чем-то известном.</p>
                    <p class="text-xs italic">"Das weißt du <strong>doch</strong>!" (Ты же это знаешь!)</p>
                  </div>
                  <div class="p-3 bg-muted rounded-lg">
                    <p class="text-sm"><strong>eben / halt</strong> — выражает смирение с фактом (ничего не поделаешь).</p>
                    <p class="text-xs italic">"Es ist <strong>eben</strong> so." (Ну, уж так оно есть.)</p>
                  </div>
                </div>

                <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p class="text-sm">📝 <strong>Продвинутые синонимы:</strong> Вместо "traurig" используйте "niedergeschlagen" (подавленный), вместо "wütend" — "erzürnt".</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Эмоции и Психология',
              words: [
                { type: 'noun', german: 'Empfindung', russian: 'ощущение/восприятие', article: 'die', plural: 'Empfindungen', pluralArticle: 'die', exampleSingular: 'Subjektive Empfindungen.', examplePlural: '-' },
                { type: 'noun', german: 'Wahrnehmung', russian: 'восприятие', article: 'die', plural: 'Wahrnehmungen', pluralArticle: 'die', exampleSingular: 'Die visuelle Wahrnehmung.', examplePlural: '-' },
                { type: 'verb', german: 'empfinden', russian: 'чувствовать/ощущать', conjugation: 'er empfindet', example: 'Mitleid empfinden.' },
                { type: 'verb', german: 'verarbeiten', russian: 'перерабатывать/усваивать', conjugation: 'er verarbeitet', example: 'Informationen verarbeiten.' },
                { type: 'adjective', german: 'niedergeschlagen', russian: 'подавленный/унылый', comparative: 'niedergeschlagener', superlative: 'am niedergeschlagensten', example: 'Er wirkt heute niedergeschlagen.' },
                { type: 'adjective', german: 'zuversichtlich', russian: 'уверенный в успехе/оптимистичный', comparative: 'zuversichtlicher', superlative: 'am zuversichtlichsten', example: 'Ich bin zuversichtlich.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-5-ex-1',
              type: 'fill-in-the-blank',
              question: 'Komm ___ наконец! (Ну иди же наконец! - нетерпение)',
              correctAnswer: 'doch',
              explanation: 'Частица "doch" в побудительных предложениях выражает нетерпение.'
            },
            {
              id: 'c1-5-ex-2',
              type: 'multiple-choice',
              question: 'Как сказать "оптимистичный" на уровне C1?',
              options: ['optimistisch', 'zuversichtlich', 'gut', 'froh'],
              correctAnswer: 'zuversichtlich',
              explanation: '"Zuversichtlich" — более точное и продвинутое слово для веры в успех.'
            }
          ]
        },
        {
          id: 'c1-6-globalization',
          title: 'C1.6 Глобализация: Аргументация',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🌍</span> Глобальные вызовы
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  На уровне C1 вы должны уметь обсуждать глобальные проблемы, взвешивать все "за" и "против", используя вводные конструкции для дискуссии.
                </p>

                <h3 class="font-semibold mb-3 text-primary">Фразы для дискуссии:</h3>
                <ul class="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li><strong>Einerseits ..., andererseits ...</strong> — С одной стороны ..., с другой стороны ...</li>
                  <li><strong>Zwar ..., aber ...</strong> — Хотя ..., но ...</li>
                  <li><strong>Ein entscheidender Vorteil ist ...</strong> — Решающим преимуществом является ...</li>
                  <li><strong>Man muss jedoch bedenken, dass ...</strong> — Однако нужно учитывать, что ...</li>
                </ul>

                <div class="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <p class="text-xs italic">"<strong>Zwar</strong> bietet die Globalisierung Chancen, <strong>aber</strong> sie birgt auch Risiken." (Хотя глобализация дает возможности, она также несет риски.)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Глобализация и Социум',
              words: [
                { type: 'noun', german: 'Herausforderung', russian: 'вызов/сложная задача', article: 'die', plural: 'Herausforderungen', pluralArticle: 'die', exampleSingular: 'Eine globale Herausforderung.', examplePlural: '-' },
                { type: 'noun', german: 'Nachhaltigkeit', russian: 'устойчивое развитие', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Prinzip der Nachhaltigkeit.', examplePlural: '-' },
                { type: 'verb', german: 'profitieren', russian: 'получать выгоду', conjugation: 'er profitiert von', example: 'Vom Freihandel profitieren.' },
                { type: 'verb', german: 'verursachen', russian: 'причинять/вызывать', conjugation: 'er verursacht', example: 'Probleme verursachen.' },
                { type: 'adjective', german: 'umstritten', russian: 'спорный/дискуссионный', comparative: 'umstrittener', superlative: 'am umstrittensten', example: 'Ein umstrittenes Thema.' },
                { type: 'adjective', german: 'grenzüberschreitend', russian: 'трансграничный', comparative: '-', superlative: '-', example: 'Grenzüberschreitende Zusammenarbeit.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'c1-6-ex-1',
              type: 'word-order',
              question: 'Соберите фразу: "С одной стороны это хорошо, с другой — дорого."',
              correctAnswer: 'Einerseits ist es gut andererseits ist es teuer',
              options: ['Einerseits', 'ist', 'es', 'gut', 'andererseits', 'ist', 'es', 'teuer'],
              explanation: 'Конструкция для взвешивания аргументов: Einerseits... andererseits...'
            },
            {
              id: 'c1-6-ex-2',
              type: 'multiple-choice',
              question: 'Какое слово означает "устойчивое развитие"?',
              options: ['Wirtschaft', 'Nachhaltigkeit', 'Globalisierung', 'Herausforderung'],
              correctAnswer: 'Nachhaltigkeit',
              explanation: 'Nachhaltigkeit — ключевое слово C1 для тем экологии и будущего.'
            }
          ]
        }
      ]
    },
    {
      id: 'b2-beruf',
      title: 'B2+ Beruf: Работа и Карьера',
      description: 'Специализированный курс для работы в Германии. Деловая переписка, собеседования, общение с клиентами и коллегами.',
      topics: [
        {
          id: 'b2-beruf-1-bewerbung',
          title: 'Поиск работы: Bewerbung',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📄</span> Die Bewerbung (Заявка на работу)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  В Германии пакет документов (Bewerbungsunterlagen) обычно состоит из <strong>Anschreiben</strong> (сопроводительное письмо), <strong>Lebenslauf</strong> (резюме) и <strong>Zeignissen</strong> (сертификаты/дипломы).
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 class="font-bold text-primary mb-3">Der Lebenslauf (Резюме)</h3>
                    <ul class="space-y-2 text-sm">
                      <li class="flex justify-between border-b pb-1"> <span>Persönliche Daten</span> <span class="text-muted-foreground w-1/2 text-right">Контакты, фото</span></li>
                      <li class="flex justify-between border-b pb-1"> <span>Berufserfahrung</span> <span class="text-muted-foreground w-1/2 text-right">Опыт (хронологически)</span></li>
                      <li class="flex justify-between border-b pb-1"> <span>Ausbildung</span> <span class="text-muted-foreground w-1/2 text-right">Образование</span></li>
                      <li class="flex justify-between"> <span>Kenntnisse</span> <span class="text-muted-foreground w-1/2 text-right">Навыки (IT, языки)</span></li>
                    </ul>
                  </div>

                  <div class="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 class="font-bold text-primary mb-3">Das Anschreiben (Письмо)</h3>
                    <p class="text-sm italic mb-2">"Почему вы хотите работать именно у нас?"</p>
                    <ul class="space-y-2 text-sm font-medium">
                      <li class="p-2 bg-background rounded border">"Hiermit bewerbe ich mich um die Stelle als..."</li>
                      <li class="p-2 bg-background rounded border">"Mit großem Interesse habe ich..."</li>
                      <li class="p-2 bg-background rounded border">"Ich bin überzeugt, dass..."</li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 class="font-bold text-sm mb-1 text-yellow-800">⚠️ Важно: Lücken im Lebenslauf</h3>
                  <p class="text-xs text-yellow-900">
                    "Пробелы" в резюме (периоды без работы) немцы замечают сразу. Лучше написать <em>"Neuorientierung"</em> (поиск себя) или <em>"Weiterbildung"</em> (обучение), чем оставить пустоту.
                  </p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Документы и Процесс',
              words: [
                { type: 'noun', german: 'Bewerbungsunterlagen', russian: 'документы для заявки', article: 'die', plural: 'Bewerbungsunterlagen', pluralArticle: 'die', exampleSingular: '(Plural only)', examplePlural: 'Vollständige Bewerbungsunterlagen senden.' },
                { type: 'noun', german: 'Lebenslauf', russian: 'резюме/биография', article: 'der', plural: 'Lebensläufe', pluralArticle: 'die', exampleSingular: 'Ein lückenloser Lebenslauf.', examplePlural: '-' },
                { type: 'noun', german: 'Anschreiben', russian: 'сопроводительное письмо', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Ein überzeugendes Anschreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Stellenanzeige', russian: 'объявление о вакансии', article: 'die', plural: 'Stellenanzeigen', pluralArticle: 'die', exampleSingular: 'Ich habe Ihre Stellenanzeige gelesen.', examplePlural: '-' },
                { type: 'noun', german: 'Vorstellungsgespräch', russian: 'собеседование', article: 'das', plural: 'Vorstellungsgespräche', pluralArticle: 'die', exampleSingular: 'Einladung zum Vorstellungsgespräch.', examplePlural: '-' },
                { type: 'noun', german: 'Anforderung', russian: 'требование', article: 'die', plural: 'Anforderungen', pluralArticle: 'die', exampleSingular: 'Hohe Anforderungen erfüllen.', examplePlural: '-' },
                { type: 'verb', german: 'sich bewerben', russian: 'подавать заявку', conjugation: 'er bewirbt sich', example: 'Ich bewerbe mich um die Stelle.' },
                { type: 'verb', german: 'verfügen', russian: 'располагать/иметь', conjugation: 'er verfügt über', example: 'Über Erfahrungen verfügen.' },
                { type: 'verb', german: 'einstellen', russian: 'нанимать', conjugation: 'er stellt ein', example: 'Wir stellen neue Mitarbeiter ein.' },
                { type: 'adjective', german: 'tätig', russian: 'деятельный/работающий', comparative: '-', superlative: '-', example: 'Ich war als Lehrer tätig.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-beruf-1-ex-1',
              type: 'fill-in-the-blank',
              question: 'Ich bewerbe mich ___ die Stelle als Marketing Manager. (Предлог)',
              correctAnswer: 'um',
              explanation: 'Sich bewerben UM + Akkusativ — претендовать на место.'
            },
            {
              id: 'b2-beruf-1-ex-2',
              type: 'multiple-choice',
              question: 'Как называется документ с вашей биографией и опытом?',
              options: ['Das Anschreiben', 'Der Lebenslauf', 'Das Arbeitszeugnis', 'Der Arbeitsvertrag'],
              correctAnswer: 'Der Lebenslauf',
              explanation: 'Lebenslauf (CV) — это резюме.'
            },
            {
              id: 'b2-beruf-1-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Я располагаю многолетним опытом."',
              correctAnswer: 'Ich verfüge über langjährige Erfahrung',
              options: ['Ich', 'verfüge', 'über', 'langjährige', 'Erfahrung'],
              explanation: 'Verfügen über + Akk.'
            }
          ]
        },
        {
          id: 'b2-beruf-1-vorstellungsgespraech',
          title: 'Собеседование: Vorstellungsgespräch',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🤝</span> Das Vorstellungsgespräch (Собеседование)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Самый важный момент — рассказать о себе (Selbstpräsentation). Нужно говорить о своих сильных сторонах, но оставаться скромным.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 class="font-bold text-primary mb-3">Stärken (Сильные стороны)</h3>
                    <ul class="space-y-2 text-sm italic">
                      <li>• Teamfähig (командный игрок)</li>
                      <li>• Zuverlässig (надежный)</li>
                      <li>• Belastbar (стрессоустойчивый)</li>
                      <li>• Flexibel (гибкий)</li>
                      <li>• Lernbereit (готов учиться)</li>
                    </ul>
                  </div>

                  <div class="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 class="font-bold text-primary mb-3">Типичные вопросы</h3>
                    <ul class="space-y-2 text-sm italic">
                      <li class="bg-background p-2 rounded">"Erzählen Sie etwas über sich."</li>
                      <li class="bg-background p-2 rounded">"Warum wollen Sie bei uns arbeiten?"</li>
                      <li class="bg-background p-2 rounded">"Was sind Ihre Gehaltsvorstellungen?"</li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <h3 class="font-bold text-sm mb-1">Фраза-помощник:</h3>
                  <p class="text-sm italic">"Meine größte Stärke ist meine <strong>Zielstrebigkeit</strong>. In meinem letzten Job habe ich..." (Всегда подкрепляйте качества примерами!)</p>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Собеседование и Качества',
              words: [
                { type: 'noun', german: 'Stärke', russian: 'сильная сторона', article: 'die', plural: 'Stärken', pluralArticle: 'die', exampleSingular: 'Meine Stärke ist Geduld.', examplePlural: 'Was sind Ihre Stärken?' },
                { type: 'noun', german: 'Schwäche', russian: 'слабая сторона', article: 'die', plural: 'Schwächen', pluralArticle: 'die', exampleSingular: 'Eine kleine Schwäche.', examplePlural: 'Ehrlich über Schwächen sprechen.' },
                { type: 'noun', german: 'Eigenschaft', russian: 'свойство/качество', article: 'die', plural: 'Eigenschaften', pluralArticle: 'die', exampleSingular: 'Positive Eigenschaft.', examplePlural: '-' },
                { type: 'noun', german: 'Herausforderung', russian: 'вызов/задача', article: 'die', plural: 'Herausforderungen', pluralArticle: 'die', exampleSingular: 'Ich suche neue Herausforderungen.', examplePlural: '-' },
                { type: 'noun', german: 'Gehaltsvorstellung', russian: 'ожидание по зарплате', article: 'die', plural: 'Gehaltsvorstellungen', pluralArticle: 'die', exampleSingular: 'Ihre Gehaltsvorstellung nennen.', examplePlural: '-' },
                { type: 'adjective', german: 'zuverlässig', russian: 'надежный', comparative: 'zuverlässiger', superlative: 'am zuverlässigsten', example: 'Ein zuverlässiger Mitarbeiter.' },
                { type: 'adjective', german: 'teamfähig', russian: 'умеющий работать в команде', comparative: '-', superlative: '-', example: 'Sind Sie teamfähig?' },
                { type: 'adjective', german: 'überzeugt', russian: 'убежденный', comparative: '-', superlative: '-', example: 'Ich bin davon überzeugt.' },
                { type: 'verb', german: 'beherrschen', russian: 'владеть (навыком/языком)', conjugation: 'er beherrscht', example: 'Ich beherrsche Englisch fließend.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-beruf-1-ex-4',
              type: 'multiple-choice',
              question: 'Как сказать "стрессоустойчивый"?',
              options: ['belastbar', 'stark', 'ruhig', 'schnell'],
              correctAnswer: 'belastbar',
              explanation: 'Belastbar (способный выдерживать нагрузку) — стандартный термин в вакансиях.'
            },
            {
              id: 'b2-beruf-1-ex-5',
              type: 'fill-in-the-blank',
              question: 'Was sind Ihre ___? (Ожидания по зарплате)',
              correctAnswer: 'Gehaltsvorstellungen',
              explanation: 'Стандартный вопрос на собеседовании.'
            }
          ]
        },
        {
          id: 'b2-beruf-2-buero',
          title: 'Офис: Телефон и E-Mail',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📞</span> Am Telefon (По телефону)
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-bold text-primary text-sm mb-2">Sich melden (Представиться)</h3>
                    <p class="text-xs italic bg-background p-2 rounded mb-1">"Firma X, Müller hier, guten Tag."</p>
                    <p class="text-xs italic bg-background p-2 rounded">"Was kann ich für Sie tun?"</p>
                  </div>
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-bold text-primary text-sm mb-2">Verbinden (Соединить)</h3>
                    <p class="text-xs italic bg-background p-2 rounded mb-1">"Könnten Sie mich bitte mit Frau X verbinden?"</p>
                    <p class="text-xs italic bg-background p-2 rounded">"Einen Moment bitte, ich stelle durch."</p>
                  </div>
                </div>

                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📧</span> E-Mail-Etikette
                </h2>
                <div class="space-y-4">
                  <div class="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r">
                    <h3 class="font-bold text-sm">Betreff (Тема)</h3>
                    <p class="text-xs">Всегда пишите четко: <em>"Anfrage bzgl. Termin am 12.05."</em></p>
                  </div>
                  <div class="border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
                    <h3 class="font-bold text-sm">Anrede (Обращение)</h3>
                    <p class="text-xs">Официально: <em>"Sehr geehrte Damen und Herren,"</em></p>
                    <p class="text-xs">Лично: <em>"Lieber Herr Schmidt," / "Liebe Frau Müller,"</em></p>
                  </div>
                  <div class="border-l-4 border-gray-500 bg-gray-50 p-3 rounded-r">
                    <h3 class="font-bold text-sm">Grußformel (Прощание)</h3>
                    <p class="text-xs">Standard: <em>"Mit freundlichen Grüßen"</em></p>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Телефон и Переписка',
              words: [
                { type: 'noun', german: 'Durchwahl', russian: 'добавочный номер/прямой номер', article: 'die', plural: 'Durchwahlen', pluralArticle: 'die', exampleSingular: 'Meine Durchwahl ist -12.', examplePlural: '-' },
                { type: 'noun', german: 'Rückruf', russian: 'обратный звонок', article: 'der', plural: 'Rückrufe', pluralArticle: 'die', exampleSingular: 'Um Rückruf bitten.', examplePlural: '-' },
                { type: 'noun', german: 'Anliegen', russian: 'вопрос/дело/просьба', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Was ist Ihr Anliegen?', examplePlural: '-' },
                { type: 'noun', german: 'Betreff', russian: 'тема (письма)', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Betreffzeile leer lassen.', examplePlural: '-' },
                { type: 'noun', german: 'Anhang', russian: 'приложение (к письму)', article: 'der', plural: 'Anhänge', pluralArticle: 'die', exampleSingular: 'Im Anhang finden Sie...', examplePlural: '-' },
                { type: 'noun', german: 'Vereinbarung', russian: 'договоренность', article: 'die', plural: 'Vereinbarungen', pluralArticle: 'die', exampleSingular: 'Laut Vereinbarung.', examplePlural: '-' },
                { type: 'verb', german: 'erreichen', russian: 'дозвониться/застать', conjugation: 'er erreicht', example: 'Ich kann ihn nicht erreichen.' },
                { type: 'verb', german: 'hinterlassen', russian: 'оставить (сообщение)', conjugation: 'er hinterlässt', example: 'Eine Nachricht hinterlassen.' },
                { type: 'verb', german: 'ausrichten', russian: 'передать (информацию)', conjugation: 'er richtet aus', example: 'Kann ich ihm etwas ausrichten?' },
                { type: 'verb', german: 'vereinbaren', russian: 'согласовать (встречу)', conjugation: 'er vereinbart', example: 'Einen Termin vereinbaren.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-beruf-2-ex-1',
              type: 'fill-in-the-blank',
              question: 'Können Sie mich mit Herrn Meyer ___? (Соединить)',
              correctAnswer: 'verbinden',
              explanation: 'Am Telefon verbinden (соединять).'
            },
            {
              id: 'b2-beruf-2-ex-2',
              type: 'word-order',
              question: 'Соберите фразу: "Вы можете что-нибудь ему передать?"',
              correctAnswer: 'Können Sie ihm etwas ausrichten',
              options: ['Können', 'Sie', 'ihm', 'etwas', 'ausrichten'],
              explanation: 'Etwas ausrichten = передать что-то (информацию).'
            },
            {
              id: 'b2-beruf-2-ex-3',
              type: 'multiple-choice',
              question: 'Что мы пишем в конце официального письма?',
              options: ['Tschüss', 'Mit freundlichen Grüßen', 'Bis bald', 'Hallo'],
              correctAnswer: 'Mit freundlichen Grüßen',
              explanation: 'Стандартная формула вежливости в конце письма.'
            }
          ]
        },
        {
          id: 'b2-beruf-3-meetings',
          title: 'Meetings & Präsentationen',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">📊</span> Презентации и Дискуссии
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-bold text-primary text-sm mb-2">Начало презентации</h3>
                    <ul class="space-y-2 text-xs italic">
                      <li>"Ich möchte Ihnen heute ... vorstellen."</li>
                      <li>"Das Thema meines Vortrags lautet..."</li>
                      <li>"Zuerst spreche ich über ..., dann über..."</li>
                    </ul>
                  </div>
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-bold text-primary text-sm mb-2">Описание графиков</h3>
                    <ul class="space-y-2 text-xs italic">
                      <li>"Die Grafik zeigt die Entwicklung von..."</li>
                      <li>"Die Zahl ist gestiegen / gesunken."</li>
                      <li>"Im Vergleich zum Vorjahr..."</li>
                    </ul>
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="font-bold text-primary text-sm">Выражение мнения и несогласие</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div class="p-2 border rounded bg-background">
                      <strong>Мнение:</strong><br/>
                      "Ich bin der Ansicht, dass..."<br/>
                      "Meiner Meinung nach..."
                    </div>
                    <div class="p-2 border rounded bg-background">
                      <strong>Согласие:</strong><br/>
                      "Da haben Sie völlig recht."<br/>
                      "Das sehe ich auch so."
                    </div>
                    <div class="p-2 border rounded bg-background">
                      <strong>Несогласие (вежливое):</strong><br/>
                      "Da muss ich Ihnen widersprechen."<br/>
                      "Das sehe ich etwas anders, denn..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Митапы и Дискуссии',
              words: [
                { type: 'noun', german: 'Besprechung', russian: 'совещание', article: 'die', plural: 'Besprechungen', pluralArticle: 'die', exampleSingular: 'Eine wichtige Besprechung.', examplePlural: '-' },
                { type: 'noun', german: 'Tagesordnungspunkt', russian: 'пункт повестки дня', article: 'der', plural: 'Tagesordnungspunkte', pluralArticle: 'die', exampleSingular: 'Der nächste Tagesordnungspunkt.', examplePlural: '-' },
                { type: 'noun', german: 'Protokoll', russian: 'протокол meeting', article: 'das', plural: 'Protokolle', pluralArticle: 'die', exampleSingular: 'Das Protokoll führen.', examplePlural: '-' },
                { type: 'noun', german: 'Vortrag', russian: 'доклад', article: 'der', plural: 'Vorträge', pluralArticle: 'die', exampleSingular: 'Einen Vortrag halten.', examplePlural: '-' },
                { type: 'noun', german: 'Ergebnis', russian: 'результат', article: 'das', plural: 'Ergebnisse', pluralArticle: 'die', exampleSingular: 'Zu einem Ergebnis kommen.', examplePlural: '-' },
                { type: 'noun', german: 'Umsatz', russian: 'оборот (продаж)', article: 'der', plural: 'Umsätze', pluralArticle: 'die', exampleSingular: 'Der Umsatz steigt.', examplePlural: '-' },
                { type: 'verb', german: 'präsentieren', russian: 'презентовать', conjugation: 'er präsentiert', example: 'Ergebnisse präsentieren.' },
                { type: 'verb', german: 'teilnehmen', russian: 'участвовать', conjugation: 'er nimmt teil an', example: 'An einer Sitzung teilnehmen.' },
                { type: 'verb', german: 'überzeugen', russian: 'убеждать', conjugation: 'er überzeugt', example: 'Wir müssen den Kunden überzeugen.' },
                { type: 'verb', german: 'zustimmen', russian: 'соглашаться', conjugation: 'er stimmt zu', example: 'Ich stimme dir zu.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-beruf-3-ex-1',
              type: 'fill-in-the-blank',
              question: 'Wer führt heute das ___? (Пишет протокол)',
              correctAnswer: 'Protokoll',
              explanation: 'Protokoll führen — вести протокол собрания.'
            },
            {
              id: 'b2-beruf-3-ex-2',
              type: 'multiple-choice',
              question: 'Как вежливо не согласиться?',
              options: ['Du hast Unrecht', 'Das ist Quatsch', 'Das sehe ich etwas anders', 'Nein'],
              correctAnswer: 'Das sehe ich etwas anders',
              explanation: 'Дипломатичный способ выразить несогласие.'
            },
            {
              id: 'b2-beruf-3-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Число сотрудников выросло."',
              correctAnswer: 'Die Zahl der Mitarbeiter ist gestiegen',
              options: ['Die', 'Zahl', 'der', 'Mitarbeiter', 'ist', 'gestiegen'],
              explanation: 'Steigen (gestiegen) — расти (о числах/статистике).'
            }
          ]
        },
        {
          id: 'b2-beruf-4-kundenservice',
          title: 'Kundenservice: Жалобы и Решения',
          explanation: `
            <div class="space-y-6">
              <div class="bg-card p-6 rounded-xl border shadow-sm">
                <h2 class="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
                  <span class="text-primary">🛠️</span> Umgang mit Beschwerden (Работа с жалобами)
                </h2>
                <p class="text-lg mb-4 text-muted-foreground">
                  Важное правило в Германии: оставаться вежливым и искать решение (lösungsorientiert), даже если клиент зол.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-red-50/50 p-4 rounded-lg border border-red-100">
                    <h3 class="font-bold text-red-800 text-sm mb-2">Понять жалобу</h3>
                    <ul class="space-y-2 text-xs italic text-red-900">
                      <li>"Ich verstehe Ihren Ärger."</li>
                      <li>"Es tut mir leid, dass Sie unzufrieden sind."</li>
                      <li>"Können Sie mir das Problem kurz schildern?"</li>
                    </ul>
                  </div>
                  <div class="bg-green-50/50 p-4 rounded-lg border border-green-100">
                    <h3 class="font-bold text-green-800 text-sm mb-2">Предложить решение</h3>
                    <ul class="space-y-2 text-xs italic text-green-900">
                      <li>"Wir finden sicher eine Lösung."</li>
                      <li>"Ich kümmere mich sofort darum."</li>
                      <li>"Wir bieten Ihnen ... als Entschädigung an."</li>
                    </ul>
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="font-bold text-primary text-sm">Типичные слова</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div class="p-2 border rounded bg-background">
                      <strong>die Reklamation</strong><br/>
                      Официальная претензия (обычно на качество товара).
                    </div>
                    <div class="p-2 border rounded bg-background">
                      <strong>der Mangel</strong><br/>
                      Дефект, недостаток (z.B. technischer Mangel).
                    </div>
                    <div class="p-2 border rounded bg-background">
                      <strong>kulant</strong><br/>
                      Идущий навстречу (kulant sein = уступить клиенту).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Клиенты и Проблемы',
              words: [
                { type: 'noun', german: 'Beschwerde', russian: 'жалоба', article: 'die', plural: 'Beschwerden', pluralArticle: 'die', exampleSingular: 'Eine Beschwerde einreichen.', examplePlural: '-' },
                { type: 'noun', german: 'Kunde', russian: 'клиент', article: 'der', plural: 'Kunden', pluralArticle: 'die', exampleSingular: 'Der Kunde ist König.', examplePlural: '-' },
                { type: 'noun', german: 'Lösung', russian: 'решение', article: 'die', plural: 'Lösungen', pluralArticle: 'die', exampleSingular: 'Eine schnelle Lösung finden.', examplePlural: '-' },
                { type: 'noun', german: 'Geduld', russian: 'терпение', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Vielen Dank für Ihre Geduld.', examplePlural: '-' },
                { type: 'noun', german: 'Missverständnis', russian: 'недопонимание', article: 'das', plural: 'Missverständnisse', pluralArticle: 'die', exampleSingular: 'Ein Missverständnis klären.', examplePlural: '-' },
                { type: 'noun', german: 'Entschädigung', russian: 'компенсация', article: 'die', plural: 'Entschädigungen', pluralArticle: 'die', exampleSingular: 'Eine Entschädigung fordern.', examplePlural: '-' },
                { type: 'verb', german: 'sich kümmern', russian: 'заботиться/заниматься', conjugation: 'er kümmert sich um', example: 'Ich kümmere mich darum.' },
                { type: 'verb', german: 'versprechen', russian: 'обещать', conjugation: 'er verspricht', example: 'Ich kann nichts versprechen.' },
                { type: 'verb', german: 'erwarten', russian: 'ожидать', conjugation: 'er erwartet', example: 'Was erwarten Sie von uns?' },
                { type: 'adjective', german: 'dankbar', russian: 'благодарный', comparative: 'dankbarer', superlative: 'am dankbarsten', example: 'Ich wäre Ihnen sehr dankbar.' }
              ]
            }
          ],
          exercises: [
            {
              id: 'b2-beruf-4-ex-1',
              type: 'fill-in-the-blank',
              question: 'Wir bieten Ihnen einen Gutschein als ___ an. (Компенсация)',
              correctAnswer: 'Entschädigung',
              explanation: 'Entschädigung — возмещение ущерба или компенсация за неудобства.'
            },
            {
              id: 'b2-beruf-4-ex-2',
              type: 'multiple-choice',
              question: 'Что значит "kulant sein"?',
              options: ['быть грубым', 'идти навстречу', 'быть строгим', 'быть дорогим'],
              correctAnswer: 'идти навстречу',
              explanation: 'Kulanz — готовность пойти на уступки клиенту сверх обязанностей.'
            },
            {
              id: 'b2-beruf-4-ex-3',
              type: 'word-order',
              question: 'Соберите фразу: "Я займусь этим немедленно."',
              correctAnswer: 'Ich kümmere mich sofort darum',
              options: ['Ich', 'kümmere', 'mich', 'sofort', 'darum'],
              explanation: 'Sich kümmern um + Akk — заниматься чем-то.'
            }
          ]
        }
      ]
    }
  ]
};
