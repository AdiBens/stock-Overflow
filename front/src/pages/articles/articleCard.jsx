import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../context/articlesSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function ArticleCard({ article }) {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.user[0].isAdmin);

  return (
    <div className="articleCard">
      <div className="articleTitle">
        <h2>{article.title}</h2>
        <p className="date">
          {article.date}
          <span className="articleCreator">{article.creator}</span>
        </p>
        {isAdmin && (
          <span className="editDelete">
            <DeleteIcon
              className="delete"
              onClick={() => dispatch(deleteArticle(article._id))}
            />
          </span>
        )}
      </div>
      <div className="articleContent">{article.content}</div>
    </div>
  );
}

export default ArticleCard;
