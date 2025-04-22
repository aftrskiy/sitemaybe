function obfuscate(method, inputText) {
    const input = inputText || document.getElementById("input").value.trim();
    if (!input)
      alert("bruh insert code");
        return "";
    }

    let output = "";

  if (method === "binary") {
        let binaryStr = "";
        for (let i = 0; i < input.length; i++) {
            binaryStr += input.charCodeAt(i).toString(2).padStart(8, '0');
        }
        output = `loadstring((function() local s="" for b in ("${binaryStr}"):gmatch("%d%d%d%d%d%d%d%d") do s=s..string.char(tonumber(b,2)) end return s end)())()`;
  }
  if (!inputText) { // Only update output div if called directly by button click
        document.getElementById("output").textContent = output;
    }
    return output;
}

function copyToClipboard() {
    const output = document.getElementById("output");
    const text = output.textContent;

    if (!text) {
        alert("Сначала сгенерируйте обфусцированный код!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            const btn = document.querySelector(".copy-btn");
            btn.textContent = "СКОПИРОВАНО!";
            btn.classList.add("copied");

            setTimeout(() => {
                btn.textContent = "КОПИРОВАТЬ";
                btn.classList.remove("copied");
            }, 2000);
        })
        .catch(err => {
            console.error("Ошибка копирования: ", err);
            // Fallback для старых браузеров
            const textarea = document.createElement("textarea");
            textarea.value = text;
            // Make the textarea invisible and remove it from the flow
            textarea.style.position = "fixed";
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.width = "1px";
            textarea.style.height = "1px";
            textarea.style.padding = "0";
            textarea.style.border = "none";
            textarea.style.outline = "none";
            textarea.style.boxShadow = "none";
            textarea.style.background = "transparent";


            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                 const btn = document.querySelector(".copy-btn");
                 btn.textContent = "Скопировано (fallback)";
                 btn.classList.add("copied"); // Add copied class for feedback

                 setTimeout(() => {
                     btn.textContent = "КОПИРОВАТЬ";
                     btn.classList.remove("copied");
                 }, 2000);

            } catch (e) {
                console.error("Fallback copying failed: ", e);
                 const btn = document.querySelector(".copy-btn");
                 btn.textContent = "Не удалось скопировать";
                 setTimeout(() => {
                      btn.textContent = "КОПИРОВАТЬ";
                 }, 2000);
            } finally {
                 document.body.removeChild(textarea);
            }
        });
}

const saveButton = document.getElementById('saveButton');
        const saveFileDialog = document.getElementById('saveFileDialog');
        const fileNameInput = document.getElementById('fileNameInput');
        const saveFileOkBtn = document.getElementById('saveFileOkBtn');
        const saveFileCancelBtn = document.getElementById('saveFileCancelBtn');
        const formatDialog = document.getElementById('formatDialog');
        const saveLuaBtn = document.getElementById('saveLuaBtn');
        const saveTextBtn = document.getElementById('saveTextBtn');

        let currentFileName = ''; // Variable to store the chosen filename

        // Show the file name dialog
        saveButton.addEventListener('click', () => {
            const outputText = document.getElementById("output").textContent.trim();
            if (!outputText) {
                alert("Нет кода для сохранения. Сначала проведите обфускацию.");
                return;
            }
            saveFileDialog.style.display = 'flex'; // Show dialog
            fileNameInput.value = ''; // Clear previous input
            fileNameInput.focus(); // Focus the input field
             formatDialog.style.display = 'none'; // Hide format dialog if it was open
        });

        // Handle OK button in file name dialog
        saveFileOkBtn.addEventListener('click', () => {
            const filename = fileNameInput.value.trim();
            if (filename) {
                currentFileName = filename; // Store filename
                saveFileDialog.style.display = 'none'; // Hide name dialog
                formatDialog.style.display = 'flex'; // Show format dialog
            } else {
                alert("Введите имя файла!");
                fileNameInput.focus();
            }
        });

         // Handle Enter key in file name input
         fileNameInput.addEventListener('keypress', (event) => {
             if (event.key === 'Enter') {
                 event.preventDefault(); // Prevent default form submission if any
                 saveFileOkBtn.click(); // Simulate click on OK button
             }
         });

        // Handle Cancel button in file name dialog
        saveFileCancelBtn.addEventListener('click', () => {
            saveFileDialog.style.display = 'none'; // Hide name dialog
        });

        // Handle format selection
        saveLuaBtn.addEventListener('click', () => {
            downloadFile(currentFileName, 'lua');
            formatDialog.style.display = 'none'; // Hide format dialog
        });

        saveTextBtn.addEventListener('click', () => {
            downloadFile(currentFileName, 'txt');
            formatDialog.style.display = 'none'; // Hide format dialog
        });

        // Function to download the file
        function downloadFile(filename, format) {
            const outputText = document.getElementById("output").textContent;
            // Использование application/octet-stream для предотвращения двойного расширения
            const blob = new Blob([outputText], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.${format}`; // Set the download filename
            document.body.appendChild(a); // Append to body to make it clickable
            a.click(); // Trigger the download

            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }


