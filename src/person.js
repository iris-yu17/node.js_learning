class Person {
    // 建構函式
    constructor(name = 'noname', age = 20) {
        this.name = name;
        this.age = age;
    }

    toJSON() {
        return JSON.stringify({
            name: this.name,
            age: this.age,
        })
    }
    toString() {
        return this.toJSON();
    }
}

// const p1 = new Person('David', 23);
//
// console.log(p1);
// console.log(''+p1);
// console.log(p1.toJSON());

// module.exports = Person;
// 改成
module.exports = {
    Person,
    f1: a => a * a,
};
