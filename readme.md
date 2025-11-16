# 📦 **String Transformer**

A lightweight and browser-based tool that transforms text using different predefined modes.
Designed for simplicity, clarity, and fast testing of string manipulation utilities.

This project is ideal for developers who want to:

* Test text transformations quickly in the browser
* Build small JS utilities for string formatting
* Understand basic state and DOM manipulation without frameworks

---

## 🚀 **Live Demo**

[https://nandovejer.github.io/string-transformer/](https://nandovejer.github.io/string-transformer/)

---

## ✨ Features

* Multiple transformation modes (uppercase, lowercase and more)
* Clean and minimal UI
* Real-time validation
* “Copy Output” button for fast usage
* Vanilla JavaScript — no dependencies
* Fully hosted on GitHub Pages

---

## 📂 Project Structure

```
/
├── index.html          # UI structure
├── index.js            # Main app logic
├── src/                # Optional modules and helpers
└── styles/             # CSS styles (if included)
```

---

## 🧩 How It Works

1. Select a **transformation mode**
2. Write your **input text**
3. Click **Transform String**
4. The output appears in the output box
5. Copy the result if needed

If no mode is selected or the input is invalid, the app displays an error message.

---

## 🛠️ Development

Clone the repo:

```bash
git clone https://github.com/nandovejer/string-transformer
cd string-transformer
```

Open the project locally.
Since it uses only static files, you can run it with any local server, for example:

```bash
npx serve
```

Or use VS Code’s "Live Server" extension.

---

## 🧪 Recommended Test Cases

To ensure correct behavior, test the following:

### ✔️ Input Validation

* Empty string
* Spaces only `"     "`
* Emojis
* UTF-8 characters (`á`, `ñ`, `ç`)
* Very long text

### ✔️ Mode Selection

* Transform with no mode selected
* Change mode after input
* Reset input and transform again

### ✔️ Output & Copy

* Ensure the “Copy Output” button copies correct text
* Verify output updates on each transform

---

## 🐞 Known Issues (to fix)

* “The format is wrong” message shows before any user action
* English typo: `"Mode No selected"` → `"No mode selected"`
* A stray “*” before “Transform String”
* Improve accessibility: labels and ARIA roles

---

## 📌 Future Improvements

* Add more transformation modes
* Add dark/light theme
* Improve validation UX
* Add unit tests (Jest / Vitest)
* Add language selector (ES/EN)

---

## 📄 License

MIT — free to use and modify.

