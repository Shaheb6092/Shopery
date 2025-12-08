function filterList() {
    removeHighlight();
    const searchText = document.getElementById('myInput').value.toLowerCase();
    if (searchText) {
        highlightText(document.body, searchText);
    }
}

function highlightText(element, text) {
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const nodesToReplace = [];
    while (node = treeWalker.nextNode()) {
        const nodeText = node.nodeValue.toLowerCase();
        if (nodeText.includes(text)) {
            nodesToReplace.push({ node, text });
        }
    }

    nodesToReplace.forEach(({ node, text }) => {
        const newNode = document.createElement('span');
        const regex = new RegExp(`(${text})`, 'gi');
        newNode.innerHTML = node.nodeValue.replace(regex, `<span class="highlight">$1</span>`);
        node.parentNode.replaceChild(newNode, node);
    });
}

function removeHighlight() {
    const highlightedElements = document.querySelectorAll('span.highlight');
    highlightedElements.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });
}

const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: yellow;
    }
`;
document.head.appendChild(style);



// =================================================================
//      PASSWORD TOGGLE VISIBILITY
// =================================================================
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", function() {
        const input = document.getElementById(this.getAttribute("data-target"));

        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("bi-eye-slash");
            this.classList.add("bi-eye");
        } else {
            input.type = "password";
            this.classList.remove("bi-eye");
            this.classList.add("bi-eye-slash");
        }
    });
});