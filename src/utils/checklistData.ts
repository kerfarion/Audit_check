import { ChecklistSection } from '../types';

export const checklistSections: ChecklistSection[] = [
  {
    id: 'tech',
    title: 'Технический аудит',
    items: [
      {
        id: 't1',
        text: 'Скорость главной и внутренних страниц через <code>PageSpeed Insights</code>',
        instruction: `<p><strong>Как проверить:</strong> Откройте <span class="service-tag">Google PageSpeed Insights</span> и введите URL страницы. Запустите анализ для мобильных и десктопных устройств.</p>
<p><strong>Критерии успеха:</strong> Оценка &ge; 90 баллов для мобильной версии и &ge; 95 для десктопа. Время загрузки LCP &lt; 2.5 сек.</p>
<div class="success-criteria">✅ Успех: все показатели в зелёной зоне.</div>`
      },
      {
        id: 't2',
        text: 'Все изображения сжаты, форматы <code>.webp</code> / <code>.avif</code>',
        instruction: `<p><strong>Как проверить:</strong> Используйте <span class="service-tag">Squoosh</span> или <span class="service-tag">ImageOptim</span> для анализа. Проверьте атрибуты src изображений на наличие .webp или .avif.</p>
<p><strong>Критерии успеха:</strong> Более 80% изображений на сайте используют современные форматы, средний размер файла уменьшен на 30% по сравнению с исходным.</p>
<div class="success-criteria">✅ Успех: все важные изображения конвертированы.</div>`
      },
      {
        id: 't3',
        text: 'Ленивая загрузка (<code>lazy loading</code>) для мультимедиа',
        instruction: `<p><strong>Как проверить:</strong> Убедитесь, что для тегов <code>&lt;img&gt;</code> и <code>&lt;iframe&gt;</code> задан атрибут <code>loading="lazy"</code>.</p>
<p><strong>Критерии успеха:</strong> Изображения вне первого экрана не загружаются до начала прокрутки.</p>
<div class="success-criteria">✅ Успех: сэкономлен трафик первого экрана.</div>`
      },
      {
        id: 't4',
        text: 'Кэширование на стороне сервера настроено корректно',
        instruction: `<p><strong>Как проверить:</strong> Проверьте HTTP-заголовки ответа <code>Cache-Control</code> и <code>Expires</code> с помощью DevTools вкладки Network.</p>
<p><strong>Критерии успеха:</strong> Статические файлы (картинки, шрифты, стили) отдаются со сроком жизни до 1 года (<code>max-age=31536000</code>).</p>
<div class="success-criteria">✅ Успех: настроено долгосрочное кэширование статики.</div>`
      },
      {
        id: 't5',
        text: 'Наличие и корректность <code>robots.txt</code> и <code>sitemap.xml</code>',
        instruction: `<p><strong>Как проверить:</strong> Перейдите по адресам <code>/robots.txt</code> и <code>/sitemap.xml</code> сайта.</p>
<p><strong>Критерии успеха:</strong> Файлы доступны, не содержат синтаксических ошибок, sitemap указывает правильные абсолютные ссылки.</p>
<div class="success-criteria">✅ Успех: поисковые роботы могут сканировать сайт без преград.</div>`
      },
      {
        id: 't6',
        text: 'Устранены дубли страниц (зеркало <code>www</code>/<code>http</code>)',
        instruction: `<p><strong>Как проверить:</strong> Попробуйте ввести адрес с <code>http://</code> или <code>www.</code> и проверьте, есть ли автоматический 301-редирект на единое зеркало.</p>
<p><strong>Критерии успеха:</strong> Происходит мгновенная переадресация на канонический вид (например, <code>https://example.com</code>).</p>
<div class="success-criteria">✅ Успех: настроен сквозной 301 редирект.</div>`
      },
      {
        id: 't7',
        text: 'Битые ссылки (404) — страница-заглушка',
        instruction: `<p><strong>Как проверить:</strong> Сканируйте сайт утилитой <span class="service-tag">Screaming Frog SEO Spider</span>. Также проверьте, настроена ли стильная 404 страница.</p>
<p><strong>Критерии успеха:</strong> Отсутствуют ссылки на несуществующие страницы, а при переходе по неверному пути отдается статус-код 404 с удобной системной навигацией.</p>
<div class="success-criteria">✅ Успех: пользователю удобно выходить из тупиковой страницы.</div>`
      },
      {
        id: 't8',
        text: 'SSL-сертификат (<code>https://</code>) установлен и работает',
        instruction: `<p><strong>Как проверить:</strong> Проверьте наличие замочка в URL-строке браузера и валидность SSL-сертификата.</p>
<p><strong>Критерии успеха:</strong> Нет предупреждений о безопасности, настроен HSTS (HTTP Strict Transport Security).</p>
<div class="success-criteria">✅ Успех: обмен данными зашифрован.</div>`
      },
      {
        id: 't9',
        text: 'Отображение на мобильных устройствах и планшетах',
        instruction: `<p><strong>Как проверить:</strong> Проверьте адаптивность через режим разработчика Chrome или сервис <span class="service-tag">Mobile-Friendly Test</span>.</p>
<p><strong>Критерии успеха:</strong> Нет горизонтального скролла, размер шрифтов комфортный для чтения, интерактивные элементы легко нажимаются пальцем.</p>
<div class="success-criteria">✅ Успех: интерфейс адаптирован под малые экраны.</div>`
      }
    ]
  },
  {
    id: 'seo',
    title: 'SEO‑аудит',
    items: [
      {
        id: 's1',
        text: 'Уникальные <code>&lt;title&gt;</code> и <code>&lt;description&gt;</code> для каждой страницы',
        instruction: `<p><strong>Как проверить:</strong> Используйте <span class="service-tag">Screaming Frog</span> или <span class="service-tag">Sitechecker</span> для сканирования всех страниц. Экспортируйте список title и description.</p>
<p><strong>Критерии успеха:</strong> Все title уникальны, длина 50–60 символов. Description присутствуют на всех страницах, длина 150–160 символов, содержат ключевые слова.</p>
<div class="success-criteria">✅ Успех: нет дублей, все мета-теги заполнены.</div>`
      },
      {
        id: 's2',
        text: 'Только один <code>&lt;h1&gt;</code> на страницу',
        instruction: `<p><strong>Как проверить:</strong> Изучите исходный код или используйте расширение для браузера Web Developer. Найдите теги <code>h1</code>.</p>
<p><strong>Критерии успеха:</strong> Ровно один тег <code>&lt;h1&gt;</code> на странице, кратко описывающий ее суть.</p>
<div class="success-criteria">✅ Успех: иерархия страниц соответствует SEO-правилам.</div>`
      },
      {
        id: 's3',
        text: 'Иерархия заголовков <code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code> … корректна',
        instruction: `<p><strong>Как проверить:</strong> Проанализируйте структуру документа. Заголовки h3 должны следовать только после h2.</p>
<p><strong>Критерии успеха:</strong> Структура заголовков логична, не пропущены уровни, в заголовки встроены ключевые словосочетания.</p>
<div class="success-criteria">✅ Успех: семантическое дерево заголовков корректно.</div>`
      },
      {
        id: 's4',
        text: 'Тексты без переспама, уникальность контента',
        instruction: `<p><strong>Как проверить:</strong> Проверьте тексты страниц через <span class="service-tag">Text.ru</span> или <span class="service-tag">Advego</span> на заспамленность и уникальность.</p>
<p><strong>Критерии успеха:</strong> Уникальность текста более 85%, заспамленность в пределах допустимых норм сервисов проверки.</p>
<div class="success-criteria">✅ Успех: качественный и оригинальный текстовый контент.</div>`
      },
      {
        id: 's5',
        text: 'Человекопонятные URL (<code>/kupit-velosiped</code>)',
        instruction: `<p><strong>Как проверить:</strong> Проанализируйте структуру ссылок на сайте.</p>
<p><strong>Критерии успеха:</strong> Адреса страниц состоят из логичных, разделенных дефисами ЧПУ транслитом или латиницей без сложных параметров.</p>
<div class="success-criteria">✅ Успех: ссылки понятны и человеку, и поисковику.</div>`
      },
      {
        id: 's6',
        text: 'Внутренняя перелинковка логически связана',
        instruction: `<p><strong>Как проверить:</strong> Оцените связи между страницами: есть ли меню, хлебные крошки и тематические ссылки в статьях.</p>
<p><strong>Критерии успеха:</strong> Нет тупиковых страниц, важные разделы получают больше всего ссылочного веса.</p>
<div class="success-criteria">✅ Успех: распределение веса оптимально.</div>`
      },
      {
        id: 's7',
        text: 'Атрибуты <code>alt</code> у всех важных изображений',
        instruction: `<p><strong>Как проверить:</strong> Просканируйте код страниц на наличие пустых или отсутствующих атрибутов <code>alt</code> в тегах <code>&lt;img&gt;</code>.</p>
<p><strong>Критерии успеха:</strong> Все контентные изображения имеют релевантный текстовый эквивалент, помогая поисковой индексации.</p>
<div class="success-criteria">✅ Успех: изображения оптимизированы для поиска.</div>`
      }
    ]
  },
  {
    id: 'ux',
    title: 'UX/UI‑аудит',
    items: [
      {
        id: 'u1',
        text: 'Пользователь понимает предложение за первые 3 секунды',
        instruction: `<p><strong>Как проверить:</strong> Проведите тест с 5–10 реальными пользователями (или используйте <span class="service-tag">UsabilityHub</span>). Попросите их за 3 секунды сказать, чем занимается сайт.</p>
<p><strong>Критерии успеха:</strong> &ge; 80% опрошенных правильно описывают суть сайта. На главном экране чётко выделено УТП.</p>
<div class="success-criteria">✅ Успех: большинство пользователей понимают ценность за 3 сек.</div>`
      },
      {
        id: 'u2',
        text: 'Главное меню доступно с любой страницы',
        instruction: `<p><strong>Как проверить:</strong> Прокликайте несколько страниц и убедитесь, что меню закреплено (sticky) или быстро вызывается в шапке.</p>
<p><strong>Критерии успеха:</strong> Меню всегда под рукой, не нужно скроллить до самого верха, мобильное меню открывается без багов.</p>
<div class="success-criteria">✅ Успех: навигационная шапка статически или динамически закреплена.</div>`
      },
      {
        id: 'u3',
        text: 'Важные элементы (телефон, корзина, CTA) на видных местах',
        instruction: `<p><strong>Как проверить:</strong> Выполните визуальный анализ интерфейса с тепловыми картами <span class="service-tag">Яндекс Метрика</span>.</p>
<p><strong>Критерии успеха:</strong> Кнопки яркие, контрастируют с фоном, телефоны кликабельны для звонка, корзина имеет визуальный маркер товаров.</p>
<div class="success-criteria">✅ Успех: целевые кнопки моментально бросаются в глаза.</div>`
      },
      {
        id: 'u4',
        text: 'Читаемость шрифтов: размер, контрастность',
        instruction: `<p><strong>Как проверить:</strong> Сверьте контраст текста с требованиями WCAG через утилиты или вкладку Lighthouse в Chrome.</p>
<p><strong>Критерии успеха:</strong> Минимальный размер шрифта длинного текста 16px, высокая контрастность (не менее 4.5:1 к фону).</p>
<div class="success-criteria">✅ Успех: сайт удобно читать людям с любым зрением.</div>`
      },
      {
        id: 'u5',
        text: 'Формы обратной связи и корзина — минимум обязательных полей',
        instruction: `<p><strong>Как проверить:</strong> Попробуйте отправить заявку или сделать тестовый заказ.</p>
<p><strong>Критерии успеха:</strong> Для обратного звонка достаточно ввести только имя и телефон, поля снабжены масками ввода и валидацией.</p>
<div class="success-criteria">✅ Успех: конверсионный путь не замусорен лишними опросами.</div>`
      },
      {
        id: 'u6',
        text: 'Кликабельные элементы: все кнопки работают, ссылки в футере активны',
        instruction: `<p><strong>Как проверить:</strong> Вручную пройдите по всем ссылкам подвала, кликните по логотипу, кнопкам соцсетей.</p>
<p><strong>Критерии успеха:</strong> Отсутствуют «забытые» селекторы с пустыми <code>href="#"</code>, все кнопки дают понятный интерактивный отклик.</p>
<div class="success-criteria">✅ Успех: интерактивная схема сайта исправна на 100%.</div>`
      }
    ]
  }
];

export const totalChecklistItemsCount = checklistSections.reduce(
  (sum, section) => sum + section.items.length,
  0
);
export const totalChecklistItemsMap = checklistSections.reduce(
  (acc, section) => {
    section.items.forEach(item => {
      acc[item.id] = item;
    });
    return acc;
  },
  {} as Record<string, typeof checklistSections[0]['items'][0]>
);
