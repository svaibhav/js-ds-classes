class TokenBucket {
  constructor(maxTokens, timeLimit) {
    this.maxTokens = maxTokens;
    this.currentTokens = maxTokens;
    this.timeLimit = timeLimit;
    this.lastRefilTime = new Date();
  }

  refil() {
    let now = new Date();
    let diff = now - this.lastRefilTime;
    let tokensToFill = parseInt((now - this.lastRefilTime) * this.maxTokens / this.timeLimit);
    console.log({diff, tokensToFill, currentTokens: this.currentTokens})
    if (tokensToFill > 0) {
      this.currentTokens = Math.min(this.currentTokens + tokensToFill, this.maxTokens);
      this.lastRefilTime = now;
    }
  }

  allowRequest() {
    this.refil();
    if (this.currentTokens > 0) {
      this.currentTokens--;
      return true;
    }
    return false;
  }
}

const tb = new TokenBucket(2, 5000);
console.log(tb);
// new Array(10).fill(0).forEach(() => console.log(tb.allowRequest()));

setInterval(() => {
  console.log(tb.allowRequest());
}, 1000)
