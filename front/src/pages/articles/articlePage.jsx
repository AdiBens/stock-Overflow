import { useLayoutEffect, useState } from "react";
import ArticleCard from "./articleCard";

function Article(props) {
  const articlesInPage = props.articles;
  const [articles, setArticles] = useState(articlesInPage);

  useLayoutEffect(() => {
    setArticles(articlesInPage);
  });

  return (
    <div className="articlesContainer">
      {articles.map((article) => (
        <ArticleCard article={article} key={article._id} />
      ))}
    </div>
  );
}

export default Article;
