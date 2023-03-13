function convertHtmlToMarkdown(element) {
    if (element == null) return;
    const rules = {
        p: (match) => convertHtmlToMarkdown(match) + '\n\n',
        strong: (match) => `**${convertHtmlToMarkdown(match)}**`,
        em: (match) => `_${convertHtmlToMarkdown(match)}_`,
        pre: (match) => {
            let language = match.querySelector('span').innerText;
            let content = match.querySelector('.p-4').innerText;
            return "```"
                + language
                + "\n"
                + content
                + (content.endsWith('\n') ? "" : "\n")
                + "```\n"
        },
        a: (match) => `[${match.innerText}](${match.href})`,
        img: (match) => `![${match.getAttribute('alt')}](${match.src})`,
        br: (match) => match.innerText + '\n',
        ol: (match) => {
            let text = [];
            let i = parseInt(match.getAttribute('start'));
            if (isNaN(i)) i = 1;
            for (let li of match.querySelectorAll('li')) {
                text.push(i + '. ' + convertHtmlToMarkdown(li))
                i++;
            }
            return text.join('\n') + '\n';
        },
        ul: (match) => {
            let text = [];
            let i = parseInt(match.getAttribute('start'));
            for (let li of match.querySelectorAll('li')) {
                text.push('* ' + convertHtmlToMarkdown(li))
                i++;
            }
            return text.join('\n') + '\n';
        },
        code: (match) => '`' + match.innerText + '`',
        table: (match) => {
            let text = [];
            let headText = '|'
            let head = match.querySelector('thead');
            let columns = head.querySelectorAll('th')
            columns.forEach(element => {
                headText += convertHtmlToMarkdown(element) + '|'
            });
            text.push(headText)

            let sep = '|'
            for (let i = 0; i < columns.length; i++) {
                sep += '---|'
            }
            text.push(sep)

            let body = match.querySelector('tbody');
            body.querySelectorAll('tr').forEach(tr => {
                console.log(tr);

                let line = '|'
                tr.querySelectorAll('td').forEach(td => {
                    line += convertHtmlToMarkdown(td) + '|';
                })
                text.push(line)
            })
            return text.join('\n')
        },
        h1: (match) => `# ${convertHtmlToMarkdown(match)}\n\n`,
        h2: (match) => `## ${convertHtmlToMarkdown(match)}\n\n`,
        h3: (match) => `### ${convertHtmlToMarkdown(match)}\n\n`,
        h4: (match) => `#### ${convertHtmlToMarkdown(match)}\n\n`,
        h5: (match) => `##### ${convertHtmlToMarkdown(match)}\n\n`,
        h6: (match) => `###### ${convertHtmlToMarkdown(match)}\n\n`,
        blockquote: (match) => "> " + convertHtmlToMarkdown(match) + '\n\n',
        hr: () => "---\n"
    };

    let markdown = '';
    const elements = element.childNodes;
    if (elements.length > 0) {
        for (const children of elements) {
            if (children.nodeType === 3) {
                markdown += children.nodeValue;
            } else {
                const tagName = children.tagName.toLowerCase();
                if (tagName in rules) {
                    markdown += rules[tagName](children);
                } else {
                    markdown += children.innerHTML;
                }
            }
        }
    } else {
        markdown = element.innerText;
    }

    console.log(markdown);
    return markdown.trim();
}

(() => {
    const messages = Array.from(document.querySelectorAll(".text-base")).map(message => {
        const isUser = !message.querySelector(".markdown");
        const sender = isUser ? 'User' : 'ChatGPT';
        let text;
        if (isUser) {
            text = "\n```\n" + message.querySelector('.whitespace-pre-wrap').innerText + "\n```\n";
        } else {
            text = convertHtmlToMarkdown(message.querySelector(".markdown")) + "\n\n---\n";
        }
        return `**${sender}:** ${text}\n\n`;
    }).join('');

    const downloadLink = document.createElement("a");
    downloadLink.download = document.title + " - ChatGPT.md";
    downloadLink.href = URL.createObjectURL(new Blob([messages]));
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
})();