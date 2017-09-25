const Node = require('./node');

class LinkedList {
    constructor() {
      this.length=0;
      this._head=null;
      this._tail=null;
    }

    append(data) {
      var node = new Node(data);
      if(this.length==0) {
        this._head=node;
        this._tail=node;
      }
      else {
        this._tail.next=node;
        node.prev=this._tail;
        this._tail=node;
      }    
    	this.length++;
    	return this;                        
  	}
    
    head(){
      return this._head.data;
    }

    tail() {
      return this._tail.data;
    }

    at(index) {
      var currentNode = this._head;
      var count = 0;
      while (count < index) {
        currentNode = currentNode.next;
        count++;
      } 
      return currentNode.data;
    }

    insertAt(index, data) {
      var node = new Node(data);
      //there are no element
      if ((this.length == 0 ) || ((index+1) > this.length)) {           
        return this;
      }
      //if insert on first position
      if (index==0) {
        var headTemp = this._head;
        this._head=node;
        // no second element
        if(this.length==1) {
          this._tail=headTemp;
          this._head.next = this._tail;
          this._tail.prev=this._head;
        }
        // there are second element
        else {
          this._head.next = headTemp;
          this._head.next.prev=node;
        }
      }

      // if insert on last positi
      else if ((index+1) == this.length) {
        var tailTemp=this._tail;
        tailTemp.prev.next=node;
        this._tail.prev=node;   
        node.next=this._tail;
        node.prev=tailTemp.prev;  
      }
      // if insert between first and last element
      else {
        var currentNode = this._head;
        var count = 0;
        while (count < index) {
          currentNode = currentNode.next;
          count++;
        } 
        node.next=currentNode;
        node.prev=currentNode.prev;
        node.prev.next=node;
        currentNode.prev=node;
      }
      this.length++;
      return this;
    }
    isEmpty() {
      return (this.length==0)?true:false;
    }

    clear() {
      var node= new Node();
      this.length=0;
      this._head=node;
      this._tail=node;
      return this;
    }

    deleteAt(index) {
    	//there are no element
      if ((this.length == 0 ) || ((index+1) > this.length) || (index<0)) {           
        return this;
      }
      //delete first element
      if (index==0) {
       	// if no second element
        if(this.length==1) {
          this._tail=null;
          this._head=null;
          this.length=1;
				}
        //there are second element
        else {
          this._head.next.prev = null;
          this._head=this._head.next;
        }
      }
      // delete last element
      else if (index+1 == this.length) {
        this._tail=this._tail.prev;
        this._tail.next=null;
      }
      // delete element between first and last 
      else {
        var currentNode=this._head;
        var count=0;
        var tempNode;
        while(count<index){
          currentNode=currentNode.next;
          count++;
        }
        tempNode=currentNode;
        currentNode.prev.next=currentNode.next;
        currentNode.next.prev=currentNode.prev;
      }
      this.length--;
      return this;
    }

    reverse() {        
      if (this.length==0) {
        return  this;
      }

      var count =this.length;  
      // reverse tail to head
      this._head=this._tail;
      this._head.next=this._head.prev;
      this._head.prev=null;

      var currentNode = this._head;
      // reverse element between head and tail
      while(count>1) {
        currentNode = currentNode.next;
        if(currentNode.prev!=null) {
          var tempNode=currentNode.prev;
          currentNode.prev=currentNode.next;
          currentNode.next=tempNode; 
        }
        count--;
      }
      //reverse tail element
      this._tail=currentNode;
      this._tail.prev=this._tail.next;
      this._tail.next=null;

      return this;
    }

    indexOf(data) {

    if(this.length==0) {
      return -1;
    }

    var currentNode = this._head;
    var count = 0;

    while (count < this.length) {
      if(currentNode.data==data){
        return count;
      }
      currentNode = currentNode.next;
      count++;   
    } 
    return -1;
  }
}

module.exports = LinkedList;
