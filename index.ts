import Client from './src/client'

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

const owner = process.argv[2]
const repo = process.argv[3]
const since = process.argv[4] || today()

Startup.main(since)

const client = new Client()
const hoge = client.getIssues(owner, repo, since)
console.log(hoge)
