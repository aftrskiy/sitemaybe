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
        alert("Obfuscate the code bruh");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            const btn = document.querySelector(".copy-btn");
            btn.textContent = "Copied";
            btn.classList.add("copied");

            setTimeout(() => {
                btn.textContent = "Copy";
                btn.classList.remove("copied");
            }, 2000);
        })
        .catch(err => {
            console.error("Error: ", err);
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
                 btn.textContent = "Copied";
                 btn.classList.add("copied"); // Add copied class for feedback

                 setTimeout(() => {
                     btn.textContent = "КОПИРОВАТЬ";
                     btn.classList.remove("copied");
                 }, 2000);

            } catch (e) {
                console.error("Fallback copying failed: ", e);
                 const btn = document.querySelector(".copy-btn");
                 btn.textContent = "Error";
                 setTimeout(() => {
                      btn.textContent = "Copy";
                 }, 2000);
            } finally {
                 document.body.removeChild(textarea);
            }
        });
}



