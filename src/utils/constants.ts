import { Project } from '../types';

export const TOTAL_STAGES = 22;

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'аудит.site',
    organization: 'Информационные Системы Лтд',
    crm: 'AmoCRM',
    status: 'active',
    progress: 3,
    comment: 'Образцовый запуск проекта. Требуется исправить мобильное меню на следующей неделе.'
  },
  {
    id: 'p2',
    name: 'tech-store.ru',
    organization: 'ИП Иванов А.В.',
    crm: 'Bitrix24',
    status: 'paused',
    progress: 1,
    comment: 'Ждем обновленные тексты от копирайтеров для завершения SEO секции.'
  },
  {
    id: 'p3',
    name: 'crypto-app.io',
    organization: 'Decentralized LLC',
    crm: 'HubSpot',
    status: 'done',
    progress: 22,
    comment: 'Все 22 пункта полностью закрыты. Сертификат готов.'
  }
];
