// Queue class
module.exports = class Queue {

    constructor(arr) {
        if(arr != null)
            this.items = arr;
        else
            this.items = [];
    }
                 
    enqueue(element) {    
        this.items.push(element);
    }

    dequeue() {
        if(this.isEmpty())
            return -1;
        return this.items.shift();
    }

    front() {
        if(this.isEmpty())
            return -1;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printQueue() {
        for(var i = 0; i < this.items.length; i++) {
            if(this.items[i] != 'undefined')
                console.log(this.items[i]);
        }        
    }
}