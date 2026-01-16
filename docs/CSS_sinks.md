# CSS sinks

| Sink | API / Method | Example | Impact / Notes |
|------|-------------|---------|----------------|
| cssText | element.style.cssText | `body.style.cssText = userInput;` | - Arbitrary property injection<br>- Inheritable<br>- Can lead to XSS in old browser (eg. `-o-link:'javascript:alert(1)'`) |
| insertRule | CSSStyleSheet.insertRule | `sheet.insertRule(userInput, sheet.cssRules.length);`<br>`sheet.insertRule(@import "${userInput}");` | - Full CSS injection (global selectors included `*`, `html`, `[attr]`) |
| setProperty | CSSStyleDeclaration.setProperty | `el.style.setProperty(name, value);` | - Limited control<br>- Inheritable<br>- Useful for side-channels (es. `background`) |
| adoptedStyleSheets | CSSStyleSheet + document.adoptedStyleSheets | `const sheet = new CSSStyleSheet();`<br>`sheet.replaceSync("a { color: red; }");`<br>`document.adoptedStyleSheets.push(sheet);` | - Full CSS injection<br>- ModernAPI |
| innerHTML / outerHTML | HTML parsing | `el.innerHTML = <style>${userInput}</style>` | - Not a pure CSS sink<br>- Can lead to JS execution if not filtered |
| insertAdjacentHTML | DOM insertion | `el.insertAdjacentHTML("beforeend", <style>${userInput}</style>)` | - HTML sink exploitable for CSS injection |
| document.write | Document stream | `document.write(<style>${userInput}</style>);` | - HTML sink legacy<br>- Global impact |
| link.href | HTMLLinkElement.href | `link.href = userInput;` | - Remote CSS injection<br>|
| style binding (vue.js) | :style | `<div :style="item.style"/>` | - Arbitrary property injection<br>- attribute theft|
