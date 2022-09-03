const ruLocal = {
  ru: {
    translation: {
      titlePage: 'Юнион Чат',
      button: {
        logOut: 'Выйти',
        logIn: 'Войти',
      },
      forms: {
        username: 'Имя пользователя',
        password: 'Пароль',
        authFailed: 'Неверные имя пользователя или пароль',
        requiredName: 'Требуется имя',
        requiredPassword: 'Требуется пароль',
        authorization: {
          title: 'Авторизация',
          footerText: 'Нет аккаунта?',
          link: 'Регистрация',
        },
        registration: {
          title: 'Форма регистрации',
          notMatchPassword: 'Пароли должны совпадать',
          minPassword: 'Не менее 6 символов',
          minName: 'От 3 до 20 символов',
          maxName: 'От 3 до 20 символов',
          existUser: 'Такой пользователь уже существует',
          confirmPassword: 'Подтвердите пароль',
          button: 'Зарегистрироваться',
        },
      },
      chat: {
        channels: 'Каналы',
        removeChannel: 'Удалить',
        renameChannel: 'Переименовать',
        messages: 'Сообщения',
        placeholderMessage: 'Напишите сообщение',
        send: 'Отправить',
        countMessages: 'Количество сообщений:',
      },
      modal: {
        renameChannel: 'Переименовать канал',
        deleteChannel: 'Удалить канал',
        createChannel: 'Создать канал',
        nameChannel: 'Имя канала',
        deleteBody: 'Вы уверены, что хотите удалить канал?',
        newName: 'Новое имя',
        close: 'Закрыть',
        rename: 'Переименовать',
        delete: 'Удалить',
        create: 'Создать',
        channelExist: 'Такой канал уже существует',
        requiredField: 'Обязательно поле',
      },
      loading: 'Загрузка...',
      notify: {
        createChannel: 'Канал создан',
        deleteChannel: 'Канал удален',
        renameChannel: 'Канал переименован',
        error: 'Произошла ошибка, пожалуйста, повторите попытку',
      },
      notFound: {
        title: 'Страница не найдена',
        message: 'Но вы можете вернутся на ',
        link: 'главную страницу',
      },
      error: {
        network: 'Ошибка соединения',
        authorisation: 'Ошибка авторизации, попробуйте выйти из аккаунта и заново авторизоваться',
        sendMessage: 'Ошибка отправки сообщения',
        createChannel: 'Возникла ошибка при создания канала',
        renameChannel: 'Возникла ошибка при переименования канала',
        deleteChannel: 'Возникла ошибка при удаления канала',
      },
    },
  },
};

export default ruLocal;
