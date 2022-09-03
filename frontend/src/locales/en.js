const enLocal = {
  en: {
    translation: {
      titlePage: 'Union Chat',
      button: {
        logOut: 'Log out',
        logIn: 'Login',
      },
      forms: {
        username: 'Username',
        password: 'Password',
        authFailed: 'Invalid username or password',
        requiredName: 'Name required',
        requiredPassword: 'Password required',
        authorization: {
          title: 'Authorization',
          footerText: 'Don\'t have an account?',
          link: 'Registration',
        },
        registration: {
          title: 'Registration Form',
          notMatchPassword: 'Passwords must match',
          minPassword: 'At least 6 characters',
          minName: 'From 3 to 20 characters',
          maxName: 'From 3 to 20 characters',
          existUser: 'This user already exists',
          confirmPassword: 'Confirm password',
          button: 'Register',
        },
      },
      chat: {
        channels: 'Channels',
        removeChannel: 'Remove',
        renameChannel: 'Rename',
        messages: 'Messages',
        placeholderMessage: 'Write a message',
        send: 'Send',
        countMessages: 'Count messages:',
      },
      modal: {
        renameChannel: 'Rename channel',
        deleteChannel: 'Delete channel',
        createChannel: 'Create a channel',
        nameChannel: 'Channel name',
        deleteBody: 'Are you sure you want to delete the channel?',
        newName: 'New name',
        close: 'Close',
        rename: 'Rename',
        delete: 'Delete',
        create: 'Create',
        channelExist: 'This channel already exists',
        requiredField: 'Required field',
      },
      loading: 'Loading...',
      notify: {
        createChannel: 'Channel created',
        deleteChannel: 'Channel deleted',
        renameChannel: 'Channel renamed',
        error: 'An error occurred, please try again',
      },
      notFound: {
        title: 'Page not found',
        message: 'But you can go back to ',
        link: 'homepage',
      },
      error: {
        network: 'Connection failed',
        authorization: 'Authorization failed, try logging out and logging in again',
        sendMessage: 'Error sending message',
        createChannel: 'There was an error creating the channel',
        renameChannel: 'An error occurred while renaming the channel',
        deleteChannel: 'An error occurred while deleting the channel',
      },
    },
  },
};

export default enLocal;
