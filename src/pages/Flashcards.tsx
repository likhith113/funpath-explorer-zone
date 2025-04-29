
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const flashcardSets = {
  python: [
    {
      question: "What is a Python decorator?",
      answer: "A function that takes another function as an argument, extends its behavior, and returns it. Decorators allow you to modify the behavior of functions or methods without changing their code."
    },
    {
      question: "Explain list comprehension in Python.",
      answer: "A concise way to create lists using a single line of code. The syntax is: [expression for item in iterable if condition]. It's generally more readable and faster than traditional for loops for creating lists."
    },
    {
      question: "What are Python generators?",
      answer: "Functions that return an iterator that yields items one at a time, using the 'yield' keyword. They allow for efficient memory usage when dealing with large data sets as they generate values on-demand."
    },
    {
      question: "Explain the difference between '==' and 'is' in Python.",
      answer: "'==' checks if two objects have the same value, while 'is' checks if two references point to the same object in memory. For example, a = [1,2,3]; b = [1,2,3]; a == b returns True, but a is b returns False."
    }
  ],
  stats: [
    {
      question: "What is the difference between mean, median, and mode?",
      answer: "Mean is the average of all values. Median is the middle value when data is sorted. Mode is the most frequently occurring value. Mean is sensitive to outliers, median is robust to outliers, and mode shows the most common value."
    },
    {
      question: "Explain the Central Limit Theorem.",
      answer: "The Central Limit Theorem states that the sampling distribution of the mean will approach a normal distribution as the sample size increases, regardless of the original population's distribution. This is fundamental to statistical inference."
    },
    {
      question: "What is a p-value?",
      answer: "A p-value is the probability of obtaining results at least as extreme as the observed results, assuming the null hypothesis is true. A small p-value (typically ≤ 0.05) indicates strong evidence against the null hypothesis."
    },
    {
      question: "What's the difference between correlation and causation?",
      answer: "Correlation measures the statistical relationship (dependency) between two variables. Causation means that one variable directly influences or causes changes in the other. Correlation does not imply causation."
    }
  ],
  ml: [
    {
      question: "What is overfitting in machine learning?",
      answer: "Overfitting occurs when a model learns the training data too well, including its noise and outliers. This results in excellent performance on training data but poor generalization to new, unseen data. Techniques to prevent it include regularization, cross-validation, and increasing training data."
    },
    {
      question: "Explain the bias-variance tradeoff.",
      answer: "The bias-variance tradeoff is the balance between a model's ability to fit the training data (low bias) and its ability to generalize to new data (low variance). High bias leads to underfitting, while high variance leads to overfitting. Finding the optimal balance is crucial for creating good models."
    },
    {
      question: "What's the difference between supervised and unsupervised learning?",
      answer: "Supervised learning uses labeled data where the algorithm learns to map inputs to known outputs. Unsupervised learning works with unlabeled data to find patterns or structures without predefined outputs. Examples of supervised learning include regression and classification, while clustering and dimensionality reduction are examples of unsupervised learning."
    },
    {
      question: "What is gradient descent?",
      answer: "Gradient descent is an optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient. In machine learning, it's used to find the parameters (weights) that minimize the loss function."
    }
  ],
  viz: [
    {
      question: "When should you use a bar chart vs. a histogram?",
      answer: "Use a bar chart to compare categorical data, where bars represent discrete categories. Use a histogram to visualize the distribution of continuous numerical data, where bars represent frequency within bins or intervals."
    },
    {
      question: "What is a heatmap and when is it useful?",
      answer: "A heatmap uses color intensity to represent values in a matrix. It's useful for visualizing correlation matrices, showing patterns in large datasets, or displaying complex relationships between multiple variables simultaneously."
    },
    {
      question: "What is the purpose of a box plot?",
      answer: "A box plot (or box-and-whisker plot) summarizes the distribution of data showing the median, quartiles, and potential outliers. It's useful for comparing distributions across groups and identifying skewness and outliers in the data."
    },
    {
      question: "What are the key components of an effective data visualization?",
      answer: "Effective data visualizations should have clear labels, appropriate scales, meaningful colors, minimal clutter, and a focused message. They should accurately represent the data while making insights easily accessible to the audience."
    }
  ]
};

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`flip-card w-full h-56 md:h-64 ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner w-full h-full relative">
        <div className="flip-card-front absolute w-full h-full bg-white rounded-lg border border-border p-6 flex flex-col justify-center cursor-pointer">
          <h3 className="text-lg font-semibold text-center">{question}</h3>
          <div className="mt-4 text-center text-sm text-muted-foreground">Click to reveal answer</div>
        </div>
        <div className="flip-card-back absolute w-full h-full bg-funpath-soft-purple rounded-lg border border-border p-6 flex flex-col justify-center cursor-pointer">
          <p className="text-base">{answer}</p>
          <div className="mt-4 text-center text-sm text-muted-foreground">Click to see question</div>
        </div>
      </div>
    </div>
  );
};

const Flashcards = () => {
  const [currentCardIndices, setCurrentCardIndices] = useState({
    python: 0,
    stats: 0,
    ml: 0,
    viz: 0
  });

  const nextCard = (category) => {
    setCurrentCardIndices({
      ...currentCardIndices,
      [category]: (currentCardIndices[category] + 1) % flashcardSets[category].length
    });
  };

  const prevCard = (category) => {
    setCurrentCardIndices({
      ...currentCardIndices,
      [category]: (currentCardIndices[category] - 1 + flashcardSets[category].length) % flashcardSets[category].length
    });
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge with these interactive flashcards. Click on a card to flip it and reveal the answer!
        </p>
      </div>

      <Tabs defaultValue="python" className="max-w-3xl mx-auto">
        <TabsList className="w-full justify-start mb-8 overflow-x-auto">
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="ml">Machine Learning</TabsTrigger>
          <TabsTrigger value="viz">Data Visualization</TabsTrigger>
        </TabsList>

        {Object.keys(flashcardSets).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="mb-8">
              <Flashcard 
                question={flashcardSets[category][currentCardIndices[category]].question}
                answer={flashcardSets[category][currentCardIndices[category]].answer}
              />
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => prevCard(category)}>Previous</Button>
                <div className="text-center text-sm text-muted-foreground pt-2">
                  Card {currentCardIndices[category] + 1} of {flashcardSets[category].length}
                </div>
                <Button variant="outline" onClick={() => nextCard(category)}>Next</Button>
              </div>
            </div>
            
            <div className="mt-12 bg-muted p-6 rounded-lg">
              <h3 className="font-medium mb-2">Study Tips:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review these cards regularly to reinforce your knowledge</li>
                <li>• Try to explain the concepts in your own words before revealing the answer</li>
                <li>• Apply these concepts to real-world problems to deepen understanding</li>
                <li>• Share and discuss these topics in our Telegram community</li>
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Flashcards;
