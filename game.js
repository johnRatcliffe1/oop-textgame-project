class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = null;
    this._item = null;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  get item() {
    return this._item;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  set item(value) {
    this._item = value;
  }

  describe() {
    return `Looking around the ${this._name}, you can see ${this._description}.`;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = `The ${room.name} is to the ${direction}.`;
      details.push(text);
    }
    return details;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("The way is blocked.");
      return this;
    }
  }
}

class Item {
  constructor(name) {
    this._name = name;
    this._description = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  set name(value) {
    
    this._name = value;
  }

  set description(value) {
    
    this._description = value;
  }

  describe() {
    return `Congratulations, you have found ${this._name}. ${this._name} is ${this._description}.`;
  }
}

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("Conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  describe() {
    return `You have met ${this._name}. ${this._name} is ${this._description}.`;
  }

  converse() {
    return `${this._name} says "${this._conversation}"`;
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name);
    this._weakness = "";
  }

  get weakness() {
    return this._weakness;
  }

  set weakness(value) {
    if (value.length < 4) {
      alert("Weakness is too short.");
      return;
    }
    this._weakness = value;
  }

  fight(item) {
    if (item === this.weakness) {
      return true;
    } else {
      return false;
    }
  }
}

class Ally extends Character {
  constructor(name) {
    super(name);
    this._gift = "";
  }

  get gift() {
    return this._gift;
  }

  set gift(value) {
    this._gift = value;
  }

  handShake() {
    return `You give a firm handshake to ${this._name}. ${this._name} gives you a ${this._gift}.`;
  }
}

class Player {
  constructor() {
    this._inventory = []; 
  }

  get inventory() {
    return this._inventory;
  }

 
  
}

const Bridge = new Room("Bridge");
Bridge.description =
  "the once pristine room is now covered in pulsating alien growths. The viewport offers glimpses of doomed vessels floating aimlessly.";
const Hydroponics = new Room("Hydroponics Bay");
Hydroponics.description =
  "a large room that once had lush vegetation, now turned into a writhing otherworldly forest. Bioluminescent fungi and carnivorous plants grow uncontrollably.";
const Cargo = new Room("Cargo Hold");
Cargo.description =
  "a large room with crates and containers that seem to shift and writhe when observed closely.";
const Quarters = new Room("Living Quarters");
Quarters.description =
  "the once cozy living area has become a breeding ground for grotesque vine like growths.";

Bridge.linkRoom("south", Hydroponics);
Bridge.linkRoom("east", Quarters);
Hydroponics.linkRoom("north", Bridge);
Hydroponics.linkRoom("east", Cargo);
Cargo.linkRoom("west", Hydroponics);
Cargo.linkRoom("north", Quarters);
Quarters.linkRoom("south", Cargo);
Quarters.linkRoom("west", Bridge);

const plasmaCutter = new Item("Plasma Cutter");
plasmaCutter.description = "a standard issue plasma cutter.";
const butterKnife = new Item("Butter Knife");
butterKnife.description = "a dull butter knife.";

const infested = new Enemy("Infested Engineer");
infested.conversation = "Grrr aghhh";
infested.description = "a former crew member, that's itching for a fight.";
infested.weakness = "Plasma Cutter";

const crew = new Ally("Lucas");
crew.conversation = "Hello, glad to see you are still alive.";
crew.description = "a healthy crew member who would like a talk and a handshake";
crew.gift = "Plasma Cutter";

Cargo.character = infested;
Quarters.character = crew;


const player = new Player();

function displayRoomInfo(room) {
  let occupantMsg = "";
  let itemMsg = "";
  if (!room.character) {
    if (!room.item) {
      itemMsg = "There is no item here.";
    } else {
      itemMsg = `${room.item.describe()},`;
    }
  } else {
    occupantMsg = `${room.character.describe()},`;
  }

  const textContent = `<p>${room.describe()}</p>
    <p>${occupantMsg}</p>
    <p>${room.getDetails()}</p>`;

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML =
    '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

function playerCommands(command, character) {
  let msg = "";
  switch (command) {
    case "fight":
      if (character.fight) {        
        msg = `You have defeated the ${character.name}. Game over.`;
        alert(msg);
      }
      break;
    case "talk":
      msg = character.converse();
      alert(msg);
      break;
    case "handshake":
      msg = character.handShake();
      alert(msg);
      break;
    case "inventory":
      msg = `You have ${player.inventory[0].name}.`;
      alert(msg);
      break;
  }
}

function startGame() {
  currentRoom = Bridge;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value.toLowerCase();
      const directions = ["north", "south", "east", "west"];
      const commands = ["fight", "talk", "handshake", "inventory"];
      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else if (commands.includes(command)) {
        playerCommands(command, currentRoom.character);

        
      } else {
        document.getElementById("usertext").value = "";
        alert("Invalid command");
      }
    }
  });
}

startGame();
