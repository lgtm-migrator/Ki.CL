import Core from '~/Core';

class App extends Core {
    public static config() {
        return {
            a : 'a',
            b : 'b',
            c : 'c'
        };
    }

    constructor() {
        super();

        console.log('there');
    }
}

export default new App();