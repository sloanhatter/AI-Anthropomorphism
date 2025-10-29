from flask import Flask, request, jsonify, send_from_directory
import csv, os, datetime

app = Flask(__name__, static_folder='.', static_url_path='')  # serve your files

CSV_PATH = 'data/demographics.csv'
os.makedirs(os.path.dirname(CSV_PATH), exist_ok=True)

# Create header if file doesn't exist
if not os.path.exists(CSV_PATH):
    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['timestamp_utc', 'age', 'gender', 'schooling_level', 'ai_use', 'ip'])

@app.post('/api/demographics')
def save_demographics():
    data = request.get_json(force=True, silent=True) or {}
    row = [
        datetime.datetime.utcnow().isoformat(timespec='seconds') + 'Z',
        data.get('age', ''),
        data.get('gender', ''),
        data.get('schooling_level', ''),
        data.get('ai_use', ''),
        request.remote_addr or ''
    ]
    with open(CSV_PATH, 'a', newline='', encoding='utf-8') as f:
        csv.writer(f).writerow(row)
    return jsonify({'ok': True})

# Optional: serve your HTML at /
@app.get('/')
def root():
    return send_from_directory('.', 'demographics.html')  # rename your file if needed

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
