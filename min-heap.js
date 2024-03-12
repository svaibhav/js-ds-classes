class MinHeap {

  constructor() {
    this.heap = [];
  }

  _printHeapData() {
    console.log(this.heap);
  }

  push(val) {
    if (isNaN(val)) {
      console.error("Use numeric values")
      return;
    }

    this.heap.push(val);

    let index = this.heap.length - 1;
    if (index !== 0) {
      let parentIndex = parseInt((index - 1)/2);
      // console.log({index, parentIndex, heap: this.heap})
      while (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
        parentIndex = parseInt((index - 1)/2);
      }
    }
  }

  pop() {
    let len = this.heap.length;
    if (!len) {
      // console.log('Heap empty');
      return null;
    }
    if (len == 1) {
      return this.heap.pop();
    }

    // swap the first and last element
    [this.heap[0], this.heap[len - 1]] = [this.heap[len - 1], this.heap[0]];
    let result = this.heap.pop();
    let index = 0;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      if (rightChild < len - 1) {
        // both children present
        let minIndex = this.heap[leftChild] < this.heap[rightChild] ? leftChild : rightChild;
        if (this.heap[index] > this.heap[minIndex]) {
          [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
          index = minIndex;
        } else {
          break;
        }
      } else if (this.heap[leftChild] < this.heap[index]) {
        [this.heap[leftChild], this.heap[index]] = [this.heap[index], this.heap[leftChild]];
        break;
      } else {
        break;
      }
    }
    return result;
  }
}

const minHeap = new MinHeap();
[4,7,1,9,0,2,5,8,11,14,3,6,13,19,20,10,30,12].forEach(
  x => minHeap.push(x)
);
minHeap._printHeapData();
new Array(20).fill(0).forEach(x => console.log(minHeap.pop()));