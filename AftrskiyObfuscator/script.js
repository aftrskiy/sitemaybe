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


