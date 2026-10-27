import subprocess
import urllib.request
import urllib.error
import json

proc = subprocess.run(['git', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n', text=True, capture_output=True)
creds = dict(line.split('=', 1) for line in proc.stdout.splitlines() if '=' in line)
token = creds.get('password', '')

headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'DoloresMagico-Script',
    'Content-Type': 'application/json'
}

query = """
query {
  user(login: "valeria1732") {
    projectV2(number: 1) {
      id
      title
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
          ... on ProjectV2Field {
            id
            name
          }
        }
      }
      items(first: 20) {
        nodes {
          id
          content {
            ... on Issue {
              number
              title
              state
            }
          }
          fieldValues(first: 10) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field {
                  ... on ProjectV2SingleSelectField {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
"""

req = urllib.request.Request('https://api.github.com/graphql', data=json.dumps({'query': query}).encode(), headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(json.dumps(res, indent=2))
except urllib.error.HTTPError as e:
    print('HTTPError:', e.code, e.read().decode())
