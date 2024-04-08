class Node {
 constructor(data) {
  this.data = data;
  this.next = null;
 }
}

export class LinkedList {
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

 removeByTitle(title) {
  if (this.size === 1 && this.head.data.album_title === title) {
   alert("poped first");
   this.head = null;
   this.size = 0;
  } else {
   let current = this.head;
   let previous = null;

   while (current.data.album_title !== title) {
    previous = current;
    current = current.next;
   }

   previous.next = current.next;
   this.size--;
   return current.data;
  }
 }

 includes(data) {
  let current = this.head;
  while (current) {
   if (current.data.album_title === data) {
    return true;
   }
   current = current.next;
  }
  return false;
 }

 at(index) {
  if (index > this.size) {
   return 0;
  }

  let current = this.head;
  for (let i = 0; i < index; i += 1) {
   current = current.next;
  }
  return current.data;
 }
}
