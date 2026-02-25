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
        id: 'body-opinion-reason',
        label: 'Существенная причина',
        german: 'Ein wesentlicher Grund dafür, dass [Thema], ist [Grund].',
        russian: 'Существенная причина того, что [тема] — это [причина].',
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-arg',
        label: 'Аргумент "ЗА"',
        german: 'Ein Argument, das für [Thema] spricht, ist [Argument].',
        russian: 'Аргумент, говорящий за [тема] — это [аргумент].',
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
        types: ['opinion'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
    },
    {
        id: 'body-opinion-more',
        label: 'Кроме того',
        german: 'Darüber hinaus [Ergänzung].',
        russian: 'Кроме того [дополнение].',
        types: ['opinion', 'general'],
        section: 'body',
        isPlaceholder: true,
        isUniversal: true
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
