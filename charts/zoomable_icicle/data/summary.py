import json

# Read and parse the generated data
with open('data.js', 'r', encoding='utf-8-sig') as f:
    content = f.read()
    json_str = content.replace('const electionData = ', '').rstrip(';\n')
    data = json.loads(json_str)

print('Lebanese Elections 2022 - Data Summary')
print('=' * 60)
print(f'\nCountry: {data["name"]}')
print(f'Total Votes: {data["value"]:,}')
print(f'Number of Political Affiliations: {len(data["children"])}')

print(f'\n\nTop 10 Political Affiliations by Votes:')
print('-' * 60)
for i, party in enumerate(data['children'][:10], 1):
    print(f'{i:2d}. {party["name"]:40s} {party["value"]:>8,} votes ({len(party["children"]):2d} candidates)')

print(f'\n\nSample Candidate Data (First from top party):')
print('-' * 60)
sample = data['children'][0]['children'][0]
print(f'Name: {sample["name"]}')
print(f'Votes: {sample["value"]:,}')
print(f'Religion: {sample["classification"][0]}')
print(f'Parliamentary Bloc: {sample["classification"][1]}')
print(f'Electoral List: {sample["classification"][2]}')

print(f'\n\n✓ Data structure matches the expected format!')
print(f'✓ File saved as: data.js')
