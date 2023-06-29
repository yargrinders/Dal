new Vue({
  el: '#app',
  data: {
    randomWord: '',
    wordColor: '',
    rightAnswer: {
      color: '',
      article: '',
    },
    rightScore: 0,
    wrongScore: 0,
    totalClicks: 0,
    currentArticle: '',
    blockClicks: false,
    wordCount: {
      der: 0,
      die: 0,
      das: 0
    },
    isNightMode: false,
    timer: 0
  },
  watch: {
    currentArticle(val) {
      if (val?.length && val != this.rightAnswer.article) {
        this.wrongScore++;
      }
    }
  },
  mounted() {
    this.loadWords();
    this.loadWordCount();
  },
  methods: {
    loadWords() {
      const files = ['data/der.txt', 'data/die.txt', 'data/das.txt'];
      const randomFile = files[Math.floor(Math.random() * files.length)];

      fetch(randomFile)
        .then(response => response.text())
        .then(data => {
          const words = data.split('\n');
          const randomLine = words[Math.floor(Math.random() * words.length)];
          this.randomWord = randomLine.split(' ')[1];
          this.wordColor = '';
          this.currentArticle = '';
        });
    },
    loadWordCount() {
      const files = ['data/der.txt', 'data/die.txt', 'data/das.txt'];

      for (const file of files) {
        fetch(file)
          .then(response => response.text())
          .then(data => {
            const lines = data.split('\n');
            const article = file.split('/')[1].split('.')[0];
            this.wordCount[article] = lines.length;
          });
      }
    },
    getClass(obj) {
      if (!this.currentArticle) { return; }
      if (this.rightAnswer.article == obj) {
        return this.rightAnswer.color;
      }
      return 'incorrect';
    },
    checkArticle(article) {
      this.totalClicks++;
      const files = ['data/der.txt', 'data/die.txt', 'data/das.txt'];

      this.blockClicks = true;

      fetch(files[0])
        .then(response => response.text())
        .then(data => {
          const words = data.split('\n');
          for (const line of words) {
            const word = line.split(' ')[1];
            const wordArticle = line.split(' ')[0];

            if (word === this.randomWord && wordArticle === 'Der') {
              this.currentArticle = article;
              this.rightAnswer = {
                color: 'correct',
                article: 'Der'
              };
              if (article.toLowerCase() === 'der') {
                this.rightScore++;
                this.wordColor = 'green';
              } else {
                this.wordColor = 'red';
              }
              this.startTimer();
              return;
            }
          }
        });

      fetch(files[1])
        .then(response => response.text())
        .then(data => {
          const words = data.split('\n');
          for (const line of words) {
            const word = line.split(' ')[1];
            const wordArticle = line.split(' ')[0];

            if (word === this.randomWord && wordArticle === 'Die') {
              this.currentArticle = article;
              this.rightAnswer = {
                color: 'correct',
                article: 'Die'
              };
              if (article.toLowerCase() === 'die') {
                this.rightScore++;
                this.wordColor = 'green';
              } else {
                this.wordColor = 'red';
              }
              this.startTimer();
              return;
            }
          }
        });

      fetch(files[2])
        .then(response => response.text())
        .then(data => {
          const words = data.split('\n');
          for (const line of words) {
            const word = line.split(' ')[1];
            const wordArticle = line.split(' ')[0];

            if (word === this.randomWord && wordArticle === 'Das') {
              this.currentArticle = article;
              this.rightAnswer = {
                color: 'correct',
                article: 'Das'
              };
              if (article.toLowerCase() === 'das') {
                this.rightScore++;
                this.wordColor = 'green';
              } else {
                this.wordColor = 'red';
              }
              this.startTimer();
              return;
            }
          }
        });
    },
    updateWord() {
      this.blockClicks = false;
      this.loadWords();
    },
    startTimer() {
      this.timer = 5;
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(interval);
          this.timer = 0;
          this.updateWord();
        }
      }, 1000);
    }
  }
});
