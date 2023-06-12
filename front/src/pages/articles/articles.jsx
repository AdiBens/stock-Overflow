import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Article from "./articlePage";
import { useState } from "react";
import CreateNewArticle from "./createNewArticle";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ArticleNav from "./articleNav";

function Articles() {
  const [articlesTitle, setArticlesTitle] = useState("Articles");
  const data = useSelector((state) => state.articles.articles);
  const [articles, setArticles] = useState(data);
  const countNumber = Math.ceil(articles.length / 2);
  const [currentArticles, setcurrentArticles] = useState(articles.slice(0, 2));
  const isAdmin = useSelector((state) => state.user.user[0].isAdmin);
  const handleChangePage = (event, value) => {
    const artNum = value * 2;
    setcurrentArticles(articles.slice(artNum - 2, artNum));
  };
  useEffect(() => {
    setArticles(data);
    setArticlesTitle("Articles");
  }, [data.length]);

  useEffect(() => {
    const artNum = 1 * 2;
    setcurrentArticles(articles.slice(artNum - 2, artNum));
  }, [articles]);

  const filterArticles = (inputProps) => {
    if (inputProps === "All") {
      setArticles(data);
      setArticlesTitle("Articles");
      return;
    }
    const filterdArticles = data.filter(
      (article) => article.category === inputProps
    );
    setArticles(filterdArticles);
    setArticlesTitle(inputProps);
  };

  return (
    <div className="articlesPage">
      <div className="articlesMain">
        <div className="createNewArticle">
          {isAdmin && <CreateNewArticle />}
        </div>
        <div className="articles">
          <h1 className="pageTitle">{articlesTitle}</h1>
          <Article articles={currentArticles} />
        </div>
        <div className="articlesNav">
          <ArticleNav filterArticles={filterArticles} />
        </div>
      </div>
      <div className="articlesFooter">
        <Stack spacing={0}>
          <Pagination
            count={countNumber || 1}
            color="primary"
            size="small"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Articles;
