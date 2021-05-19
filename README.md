# fetch-ghp

Github action: fetch repositories with deployed pages of a user

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE.md)
![Stability-wip](https://img.shields.io/badge/Stability-WIP-yellow.svg?style=flat-square)
[![Release:latest](https://img.shields.io/github/v/release/tanialx/fetch-ghp?color=turquoise&include_prereleases&label=version&style=flat-square)]()

## Table of contents

- [Description](#description)
- [Usage](#usage)
- [License](#license)

## Description

This action 
- retrieves username of repo's owner from github context `gh.context.repo.owner`
- makes API call using `octokit.paginate` to fetch all public repos of that user
- filters the response to get only repos that `has_pages`

*Github REST API does not support filters and Graph API does not include pages information, hence this multi-step approach*

## Usage

In github workflow

```yml
 - uses: tanialx/fetch-ghp@v0.0.1-alpha
   id: fetch_action_id # used to access the output in subsequent steps as ${{ steps.fetch_action_id.outputs.ghp }}
   with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

### Input

##### token

Token for making Github REST API requests

### Output

##### ghp

```javascript
{
  "user": "", // username
  "data": [ // list of all repos with has_pages = true
    {
      "name": "", // repo's name
      "has_pages": true,
      "description": "" // repo's short description
    }
  ]
}
```

### License

MIT &copy; 2021 Thuc Le
