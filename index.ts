import Client from './src/client'
import Formatter from './src/formatter'
import * as program from 'commander'
import * as dotenv from 'dotenv'

dotenv.config()

function today(): string {
    const today = new Date()
    const YYYY = today.getFullYear()
    const MM = `0${today.getMonth() + 1}`.slice(-2)
    const DD = `0${today.getDate()}`.slice(-2)
    return `${YYYY}-${MM}-${DD}`
}

program
    .option(
        '-r, --repos <repos>',
        'target repos',
        (value: string) => value.split(','),
        []
    )
    .option('--since [date]', 'updated since', today())
    .option('-a, --assignee [assignee]', 'assignee', '*')
    .parse(process.argv)

const repos = program.repos || []
const since = program.since || today()
const assignee = program.assignee || '*'
const owner = process.env.OWNER

if (repos < 3 && !owner) {
    console.log('invalid arguments')
    program.help()
}

const client = new Client()

repos.forEach((repo: string) => {
    const _ = client
        .getIssues(owner, repo, since, assignee)
        .catch(e => {
            console.log(e)
        })
        .then(res => {
            if (res) {
                const formatter = new Formatter(repo, res)
                console.log(formatter.format())
            }
        })
})
