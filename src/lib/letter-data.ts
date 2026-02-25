export type LetterType = 'complaint' | 'inquiry' | 'apology' | 'opinion' | 'general';
export type LetterSection = 'salutation' | 'intro' | 'body' | 'closing' | 'farewell';

export interface LetterModule {
    id: string;
    label: string;
    german: string;
    russian: string;
    types: LetterType[];
    section: LetterSection;
    isPlaceholder?: boolean;
    isUniversal?: boolean;
}

export const LETTER_MODULES: LetterModule[] = [
    // --- SALUTATION (ПРИВЕТСТВИЕ) ---
    {
        id: 'salutation-formal-unknown',
        label: 'Официально (без имени)',
        german: 'Sehr geehrte Damen und Herren,',
        russian: 'Уважаемые дамы и господа, (запятая!)',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation',
        isUniversal: true
    },
    {
        id: 'salutation-formal-male',
        label: 'Господину...',
        german: 'Sehr geehrter Herr [Name],',
        russian: 'Уважаемый господин [Имя],',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'salutation-formal-female',
        label: 'Госпоже...',
        german: 'Sehr geehrte Frau [Name],',
        russian: 'Уважаемая госпожа [Имя],',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation',
        isPlaceholder: true,
        isUniversal: true
    },

    // --- INTRO (ВСТУПЛЕНИЕ) ---
    {
        id: 'intro-formal-ref',
        label: 'Ссылка на повод',
        german: 'Ich schreibe Ihnen mit Bezug auf [Betreff].',
        russian: 'Пишу Вам в связи с [Повод].',
        types: ['inquiry', 'general', 'apology'],
        section: 'intro',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'intro-formal-notice',
        label: 'Официальное уведомление',
        german: 'Hiermit muss ich Ihnen mitteilen, dass...',
        russian: 'Настоящим я должен сообщить Вам, что...',
        types: ['inquiry', 'general', 'apology'],
        section: 'intro'
    },
    {
        id: 'intro-complaint-problem',
        label: 'Повод для жалобы',
        german: 'Ich schreibe Ihnen wegen folgenden Problems: [Problem]',
        russian: 'Пишу Вам по поводу следующей проблемы: [Проблема]',
        types: ['complaint'],
        section: 'intro',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'intro-complaint-attention',
        label: 'Обратить внимание',
        german: 'Ich möchte Sie auf folgenden Missstand aufmerksam machen: [Thema]',
        russian: 'Я хотел бы обратить Ваше внимание на следующее нарушение/недостаток: [Тема]',
        types: ['complaint'],
        section: 'intro',
        isPlaceholder: true
    },
    {
        id: 'intro-complaint-ad',
        label: 'После объявления (Экзамен!)',
        german: 'Als ich Ihre Anzeige las, war ich sofort begeistert, deshalb habe ich mich angemeldet.',
        russian: 'Когда я прочитал ваше объявление, я был в восторге, поэтому я записался.',
        types: ['complaint', 'inquiry'],
        section: 'intro',
        isUniversal: true
    },
    {
        id: 'intro-general-phone',
        label: 'После звонка',
        german: 'Bezüglich unseres Telefonats vom [Datum] muss ich Ihnen mitteilen, dass...',
        russian: 'Относительно нашего телефонного разговора от [Дата] должен сообщить Вам, что...',
        types: ['general', 'complaint'],
        section: 'intro',
        isPlaceholder: true
    },
    {
        id: 'intro-complaint-ordered',
        label: 'Был заказ (2 недели назад)',
        german: 'Vor zwei Wochen habe ich bei Ihnen [Produkt] bestellt.',
        russian: 'Две недели назад я заказал у Вас [Продукт].',
        types: ['complaint'],
        section: 'intro',
        isPlaceholder: true
    },
    {
        id: 'intro-complaint-loyal',
        label: 'Верный клиент',
        german: 'Wir sind seit langer Zeit treue Kunden Ihrer Firma.',
        russian: 'Мы долгое время являемся верными клиентами Вашей фирмы.',
        types: ['complaint', 'general'],
        section: 'intro',
        isUniversal: true
    },
    {
        id: 'intro-complaint-thanks-delivery',
        label: 'Спасибо за доставку (но есть НО)',
        german: 'Vielen Dank für die pünktliche/zuverlässige Lieferung.',
        russian: 'Большое спасибо за пунктуальную/надежную доставку.',
        types: ['complaint', 'general'],
        section: 'intro'
    },

    // --- BODY (ОСНОВНАЯ ЧАСТЬ) ---
    // Section 1: Understanding & Proposals
    {
        id: 'body-understanding-1',
        label: 'Надежда на понимание',
        german: 'Ich hoffe auf Ihr Verständnis, was diese Situation betrifft.',
        russian: 'Я надеюсь на Ваше понимание в отношении данной ситуации.',
        types: ['apology', 'general'],
        section: 'body'
    },
    {
        id: 'body-aware',
        label: 'Осознание ситуации',
        german: 'Mir ist klar/bewusst, dass [Situation] für Sie schwierig ist.',
        russian: 'Мне ясно/я осознаю, что [ситуация] для Вас сложна.',
        types: ['apology', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-understand-natural',
        label: 'Естественное понимание',
        german: 'Ich verstehe natürlich, dass die Situation für [Person] schwierig ist.',
        russian: 'Я, конечно, понимаю, что ситуация для [Кого-то] сложна.',
        types: ['apology', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-simple-occurrence',
        label: 'Такое случается',
        german: 'So etwas kann immer mal vorkommen.',
        russian: 'Такое всегда может случиться.',
        types: ['apology', 'general'],
        section: 'body',
        isUniversal: true
    },
    {
        id: 'body-possibility',
        label: 'Предложение возможности',
        german: 'Es besteht vielleicht die Möglichkeit, [Vorschlag] zu [Verb-Infinitiv].',
        russian: 'Возможно, существует возможность [сделать что-то].',
        types: ['general', 'inquiry'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-vorgeschlagen',
        label: 'Предложение от себя',
        german: 'Ich möchte Ihnen vorschlagen, [Vorschlag] zu [Verb-Infinitiv].',
        russian: 'Я хотел бы предложить Вам [сделать что-то].',
        types: ['general', 'inquiry'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-proposal-reason',
        label: 'Предложение по причине',
        german: 'Aus diesem Grund würde ich vorschlagen, dass [Vorschlag].',
        russian: 'По этой причине я хотел бы предложить, чтобы [предложение].',
        types: ['general', 'inquiry', 'opinion'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-it-possible',
        label: 'Это было бы возможно',
        german: 'Es wäre möglich, [Vorschlag] zu [Verb-Infinitiv].',
        russian: 'Было бы возможно [сделать что-то].',
        types: ['general', 'inquiry'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-request-help',
        label: 'Просьба о помощи',
        german: 'Ich wende mich an Sie mit der Bitte, mir bei [Thema] zu helfen.',
        russian: 'Я обращаюсь к Вам с просьбой помочь мне в [Тема].',
        types: ['general', 'inquiry'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-apology-regret',
        label: 'Сожаление',
        german: 'Ich bedauere sehr, dass [Ereignis]. Es tut mir äußerst leid.',
        russian: 'Я очень сожалею, что [событие]. Мне крайне жаль.',
        types: ['apology'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-apology-formal',
        label: 'Официальное извинение',
        german: 'Ich möchte mich (bei Ihnen) für [Grund] entschuldigen.',
        russian: 'Я хотел бы извиниться (перед Вами) за [Причина].',
        types: ['apology'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-apology-intense',
        label: 'Крайнее сожаление',
        german: 'Es tut mir äußerst leid, dass [Eреignis].',
        russian: 'Мне крайне жаль, что [событие].',
        types: ['apology'],
        section: 'body',
        isPlaceholder: true
    },

    // Section 2: Complaint Details
    {
        id: 'body-complaint-unsatisfied',
        label: 'Недовольство курсом/услугой',
        german: 'Leider bin ich sehr unzufrieden mit Ihrem Angebot / dem Sprachkurs.',
        russian: 'К сожалению, я очень недоволен Вашим предложением / языковым курсом.',
        types: ['complaint'],
        section: 'body',
        isUniversal: true
    },
    {
        id: 'body-complaint-find',
        label: 'Констатация проблем',
        german: 'Leider musste ich feststellen, dass [Problem].',
        russian: 'К сожалению, мне пришлось констатировать, что [Проблема].',
        types: ['complaint'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-interest',
        label: 'Общий интерес',
        german: 'Es ist sicherlich in unserem gemeinsamen Interesse, wenn [Lösung].',
        russian: 'Это наверняка в наших общих интересах, если [решение].',
        types: ['complaint', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-pressure',
        label: 'Угроза (Крайний случай)',
        german: 'Andernfalls sehe ich mich gezwungen, einen Anwalt einzuschalten / vom Kauf zurückzutreten.',
        russian: 'В противном случае я буду вынужден привлечь адвоката / отказаться от покупки.',
        types: ['complaint'],
        section: 'body',
        isUniversal: true
    },

    // Section 3: Forum / Opinion
    {
        id: 'body-complaint-incomplete',
        label: 'Неполная посылка/задержка',
        german: 'Leider ist die Sendung unvollständig eingetroffen / Leider wurde die Lieferfrist nicht eingehalten.',
        russian: 'К сожалению, посылка пришла не полностью / К сожалению, срок доставки не был соблюден.',
        types: ['complaint'],
        section: 'body'
    },
    {
        id: 'body-request-speedup',
        label: 'Просьба ускорить',
        german: 'Ich möchte Sie daher/deshalb (erneut/nochmals) bitten, schnellstmöglich [Aktion] zu [Verb-Infinitiv].',
        russian: 'Поэтому я хотел бы (снова/еще раз) попросить Вас как можно быстрее [сделать что-то].',
        types: ['complaint', 'general', 'inquiry'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-request-perfect-product',
        label: 'Требование исправного товара',
        german: 'Ich bitte um Lieferung des einwandfreien Produkts bis zum [Datum] sowie um einen angemessenen Preisnachlass.',
        russian: 'Прошу прислать исправный товар до [Дата], а также предоставить соответствующую скидку.',
        types: ['complaint'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-expect-action',
        label: 'Ожидание действий (Делать/Требовать)',
        german: 'Deshalb erwarte/verlange ich, [Erwartung].',
        russian: 'Поэтому я ожидаю/требую [ожидание].',
        types: ['complaint', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-withdraw',
        label: 'Отказ от покупки',
        german: 'Daher möchte ich vom Kauf zurücktreten / die Bestellung stornieren.',
        russian: 'Поэтому я хочу отказаться от покупки / отменить заказ.',
        types: ['complaint'],
        section: 'body',
        isUniversal: true
    },
    {
        id: 'body-opinion-start',
        label: 'Мое мнение',
        german: 'Meiner Meinung/Ansicht nach [Meinung].',
        russian: 'По моему мнению / на мой взгляд [Мнение].',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-example',
        label: 'Пример',
        german: 'Ein Beispiel hierfür ist [Beispiel].',
        russian: 'Примером этого является [Пример].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-example-link',
        label: 'Привести в пример что...',
        german: 'Als Beispiel könnte man anführen, dass [Beispiel-Satz].',
        russian: 'В качестве примера можно привести то, что [Пример].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-beispielsweise',
        label: 'Например (вводное слово)',
        german: 'beispielsweise [Beispiel]',
        russian: 'например [Пример]',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-contrast-demgegenueber',
        label: 'Напротив / В противовес',
        german: 'Demgegenüber [Kontrast].',
        russian: 'Напротив / В противовес этому [контраст].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-zusatzlich',
        label: 'Дополнительно',
        german: 'Zusätzlich [Zusatz].',
        russian: 'Дополнительно [дополнение].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-obwohl',
        label: 'Хотя',
        german: 'Obwohl [Einschränkung], [Hauptsatz].',
        russian: 'Хотя [ограничение], [главное предложение].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-nebenbei',
        label: 'Между прочим',
        german: 'Ganz nebenbei [Anmerkung].',
        russian: 'Между прочим [замечание].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-auserdem',
        label: 'Кроме того (Außerdem)',
        german: 'Außerdem [Zusatz].',
        russian: 'Кроме того [дополнение].',
        types: ['opinion', 'general', 'complaint'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-erachtens',
        label: 'На мой взгляд (офиц.)',
        german: 'Meines Erachtens [Meinung].',
        russian: 'По моему убеждению [Мнение].',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-over-1',
        label: 'Я убежден (überzeugt)',
        german: 'Ich bin der Überzeugung / davon überzeugt, dass [Meinung].',
        russian: 'Я убежден / уверен в том, что [мнение].',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-standpunkt',
        label: 'Стою на позиции',
        german: 'Ich selbst stehe auf dem Standpunkt, dass [Meinung].',
        russian: 'Я сам стою на позиции, что [Мнение].',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-cause',
        label: 'Причина в том, что...',
        german: 'Dies liegt daran, dass [Grund]. / Одна из причин — [Ursache].',
        russian: 'Это связано с тем, что [причина]. / Одна возможная причина — [причина].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-explain',
        label: 'Это объясняется тем, что...',
        german: 'Das lässt sich dadurch erklären, dass [Grund].',
        russian: 'Это можно объяснить тем, что [причина].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-adv-dis',
        label: 'Преимущества/Недостатки',
        german: 'Was für/gegen [Thema] spricht, ist, dass [Argument]. / [Thema] hat den Vorteil/Nachteil, dass...',
        russian: 'Что говорит за/против [тема], так это [аргумент]. / [Тема] имеет преимущество/недостаток...',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-suitable',
        label: 'Особенно подходит для...',
        german: '[Option] ist besonders geeignet für/bei [Zweck].',
        russian: '[Вариант] особенно хорошо подходит для [цель].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-more',
        label: 'Кроме того',
        german: 'Darüber hinaus [Ergänzung]. / Dazu trägt weiterhin bei, dass...',
        russian: 'Кроме того [дополнение]. / Этому также способствует то, что...',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-suggest-forum',
        label: 'Предложения (Форум)',
        german: 'Man könnte... / Es wäre gut/sinnvoll... / Ich würde dafür plädieren, dass...',
        russian: 'Можно было бы... / Было бы хорошо/разумно... / Я бы выступал за то, чтобы...',
        types: ['opinion'],
        section: 'body',
        isUniversal: true
    },
    {
        id: 'body-worth-it',
        label: 'Это того стоит',
        german: 'Es lohnt sich, [Aktion] zu [Verb-Infinitiv].',
        russian: 'Стоит того, чтобы [сделать что-то].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true
    },

    // --- CLOSING (ЗАКЛЮЧЕНИЕ) ---
    {
        id: 'closing-thanks-advance',
        label: 'Спасибо заранее',
        german: 'Vielen Dank im Voraus für Ihre Bemühungen.',
        russian: 'Заранее большое спасибо за Ваши усилия.',
        types: ['inquiry', 'general', 'complaint'],
        section: 'closing',
        isUniversal: true
    },
    {
        id: 'closing-understanding',
        label: 'Просьба о понимании',
        german: 'Ich bitte Sie um Ihr Verständnis.',
        russian: 'Прошу Вас о понимании.',
        types: ['apology', 'general'],
        section: 'closing',
        isUniversal: true
    },
    {
        id: 'closing-expect-reply',
        label: 'Ожидание скорого ответа',
        german: 'Ich hoffe auf eine zufriedenstellende Lösung und sehe Ihrer baldigen Antwort entgegen.',
        russian: 'Надеюсь на удовлетворительное решение и жду Вашего скорого ответа.',
        types: ['complaint', 'inquiry'],
        section: 'closing',
        isUniversal: true
    },
    {
        id: 'closing-contact',
        label: 'Свяжитесь со мной',
        german: 'Bitte kontaktieren/informieren Sie mich innerhalb der nächsten zwei Wochen.',
        russian: 'Пожалуйста, свяжитесь со мной / проинформируйте меня в течение следующих двух недель.',
        types: ['complaint', 'general'],
        section: 'closing'
    },
    {
        id: 'closing-expect-by-date',
        label: 'Жду ответ до даты',
        german: 'Ich erwarte Ihre Antwort bis zum [Datum].',
        russian: 'Я жду Вашего ответа до [Дата].',
        types: ['complaint', 'general'],
        section: 'closing',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'closing-inform-steps',
        label: 'Информируйте о шагах',
        german: 'Bitte informieren Sie mich über Ihre weiteren Schritte / Ihr weiteres Vorgehen.',
        russian: 'Пожалуйста, проинформируйте меня о Ваших дальнейших шагах / планах.',
        types: ['complaint', 'general', 'inquiry'],
        section: 'closing'
    },
    {
        id: 'closing-hope-not-needed',
        label: 'Надеюсь, это не потребуется',
        german: 'Ich hoffe, dass das nicht nötig sein wird, und erwarte Ihre Antwort.',
        russian: 'Надеюсь, что в этом не будет необходимости, и жду Вашего ответа.',
        types: ['complaint'],
        section: 'closing'
    },
    {
        id: 'closing-thanks-hearty',
        label: 'Сердечное спасибо',
        german: 'Ich bedanke mich herzlich bei Ihnen.',
        russian: 'Я сердечно благодарю Вас.',
        types: ['apology', 'general', 'inquiry'],
        section: 'closing',
        isUniversal: true
    },

    // --- FAREWELL (ПРОЩАНИЕ) ---
    {
        id: 'farewell-standard',
        label: 'Стандарт (Официально)',
        german: 'Mit freundlichen Grüßen',
        russian: 'С уважением',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'farewell',
        isUniversal: true
    }
];
