let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth = 100;
let inventory = ["Magic Wand"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const weapons = [
    {
        name: "Magic Wand",
        power: 5,
    },
    {
        name: "Mystic Dagger",
        power: 30,
    },
    {
        name: "Arcane Hammer",
        power: 50,
    },
    {
        name: "Excalibur's Sword",
        power: 100,
    },
];

const monsters = [
    {
        name: "Goblin",
        level: 2,
        health: 15,
    },
    {
        name: "Dark Elf",
        level: 8,
        health: 60,
    },
    {
        name: "Dark Spectre",
        level: 12,
        health: 120,
    },
    {
        name: "Dark Sorcerer",
        level: 20,
        health: 300,
    },
];


const locations = [
    {
        name: "town square",
        "button text": ["Go to Magical Shop", "Enter the Mystical Forest", "Enter the Enchanted Castle"],
        "button functions": [goMagicShop, enterForest, enterCastle],
        text: "You stand in the town square. Your adventure awaits your exploration.",
    },
    {
        name: "magic shop",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTownSquare],
        text: "You entered the magical shop",
    },
    {
        name: "mystical forest",
        "button text": ["Fight Goblin", "Fight Dark Elf", "Return to Town Square"],
        "button functions": [fightGoblin, fightDarkElf, goTownSquare],
        text: "You enter the mystical forest. Strange creatures lurk in the shadows.",
    },
    {
        name: "castle",
        "button text": ["Face Spectre", "Confront Dark Sorcerer", "Return to Town Square"],
        "button functions": [fightSpectre, confrontSorcerer, goTownSquare],
        text: "The entrance of the enchanted castle looms before you. Castle guardians stand ready.",
    },
    {
        name: "fight",
        "button text": ["Attack", "Evade", "Retreat to Town Square"],
        "button functions": [attack, evade, goTownSquare],
        text: "You confront the monster, wielding dark energy to protect the Enchanted Crown.",
    },
    {
        name: "kill monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions": [goTownSquare, goTownSquare, easterEgg],
        text: 'The monster screams "Arg!" As it dies, you gain experience points and find gold!',
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You died.",
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeated the dark sorcerer! YOU WIN!",
    },
    {
        name: "easter egg",
        "button text": ["Two", "Eight", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTownSquare],
        text: "You find a secret game. Pick a number above. Ten numbers wil be randomly chosen between 0 and 10. If the number yuo choose matches one of the random numbers, you win!",
    },
];

//initialize buttons
button1.onclick = goMagicShop;
button2.onclick = enterForest;
button3.onclick = enterCastle;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text; //location["text"]
}

function goTownSquare() {
    update(locations[0]);
}

function goMagicShop() {
    update(locations[1]);
}

function enterForest(){
    update(locations[2])
}

function enterCastle() {
    update(locations[3]);
}

function buy(amount) {
    gold -= amount;
    goldText.innerText = gold;
}

function buyHealth() {
    if (gold >= 10) {
        buy(10);
        health += 10;
        healthText.innerText = health;
    } else text.innerText = "You do not have enough gold to buy health.";
}

function getStringArray(arr) {
    return arr.join(", ") + ".";
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            buy(30);
            currentWeapon++;
            text.innerText =
                "You now have a " + weapons[currentWeapon].name + ".";
            inventory.push(weapons[currentWeapon].name);
            text.innerText += " In your inventory, you have:\n" + getStringArray(inventory);
        } else text.innerText = "You do not have enough gold to buy a weapon.";
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon (15 gold)";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); //returns and removes first element of the array
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have:\n" + getStringArray(inventory);
    } else text.innerText = "Don't sell your only weapon!";
}

function fight(){
    console.log(monsterNameText);
    update(locations[4]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit()) 
        health -= getMonsterAttack(monsters[fighting].level);
    else
        text.innerText += " You miss.";

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; 
    healthText.innerText = health > 0 ? health : 0;
    monsterHealthText.innerText = monsterHealth > 0 ? monsterHealth : 0;
    if (health <= 0) 
        lose();
    else if (monsterHealth <= 0)
        fighting === 3 ? winGame() : defeatMonster();

    if (Math.random() <= 0.1 && inventory.length !== 1){
        text.innerText += " Your " + inventory.pop() + " breaks."; //pop returns and removes the final item
        currentWeapon--;
    }
}

function evade(){ text.innerText = "You dodge the attack from the " + monsters[fighting].name + "."; }

function fightGoblin() {
    fighting = 0;
    fight();
    resetMonsterStats();
}

function fightDarkElf() {
    fighting = 1;
    fight();
    resetMonsterStats();
}

function fightSpectre(){
    fighting = 2;
    fight();
    resetMonsterStats();
}

function confrontSorcerer() {
    fighting = 3;
    fight();
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[5]);  
}


function resetMonsterStats(){
    if (fighting === 0)
        monsters[fighting].health = 15;
    else if (fighting === 1)
        monsters[fighting].health = 60;
    else if (fighting === 2)
        monsters[fighting].health = 120;
}

function getMonsterAttack(level){ return (level * 5) - (Math.floor(Math.random() * xp)); }

function isMonsterHit(){ return Math.random() > .2 || health < 20; }

function easterEgg(){ update(locations[8]); }

function pick(guess){
    let numbers = [];
    while (numbers.length < 10)
        numbers.push(Math.floor(Math.random() * 11));
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < numbers.length; i++)
        text.innerText += numbers[i] + "\n";
    if (numbers.indexOf(guess) !== -1){
        text.innerText += " Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health > 0 ? health : 0;
        if (health <= 0)
            lose();
    }
            
}

function pickTwo(){ pick(2); }

function pickEight(){ pick(8); }

function lose(){ update(locations[6]); }

function winGame(){ update(locations[7]); }

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth = 100;
    inventory = ["Magic Wand"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTownSquare();
}


