import os
import re

def verify_structure():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Verifying project files in {base_dir}...")
    
    files_to_check = [
        "index.html",
        "css/styles.css",
        "css/components.css",
        "js/data.js",
        "js/app.js"
    ]
    
    # Check if files exist
    all_exist = True
    for f in files_to_check:
        full_path = os.path.join(base_dir, f)
        if os.path.exists(full_path):
            print(f"✅ Found: {f} ({os.path.getsize(full_path)} bytes)")
        else:
            print(f"❌ Missing: {f}")
            all_exist = False
            
    if not all_exist:
        print("❌ Verification failed: Some files are missing!")
        return False
        
    # Verify index.html contents
    html_path = os.path.join(base_dir, "index.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
        
    # Check links
    required_links = [
        r'href=["\']css/styles.css["\']',
        r'href=["\']css/components.css["\']',
        r'src=["\']js/data.js["\']',
        r'src=["\']js/app.js["\']'
    ]
    
    print("\nVerifying links in index.html:")
    for link in required_links:
        if re.search(link, html_content):
            print(f"✅ Found link matching: {link}")
        else:
            print(f"❌ Mismatched or missing link: {link}")
            all_exist = False
            
    # Check for all required pages
    required_pages = [
        "landing-page",
        "dashboard-page",
        "map-page",
        "city-explore-page",
        "quiz-page",
        "story-page",
        "passport-page",
        "achievements-page",
        "profile-page"
    ]
    
    print("\nVerifying required pages in index.html:")
    for page in required_pages:
        pattern = f'id=["\']{page}["\']'
        if re.search(pattern, html_content):
            print(f"✅ Page container found: id='{page}'")
        else:
            print(f"❌ Page container missing: id='{page}'")
            all_exist = False
            
    # Simple brackets check for JS files
    print("\nVerifying JS file syntax (bracket matching):")
    for js_file in ["js/data.js", "js/app.js"]:
        js_path = os.path.join(base_dir, js_file)
        with open(js_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        stack = []
        brackets = {')': '(', '}': '{', ']': '['}
        line_num = 1
        col_num = 1
        has_error = False
        
        for idx, char in enumerate(content):
            if char == '\n':
                line_num += 1
                col_num = 1
            else:
                col_num += 1
                
            if char in brackets.values():
                stack.append((char, line_num, col_num))
            elif char in brackets.keys():
                if not stack:
                    print(f"❌ Extra closing bracket '{char}' at line {line_num}, col {col_num}")
                    has_error = True
                    break
                top, t_line, t_col = stack.pop()
                if top != brackets[char]:
                    print(f"❌ Mismatched bracket: opened '{top}' at line {t_line}, col {t_col} but closed with '{char}' at line {line_num}, col {col_num}")
                    has_error = True
                    break
                    
        if stack and not has_error:
            top, t_line, t_col = stack[-1]
            print(f"❌ Unclosed bracket '{top}' opened at line {t_line}, col {t_col}")
            has_error = True
            
        if not has_error:
            print(f"✅ {js_file} bracket syntax clean!")
        else:
            all_exist = False

    if all_exist:
        print("\n🎉 ALL VERIFICATION PASSED SUCCESSFULLY!")
        return True
    else:
        print("\n❌ SOME VERIFICATIONS FAILED!")
        return False

if __name__ == "__main__":
    import sys
    success = verify_structure()
    sys.exit(0 if success else 1)
