export default function LinkButton(editor){
    const { codeBlockManager } = Object.getPrototypeOf(editor).constructor
    codeBlockManager.setReplacer('button',function(applyUrl){
        // Indentify multiple code blocks
        const wrapperId = `button-tui${Math.random()
            .toString(36)
            .substr(2, 10)}`;

          // Avoid sanitizing iframe tag
          setTimeout(renderButton.bind(null, wrapperId, applyUrl), 0);

          return `<div id="${wrapperId}"></div>`;
    });
}

function renderButton(wrapperId, applyUrl) {
    const el = document.querySelector(`#${wrapperId}`);
    const filter = applyUrl.split(",");

    el.innerHTML = `<a href="${filter[0]}" target="_blank"><button class="tui-apply_button" >${filter[1]}</button></a>`;
}