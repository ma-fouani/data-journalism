from bs4 import BeautifulSoup
import json
import re

# Read HTML file
with open('elections.lb.2022.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Parse HTML
soup = BeautifulSoup(html_content, 'html.parser')
table = soup.find('table')
rows = table.find_all('tr')[1:]  # Skip header row

# Process data
candidates = []
for row in rows:
    cols = row.find_all('td')
    if len(cols) < 9:
        continue
    
    name = cols[0].get_text(strip=True)
    # Skip strikethrough names (removed candidates)
    if row.find('s'):
        continue
    
    bloc = cols[2].get_text(strip=True)
    
    # Extract political affiliation (remove HTML/CSS)
    affiliation_text = cols[3].get_text(strip=True)
    
    religion = cols[4].get_text(strip=True)
    electoral_list = cols[5].get_text(strip=True)
    votes_text = cols[6].get_text(strip=True).replace(',', '')
    
    # Skip rows with invalid votes
    try:
        votes = int(votes_text)
    except:
        continue
    
    candidates.append({
        'name': name,
        'bloc': bloc,
        'affiliation': affiliation_text,
        'religion': religion,
        'electoral_list': electoral_list,
        'votes': votes
    })

print(f'Parsed {len(candidates)} candidates')

# Group by political affiliation
affiliation_groups = {}
total_votes = 0

for candidate in candidates:
    affiliation = candidate['affiliation']
    if affiliation not in affiliation_groups:
        affiliation_groups[affiliation] = []
    affiliation_groups[affiliation].append(candidate)
    total_votes += candidate['votes']

# Build the JSON structure
result = {
    "name": "لبنان",
    "value": total_votes,
    "children": []
}

# Create children for each affiliation group
for affiliation, members in affiliation_groups.items():
    affiliation_votes = sum(m['votes'] for m in members)
    
    children = []
    for member in members:
        children.append({
            "name": member['name'],
            "value": member['votes'],
            "classification": [member['religion'], member['bloc'], member['electoral_list']]
        })
    
    result['children'].append({
        "name": affiliation,
        "value": affiliation_votes,
        "children": children
    })

# Sort children by value (descending)
result['children'].sort(key=lambda x: x['value'], reverse=True)

print(f'\nTotal votes: {total_votes}')
print(f'Number of political affiliations: {len(result["children"])}')
print(f'\nTop 5 affiliations by votes:')
for i, group in enumerate(result['children'][:5]):
    print(f'{i+1}. {group["name"]}: {group["value"]:,} votes ({len(group["children"])} candidates)')

# Write to data.js with proper UTF-8 BOM for Windows
with open('data.js', 'w', encoding='utf-8-sig') as f:
    json_str = json.dumps(result, ensure_ascii=False, indent=2)
    f.write(f'const electionData = {json_str};\n')

print('\n✓ Data saved to data.js')
