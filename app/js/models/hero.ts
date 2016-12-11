class Hero {

    constructor(public name: string,
                public heroClass: HeroClass,
                public health: number,
                public mana: number) {

    }

    Talk(): void {
        console.log(`Hello from ${name}!`);
    }

    GetClass(): string {
        return HeroClass[this.heroClass];
    }
}
