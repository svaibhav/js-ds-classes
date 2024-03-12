function Node(val, isWord) {
  this.val = val;
  this.isWord = isWord;
  this.next = {};
}

class Trie {
  constructor() {
    this.trie = new Node('', false);
  }

  addWord(word) {
    word = word.trim();
    if (!word) return;

    let pt = this.trie;
    word.split('').forEach((ch, index) => {
      if (!pt.next[ch]) {
        pt.next[ch] = new Node(ch, false);
      }
      if (index == word.length - 1) {
        pt.next[ch].isWord = true;
      }
      pt = pt.next[ch];
    })
  }

  getAllWords(node, prefix, results) {
    if (!node) return results;

    for (let ch in node.next) {
      if (node.next[ch].isWord) {
        results.push(prefix + ch);
      }
      this.getAllWords(node.next[ch], prefix + ch, results);
    }
    return results;
  }

  search(prefix, sort, limit) {
    // get all words from Trie which have this prefix
    prefix = prefix.trim();
    if (!prefix) return [];
    let pt = this.trie;
    let results = [];
    let index = 0;

    while (pt && index < prefix.length) {
      // console.log({index})
      let ch = prefix[index];
      // console.log({ch, node: pt.next[ch]})
      if (pt.next[ch]) {
        // console.log(pt.next[ch].val)
        if (index == prefix.length - 1 && pt.next[ch].isWord) {
          results.push(prefix);
        }
      }
      pt = pt.next[ch];
      index++;
    }

    // console.log({pt})
    
    if (!pt) {
      // no more matching words
      return results;
    }

    results = this.getAllWords(pt, prefix, results);
    if (sort) {
      if (sort == 'DESC') {
        results = results.sort((a, b) => b - a);
      } else {
        results = results.sort();
      }
    }
    if (limit && !isNaN(limit)) {
      results = results.slice(0, limit);
    }
    return results;
  }
}

const trie = new Trie();
trie.addWord('apple');
trie.addWord('application');
trie.addWord('apply');
trie.addWord('applicable');

let words = ['camera', 'cameroon', 'camcord', 'campus', 'calculus', 'calculate', 'canvas', 'calcium', 'calendar', 'clear']
words.forEach(word => trie.addWord(word));

console.log(trie.search('c', 'ASC', 3));
console.log(trie.search('ca', 'ASC', 3));
console.log(trie.search('cam', 'ASC', 3));
console.log(trie.search('came', 'ASC', 3));
console.log(trie.search('camer', 'ASC', 3));
console.log(trie.search('camera', 'ASC', 3));
// console.log(JSON.stringify(trie));