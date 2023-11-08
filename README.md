# KATA TDD Delivery Price

## Installation Instructions

```JavaScript
npm install
npm run dev     //run in development mode
npm run test    //run tests
npm run build   //build ./dist bundle
npm start       //run javascript bundle
```

## Description

Vogliamo realizzare un servizio di calcolo delle spese di spedizione da mettere a disposizione di un ipotetico eCommerce. Il nostro servizio accetterà in ingresso i seguenti parametri

- Prodotto {prezzo, volume (mm), Peso (g) e quantità}
- Costo totale del carrello 
- Destinazione di spedizione
- Corriere (DHL, UPS e FedEx w/ standard o espressa)

## Rules

- [x] Consegna Standard: Calcola il peso volumetrico e il peso totale del carrello, quello che costa di più è il costo finale della spedizione 
- [x] Consegna Gratuita: Se la somma del costo dei prodotti nel carrello è almeno 100 il costo di consegna è 0
- [x] Consegna espressa: Il prezzo è il prezzo della consegna standard +30%
- [x] Regole geografiche: 
    - [x] Italia -> Costo spedizione + 3
    - [x]  Brasile -> Costo spedizione - 2% 
- [x] Seleziona il costo di spedizione maggiore tra quelli ottenuti
### Costo per Peso

|   | Da 0 a 2kg | da 2 a 5 kg | sopra i 5kg |
|---|---|---|---| 
| DHL | 5,00 | 10,00 | 20,00 | 
| UPS | 6,50 | 9,00 | 21,00 | 
| FedEx | 7,00 | 12,00 | 24,00 | 

### Costo per Volumetrico

|   | Da 0 a 3kg | da 3 a 7 kg | sopra i 7kg |
|---|---|---|---| 
| DHL | 5,5 | 8,00 | 27,00 | 
| UPS | 6,00 | 11,00 | 30,00 | 
| FedEx | 5,00 | 10,00 | 29,00 | 
