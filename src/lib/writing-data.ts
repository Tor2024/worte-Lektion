export type WritingTopicCategory = 'complaint' | 'request' | 'apology' | 'application';

export interface UniversalPhrase {
    id: string;
    text: string;
    translation: string;
    category: 'intro' | 'body' | 'action' | 'closing';
    tags: WritingTopicCategory[]; // Which types of letters this phrase is good for
}

export interface WritingTopic {
    id: string;
    title: string;
    type: 'official' | 'unofficial';
    category: WritingTopicCategory;
    description: string; // The situation
    taskPoints: string[]; // The 3-4 points they must cover
    universalPhrases: string[]; // IDs of recommended phrases
}

export const UNIVERSAL_PHRASES: UniversalPhrase[] = [
    // --- INTRO ---
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
        tags: ['complaint']
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

    // --- BODY ---
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
        tags: ['complaint', 'request', 'application']
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

    // --- ACTION / REQUEST ---
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
        id: 'action-meeting',
        text: 'Ich würde mich über ein persönliches Gespräch freuen.',
        translation: 'Я был бы рад личной беседе.',
        category: 'action',
        tags: ['application', 'request']
    },

    // --- CLOSING ---
    {
        id: 'closing-response',
        text: 'Ich hoffe auf eine baldige Antwort.',
        translation: 'Надеюсь на скорый ответ.',
        category: 'closing',
        tags: ['complaint', 'request', 'application']
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
    }
];

export const WRITING_TOPICS: WritingTopic[] = [
    {
        id: 'complaint-hotel',
        title: 'Beschwerde über Hotel',
        type: 'official',
        category: 'complaint',
        description: 'Вы провели отпуск в отеле, но описание в рекламе не соответствовало реальности. (Нет бассейна, плохая еда, шум).',
        taskPoints: [
            'Опишите, почему вы выбрали этот отель.',
            'Опишите проблемы (минимум две).',
            'Потребуйте компенсацию.',
            'Пригрозите последствиями, если не получите ответ.'
        ],
        universalPhrases: ['intro-complaint-strong', 'body-contrast', 'action-compensation', 'closing-response']
    },
    {
        id: 'complaint-course',
        title: 'Beschwerde über Sprachkurs',
        type: 'official',
        category: 'complaint',
        description: 'Вы записались на языковой курс, но он был плохо организован. Учитель часто опаздывал, группа была слишком большой.',
        taskPoints: [
            'Причина вашего письма.',
            'Что именно вас не устроило (учитель, группа).',
            'Какие последствия это имело для вашего обучения.',
            'Что вы ожидаете от языковой школы.'
        ],
        universalPhrases: ['intro-ref-ad', 'body-point-1', 'body-point-2', 'action-check', 'closing-response']
    },
    {
        id: 'request-info-event',
        title: 'Anfrage: Raum mieten',
        type: 'official',
        category: 'request',
        description: 'Вы планируете корпоративное мероприятие и хотите арендовать зал в ресторане.',
        taskPoints: [
            'Почему вы пишете (повод).',
            'Сколько человек и когда планируется мероприятие.',
            'Спросите о меню и техническом оборудовании.',
            'Попросите прислать предложение (Angebot).'
        ],
        universalPhrases: ['intro-writing-cause', 'body-point-1', 'action-info', 'closing-response']
    },
    {
        id: 'apology-work',
        title: 'Entschuldigung: Frist verpasst',
        type: 'official',
        category: 'apology',
        description: 'Вы не успеваете сдать важный проект вовремя из-за болезни.',
        taskPoints: [
            'Извинитесь за задержку.',
            'Объясните причину (болезнь).',
            'Предложите новый срок сдачи.',
            'Поблагодарите за понимание.'
        ],
        universalPhrases: ['intro-apology', 'body-reason', 'closing-apology', 'closing-formal']
    }
];
