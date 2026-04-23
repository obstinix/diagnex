import { symptomEngine } from './src/services/symptomEngine';

console.log('TEST 1: headache and fever');
console.log(symptomEngine.analyze('headache and fever').severity);
console.log(symptomEngine.analyze('headache and fever').conditions.map(c => c.name));

console.log('\nTEST 2: chest pain left arm pain');
console.log(symptomEngine.analyze('chest pain left arm pain').severity);
console.log(symptomEngine.analyze('chest pain left arm pain').conditions.map(c => c.name));

console.log('\nTEST 3: runny nose sneezing sore throat');
console.log(symptomEngine.analyze('runny nose sneezing sore throat').severity);
console.log(symptomEngine.analyze('runny nose sneezing sore throat').conditions.map(c => c.name));

console.log('\nTEST 4: tired and dizzy');
console.log(symptomEngine.analyze('tired and dizzy').severity);
console.log(symptomEngine.analyze('tired and dizzy').conditions.map(c => c.name));
