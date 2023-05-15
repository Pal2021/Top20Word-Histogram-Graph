import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const WordFrequencyChart = () => {
  const [wordFrequency, setWordFrequency] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.terriblytinytales.com/test.txt"
      );
      const text = await response.text();
      const wordCounts = processText(text);
      const topWords = getTopWords(wordCounts, 20);
      setWordFrequency(topWords);
      createChart(topWords);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const processText = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const wordCounts = {};

    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    return wordCounts;
  };

  const getTopWords = (wordCounts, count) => {
    const sortedWords = Object.keys(wordCounts).sort(
      (a, b) => wordCounts[b] - wordCounts[a]
    );
    return sortedWords.slice(0, count).map((word) => ({
      word,
      count: wordCounts[word]
    }));
  };

  const createChart = (data) => {
    const ctx = document.getElementById("chart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.word),
        datasets: [
          {
            label: "Word Frequency",
            data: data.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  };

  return (
    <div>
      <canvas id="chart" width="400" height="200"></canvas>
    </div>
  );
};

export default WordFrequencyChart;
