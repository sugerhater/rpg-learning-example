function Character(name, profession) {
    this.name = name;
    this.gold = 100;

    switch (profession) {
        case 'Warrior':
            this.profession = new WarriorBehavior();
            break;
        case 'Thief':
            this.profession = new ThiefBehavior();
            break;
        case 'Mage':
            this.profession = new MageBehavior();
            break;
        default:
            throw new Error(`${profession} is not an implemented class`);
    }
}

Character.prototype.attack = function(enemy) {
    // Delegate the attack method to it's specialized profession attack
    this.profession.attack(enemy)
}


/**
 * Warrior
 */

function WarriorBehavior() {
    this.health = 100;
    this.attack = 10;
    this.name = "Warrior"
}

WarriorBehavior.prototype.attack = function(enemy) {
    enemy.health -= this.attack;
}


/**
 * Thief
 */

function ThiefBehavior() {
    this.health = 75;
    this.attack = 10;
    this.criticalChance = 0.15
    this.criticalModifier = 3;
    this.name = "Thief";
}

ThiefBehavior.prototype.attack = function(enemy) {
    const damage = Math.random() <= this.criticalChance
        ? this.attack * this.criticalModifier
        : this.attack;
    enemy.health -= damage;
}


/**
 * Mage
 */

function MageBehavior() {
    this.health = 50;
    this.attack = 15;
    this.name = "Mage";
}

MageBehavior.prototype.attack = function(enemy) {
    enemy.health -= this.attack;
}

module.exports = Character