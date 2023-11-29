const assert = require('assert');
const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const sleep = require('sleep');

// Função assincrona executada:
async function Testar() 
{
    // Configurar o navegador Chrome
    const options = new chrome.Options();
    options.addArguments('start-maximized'); // Maximizar a janela do navegador

    // Criar o WebDriver
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    // Inicializar um objeto para armazenar os resultados do teste
    const testResults = {
        assertions: [],
        success: true,
    };

    try 
    {
        // Navegar até o Google
        await driver.get('https://www.google.com');

        // Achar barra de pesquisa
        busca_input = driver.findElement(By.name('q'));

        // Escrever na pesquisa
        busca_input.sendKeys('MarianeBS/MarianeBS Github', Key.RETURN);

        // Esperar carregar a página
        await driver.wait(until.titleContains('Github'), 5000);

        // Pegando a primeira pesquisa
        const firstResult = await driver.findElement(By.css('h3'));

        // Entrando na primeira pesquisa
        await firstResult.click();

        // Esperando carregar a página
        await driver.wait(until.titleContains('MarianeBS/MarianeBS'), 5000);

        // Esperar
        sleep.sleep(10);
    } 
    catch (error) 
    {
        console.error('Erro:', error.message);
        testResults.success = false;
        testResults.error = error.message;
    } 
    finally 
    {
        // Fechar o navegador ao finalizar o teste
        await driver.quit();

        // Gravar os resultados em um arquivo de log
        fs.writeFileSync('test-log.txt', JSON.stringify(testResults, null, 2));
    }
}

// Chamar a função para executar o teste
Testar();