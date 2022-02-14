import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Смартфоны' }
    ]
    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Apple' }
    ]
    this._devices = [
      {
        id: 1,
        name: 'iPhone 12 pro',
        price: 100000,
        rating: 5,
        img: 'https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-pro-gold-hero.png'
      },
      {
        id: 2,
        name: 'iPhone 12 pro',
        price: 100000,
        rating: 5,
        img: 'https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-pro-gold-hero.png'
      },
      {
        id: 3,
        name: 'iPhone 12 pro',
        price: 100000,
        rating: 5,
        img: 'https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-pro-gold-hero.png'
      },
      {
        id: 4,
        name: 'iPhone 12 pro',
        price: 100000,
        rating: 5,
        img: 'https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-pro-gold-hero.png'
      },
      {
        id: 5,
        name: 'iPhone 12 pro',
        price: 100000,
        rating: 5,
        img: 'https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-pro-gold-hero.png'
      }
    ]
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }

  setBrands(brands) {
    this._brands = brands
  }

  setDevices(devices) {
    this._devices = devices
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }
}
