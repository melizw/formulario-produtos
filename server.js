const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <h1>Cadastro de Produto</h1>
            <form method="POST">
                Código do Produto: <input type="text" name="codigo" required><br><br>
                Nome do Produto: <input type="text" name="nome" required><br><br>
                Categoria: 
                <select name="categoria">
                    <option value="eletronicos">Eletrônicos</option>
                    <option value="alimenticios">Alimentícios</option>
                    <option value="roupas">Roupas</option>
                    <option value="outros">Outros</option>
                </select><br><br>
                Preço: <input type="number" name="preco" step="0.01" required><br><br>
                Quantidade: <input type="number" name="quantidade" required><br><br>
                <button type="submit">Cadastrar Produto</button>
            </form>
        `);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const produto = querystring.parse(body);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <h1>Produto Cadastrado com Sucesso!</h1>
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Nome:</strong> ${produto.nome}</p>
                <p><strong>Categoria:</strong> ${produto.categoria}</p>
                <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <a href="/">Cadastrar outro produto</a>
            `);
        });
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
