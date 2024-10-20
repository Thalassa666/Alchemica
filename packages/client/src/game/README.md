# Сценарий

Вы - студент Королевской академии алхимии и траволечения. Если вы сдадите финальный экзамен, вас ждет хорошая должность при дворе и достойная жизнь, а если провалите - останетесь должны короне бездну золота за свое обучение.

Перед игрой отображается загрузочный экран, в рамках которого отображаются клавиши управления и кнопка начала.

Игра начинается с генерации случайного набора зелий, которые необходимо создать для победы. После закрытия диалогового окна игрок может двигаться влево/вправо в границах игровой зоны.
В границах зоны расположены инструменты для взаимодействия. Каждый из инструментов используется для комбинирования набора ингредиентов и создания новых состояний ингредиентов или создания зелий.
В случае, если игрок может взаимодействовать с инструментом, название инструмента станет ярче по сравнению с остальными. Для того, чтобы с инструментом можно было взаимодействовать - игрок должен подойти к нему.

**При взаимодействии с инструментом**, открывается диалоговое окно с двумя рядями. В нижнем ряду указывается инвентарь игрока, который может быть использовать для создания ингредиента/зелья. В верхнем ряду указывается соответственно: название инструмента, выбранные ингредиенты для создания, получаемый ингредиент/зелье.

**Рецепты зелий**, а также какие ингредиенты и инструменты нужны для их создания отображаются в отдельном диалоговом окне журнала рецептов. При открытии, отображается книга, в которой в левой части отображен список доступных рецептов, а в правой части инструменты и ингредиенты, необходимые для создания выбранного рецепта.
**Выбор рецепта** происходит с помощью **левой клавиши мыши**, в т.ч. и пагинация между страницами, если список рецептов слишком большой.

**Цель игрока**, в соответствии с выданным заданием правильно комбинировать нужные инструменты с ингредиентами и создавать нужные зелья. После каждого правильно созданного зелья - отображается сообщение о количестве зелий, оставшихся для победы (в т.ч. обновляется диалоговое окно с информацией об оставшихся названиях зелий для победы). После каждого потраченного впустую ингредиента - отображается сообщеиние о количестве ошибок, которые ещё можно совершить.
**Победой** считается создание зелий в том количестве, которые было указано в начале игры.
**Поражением** считается слишком большое количество ошибок при создании зелий.

В финале игры производится подсчет очков в зависимости от скорости прохождения и качестве созданных зелий (определяется количеством совершренных ошибок)

# Управление

| Клавиша                 | Описание                                                |
| ----------------------- | ------------------------------------------------------- |
| **Arrow Left** / **A**  | Движение влево / Выбор предмета слева                   |
| **Arrow Right** / **D** | Движение вправо / Выбор предмета справа                 |
| **Enter** / **Space**   | Войти в режим ваимодействия / открыть модальное окно    |
| **Esc** / **Q**         | Выйти из режима взаимодействия / закрыть модальное окно |
| **H**                   | Переключить полноэкранный режим                         |
| **K**                   | Открыть информацию о рецептах для победы                |
| **J**                   | Открыть информацию о журнале рецептов                   |
| **L**                   | Открыть информацию об управлении                        |
| **ЛКМ**                 | Выбор рецепта из журнала для отоборажения               |

# Игровой движок и механика

Структурно игра реализована через единую точку входа компонента GameClient. К файлу подключаются хуки, в которых содержится логика по инициализации и отрисовке актуального игрового состояния.Начальные состояния, инвентарь и дополнительные описания хранятся в constants.

## 1. Общее хранилище состояния игры

Реализуется с помощью хука `useGameState`. В нём же происходит сортировка элементов, при необходимости. Возвращает `class GameState`, который содержит в себе состояния: `player`, `craftTools`, `inventory`, `receiptBook`, `notifications`, `statistic`, а также методы по их получению/частичному обновлению

### 1.1. Player (состояние игрока)

| Ключ               | Описание                                          |
| ------------------ | ------------------------------------------------- |
| **position**       | Положение персонажа по оси `x` и `y`              |
| **velocity**       | Текущий модификатор ускорения по оси `x` и `y`    |
| **size**           | Размер спрайта по длине `width` и высоте `height` |
| **lastDirectionX** | Последнее направление движения игрока по оси `x`  |
| **canMove**        | Возможность персонажа двигаться                   |

### 1.2. CraftTools (состояние инструментов для создания зелий/ингредиентов)

| Ключ           | Описание                                        |
| -------------- | ----------------------------------------------- |
| **nearPlayer** | Объект, которые находится в коллизии с игроком  |
| **active**     | Объект, с которым хочет взаимодействовать игрок |

### 1.3. Inventory (состояние инвентаря)

| Ключ               | Описание                                                              |
| ------------------ | --------------------------------------------------------------------- |
| **all**            | Весь доступный инвентарь пользователя                                 |
| **selected**       | Выбранные в диалоговых окнах предметы                                 |
| **selectingIndex** | Индекс выбранных в диалоговых окнах предметов                         |
| **isPicking**      | Состсояние открытия/закрытия диалогового окна для выбора предмета     |
| **itemByReceipt**  | Предмет, который получается при комбинировании выбранных ингредиентов |

### 1.4. ReceiptBook (состояние книги рецептов)

| Ключ              | Описание                                     |
| ----------------- | -------------------------------------------- |
| **isDialogOpen**  | Состояние открытия/закрытия диалогового окна |
| **potions**       | Доступные рецепты зелий                      |
| **handleKeydown** | Доступные рецепты ингредиентов               |
| **hovered**       | Рецепт, на который сейчас наведена мышь      |
| **selected**      | Рецепт, который сейчас выбран для просмотра  |
| **activePage**    | Текущая страница пагинации                   |

### 1.5. Notifications (уведомления)

Список уведомлений, который отображается пользователю

### 1.6. Statistic (игровая статистика)

| Ключ                         | Описание                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------- |
| **startedAt**                | Начало игры (в мс)                                                              |
| **endedAt**                  | Окончание игры (в мс)                                                           |
| **itemsToWin**               | Предметы, необходимые для победы                                                |
| **totalScore**               | Итоговое количество очков после завершения игры                                 |
| **wastedReceipts**           | Количество допущенных ошибок                                                    |
| **isInitialized**            | Состояние, отражающее запущена ли игра                                          |
| **isWinConditionDialogOpen** | Состояние открытия/закрытия диалогового окна о зельях, необходимых для победы   |
| **isControlsDialogOpen**     | Состояние открытия/закрытия диалогового окна о клавишах и игровом управлении    |
| **isIntroDialogOpen**        | Состояние открытия/закрытия диалогового окна о приветствии/полноэкранном режиме |
| **step**                     | Текущий шаг игры (`pending` - длится, `won` - победа, `lost` - поражение        |

## 2. Начало и завершение игры

### 2.1. useWinLoose

Используется для инициализации начала/завершения игры, а также проверки оставшихся зелий для победы или попыток для поражения.
|Функция|Описание|
|-|-|
|**initWinCondition**|Начинает игру. Определяет время начала и генерирует зелья, необходимые для победы|
|**endGame**|Завершает игру. Определяет время завершения, подсчитывает итоговую статистику и счет игры|
|**checkForWin**|Проверка состояния победы|
|**checkForLoose**|Проверка состояния поражения|
|**afterCraft**|Действия после создания зелья / ингредиента. Обновляет количество необходимых для победы зелий в случае успешного создания / количества ошибок в случае неудачного. Проверяет состояние победы / поражения и запускает / уведомляет пользователя либо о завершении игры, либо о продолжение с учетом обновленного количества|

### 2.2. useWinConditionDialog

Используется дял диалогового (модального) окна, в котором отображаются зелья, необходимые для победы.
|Функция|Описание|
|-|-|
|**handleKeydown**|Передается в useWindowEffect. При нажатии на соответствующие клавиши либо открывает диалоговое окно, либо закрывает|
|**draw**|Общая функция по отрисовке. Сработает только в том случае, если в игровом состоянии флаг `isWinConditionDialogOpen: true`|
|**drawOverlay**|Отрисовать задний фон для диалогового окна|
|**drawTitle**|Отрисовать заголовок для диалогового окна|
|**drawReceiptList**|Отрисовать список зелий, необходимых для победы|
|**drawReceiptRow**|Отрисовать элемент из списка зелий, необходимых для победы|

## 3. Игрок

### 3.1. usePlayer

Используется для учета местоположения и состояния игрока
|Функция|Описание|
|-|-|
|**draw**|Отрисовать положение игрока|
|**update**|Обновить положение игрока, а также сбросить все ускорения и позицию, если есть коллизия с границей игры|

### 3.2. useMovement

Используется для движения персонажа
|Функция|Описание|
|-|-|
|**registerMoving**|Изменить движение. Все направления должны использовать эту функцию|
|**moveLeft**|Движение влево по оси X|
|**moveRight**|Движение вправо по оси X |
|**stopMovingX**|Остановиться по оси X|
|**handleKeydown**|Передается далее в хук `useWindowEffect` для регистрации события `keydown` и запуска движения персонажа|
|**handleKeyup**|Передается далее в хук `useWindowEffect` для регистрации события `keyup` и остановки движения персонажа|

## 4. Коллизии

### 4.1. useGameBorders

Используется для границ игры
|Функция|Описание|
|-|-|
|**draw**|Отрисовать границы игры|
|**checkForNearBorder**|Проверить есть ли коллизия с границей игры у переданной локации|

### 4.2. useMouseInteraction

Используется для взаимодействия с мышью. Реализуется через слушателя событий `class Observer`, который предоставляет методы для подписки, отписки, проверки коллизий. Поддерживает события `onClick`, `onMouseIn` и `onMouseOut`
|Функция|Описание|
|-|-|
|**handleClick**|Коллбэк для регистрации клика по canvas объекту|
|**handleMouseMove**| для регистрации движения мышью по canvas объекту|
|**init**|Инициализация слушателя и подписка на события|
|**destroy**|Деактивация слушателя и отписка от событий|
|**subscribe**|Подписка коллизии на переданные события|
|**unSubscribe**|Отписка коллизии от всех событий|
|**draw**|Отрисовка области зарегистрированных коллизий для визуального представления|

## 5. Книга рецептов

### 5.1. useReceiptsBook

Используется как точка входа для прочих хуков Книги рецептов. Занимается отрисовкой модального окна с доступными игроку рецептами.
|Функция|Описание|
|-|-|
|**regModalSubscriber**|Точечно зарегистрировать подписки на мышь только в этом модальном окне, чтобы удалить после закрытия|
|**handleKeydown**|Коллбэк на нажатие клавиши для открытия/закрытия модального окна|
|**draw**|Отрисовать модальное окно, когда флаг `receiptsBook.isDialogOpen: true`|
|**drawBackground**|Отрисовать изображение в качестве заднего фона|

### 5.2. useReceiptsBookReceiptsList

Используется для отображения списка доступных рецептов в Книге рецептов.
|Функция|Описание|
|-|-|
|**drawReceiptList**|Отрисовать список рецептов слева|
|**drawReceiptListItem**|Отрисовать рецепт из списка рецептов, а также добавить подписку на взаимодействие с мышью|

### 5.3.useReceiptsBookComboList

Используется для отображения комбинаций в зависимости от выбранного рецепта
|Функция|Описание|
|-|-|
|**drawComboList**|Отрисовать список (справа) необходимого для изготовления выбранного рецепта|
|**drawPlus**|Отрисовать изображение знака плюс "+"|
|**drawEqual**|Отрисовать изображение знака равно "="|
|**drawReceiptRow**|Отрисовать 1 строку, которая используется в рецепте. Это может быть либо ингредиент со своим рецептом, либо простой ингредиент. Если простой, то строка просто отображается. Если со своим, то в т.ч. отрисовывается и этот рецепт и т.д. по рекурсии|
|**drawReceiptTextIcon**|Отрисовать иконку инструмента/зелья/ингредиента с текстом под ним|

### 5.4. useReceiptsBookPagination

Используется для пагинации в случае, если в книге рецептов слишком большое количество рецептов
|Функция|Описание|
|-|-|
|**getPageTotal**|Получить общее кол-во возможных страниц|
|**checkIsPageValid**|Проверить можно ли переключиться на другую страницу|
|**decrementPage**|Уменьшить страницу|
|**incrementPage**|Увеличить страницу|
|**getSlicedPotions**|Получить набор данных в зависимости от выбранной страницы|
|**drawPagination**|Отрисовать цифры стрелки пагинации|
|**drawArrowLeft**|Отрисовать стрелку влево и навесить на неё обработчик|
|**drawArrowRight**|Отрисовать стрелку вправо и навесить на неё обработчик|

## 6. Инструменты крафта

### 6.1. useCraftTools

Используется для установления коллизий на canvas объекте
|Функция|Описание|
|-|-|
|**handleKeydown**|Коллбэк для слушателя нажатия клавиши рядом с предметом. Если соответствующая для интерактивности клавиша нажата рядом с коллизией - откроется модальное окно крафта|
|**draw**|Отрисовать существующие интерактивные объекты и тот объект, что находится в коллизии с игроком для визуального представления|
|**checkInteraction**|Проверить пересекается ли игрок с интерактивным объектом|
|**activateTool**|Установить интерактивный объект как объект рядом с игроком|
|**deactivateTool**|Деактивироватьт объект рядом с игроком|

## 6.2. useCraftDialog

Используется как точка входа для отображения модального окна крафта
|Функция|Описание|
|-|-|
|**draw**|Открыть модальное окно, если было взаимодействие с интерактивным объектом и флаг `craftTools.active: true`|
|**drawBackground**|Отрисовать изображение в качестве заднего фона в зависимости от выбранного инструмента|
|**createSelected**|Вспомогательная функция для заполнения пустого пространства в зависимости от выбранного инструмента|
|**openDialog**|Открыть модальное окно и установить все необходимые значения|
|**closeDialog**|Закрыть модальное окно и сбросить все необходимые значения|
|**resetDialog**|Сбросить модальное окно на начальные значения, но не закрывать|
|**pickItem**|Выбрать отцентрированный элемент карусели|
|**craftElement**|Создать получаемый элемент (ингредиент/зелье), сложить в инвентарь (если ещё нет) и закрыть модальное окно|
|**handleKeydown**|Коллбэк для слушателя нажатия клавиши для открытия/закрытия модального окна и/или создания/сброса предметов|

### 6.3.useIngredientsCombo

Используется для отображения ленты комбинирования ингредиентов в новый ингредиент/зелье
|Функция|Описание|
|-|-|
|**draw**|Отрисовать всю ленту|
|**drawTool**|Отрисовать инструмент, на котором происходит взаимодействие|
|**drawIngredient**|Отрисовать ингредиент|
|**drawResult**|Отрисовать то, что получается из ингредиентов|
|**drawSquare**|Отрисовать квадрат - ячейку для вставки всех прочих элементов ленты|

### 6.4. useIngredientsCarousel

Используется для отображения карусели ящиков просмотра ингридиентов из инвентаря
|Функция|Описание|
|-|-|
|**draw**|Отрисовать карусель|
|**drawIngredientsBox**|Отрисовать все ингредиенты из инвентаря|
|**drawIngredient**|Отрисовать конкретный ингридиент|
|**swipeLeft**|Передвинуть центрированный ингредиент влево|
|**swipeRight**|Передвинуть центрированный ингредиент вправо|
|**handleKeydown**|Обработчик нажатия клавиши для передвижения карусели ингредиентов|

## 7. Прочее

### 7.1. useImage

Используется для отрисовки фоновых изображений и оверлеев
|Функция|Описание|
|-|-|
|**draw**|Отрисовать переданное изображение в качестве заднего фона|
|**drawOverlayFullSize**|Отрисовать подложку - оверлей на весь размер экрана игры|
|**drawOverlayByLocation**|Отрисовать подложку - оверлей по заданному размеру, разбросу, скруглением соответственно|

### 7.2. useNotifications

Используется для отображения уведомлений пользователю
|Функция|Описание|
|-|-|
|**draw**|Отобразить список уведомлений|
|**drawNotification**|Отобразить конкретное уведомление|
|**drawBackground**|Отобразить задний фон (оверлей) для уведомления |
|**drawImage**|Отобразить иконку изображение для уведомления|
|**drawText**|Отрисовать текст и заголовок уведомления|
|**deleteNotification**|Удалить одно уведомление|
|**addNotification**|Добавить одно уведомление|

### 7.3. useQuickTools

Используется для панели быстрого доступа в виде ленты
|Функция|Описание|
|-|-|
|**draw**|Общая функция для отображения|
|**drawOverlay**|Отобразить задний фон ленты|
|**drawToolsList**|Отобразить список инструментов быстрого доступа|
|**drawTool**|Отобразить конкретный инструмент быстрого доступа|

### 7.4. useControlsDialog

Используется для отображения диалогового окна с игровым управлением
|Функция|Описание|
|-|-|
|**handleKeydown**|Коллбэк на нажатие клавиши для открытия/закрытия модального окна|
|**draw**|Общая функция для отображения модального окна в случае, когда флаг `statistic.isControlsDialogOpen: true`|
|**drawOverlay**|Отобразить задний фон (оверлей)|
|**drawControlsList**|Отобразить список клавиш и их назначений|

### 7.5. useFullScreen

Используется для переключения игры между полноэкранным режимом
|Функция|Описание|
|-|-|
|**init**|Запускает игру в полноэкранном режиме|
|**draw**|Общая функция для отображения приветственного модального окна в случае, когда флаг `statistic.isIntroDialogOpen: true`|
|**drawOverlay**|Отобразить задний фон (оверлей)|
|**drawTitle**|Отобразить заголовок|
|**drawText**|Отобразить текст|
|**handleKeydown**|Коллбэк на закрытие приветственного модального окна и переключения в/из полноэкранного режима|
