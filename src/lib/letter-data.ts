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
}

export const LETTER_MODULES: LetterModule[] = [
    // --- SALUTATION ---
    {
        id: 'salutation-formal-unknown',
        label: 'Формально (без имени)',
        german: 'Sehr geehrte Damen und Herren,',
        russian: 'Уважаемые дамы и господа,',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation'
    },
    {
        id: 'salutation-formal-male',
        label: 'Господину...',
        german: 'Sehr geehrter Herr [Name],',
        russian: 'Уважаемый господин [Имя],',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation',
        isPlaceholder: true
    },
    {
        id: 'salutation-formal-female',
        label: 'Госпоже...',
        german: 'Sehr geehrte Frau [Name],',
        russian: 'Уважаемая госпожа [Имя],',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'salutation',
        isPlaceholder: true
    },

    // --- INTRO ---
    {
        id: 'intro-complaint-1',
        label: 'Повод для жалобы',
        german: 'hiermit möchte ich mich bei Ihnen über [Betreff] beschweren.',
        russian: 'настоящим я хочу пожаловаться вам на [Тема].',
        types: ['complaint'],
        section: 'intro',
        isPlaceholder: true
    },
    {
        id: 'intro-complaint-disappoint',
        label: 'Разочарование',
        german: 'leider muss ich Ihnen mitteilen, dass ich mit Ihrem Service sehr unzufrieden bin.',
        russian: 'к сожалению, я должен сообщить вам, что я очень недоволен вашим сервисом.',
        types: ['complaint'],
        section: 'intro'
    },
    {
        id: 'intro-inquiry-1',
        label: 'Интерес к предложению',
        german: 'mit großem Interesse habe ich Ihre Anzeige gelesen und wende mich an Sie, weil...',
        russian: 'с большим интересом я прочитал ваше объявление и обращаюсь к вам, потому что...',
        types: ['inquiry'],
        section: 'intro'
    },
    {
        id: 'intro-inquiry-2',
        label: 'Просьба о информации',
        german: 'ich schreibe Ihnen, da ich mich für Ihr Angebot interessiere und weitere Informationen benötige.',
        russian: 'я пишу вам, так как меня интересует ваше предложение и мне нужна дополнительная информация.',
        types: ['inquiry'],
        section: 'intro'
    },
    {
        id: 'intro-apology-1',
        label: 'Извинение за задержку',
        german: 'bitte entschuldigen Sie die verspätete Rückmeldung.',
        russian: 'пожалуйста, извините за поздний ответ.',
        types: ['apology'],
        section: 'intro'
    },
    {
        id: 'intro-general-reference',
        label: 'Ссылка на разговор',
        german: 'bezugnehmend auf unser Telefonat vom [Datum] möchte ich Ihnen Folgendes mitteilen.',
        russian: 'ссылаясь на наш телефонный разговор от [Дата], я хотел бы сообщить вам следующее.',
        types: ['general', 'complaint', 'inquiry'],
        section: 'intro',
        isPlaceholder: true
    },

    // --- BODY (GRUND/ARGUMENTE) ---
    {
        id: 'body-complaint-expectations',
        label: 'Ожидания не оправдались',
        german: 'Meine Erwartungen wurden leider nicht erfüllt, da [Grund].',
        russian: 'Мои ожидания, к сожалению, не оправдались, так как [Причина].',
        types: ['complaint'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-complaint-details',
        label: 'Детали проблемы',
        german: 'Ein weiterer Punkt, der mich stört, ist die Tatsache, dass...',
        russian: 'Еще один пункт, который меня беспокоит — это тот факт, что...',
        types: ['complaint'],
        section: 'body'
    },
    {
        id: 'body-inquiry-details',
        label: 'Запрос деталей',
        german: 'Könnten Sie mir bitte mitteilen, ob [Frage]?',
        russian: 'Не могли бы вы мне сообщить, [Вопрос]?',
        types: ['inquiry'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-inquiry-offer',
        label: 'Запрос предложения',
        german: 'Ich bitte Sie um ein unverbindliches Angebot für...',
        russian: 'Я прошу вас о предварительном предложении для...',
        types: ['inquiry'],
        section: 'body'
    },
    {
        id: 'body-apology-reason',
        label: 'Объяснение причины',
        german: 'Der Grund für dieses Missverständnis lag in [Grund].',
        russian: 'Причина этого недоразумения заключалась в [Причина].',
        types: ['apology'],
        section: 'body',
        isPlaceholder: true
    },
    {
        id: 'body-opinion-advantage',
        label: 'Преимущество',
        german: 'Ein wesentlicher Vorteil ist meiner Meinung nach, dass...',
        russian: 'Существенным преимуществом, по моему мнению, является то, что...',
        types: ['opinion'],
        section: 'body'
    },
    {
        id: 'body-opinion-disadvantage',
        label: 'Недостаток',
        german: 'Dagegen spricht jedoch, dass...',
        russian: 'Однако против этого говорит то, что...',
        types: ['opinion'],
        section: 'body'
    },

    // --- CLOSING (LÖSUNG/AM ENDE) ---
    {
        id: 'closing-complaint-demand',
        label: 'Требование решения',
        german: 'Ich erwarte von Ihnen eine angemessene Lösung für dieses Problem.',
        russian: 'Я ожидаю от вас подходящего решения этой проблемы.',
        types: ['complaint'],
        section: 'closing'
    },
    {
        id: 'closing-complaint-deadline',
        label: 'Срок ответа',
        german: 'Bitte antworten Sie mir bis zum [Datum].',
        russian: 'Пожалуйста, ответьте мне до [Дата].',
        types: ['complaint', 'general'],
        section: 'closing',
        isPlaceholder: true
    },
    {
        id: 'closing-inquiry-thanks',
        label: 'Благодарность заранее',
        german: 'Vielen Dank im Voraus für Ihre Bemühungen.',
        russian: 'Заранее спасибо за ваши усилия.',
        types: ['inquiry', 'general'],
        section: 'closing'
    },
    {
        id: 'closing-apology-future',
        label: 'Обещание',
        german: 'Ich versichere Ihnen, dass sich dies nicht wiederholen wird.',
        russian: 'Я уверяю вас, что это не повторится.',
        types: ['apology'],
        section: 'closing'
    },
    {
        id: 'closing-general-contact',
        label: 'Контакт для связи',
        german: 'Für Rückfragen stehe ich Ihnen gerne zur Verfügung.',
        russian: 'Я с удовольствием отвечу на ваши вопросы.',
        types: ['general', 'inquiry', 'apology', 'opinion'],
        section: 'closing'
    },

    // --- FAREWELL ---
    {
        id: 'farewell-best',
        label: 'С уважением',
        german: 'Mit freundlichen Grüßen',
        russian: 'С уважением',
        types: ['complaint', 'inquiry', 'apology', 'opinion', 'general'],
        section: 'farewell'
    }
];
