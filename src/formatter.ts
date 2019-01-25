import * as Octokit from '@octokit/rest'

export default class Formatter {
    private data: Octokit.IssuesListForRepoResponseItem[]

    public constructor(data: Octokit.IssuesListForRepoResponseItem[]) {
        this.data = data
    }

    public format(): string {
        const arranged = this.arrangeData()

        let str = ''

        Array.from(arranged.keys())
            .sort((a, _) => {
                if (a === 'other') return 1
                return -1
            })
            .forEach((key, _) => {
                str = `${str}\n- ${key}`
                arranged.get(key).forEach(element => {
                    str = `${str}\n    - ${element}`
                })
            })

        return str
    }

    private arrangeData(): Map<string, string[]> {
        let map = new Map<string, string[]>()

        this.data.forEach(e => {
            let val: string[]
            if (e.labels.length) {
                if (!map.get(`[${e.labels[0].name}](${e.labels[0].url})`)) {
                    map.set(`[${e.labels[0].name}](${e.labels[0].url})`, [])
                }
                val = map.get(`[${e.labels[0].name}](${e.labels[0].url})`)
            } else {
                if (!map.get('other')) {
                    map.set('other', [])
                }
                console.log(e)
                val = map.get('other')
            }
            const statusStr = e.state === 'closed' ? '[Done]' : ''
            val.push(`${statusStr}[${e.title}](${e.url})`)
        })

        return map
    }
}
