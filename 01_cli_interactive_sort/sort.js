
export default class Sorting {
    constructor(data) {
        this.data = data;
    }
    setValue(data) {
        this.data = data;
    }
    getWords() {
        return this.data.filter((el) => el !== "" && isNaN(el));
    }
    getNumbers() {
        return this.data
          .filter((item) => item !== "" && !isNaN(item))
          .map((item) => isNaN(item) ? item : +item);
    }
    getSortedWords() {
        const arr = this.getWords();
        arr.sort();
        return arr;
    }
    getSortedNumbersByAscending() {
        const arr = this.getNumbers();
        arr.sort((a, b) => a - b);
        return arr;
    }
    getSortedNumbersByDecreasing() {
        const arr = this.getNumbers();
        arr.sort((a, b) => b - a);
        return arr;
      }
    getSortedByLength() {
        const arr = this.getWords();
        arr.sort((a, b) => a.length - b.length);
        return arr;
    }
    getUniqueValues() {
        const arr = this.getWords();
        const uniqueValues = [...new Set(arr)];
        return uniqueValues;
    }
}
