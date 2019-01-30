import * as Octokit from '@octokit/rest'

export default class Formatter {
    private data: Octokit.IssuesListForRepoResponseItem[]
    private repoName: string

    public constructor(
        repo: string,
        data: Octokit.IssuesListForRepoResponseItem[]
    ) {
        this.data = data
        this.repoName = repo
    }

    public format(): string {
        const arranged = this.arrangeData()

        let str = `- ${this.repoName}`

        Array.from(arranged.keys())
            .sort((a, _) => {
                if (a === 'other') return 1
                return -1
            })
            .forEach((key, _) => {
                str = `${str}\n    - ${key}`
                arranged.get(key).forEach(element => {
                    str = `${str}\n        - ${element}`
                })
            })

        return str
    }

    private arrangeData(): Map<string, string[]> {
        let map = new Map<string, string[]>()

        this.data.forEach(e => {
            let val: string[]
            if (e.labels.length) {
                if (!map.get(e.labels[0].name)) {
                    map.set(e.labels[0].name, [])
                }
                val = map.get(e.labels[0].name)
            } else {
                if (!map.get('other')) {
                    map.set('other', [])
                }
                val = map.get('other')
            }
            const statusStr = e.state === 'closed' ? '[Done]' : ''
            val.push(`${statusStr}[${e.title}](${e.html_url})`)
        })

        return map
    }
}
