function ArticleNav({ filterArticles }) {
  return (
    <ul className="articleNav">
      <div className="articleNavTitle">Category</div>
      <li className="articleNavOption" onClick={() => filterArticles("All")}>
        All
      </li>
      <li className="articleNavOption" onClick={() => filterArticles("News")}>
        News
      </li>
      <li
        className="articleNavOption"
        onClick={() => filterArticles("Coins Update")}
      >
        Coins Update
      </li>
      <li
        className="articleNavOption"
        onClick={() => filterArticles("Site Info")}
      >
        Site Info
      </li>
    </ul>
  );
}

export default ArticleNav;
