const youtubePlugin=(editor)=>{
    const { codeBlockManager } = Object.getPrototypeOf(editor).constructor
    codeBlockManager.setReplacer('youtube',function(youtubeId){
        // Indentify multiple code blocks
        const wrapperId = `yt${Math.random()
            .toString(36)
            .substr(2, 10)}`;

          // Avoid sanitizing iframe tag
          setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);

          return `<div  id="${wrapperId}"></div>`;
    });
}
function renderYoutube(wrapperId, youtubeId) {
    const el = document.querySelector(`#${wrapperId}`);
    el.innerHTML = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${youtubeId}"></iframe>`;
}

export default youtubePlugin;