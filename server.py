import http.server
import json
import urllib.request
import urllib.error
import os
import sys

PORT = 8000

class AIRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow cross-origin requests for local debugging
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/identify':
            self.handle_identify()
        elif self.path == '/api/chat':
            self.handle_chat()
        elif self.path == '/api/quiz':
            self.handle_quiz()
        else:
            self.send_error(404, "Endpoint not found")

    def get_api_key(self):
        # 1. Check environment variable
        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key:
            return api_key.strip()
        
        # 2. Check local config.json
        config_path = os.path.join(os.getcwd(), "config.json")
        if os.path.exists(config_path):
            try:
                with open(config_path, "r", encoding="utf-8") as f:
                    config = json.load(f)
                    api_key = config.get("GEMINI_API_KEY")
                    if api_key:
                        return api_key.strip()
            except Exception as e:
                print(f"Error reading config.json: {e}", file=sys.stderr)
        
        return None

    def send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        response_bytes = json.dumps(data).encode('utf-8')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def read_post_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        return json.loads(post_data.decode('utf-8'))

    def call_gemini_api(self, payload):
        api_key = self.get_api_key()
        if not api_key:
            return {
                "error": "API_KEY_MISSING",
                "message": "Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable or create a config.json file in the root directory containing {\"GEMINI_API_KEY\": \"your_key\"}."
            }

        models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro", "gemini-3.5-flash"]
        last_error = None

        for model in models_to_try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )

            try:
                print(f"[INFO] Sending request to model: {model}...")
                with urllib.request.urlopen(req) as response:
                    res_body = response.read().decode('utf-8')
                    res_data = json.loads(res_body)
                    
                    # Extract response text
                    candidate = res_data.get('candidates', [{}])[0]
                    content = candidate.get('content', {})
                    parts = content.get('parts', [{}])
                    text = parts[0].get('text', '')
                    return {"text": text}
            except urllib.error.HTTPError as e:
                err_body = e.read().decode('utf-8')
                try:
                    err_data = json.loads(err_body)
                    err_msg = err_data.get("error", {}).get("message", str(e))
                except Exception:
                    err_msg = err_body or str(e)
                
                print(f"[WARNING] Model {model} failed: {err_msg}")
                last_error = err_msg
                continue
            except Exception as e:
                print(f"[WARNING] Model {model} connection error: {str(e)}")
                last_error = str(e)
                continue

        return {"error": "API_ERROR", "message": f"Gemini API Error (All models exhausted): {last_error}"}

    def handle_identify(self):
        try:
            body = self.read_post_body()
            image_b64 = body.get('image')
            mime_type = body.get('mimeType', 'image/jpeg')

            if not image_b64:
                self.send_json_response(400, {"error": "BAD_REQUEST", "message": "Image data is required"})
                return

            # Clean base64 header if present (e.g. data:image/jpeg;base64,...)
            if ',' in image_b64:
                image_b64 = image_b64.split(',')[1]

            prompt = (
                "You are an expert Indian cultural heritage guide. Analyze the provided image of a monument, temple, fort, painting, sculpture, or artifact.\n"
                "Provide your response in JSON format with the following keys:\n"
                "- success (boolean): true if a cultural heritage object/monument is identified, false otherwise.\n"
                "- name (string): The identified name of the monument/object.\n"
                "- location (string): Location and associated state/region in India (e.g., 'Agra, Uttar Pradesh').\n"
                "- history (string): Detailed historical background.\n"
                "- significance (string): Cultural, historic, or religious significance.\n"
                "- architecture (string): Architectural style, key artistic features, or craftsmanship details.\n"
                "- facts (array of strings): 3-5 interesting or lesser-known facts about the monument/object.\n"
                "- did_you_know (string): a single standout, highly surprising, or fascinating historical/cultural fact about the monument or object.\n"
                "- related (array of objects): exactly 3 similar cultural heritage locations in India. Each object must have:\n"
                "  - name (string): Name of the related heritage site.\n"
                "  - description (string): A short description of why it is related and what makes it interesting.\n"
                "- error_message (string): if success is false, explain why (e.g., 'The image does not appear to be an Indian cultural heritage site or object.')."
            )

            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {"text": prompt},
                            {
                                "inlineData": {
                                    "mimeType": mime_type,
                                    "data": image_b64
                                }
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "responseMimeType": "application/json"
                }
            }

            result = self.call_gemini_api(payload)
            
            if "error" in result:
                self.send_json_response(500 if result["error"] != "API_KEY_MISSING" else 400, result)
            else:
                try:
                    # The response from Gemini is expected to be a JSON string inside the 'text' property
                    parsed_json = json.loads(result["text"])
                    self.send_json_response(200, parsed_json)
                except Exception as e:
                    self.send_json_response(500, {
                        "error": "PARSE_ERROR", 
                        "message": "Failed to parse JSON response from Gemini", 
                        "raw_text": result["text"]
                    })
        except Exception as e:
            self.send_json_response(500, {"error": "SERVER_ERROR", "message": str(e)})

    def handle_chat(self):
        try:
            body = self.read_post_body()
            monument = body.get('monument')
            messages = body.get('messages', [])

            if not monument:
                self.send_json_response(400, {"error": "BAD_REQUEST", "message": "Monument context is required"})
                return

            system_instruction = (
                f"You are a helpful and knowledgeable Indian cultural heritage guide assistant. "
                f"The user is asking questions about the monument: '{monument.get('name')}' located in '{monument.get('location')}'.\n"
                f"Use the following information as context to inform your answers, but feel free to expand with your general knowledge of Indian history and architecture:\n"
                f"- History: {monument.get('history')}\n"
                f"- Significance: {monument.get('significance')}\n"
                f"- Architecture: {monument.get('architecture')}\n"
                f"- Facts: {', '.join(monument.get('facts', []))}\n\n"
                f"Respond to the user's questions in a friendly, engaging, and informative tone. Keep your responses concise (under 3 paragraphs) and tailored to a digital travel journal explorer."
            )

            # Map the message history into Gemini's format
            contents = []
            for msg in messages:
                contents.append({
                    "role": msg.get("role", "user"),
                    "parts": [{"text": msg.get("content", "")}]
                })

            payload = {
                "contents": contents,
                "systemInstruction": {
                    "parts": [{"text": system_instruction}]
                }
            }

            result = self.call_gemini_api(payload)
            
            if "error" in result:
                self.send_json_response(500 if result["error"] != "API_KEY_MISSING" else 400, result)
            else:
                self.send_json_response(200, {"text": result["text"]})
        except Exception as e:
            self.send_json_response(500, {"error": "SERVER_ERROR", "message": str(e)})

    def handle_quiz(self):
        try:
            body = self.read_post_body()
            monument = body.get('monument')
            difficulty = body.get('difficulty', 'medium')

            if not monument:
                self.send_json_response(400, {"error": "BAD_REQUEST", "message": "Monument context is required"})
                return

            prompt = (
                f"Based on the monument/object '{monument.get('name')}' located in '{monument.get('location')}', "
                f"generate 5 multiple-choice questions testing the user's knowledge. The difficulty level must be strictly '{difficulty.upper()}'.\n"
                f"Guidelines for difficulty levels:\n"
                f"- EASY: simple questions about the main name, obvious visual features, and famous legends.\n"
                f"- MEDIUM: intermediate details about history, architectural style, and timeline events.\n"
                f"- HARD: advanced details, specific dates, detailed architectural terms, patronage, and lesser-known historical context.\n\n"
                f"Provide the output in JSON format with a single key 'questions' containing an array of 5 objects.\n"
                f"Each object must have the following keys:\n"
                f"- question (string): The multiple-choice question.\n"
                f"- options (array of 4 strings): exactly 4 options to choose from.\n"
                f"- answer (number): 0-indexed index of the correct option (0, 1, 2, or 3).\n"
                f"- explanation (string): A short, encouraging explanation of why it is correct."
            )

            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": prompt}]
                    }
                ],
                "generationConfig": {
                    "responseMimeType": "application/json"
                }
            }

            result = self.call_gemini_api(payload)
            
            if "error" in result:
                self.send_json_response(500 if result["error"] != "API_KEY_MISSING" else 400, result)
            else:
                try:
                    parsed_json = json.loads(result["text"])
                    self.send_json_response(200, parsed_json)
                except Exception as e:
                    self.send_json_response(500, {
                        "error": "PARSE_ERROR", 
                        "message": "Failed to parse JSON quiz response from Gemini", 
                        "raw_text": result["text"]
                    })
        except Exception as e:
            self.send_json_response(500, {"error": "SERVER_ERROR", "message": str(e)})

if __name__ == '__main__':
    # Switch working directory to server file's folder to ensure correct serving path
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, AIRequestHandler)
    print(f"CultureQuest AI Server started on port {PORT}...")
    print("To stop the server, press Ctrl+C or kill the process.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        sys.exit(0)
