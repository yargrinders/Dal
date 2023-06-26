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
      isNightMode: false
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
        const files = ['der.txt', 'die.txt', 'das.txt'];
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
        const files = ['der.txt', 'die.txt', 'das.txt'];

        for (const file of files) {
          fetch(file)
            .then(response => response.text())
            .then(data => {
              const lines = data.split('\n');
              const article = file.split('.')[0];
              this.wordCount[article] = lines.length;
            });
        }
      },
      getClass(obj) {
        if (!this.currentArticle) { return }
        if (this.rightAnswer.article == obj ) {
          return this.rightAnswer.color;
        }
        return 'incorrect';
      },
      checkArticle(article) {
        this.totalClicks++;
        const files = ['der.txt', 'die.txt', 'das.txt'];
        const List = ['Der', 'Die', 'Das'];
        List.forEach(element => {
          for (const file of files) {
            fetch(file)
              .then(response => response.text())
              .then(data => {
                const words = data.split('\n');
                for (const line of words) {
                  const word = line.split(' ')[1];
                  const wordArticle = line.split(' ')[0];
  
                  if (word === this.randomWord && wordArticle === element) {
                    // this.wordColor = 'green';
                    this.currentArticle = article;
                    this.rightAnswer = {
                      color: 'correct',
                      article: element
                    }
                    if (article == element) {
                      this.rightScore++;
                    }
                    
                    return;
                  }
                }
              });
          }
          // this.blockClicks = true;
          // return;
        });

        
        
        this.blockClicks = true;
        
        // this.wordColor = 'red';
        // this.rightAnswer = {
        //   color: 'incorrect',
        //   article: article
        // }
        // this.currentArticle = article;
      },
      updateWord() {
        this.blockClicks = false;
        this.loadWords();
      }
    }
  });