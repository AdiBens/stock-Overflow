import BasicModal from "./modal404";

function PageNotFound() {
  localStorage.setItem("value", 0);

  return (
    <div className="pageNotFonud">
      <h1>☹</h1>
      <h2>404</h2>
      <h3>Page Not Found</h3>
      <p>
        The page you are looking for doesn't exist or an other error occorred.
      </p>
      <BasicModal />
    </div>
  );
}

export default PageNotFound;
