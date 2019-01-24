import * as Octokit from '@octokit/rest'
import * as process from 'process'

export default class Client {
    private octokit: Octokit

    public constructor() {
        this.octokit = new Octokit({
            baseUrl: process.env.BASE_URL
        })
        this.authenticate()
    }
    private authenticate() {
        this.octokit.authenticate({
            type: 'app',
            token: process.env.GITHUB_TOKEN
        })
    }
    public async getIssues(
        owner: string,
        repo: string,
        since: string,
        assignee: string
    ) {
        try {
            const { data } = await this.octokit.issues.listForRepo({
                owner,
                repo,
                since,
                assignee
            })
            return data
        } catch (e) {
            console.log('ERROR', e)
        }
    }
}
