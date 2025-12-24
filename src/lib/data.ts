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
            <h2 class="font-headline text-2xl font-bold mb-4">Немецкий алфавит</h2>
            <p class="mb-4">В немецком алфавите 26 стандартных латинских букв, плюс 4 особых символа: <strong>Ä, Ö, Ü</strong> (умлауты) и <strong>ß</strong> (эсцет).</p>
            <h3 class="font-headline text-xl font-bold mb-2">Правила чтения:</h3>
            <ul class="list-disc list-inside space-y-2 mb-6 bg-muted p-4 rounded-lg">
              <li><strong>ei</strong> читается как <strong>ай</strong> (nein, mein)</li>
              <li><strong>ie</strong> читается как долгое <strong>и</strong> (sie, liegen)</li>
              <li><strong>eu / äu</strong> читается как <strong>ой</strong> (Euro, Häuser)</li>
              <li><strong>sch</strong> читается как <strong>ш</strong> (Schule)</li>
              <li><strong>st / sp</strong> в начале слова/корня читается как <strong>шт / шп</strong> (Sport, Straße)</li>
              <li><strong>v</strong> часто читается как <strong>ф</strong> (Vater, vier)</li>
              <li><strong>w</strong> читается как <strong>в</strong> (Wasser, wir)</li>
              <li><strong>z</strong> читается как <strong>ц</strong> (Zoo, Zeit)</li>
            </ul>
          `,
          vocabulary: [
            {
              theme: 'Первые слова',
              words: [
                { type: 'noun', german: 'Hallo', russian: 'Привет', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Hallo, wie geht es dir?', examplePlural: '-' },
                { type: 'other', german: 'Ja', russian: 'Да', example: 'Ja, bitte.' },
                { type: 'other', german: 'Nein', russian: 'Нет', example: 'Nein, danke.' },
                { type: 'other', german: 'Danke', russian: 'Спасибо', example: 'Vielen Dank!' },
                { type: 'other', german: 'Bitte', russian: 'Пожалуйста', example: 'Bitte sehr.' },
                { type: 'other', german: 'Tschüss', russian: 'Пока', example: 'Tschüss, bis morgen!' },
                { type: 'noun', german: 'Name', russian: 'Имя', article: 'der', plural: 'Namen', pluralArticle: 'die', exampleSingular: 'Mein Name ist Anna.', examplePlural: 'Namen sind wichtig.' }
              ]
            }
          ],
          exercises: []
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
          exercises: []
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
                  </div>
                   <div class="bg-card p-4 rounded-xl border">
                    <h3 class="font-bold text-center border-b pb-2 mb-2">Feminin (Die) / Plural</h3>
                    <p class="text-center"><em>Das ist <strong>mein<span class="text-accent">e</span></strong> Mutter.</em></p>
                    <p class="text-center"><em>Das sind <strong>mein<span class="text-accent">e</span></strong> Eltern.</em></p>
                    <p class="text-center text-sm text-muted-foreground mt-1">(окончание -e)</p>
                  </div>
                  <div class="bg-card p-4 rounded-xl border">
                    <h3 class="font-bold text-center border-b pb-2 mb-2">Neutrum (Das)</h3>
                    <p class="text-center"><em>Das ist <strong>mein</strong> Kind.</em></p>
                    <p class="text-center text-sm text-muted-foreground mt-1">(нет окончания)</p>
                  </div>
                </div>

                <ul class="list-none space-y-2 bg-muted p-4 rounded-lg">
                  <li><strong>ich → mein</strong> (мой)</li>
                  <li><strong>du → dein</strong> (твой)</li>
                  <li><strong>er/es → sein</strong> (его)</li>
                  <li><strong>sie → ihr</strong> (ее)</li>
                  <li><strong>wir → unser</strong> (наш)</li>
                  <li><strong>ihr → euer</strong> (ваш)</li>
                  <li><strong>Sie/sie → Ihr/ihr</strong> (Ваш/их)</li>
                </ul>
              </section>
            </div>
          `,
          vocabulary: [
            {
              theme: 'Члены семьи',
              words: [
                { type: 'noun', german: 'Familie', russian: 'семья', article: 'die', plural: 'Familien', pluralArticle: 'die', exampleSingular: 'Meine Familie ist groß.', examplePlural: 'Viele Familien wohnen hier.' },
                { type: 'noun', german: 'Eltern', russian: 'родители', article: 'die', plural: 'Eltern', pluralArticle: 'die', exampleSingular: '(Только мн.ч.) Meine Eltern sind nett.', examplePlural: 'Meine Eltern sind nett.' },
                { type: 'noun', german: 'Vater', russian: 'отец', article: 'der', plural: 'Väter', pluralArticle: 'die', exampleSingular: 'Mein Vater arbeitet viel.', examplePlural: 'Die Väter spielen Fußball.' },
                { type: 'noun', german: 'Mutter', russian: 'мать', article: 'die', plural: 'Mütter', pluralArticle: 'die', exampleSingular: 'Meine Mutter kocht gut.', examplePlural: 'Die Mütter treffen sich.' },
                { type: 'noun', german: 'Kind', russian: 'ребенок', article: 'das', plural: 'Kinder', pluralArticle: 'die', exampleSingular: 'Das Kind spielt.', examplePlural: 'Die Kinder gehen zur Schule.' },
                { type: 'noun', german: 'Sohn', russian: 'сын', article: 'der', plural: 'Söhne', pluralArticle: 'die', exampleSingular: 'Er hat einen Sohn.', examplePlural: 'Seine Söhne sind erwachsen.' },
                { type: 'noun', german: 'Tochter', russian: 'дочь', article: 'die', plural: 'Töchter', pluralArticle: 'die', exampleSingular: 'Sie hat eine Tochter.', examplePlural: 'Ihre Töchter sind Zwillinge.' },
                { type: 'noun', german: 'Bruder', russian: 'брат', article: 'der', plural: 'Brüder', pluralArticle: 'die', exampleSingular: 'Mein Bruder ist älter als ich.', examplePlural: 'Ich habe zwei Brüder.' },
                { type: 'noun', german: 'Schwester', russian: 'сестра', article: 'die', plural: 'Schwestern', pluralArticle: 'die', exampleSingular: 'Meine Schwester wohnt in Berlin.', examplePlural: 'Meine Schwestern sind Freunde.' },
                { type: 'noun', german: 'Großeltern', russian: 'бабушка и дедушка', article: 'die', plural: 'Großeltern', pluralArticle: 'die', exampleSingular: '-', examplePlural: 'Meine Großeltern leben auf dem Land.' },
                { type: 'noun', german: 'Opa', russian: 'дедушка', article: 'der', plural: 'Opas', pluralArticle: 'die', exampleSingular: 'Mein Opa ist lustig.', examplePlural: 'Beide Opas kommen zu Besuch.' },
                { type: 'noun', german: 'Oma', russian: 'бабушка', article: 'die', plural: 'Omas', pluralArticle: 'die', exampleSingular: 'Meine Oma backt Kuchen.', examplePlural: 'Omas erzählen Geschichten.' },
                { type: 'noun', german: 'Freund', russian: 'друг', article: 'der', plural: 'Freunde', pluralArticle: 'die', exampleSingular: 'Das ist mein Freund.', examplePlural: 'Ich treffe Freunde.' },
                { type: 'noun', german: 'Freundin', russian: 'подруга', article: 'die', plural: 'Freundinnen', pluralArticle: 'die', exampleSingular: 'Das ist meine Freundin.', examplePlural: 'Meine Freundinnen gehen ins Kino.' },
                { type: 'verb', german: 'haben', russian: 'иметь', conjugation: 'er hat', example: 'Ich habe eine Schwester.' },
                { type: 'verb', german: 'lieben', russian: 'любить', conjugation: 'er liebt', example: 'Ich liebe meine Familie.' },
                { type: 'verb', german: 'leben', russian: 'жить (существовать)', conjugation: 'er lebt', example: 'Mein Opa lebt noch.' },
                { type: 'other', german: 'verheiratet', russian: 'женатый/замужем', example: 'Ich bin verheiratet.' },
                { type: 'other', german: 'ledig', russian: 'холостой/незамужняя', example: 'Er ist ledig.' }
              ]
            }
          ],
          exercises: []
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
            <h2 class="font-headline text-2xl font-bold mb-4">Präpositionen: Wohin? (Куда?)</h2>
            <p class="mb-4">Когда мы движемся <strong>Куда? (Wohin?)</strong>, мы используем <strong>Akkusativ</strong>.</p>
            <ul class="list-disc list-inside space-y-2 mb-6 bg-muted p-4 rounded-lg">
              <li>Ich gehe <strong>in den</strong> Park. (в парк)</li>
              <li>Wir fahren <strong>an den</strong> Strand. (на пляж)</li>
              <li>Er fliegt <strong>in die</strong> Türkei. (в Турцию)</li>
            </ul>
          `,
          vocabulary: [
            {
              theme: 'На вокзале и в пути',
              words: [
                { type: 'noun', german: 'Bahnhof', russian: 'вокзал', article: 'der', plural: 'Bahnhöfe', pluralArticle: 'die', exampleSingular: 'Der Zug steht am Bahnhof.', examplePlural: 'Die Bahnhöfe sind oft voll.' },
                { type: 'noun', german: 'Zug', russian: 'поезд', article: 'der', plural: 'Züge', pluralArticle: 'die', exampleSingular: 'Der Zug hat Verspätung.', examplePlural: 'Züge fahren schnell.' },
                { type: 'noun', german: 'Gleis', russian: 'путь (платформа)', article: 'das', plural: 'Gleise', pluralArticle: 'die', exampleSingular: 'Der Zug fährt von Gleis 5.', examplePlural: '-' },
                { type: 'noun', german: 'Flughafen', russian: 'аэропорт', article: 'der', plural: 'Flughäfen', pluralArticle: 'die', exampleSingular: 'Wir fahren zum Flughafen.', examplePlural: '-' },
                { type: 'noun', german: 'Flugzeug', russian: 'самолет', article: 'das', plural: 'Flugzeuge', pluralArticle: 'die', exampleSingular: 'Das Flugzeug landet.', examplePlural: 'Viele Flugzeuge am Himmel.' },
                { type: 'noun', german: 'Koffer', russian: 'чемодан', article: 'der', plural: 'Koffer', pluralArticle: 'die', exampleSingular: 'Mein Koffer ist schwer.', examplePlural: 'Koffer packen.' },
                { type: 'noun', german: 'Fahrkarte', russian: 'билет (проездной)', article: 'die', plural: 'Fahrkarten', pluralArticle: 'die', exampleSingular: 'Geben Sie mir bitte eine Fahrkarte.', examplePlural: 'Fahrkarten bitte!' },
                { type: 'verb', german: 'reisen', russian: 'путешествовать', conjugation: 'ich reise', example: 'Ich reise gern.' },
                { type: 'verb', german: 'abfahren', russian: 'отправляться', conjugation: 'er fährt ab', example: 'Der Bus fährt gleich ab.' },
                { type: 'verb', german: 'ankommen', russian: 'прибывать', conjugation: 'er kommt an', example: 'Wann kommen wir an?' },
                { type: 'verb', german: 'einsteigen', russian: 'входить', conjugation: 'ich steige ein', example: 'Bitte schnell einsteigen.' },
                { type: 'verb', german: 'aussteigen', russian: 'выходить', conjugation: 'ich steige aus', example: 'Wir müssen hier aussteigen.' },
                { type: 'verb', german: 'umsteigen', russian: 'делать пересадку', conjugation: 'ich steige um', example: 'Wir müssen in Berlin umsteigen.' },
                { type: 'preposition', german: 'nach', russian: 'в (города)', case: 'Dativ', example: 'Ich fahre nach Berlin.' },
                { type: 'adverb', german: 'pünktlich', russian: 'вовремя', example: 'Der Zug ist pünktlich.' },
                { type: 'adverb', german: 'geradeaus', russian: 'прямо', example: 'Gehen Sie geradeaus.' },
                { type: 'adverb', german: 'links', russian: 'слева', example: 'Biegen Sie links ab.' },
                { type: 'adverb', german: 'rechts', russian: 'справа', example: 'Dann rechts.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-2-hotel',
          title: 'A2.2 Путешествия: Отель',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Вежливые просьбы</h2>
             <ul class="list-disc list-inside space-y-2 mb-6 bg-muted p-4 rounded-lg">
              <li>Ich <strong>hätte gern</strong> ein Doppelzimmer.</li>
              <li>Ich <strong>würde gern</strong> einchecken.</li>
            </ul>
          `,
          vocabulary: [
            {
              theme: 'Проживание',
              words: [
                { type: 'noun', german: 'Hotel', russian: 'отель', article: 'das', plural: 'Hotels', pluralArticle: 'die', exampleSingular: 'Das Hotel ist schön.', examplePlural: '-' },
                { type: 'noun', german: 'Rezeption', russian: 'ресепшн', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'An der Rezeption.', examplePlural: '-' },
                { type: 'noun', german: 'Schlüssel', russian: 'ключ', article: 'der', plural: 'Schlüssel', pluralArticle: 'die', exampleSingular: 'Hier ist Ihr Schlüssel.', examplePlural: '-' },
                { type: 'noun', german: 'Ausweis', russian: 'паспорт', article: 'der', plural: 'Ausweise', pluralArticle: 'die', exampleSingular: 'Ihren Ausweis bitte.', examplePlural: '-' },
                { type: 'noun', german: 'Formular', russian: 'бланк', article: 'das', plural: 'Formulare', pluralArticle: 'die', exampleSingular: 'Füllen Sie das Formular aus.', examplePlural: '-' },
                { type: 'noun', german: 'Übernachtung', russian: 'ночевка', article: 'die', plural: 'Übernachtungen', pluralArticle: 'die', exampleSingular: 'Eine Übernachtung.', examplePlural: '-' },
                { type: 'noun', german: 'Frühstück', russian: 'завтрак', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Mit Frühstück.', examplePlural: '-' },
                { type: 'verb', german: 'ausfüllen', russian: 'заполнять', conjugation: 'ich fülle aus', example: 'Bitte ausfüllen.' },
                { type: 'verb', german: 'unterschreiben', russian: 'подписывать', conjugation: 'ich unterschreibe', example: 'Hier unterschreiben.' },
                { type: 'verb', german: 'reservieren', russian: 'резервировать', conjugation: 'ich reserviere', example: 'Ich habe reserviert.' },
                { type: 'adjective', german: 'frei', russian: 'свободный', comparative: '-', superlative: '-', example: 'Ist das Zimmer frei?' },
                { type: 'adjective', german: 'belegt', russian: 'занят', comparative: '-', superlative: '-', example: 'Alles belegt.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-3-korper',
          title: 'A2.3 Здоровье: Тело',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Притяжательные местоимения</h2>
            <p class="mb-4">Mein, dein, sein, ihr...</p>
          `,
          vocabulary: [
            {
              theme: 'Части тела',
              words: [
                { type: 'noun', german: 'Körper', russian: 'тело', article: 'der', plural: 'Körper', pluralArticle: 'die', exampleSingular: 'Gesunder Körper.', examplePlural: '-' },
                { type: 'noun', german: 'Kopf', russian: 'голова', article: 'der', plural: 'Köpfe', pluralArticle: 'die', exampleSingular: 'Mein Kopf tut weh.', examplePlural: '-' },
                { type: 'noun', german: 'Hals', russian: 'шея', article: 'der', plural: 'Hälse', pluralArticle: 'die', exampleSingular: 'Halsweh.', examplePlural: '-' },
                { type: 'noun', german: 'Rücken', russian: 'спина', article: 'der', plural: 'Rücken', pluralArticle: 'die', exampleSingular: 'Mein Rücken.', examplePlural: '-' },
                { type: 'noun', german: 'Bauch', russian: 'живот', article: 'der', plural: 'Bäuche', pluralArticle: 'die', exampleSingular: 'Bauchweh.', examplePlural: '-' },
                { type: 'noun', german: 'Arm', russian: 'рука', article: 'der', plural: 'Arme', pluralArticle: 'die', exampleSingular: 'Mein Arm.', examplePlural: '-' },
                { type: 'noun', german: 'Hand', russian: 'кисть руки', article: 'die', plural: 'Hände', pluralArticle: 'die', exampleSingular: 'Gib mir die Hand.', examplePlural: '-' },
                { type: 'noun', german: 'Finger', russian: 'палец', article: 'der', plural: 'Finger', pluralArticle: 'die', exampleSingular: 'Der Finger.', examplePlural: '-' },
                { type: 'noun', german: 'Bein', russian: 'нога', article: 'das', plural: 'Beine', pluralArticle: 'die', exampleSingular: 'Mein Bein.', examplePlural: '-' },
                { type: 'noun', german: 'Fuß', russian: 'стопа', article: 'der', plural: 'Füße', pluralArticle: 'die', exampleSingular: 'Mein Fuß.', examplePlural: '-' },
                { type: 'noun', german: 'Auge', russian: 'глаз', article: 'das', plural: 'Augen', pluralArticle: 'die', exampleSingular: 'Blaue Augen.', examplePlural: '-' },
                { type: 'noun', german: 'Ohr', russian: 'ухо', article: 'das', plural: 'Ohren', pluralArticle: 'die', exampleSingular: 'Linkes Ohr.', examplePlural: '-' },
                { type: 'noun', german: 'Mund', russian: 'рот', article: 'der', plural: 'Münder', pluralArticle: 'die', exampleSingular: 'Mund auf.', examplePlural: '-' },
                { type: 'noun', german: 'Nase', russian: 'нос', article: 'die', plural: 'Nasen', pluralArticle: 'die', exampleSingular: 'Die Nase.', examplePlural: '-' },
                { type: 'verb', german: 'weh tun', russian: 'болеть', conjugation: 'es tut weh', example: 'Es tut weh.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-4-arzt',
          title: 'A2.4 Здоровье: У врача',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Императив</h2>
            <p class="mb-4">Bleiben Sie! Nimm!</p>
          `,
          vocabulary: [
            {
              theme: 'Лечение',
              words: [
                { type: 'noun', german: 'Arzt', russian: 'врач', article: 'der', plural: 'Ärzte', pluralArticle: 'die', exampleSingular: 'Der Arzt hilft.', examplePlural: '-' },
                { type: 'noun', german: 'Praxis', russian: 'практика', article: 'die', plural: 'Praxen', pluralArticle: 'die', exampleSingular: 'In der Praxis.', examplePlural: '-' },
                { type: 'noun', german: 'Termin', russian: 'прием/встреча', article: 'der', plural: 'Termine', pluralArticle: 'die', exampleSingular: 'Einen Termin haben.', examplePlural: '-' },
                { type: 'noun', german: 'Krankheit', russian: 'болезнь', article: 'die', plural: 'Krankheiten', pluralArticle: 'die', exampleSingular: 'Schlimme Krankheit.', examplePlural: '-' },
                { type: 'noun', german: 'Fieber', russian: 'жар', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Fieber haben.', examplePlural: '-' },
                { type: 'noun', german: 'Husten', russian: 'кашель', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Husten haben.', examplePlural: '-' },
                { type: 'noun', german: 'Schnupfen', russian: 'насморк', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Schnupfen haben.', examplePlural: '-' },
                { type: 'noun', german: 'Tablette', russian: 'таблетка', article: 'die', plural: 'Tabletten', pluralArticle: 'die', exampleSingular: 'Tablette nehmen.', examplePlural: '-' },
                { type: 'noun', german: 'Apotheke', russian: 'аптека', article: 'die', plural: 'Apotheken', pluralArticle: 'die', exampleSingular: 'Zur Apotheke gehen.', examplePlural: '-' },
                { type: 'noun', german: 'Rezept', russian: 'рецепт', article: 'das', plural: 'Rezepte', pluralArticle: 'die', exampleSingular: 'Das Rezept.', examplePlural: '-' },
                { type: 'verb', german: 'untersuchen', russian: 'осматривать', conjugation: 'er untersucht', example: 'Arzt untersucht.' },
                { type: 'verb', german: 'verschreiben', russian: 'прописывать', conjugation: 'er verschreibt', example: 'Rezept verschreiben.' },
                { type: 'verb', german: 'fehlen', russian: 'болеть/не хватать', conjugation: 'es fehlt', example: 'Was fehlt Ihnen?' },
                { type: 'adjective', german: 'krank', russian: 'больной', comparative: 'kränker', superlative: 'am kränksten', example: 'Ich bin krank.' },
                { type: 'adjective', german: 'gesund', russian: 'здоровый', comparative: 'gesünder', superlative: 'am gesündesten', example: 'Er ist gesund.' },
                { type: 'other', german: 'gute Besserung', russian: 'Выздоравливайте!', example: 'Gute Besserung!' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-5-wohnen',
          title: 'A2.5 Жилье: Обстановка',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Прилагательные</h2>
            <p class="mb-4">Красивый дом, новая мебель.</p>
          `,
          vocabulary: [
            {
              theme: 'Мебель',
              words: [
                { type: 'noun', german: 'Wohnzimmer', russian: 'гостиная', article: 'das', plural: 'Wohnzimmer', pluralArticle: 'die', exampleSingular: 'Im Wohnzimmer.', examplePlural: '-' },
                { type: 'noun', german: 'Schlafzimmer', russian: 'спальня', article: 'das', plural: 'Schlafzimmer', pluralArticle: 'die', exampleSingular: 'Im Schlafzimmer.', examplePlural: '-' },
                { type: 'noun', german: 'Küche', russian: 'кухня', article: 'die', plural: 'Küchen', pluralArticle: 'die', exampleSingular: 'In der Küche.', examplePlural: '-' },
                { type: 'noun', german: 'Bad', russian: 'ванная', article: 'das', plural: 'Bäder', pluralArticle: 'die', exampleSingular: 'Im Bad.', examplePlural: '-' },
                { type: 'noun', german: 'Tisch', russian: 'стол', article: 'der', plural: 'Tische', pluralArticle: 'die', exampleSingular: 'Der Tisch.', examplePlural: '-' },
                { type: 'noun', german: 'Stuhl', russian: 'стул', article: 'der', plural: 'Stühle', pluralArticle: 'die', exampleSingular: 'Der Stuhl.', examplePlural: '-' },
                { type: 'noun', german: 'Sofa', russian: 'диван', article: 'das', plural: 'Sofas', pluralArticle: 'die', exampleSingular: 'Das Sofa.', examplePlural: '-' },
                { type: 'noun', german: 'Bett', russian: 'кровать', article: 'das', plural: 'Betten', pluralArticle: 'die', exampleSingular: 'Das Bett.', examplePlural: '-' },
                { type: 'noun', german: 'Schrank', russian: 'шкаф', article: 'der', plural: 'Schränke', pluralArticle: 'die', exampleSingular: 'Der Schrank.', examplePlural: '-' },
                { type: 'noun', german: 'Lampe', russian: 'лампа', article: 'die', plural: 'Lampen', pluralArticle: 'die', exampleSingular: 'Die Lampe.', examplePlural: '-' },
                { type: 'adjective', german: 'bequem', russian: 'удобный', comparative: 'bequemer', superlative: 'am bequemsten', example: 'Sehr bequem.' },
                { type: 'adjective', german: 'unbequem', russian: 'неудобный', comparative: '-', superlative: '-', example: 'Zu unbequem.' },
                { type: 'adjective', german: 'hell', russian: 'светлый', comparative: 'heller', superlative: 'am hellsten', example: 'Helles Zimmer.' },
                { type: 'adjective', german: 'dunkel', russian: 'темный', comparative: 'dunkler', superlative: 'am dunkelsten', example: 'Dunkles Zimmer.' },
                { type: 'adjective', german: 'gemütlich', russian: 'уютный', comparative: 'gemütlicher', superlative: 'am gemütlichsten', example: 'Sehr gemütlich.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-6-mieten',
          title: 'A2.6 Жилье: Аренда',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Модальные глаголы</h2>
            <p class="mb-4">Dürfen (можно), Müssen (нужно).</p>
          `,
          vocabulary: [
            {
              theme: 'Аренда',
              words: [
                { type: 'noun', german: 'Wohnung', russian: 'квартира', article: 'die', plural: 'Wohnungen', pluralArticle: 'die', exampleSingular: 'Schöne Wohnung.', examplePlural: '-' },
                { type: 'noun', german: 'Haus', russian: 'дом', article: 'das', plural: 'Häuser', pluralArticle: 'die', exampleSingular: 'Das Haus.', examplePlural: '-' },
                { type: 'noun', german: 'Miete', russian: 'аренда', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Die Miete.', examplePlural: '-' },
                { type: 'noun', german: 'Vermieter', russian: 'арендодатель', article: 'der', plural: 'Vermieter', pluralArticle: 'die', exampleSingular: 'Der Vermieter.', examplePlural: '-' },
                { type: 'noun', german: 'Nachbar', russian: 'сосед', article: 'der', plural: 'Nachbarn', pluralArticle: 'die', exampleSingular: 'Der Nachbar.', examplePlural: '-' },
                { type: 'verb', german: 'suchen', russian: 'искать', conjugation: 'ich suche', example: 'Wohnung suchen.' },
                { type: 'verb', german: 'finden', russian: 'находить', conjugation: 'ich finde', example: 'Wohnung finden.' },
                { type: 'verb', german: 'umziehen', russian: 'переезжать', conjugation: 'ich ziehe um', example: 'Wir ziehen um.' },
                { type: 'verb', german: 'einziehen', russian: 'въезжать', conjugation: 'ich ziehe ein', example: 'Morgen einziehen.' },
                { type: 'verb', german: 'ausziehen', russian: 'выезжать', conjugation: 'ich ziehe aus', example: 'Bald ausziehen.' },
                { type: 'verb', german: 'bezahlen', russian: 'платить', conjugation: 'ich bezahle', example: 'Miete bezahlen.' },
                { type: 'adjective', german: 'teuer', russian: 'дорогой', comparative: 'teurer', superlative: 'am teuersten', example: 'Zu teuer.' },
                { type: 'adjective', german: 'billig', russian: 'дешевый', comparative: 'billiger', superlative: 'am billigsten', example: 'Sehr billig.' },
                { type: 'adjective', german: 'günstig', russian: 'выгодный', comparative: 'günstiger', superlative: 'am günstigsten', example: 'Günstig.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-7-routine',
          title: 'A2.7 Работа: Рутина',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Возвратные глаголы</h2>
            <p class="mb-4">sich waschen - умываться.</p>
          `,
          vocabulary: [
            {
              theme: 'Распорядок',
              words: [
                { type: 'noun', german: 'Alltag', russian: 'будни', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Der Alltag.', examplePlural: '-' },
                { type: 'noun', german: 'Wecker', russian: 'будильник', article: 'der', plural: 'Wecker', pluralArticle: 'die', exampleSingular: 'Der Wecker.', examplePlural: '-' },
                { type: 'noun', german: 'Pause', russian: 'перерыв', article: 'die', plural: 'Pausen', pluralArticle: 'die', exampleSingular: 'Eine Pause machen.', examplePlural: '-' },
                { type: 'noun', german: 'Feierabend', russian: 'конец работы', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Feierabend!', examplePlural: '-' },
                { type: 'verb', german: 'aufstehen', russian: 'вставать', conjugation: 'ich stehe auf', example: 'Ich stehe auf.' },
                { type: 'verb', german: 'aufwachen', russian: 'просыпаться', conjugation: 'ich wache auf', example: 'Ich wache auf.' },
                { type: 'verb', german: 'sich waschen', russian: 'мыться', conjugation: 'ich wasche mich', example: 'Ich wasche mich.' },
                { type: 'verb', german: 'sich anziehen', russian: 'одеваться', conjugation: 'ich ziehe mich an', example: 'Ich ziehe mich an.' },
                { type: 'verb', german: 'frühstücken', russian: 'завтракать', conjugation: 'ich frühstücke', example: 'Ich frühstücke.' },
                { type: 'verb', german: 'losgehen', russian: 'выходить', conjugation: 'ich gehe los', example: 'Ich gehe los.' },
                { type: 'verb', german: 'anfangen', russian: 'начинать', conjugation: 'es fängt an', example: 'Es fängt an.' },
                { type: 'verb', german: 'aufhören', russian: 'заканчивать', conjugation: 'es hört auf', example: 'Es hört auf.' },
                { type: 'verb', german: 'einkaufen', russian: 'покупать продукты', conjugation: 'ich kaufe ein', example: 'Ich kaufe ein.' },
                { type: 'verb', german: 'fernsehen', russian: 'смотреть ТВ', conjugation: 'ich sehe fern', example: 'Ich sehe fern.' },
                { type: 'verb', german: 'schlafen', russian: 'спать', conjugation: 'er schläft', example: 'Gute Nacht.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'a2-8-jobsuche',
          title: 'A2.8 Работа: Поиск',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Perfekt</h2>
            <p class="mb-4">Ich habe gearbeitet.</p>
          `,
          vocabulary: [
            {
              theme: 'Работа',
              words: [
                { type: 'noun', german: 'Arbeit', russian: 'работа', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Viel Arbeit.', examplePlural: '-' },
                { type: 'noun', german: 'Job', russian: 'джоб/работа', article: 'der', plural: 'Jobs', pluralArticle: 'die', exampleSingular: 'Guter Job.', examplePlural: '-' },
                { type: 'noun', german: 'Beruf', russian: 'профессия', article: 'der', plural: 'Berufe', pluralArticle: 'die', exampleSingular: 'Mein Beruf.', examplePlural: '-' },
                { type: 'noun', german: 'Bewerbung', russian: 'резюме/заявка', article: 'die', plural: 'Bewerbungen', pluralArticle: 'die', exampleSingular: 'Bewerbung schreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Chef', russian: 'босс', article: 'der', plural: 'Chefs', pluralArticle: 'die', exampleSingular: 'Der Chef.', examplePlural: '-' },
                { type: 'noun', german: 'Kollege', russian: 'коллега', article: 'der', plural: 'Kollegen', pluralArticle: 'die', exampleSingular: 'Der Kollege.', examplePlural: '-' },
                { type: 'noun', german: 'Büro', russian: 'офис', article: 'das', plural: 'Büros', pluralArticle: 'die', exampleSingular: 'Im Büro.', examplePlural: '-' },
                { type: 'noun', german: 'Computer', russian: 'компьютер', article: 'der', plural: 'Computer', pluralArticle: 'die', exampleSingular: 'Der Computer.', examplePlural: '-' },
                { type: 'verb', german: 'arbeiten', russian: 'работать', conjugation: 'ich arbeite', example: 'Ich arbeite.' },
                { type: 'verb', german: 'studieren', russian: 'учиться (вуз)', conjugation: 'ich studiere', example: 'Ich studiere.' },
                { type: 'verb', german: 'lernen', russian: 'учить', conjugation: 'ich lerne', example: 'Ich lerne.' },
                { type: 'verb', german: 'verdienen', russian: 'зарабатывать', conjugation: 'ich verdiene', example: 'Geld verdienen.' },
                { type: 'adjective', german: 'interessant', russian: 'интересный', comparative: 'interessanter', superlative: 'am interessantesten', example: 'Interessant.' },
                { type: 'adjective', german: 'langweilig', russian: 'скучный', comparative: 'langweiliger', superlative: 'am langweiligsten', example: 'Langweilig.' },
                { type: 'adjective', german: 'schwer', russian: 'трудный', comparative: 'schwerer', superlative: 'am schwersten', example: 'Schwer.' },
                { type: 'adjective', german: 'leicht', russian: 'легкий', comparative: 'leichter', superlative: 'am leichtesten', example: 'Leicht.' }
              ]
            }
          ],
          exercises: []
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
          title: 'B1.1 СМИ: Новости',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Relativsätze</h2>
            <p class="mb-4">Der Mann, den ich sehe...</p>
          `,
          vocabulary: [
            {
              theme: 'Информация',
              words: [
                { type: 'noun', german: 'Nachricht', russian: 'новость', article: 'die', plural: 'Nachrichten', pluralArticle: 'die', exampleSingular: 'Die Nachricht.', examplePlural: '-' },
                { type: 'noun', german: 'Zeitung', russian: 'газета', article: 'die', plural: 'Zeitungen', pluralArticle: 'die', exampleSingular: 'Die Zeitung.', examplePlural: '-' },
                { type: 'noun', german: 'Artikel', russian: 'статья', article: 'der', plural: 'Artikel', pluralArticle: 'die', exampleSingular: 'Der Artikel.', examplePlural: '-' },
                { type: 'noun', german: 'Information', russian: 'информация', article: 'die', plural: 'Informationen', pluralArticle: 'die', exampleSingular: 'Die Info.', examplePlural: '-' },
                { type: 'verb', german: 'sich informieren', russian: 'узнавать', conjugation: 'ich informiere mich', example: 'Ich informiere mich.' },
                { type: 'verb', german: 'lesen', russian: 'читать', conjugation: 'er liest', example: 'Er liest.' },
                { type: 'verb', german: 'glauben', russian: 'верить', conjugation: 'ich glaube', example: 'Ich glaube dir.' },
                { type: 'adjective', german: 'aktuell', russian: 'актуальный', comparative: 'aktueller', superlative: 'am aktuellsten', example: 'Aktuell.' },
                { type: 'adjective', german: 'wahr', russian: 'истинный', comparative: 'wahrer', superlative: 'am wahrsten', example: 'Das ist wahr.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-2-medien-digital',
          title: 'B1.2 СМИ: Интернет',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Anglizismen</h2>
            <p class="mb-4">Downloaden, Liken.</p>
          `,
          vocabulary: [
            {
              theme: 'Интернет',
              words: [
                { type: 'noun', german: 'Internet', russian: 'интернет', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Internet.', examplePlural: '-' },
                { type: 'noun', german: 'Netzwerk', russian: 'сеть', article: 'das', plural: 'Netzwerke', pluralArticle: 'die', exampleSingular: 'Netzwerk.', examplePlural: '-' },
                { type: 'noun', german: 'Account', russian: 'аккаунт', article: 'der', plural: 'Accounts', pluralArticle: 'die', exampleSingular: 'Account.', examplePlural: '-' },
                { type: 'noun', german: 'Passwort', russian: 'пароль', article: 'das', plural: 'Passwörter', pluralArticle: 'die', exampleSingular: 'Passwort.', examplePlural: '-' },
                { type: 'noun', german: 'Datei', russian: 'файл', article: 'die', plural: 'Dateien', pluralArticle: 'die', exampleSingular: 'Datei.', examplePlural: '-' },
                { type: 'verb', german: 'hochladen', russian: 'загружать', conjugation: 'ich lade hoch', example: 'Hochladen.' },
                { type: 'verb', german: 'herunterladen', russian: 'скачивать', conjugation: 'ich lade herunter', example: 'Herunterladen.' },
                { type: 'verb', german: 'löschen', russian: 'удалять', conjugation: 'ich lösche', example: 'Löschen.' },
                { type: 'verb', german: 'speichern', russian: 'сохранять', conjugation: 'ich speichere', example: 'Speichern.' },
                { type: 'verb', german: 'teilen', russian: 'делиться', conjugation: 'ich teile', example: 'Teilen.' },
                { type: 'adjective', german: 'online', russian: 'онлайн', comparative: '-', superlative: '-', example: 'Online.' },
                { type: 'adjective', german: 'offline', russian: 'офлайн', comparative: '-', superlative: '-', example: 'Offline.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-3-umwelt-natur',
          title: 'B1.3 Экология: Природа',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Сложные слова</h2>
            <p class="mb-4">Mülltonne.</p>
          `,
          vocabulary: [
            {
              theme: 'Природа',
              words: [
                { type: 'noun', german: 'Umwelt', russian: 'экология', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Umwelt.', examplePlural: '-' },
                { type: 'noun', german: 'Natur', russian: 'природа', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Natur.', examplePlural: '-' },
                { type: 'noun', german: 'Wald', russian: 'лес', article: 'der', plural: 'Wälder', pluralArticle: 'die', exampleSingular: 'Wald.', examplePlural: '-' },
                { type: 'noun', german: 'Luft', russian: 'воздух', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Luft.', examplePlural: '-' },
                { type: 'noun', german: 'Klima', russian: 'климат', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Klima.', examplePlural: '-' },
                { type: 'noun', german: 'Tier', russian: 'животное', article: 'das', plural: 'Tiere', pluralArticle: 'die', exampleSingular: 'Tier.', examplePlural: '-' },
                { type: 'noun', german: 'Pflanze', russian: 'растение', article: 'die', plural: 'Pflanzen', pluralArticle: 'die', exampleSingular: 'Pflanze.', examplePlural: '-' },
                { type: 'verb', german: 'wachsen', russian: 'расти', conjugation: 'er wächst', example: 'Es wächst.' },
                { type: 'verb', german: 'blühen', russian: 'цвести', conjugation: 'es blüht', example: 'Es blüht.' },
                { type: 'adjective', german: 'natürlich', russian: 'естественный', comparative: 'natürlicher', superlative: 'am natürlichsten', example: 'Natürlich.' },
                { type: 'adjective', german: 'frisch', russian: 'свежий', comparative: 'frischer', superlative: 'am frischesten', example: 'Frisch.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-4-umwelt-schutz',
          title: 'B1.4 Экология: Защита',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Um...zu</h2>
            <p class="mb-4">Чтобы...</p>
          `,
          vocabulary: [
            {
              theme: 'Защита',
              words: [
                { type: 'noun', german: 'Schutz', russian: 'защита', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Schutz.', examplePlural: '-' },
                { type: 'noun', german: 'Müll', russian: 'мусор', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Müll.', examplePlural: '-' },
                { type: 'noun', german: 'Energie', russian: 'энергия', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Energie.', examplePlural: '-' },
                { type: 'noun', german: 'Strom', russian: 'ток', article: 'der', plural: '-', pluralArticle: '-', exampleSingular: 'Strom.', examplePlural: '-' },
                { type: 'verb', german: 'schützen', russian: 'защищать', conjugation: 'ich schütze', example: 'Schützen.' },
                { type: 'verb', german: 'sparen', russian: 'экономить', conjugation: 'ich spare', example: 'Sparen.' },
                { type: 'verb', german: 'vermeiden', russian: 'избегать', conjugation: 'ich vermeide', example: 'Vermeiden.' },
                { type: 'verb', german: 'wegwerfen', russian: 'выбрасывать', conjugation: 'ich werfe weg', example: 'Wegwerfen.' },
                { type: 'verb', german: 'recyceln', russian: 'перерабатывать', conjugation: 'ich recycle', example: 'Recyceln.' },
                { type: 'adjective', german: 'umweltfreundlich', russian: 'эко-френдли', comparative: '-', superlative: '-', example: 'Gut.' },
                { type: 'adjective', german: 'schädlich', russian: 'вредный', comparative: 'schädlicher', superlative: 'am schädlichsten', example: 'Schädlich.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-5-beziehung-emotion',
          title: 'B1.5 Отношения: Эмоции',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Reflexiv mit Präpositionen</h2>
            <p class="mb-4">Sich ärgern über...</p>
          `,
          vocabulary: [
            {
              theme: 'Эмоции',
              words: [
                { type: 'noun', german: 'Gefühl', russian: 'чувство', article: 'das', plural: 'Gefühle', pluralArticle: 'die', exampleSingular: 'Gefühl.', examplePlural: '-' },
                { type: 'noun', german: 'Angst', russian: 'страх', article: 'die', plural: 'Ängste', pluralArticle: 'die', exampleSingular: 'Angst.', examplePlural: '-' },
                { type: 'noun', german: 'Freude', russian: 'радость', article: 'die', plural: 'Freuden', pluralArticle: 'die', exampleSingular: 'Freude.', examplePlural: '-' },
                { type: 'noun', german: 'Wut', russian: 'гнев', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Wut.', examplePlural: '-' },
                { type: 'noun', german: 'Liebe', russian: 'любовь', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Liebe.', examplePlural: '-' },
                { type: 'verb', german: 'fühlen', russian: 'чувствовать', conjugation: 'ich fühle', example: 'Fühlen.' },
                { type: 'verb', german: 'lachen', russian: 'смеяться', conjugation: 'ich lache', example: 'Lachen.' },
                { type: 'verb', german: 'weinen', russian: 'плакать', conjugation: 'ich weine', example: 'Weinen.' },
                { type: 'adjective', german: 'glücklich', russian: 'счастливый', comparative: 'glücklicher', superlative: 'am glücklichsten', example: 'Glücklich.' },
                { type: 'adjective', german: 'traurig', russian: 'грустный', comparative: 'trauriger', superlative: 'am traurigsten', example: 'Traurig.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-6-beziehung-konflikt',
          title: 'B1.6 Отношения: Конфликт',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Reziprok</h2>
            <p class="mb-4">Einander helfen.</p>
          `,
          vocabulary: [
            {
              theme: 'Конфликт',
              words: [
                { type: 'noun', german: 'Beziehung', russian: 'отношения', article: 'die', plural: 'Beziehungen', pluralArticle: 'die', exampleSingular: 'Beziehung.', examplePlural: '-' },
                { type: 'noun', german: 'Streit', russian: 'ссора', article: 'der', plural: 'Streite', pluralArticle: 'die', exampleSingular: 'Streit.', examplePlural: '-' },
                { type: 'noun', german: 'Kompromiss', russian: 'компромисс', article: 'der', plural: 'Kompromisse', pluralArticle: 'die', exampleSingular: 'Kompromiss.', examplePlural: '-' },
                { type: 'noun', german: 'Vertrauen', russian: 'доверие', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Vertrauen.', examplePlural: '-' },
                { type: 'verb', german: 'streiten', russian: 'ссориться', conjugation: 'wir streiten', example: 'Streiten.' },
                { type: 'verb', german: 'diskutieren', russian: 'обсуждать', conjugation: 'wir diskutieren', example: 'Diskutieren.' },
                { type: 'verb', german: 'vertrauen', russian: 'доверять', conjugation: 'ich vertraue', example: 'Vertrauen.' },
                { type: 'verb', german: 'verzeihen', russian: 'прощать', conjugation: 'ich verzeihe', example: 'Verzeihen.' },
                { type: 'adjective', german: 'ehrlich', russian: 'честный', comparative: 'ehrlich', superlative: 'am ehrlichsten', example: 'Ehrlich.' },
                { type: 'adjective', german: 'treu', russian: 'верный', comparative: 'treuer', superlative: 'am treuesten', example: 'Treu.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-7-zukunft-karriere',
          title: 'B1.7 Будущее: Карьера',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Genitiv</h2>
            <p class="mb-4">Wegen des Jobs.</p>
          `,
          vocabulary: [
            {
              theme: 'Карьера',
              words: [
                { type: 'noun', german: 'Ausbildung', russian: 'обучение', article: 'die', plural: 'Ausbildungen', pluralArticle: 'die', exampleSingular: 'Ausbildung.', examplePlural: '-' },
                { type: 'noun', german: 'Studium', russian: 'вуз', article: 'das', plural: 'Studien', pluralArticle: 'die', exampleSingular: 'Studium.', examplePlural: '-' },
                { type: 'noun', german: 'Praktikum', russian: 'практика', article: 'das', plural: 'Praktika', pluralArticle: 'die', exampleSingular: 'Praktikum.', examplePlural: '-' },
                { type: 'noun', german: 'Erfahrung', russian: 'опыт', article: 'die', plural: 'Erfahrungen', pluralArticle: 'die', exampleSingular: 'Erfahrung.', examplePlural: '-' },
                { type: 'noun', german: 'Karriere', russian: 'карьера', article: 'die', plural: 'Karrieren', pluralArticle: 'die', exampleSingular: 'Karriere.', examplePlural: '-' },
                { type: 'verb', german: 'sich bewerben', russian: 'подаваться', conjugation: 'ich bewerbe mich', example: 'Bewerben.' },
                { type: 'verb', german: 'bestehen', russian: 'сдавать (экзамен)', conjugation: 'ich bestehe', example: 'Bestehen.' },
                { type: 'adjective', german: 'erfolgreich', russian: 'успешный', comparative: 'erfolgreicher', superlative: 'am erfolgreichsten', example: 'Erfolgreich.' },
                { type: 'adjective', german: 'beruflich', russian: 'профессиональный', comparative: '-', superlative: '-', example: 'Beruflich.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b1-8-zukunft-plaene',
          title: 'B1.8 Будущее: Планы',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Futur I</h2>
            <p class="mb-4">Ich werde machen.</p>
          `,
          vocabulary: [
            {
              theme: 'Мечты',
              words: [
                { type: 'noun', german: 'Zukunft', russian: 'будущее', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Zukunft.', examplePlural: '-' },
                { type: 'noun', german: 'Plan', russian: 'план', article: 'der', plural: 'Pläne', pluralArticle: 'die', exampleSingular: 'Plan.', examplePlural: '-' },
                { type: 'noun', german: 'Traum', russian: 'мечта', article: 'der', plural: 'Träume', pluralArticle: 'die', exampleSingular: 'Traum.', examplePlural: '-' },
                { type: 'noun', german: 'Ziel', russian: 'цель', article: 'das', plural: 'Ziele', pluralArticle: 'die', exampleSingular: 'Ziel.', examplePlural: '-' },
                { type: 'verb', german: 'planen', russian: 'планировать', conjugation: 'ich plane', example: 'Planen.' },
                { type: 'verb', german: 'hoffen', russian: 'надеяться', conjugation: 'ich hoffe', example: 'Hoffen.' },
                { type: 'verb', german: 'träumen', russian: 'мечтать', conjugation: 'ich träume', example: 'Träumen.' },
                { type: 'verb', german: 'erreichen', russian: 'достигать', conjugation: 'ich erreiche', example: 'Erreichen.' }
              ]
            }
          ],
          exercises: []
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
            <h2 class="font-headline text-2xl font-bold mb-4">Konjunktiv II (Höflichkeit)</h2>
            <p class="mb-4">Ich <strong>hätte</strong> gern... Ich <strong>würde</strong> mich freuen...</p>
          `,
          vocabulary: [
            {
              theme: 'Трудоустройство',
              words: [
                { type: 'noun', german: 'Lebenslauf', russian: 'резюме', article: 'der', plural: 'Lebensläufe', pluralArticle: 'die', exampleSingular: 'Der Lebenslauf.', examplePlural: '-' },
                { type: 'noun', german: 'Anschreiben', russian: 'сопроводительное письмо', article: 'das', plural: '-', pluralArticle: '-', exampleSingular: 'Das Anschreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Unterlagen', russian: 'документы', article: 'die', plural: 'Unterlagen', pluralArticle: 'die', exampleSingular: '(мн.ч.)', examplePlural: 'Vollständige Unterlagen.' },
                { type: 'noun', german: 'Qualifikation', russian: 'квалификация', article: 'die', plural: 'Qualifikationen', pluralArticle: 'die', exampleSingular: 'Gute Qualifikation.', examplePlural: '-' },
                { type: 'noun', german: 'Stärken', russian: 'сильные стороны', article: 'die', plural: 'Stärken', pluralArticle: 'die', exampleSingular: '(мн.ч.)', examplePlural: 'Meine Stärken.' },
                { type: 'noun', german: 'Schwächen', russian: 'слабые стороны', article: 'die', plural: 'Schwächen', pluralArticle: 'die', exampleSingular: '(мн.ч.)', examplePlural: 'Meine Schwächen.' },
                { type: 'verb', german: 'sich vorstellen', russian: 'представляться', conjugation: 'ich stelle mich vor', example: 'Ich stelle mich vor.' },
                { type: 'verb', german: 'überzeugen', russian: 'убеждать', conjugation: 'ich überzeuge', example: 'Ich kann Sie überzeugen.' },
                { type: 'verb', german: 'erwarten', russian: 'ожидать', conjugation: 'ich erwarte', example: 'Was erwarten Sie?' },
                { type: 'adjective', german: 'angehängt', russian: 'прикрепленный (файл)', comparative: '-', superlative: '-', example: 'Im Anhang.' },
                { type: 'adjective', german: 'geeignet', russian: 'подходящий', comparative: 'geeigneter', superlative: 'am geeignetsten', example: 'Geeignet für den Job.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b2-2-office-communication',
          title: 'B2.2 Работа: Офис',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Passiv (Vorgangspassiv)</h2>
            <p class="mb-4">Der Bericht <strong>wird geschrieben</strong>.</p>
          `,
          vocabulary: [
            {
              theme: 'Коммуникация',
              words: [
                { type: 'noun', german: 'Abteilung', russian: 'отдел', article: 'die', plural: 'Abteilungen', pluralArticle: 'die', exampleSingular: 'IT-Abteilung.', examplePlural: '-' },
                { type: 'noun', german: 'Besprechung', russian: 'совещание', article: 'die', plural: 'Besprechungen', pluralArticle: 'die', exampleSingular: 'Wichtige Besprechung.', examplePlural: '-' },
                { type: 'noun', german: 'Bericht', russian: 'отчет', article: 'der', plural: 'Berichte', pluralArticle: 'die', exampleSingular: 'Bericht schreiben.', examplePlural: '-' },
                { type: 'noun', german: 'Anruf', russian: 'звонок', article: 'der', plural: 'Anrufe', pluralArticle: 'die', exampleSingular: 'Einen Anruf tätigen.', examplePlural: '-' },
                { type: 'noun', german: 'E-Mail', russian: 'электронная почта', article: 'die', plural: 'E-Mails', pluralArticle: 'die', exampleSingular: 'E-Mail senden.', examplePlural: '-' },
                { type: 'verb', german: 'vereinbaren', russian: 'договариваться', conjugation: 'ich vereinbare', example: 'Termin vereinbaren.' },
                { type: 'verb', german: 'teilnehmen', russian: 'участвовать', conjugation: 'ich nehme teil', example: 'An der Sitzung teilnehmen.' },
                { type: 'verb', german: 'leiten', russian: 'руководить', conjugation: 'ich leite', example: 'Projekt leiten.' },
                { type: 'verb', german: 'protokollieren', russian: 'вести протокол', conjugation: 'ich protokolliere', example: 'Protokollieren.' },
                { type: 'adjective', german: 'dringend', russian: 'срочный', comparative: 'dringender', superlative: 'am dringendsten', example: 'Sehr dringend.' },
                { type: 'adjective', german: 'zuständig', russian: 'ответственный', comparative: '-', superlative: '-', example: 'Ich bin zuständig.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b2-3-sales',
          title: 'B2.3 Работа: Продажи',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Verkaufsgespräche</h2>
            <p class="mb-4">Darf ich Ihnen helfen? Ich empfehle...</p>
          `,
          vocabulary: [
            {
              theme: 'Продажи',
              words: [
                { type: 'noun', german: 'Kunde', russian: 'клиент', article: 'der', plural: 'Kunden', pluralArticle: 'die', exampleSingular: 'Der Kunde ist König.', examplePlural: '-' },
                { type: 'noun', german: 'Angebot', russian: 'предложение', article: 'das', plural: 'Angebote', pluralArticle: 'die', exampleSingular: 'Das Angebot.', examplePlural: '-' },
                { type: 'noun', german: 'Auftrag', russian: 'заказ', article: 'der', plural: 'Aufträge', pluralArticle: 'die', exampleSingular: 'Einen Auftrag erhalten.', examplePlural: '-' },
                { type: 'noun', german: 'Rechnung', russian: 'счет', article: 'die', plural: 'Rechnungen', pluralArticle: 'die', exampleSingular: 'Rechnung bezahlen.', examplePlural: '-' },
                { type: 'noun', german: 'Rabatt', russian: 'скидка', article: 'der', plural: 'Rabatte', pluralArticle: 'die', exampleSingular: 'Rabatt geben.', examplePlural: '-' },
                { type: 'verb', german: 'anbieten', russian: 'предлагать', conjugation: 'ich biete an', example: 'Anbieten.' },
                { type: 'verb', german: 'bestellen', russian: 'заказывать', conjugation: 'ich bestelle', example: 'Bestellen.' },
                { type: 'verb', german: 'liefern', russian: 'доставлять', conjugation: 'ich liefere', example: 'Liefern.' },
                { type: 'verb', german: 'verhandeln', russian: 'вести переговоры', conjugation: 'ich verhandele', example: 'Über den Preis verhandeln.' },
                { type: 'adjective', german: 'günstig', russian: 'выгодный', comparative: 'günstiger', superlative: 'am günstigsten', example: 'Günstiger Preis.' },
                { type: 'adjective', german: 'hochwertig', russian: 'высококачественный', comparative: 'hochwertiger', superlative: 'am hochwertigsten', example: 'Hochwertiges Produkt.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b2-4-conflict',
          title: 'B2.4 Работа: Конфликты',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Kritik üben (Вежливая критика)</h2>
            <p class="mb-4">Ich habe den Eindruck, dass... Es wäre besser, wenn...</p>
          `,
          vocabulary: [
            {
              theme: 'Разрешение конфликтов',
              words: [
                { type: 'noun', german: 'Problem', russian: 'проблема', article: 'das', plural: 'Probleme', pluralArticle: 'die', exampleSingular: 'Ein Problem lösen.', examplePlural: '-' },
                { type: 'noun', german: 'Lösung', russian: 'решение', article: 'die', plural: 'Lösungen', pluralArticle: 'die', exampleSingular: 'Eine Lösung finden.', examplePlural: '-' },
                { type: 'noun', german: 'Fehler', russian: 'ошибка', article: 'der', plural: 'Fehler', pluralArticle: 'die', exampleSingular: 'Ein Fehler ist passiert.', examplePlural: '-' },
                { type: 'noun', german: 'Missverständnis', russian: 'недопонимание', article: 'das', plural: 'Missverständnisse', pluralArticle: 'die', exampleSingular: 'Ein Missverständnis.', examplePlural: '-' },
                { type: 'noun', german: 'Kritik', russian: 'критика', article: 'die', plural: '-', pluralArticle: '-', exampleSingular: 'Konstruktive Kritik.', examplePlural: '-' },
                { type: 'verb', german: 'lösen', russian: 'решать', conjugation: 'ich löse', example: 'Problem lösen.' },
                { type: 'verb', german: 'klären', russian: 'прояснять', conjugation: 'ich kläre', example: 'Situation klären.' },
                { type: 'verb', german: 'sich entschuldigen', russian: 'извиняться', conjugation: 'ich entschuldige mich', example: 'Ich entschuldige mich.' },
                { type: 'verb', german: 'vermeiden', russian: 'избегать', conjugation: 'ich vermeide', example: 'Stress vermeiden.' },
                { type: 'adjective', german: 'konstruktiv', russian: 'конструктивный', comparative: 'konstruktiver', superlative: 'am konstruktivsten', example: 'Konstruktives Gespräch.' },
                { type: 'adjective', german: 'sachlich', russian: 'деловой/объективный', comparative: 'sachlicher', superlative: 'am sachlichsten', example: 'Sachlich bleiben.' }
              ]
            }
          ],
          exercises: []
        },
        {
          id: 'b2-5-skills',
          title: 'B2.5 Профессиональные навыки',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Nomen-Verb-Verbindungen</h2>
            <p class="mb-4">Eine Entscheidung treffen (решать). Hilfe leisten (помогать).</p>
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
          exercises: []
        },
        {
          id: 'b2-6-presentation',
          title: 'B2.6 Презентация',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Redemittel für Vorträge</h2>
            <p class="mb-4">Ich möchte heute über... sprechen. Zusammenfassend kann man sagen...</p>
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
          exercises: []
        },
        {
          id: 'b2-7-lunch',
          title: 'B2.7 Деловой обед',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Small Talk</h2>
            <p class="mb-4">Wetter, Anreise, Hobbys. Tabu: Geld, Politik, Krankheit (детально).</p>
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
          exercises: []
        },
        {
          id: 'b2-8-company-culture',
          title: 'B2.8 Культура компании',
          explanation: `
            <h2 class="font-headline text-2xl font-bold mb-4">Du oder Sie?</h2>
            <p class="mb-4">В современных стартапах часто говорят "Du". В традиционных фирмах - "Sie", пока не предложат "Du".</p>
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
          exercises: []
        }
      ]
    }
  ]
};
