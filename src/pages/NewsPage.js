import React from "react";
import "./NewsPage.css";

// Import images
import pic1 from "../assets/pic1.webp";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import pic5 from "../assets/pic5.webp";
import pic6 from "../assets/pic6.jpg";
import pic7 from "../assets/pic7.jpg";
import pic8 from "../assets/pic8.jpg";
import pic9 from "../assets/pic9.jpg";
import pic10 from "../assets/pic10.jpg";

const articles = [
  {
    title: "Diabetes: Symptoms and Prevention",
    description: "Discover the early signs of diabetes and methods to prevent it.",
    image: pic1,
  },
  {
    title: "Arterial Hypertension",
    description: "All about hypertension, a silent but dangerous disease.",
    image: pic2,
  },
  {
    title: "Asthma: How to Manage It Daily",
    description: "Tips for living better with asthma and reducing attacks.",
    image: pic3,
  },
  {
    title: "Breast Cancer",
    description: "Essential information on screening and prevention.",
    image: pic4,
  },
  {
    title: "Alzheimer's Disease",
    description: "Understanding the disease, its symptoms, and progression.",
    image: pic5,
  },
  {
    title: "Seasonal Flu",
    description: "How to protect yourself effectively during flu season.",
    image: pic6,
  },
  {
    title: "COVID-19: Update",
    description: "The latest information on the pandemic and vaccines.",
    image: pic7,
  },
  {
    title: "Cardiovascular Diseases",
    description: "Risk factors and prevention of heart problems.",
    image: pic8,
  },
  {
    title: "Depression",
    description: "Recognize the signs and seek help in time.",
    image: pic9,
  },
  {
    title: "Childhood Obesity",
    description: "A growing problem and ways to act early.",
    image: pic10,
  },
];

const NewsPage = () => {
  return (
    <div className="news-container">
      <h1 className="news-title">Latest Medical News</h1>
      <div className="news-list">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
                marginBottom: "10px",
              }}
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
