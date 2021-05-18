import * as core from '@actions/core'
import * as gh from '@actions/github'

run().catch(error => core.setFailed(error.message))

async function run() {

    const token = core.getInput('token')

    const octokit = gh.getOctokit(token)

    // paginate: receive all results across all pages
    const user = gh.context.repo.owner
    console.log(`Fetch repos owned by user ${user}`)
    octokit.paginate("GET /users/{owner}/repos?type={type}", {
        owner: user,
        type: "owner"
    }).then((repos) => {
        console.log(`Found ${repos.length} repos`)
        const repos_with_page = repos.filter(value => value.has_pages).map(value => {
            return {
                name: value.name,
                has_pages: true,
                description: value.description
            }
        })
        const out = {
            user: user,
            data: repos_with_page
        }
        core.setOutput('ghp', JSON.stringify(out))
    });
}