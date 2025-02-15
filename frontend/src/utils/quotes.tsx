type Quote = {
  quote: string;
  author: string;
  position: string;
};

const quotes: Quote[] = [
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    position: "Co-founder, Apple Inc.",
  },
  {
    quote: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    position: "Co-founder, Microsoft",
  },
  {
    quote:
      "I think it is possible for ordinary people to choose to be extraordinary.",
    author: "Elon Musk",
    position: "CEO, Tesla & SpaceX",
  },
  {
    quote:
      "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg",
    position: "Co-founder & CEO, Meta",
  },
  {
    quote:
      "It’s fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
    position: "Co-founder, Microsoft",
  },
  {
    quote:
      "Don’t compare yourself with anyone in this world. If you do so, you are insulting yourself.",
    author: "Bill Gates",
    position: "Co-founder, Microsoft",
  },
  {
    quote:
      "If you double the number of experiments you do per year, you’re going to double your inventiveness.",
    author: "Jeff Bezos",
    position: "Founder, Amazon",
  },
  {
    quote:
      "The most dangerous thing you can do in business is to go with the status quo.",
    author: "Jeff Bezos",
    position: "Founder, Amazon",
  },
  {
    quote:
      "A company shouldn’t get addicted to being shiny, because shiny doesn’t last.",
    author: "Jeff Bezos",
    position: "Founder, Amazon",
  },
  {
    quote:
      "If something is important enough, even if the odds are against you, you should still do it.",
    author: "Elon Musk",
    position: "CEO, Tesla & SpaceX",
  },
];

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
