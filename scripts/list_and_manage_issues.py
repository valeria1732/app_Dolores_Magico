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

url = 'https://api.github.com/repos/valeria1732/app_Dolores_Magico/issues?state=all'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        issues = json.loads(resp.read().decode())
        print(f"Total issues: {len(issues)}")
        for iss in issues:
            if 'pull_request' in iss:
                continue
            labels = [l['name'] for l in iss.get('labels', [])]
            assignees = [a['login'] for a in iss.get('assignees', [])]
            print(f"Issue #{iss['number']}: [{iss['state']}] {iss['title']}")
            print(f"   Assignees: {assignees} | Labels: {labels}")
except urllib.error.HTTPError as e:
    print('HTTPError:', e.code, e.read().decode())
