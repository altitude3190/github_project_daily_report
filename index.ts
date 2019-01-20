class Startup {
    public static main(hoge: string): number {
        console.log('Hello World' + hoge)
        return 0
    }
}

function today(): string {
    const today = new Date()
    const YYYY = today.getFullYear()
    const MM = `0${today.getMonth() + 1}`.slice(-2)
    const DD = `0${today.getDate()}`.slice(-2)
    return `${YYYY}-${MM}-${DD}`
}

const project = process.argv[2]
const since = process.argv[3] || today()

Startup.main(since)
