export const debounce = (func, timeout) => {
  return function (...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeout) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => func(...args), timeout)
  }
}
