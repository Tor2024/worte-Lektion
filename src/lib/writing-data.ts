export type WritingTopicCategory = 'complaint' | 'request' | 'apology' | 'application' | 'invitation' | 'advice';

export interface UniversalPhrase {
    id: string;
    text: string;
    translation: string;
    category: 'intro' | 'body' | 'action' | 'closing';
    tags: WritingTopicCategory[];
    isUniversal?: boolean;
}

export interface WritingTopic {
    id: string;
    title: string;
    type: 'official' | 'unofficial';
    category: WritingTopicCategory;
    description: string;
    taskPoints: string[];
    universalPhrases: string[];
}

export const UNIVERSAL_PHRASES: UniversalPhrase[] = [
    // --- INTRO (Official) ---
    {
        id: 'intro-ref-ad',
        text: 'Bezugnehmend auf Ihre Anzeige vom...',
        translation: 'Ссылаясь на ваше объявление от...',
        category: 'intro',
        tags: ['application', 'request']
    },
    {
        id: 'intro-complaint-strong',
        text: 'Hiermit möchte ich mich bei Ihnen über ... beschweren.',
        translation: 'Настоящим я хочу пожаловаться вам на...',
        category: 'intro',
        tags: ['complaint'],
        isUniversal: true
    },
    {
        id: 'intro-ad-enthusiasm',
        text: 'Als ich Ihre Anzeige las, war ich sofort begeistert, deshalb habe ich mich angemeldet.',
        translation: 'Прочитав ваше объявление, я был в восторге, поэтому я записался/зарегистрировался.',
        category: 'intro',
        tags: ['complaint', 'request', 'application'],
        isUniversal: true
    },
    {
        id: 'intro-writing-cause',
        text: 'Ich schreibe Ihnen, weil...',
        translation: 'Я пишу вам, потому что...',
        category: 'intro',
        tags: ['request', 'apology', 'complaint']
    },
    {
        id: 'intro-apology',
        text: 'Ich muss mich leider für ... entschuldigen.',
        translation: 'К сожалению, я должен извиниться за...',
        category: 'intro',
        tags: ['apology']
    },
    {
        id: 'intro-complaint-ordered',
        text: 'Vor zwei Wochen habe ich bei Ihnen ... bestellt.',
        translation: 'Две недели назад я заказал у Вас...',
        category: 'intro',
        tags: ['complaint']
    },
    {
        id: 'intro-complaint-loyal',
        text: 'Wir sind seit langer Zeit treue Kunden Ihrer Firma.',
        translation: 'Мы долгое время являемся верными клиентами Вашей фирмы.',
        category: 'intro',
        tags: ['complaint', 'request'],
        isUniversal: true
    },
    {
        id: 'intro-thanks-delivery',
        text: 'Vielen Dank für die pünktliche/zuverlässige Lieferung.',
        translation: 'Большое спасибо за пунктуальную/надежную доставку.',
        category: 'intro',
        tags: ['complaint', 'request']
    },
    // --- INTRO (Unofficial) ---
    {
        id: 'intro-unofficial-long-time',
        text: 'Lange nichts gehört! Wie geht es dir?',
        translation: 'Давно не слышались! Как ты?',
        category: 'intro',
        tags: ['invitation', 'advice', 'apology']
    },
    {
        id: 'intro-unofficial-thanks',
        text: 'Danke für deinen lieben Brief.',
        translation: 'Спасибо за твое милое письмо.',
        category: 'intro',
        tags: ['advice', 'invitation']
    },

    // --- BODY (Official) ---
    {
        id: 'body-point-1',
        text: 'Zunächst möchte ich erwähnen, dass...',
        translation: 'Сначала я хотел бы упомянуть, что...',
        category: 'body',
        tags: ['complaint', 'request']
    },
    {
        id: 'body-point-2',
        text: 'Ein weiterer wichtiger Punkt ist...',
        translation: 'Еще один важный момент - это...',
        category: 'body',
        tags: ['complaint', 'request', 'application'],
        isUniversal: true
    },
    {
        id: 'body-contrast',
        text: 'In Ihrer Anzeige stand, dass..., aber in Wirklichkeit...',
        translation: 'В вашем объявлении было написано, что..., но в реальности...',
        category: 'body',
        tags: ['complaint']
    },
    {
        id: 'body-reason',
        text: 'Der Grund dafür ist, dass...',
        translation: 'Причина этого в том, что...',
        category: 'body',
        tags: ['apology', 'request']
    },
    {
        id: 'body-understand-natural',
        text: 'Ich verstehe natürlich, dass die Situation für ... schwierig ist.',
        translation: 'Я, конечно, понимаю, что ситуация для ... сложна.',
        category: 'body',
        tags: ['apology', 'request']
    },
    {
        id: 'body-occurrence',
        text: 'So etwas kann immer mal vorkommen.',
        translation: 'Такое всегда может случиться.',
        category: 'body',
        tags: ['apology', 'request'],
        isUniversal: true
    },
    {
        id: 'body-proposal-reason',
        text: 'Aus diesem Grund würde ich vorschlagen, dass...',
        translation: 'По этой причине я хотел бы предложить, чтобы...',
        category: 'body',
        tags: ['complaint', 'request'],
        isUniversal: true
    },
    {
        id: 'body-opinion-pro-contra',
        text: 'Was für/gegen ... spricht, ist, dass... / ... hat den Vorteil/Nachteil, dass...',
        translation: 'Что говорит за/против ..., так это то, что... / ... имеет преимущество/недостаток в том, что...',
        category: 'body',
        tags: ['advice', 'complaint'],
        isUniversal: true
    },
    {
        id: 'body-opinion-suitable',
        text: '... ist besonders geeignet für/bei...',
        translation: '... особенно хорошо подходит для...',
        category: 'body',
        tags: ['advice']
    },
    // --- BODY (Unofficial) ---
    {
        id: 'body-unofficial-imagine',
        text: 'Stell dir vor, was mir passiert ist!',
        translation: 'Представь себе, что со мной случилось!',
        category: 'body',
        tags: ['invitation', 'apology']
    },
    {
        id: 'body-unofficial-advice',
        text: 'An deiner Stelle würde ich...',
        translation: 'На твоем месте я бы...',
        category: 'body',
        tags: ['advice']
    },
    {
        id: 'body-example-instance',
        text: 'Als Beispiel könnte man anführen, dass...',
        translation: 'В качестве примера можно привести то, что...',
        category: 'body',
        tags: ['advice', 'complaint'],
        isUniversal: true
    },
    {
        id: 'body-beispielsweise',
        text: '... beispielsweise ...',
        translation: '... например ...',
        category: 'body',
        tags: ['advice', 'complaint']
    },
    {
        id: 'body-demgegenueber',
        text: 'Demgegenüber...',
        translation: 'Напротив / В противовес этому...',
        category: 'body',
        tags: ['advice'],
        isUniversal: true
    },
    {
        id: 'body-zusatzlich',
        text: 'Zusätzlich...',
        translation: 'Дополнительно...',
        category: 'body',
        tags: ['advice', 'complaint']
    },
    {
        id: 'body-obwohl',
        text: 'Obwohl ..., ...',
        translation: 'Хотя ..., ...',
        category: 'body',
        tags: ['advice', 'complaint'],
        isUniversal: true
    },
    {
        id: 'body-nebenbei',
        text: 'Ganz nebenbei...',
        translation: 'Кстати / Между прочим...',
        category: 'body',
        tags: ['advice']
    },
    {
        id: 'body-auserdem',
        text: 'Außerdem...',
        translation: 'Кроме того...',
        category: 'body',
        tags: ['advice', 'complaint'],
        isUniversal: true
    },

    {
        id: 'body-it-possible',
        text: 'Es wäre möglich, ... (zu + Infinitiv)',
        translation: 'Было бы возможно...',
        category: 'body',
        tags: ['request', 'application']
    },
    {
        id: 'body-opinion-over-1',
        text: 'Ich bin der Überzeugung / davon überzeugt, dass...',
        translation: 'Я убежден / уверен в том, что...',
        category: 'body',
        tags: ['advice', 'complaint'],
        isUniversal: true
    },
    {
        id: 'body-opinion-standpunkt',
        text: 'Ich selbst stehe auf dem Standpunkt, dass...',
        translation: 'Я сам стою на позиции, что...',
        category: 'body',
        tags: ['advice']
    },
    {
        id: 'body-opinion-explain',
        text: 'Das lässt sich dadurch erklären, dass...',
        translation: 'Это можно объяснить тем, что...',
        category: 'body',
        tags: ['advice']
    },
    // --- ACTION / REQUEST (Official) ---
    {
        id: 'action-check',
        text: 'Ich bitte Sie, den Vorfall zu prüfen.',
        translation: 'Я прошу вас проверить этот инцидент.',
        category: 'action',
        tags: ['complaint']
    },
    {
        id: 'action-compensation',
        text: 'Ich erwarte eine angemessene Entschädigung.',
        translation: 'Я ожидаю соответствующую компенсацию.',
        category: 'action',
        tags: ['complaint']
    },
    {
        id: 'action-info',
        text: 'Könnten Sie mir bitte mitteilen, ob...',
        translation: 'Не могли бы вы мне сообщить, ... ли...',
        category: 'action',
        tags: ['request']
    },
    {
        id: 'action-deadline',
        text: 'Bitte antworten Sie mir bis zum...',
        translation: 'Пожалуйста, ответьте мне до...',
        category: 'action',
        tags: ['complaint', 'request']
    },
    {
        id: 'action-ask-to-do',
        text: 'Ich möchte Sie bitten, ... (zu + Infinitiv)',
        translation: 'Я хотел бы попросить Вас...',
        category: 'action',
        tags: ['request'],
        isUniversal: true
    },
    {
        id: 'action-request-help',
        text: 'Ich habe eine Bitte an Sie. / Ich benötige Ihre Hilfe.',
        translation: 'У меня к Вам просьба. / Мне нужна Ваша помощь.',
        category: 'action',
        tags: ['request'],
        isUniversal: true
    },
    {
        id: 'action-withdraw',
        text: 'Daher möchte ich vom Kauf zurücktreten / die Bestellung stornieren.',
        translation: 'Поэтому я хочу отказаться от покупки / отменить заказ.',
        category: 'action',
        tags: ['complaint'],
        isUniversal: true
    },
    {
        id: 'action-forum-propose',
        text: 'Man könnte... / Es wäre gut/sinnvoll... / Ich würde dafür plädieren, dass...',
        translation: 'Можно было бы... / Было бы хорошо/разумно... / Я бы выступал за то, чтобы...',
        category: 'action',
        tags: ['advice'],
        isUniversal: true
    },
    {
        id: 'action-worth-it',
        text: 'Es lohnt sich, ... (zu + Infinitiv)',
        translation: 'Стоит того, чтобы...',
        category: 'action',
        tags: ['advice']
    },
    // --- ACTION (Unofficial) ---
    {
        id: 'action-unofficial-meet',
        text: 'Hast du Lust, am Wochenende etwas zu unternehmen?',
        translation: 'Есть желание заняться чем-нибудь на выходных?',
        category: 'action',
        tags: ['invitation']
    },
    {
        id: 'action-unofficial-help',
        text: 'Könntest du mir vielleicht helfen?',
        translation: 'Не мог бы ты мне помочь?',
        category: 'action',
        tags: ['request']
    },

    // --- CLOSING (Official) ---
    {
        id: 'closing-response',
        text: 'Ich hoffe auf eine baldige Antwort.',
        translation: 'Надеюсь на скорый ответ.',
        category: 'closing',
        tags: ['complaint', 'request', 'application'],
        isUniversal: true
    },
    {
        id: 'closing-apology',
        text: 'Vielen Dank für Ihr Verständnis.',
        translation: 'Спасибо за ваше понимание.',
        category: 'closing',
        tags: ['apology']
    },
    {
        id: 'closing-formal',
        text: 'Mit freundlichen Grüßen',
        translation: 'С уважением (официально)',
        category: 'closing',
        tags: ['complaint', 'request', 'application', 'apology']
    },
    {
        id: 'closing-thanks-hearty',
        text: 'Ich bedanke mich herzlich bei Ihnen.',
        translation: 'Я сердечно благодарю Вас.',
        category: 'closing',
        tags: ['request', 'apology'],
        isUniversal: true
    },
    {
        id: 'closing-inform-steps',
        text: 'Bitte informieren Sie mich über Ihre weiteren Schritte / Ihr weiteres Vorgehen.',
        translation: 'Пожалуйста, проинформируйте меня о Ваших дальнейших шагах / планах.',
        category: 'closing',
        tags: ['complaint', 'request']
    },
    {
        id: 'closing-hope-not-needed',
        text: 'Ich hoffe, dass das nicht nötig sein wird, und erwarte Ihre Antwort.',
        translation: 'Надеюсь, что в этом не будет необходимости, и жду Вашего ответа.',
        category: 'closing',
        tags: ['complaint']
    },
    {
        id: 'closing-understanding-situation',
        text: 'Ich hoffe, dass Sie Verständnis für meine Situation haben.',
        translation: 'Надеюсь, что у Вас есть понимание моей ситуации.',
        category: 'closing',
        tags: ['apology', 'complaint']
    },
    // --- CLOSING (Unofficial) ---
    {
        id: 'closing-unofficial-write',
        text: 'Schreib mir bald!',
        translation: 'Напиши мне скорее!',
        category: 'closing',
        tags: ['invitation', 'advice']
    },
    {
        id: 'closing-unofficial-greetings',
        text: 'Viele Grüße',
        translation: 'Большой привет / Пока',
        category: 'closing',
        tags: ['invitation', 'advice', 'apology']
    }
];

export const WRITING_TOPICS: WritingTopic[] = [
    // --- OFFICIAL: COMPLAINTS ---
    {
        id: 'complaint-hotel',
        title: 'Beschwerde über Hotel',
        type: 'official',
        category: 'complaint',
        description: 'Вы провели отпуск в отеле, но описание в рекламе не соответствовало реальности (нет бассейна, плохая еда, шум).',
        taskPoints: ['Почему вы выбрали этот отель.', 'Опишите проблемы (минимум две).', 'Потребуйте компенсацию.', 'Пригрозите последствиями.'],
        universalPhrases: ['intro-complaint-strong', 'body-contrast', 'action-compensation', 'closing-response']
    },
    {
        id: 'complaint-course',
        title: 'Beschwerde über Sprachkurs',
        type: 'official',
        category: 'complaint',
        description: 'Курс был плохо организован: учитель опаздывал, группа слишком большая, учебников не было.',
        taskPoints: ['Причина письма.', 'Что конкретно не устроило.', 'Последствия для обучения.', 'Ваши требования.'],
        universalPhrases: ['intro-ref-ad', 'body-point-1', 'body-point-2', 'action-check']
    },
    {
        id: 'complaint-product',
        title: 'Reklamation: Defekter Laptop',
        type: 'official',
        category: 'complaint',
        description: 'Вы купили ноутбук в интернет-магазине. Через неделю он сломался. Служба поддержки не отвечает.',
        taskPoints: ['Данные о покупке (модель, дата).', 'Описание дефекта.', 'Ваше разочарование сервисом.', 'Требование ремонта или возврата денег.'],
        universalPhrases: ['intro-complaint-strong', 'body-point-1', 'action-deadline', 'closing-formal']
    },
    {
        id: 'complaint-neighbor',
        title: 'Brief an die Hausverwaltung',
        type: 'official',
        category: 'complaint',
        description: 'Отопление в квартире не работает уже 3 дня. На улице зима. Управляющая компания игнорирует звонки.',
        taskPoints: ['Описание проблемы (как долго, как холодно).', 'Попытки связаться ранее.', 'Угроза снижения аренды (Mietminderung).', 'Срок исправления.'],
        universalPhrases: ['intro-writing-cause', 'body-point-1', 'action-check', 'action-deadline']
    },

    // --- OFFICIAL: REQUESTS ---
    {
        id: 'request-info-event',
        title: 'Anfrage: Raum mieten',
        type: 'official',
        category: 'request',
        description: 'Корпоративное мероприятие. Нужно арендовать зал в ресторане на 50 человек.',
        taskPoints: ['Повод мероприятия.', 'Количество гостей и дата.', 'Вопросы о меню и оборудовании.', 'Запрос коммерческого предложения (Angebot).'],
        universalPhrases: ['intro-writing-cause', 'action-info', 'closing-response']
    },
    {
        id: 'request-kindergarten',
        title: 'Anfrage: Kindergartenplatz',
        type: 'official',
        category: 'request',
        description: 'Вы ищете место в детском саду для ребенка. Вы недавно переехали в этот район.',
        taskPoints: ['Кто вы и ваш ребенок (возраст).', 'Почему нужен сад именно здесь.', 'Желаемая дата начала.', 'Просьба о встрече.'],
        universalPhrases: ['intro-writing-cause', 'body-reason', 'action-meeting', 'closing-formal']
    },

    // --- OFFICIAL: APOLOGIES ---
    {
        id: 'apology-work',
        title: 'Entschuldigung: Frist verpasst',
        type: 'official',
        category: 'apology',
        description: 'Вы не успеваете сдать проект вовремя из-за болезни или технических проблем.',
        taskPoints: ['Извинение за задержку.', 'Причина (кратко).', 'Предложение нового срока.', 'Благодарность за понимание.'],
        universalPhrases: ['intro-apology', 'body-reason', 'closing-apology', 'closing-formal']
    },
    {
        id: 'apology-appointment',
        title: 'Terminabsage (Arzt)',
        type: 'official',
        category: 'apology',
        description: 'У вас запись к врачу, но вы не можете прийти из-за срочной командировки.',
        taskPoints: ['Напоминание о термине.', 'Отмена и причина.', 'Запрос нового термина.', 'Извинение за неудобства.'],
        universalPhrases: ['intro-apology', 'body-reason', 'action-info', 'closing-formal']
    },

    // --- OFFICIAL: APPLICATION ---
    {
        id: 'application-internship',
        title: 'Bewerbung um Praktikum',
        type: 'official',
        category: 'application',
        description: 'Вы хотите пройти стажировку в немецкой компании. Ваша специальность - маркетинг.',
        taskPoints: ['Где увидели информацию/почему эта фирма.', 'Ваш опыт и навыки.', 'Почему вы подходите.', 'Просьба о собеседовании.'],
        universalPhrases: ['intro-ref-ad', 'body-point-1', 'action-meeting', 'closing-formal']
    },

    // --- UNOFFICIAL (NEW) ---
    {
        id: 'unofficial-invitation',
        title: 'Einladung zum Geburtstag',
        type: 'unofficial',
        category: 'invitation',
        description: 'У вас день рождения. Вы приглашаете друга на вечеринку.',
        taskPoints: ['Повод (день рождения).', 'Детали (где, когда).', 'Что принести (или не надо).', 'Просьба подтвердить участие.'],
        universalPhrases: ['intro-unofficial-long-time', 'action-unofficial-meet', 'closing-unofficial-write']
    },
    {
        id: 'unofficial-help-move',
        title: 'Bitte um Hilfe (Umzug)',
        type: 'unofficial',
        category: 'request',
        description: 'Вы переезжаете в новую квартиру. Вам нужна помощь друга с вещами.',
        taskPoints: ['Новость о переезде.', 'Почему нужна помощь (тяжелые вещи, нет машины).', 'Детали (дата, время).', 'Предложение пиццы/пива после.'],
        universalPhrases: ['intro-unofficial-long-time', 'body-unofficial-imagine', 'action-unofficial-help', 'closing-unofficial-write']
    },
    {
        id: 'unofficial-apology-party',
        title: 'Entschuldigung nach Party',
        type: 'unofficial',
        category: 'apology',
        description: 'На прошлой вечеринке вы случайно разбили любимую вазу друга или вели себя некрасиво.',
        taskPoints: ['Извинение за поведение.', 'Объяснение (не оправдание, но контекст).', 'Предложение компенсации (купить новую).', 'Надежда на примирение.'],
        universalPhrases: ['intro-unofficial-thanks', 'body-unofficial-imagine', 'intro-apology', 'closing-unofficial-greetings']
    },
    {
        id: 'unofficial-advice-job',
        title: 'Ratschlag: Jobangebot',
        type: 'unofficial',
        category: 'advice',
        description: 'Друг получил предложение работы в другом городе, но не знает, соглашаться ли. Он спросил вашего совета.',
        taskPoints: ['Реакция на новость (поздравление).', 'Ваше мнение (плюсы и минусы).', 'Что бы вы сделали на его месте.', 'Поддержка любого решения.'],
        universalPhrases: ['intro-unofficial-thanks', 'body-unofficial-advice', 'body-point-2', 'closing-unofficial-greetings']
    }
];
