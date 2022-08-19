export const persistLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
  }

  export const clearLocalStorage = (key) => {
    localStorage.removeItem(key)
  }
