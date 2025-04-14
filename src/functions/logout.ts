import Cookies from "js-cookie";
import { browser } from "node:process";


export const signOut = () => {
  try {
    Cookies.remove('token')
    alert(`Вы успешно вышли из системы`)
    window.location.replace('/login')

  } catch (error) {
    console.log(`Ошибка выхода из системы`)
  }
}