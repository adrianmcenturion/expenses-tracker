export const Loggedtoasts = () => {
    return {
        title: 'Logged successfully',
        description: "Redirecting to the dashboard...",
        status: 'success',
        duration: 3000,
        isClosable: true,
      }
}

export const LoggedErrortoasts = () => {
  return {
      title: 'Error',
      description: "Error when logging in",
      status: 'error',
      duration: 3000,
      isClosable: true,
    }
}

export const RegisteredToast = () => {
  return {
      title: 'Resgistrated successfully',
      description: "Redirecting to the login...",
      status: 'success',
      duration: 3000,
      isClosable: true,
    }
}