import {makeAutoObservable} from 'mobx'
import authService from '../services/authService';
import { User } from '../models/authResponse';

export default class Store {
  user = {} as User;
  isAuth = false;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await authService.login(email, password)
      localStorage.setItem('token', response.data.auth_token)
      this.setAuth(true)
      // this.setUser(response.data.auth_token)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await authService.register(email, password)
      localStorage.setItem('token', response.data.auth_token)
      this.setAuth(true)
      // this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await authService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as User)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}