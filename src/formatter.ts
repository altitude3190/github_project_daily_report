import * as Octokit from '@octokit/rest'

export default class Formatter {
    private data: Octokit.IssuesListForRepoResponseItem[]

    public constructor(data: Octokit.IssuesListForRepoResponseItem[]) {
        this.data = data
    }

    public format(): string {
        const arranged = this.arrangeData()

        let str = ''

        arranged.forEach((val, key) => {
            str = `${str}\n- ${key}`
            val.forEach(element => {
                str = `${str}\n    - ${element}`
            })
        })

        return str
    }

    private arrangeData(): Map<string, string[]> {
        let map = new Map<string, string[]>()

        this.data.forEach(e => {
            let val
            if (e.labels.length) {
                if (!map.get(`[${e.labels[0].name}](${e.labels[0].url})`)) {
                    map.set(`[${e.labels[0].name}](${e.labels[0].url})`, [])
                }
                val = map.get(`[${e.labels[0].name}](${e.labels[0].url})`)
            } else {
                if (!map.get('no label')) {
                    map.set('no label', [])
                }
                val = map['other'] || []
            }
            val.push(`[${e.title}](${e.url})`)
        })

        return map
    }
}
