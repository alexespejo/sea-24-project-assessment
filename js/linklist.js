class Node {
 constructor(data) {
  this.data = data;
  this.next = null;
 }
}

class LinkedList {
 constructor() {
  this.head = null;
  this.size = 0;
 }

 append(data) {
  const newNode = new Node(data);

  if (!this.head) {
   this.head = newNode;
  } else {
   let current = this.head;
   while (current.next) {
    current = current.next;
   }
   current.next = newNode;
  }

  this.size++;
 }

 push(data) {
  const newNode = new Node(data);
  newNode.next = this.head;
  this.head = newNode;
  this.size++;
 }

 removeAt(index) {
  if (index < 0 || index >= this.size) {
   return console.log("Invalid index");
  }

  let current = this.head;
  let previous = null;
  let currentIndex = 0;

  if (index === 0) {
   this.head = current.next;
  } else {
   while (currentIndex < index) {
    previous = current;
    current = current.next;
    currentIndex++;
   }

   previous.next = current.next;
  }

  this.size--;
  return current.data;
 }
}
